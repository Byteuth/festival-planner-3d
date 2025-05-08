import useScreenToWorld from "@/hooks/useScreenToWorld";
import { useSnapToGround } from "@/hooks/useSnapToGround";
import { useControls } from "leva";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import RaycastVisualizer from "./raycast-visualizer";
import { DragControls, Outlines, PivotControls } from "@react-three/drei";
// import { DraggableItemData, RaycastDataProps } from "../../types/planner-types";
import { useThree } from "@react-three/fiber";
import { SelectionBox } from "three/addons/interactive/SelectionBox.js";

// Custom selection helper for visual selection box
class CustomSelectionHelper {
	element: HTMLDivElement;
	startPoint: { x: number; y: number } = { x: 0, y: 0 };
	pointTopLeft: { x: number; y: number } = { x: 0, y: 0 };
	pointBottomRight: { x: number; y: number } = { x: 0, y: 0 };
	isDown: boolean = false;

	constructor(private renderer: THREE.WebGLRenderer, className: string) {
		// Create the selection box element
		this.element = document.createElement("div");
		this.element.classList.add(className);
		this.element.style.pointerEvents = "none";
		this.element.style.position = "absolute";
		this.element.style.border = "1px solid #55aaff";
		this.element.style.backgroundColor = "rgba(75, 160, 255, 0.3)";
		this.element.style.display = "none";

		// Add it as a child of the renderer's container
		const container = this.renderer.domElement.parentElement;
		if (container) {
			container.style.position = "relative"; // Ensure the container is positioned
			container.appendChild(this.element);
		} else {
			console.warn(
				"Cannot append selection element - no parent container for the renderer"
			);
		}
	}

	onSelectStart(event: PointerEvent) {
		const rect = this.renderer.domElement.getBoundingClientRect();
		this.startPoint = {
			x: event.clientX - rect.left,
			y: event.clientY - rect.top,
		};

		this.pointTopLeft = { ...this.startPoint };
		this.pointBottomRight = { ...this.startPoint };

		this.element.style.display = "block";
		this.element.style.left = `${this.startPoint.x}px`;
		this.element.style.top = `${this.startPoint.y}px`;
		this.element.style.width = "0px";
		this.element.style.height = "0px";

		this.isDown = true;
	}

	onSelectMove(event: PointerEvent) {
		if (!this.isDown) return;

		const rect = this.renderer.domElement.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		// Calculate the top-left and bottom-right corners for the selection box
		this.pointTopLeft.x = Math.min(this.startPoint.x, x);
		this.pointTopLeft.y = Math.min(this.startPoint.y, y);
		this.pointBottomRight.x = Math.max(this.startPoint.x, x);
		this.pointBottomRight.y = Math.max(this.startPoint.y, y);

		// Update the selection box element
		this.element.style.left = `${this.pointTopLeft.x}px`;
		this.element.style.top = `${this.pointTopLeft.y}px`;
		this.element.style.width = `${
			this.pointBottomRight.x - this.pointTopLeft.x
		}px`;
		this.element.style.height = `${
			this.pointBottomRight.y - this.pointTopLeft.y
		}px`;
	}

	onSelectEnd() {
		this.element.style.display = "none";
		this.isDown = false;
	}

	dispose() {
		this.element.remove();
	}
}

// export default function SelectableDraggablePlayers({
// 	items,
// 	setSelectedUnit,
// }: {
// 	items: DraggableItemData[];
// 	setSelectedUnit: (unit: string | null) => void;
// }) {
// 	const { gl: renderer, camera, scene } = useThree();
// 	const [selectedItemIds, setSelectedItemIds] = useState<Set<string>>(
// 		new Set()
// 	);
// 	const screenToWorld = useScreenToWorld();
// 	const { handleSnapToGround } = useSnapToGround();
// 	const [isShiftKeyDown, setIsShiftKeyDown] = useState(false);
// 	const helperRef = useRef<CustomSelectionHelper | null>(null);

