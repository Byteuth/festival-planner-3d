"use client";
import EncounterCanvas from "@/app/planner/components/encounter-canvas";
import GlobalNavigationBar from "@/components/global/global-navigation-bar";
import { useEffect, useState, useRef, useCallback } from "react";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
	draggableItems,
	draggableNPCs,
	raids,
	wowClasses,
	wowMarkers,
	wowRoles,
} from "@/lib/gameData";
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
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	PlayerOverlay,
	DraggablePlayer,
} from "@/app/planner/components/draggable-player";
import {
	ClassesOverlay,
	DraggableClasses,
	DraggableMarker,
	DraggableRoles,
	MarkerOverlay,
	RolesOverlay,
} from "@/app/planner/components/draggable-extras";
import { Separator } from "@/components/ui/separator";
import { DraggedItemData } from "@/app/planner/types/planner-types";
import {
	DraggableNPC,
	NPCOverlay,
} from "@/app/planner/components/draggable-npc";
import { usePathname } from "next/navigation";
import SelectedUnitFrame from "@/app/planner/components/selected-unitframe";
import { Button } from "@/components/ui/button";
import { BookOpen, BookText,  } from "lucide-react";
import SidePanel from "@/app/planner/components/sidepanel";

interface NavigationSelection {
	expansionName: string | null;
	expansionSlug: string | null;
	raidItem: raidItem | null;
	raidSlug: string | null;
	bossName: string | null;
	bossSlug: string | null;
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
	const [canvasItems, setCanvasItems] = useState<DraggedItemData[]>([]);
	const mousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		})
	);
	const canvasDroppableId = "encounter-canvas-droppable";
	const [selectedUnit, setSelectedUnit] = useState<DraggedItemData | null>(
		null
	);
	const [activeItem, setActiveItem] = useState<{
		id: string;
		type: string;
		playerClass?: string;
		imageSrc?: string;
		label?: string;
		name?: string;
	} | null>(null);
	const pathname = usePathname();
	const pathSegments = pathname.split("/").filter((segment) => segment !== "");
	const encounterName = pathSegments[pathSegments.length - 1];
	const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);

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
		const { active } = event;
		setActiveId(active.id as string);
		mousePositionRef.current = { x: 0, y: 0 };

		const data = active.data.current;
		if (data) {
			const itemType = data.itemType;
			if (itemType === "player") {
				setActiveItem({
					id: data.id,
					type: itemType,
					playerClass: data.playerClass,
					label: data.label,
				});
			}
			if (itemType === "npc") {
				setActiveItem({
					id: data.id,
					type: itemType,
					imageSrc: data.image,
					label: data.label,
					name: data.name,
				});
			}
			if (itemType === "marker") {
				setActiveItem({
					id: data.label,
					type: itemType,
					imageSrc: data.imageSrc,
					label: data.label,
				});
			}
			if (itemType === "roles") {
				setActiveItem({
					id: data.label,
					type: itemType,
					imageSrc: data.imageSrc,
					label: data.label,
				});
			} else if (itemType === "class") {
				setActiveItem({
					id: data.label,
					type: itemType,
					imageSrc: data.imageSrc,
					label: data.label,
				});
			}
		}

		document.addEventListener("mousemove", handleNativeMouseMove);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		const draggedItemData = active.data.current as DraggedItemData;

		document.removeEventListener("mousemove", handleNativeMouseMove);

		if (over && draggedItemData) {
			const droppedOverId = over.id;

			if (droppedOverId === canvasDroppableId) {
				const newItem: DraggedItemData = {
					id: `${draggedItemData.id}-${Date.now()}`,
					type: draggedItemData.itemType,
					label: draggedItemData.label,
					playerClass: draggedItemData.playerClass,
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
		setActiveItem(null);
		mousePositionRef.current = { x: 0, y: 0 };
	};


	const togglePanel = () => {
		setIsPanelOpen(!isPanelOpen);
	};

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
							<ResizablePanel defaultSize={15}>
								<div className="flex h-full items-center justify-center p-6 border">
									<ScrollArea className="w-full h-full">
										<Accordion type="single" collapsible className="w-full">
											{/* Players*/}
											<AccordionItem value="item-1">
												<AccordionTrigger>Players</AccordionTrigger>
												<AccordionContent>
													{draggableItems.map((item) => (
														<div key={item.id} className="pb-1">
															<DraggablePlayer
																id={item.id}
																label={item.label}
																type={item.type}
																playerClass={item.playerClass}
															/>
														</div>
													))}
												</AccordionContent>
											</AccordionItem>
											{/* NPCS*/}
											<AccordionItem value="item-2">
												<AccordionTrigger>NPC</AccordionTrigger>
												<AccordionContent>
													{draggableNPCs
														.filter(
															(item) =>
																encounterName &&
																item.encounter === encounterName
														)
														.map((item) => (
															<div key={item.id} className="pb-1">
																<DraggableNPC
																	id={item.id}
																	label={item.label}
																	type={item.type}
																	name={item.name}
																	image={item.image}
																	encounter={item.encounter}
																/>
															</div>
														))}
												</AccordionContent>
											</AccordionItem>
											{/* Extras*/}
											<AccordionItem value="item-3">
												<AccordionTrigger>
													Classes, Roles and Markers
												</AccordionTrigger>
												<AccordionContent>
													<div>
														<span className="truncate text-xs select-none font-semibold">
															Classes
														</span>
														<div className="flex flex-row items-center gap-1 flex-wrap">
															{wowClasses.map((item) => (
																<DraggableClasses
																	key={item.label}
																	label={item.label}
																	type={item.type}
																	imageSrc={item.imageSrc}
																/>
															))}
														</div>
														<Separator className="my-4" />
														<span className="truncate text-xs select-none font-semibold">
															Roles
														</span>
														<div className="flex flex-row items-center gap-1 flex-wrap">
															{wowRoles.map((item) => (
																<DraggableRoles
																	key={item.label}
																	label={item.label}
																	type={item.type}
																	imageSrc={item.imageSrc}
																/>
															))}
														</div>
														<Separator className="my-4" />
														<span className="truncate text-xs select-none font-semibold">
															Markers
														</span>
														<div className="flex flex-row items-center gap-1 flex-wrap">
															{wowMarkers.map((item) => (
																<DraggableMarker
																	key={item.label}
																	label={item.label}
																	type={item.type}
																	imageSrc={item.imageSrc}
																/>
															))}
														</div>
													</div>
												</AccordionContent>
											</AccordionItem>
										</Accordion>
									</ScrollArea>
								</div>
							</ResizablePanel>
							<ResizableHandle withHandle />
							<ResizablePanel defaultSize={85} className="relative">
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
								<div className="absolute right-0 top-0 bottom-0 flex">
									<Button
										onClick={togglePanel}
										className="justify-center h-10 mt-4 translate-x-1  rounded-tr rounded-br z-10"
										aria-label={isPanelOpen ? "Close panel" : "Open panel"}
									>
										{isPanelOpen ? (
											<BookOpen size={20} />
										) : (
											<BookText size={20} />
										)}
									</Button>

									{/* Panel content */}
									{isPanelOpen && (
										<SidePanel />
										
									)}
								</div>

								{selectedUnit && (
									<SelectedUnitFrame selectedUnit={selectedUnit} />
								)}
							</ResizablePanel>
						</ResizablePanelGroup>
					</div>
				</div>

				<DragOverlay>
					{activeItem &&
						(activeItem.type === "player" ? (
							<PlayerOverlay
								id={activeItem.id}
								playerClass={activeItem.playerClass}
							/>
						) : activeItem.type === "class" && activeItem.imageSrc ? (
							<ClassesOverlay
								imageSrc={activeItem.imageSrc}
								label={activeItem.label || ""}
							/>
						) : activeItem.type === "roles" && activeItem.imageSrc ? (
							<RolesOverlay
								imageSrc={activeItem.imageSrc}
								label={activeItem.label || ""}
							/>
						) : activeItem.type === "marker" && activeItem.imageSrc ? (
							<MarkerOverlay
								imageSrc={activeItem.imageSrc}
								label={activeItem.label || ""}
							/>
						) : activeItem.type === "npc" && activeItem.imageSrc ? (
							<NPCOverlay
								imageSrc={activeItem.imageSrc}
								name={activeItem.name || ""}
							/>
						) : null)}
				</DragOverlay>
			</DndContext>
		</>
	);
}
