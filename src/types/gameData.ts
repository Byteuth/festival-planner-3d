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


export interface WowItemsProps {
		name: string,
		slug: string,
		rarity: 'Uncommon'| 'Rare'| 'Epic'| 'Legendary' | 'Artifact'
		imagesrc: string

}