// 	const [raycastVisible, setRaycastVisible] = useState<boolean>(false);
// 	const [raycastData, setRaycastData] = useState<RaycastDataProps>({
// 		origin: new THREE.Vector3(0, 0, 0),
// 		direction: new THREE.Vector3(0, -1, 0),
// 		hit: false,
// 		hitPoint: null,
// 	});

// 	const [trackedItems, setTrackedItems] = useState<
// 		Array<{
// 			id: string;
// 			position: [number, number, number];
// 		}>
// 	>([]);

// 	const meshRefs = useRef<{ [id: string]: THREE.Mesh | null }>({});
// 	const meshGroup = useRef<THREE.Group>(null);

// 	useControls("Raycast Utilities", {
// 		"Show Raycast": {
// 			value: false,
// 			onChange: (value) => {
// 				setRaycastVisible(value);
// 			},
// 		},
// 	});

// 	// Track new items
// 	useEffect(() => {
// 		const newItemsToTrack = items.filter(
// 			(item) =>
// 				item.id && !trackedItems.some((tracked) => tracked.id === item.id)
// 		);
// 		if (newItemsToTrack.length > 0) {
// 			const initialTrackedData = newItemsToTrack.map((item) => {
// 				let initialPosition: [number, number, number] = [0, 0.5, 0];

// 				if (item.mouseDropPosition) {
// 					const worldPos = screenToWorld(
// 						item.mouseDropPosition[0],
// 						item.mouseDropPosition[1]
// 					);

// 					if (worldPos) {
// 						initialPosition = worldPos;
// 					} else {
// 						console.warn(
// 							`Item "${item.label}" dropped off valid placement surface. Using default position.`
// 						);
// 					}
// 				}
// 				return { id: item.id!, position: initialPosition };
// 			});

// 			setTrackedItems((prev) => [...prev, ...initialTrackedData]);
// 		}
// 	}, [items, screenToWorld, trackedItems]);

// 	// Handle shift key for multi-selection
// 	useEffect(() => {
// 		const handleKeyDown = (e: KeyboardEvent) => {
// 			if (e.key === "Shift") {
// 				setIsShiftKeyDown(true);
// 			}
// 		};

// 		const handleKeyUp = (e: KeyboardEvent) => {
// 			if (e.key === "Shift") {
// 				setIsShiftKeyDown(false);

// 				if (helperRef.current?.isDown) {
// 					helperRef.current.onSelectEnd();
// 				}
// 			}
// 		};

// 		window.addEventListener("keydown", handleKeyDown);
// 		window.addEventListener("keyup", handleKeyUp);

// 		return () => {
// 			window.removeEventListener("keydown", handleKeyDown);
// 			window.removeEventListener("keyup", handleKeyUp);
// 		};
// 	}, []);

// 	// Selection system setup
// 	useEffect(() => {
// 		if (!isShiftKeyDown) return;

// 		const selectionBox = new SelectionBox(camera, scene);
// 		const helper = new CustomSelectionHelper(renderer, "selectBox");
// 		helperRef.current = helper;

// 		const canvas = renderer.domElement;
// 		let tempSelected = new Set<string>();

// 		const handlePointerDown = (event: PointerEvent) => {
// 			if (event.button !== 0 || !isShiftKeyDown) return;
// 			event.preventDefault();

// 			const rect = canvas.getBoundingClientRect();
// 			const canvasX = event.clientX - rect.left;
// 			const canvasY = event.clientY - rect.top;

// 			selectionBox.startPoint.set(
// 				(canvasX / rect.width) * 2 - 1,
// 				-(canvasY / rect.height) * 2 + 1,
// 				0.5
// 			);

// 			helper.onSelectStart(event);

