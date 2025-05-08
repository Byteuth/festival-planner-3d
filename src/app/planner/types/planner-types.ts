import * as THREE from "three";

export interface DraggedItemData {
	id: string;
	label: string;
	itemType?: string;
	playerClass?: string;
	imageSrc?: string;
	type?: string;
    mouseDropPosition?: [number, number]
}
export interface RaycastDataProps {
	origin: THREE.Vector3;
	direction: THREE.Vector3;
	hit: boolean;
	hitPoint: THREE.Vector3 | null;
}
