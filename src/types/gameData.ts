export interface expansionItem {
	name: string;
	id: number;
	image: string;
}

export interface BossItem {
	name: string;
	id: number;
	image: string;
}

export interface raidItem {
	title: string;
	href: string;
	image: string;
	expansion?: string;
	description: string;
	available?: boolean;
	raidNameSlug: string;
	bossList?: BossItem[];
	background?: string;
}