// 			if (!event.ctrlKey) {
// 				// Clear selection if not adding to existing selection
// 				tempSelected.clear();
// 			} else {
// 				// Start with current selection if adding
// 				tempSelected = new Set(selectedItemIds);
// 			}
// 		};

// 		const handlePointerMove = (event: PointerEvent) => {
// 			if (!helper.isDown || !isShiftKeyDown) return;

// 			const rect = canvas.getBoundingClientRect();
// 			const canvasX = event.clientX - rect.left;
// 			const canvasY = event.clientY - rect.top;

// 			selectionBox.endPoint.set(
// 				(canvasX / rect.width) * 2 - 1,
// 				-(canvasY / rect.height) * 2 + 1,
// 				0.5
// 			);

// 			helper.onSelectMove(event);

// 			// Get all selected objects
// 			const allSelected = selectionBox.select();

// 			// Reset temp selection (will be rebuilt based on currently selected objects)
// 			if (!event.ctrlKey) {
// 				tempSelected.clear();
// 			} else {
// 				// Start with current selection if adding with ctrl
// 				tempSelected = new Set(selectedItemIds);
// 			}

// 			// Find player meshes in selection
// 			allSelected.forEach((obj) => {
// 				if (obj instanceof THREE.Mesh) {
// 					// Find corresponding item ID
// 					for (const [id, mesh] of Object.entries(meshRefs.current)) {
// 						if (mesh === obj) {
// 							tempSelected.add(id);
// 						}
// 					}
// 				}
// 			});
// 		};

// 		const handlePointerUp = (event: PointerEvent) => {
// 			if (event.button !== 0 || !helper.isDown) return;

// 			const rect = canvas.getBoundingClientRect();
// 			const canvasX = event.clientX - rect.left;
// 			const canvasY = event.clientY - rect.top;

// 			selectionBox.endPoint.set(
// 				(canvasX / rect.width) * 2 - 1,
// 				-(canvasY / rect.height) * 2 + 1,
// 				0.5
// 			);

// 			const allSelected = selectionBox.select();

// 			// Reset selection
// 			if (!event.ctrlKey) {
// 				tempSelected.clear();
// 			}

// 			// Find player meshes in selection
// 			allSelected.forEach((obj) => {
// 				if (obj instanceof THREE.Mesh) {
// 					// Find corresponding item ID
// 					for (const [id, mesh] of Object.entries(meshRefs.current)) {
// 						if (mesh === obj) {
// 							tempSelected.add(id);
// 						}
// 					}
// 				}
// 			});

// 			// Update the selected items
// 			setSelectedItemIds(tempSelected);

// 			// Update active unit for parent component if needed
// 			if (tempSelected.size === 1) {
// 				const [id] = tempSelected;
// 				setSelectedUnit(id);
// 			} else if (tempSelected.size === 0) {
// 				setSelectedUnit(null);
// 			}

// 			helper.onSelectEnd();
// 		};

// 		const handlePointerCancel = () => {
// 			if (helper.isDown) {
// 				helper.onSelectEnd();
// 			}
// 		};

// 		canvas.addEventListener("pointerdown", handlePointerDown);
// 		canvas.addEventListener("pointermove", handlePointerMove);
// 		canvas.addEventListener("pointerup", handlePointerUp);
// 		canvas.addEventListener("pointercancel", handlePointerCancel);
// 		canvas.addEventListener("pointerleave", handlePointerCancel);

// 		return () => {
// 			canvas.removeEventListener("pointerdown", handlePointerDown);
// 			canvas.removeEventListener("pointermove", handlePointerMove);
// 			canvas.removeEventListener("pointerup", handlePointerUp);
// 			canvas.removeEventListener("pointercancel", handlePointerCancel);
// 			canvas.removeEventListener("pointerleave", handlePointerCancel);
// 			helper.dispose();
// 		};
// 	}, [
// 		isShiftKeyDown,
// 		selectedItemIds,
// 		camera,
// 		renderer,
// 		scene,
// 		setSelectedUnit,
// 	]);

