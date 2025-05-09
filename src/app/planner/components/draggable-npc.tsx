import { useDraggable } from "@dnd-kit/core";
import Image from "next/image";
import { CSS } from "@dnd-kit/utilities";

interface LootTable {
    exclusive: string[];
    shared: string[];
}

interface DraggableNPCData {
	id: string;
    name: string;
	type: string;
    encounter: string;
	label: string;
    image: string;
	lootTable?: LootTable;
	mouseDropPosition?: [number, number];
}

function DraggableNPC({
	id,
    name,
	label,
	type,
    image,
	mouseDropPosition,
}: DraggableNPCData) {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: id,
        data: {
            type: "draggableItem",
            id: id,
            label: label,
            itemType: type,
            image: image, 
            name: name,   
        },
	});

	const style = {
		backgroundColor: 'lightgray',
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
				src={image}
				alt={`${name} image`}
				width={128}
				height={128}
				className="w-10 h-10 object-cover rounded-full border border-black bg-white"
				priority={false}
			/>
			<span className="truncate text-xs select-none font-semibold">{name}</span>
		</div>
	);
}

function NPCOverlay({
    imageSrc,
    name
}: {
    imageSrc: string;
    name: string;  
}) {
	const backgroundColor = 'lightgray'

	return (
		<div
			className="border border-black flex items-center space-x-2 p-1 rounded max-w-xs"
			style={{ backgroundColor }}
		>
		<Image
				src={imageSrc}
				alt={`${name} image`}
				width={128}
				height={128}
				className="w-10 h-10 object-cover rounded-full border border-black bg-white"
				priority={false}
			/>
			<span className="truncate text-xs select-none font-semibold">{name}</span>
		</div>
	);
}

export { DraggableNPC, NPCOverlay };
export type { DraggableNPCData };
