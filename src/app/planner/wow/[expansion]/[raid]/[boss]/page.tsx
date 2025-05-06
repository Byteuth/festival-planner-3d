"use client";
import EncounterCanvas from "@/app/planner/components/encounter-canvas";
import GlobalNavigationBar from "@/components/global/global-navigation-bar";
import { useEffect, useState, useRef, useCallback } from "react";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { raids } from "@/lib/gameData";
import { raidItem } from "@/types/gameData";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
	DndContext,
	DragEndEvent,
	DragOverlay,
	DragStartEvent,
	PointerSensor,
	useDroppable,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useDraggable } from "@dnd-kit/core";

interface NavigationSelection {
	expansionName: string | null;
	expansionSlug: string | null;
	raidItem: raidItem | null;
	raidSlug: string | null;
	bossName: string | null;
	bossSlug: string | null;
}

interface DraggableItemData {
	type: string;
	id: string;
	label: string;
	mouseDropPosition?: [number, number];
}

function DraggableItem({ id, label, type }: DraggableItemData) {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: id,
		data: { type: "draggableItem", id: id, label: label, itemType: type },
	});
	const style = transform
		? {
				transform: CSS.Translate.toString(transform),
		  }
		: {};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
			className="bg-red-500 border border-black p-2 mb-2 cursor-grab active:cursor-grabbing"
		>
			{label}
		</div>
	);
}

function DroppableArea({
	id,
	children,
	className = "",
}: {
	id: string;
	children: React.ReactNode;
	className?: string;
}) {
	const { setNodeRef, isOver } = useDroppable({
		id: id,
	});

	return (
		<div
			ref={setNodeRef}
			data-droppable-id={id}
			className={`${className} ${
				isOver ? "border-blue-500 border-4" : "border border-gray-300"
			}`}
		>
			{children}
		</div>
	);
}

export default function Page() {
	const [currentSelection, setCurrentSelection] = useState<NavigationSelection>(
		{
			expansionName: null,
			expansionSlug: null,
			raidItem: null,
			raidSlug: null,
			bossName: null,
			bossSlug: null,
		}
	);
	const [backgroundColor, setBackgroundColor] = useState<string>("");
	const [activeId, setActiveId] = useState<string | null>(null);
	const [canvasItems, setCanvasItems] = useState<DraggableItemData[]>([]);
	const mousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		})
	);
	const canvasDroppableId = "encounter-canvas-droppable";
	const [selectedUnit, setSelectedUnit] = useState<string | null>(null); //selected 3d unit

	useEffect(() => {
		const bgColor = raids.find(
			(raid) => raid.raidNameSlug === currentSelection.raidSlug
		)?.background;
		setBackgroundColor(bgColor || "#000000");
	}, [currentSelection]);

	const handleNativeMouseMove = useCallback((event: MouseEvent) => {
		mousePositionRef.current = {
			x: event.clientX,
			y: event.clientY,
		};
	}, []);

	const handleDragStart = (event: DragStartEvent) => {
		setActiveId(event.active.id as string);
		mousePositionRef.current = { x: 0, y: 0 };
		document.addEventListener("mousemove", handleNativeMouseMove);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		const draggedItemData = active.data.current as
			| DraggableItemData
			| undefined;

		document.removeEventListener("mousemove", handleNativeMouseMove);

		if (over && draggedItemData) {
			const droppedOverId = over.id;

			if (droppedOverId === canvasDroppableId) {
				const newItem: DraggableItemData = {
					id: `${draggedItemData.id}-${Date.now()}`,
					type: draggedItemData.type,
					label: draggedItemData.label,
					mouseDropPosition: [
						mousePositionRef.current.x,
						mousePositionRef.current.y,
					],
				};

				setCanvasItems((prevItems) => [...prevItems, newItem]);
			} else {
				console.log(
					`Dropped "${draggedItemData.label}" over an unrecognized droppable: ${droppedOverId}`
				);
			}
		}
		setActiveId(null);
		mousePositionRef.current = { x: 0, y: 0 };
	};

	const draggableItems: DraggableItemData[] = [
		{ id: "sphere-item-1", type: "sphere", label: "Add Sphere 1" },
		{ id: "sphere-item-2", type: "sphere", label: "Add Sphere 2" },
		{ id: "cube-item-1", type: "cube", label: "Add Cube 1" },
	];

	const activeItemData = activeId
		? draggableItems.find((item) => item.id === activeId)
		: null;

	useEffect(() => {
		if (selectedUnit) {
			console.log(`Selected unit: ${selectedUnit}`);
		} else {
			console.log("No unit selected.");
		}
	}, [selectedUnit]);

	return (
		<>
			<DndContext
				sensors={sensors}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
			>
				<div className="py-8 flex flex-col">
					<div className="-translate-y-6 z-20">
						<GlobalNavigationBar
							currentSelection={currentSelection}
							setCurrentSelection={setCurrentSelection}
						/>
					</div>

					<div className="w-auto h-[85vh] px-4 flex-grow">
						<ResizablePanelGroup
							direction="horizontal"
							className="h-full w-full"
						>
							<ResizablePanel defaultSize={20}>
								<div className="flex h-full items-center justify-center p-6 border">
									<ScrollArea className="w-full h-full">
										{draggableItems.map((item) => (
											<DraggableItem
												key={item.id}
												id={item.id}
												label={item.label}
												type={item.type}
											/>
										))}
									</ScrollArea>
								</div>
							</ResizablePanel>

							<ResizableHandle withHandle />

							<ResizablePanel defaultSize={60} className="relative">
								<DroppableArea
									id={canvasDroppableId}
									className="flex h-full w-full items-center justify-center"
								>
									<EncounterCanvas
										backgroundColor={backgroundColor}
										items={canvasItems}
										setSelectedUnit={setSelectedUnit}
									/>
								</DroppableArea>

								{/* Unit-frame */}
								{selectedUnit && (
									<div className="absolute top-0 left-0 flex items-center justify-center p-4">
										<div className="flex items-center">
											<div className="w-24 h-24 bg-black rounded-full flex-shrink-0"></div>
											<div className="flex flex-col w-64">
												<div className="bg-pink-500 h-8 "> {selectedUnit}</div>
												<div className="bg-green-500 h-6 "></div>
												<div className="bg-blue-500 h-6"></div>
											</div>
										</div>
									</div>
								)}
							</ResizablePanel>

							<ResizableHandle withHandle />

							<ResizablePanel defaultSize={20}>
								<div className="flex h-full items-center justify-center p-6 rounded>">
									<p>Right Panel</p>
								</div>
							</ResizablePanel>
						</ResizablePanelGroup>
					</div>
				</div>

				<DragOverlay>
					{activeItemData ? (
						<div className="bg-blue-500 p-2 rounded shadow opacity-80">
							{activeItemData.label}
						</div>
					) : null}
				</DragOverlay>
			</DndContext>
		</>
	);
}
