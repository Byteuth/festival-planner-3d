import { useDraggable } from "@dnd-kit/core";
import Image from "next/image";
import { CSS } from "@dnd-kit/utilities";
import { wowClassColors } from "@/lib/gameData";

interface DraggablePlayerData {
	type: string;
	id: string;
	label: string;
	playerClass?: string | null;
	mouseDropPosition?: [number, number];
}

function DraggablePlayer({
	id,
	label,
	type,
	playerClass,
	mouseDropPosition,
}: DraggablePlayerData) {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: id,
		data: {
			type: "draggableItem",
			id: id,
			label: label,
			itemType: type,
			playerClass: playerClass,
		},
	});


	const backgroundColor = wowClassColors[playerClass || ""] || "gray";

	const style = {
		backgroundColor: backgroundColor,
		...(transform && { transform: CSS.Translate.toString(transform) }),
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
			className={`border border-black flex items-center space-x-2 p-1 rounded max-w-xs `}
		>
			<Image
				src={
					playerClass
						? `/images/classes/${playerClass
								.toLowerCase()
								.replace(/\s+/g, "")}.png`
						: "/logos/default.png"
				}
				alt={playerClass ? `${playerClass} icon` : "Default icon"}
				width={20}
				height={20}
				className="rounded-full border border-black flex-shrink-0"
				priority={false}
			/>
			<span className="truncate text-xs select-none font-semibold">{id}</span>
		</div>
	);
}

function PlayerOverlay({
	id,
	playerClass,
}: {
	id: string;
	playerClass?: string | null;
}) {


	const backgroundColor = wowClassColors[playerClass || ""] || "gray";

	return (
		<div
			className="border border-black flex items-center space-x-2 p-1 rounded max-w-xs"
			style={{ backgroundColor }}
		>
			<Image
				src={
					playerClass
						? `/images/classes/${playerClass
								.toLowerCase()
								.replace(/\s+/g, "")}.png`
						: "/images/classes/default.png"
				}
				alt={playerClass ? `${playerClass} icon` : "Default icon"}
				width={20}
				height={20}
				className="rounded-full border border-black flex-shrink-0"
				priority={false}
			/>
			<span className="truncate text-xs select-none font-semibold">{id}</span>
		</div>
	);
}

export { DraggablePlayer, PlayerOverlay };
export type { DraggablePlayerData };