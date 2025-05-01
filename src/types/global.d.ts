import { ThreeElements } from "@react-three/fiber";

declare module "react" {
    namespace JSX {
        interface IntrinsicElements {
            // threejs elements
            group: ThreeElements["group"];
            primitive: ThreeElements["primitive"];
            color: ThreeElements["color"];
            fog: ThreeElements["fog"];
            mesh: ThreeElements["mesh"];
            skinnedMesh: ThreeElements["skinnedMesh"];
            line: ThreeElements["line"];
            planeGeometry: ThreeElements["planeGeometry"];
            sphereGeometry: ThreeElements["sphereGeometry"];
            boxGeometry: ThreeElements["boxGeometry"];
            meshStandardMaterial: ThreeElements["meshStandardMaterial"];
            meshBasicMaterial: ThreeElements["meshBasicMaterial"];
            meshNormalMaterial: ThreeElements["meshNormalMaterial"];
            lineBasicMaterial: ThreeElements["lineBasicMaterial"];
			bufferGeometry: ThreeElements["bufferGeometry"];
			line: ThreeElements["line"];
            float32BufferAttribute: ThreeElements["float32BufferAttribute"]
        }
    }
}