// 	// Dragging state management
// 	const [draggingItemIds, setDraggingItemIds] = useState<Set<string>>(
// 		new Set()
// 	);
// 	const latestSnappedPositionsRef = useRef<Map<string, THREE.Vector3>>(
// 		new Map()
// 	);
// 	const latestRaycastResultRef = useRef<any | null>(null);

// 	const handleDrag = (
// 		localMatrix: THREE.Matrix4,
// 		deltaLocalMatrix: THREE.Matrix4,
// 		worldMatrix: THREE.Matrix4,
// 		deltaWorldMatrix: THREE.Matrix4
// 	) => {
// 		if (draggingItemIds.size === 0) return;

// 		const currentWorldPosition = new THREE.Vector3().setFromMatrixPosition(
// 			worldMatrix
// 		);
// 		const result = handleSnapToGround(localMatrix, worldMatrix);

// 		let snappedPosition: THREE.Vector3;
// 		if (result?.hit && result?.hitPoint) {
// 			snappedPosition = result.hitPoint.clone();
// 		} else {
// 			snappedPosition = new THREE.Vector3(
// 				currentWorldPosition.x,
// 				0.5,
// 				currentWorldPosition.z
// 			);
// 		}
// 		latestRaycastResultRef.current = result;

// 		// Calculate offset between snapped position and current position
// 		const offsetVector = new THREE.Vector3().subVectors(
// 			snappedPosition,
// 			currentWorldPosition
// 		);

// 		// Store snapped positions for all dragging items
// 		draggingItemIds.forEach((id) => {
// 			const mesh = meshRefs.current[id];
// 			if (mesh) {
// 				// For multiple items, maintain their relative positions
// 				const itemPosition = mesh.position.clone();
// 				latestSnappedPositionsRef.current.set(
// 					id,
// 					new THREE.Vector3(
// 						itemPosition.x + offsetVector.x,
// 						itemPosition.y + offsetVector.y,
// 						itemPosition.z + offsetVector.z
// 					)
// 				);
// 			}
// 		});

// 		setRaycastData({
// 			origin: result?.rayOrigin || new THREE.Vector3(0, 0, 0),
// 			direction: result?.rayDirection || new THREE.Vector3(0, -1, 0),
// 			hit: result?.hit || false,
// 			hitPoint: result?.hit ? result.hitPoint : null,
// 		});
// 	};

// 	const handleDragStart = () => {
// 		// Start dragging all selected items
// 		setDraggingItemIds(new Set(selectedItemIds));
// 		latestSnappedPositionsRef.current.clear();
// 		latestRaycastResultRef.current = null;
// 	};

// 	const handleDragEnd = () => {
// 		if (draggingItemIds.size === 0) return;

// 		// Update positions for all dragged items
// 		const updatedTrackedItems = [...trackedItems];

// 		latestSnappedPositionsRef.current.forEach((finalPosition, id) => {
// 			const itemIndex = updatedTrackedItems.findIndex((item) => item.id === id);
// 			if (itemIndex !== -1) {
// 				updatedTrackedItems[itemIndex] = {
// 					...updatedTrackedItems[itemIndex],
// 					position: [finalPosition.x, finalPosition.y, finalPosition.z],
// 				};
// 			}

// 			const mesh = meshRefs.current[id];
// 			if (mesh) {
// 				mesh.position.set(finalPosition.x, finalPosition.y, finalPosition.z);
// 			}
// 		});

// 		setTrackedItems(updatedTrackedItems);
// 		latestSnappedPositionsRef.current.clear();
// 		latestRaycastResultRef.current = null;
// 		setDraggingItemIds(new Set());
// 	};

// 	const handleMeshClick = (itemId: string | undefined, event: any) => {
// 		if (!itemId) return;
// 		if (isShiftKeyDown) return;

// 		event.stopPropagation();

