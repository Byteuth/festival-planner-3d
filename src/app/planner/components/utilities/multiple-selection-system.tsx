import { useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { SelectionBox } from "three/addons/interactive/SelectionBox.js";
import * as THREE from "three";

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

interface SelectableObject extends THREE.Object3D {
	originalMaterial?: THREE.Material | THREE.Material[];
}

// export default function MultipleSelectionSystem({
// 	setSelectedItems,
// }: {
// 	setSelectedItems: (items: Set<THREE.Object3D>) => void;
// }) {
// 	const { gl: renderer, camera, scene } = useThree();
// 	const helperRef = useRef<CustomSelectionHelper | null>(null);
// 	const prevSelectedRef = useRef<Set<SelectableObject>>(new Set());
// 	const [isShiftKeyDown, setIsShiftKeyDown] = useState(false);

// 	// Store original materials for restoration
// 	const storeOriginalMaterial = (object: SelectableObject) => {
// 		if (object.material && !object.originalMaterial) {
// 			if (Array.isArray(object.material)) {
// 				object.originalMaterial = object.material.map((m) => m.clone());
// 			} else {
// 				object.originalMaterial = object.material.clone();
// 			}
// 		}
// 	};

// 	// Restore original material
// 	const restoreOriginalMaterial = (object: SelectableObject) => {
// 		if (object.originalMaterial && object.material) {
// 			object.material = object.originalMaterial;
// 		}
// 	};

// 	// Apply highlight material
// 	const applyHighlightMaterial = (object: SelectableObject, color: string) => {
// 		if (object.material) {
// 			storeOriginalMaterial(object);
// 			if (Array.isArray(object.material)) {
// 				object.material = object.material.map(
// 					() => new THREE.MeshBasicMaterial({ color })
// 				);
// 			} else {
// 				object.material = new THREE.MeshBasicMaterial({ color });
// 			}
// 		}
// 	};

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

// 	useEffect(() => {
// 		const selectionBox = new SelectionBox(camera, scene);
// 		const helper = new CustomSelectionHelper(renderer, "selectBox");
// 		helperRef.current = helper;

// 		const canvas = renderer.domElement;
// 		const currentlySelected = new Set<SelectableObject>();

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
// 				prevSelectedRef.current.forEach(restoreOriginalMaterial);
// 				prevSelectedRef.current.clear();
// 			}

// 			currentlySelected.clear();
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

// 			const allSelected = selectionBox.select() as SelectableObject[];

// 			for (const obj of currentlySelected) {
// 				if (!allSelected.includes(obj)) {
// 					restoreOriginalMaterial(obj);
// 					currentlySelected.delete(obj);
// 				}
// 			}

// 			// Then apply highlight to newly selected objects
// 			for (const object of allSelected) {
// 				if (!currentlySelected.has(object)) {
// 					applyHighlightMaterial(object, "blue");
// 					currentlySelected.add(object);
// 				}
// 			}
// 		};

// 		const handlePointerUp = (event: PointerEvent) => {
// 			if (event.button !== 0 || !helper.isDown) return;
// 			if (!isShiftKeyDown) {
// 				currentlySelected.forEach(restoreOriginalMaterial);
// 				currentlySelected.clear();
// 				helper.onSelectEnd();
// 				return;
// 			}

// 			const rect = canvas.getBoundingClientRect();
// 			const canvasX = event.clientX - rect.left;
// 			const canvasY = event.clientY - rect.top;

// 			selectionBox.endPoint.set(
// 				(canvasX / rect.width) * 2 - 1,
// 				-(canvasY / rect.height) * 2 + 1,
// 				0.5
// 			);

// 			const allSelected = selectionBox.select() as SelectableObject[];

// 			currentlySelected.forEach(restoreOriginalMaterial);
// 			currentlySelected.clear();

// 			allSelected.forEach((object) => {
// 				applyHighlightMaterial(object, "blue");
// 				prevSelectedRef.current.add(object);
// 			});

//             setSelectedItems(prevSelectedRef.current);
// 			helper.onSelectEnd();
// 		};

// 		const handlePointerCancel = () => {
// 			if (helper.isDown) {
// 				currentlySelected.forEach(restoreOriginalMaterial);
// 				currentlySelected.clear();
// 				helper.onSelectEnd();
// 			}
// 		};

// 		canvas.addEventListener("pointerdown", handlePointerDown);
// 		canvas.addEventListener("pointermove", handlePointerMove);
// 		canvas.addEventListener("pointerup", handlePointerUp);
// 		canvas.addEventListener("pointercancel", handlePointerCancel);
// 		canvas.addEventListener("pointerleave", handlePointerCancel);
// 	}, [renderer, camera, scene, isShiftKeyDown]);

// 	return null;
// }
