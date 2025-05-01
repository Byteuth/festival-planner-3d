import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function useScreenToWorld() {
	const { camera, scene, size, gl } = useThree();
	const raycaster = new THREE.Raycaster();
	const mouse = new THREE.Vector2();
	const canvas = gl.domElement;

	let placementGroup: THREE.Group | null = null;
	scene.traverse((object) => {
		if (object instanceof THREE.Group && object.userData.isPlacementGroup) {
			placementGroup = object;
		}
	});

	return (
		screenX: number,
		screenY: number
	): [number, number, number] | undefined => {
		const rect = canvas.getBoundingClientRect();
		const canvasX = screenX - rect.left;
		const canvasY = screenY - rect.top;

		mouse.x = (canvasX / rect.width) * 2 - 1;
		mouse.y = -(canvasY / rect.height) * 2 + 1;
		raycaster.setFromCamera(mouse, camera);

		if (!placementGroup) {
			console.warn("Placement group not found in scene.");
			return undefined;
		}

		const intersects = raycaster.intersectObjects(
			placementGroup.children,
			true
		);

		if (intersects.length > 0) {
			return [
				intersects[0].point.x,
				intersects[0].point.y + 0.5,
				intersects[0].point.z,
			];
		} else {
			return undefined;
		}
	};
}
