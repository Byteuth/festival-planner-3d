import { TestingGrounds } from "@/components/models/testing-grounds";
import {
	CameraControls,
	DragControls,
	Environment,
	Grid,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import DraggedPlayers from "./dragged-player";
import { useControls } from "leva";
import { DraggedItemData } from "../types/planner-types";

function Floor() {
	const meshRef = useRef<THREE.Mesh>(null);
	const placementGroupRef = useRef<THREE.Group>(null);

	useEffect(() => {
		if (placementGroupRef.current) {
			placementGroupRef.current.userData.isPlacementGroup = true;
		}
	}, []);
	const gridProps = useControls({
		cellSize: {
			value: 0.5,
			min: 0.1,
			max: 10,
			step: 0.1,
			label: "Cell Size",
		},
		cellThickness: {
			value: 0.5,
			min: 0.1,
			max: 5,
			step: 0.1,
			label: "Cell Thickness",
		},
		cellColor: {
			value: "#000000", // leva uses hex strings for colors
			label: "Cell Color",
		},
		sectionSize: {
			value: 1,
			min: 0.5,
			max: 20,
			step: 0.5,
			label: "Section Size",
		},
		sectionThickness: {
			value: 1,
			min: 0.1,
			max: 10,
			step: 0.1,
			label: "Section Thickness",
		},
		sectionColor: {
			value: "#2080ff", // leva uses hex strings for colors
			label: "Section Color",
		},
		followCamera: {
			value: false,
			label: "Follow Camera",
		},
		infiniteGrid: {
			value: true, // Matches your current Grid prop
			label: "Infinite Grid",
		},
		fadeDistance: {
			value: 100,
			min: 10,
			max: 1000,
			step: 10,
			label: "Fade Distance",
		},
		fadeStrength: {
			value: 1,
			min: 0,
			max: 5,
			step: 0.1,
			label: "Fade Strength",
		},
		fadeFrom: {
			value: 1, // Default is camera (1)
			min: 0,
			max: 1,
			step: 0.1,
			label: "Fade From (0=Origin, 1=Camera)",
		},
	});

	return (
		<group ref={placementGroupRef}>
			<TestingGrounds position={[-11, -1, 0]} />
			<mesh
				ref={meshRef}
				position={[0, -1, 0]}
				rotation={[0, 0, 0]}
				receiveShadow
			>
				<boxGeometry args={[300, 0.5, 300]} />
				<meshStandardMaterial color="white" />
			</mesh>
		</group>
	);
}

export default function EncounterCanvas({
	backgroundColor,
	items,
	setSelectedUnit,
}: {
	backgroundColor: string;
	items: DraggedItemData[];
	setSelectedUnit: (unit: string | null) => void;
}) {

	return (
		<Canvas
			frameloop="demand"
			onContextMenu={(e) => e.preventDefault()}
			shadows
			camera={{
				fov: 45,
				near: 1,
				far: 1000,
				position: [0, 100, 0],
			}}
		>
			<Environment preset="city" />
			<color attach="background" args={[backgroundColor]} />
			<Floor />

			<CameraControls
				maxDistance={2000}
				mouseButtons={{ left: 0, middle: 2, right: 1, wheel: 16 }}
			/>

			<DraggedPlayers items={items} setSelectedUnit={setSelectedUnit} />
		
		</Canvas>
	);
}
