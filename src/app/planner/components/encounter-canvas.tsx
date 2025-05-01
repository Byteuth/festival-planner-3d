import { TestingGrounds } from "@/components/models/testing-grounds";
import useScreenToWorld from "@/hooks/useScreenToWorld";
import { useSnapToGround } from "@/hooks/useSnapToGround";
import {
	CameraControls,
	DragControls,
	Environment,
	PivotControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import RaycastVisualizer from "./utilities/raycast-visualizer";
import { useControls } from "leva";

interface DraggableItemData {
	type: string;
	id: string;
	label: string;
	mouseDropPosition?: [number, number];
}

interface RaycastDataProps {
	origin: THREE.Vector3;
	direction: THREE.Vector3;
	hit: boolean;
	hitPoint: THREE.Vector3 | null;
}

function DraggedPlayers({ items }: { items: DraggableItemData[] }) {
	const screenToWorld = useScreenToWorld();
	const positionsRef = useRef<{ [id: string]: [number, number, number] }>({});
	const { handleSnapToGround } = useSnapToGround();
	const [raycastVisible, setRaycastVisible] = useState<boolean>(true);
	const [raycastData, setRaycastData] = useState<RaycastDataProps>({
		origin: new THREE.Vector3(0, 0, 0),
		direction: new THREE.Vector3(0, -1, 0),
		hit: false,
		hitPoint: null,
	});
	const raycastUtilties = useControls("Raycast Utilities", {
		"Show Raycast": {
			value: false,
			onChange: (value) => {
				setRaycastVisible(value);
			},
		},
	});

	// Sets up world positions for items that have been dropped
	items.forEach((item) => {
		if (item.id && item.mouseDropPosition && !positionsRef.current[item.id]) {
			const worldPos = screenToWorld(
				item.mouseDropPosition[0],
				item.mouseDropPosition[1]
			);

			if (worldPos) {
				positionsRef.current[item.id] = worldPos;
			} else {
				console.warn(
					`Item "${item.label}" dropped off valid placement surface.`
				);
			}
		}
	});

	// Handles new item position and raycast based on mouse position
	const handleDrag = (
		localMatrix: THREE.Matrix4,
		deltaLocalMatrix: THREE.Matrix4,
		worldMatrix: THREE.Matrix4,
		deltaWorldMatrix: THREE.Matrix4
	) => {
		const position = new THREE.Vector3();
		position.setFromMatrixPosition(worldMatrix);
		const result = handleSnapToGround(localMatrix, worldMatrix);

		setRaycastData({
			origin: result.rayOrigin,
			direction: result.rayDirection,
			hit: result.hit,
			hitPoint: result.hit ? result.hitPoint : null,
		});
	};

	return (
		<>
			{raycastVisible && <RaycastVisualizer raycastData={raycastData} />}
			{items.map((item, index) => {
				const position = (item.id && positionsRef.current[item.id]) || [
					0, 0.5, 0,
				];

				return (
					<group position={position}>
						<DragControls
							axisLock="y"
							key={item.id || `item-${index}`}
							onDrag={handleDrag}
						>
							<PivotControls
								scale={3}
								lineWidth={5}
								autoTransform={true}
								activeAxes={[true, false, true]}
								disableSliders={true}
								disableAxes={true}
								disableScaling={true}
								anchor={[0, 0, 0]}
								offset={[0, 0, 0]}
								axisColors={["#ff0000", "#00ff00", "#0000ff"]}
								hoveredColor="#ffff00"
							>
								<mesh key={item.id || `mesh-${index}`} castShadow>
									<boxGeometry args={[1, 1, 1]} />
									<meshStandardMaterial color="red" />
								</mesh>
							</PivotControls>
						</DragControls>
					</group>
				);
			})}
		</>
	);
}

function Floor() {
	const meshRef = useRef<THREE.Mesh>(null);
	const placementGroupRef = useRef<THREE.Group>(null);

	useEffect(() => {
		if (placementGroupRef.current) {
			placementGroupRef.current.userData.isPlacementGroup = true;
		}
	}, []);

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
}: {
	backgroundColor: string;
	items: DraggableItemData[];
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

			<DraggedPlayers items={items} />
		</Canvas>
	);
}
