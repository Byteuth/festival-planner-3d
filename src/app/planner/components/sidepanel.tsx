import { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { draggableNPCs, raids } from "@/lib/gameData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SidePanel() {
	const pathname = usePathname();
	const pathSegments = pathname.split("/").filter((segment) => segment !== "");
	const raidSlug = pathSegments[3];
	const raidBossName =
		pathSegments[4].charAt(0).toUpperCase() + pathSegments[4].slice(1);
	const raidBosses =
		raids.find((raid) => raid.raidNameSlug === raidSlug)?.bossList || [];

	const [currentSelection, setCurrentSelection] = useState<{
		bossName: string;
		raidItem: any;
	}>({
		bossName: raidBossName || "",
		raidItem: raidBosses.find((boss) => boss.name === raidBossName) || null,
	});

	const [isNavOpen, setIsNavOpen] = useState(false);
	const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const handleSelectBoss = (bossName: string) => {
		const selectedBoss = raidBosses.find((boss) => boss.name === bossName);
		setCurrentSelection({
			bossName: bossName,
			raidItem: selectedBoss || null,
		});
		setIsNavOpen(false);
	};

	const handleMouseEnter = () => {
		if (closeTimeoutRef.current) {
			clearTimeout(closeTimeoutRef.current);
			closeTimeoutRef.current = null;
		}
		setIsNavOpen(true);
	};

	const handleMouseLeave = () => {
		closeTimeoutRef.current = setTimeout(() => {
			setIsNavOpen(false);
		}, 200);
	};

	return (
		<div className="bg-gray-100 border-l border-gray-300 shadow-md w-96 overflow-y-auto flex flex-col p-4 z-20">
			<h2 className="text-lg font-semibold text-center pb-4">Raid Journal</h2>
			<div className="relative">
				<div
					className="flex items-center gap-2 md:gap-4 p-2 md:p-3 bg-white rounded-md shadow-sm cursor-pointer mb-2"
					onClick={() => setIsNavOpen(!isNavOpen)}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<Image
						src={currentSelection.raidItem?.image || "/placeholder.jpg"}
						alt={currentSelection.bossName || "Choose an encounter"}
						width={140}
						height={140}
						className="w-8 h-8 md:w-10 md:h-10 object-cover rounded-full"
						priority={true}
					/>
					<span className="text-xs md:text-sm font-medium flex-1">
						{currentSelection.bossName || "Choose an encounter"}
					</span>
					<svg
						className={`w-4 h-4 transition-transform ${
							isNavOpen ? "rotate-180" : ""
						}`}
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</div>

				{isNavOpen && (
					<div
						className="absolute top-full left-0 right-0 bg-white rounded-md shadow-sm overflow-hidden z-30"
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						<ul className="p-1">
							{raidBosses.map((boss) => (
								<li
									key={boss.id}
									className={`flex items-center gap-2 md:gap-4 p-2 md:p-2 relative overflow-hidden rounded-md cursor-pointer
                  transition-all duration-200 ease-in-out select-none
                  ${
										boss.name === currentSelection.bossName
											? "bg-gray-200"
											: "hover:bg-gray-100"
									}`}
									onClick={() => handleSelectBoss(boss.name)}
								>
									<Image
										src={boss.image}
										alt={boss.name}
										width={140}
										height={140}
										className="w-8 h-8 md:w-10 md:h-10 object-cover rounded-full"
										priority={true}
									/>
									<span
										className={`font-medium text-xs md:text-sm ${
											boss.name === currentSelection.bossName
												? "text-primary"
												: ""
										}`}
									>
										{boss.name}
									</span>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
			<Tabs defaultValue="account" className="w-[350px] pt-4 pb-2">
				<TabsList className="grid w-full grid-cols-2 ">
					<TabsTrigger value="abilities">Abilities</TabsTrigger>
					<TabsTrigger value="loot">Loot</TabsTrigger>
				</TabsList>
				<TabsContent value="abilities">
					<Card>
						<CardHeader>
							<CardTitle>Abilities</CardTitle>
							<CardDescription>
								Make changes to your account here. Click save when you're done.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-2">
							<div className="space-y-1">
								<Label htmlFor="name">Name</Label>
								<Input id="name" defaultValue="Pedro Duarte" />
							</div>
							<div className="space-y-1">
								<Label htmlFor="username">Username</Label>
								<Input id="username" defaultValue="@peduarte" />
							</div>
						</CardContent>
						<CardFooter>
							<Button>Save changes</Button>
						</CardFooter>
					</Card>
				</TabsContent>
				<TabsContent value="loot">
					<Card>
						<CardHeader>
							<CardTitle>Loot</CardTitle>
							<CardDescription>
								Change your password here. After saving, you'll be logged out.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-2">
							<div className="space-y-1">
								{(() => {
									const selectedNPC = draggableNPCs.find(
										(npc) => npc.name === currentSelection.bossName
									);

									if (selectedNPC?.lootTable) {
										return (
											<div className="space-y-4">
												<div>
													<h3 className="font-semibold">Exclusive Loot:</h3>
													<ul className="list-disc list-inside">
														{selectedNPC.lootTable.exclusive.map(
															(item, index) => (
																<li key={index}>{item}</li>
															)
														)}
													</ul>
												</div>
												<div>
													<h3 className="font-semibold">Shared Loot:</h3>
													<ul className="list-disc list-inside">
														{selectedNPC.lootTable.shared.map((item, index) => (
															<li key={index}>{item}</li>
														))}
													</ul>
												</div>
											</div>
										);
									} else {
										return <p>No loot table available for this boss.</p>;
									}
								})()}
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
			<div className="flex-1 mt-2">
				<div className="mb-3">
					<p className="text-sm text-gray-600">
						This panel will always remain visible on the right side of the
						ResizablePanel, even when the screen width is reduced.
					</p>
				</div>
				<div className="space-y-3 mt-4">
					<div className="bg-white p-2 rounded shadow-sm">Item 1</div>
					<div className="bg-white p-2 rounded shadow-sm">Item 2</div>
					<div className="bg-white p-2 rounded shadow-sm">Item 3</div>
				</div>
			</div>
		</div>
	);
}
