"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Sun } from "lucide-react";
import { Button } from "../ui/button";
import { expansion, raids } from "@/lib/gameData";
import { raidItem } from "@/types/gameData";


interface NavigationSelection {
	expansionName: string | null;
	expansionSlug: string | null;
	raidItem: raidItem | null;
	raidSlug: string | null;
	bossName: string | null;
	bossSlug: string | null;
}

export default function GlobalNavigationBar({
	currentSelection,
	setCurrentSelection
}: {
	currentSelection: NavigationSelection;
	setCurrentSelection: (selection: NavigationSelection) => void;
}) {
	const pathname = usePathname();
	const router = useRouter();

	const [date] = useState(new Date());
	const pathSegments = pathname.split("/").filter((segment) => segment !== "");

	let expansionSlugFromPath: string | null = null;
	let raidSlugFromPath: string | null = null;
	let bossSlugFromPath: string | null = null;

	if (pathSegments[0] === "planner" && pathSegments[1] === "wow") {
		if (pathSegments.length > 2) {
			expansionSlugFromPath = pathSegments[2];
		}
		if (pathSegments.length > 3) {
			raidSlugFromPath = pathSegments[3];
		}
		if (pathSegments.length > 4) {
			bossSlugFromPath = pathSegments[4];
		}
	}

	const currentExpansionFromPath = expansion.find(
		(exp) =>
			exp.name.toLowerCase().replace(/\s+/g, "_") === expansionSlugFromPath
	);

	let currentRaidFromPath: raidItem | undefined;

	if (raidSlugFromPath) {
		currentRaidFromPath = raids.find(
			(item) => item.raidNameSlug === raidSlugFromPath
		);
	} else if (currentExpansionFromPath) {
		currentRaidFromPath = raids.find(
			(item) => item.expansion === currentExpansionFromPath.name
		);
	} else {
		currentRaidFromPath = raids.length > 0 ? raids[0] : undefined;
	}

	const availableBossesForMenu = currentSelection.raidItem?.bossList || [];

	const defaultBossImage = "/raid-artworks/expansion-logos/default.png";
	const defaultRaidImage = defaultBossImage;
	const defaultRaidName =
		raids.length > 0 ? "Select a raid" : "No raids available";

	const defaultExpansionImage =
		expansion.length > 0
			? "/raid-artworks/expansion-logos/wow-default.png"
			: defaultBossImage;
	const defaultExpansionName =
		expansion.length > 0
			? expansion[expansion.length - 1].name
			: "Select Expansion";

	const selectedExpansionObject = expansion.find(
		(exp) => exp.name === currentSelection.expansionName
	);

	const formattedDate = date.toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});

	const filteredRaids = useMemo(() => {
		if (
			currentSelection.expansionName === null ||
			currentSelection.expansionName === "Show All Expansions"
		) {
			return raids.sort((a, b) => {
				const expA =
					expansion.find((exp) => exp.name === a.expansion)?.id || 999;
				const expB =
					expansion.find((exp) => exp.name === b.expansion)?.id || 999;
				return expA - expB;
			});
		}
		return raids.filter(
			(raid) => raid.expansion === currentSelection.expansionName
		);
	}, [currentSelection.expansionName, raids, expansion]);


	useEffect(() => {
		const newSelection: NavigationSelection = {
			expansionName: null,
			expansionSlug: null,
			raidItem: null,
			raidSlug: null,
			bossName: null,
			bossSlug: null,
		};

		if (currentExpansionFromPath) {
			newSelection.expansionName = currentExpansionFromPath.name;
			newSelection.expansionSlug = expansionSlugFromPath;
		} else if (expansionSlugFromPath === "all") {
			newSelection.expansionName = null;
			newSelection.expansionSlug = "all";
		}

		if (currentRaidFromPath) {
			newSelection.raidItem = currentRaidFromPath;
			newSelection.raidSlug = raidSlugFromPath;
		} else if (newSelection.expansionName) {
			const firstRaidInSelectedExp = raids.find(
				(item) => item.expansion === newSelection.expansionName
			);
			if (firstRaidInSelectedExp) {
				newSelection.raidItem = firstRaidInSelectedExp;
				newSelection.raidSlug = firstRaidInSelectedExp.raidNameSlug;
			}
		} else if (raids.length > 0) {
			newSelection.raidItem = raids[0];
			newSelection.raidSlug = raids[0].raidNameSlug;
		}

		if (bossSlugFromPath && newSelection.raidItem?.bossList) {
			const bossFromPath = newSelection.raidItem.bossList.find(
				(boss) =>
					boss.name.toLowerCase().replace(/\s+/g, "_") === bossSlugFromPath
			);
			if (bossFromPath) {
				newSelection.bossName = bossFromPath.name;
				newSelection.bossSlug = bossSlugFromPath;
			}
		} else if (
			newSelection.raidItem?.bossList &&
			newSelection.raidItem.bossList.length > 0
		) {
			const firstBoss = newSelection.raidItem.bossList[0];
			newSelection.bossName = firstBoss.name;
			newSelection.bossSlug = firstBoss.name.toLowerCase().replace(/\s+/g, "_");
		}

		setCurrentSelection(newSelection);
	}, [
		pathname,
		raids,
		expansion,
		expansionSlugFromPath,
		raidSlugFromPath,
		bossSlugFromPath,
		currentExpansionFromPath,
		currentRaidFromPath,
	]);

	const handleSelectExpansion = (expansionName: string | null) => {
		let targetUrl: string;
		const newSelection = { ...currentSelection };

		if (expansionName === null) {

			newSelection.expansionName = null;
			newSelection.expansionSlug = "all";
			newSelection.raidItem = null;
			newSelection.raidSlug = null;
			newSelection.bossName = null;
			newSelection.bossSlug = null;
			targetUrl = `/planner/wow/all`;
		} else {
			// Select specific expansion
			newSelection.expansionName = expansionName;
			newSelection.expansionSlug = expansionName
				.toLowerCase()
				.replace(/\s+/g, "_");

			// Find first raid in the selected expansion
			const firstRaid = raids.find((raid) => raid.expansion === expansionName);

			if (firstRaid) {
				newSelection.raidItem = firstRaid;
				newSelection.raidSlug = firstRaid.raidNameSlug;

				// Find first boss in the selected raid
				if (firstRaid.bossList && firstRaid.bossList.length > 0) {
					const firstBoss = firstRaid.bossList[0];
					newSelection.bossName = firstBoss.name;
					newSelection.bossSlug = firstBoss.name
						.toLowerCase()
						.replace(/\s+/g, "_");
					targetUrl = `/planner/wow/${newSelection.expansionSlug}/${newSelection.raidSlug}/${newSelection.bossSlug}`;
				} else {
					newSelection.bossName = null;
					newSelection.bossSlug = null;
					targetUrl = `/planner/wow/${newSelection.expansionSlug}/${newSelection.raidSlug}`;
				}
			} else {
				newSelection.raidItem = null;
				newSelection.raidSlug = null;
				newSelection.bossName = null;
				newSelection.bossSlug = null;
				targetUrl = `/planner/wow/${newSelection.expansionSlug}`;
			}
		}

		setCurrentSelection(newSelection);
		router.push(targetUrl);
	};

	const handleSelectRaid = (raid: raidItem) => {
		const newSelection = { ...currentSelection };
		newSelection.raidItem = raid;
		newSelection.raidSlug = raid.raidNameSlug;

		// Select first boss by default
		if (raid.bossList && raid.bossList.length > 0) {
			const firstBoss = raid.bossList[0];
			newSelection.bossName = firstBoss.name;
			newSelection.bossSlug = firstBoss.name.toLowerCase().replace(/\s+/g, "_");
		} else {
			newSelection.bossName = null;
			newSelection.bossSlug = null;
		}

		// Construct URL
		const expansionSlug =
			raid.expansion?.toLowerCase().replace(/\s+/g, "_") ||
			currentSelection.expansionSlug ||
			"all";

		let targetUrl = `/planner/wow/${expansionSlug}/${raid.raidNameSlug}`;

		// Include boss in URL if available
		if (newSelection.bossSlug) {
			targetUrl += `/${newSelection.bossSlug}`;
		}

		setCurrentSelection(newSelection);
		router.push(targetUrl);

	};

	const handleSelectBoss = (bossName: string) => {
		if (!currentSelection.raidItem || !currentSelection.expansionName) {
			console.warn("Cannot select boss, raid or expansion not selected");
			return;
		}

		const bossObject = currentSelection.raidItem.bossList?.find(
			(b) => b.name === bossName
		);

		if (!bossObject) {
			console.warn(`Boss "${bossName}" not found in displayed raid.`);
			return;
		}

		const newSelection = { ...currentSelection };
		newSelection.bossName = bossName;
		newSelection.bossSlug = bossName.toLowerCase().replace(/\s+/g, "_");

		const expansionSlug =
			currentSelection.expansionSlug ||
			currentSelection.expansionName.toLowerCase().replace(/\s+/g, "_");
		const raidSlug =
			currentSelection.raidSlug || currentSelection.raidItem.raidNameSlug;
		const bossSlug = newSelection.bossSlug;

		const targetUrl = `/planner/wow/${expansionSlug}/${raidSlug}/${bossSlug}`;

		setCurrentSelection(newSelection);
		router.push(targetUrl);

	};

	return (
		<div className="flex justify-center items-center w-full py-4 px-2 z-20">
			<div className="flex items-center justify-between w-full max-w-screen-xl">
				{/* Added 'gap-1 md:gap-2 md:space-x-4' to reduce gap on mobile */}
				<div className="flex items-center gap-1 md:gap-2 md:space-x-4">
					{/* Section One - Expansions */}
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								{/* Reduced padding on mobile with 'p-1 md:p-1' */}
								<NavigationMenuTrigger>
									<div className="flex items-center gap-1 md:gap-2 p-1 md:p-1">
										<Image
											src={
												selectedExpansionObject
													? selectedExpansionObject.image
													: defaultExpansionImage
											}
											alt={
												selectedExpansionObject
													? selectedExpansionObject.name
													: defaultExpansionName
											}
											width={140}
											height={140}
											// Modified image size and shape on mobile
											className="w-8 h-8 rounded-full object-cover md:w-auto md:h-12 md:rounded-sm"
											priority={true}
										/>
									</div>
								</NavigationMenuTrigger>
								<NavigationMenuContent>
									{/* Reduced menu width on mobile with 'w-[160px] md:w-[200px]' */}
									<ul className="p-2 w-[160px] md:w-[200px]">
										<ScrollArea className="h-[400px]">
											{expansion.map((exp) => (
												<li key={exp.id} className="mb-1 last:mb-0">
													<div
														className={`flex flex-col items-center p-1 m-1 relative overflow-hidden rounded-md cursor-pointer
													transition-all duration-200 ease-in-out
													${
														exp.name === currentSelection.expansionName
															? "bg-gray-200"
															: "z-10 hover:bg-accent hover:text-accent-foreground hover:ring-1 hover:ring-primary focus:outline-none focus:ring-2 focus:ring-primary"
													}`}
														onClick={() => handleSelectExpansion(exp.name)}
													>
														{exp.image && (
															<Image
																src={exp.image}
																alt={exp.name}
																width={140}
																height={140}
																// Reduced image size on mobile with 'w-auto h-10 md:h-14'
																className="w-auto h-10 md:h-14 object-cover rounded-sm scale-90"
																priority={true}
															/>
														)}
														{/* Reduced text size on mobile with 'text-xs md:text-sm' */}
														<span className="text-xs md:text-sm">
															{exp.name}
														</span>
													</div>
												</li>
											))}

											<li key="all-expansions">
												<div
													className={`flex flex-col items-center p-1 m-1 relative overflow-hidden rounded-md cursor-pointer
												transition-all duration-200 ease-in-out
												${
													currentSelection.expansionName === null
														? "bg-gray-200"
														: "z-10 hover:bg-accent hover:text-accent-foreground hover:ring-1 hover:ring-primary focus:outline-none focus:ring-2 focus:ring-primary"
												}`}
													onClick={() => handleSelectExpansion(null)}
												>
													<Image
														src={defaultExpansionImage}
														alt="All Expansions"
														width={140}
														height={140}
														// Reduced image size on mobile with 'w-auto h-10 md:h-14'
														className="w-auto h-10 md:h-14 object-cover rounded-sm scale-90"
														priority={true}
													/>
													{/* Reduced text size on mobile with 'text-xs md:text-sm' */}
													<span className="text-xs md:text-sm">
														Show All Expansions
													</span>
												</div>
											</li>
										</ScrollArea>
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>

					{/* Section Two - Raids  */}
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								{/* Reduced padding on mobile with 'p-1 md:p-1' */}
								<NavigationMenuTrigger>
									<div className="flex items-center gap-2 md:gap-4 p-1 md:p-1">
										<Image
											src={
												currentSelection.raidItem
													? currentSelection.raidItem.image
													: defaultRaidImage
											}
											alt={
												currentSelection.raidItem
													? currentSelection.raidItem.title
													: "select a raid"
											}
											width={140}
											height={140}
											// Reduced image size on mobile with 'w-8 h-8 md:w-10 md:h-10'
											className="w-8 h-8 md:w-10 md:h-10 object-cover rounded-full"
											priority={true}
										/>
										{/* Reduced text size on mobile with 'text-xs md:text-sm' */}
										<span className="text-xs md:text-sm">
											{currentSelection.raidItem
												? currentSelection.raidItem.title
												: defaultRaidName}
										</span>
									</div>
								</NavigationMenuTrigger>
								<NavigationMenuContent>
									{/* Reduced menu width on mobile with 'w-[250px] md:w-[400px]' */}
									<ul className="p-2 w-[250px] md:w-[400px] ">
										{filteredRaids.map((raid) => (
											<li key={raid.title} className="mb-1 last:mb-0">
												{raid.available ? (
													<div
														onClick={() => handleSelectRaid(raid)}
														// Reduced padding on mobile with 'p-1 md:p-1'
														className={`flex items-center gap-2 md:gap-4 p-1 md:p-1 relative overflow-hidden rounded-md cursor-pointer
														transition-all duration-200 ease-in-out
														${
															raid.raidNameSlug === currentSelection.raidSlug
																? "bg-gray-200"
																: "z-10 hover:bg-accent hover:text-accent-foreground hover:ring-1 hover:ring-primary focus:outline-none focus:ring-2 focus:ring-primary"
														}`}
													>
														{raid.image && (
															<Image
																src={raid.image}
																alt={`Raid Artwork ${raid.title}`}
																width={400}
																height={400}
																// Reduced image size on mobile with 'w-8 h-8 md:w-10 md:h-10'
																className="w-8 h-8 md:w-10 md:h-10 object-cover rounded-full"
																priority={true}
															/>
														)}
														{raid.title && (
															<span
																// Reduced text size on mobile with 'text-xs md:text-sm'
																className={`font-semibold text-xs md:text-sm ${
																	raid.raidNameSlug ===
																	currentSelection.raidSlug
																		? "text-primary dark:text-primary-foreground"
																		: ""
																}`}
															>
																{raid.title}
															</span>
														)}
													</div>
												) : (
													<div className="flex items-center gap-4 p-1 relative rounded-md opacity-50 cursor-not-allowed mb-2 last:mb-0">
														{raid.image && (
															<Image
																src={raid.image}
																alt={`Raid Artwork ${raid.title}`}
																width={400}
																height={400}
																// Reduced image size on mobile with 'w-8 h-8 md:w-10 md:h-10'
																className="w-8 h-8 md:w-10 md:h-10 object-cover rounded-full"
																priority={true}
															/>
														)}
														{raid.title && (
															<span
																// Reduced text size on mobile with 'text-xs md:text-sm'
																className={`font-semibold text-xs md:text-sm ${
																	raid.raidNameSlug ===
																	currentSelection.raidSlug
																		? "text-primary dark:text-primary-foreground"
																		: ""
																}`}
															>
																{raid.title}
															</span>
														)}

														<div className="absolute inset-0 z-30 flex items-center justify-end pr-4 rounded-md">
															{/* Reduced text size on mobile with 'text-xs md:text-sm' */}
															<span className=" text-xs md:text-sm font-semibold px-1 py-0.5 rounded">
																Not currently available
															</span>
														</div>
													</div>
												)}
											</li>
										))}

										{filteredRaids.length === 0 &&
											currentSelection.expansionName && (
												<li className="p-2 text-sm text-muted-foreground">
													No raids found for {currentSelection.expansionName}.
												</li>
											)}
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>

					{/*Section Three - bosses */}
					<NavigationMenu>
						<NavigationMenuList>
							{currentSelection.raidItem?.bossList &&
								currentSelection.raidItem.bossList.length > 0 && (
									<NavigationMenuItem>
										{/* Reduced padding on mobile with 'p-1 md:p-1' */}
										<NavigationMenuTrigger>
											<div className="flex items-center gap-2 md:gap-4 p-1 md:p-1">
												<Image
													src={
														currentSelection.bossName
															? currentSelection.raidItem.bossList.find(
																	(b) => b.name === currentSelection.bossName
															  )?.image || defaultBossImage
															: defaultBossImage
													}
													alt={
														currentSelection.bossName || "Choose an encounter"
													}
													width={140}
													height={140}
													// Reduced image size on mobile with 'w-8 h-8 md:w-10 md:h-10'
													className="w-8 h-8 md:w-10 md:h-10 object-cover rounded-full"
													priority={true}
												/>
												{/* Reduced text size on mobile with 'text-xs md:text-sm' */}
												<span className="text-xs md:text-sm">
													{currentSelection.bossName || "Choose an encounter"}
												</span>
											</div>
										</NavigationMenuTrigger>
										<NavigationMenuContent>
											{/* Reduced menu width on mobile with 'w-[250px] md:w-[400px]' */}
											<ul className="p-2 w-[250px] md:w-[400px]">
												{currentSelection.raidItem.bossList.map((boss) => (
													<li
														key={boss.id}
														// Reduced padding on mobile with 'p-1 md:p-1'
														className={`flex items-center gap-2 md:gap-4 p-1 md:p-1 relative overflow-hidden rounded-md cursor-pointer
												transition-all duration-200 ease-in-out
												${
													boss.name === currentSelection.bossName
														? "bg-gray-200"
														: "z-10 hover:bg-accent hover:text-accent-foreground hover:ring-1 hover:ring-primary focus:outline-none focus:ring-2 focus:ring-primary"
												}`}
														onClick={() => handleSelectBoss(boss.name)}
													>
														<Image
															src={boss.image}
															alt={boss.name}
															width={140}
															height={140}
															// Reduced image size on mobile with 'w-8 h-8 md:w-10 md:h-10'
															className="w-8 h-8 md:w-10 md:h-10 object-cover rounded-full"
															priority={true}
														/>

														<span
															// Reduced text size on mobile with 'text-xs md:text-sm'
															className={`font-semibold text-xs md:text-sm ${
																boss.name === currentSelection.bossName
																	? "text-primary dark:text-primary-foreground"
																	: ""
															}`}
														>
															{boss.name}
														</span>
													</li>
												))}
											</ul>
										</NavigationMenuContent>
									</NavigationMenuItem>
								)}
						</NavigationMenuList>
					</NavigationMenu>
				</div>
				<div className="flex items-center gap-2">
					<div className="flex items-center gap-2 ">
						{/* Hidden on mobile with 'hidden sm:inline' */}
						<span className=" hidden sm:inline text-sm font-semibold">
							{formattedDate}
						</span>
					</div>
					<Button
						variant="ghost"
						aria-label="Toggle theme"
						onClick={() => {
							document.documentElement.classList.toggle("dark");
							const isDarkMode =
								document.documentElement.classList.contains("dark");
							localStorage.setItem("theme", isDarkMode ? "dark" : "light");
						}}
					>
						<Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
					</Button>
				</div>
			</div>
		</div>
	);
}

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";
