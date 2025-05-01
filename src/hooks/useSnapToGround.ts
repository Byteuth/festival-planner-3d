import { useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

export function useSnapToGround() {
	const { scene } = useThree();
	const raycaster = useRef(new THREE.Raycaster());
	const placementSurfacesRef = useRef<THREE.Object3D[]>([]);

	useEffect(() => {
		const surfaces: THREE.Object3D[] = [];
		scene.traverse((object) => {
			if (
				object.userData.isPlacementGroup ||
				(object instanceof THREE.Mesh && object.receiveShadow)
			) {
				surfaces.push(object);
			}
		});
		placementSurfacesRef.current = surfaces;
		console.log("Found placement surfaces:", surfaces.length);
	}, [scene]);

	/**
	 * Handles snapping an object to the ground during drag operations
	 *
	 * @param localMatrix - The local transformation matrix of the dragged object
	 * @param worldMatrix - The world transformation matrix of the dragged object
	 * @param objectHeight - The height of the object (default: 1)
	 * @returns void
	 */

	const handleSnapToGround = (
		localMatrix: THREE.Matrix4,
		worldMatrix: THREE.Matrix4,
		objectHeight: number = 1
	) => {
		const position = new THREE.Vector3();
		position.setFromMatrixPosition(worldMatrix);
		const rayOrigin = new THREE.Vector3(
			position.x,
			position.y + 10,
			position.z
		);
		const rayDirection = new THREE.Vector3(0, -1, 0);
		raycaster.current.set(rayOrigin, rayDirection);

		const intersects = raycaster.current.intersectObjects(
			placementSurfacesRef.current,
			true
		);

		if (intersects.length > 0) {
			const groundHeight = intersects[0].point.y;
			const newY = groundHeight + objectHeight / 2;

			const currentPosition = new THREE.Vector3();
			const currentQuaternion = new THREE.Quaternion();
			const currentScale = new THREE.Vector3();

			localMatrix.decompose(currentPosition, currentQuaternion, currentScale);
			currentPosition.y = newY;

			const newMatrix = new THREE.Matrix4().compose(
				currentPosition,
				currentQuaternion,
				currentScale
			);

			localMatrix.copy(newMatrix);

			return {
				hit: true,
				rayOrigin,
				rayDirection,
				hitPoint: intersects[0].point,
				distance: intersects[0].distance,
				object: intersects[0].object,
			};
		}

		return {
			hit: false,
			rayOrigin,
			rayDirection,
			hitPoint: null,
			distance: null,
			object: null,
		};
	};

	return { handleSnapToGround };
}
