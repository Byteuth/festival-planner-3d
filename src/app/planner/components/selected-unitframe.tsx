import {
	draggableNPCs,
	wowRoles,
	wowClasses,
	wowClassColors,
} from "@/lib/gameData";
import { DraggedItemData } from "../types/planner-types";
import Image from "next/image";

interface SelectedUnitFrameProps {
	selectedUnit: DraggedItemData | null;
}

interface DisplayDataProps {
	name: string;
	image?: string;
	bgColor?: string;
    textColor?: string;
}

export default function SelectedUnitFrame({
	selectedUnit,
}: SelectedUnitFrameProps) {
	let displayData: DisplayDataProps = {
		name: "Unknown",
		image: "",
		bgColor: "",
        textColor: "",
	};

	if (selectedUnit) {
		displayData = {
			name: "Unknown",
			image: "",
			bgColor: "",
            textColor: "",
		};

		switch (selectedUnit.type) {
			case "npc":
				const cleanId = selectedUnit.id.split("-")[0];
				const matchingNPC = draggableNPCs.find((npc) => npc.id === cleanId);
				if (matchingNPC) {
					displayData.name = matchingNPC.name;
					displayData.image = matchingNPC.image;
					displayData.bgColor = "bg-gradient-to-t from-[#911704] to-[#f12a0c]";
                    displayData.textColor = "black";
				}
				break;
			case "roles":
				const matchingRole = wowRoles.find(
					(role) => role.label === selectedUnit.label
				);
				if (matchingRole) {
					displayData.name = matchingRole.name || selectedUnit.label;
					displayData.image = matchingRole.imageSrc;
					displayData.bgColor = matchingRole.color
                    displayData.textColor = 'white'
                    // console.log(matchingRole)
				}
				break;
			case "class":
				const matchingClass = wowClasses.find(
					(cls) => cls.label === selectedUnit.label
				);
				if (matchingClass) {
					displayData.name =
						matchingClass.label.charAt(0).toUpperCase() +
						matchingClass.label.slice(1);
					displayData.image = matchingClass.imageSrc;
					displayData.bgColor = wowClassColors[displayData.name] || "#000000";
                    displayData.textColor = "black";
				}
				break;
			case "player":
				displayData.name = selectedUnit.label || "Player";
				// displayData.image = selectedUnit?.image || "";
				if (
					selectedUnit.playerClass &&
					wowClassColors[selectedUnit.playerClass]
				) {
					displayData.bgColor = wowClassColors[selectedUnit.playerClass];
                    displayData.textColor = "black";
				} else {
					displayData.bgColor = "#000000";
				}
				break;

			default:
				displayData = {
					name: "Unknown",
					image: "",
					bgColor: "",
                    textColor: "",
				};
		}
	}


	return (
		<div className="absolute top-0 left-0 p-4">
			<div className="flex items-center relative">
				{/* Unitframe Image */}
				<div className="relative z-10">
					<Image
						src="/images/assets/unitframe.png"
						alt="unitframe"
						width={248}
						height={80}
						className="h-auto w-auto"
						priority={false}
					/>
				</div>

				{/* Display Image */}
				<div className="absolute left-0 top-0 flex items-center justify-center w-20 h-full z-5">
					<div className="w-22 h-22 rounded-full overflow-hidden translate-x-3 -translate-y-0.5">
						{displayData?.image ? (
							<Image
								src={displayData.image}
								alt={`${displayData?.name || "Unknown"} image`}
								width={128}
								height={128}
								className="w-full h-full object-cover bg-black"
								priority={false}
							/>
						) : (
							<div className="w-full h-full bg-gray-300 flex items-center justify-center">
								<span className="text-4xl font-semibold text-black">?</span>
							</div>
						)}
					</div>
					<div className="absolute left-20 top-0 flex flex-col w-[155px] h-full translate-x-4 translate-y-6">
						<div
							className={
								selectedUnit?.type === "npc" ? displayData.bgColor : ""
							}
							style={{
								backgroundColor:
									selectedUnit?.type !== "npc"
										? displayData.bgColor
										: undefined,
								height: "1.5rem",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								padding: "0 0.5rem",
								color: "white",
								fontWeight: "500",
								overflow: "hidden",
							}}
						>
							<span className={`truncate text-m font-semibold text-${displayData.textColor}`}>
								{displayData?.name || "Unknown"}
							</span>
						</div>

						<div className="h-4 bg-gradient-to-t from-[#296815] to-[#6cf33a]"></div>
						<div className="h-4 bg-gradient-to-t from-[#070588] to-[#0f17f7]"></div>
					</div>
				</div>
			</div>
		</div>
	);
}
