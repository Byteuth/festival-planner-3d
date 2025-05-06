import useScreenToWorld from "@/hooks/useScreenToWorld";
import { useSnapToGround } from "@/hooks/useSnapToGround";
import { useControls } from "leva";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import RaycastVisualizer from "./utilities/raycast-visualizer";
import { DragControls, Outlines, PivotControls } from "@react-three/drei";
import { DraggableItemData, RaycastDataProps } from "../types/planner-types";

export default function DraggedPlayers({
	items,
	setSelectedUnit,
}: {
	items: DraggableItemData[];
	setSelectedUnit: (unit: string | null) => void;
}) {
	const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
	const screenToWorld = useScreenToWorld();
	const { handleSnapToGround } = useSnapToGround();
	const [raycastVisible, setRaycastVisible] = useState<boolean>(true);
	const [raycastData, setRaycastData] = useState<RaycastDataProps>({
		origin: new THREE.Vector3(0, 0, 0),
		direction: new THREE.Vector3(0, -1, 0),
		hit: false,
		hitPoint: null,
	});

	const [trackedItems, setTrackedItems] = useState<
		Array<{
			id: string;
			position: [number, number, number];
		}>
	>([]);

	const meshRefs = useRef<{ [id: string]: THREE.Mesh | null }>({});

	const raycastUtilties = useControls("Raycast Utilities", {
		"Show Raycast": {
			value: false,
			onChange: (value) => {
				setRaycastVisible(value);
			},
		},
	});

	useEffect(() => {
		const newItemsToTrack = items.filter(
			(item) =>
				item.id && !trackedItems.some((tracked) => tracked.id === item.id)
		);
		if (newItemsToTrack.length > 0) {
			const initialTrackedData = newItemsToTrack.map((item) => {
				let initialPosition: [number, number, number] = [0, 0.5, 0];

				if (item.mouseDropPosition) {
					const worldPos = screenToWorld(
						item.mouseDropPosition[0],
						item.mouseDropPosition[1]
					);

					if (worldPos) {
						initialPosition = worldPos;
					} else {
						console.warn(
							`Item "${item.label}" dropped off valid placement surface. Using default position.`
						);
					}
				}
				return { id: item.id!, position: initialPosition };
			});

			setTrackedItems((prev) => [...prev, ...initialTrackedData]);
		}
	}, [items, screenToWorld, trackedItems]);

	const [draggingItemId, setDraggingItemId] = useState<string | null>(null);
	const latestSnappedPositionRef = useRef<THREE.Vector3 | null>(null);
	const latestRaycastResultRef = useRef<any | null>(null);

	const handleDrag = (
		localMatrix: THREE.Matrix4,
		deltaLocalMatrix: THREE.Matrix4,
		worldMatrix: THREE.Matrix4,
		deltaWorldMatrix: THREE.Matrix4
	) => {
		if (!draggingItemId) return;
		const currentWorldPosition = new THREE.Vector3().setFromMatrixPosition(
			worldMatrix
		);
		const result = handleSnapToGround(localMatrix, worldMatrix);

		if (result?.hit && result?.hitPoint) {
			latestSnappedPositionRef.current = result.hitPoint.clone();
		} else {
			latestSnappedPositionRef.current = new THREE.Vector3(
				currentWorldPosition.x,
				0.5,
				currentWorldPosition.z
			);
		}
		latestRaycastResultRef.current = result;

		setRaycastData({
			origin: result?.rayOrigin || new THREE.Vector3(0, 0, 0),
			direction: result?.rayDirection || new THREE.Vector3(0, -1, 0),
			hit: result?.hit || false,
			hitPoint: result?.hit ? result.hitPoint : null,
		});
	};

	const handleDragStart = (itemId: string) => {
		setDraggingItemId(itemId);
		latestSnappedPositionRef.current = null;
		latestRaycastResultRef.current = null;
	};

	const handleDragEnd = () => {
		if (!draggingItemId) return;

		const finalGroundPosition = latestSnappedPositionRef.current;

		if (finalGroundPosition) {
			setTrackedItems((prev) =>
				prev.map((item) =>
					item.id === draggingItemId
						? {
								...item,
								position: [
									finalGroundPosition.x,
									finalGroundPosition.y,
									finalGroundPosition.z,
								],
						  }
						: item
				)
			);

			const mesh = meshRefs.current[draggingItemId];
			if (mesh) {
				mesh.position.set(
					finalGroundPosition.x,
					finalGroundPosition.y,
					finalGroundPosition.z
				);
			}
		} else {
			console.warn(
				`Drag ended for item ${draggingItemId} but no final position was recorded.`
			);
		}

		latestSnappedPositionRef.current = null;
		latestRaycastResultRef.current = null;
		setDraggingItemId(null);
	};

	const handleMeshClick = (itemId: string | undefined, event: any) => {
		event.stopPropagation();

		if (itemId === undefined) {
			console.warn("Clicked item is missing an ID.");
			return;
		}

		if (draggingItemId === itemId) return;

		if (selectedItemId === itemId) {
			setSelectedItemId(null);
			setSelectedUnit(null);
		} else {
			setSelectedItemId(itemId);
			setSelectedUnit(itemId);
		}
	};

	return (
		<>
			{raycastVisible && <RaycastVisualizer raycastData={raycastData} />}

			<group
				// Handle clicks on empty space
				onPointerMissed={(event: MouseEvent) => {
					if (event.button === 0) {
						setSelectedItemId(null);
						setSelectedUnit(null);
					}
				}}
			>
				{trackedItems.map((trackedItem) => {
					const item = items.find((i) => i.id === trackedItem.id);
					if (!item) return null;

					const itemKey = trackedItem.id;
					const groupPosition = trackedItem.position;
					const isThisItemSelected = selectedItemId === trackedItem.id;

					return (
						<group
							key={`${itemKey}-${groupPosition.join(",")}`}
							position={groupPosition}
						>
							{isThisItemSelected ? (
								<DragControls
									axisLock="y"
									onDrag={handleDrag}
									onDragStart={() => handleDragStart(trackedItem.id)}
									onDragEnd={handleDragEnd}
								>
									<PivotControls
										scale={3}
										lineWidth={5}
										autoTransform={true}
										activeAxes={[true, false, true]}
										disableSliders={true}
										disableAxes={true}
										disableScaling={true}
										anchor={[0, 0, 0]}
										offset={[0, 0, 0]}
										axisColors={["#ff0000", "#00ff00", "#0000ff"]}
										hoveredColor="#ffff00"
									>
										<mesh
											castShadow
											ref={(ref) => {
												meshRefs.current[itemKey] = ref;
											}}
											position={[0, 0.5, 0]}
											onClick={(event) =>
												handleMeshClick(trackedItem.id, event)
											}
										>
											<boxGeometry args={[1, 1, 1]} />
											<meshStandardMaterial color={"red"} />
											<Outlines thickness={1} color="black" />
										</mesh>
									</PivotControls>
								</DragControls>
							) : (
								<mesh
									castShadow
									ref={(ref) => {
										meshRefs.current[itemKey] = ref;
									}}
									position={[0, 0.5, 0]}
									onClick={(event) => handleMeshClick(trackedItem.id, event)}
								>
									<boxGeometry args={[1, 1, 1]} />
									<meshStandardMaterial color={"blue"} />
								</mesh>
							)}
						</group>
					);
				})}
			</group>
		</>
	);
}
