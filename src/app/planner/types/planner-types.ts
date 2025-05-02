import * as THREE from "three";

export interface DraggableItemData {
    type: string;
    id: string;
    label: string;
    mouseDropPosition?: [number, number];
}

export interface RaycastDataProps {
    origin: THREE.Vector3;
    direction: THREE.Vector3;
    hit: boolean;
    hitPoint: THREE.Vector3 | null;
}