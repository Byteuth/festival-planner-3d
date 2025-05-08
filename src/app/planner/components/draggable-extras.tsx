import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

interface DraggableMarkerData {
	type: string;
	label: string;
	imageSrc: string;
	color?: string;
}

interface DraggableClassesData {
	type: string;
	label: string;
	imageSrc: string;
}

interface DraggableRolesData {
	type: string;
	label: string;
	imageSrc: string;
	color?: string;
}

function DraggableMarker({ label, type, imageSrc }: DraggableMarkerData) {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: label,
		data: {
			type: "draggableItem",
			label: label,
			itemType: type,
			imageSrc: imageSrc,
		},
	});

	const style = {
		...(transform && { transform: CSS.Translate.toString(transform) }),
	};

	return (
		<div ref={setNodeRef} style={style} {...listeners} {...attributes}>
			<Image
				src={imageSrc ? imageSrc : "/images/classes/default.png"}
				alt={label ? `${label} icon` : "Default icon"}
				width={42}
				height={42}
				className="flex-shrink-0 bg-transparent p-0.5"
				priority={false}
			/>
		</div>
	);
}

function DraggableClasses({ label, type, imageSrc }: DraggableClassesData) {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: label,
		data: {
			type: "draggableItem",
			label: label,
			itemType: type,
			imageSrc: imageSrc,
		},
	});

	const style = {
		...(transform && { transform: CSS.Translate.toString(transform) }),
	};

	return (
		<div ref={setNodeRef} style={style} {...listeners} {...attributes}>
			<Image
				src={imageSrc ? imageSrc : "/images/classes/default.png"}
				alt={label ? `${label} icon` : "Default icon"}
				width={42}
				height={42}
				className="rounded-full border border-black flex-shrink-0 bg-transparent "
				priority={false}
			/>
		</div>
	);
}

function DraggableRoles({ label, type, imageSrc }: DraggableRolesData) {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: label,
		data: {
			type: "draggableItem",
			label: label,
			itemType: type,
			imageSrc: imageSrc,
		},
	});

	const style = {
		...(transform && { transform: CSS.Translate.toString(transform) }),
	};

	return (
		<div ref={setNodeRef} style={style} {...listeners} {...attributes}>
			<Image
				src={imageSrc ? imageSrc : "/images/roles/default.png"}
				alt={label ? `${label} icon` : "Default icon"}
				width={42}
				height={42}
				className="flex-shrink-0 bg-transparent p-0.5"
				priority={false}
			/>
		</div>
	);
}

function MarkerOverlay({
	imageSrc,
	label,
}: {
	imageSrc: string;
	label: string;
}) {
	return (
		<Image
			src={imageSrc || "/images/classes/default.png"}
			alt={`${label} icon` || "Default icon"}
			width={42}
			height={42}
			className="flex-shrink-0 bg-transparent p-0.5"
			priority={false}
		/>
	);
}

function ClassesOverlay({
	imageSrc,
	label,
}: {
	imageSrc: string;
	label: string;
}) {
	return (
		<Image
			src={imageSrc || "/images/classes/default.png"}
			alt={`${label} icon` || "Default icon"}
			width={42}
			height={42}
			className="rounded-full border border-black flex-shrink-0 bg-transparent "
			priority={false}
		/>
	);
}

function RolesOverlay({
	imageSrc,
	label,
}: {
	imageSrc: string;
	label: string;
}) {
	return (
		<Image
			src={imageSrc || "/images/roles/default.png"}
			alt={`${label} icon` || "Default icon"}
			width={42}
			height={42}
			className="rounded-full border border-black flex-shrink-0 bg-transparent "
			priority={false}
		/>
	);
}

export {
	DraggableMarker,
	MarkerOverlay,
	ClassesOverlay,
	DraggableClasses,
	DraggableRoles,
	RolesOverlay,
};
export type { DraggableMarkerData, DraggableClassesData, DraggableRolesData };
