// components/CanvasDropHandler.tsx
import { useEffect, RefObject } from "react";
import * as THREE from "three";
import useScreenToWorld from "@/hooks/screen-to-world";

interface DraggableItemData {
	type: string;
	id: string;
	label: string;
	position?: [number, number, number];
}

interface PendingDrop {
	itemData: DraggableItemData;
	clientX: number;
	clientY: number;
}

interface CanvasDropHandlerProps {
	groundRef: RefObject<THREE.Mesh>;
	pendingDrop: PendingDrop | null;
	onItemAddedToCanvas: (
		itemData: DraggableItemData,
		position: [number, number, number]
	) => void;
	onDropProcessed: () => void;
}

export default function CanvasDropHandler({
	groundRef,
	pendingDrop,
	onItemAddedToCanvas,
	onDropProcessed,
}: CanvasDropHandlerProps) {
	const screenToWorld = useScreenToWorld(groundRef);

	useEffect(() => {
		if (pendingDrop) {
			console.log(
				`⏳ Processing pending drop for item ${pendingDrop.itemData.id}...`
			);
			const { itemData, clientX, clientY } = pendingDrop;

			const worldPosition = screenToWorld(clientX, clientY);

			if (worldPosition) {
				console.log(`📍 Calculated 3D position:`, worldPosition);
				onItemAddedToCanvas(itemData, worldPosition);
			} else {
				console.log("❌ Could not determine 3D drop position on Canvas.");
			}

			onDropProcessed();
			console.log("✅ Drop processing finished.");
		}
	}, [pendingDrop, screenToWorld, onItemAddedToCanvas, onDropProcessed]);

	return null;
}
