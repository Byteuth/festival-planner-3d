import * as THREE from "three";

interface RaycastDataProps {
	origin: THREE.Vector3;
	direction: THREE.Vector3;
	hit: boolean;
	hitPoint: THREE.Vector3 | null;
}

export default function RaycastVisualizer({
	raycastData,
}: {
	raycastData: RaycastDataProps;
}) {
	const rayLength = raycastData.hit
		? raycastData.hitPoint!.distanceTo(raycastData.origin)
		: 10;

	return (
		<>
			<line>
				<bufferGeometry attach="geometry">
					<float32BufferAttribute
						attach="attributes-position"
						args={[
							new Float32Array([
								raycastData.origin.x,
								raycastData.origin.y,
								raycastData.origin.z,
								raycastData.origin.x + raycastData.direction.x * rayLength,
								raycastData.origin.y + raycastData.direction.y * rayLength,
								raycastData.origin.z + raycastData.direction.z * rayLength,
							]),
							3,
						]}
					/>
				</bufferGeometry>
				<lineBasicMaterial
					attach="material"
					color={raycastData.hit ? "blue" : "red"}
					linewidth={5}
				/>
			</line>
			<mesh position={raycastData.origin}>
				<sphereGeometry args={[0.05, 8, 8]} />
				<meshBasicMaterial color="yellow" />
			</mesh>
			{raycastData.hit && raycastData.hitPoint && (
				<mesh position={raycastData.hitPoint}>
					<sphereGeometry args={[0.1, 16, 16]} />
					<meshBasicMaterial color="blue" />
				</mesh>
			)}
		</>
	);
}
