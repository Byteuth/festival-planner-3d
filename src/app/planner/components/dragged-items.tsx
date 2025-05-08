import useScreenToWorld from "@/hooks/useScreenToWorld";
import { useSnapToGround } from "@/hooks/useSnapToGround";
import { useControls } from "leva";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import RaycastVisualizer from "./utilities/raycast-visualizer";
import {
	Billboard,
	DragControls,
	Outlines,
	PivotControls,
	useTexture,
} from "@react-three/drei";
import { DraggedItemData, RaycastDataProps } from "../types/planner-types";
import {
	wowClassColors,
	wowClasses,
	wowMarkers,
	wowRoles,
} from "@/lib/gameData";
import { MarkerOverlay } from "./draggable-extras";

const getItemImageSrc = (
	type: string | undefined,
	label: string | undefined
): string | null => {
	if (!type || !label) return null;

	let itemData;
	switch (type) {
		case "class":
			itemData = wowClasses.find(
				(cls) => cls.label.toLowerCase() === label.toLowerCase()
			);
			break;
		case "roles":
			itemData = wowRoles.find(
				(role) => role.label.toLowerCase() === label.toLowerCase()
			);
			break;
		case "marker":
			itemData = wowMarkers.find(
				(marker) => marker.label.toLowerCase() === label.toLowerCase()
			);
			break;
		default:
			return null;
	}

	return itemData?.imageSrc || null;
};

interface TexturedMeshProps {
	itemType?: string;
	geometryType?: "box" | "cylinder";
	color?: string;
	texturePath: string | null;
	showOutline?: boolean;
	outlineColor?: string;
	outlineThickness?: number;
	castShadow?: boolean;
	position?: [number, number, number];
	rotation?: [number, number, number];
	onClick?: (event: THREE.Event) => void;
	ref?: React.Ref<THREE.Mesh>;
}

const TexturedMesh = React.forwardRef<THREE.Mesh, TexturedMeshProps>(
	(
		{
			geometryType = "box",
			color = "gray",
			texturePath,
			showOutline = false,
			outlineColor = "black",
			outlineThickness = 1,
			...props
		},
		ref
	) => {
		const texture = texturePath ? useTexture(texturePath) : null;

		useEffect(() => {
			if (texture) {
				texture.colorSpace = THREE.SRGBColorSpace;
				texture.needsUpdate = true;
			}
		}, [texture]);

		const geometry = useMemo(() => {
			switch (geometryType) {
				case "box":
					return <boxGeometry args={[1, 1, 1]} />;
				case "cylinder":
					return <cylinderGeometry args={[0.5, 0.5, 0.1]} />;
				default:
					return <boxGeometry args={[1, 1, 1]} />;
			}
		}, [geometryType]);

		const material = useMemo(() => {
			if (texture) {
				return <meshBasicMaterial map={texture} transparent />;
			}
			return <meshBasicMaterial color={color} />;
		}, [texture, color]);

		return (
			<mesh {...props} ref={ref}>
				{geometry}
				{material}
				{showOutline && <Outlines color={outlineColor} thickness={1} />}
			</mesh>
		);
	}
);
TexturedMesh.displayName = "TexturedMesh";

interface TrackedItem {
	id: string;
	position: [number, number, number];
}

interface DraggedItemsProps {
	items: DraggedItemData[];
	setSelectedUnit: (unit: string | null) => void;
}

