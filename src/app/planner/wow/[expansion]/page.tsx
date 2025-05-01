'use client'
import GlobalNavigationBar from "@/components/global/global-navigation-bar";
import { raidItem } from "@/types/gameData";
import { useState } from "react";
interface NavigationSelection {
	expansionName: string | null;
	expansionSlug: string | null;
	raidItem: raidItem | null;
	raidSlug: string | null;
	bossName: string | null;
	bossSlug: string | null;
}

export default function Page() {
	const [currentSelection, setCurrentSelection] = useState<NavigationSelection>({
		expansionName: null,
		expansionSlug: null,
		raidItem: null,
		raidSlug: null,
		bossName: null,
		bossSlug: null,
	});
	return (
		<div className="min-h-screen bg-background py-8 flex flex-col">
			<div className="-translate-y-6">
				<GlobalNavigationBar
					currentSelection={currentSelection}
					setCurrentSelection={setCurrentSelection}
				/>
                <h2>test</h2>
			</div>
		</div>
	);
}
