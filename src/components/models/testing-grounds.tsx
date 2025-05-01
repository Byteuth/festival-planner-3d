// const wireframeMaterial = useMemo(() => {
// 	const material = materials["Material.002"];
// 	if (material) {
// 		material.wireframe = true;
// 	}
// 	return material;
// }, [materials]);

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function TestingGrounds(props: any) {
	const { nodes, materials } = useGLTF("/models/testing-grounds3.glb") as any;
	return (
		<group {...props} dispose={null}>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.roughPlan.geometry}
				material={materials["Material.001"]}
				position={[-41.963, -1.43, 45.625]}
				scale={2.456}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.stairs.geometry}
				material={materials["Material.002"]}
				position={[17.319, -1.43, -30.523]}
				scale={2.456}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.slopes001.geometry}
				material={materials["Material.002"]}
				position={[17.319, -1.43, -30.523]}
				scale={2.456}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.slopes002.geometry}
				material={materials["Material.002"]}
				position={[17.319, -1.43, -30.523]}
				scale={2.456}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.slopes003.geometry}
				material={materials["Material.002"]}
				position={[17.319, -1.43, -30.523]}
				scale={2.456}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.stairs001.geometry}
				material={materials["Material.002"]}
				position={[17.319, -1.43, -30.523]}
				scale={2.456}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.roughPlan001.geometry}
				material={materials["Material.001"]}
				position={[42.86, -1.43, 73.495]}
				scale={8.612}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.stairs002.geometry}
				material={materials["Material.002"]}
				position={[45.467, -1.43, -10.46]}
				scale={5.837}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.stairs003.geometry}
				material={materials["Material.002"]}
				position={[-18.585, -1.43, -26.736]}
				scale={8.193}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Cube.geometry}
				material={materials["Material.002"]}
				position={[-17.932, 7.8, -30.881]}
				scale={9.41}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Torus.geometry}
				material={materials["Material.002"]}
				position={[47.942, 0.932, 7.465]}
				scale={10.162}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Icosphere.geometry}
				material={materials["Material.002"]}
				position={[-14.359, 1.478, 9.072]}
				scale={4.796}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Cylinder.geometry}
				material={materials["Material.002"]}
				position={[-53.15, 4.387, 9.407]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={6.125}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Cylinder001.geometry}
				material={materials["Material.002"]}
				position={[-35.967, 0.903, 9.407]}
				rotation={[Math.PI / 2, 0, 0]}
				scale={[2.314, 6.575, 2.314]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Torus001.geometry}
				material={materials["Material.002"]}
				position={[-44.241, 7.865, -29.987]}
				rotation={[0, 0, -Math.PI / 2]}
				scale={7.85}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Cone.geometry}
				material={materials["Material.002"]}
				position={[14.377, 5.221, 7.639]}
				scale={7.728}
			/>
			<group
				position={[-28.356, -4.916, 95.103]}
				rotation={[Math.PI / 2, 0, 0]}
			>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.redridge_lumbermillobj_1.geometry}
					material={materials.mat_mm_rr_trim_01_B0}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.redridge_lumbermillobj_2.geometry}
					material={materials.mat_mm_woodroof_01_B0}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.redridge_lumbermillobj_3.geometry}
					material={materials.mat_mm_rr_roof_01_B0}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.redridge_lumbermillobj_4.geometry}
					material={materials.mat_mm_rr_wall_01_B0}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.redridge_lumbermillobj_5.geometry}
					material={materials.mat_mm_rr_supports_01_B0}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.redridge_lumbermillobj_6.geometry}
					material={materials.mat_mm_rr_wnd_ext__01_B0}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.redridge_lumbermillobj_7.geometry}
					material={materials.mat_mm_street_03_B0}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.redridge_lumbermillobj_8.geometry}
					material={materials.mat_mm_westfall_wood_floor_01_B0}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.redridge_lumbermillobj_9.geometry}
					material={materials.mat_mm_strmwnd_int_wall_02_B0}
				/>
			</group>
		</group>
	);
}

useGLTF.preload("/models/testing-grounds3.glb");