export default function DraggedItems({
	items,
	setSelectedUnit,
}: DraggedItemsProps) {
	const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
	const screenToWorld = useScreenToWorld();
	const { handleSnapToGround } = useSnapToGround();
	const [raycastVisible, setRaycastVisible] = useState<boolean>(false);
	const [raycastData, setRaycastData] = useState<RaycastDataProps>({
		origin: new THREE.Vector3(0, 0, 0),
		direction: new THREE.Vector3(0, -1, 0),
		hit: false,
		hitPoint: null,
	});

	const [trackedItems, setTrackedItems] = useState<TrackedItem[]>([]);
	const meshRefs = useRef<{ [id: string]: THREE.Mesh | null }>({});

	useControls("Raycast Utilities", {
		"Show Raycast": {
			value: false,
			onChange: setRaycastVisible,
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

	const handleMeshClick = (itemId: string | undefined, event: THREE.Event) => {
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
				onPointerMissed={(event: any) => {
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
							<DynamicMeshWrapper
								item={item}
								itemId={trackedItem.id}
								handleMeshClick={handleMeshClick}
								refCallback={(ref: THREE.Mesh | null) => {
									meshRefs.current[itemKey] = ref;
								}}
								isSelected={isThisItemSelected}
								handleDrag={handleDrag}
								handleDragStart={() => handleDragStart(trackedItem.id)}
								handleDragEnd={handleDragEnd}
							/>
						</group>
					);
				})}
			</group>
		</>
	);
}

interface MeshPropsType {
	castShadow: boolean;
	position: [number, number, number];
	onClick: (event: THREE.Event) => void;
	geometryType: "box" | "cylinder";
	color: string;
	texturePath: string | null;
	outlineColor: string;
	usesBillboard?: boolean;
	rotation?: [number, number, number];
}

interface DynamicMeshWrapperProps {
	item: DraggedItemData;
	itemId: string;
	handleMeshClick: (id: string | undefined, event: THREE.Event) => void;
	refCallback: (ref: THREE.Mesh | null) => void;
	isSelected: boolean;
	handleDrag: (
		localMatrix: THREE.Matrix4,
		deltaLocalMatrix: THREE.Matrix4,
		worldMatrix: THREE.Matrix4,
		deltaWorldMatrix: THREE.Matrix4
	) => void;
	handleDragStart: () => void;
	handleDragEnd: () => void;
}

const DynamicMeshWrapper: React.FC<DynamicMeshWrapperProps> = ({
	item,
	itemId,
	handleMeshClick,
	refCallback,
	isSelected,
	handleDrag,
	handleDragStart,
	handleDragEnd,
}) => {
	const meshProps = useMemo<MeshPropsType>(() => {
		const baseProps = {
			castShadow: true,
			position: [0, 0.5, 0] as [number, number, number],
			onClick: (event: THREE.Event) => handleMeshClick(itemId, event),
			geometryType: "box" as const,
			color: "gray",
			texturePath: null,
			outlineColor: "black",
		};

		const texturePath = getItemImageSrc(item.type, item.label);

		switch (item.type) {
			case "player":
				return {
					...baseProps,
					geometryType: "box" as const,
					color: item.playerClass
						? wowClassColors[item.playerClass] || "gray"
						: "gray",
					texturePath: null,
					outlineColor: "black",
				};
			case "class":
				return {
					...baseProps,
					geometryType: "cylinder" as const,
					color: "white",
					texturePath,
					outlineColor:
						wowClassColors[
							item.label.charAt(0).toUpperCase() +
								item.label.slice(1).toLowerCase()
						] || "gray",
					usesBillboard: true,
					rotation: [Math.PI / 2, Math.PI / 2, 0] as [number, number, number],
					outlineThickness: 1,
				};
			case "roles":
			case "marker":
				const source = item.type === "roles" ? wowRoles : wowMarkers; 
				const matchedItem = source.find(
					(entry) => entry.label.toLowerCase() === item.label.toLowerCase()
				);
				return {
					...baseProps,
					geometryType: "cylinder" as const,
					color: "white",
					texturePath,
					outlineColor: matchedItem?.color || "gray",
					usesBillboard: true,
					rotation: [Math.PI / 2, Math.PI / 2, 0] as [number, number, number],
				};
			default:
				return baseProps;
		}
	}, [item, itemId, handleMeshClick]);

	const renderMesh = () => {
		const mesh = (
			<TexturedMesh ref={refCallback} {...meshProps} showOutline={isSelected} />
		);
		if (meshProps.usesBillboard) {
			return <Billboard>{mesh}</Billboard>;
		}
		return mesh;
	};

	if (isSelected) {
		return (
			<DragControls
				axisLock="y"
				onDrag={handleDrag}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
			>
				{item.type === "player" ? (
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
						{renderMesh()}
					</PivotControls>
				) : (
					renderMesh()
				)}
			</DragControls>
		);
	}

	return renderMesh();
};