// 		// Handle single selection (toggle)
// 		if (selectedItemIds.has(itemId)) {
// 			const newSelection = new Set(selectedItemIds);
// 			newSelection.delete(itemId);
// 			setSelectedItemIds(newSelection);
// 			setSelectedUnit(null);
// 		} else {
// 			// If not holding ctrl/meta key, replace selection
// 			const newSelection =
// 				event.ctrlKey || event.metaKey
// 					? new Set(selectedItemIds).add(itemId)
// 					: new Set([itemId]);
// 			setSelectedItemIds(newSelection);
// 			setSelectedUnit(itemId);
// 		}
// 	};

//     useEffect(() => {
//         console.log("Tracked Items Updated:", trackedItems);
//         console.log("Selected Item IDs:", selectedItemIds);
//     }, [trackedItems, selectedItemIds]);
// 	return (
// 		<>
// 			{raycastVisible && <RaycastVisualizer raycastData={raycastData} />}

// 			<group ref={meshGroup}>
// 				{trackedItems.map((trackedItem) => {
// 					const item = items.find((i) => i.id === trackedItem.id);
// 					if (!item) return null;

// 					const itemKey = trackedItem.id;
// 					const groupPosition = trackedItem.position;
// 					const isSelected = selectedItemIds.has(trackedItem.id);

// 					return (
// 						<group
// 							key={`${itemKey}-${groupPosition.join(",")}`}
// 							position={groupPosition}
// 						>
// 							{isSelected ? (
// 								<mesh
// 									castShadow
// 									ref={(ref) => {
// 										meshRefs.current[itemKey] = ref;
// 									}}
// 									position={[0, 0.5, 0]}
// 									onClick={(event) => handleMeshClick(trackedItem.id, event)}
// 								>
// 									<boxGeometry args={[1, 1, 1]} />
// 									<meshStandardMaterial color={"red"} />
// 									{/* <Outlines thickness={1} color="black" /> */}
// 								</mesh>
// 							) : (
// 								<mesh
// 									castShadow
// 									ref={(ref) => {
// 										meshRefs.current[itemKey] = ref;
// 									}}
// 									position={[0, 0.5, 0]}
// 									onClick={(event) => handleMeshClick(trackedItem.id, event)}
// 								>
// 									<boxGeometry args={[1, 1, 1]} />
// 									<meshStandardMaterial color={"blue"} />
// 								</mesh>
// 							)}
// 						</group>
// 					);
// 				})}
// 			</group>

// 			{/* Only show drag controls when at least one item is selected */}
// 			{selectedItemIds.size > 0 && (
// 				<DragControls
// 					axisLock="y"
// 					onDrag={handleDrag}
// 					onDragStart={handleDragStart}
// 					onDragEnd={handleDragEnd}
				
// 				>
// 					<PivotControls
// 						scale={3}
// 						lineWidth={5}
// 						autoTransform={true}
// 						activeAxes={[true, false, true]}
// 						disableSliders={true}
// 						disableAxes={true}
// 						disableScaling={true}
// 						anchor={[0, 0, 0]}
// 						offset={[0, 0, 0]}
// 						axisColors={["#ff0000", "#00ff00", "#0000ff"]}
// 						hoveredColor="#ffff00"
// 					>
					
// 						<group>
// 							{Array.from(selectedItemIds).map((id) => {
// 								const trackedItem = trackedItems.find((item) => item.id === id);
// 								if (!trackedItem) return null;

// 								return (
// 									<mesh
// 										key={`drag-handle-${id}`}
// 										visible={true}
// 										position={trackedItem.position}

// 									>
// 										<boxGeometry args={[1.5, 1.5, 1.5]} />
// 										<meshBasicMaterial color={'yellow'}/>
// 									</mesh>
// 								);
// 							})}
// 						</group>
// 					</PivotControls>
// 				</DragControls>
// 			)}
// 		</>
// 	);
// }
