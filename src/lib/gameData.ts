import {
	DraggableClassesData,
	DraggableMarkerData,
} from "@/app/planner/components/draggable-extras";
import { DraggableNPCData } from "@/app/planner/components/draggable-npc";
import { DraggablePlayerData } from "@/app/planner/components/draggable-player";
import { expansionItem, raidItem, WowItemsProps } from "@/types/gameData";

export const expansion: expansionItem[] = [
	{
		name: "Classic",
		id: 1,
		image: "/raid-artworks/expansion-logos/classic.png",
	},
	{
		name: "The Burning Crusade",
		id: 2,
		image: "/raid-artworks/expansion-logos/tbc.png",
	},
	{
		name: "Wrath of the Lich King",
		id: 3,
		image: "/raid-artworks/expansion-logos/wotlk.png",
	},
	{
		name: "Cataclysm",
		id: 4,
		image: "/raid-artworks/expansion-logos/cata.png",
	},
	{
		name: "Mists of Pandaria",
		id: 5,
		image: "/raid-artworks/expansion-logos/mop.png",
	},
	{
		name: "Warlords of Draenor",
		id: 6,
		image: "/raid-artworks/expansion-logos/wod.png",
	},
	{
		name: "Legion",
		id: 7,
		image: "/raid-artworks/expansion-logos/legion.png",
	},
	{
		name: "Battle for Azeroth",
		id: 8,
		image: "/raid-artworks/expansion-logos/bfa.png",
	},
	{
		name: "Shadowlands",
		id: 9,
		image: "/raid-artworks/expansion-logos/shadowlands.png",
	},
	{
		name: "Dragonflight",
		id: 10,
		image: "/raid-artworks/expansion-logos/dragonflight.png",
	},
];

export const raids: raidItem[] = [
	{
		title: "Molten Core",
		href: "planner/wow.raid=molten_core",
		image: "/raid-artworks/mc-loader.jpg",
		description: "",
		expansion: "Classic",
		available: true,
		raidNameSlug: "molten_core",
		bossList: [
			{
				name: "Lucifron",
				id: 1,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-lucifron.png",
			},
			{
				name: "Magmadar",
				id: 2,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-magmadar.png",
			},
			{
				name: "Gehennas",
				id: 3,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-gehennas.png",
			},
			{
				name: "Garr",
				id: 4,
				image: "https://wow.zamimg.com/images/wow/journal/ui-ej-boss-garr.png",
			},
			{
				name: "Baron Geddon",
				id: 5,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-baron-geddon.png",
			},
			{
				name: "Shazzrah",
				id: 6,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-shazzrah.png",
			},
			{
				name: "Sulfuron Harbinger",
				id: 7,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-sulfuron-harbinger.png",
			},
			{
				name: "Golemagg the Incinerator",
				id: 8,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-golemagg-the-incinerator.png",
			},
			{
				name: "Majordomo Executus",
				id: 9,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-majordomo-executus.png",
			},
			{
				name: "Ragnaros",
				id: 10,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-ragnaros.png",
			},
		],
		background: "#C9451B",
	},
	{
		title: "Onyxia",
		href: "planner/wow.raid=onyxia",
		image: "/raid-artworks/onyxia-loader.png",
		description: "",
		expansion: "Classic",
		available: true,
		raidNameSlug: "onyxia",
		bossList: [
			{
				name: "Onyxia",
				id: 1,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-onyxia.png",
			},
		],
		background: "#674355",
	},
	{
		title: "Zul'Gurub",
		href: "planner/wow.raid=zul_gurub",
		image: "/raid-artworks/zg-loader.jpg",
		description: "",
		expansion: "Classic",
		available: true,
		raidNameSlug: "zul_gurub",
		bossList: [
			{
				name: "High Priest Venoxis",
				id: 1,
				image:
					"https://wow.zamimg.com/modelviewer/classic/webthumbs/npc/113/15217.png",
			},
			{
				name: "High Priestess Jeklik",
				id: 2,
				image:
					"https://wow.zamimg.com/modelviewer/classic/webthumbs/npc/115/15219.png",
			},
			{
				name: "High Priestess Mar'li",
				id: 3,
				image:
					"https://wow.zamimg.com/modelviewer/classic/webthumbs/npc/116/15220.png",
			},
			{
				name: "Bloodlord Mandokir",
				id: 1,
				image:
					"https://wow.zamimg.com/modelviewer/classic/webthumbs/npc/24/11288.png",
			},
			{
				name: "Edge of Madness",
				id: 1,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-onyxia.png",
			},
			{
				name: "High Priest Thekal",
				id: 1,
				image:
					"https://wow.zamimg.com/modelviewer/classic/webthumbs/npc/112/15216.png",
			},
			{
				name: "Gahz'ranka",
				id: 1,
				image:
					"https://wow.zamimg.com/modelviewer/classic/webthumbs/npc/184/15288.png",
			},
			{
				name: "High Priestess Arlokk",
				id: 1,
				image:
					"https://wow.zamimg.com/modelviewer/classic/webthumbs/npc/114/15218.png",
			},
			{
				name: "Jin'do the Hexxer",
				id: 1,
				image:
					"https://wow.zamimg.com/modelviewer/classic/webthumbs/npc/47/11311.png",
			},
			{
				name: "Hakkar",
				id: 1,
				image:
					"https://wow.zamimg.com/modelviewer/classic/webthumbs/npc/191/15295.png",
			},
		],
		background: "#556B2F",
	},

	{
		title: "Blackwing Lair",
		href: "planner/wow.raid=blackwing_lair",
		image: "/raid-artworks/bwl-loader.jpg",
		description: "",
		expansion: "Classic",
		available: false,
		raidNameSlug: "blackwing_lair",
		bossList: [
			{
				name: "Razorgore the Untamed",
				id: 1,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-razorgore-the-untamed.png",
			},
			{
				name: "Vaelastrasz the Corrupt",
				id: 2,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-vaelastrasz-the-corrupt.png",
			},
			{
				name: "Broodlord Lashlayer",
				id: 3,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-broodlord-lashlayer.png",
			},
			{
				name: "Firemaw",
				id: 4,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-firemaw.png",
			},
			{
				name: "Ebonroc / Flamegor",
				id: 5,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-ebonroc.png",
			},
			{
				name: "Chromaggus",
				id: 6,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-chromaggus.png",
			},
			{
				name: "Nefarian",
				id: 8,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-nefarian.png",
			},
		],
		background: "#F40006",
	},
	{
		title: "Ahn'Qiraj",
		href: "planner/wow.raid=ahn_qiraj_temple",
		image: "/raid-artworks/aq-loader.jpg",
		description: "",
		expansion: "Classic",
		available: true,
		raidNameSlug: "ahn_qiraj_temple",
		bossList: [
			{
				name: "The Prophet Skeram",
				id: 1,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-the-prophet-skeram.png",
			},
			{
				name: "Silithid Royalty",
				id: 2,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-silithid-royalty.png",
			},
			{
				name: "Fankriss the Unyielding",
				id: 3,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-fankriss-the-unyielding.png",
			},
			{
				name: "Viscidus",
				id: 4,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-viscidus.png",
			},
			{
				name: "Princess Huhuran",
				id: 5,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-princess-huhuran.png",
			},
			{
				name: "Twin Emperors",
				id: 6,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-twin-emperors.png",
			},
			{
				name: "Ouro",
				id: 7,
				image: "https://wow.zamimg.com/images/wow/journal/ui-ej-boss-ouro.png",
			},
			{
				name: "C'Thun",
				id: 8,
				image: "https://wow.zamimg.com/images/wow/journal/ui-ej-boss-cthun.png",
			},
		],
		background: "#662B5B",
	},

	{
		title: "Naxxramas",
		href: "planner/wow.raid=naxxramas",
		image: "/raid-artworks/naxx-loader.jpg",
		description: "",
		expansion: "Classic",
		available: true,
		raidNameSlug: "naxxramas",
		bossList: [
			{
				name: "Patchwerk",
				id: 1,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-patchwerk.png",
			},
			{
				name: "Grobbulus",
				id: 2,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-grobbulus.png",
			},
			{
				name: "Gluth",
				id: 3,
				image: "https://wow.zamimg.com/images/wow/journal/ui-ej-boss-gluth.png",
			},
			{
				name: "Thaddius",
				id: 4,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-thaddius.png",
			},
			{
				name: "Noth the Plaguebringer",
				id: 5,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-noth-the-plaguebringer.png",
			},
			{
				name: "Heigan the Unclean",
				id: 6,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-heigan-the-unclean.png",
			},
			{
				name: "Loatheb",
				id: 7,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-loatheb.png",
			},
			{
				name: "Anub'Rekhan",
				id: 8,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-anubrekhan.png",
			},
			{
				name: "Grand Widow Faerlina",
				id: 9,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-grand-widow-faerlina.png",
			},
			{
				name: "Maexxna",
				id: 10,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-maexxna.png",
			},
			{
				name: "Instructor Razuvious",
				id: 11,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-instructor-razuvious.png",
			},
			{
				name: "Gothik the Harvester",
				id: 12,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-gothik-the-harvester.png",
			},
			{
				name: "The Four Horsemen",
				id: 13,
				image:
					"https://assets.rpglogs.com/img/warcraft/bosses/1121-icon.jpg?v=2",
			},
			{
				name: "Sapphiron",
				id: 14,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-sapphiron.png",
			},
			{
				name: "Kel'Thuzad",
				id: 15,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-kelthuzad.png",
			},
		],
		background: "#2A0134",
	},
	{
		title: "Scarlet Enclave",
		href: "planner/wow.raid=scarlet_enclave",
		image: "/raid-artworks/scarlet-loader.jpg",
		description: "",
		expansion: "Classic",
		available: true,
		raidNameSlug: "scarlet_enclave",
		bossList: [
			{
				name: "Balnazzar",
				id: 1,
				image:
					"https://assets.rpglogs.com/img/warcraft/bosses/3185-icon.jpg?v=2",
			},
			{
				name: "Beatrix",
				id: 2,
				image:
					"https://assets.rpglogs.com/img/warcraft/bosses/3187-icon.jpg?v=2",
			},
			{
				name: "Solistrasza",
				id: 3,
				image:
					"https://assets.rpglogs.com/img/warcraft/bosses/3186-icon.jpg?v=2",
			},
			{
				name: "Mason",
				id: 4,
				image:
					"https://assets.rpglogs.com/img/warcraft/bosses/3197-icon.jpg?v=2",
			},
			{
				name: "Beastmaster",
				id: 5,
				image:
					"https://assets.rpglogs.com/img/warcraft/bosses/3196-icon.jpg?v=2",
			},
			{
				name: "Reborn Council",
				id: 6,
				image:
					"https://assets.rpglogs.com/img/warcraft/bosses/3188-icon.jpg?v=2",
			},
			{
				name: "Lillian Voss",
				id: 7,
				image:
					"https://assets.rpglogs.com/img/warcraft/bosses/3190-icon.jpg?v=2",
			},
			{
				name: "Caldoran",
				id: 8,
				image:
					"https://assets.rpglogs.com/img/warcraft/bosses/3189-icon.jpg?v=2",
			},
		],
		background: "#FF2400",
	},
	{
		title: "Karazhan",
		href: "planner/wow.raid=karazhan",
		image: "/raid-artworks/karazhan-loader.png",
		description: "",
		expansion: "The Burning Crusade",
		available: true,
		raidNameSlug: "karazhan",
		bossList: [
			{
				name: "Attumen the Huntsman",
				id: 1,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-attumen-the-huntsman.png",
			},
			{
				name: "Moroes",
				id: 2,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-moroes.png",
			},
			{
				name: "Maiden of Virtue",
				id: 3,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-maiden-of-virtue.png",
			},
			{
				name: "Opera",
				id: 4,
				image: "https://wow.zamimg.com/images/wow/journal/ui-ej-boss-opera.png",
			},
			{
				name: "The Curator",
				id: 5,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-the-curator.png",
			},
			{
				name: "Terestian Illhoof",
				id: 6,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-terestian-illhoof.png",
			},
			{
				name: "Shade of Aran",
				id: 7,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-shade-of-aran.png",
			},
			{
				name: "Netherspite",
				id: 8,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-netherspite.png",
			},
			{
				name: "Chess Event",
				id: 9,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-chess-horde.png",
			},
			{
				name: "Prince Malchezaar",
				id: 10,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-prince-malchezaar.png",
			},
			{
				name: "Nightbane",
				id: 11,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-nefarian.png",
			},
			{
				name: "Servant Quarters",
				id: 12,
				image:
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-servant-quarters.png",
			},
		],
	},
];
export const wowClassColors: Record<string, string> = {
	"Death Knight": "#C41E3A",
	"Demon Hunter": "#A330C9",
	Druid: "#FF7C0A",
	Evoker: "#33937F",
	Hunter: "#AAD372",
	Mage: "#3FC7EB",
	Monk: "#00FF98",
	Paladin: "#F48CBA",
	Priest: "#FFFFFF",
	Rogue: "#FFF468",
	Shaman: "#0070DD",
	Warlock: "#8788EE",
	Warrior: "#C69B6D",
};
export const wowClasses: DraggableClassesData[] = [
	{
		label: "Death Knight",
		imageSrc: "/images/classes/deathknight.png",
		type: "class",
	},
	{
		label: "Demon Hunter",
		imageSrc: "/images/classes/demonhunter.png",
		type: "class",
	},
	{ label: "druid", imageSrc: "/images/classes/druid.png", type: "class" },
	{ label: "evoker", imageSrc: "/images/classes/evoker.png", type: "class" },
	{ label: "hunter", imageSrc: "/images/classes/hunter.png", type: "class" },
	{ label: "mage", imageSrc: "/images/classes/mage.png", type: "class" },
	{ label: "monk", imageSrc: "/images/classes/monk.png", type: "class" },
	{ label: "paladin", imageSrc: "/images/classes/paladin.png", type: "class" },
	{ label: "priest", imageSrc: "/images/classes/priest.png", type: "class" },
	{ label: "rogue", imageSrc: "/images/classes/rogue.png", type: "class" },
	{ label: "shaman", imageSrc: "/images/classes/shaman.png", type: "class" },
	{ label: "warlock", imageSrc: "/images/classes/warlock.png", type: "class" },
	{ label: "warrior", imageSrc: "/images/classes/warrior.png", type: "class" },
];
export const wowMarkers: DraggableMarkerData[] = [
	{
		label: "star",
		imageSrc: "/images/markers/star.png",
		type: "marker",
		color: "#d7d364",
	},
	{
		label: "circle",
		imageSrc: "/images/markers/circle.png",
		type: "marker",
		color: "#dfa943",
	},
	{
		label: "diamond",
		imageSrc: "/images/markers/diamond.png",
		type: "marker",
		color: "#c14dcf",
	},
	{
		label: "triangle",
		imageSrc: "/images/markers/triangle.png",
		type: "marker",
		color: "#60b83b",
	},
	{
		label: "moon",
		imageSrc: "/images/markers/moon.png",
		type: "marker",
		color: "#9bb7c7",
	},
	{
		label: "square",
		imageSrc: "/images/markers/square.png",
		type: "marker",
		color: "#2f60de",
	},
	{
		label: "cross",
		imageSrc: "/images/markers/cross.png",
		type: "marker",
		color: "#a42d1c",
	},
	{
		label: "skull",
		imageSrc: "/images/markers/skull.png",
		type: "marker",
		color: "#101010",
	},
];
export const wowRoles: DraggableMarkerData[] = [
	{
		name: "Melee DPS",
		label: "mdps",
		imageSrc: "/images/roles/mdps.png",
		type: "roles",
		color: "#5d1209",
	},
	{
		name: "Range DPS",
		label: "rdps",
		imageSrc: "/images/roles/rdps.png",
		type: "roles",
		color: "#5d1209",
	},
	{
		name: "Tank",
		label: "tank",
		imageSrc: "/images/roles/tank.png",
		type: "roles",
		color: "#010b44",
	},
	{
		name: "Healer",
		label: "healer",
		imageSrc: "/images/roles/healer.png",
		type: "roles",
		color: "#194136",
	},
];
export const draggableItems: DraggablePlayerData[] = [
	{
		id: "Helethy",
		type: "player",
		label: "Add Sphere 1",
		playerClass: "Warlock",
	},
	{ id: "Uth", type: "player", label: "Add Sphere 2", playerClass: "Hunter" },
	{
		id: "Pannastab",
		type: "player",
		label: "Add Sphere 3",
		playerClass: "Rogue",
	},
	{
		id: "Cynn",
		type: "player",
		label: "Add Sphere 4",
		playerClass: "Hunter",
	},
	{
		id: "Landre",
		type: "player",
		label: "Add Sphere 5",
		playerClass: "Mage",
	},
	{
		id: "Marizugg",
		type: "player",
		label: "Add Sphere 6",
		playerClass: "Warrior",
	},
	{
		id: "Pemano",
		type: "player",
		label: "Add Sphere 7",
		playerClass: "Priest",
	},
	{
		id: "Test1",
		type: "player",
		label: "Add Sphere 8",
		playerClass: "Death Knight",
	},
	{
		id: "Test2",
		type: "player",
		label: "Add Sphere 9",
		playerClass: "Demon Hunter",
	},
	{ id: "sphere-item-10", type: "player", label: "Add Sphere 10" },
	{ id: "sphere-item-11", type: "player", label: "Add Sphere 11" },
	{ id: "sphere-item-12", type: "player", label: "Add Sphere 12" },
	{ id: "sphere-item-13", type: "player", label: "Add Sphere 13" },
	{ id: "sphere-item-14", type: "player", label: "Add Sphere 14" },
	{ id: "sphere-item-15", type: "player", label: "Add Sphere 15" },
	{ id: "sphere-item-16", type: "player", label: "Add Sphere 16" },
	{ id: "sphere-item-17", type: "player", label: "Add Sphere 17" },
	{ id: "sphere-item-18", type: "player", label: "Add Sphere 18" },
	{ id: "sphere-item-19", type: "player", label: "Add Sphere 19" },
	{ id: "sphere-item-20", type: "player", label: "Add Sphere 20" },
	{ id: "sphere-item-21", type: "player", label: "Add Sphere 21" },
	{ id: "sphere-item-22", type: "player", label: "Add Sphere 22" },
	{ id: "sphere-item-23", type: "player", label: "Add Sphere 23" },
	{ id: "sphere-item-24", type: "player", label: "Add Sphere 24" },
];

export const rarityColors: Record<'Uncommon' | 'Rare' | 'Epic' | 'Legendary' | 'Artifact', string> = {
    Uncommon: "#1eff00",
    Rare: "#0070dd",
    Epic: "#a335ee",
    Legendary: "#ff8000",
    Artifact: "#e6cc80",
};

export const wowItems: WowItemsProps[] = [
	{
		name: "Choker of Enlightenment",
		slug: "choker-of-enlightenment",
		rarity: "Epic",
		imagesrc: "/path/to/choker_of_enlightenment.jpg",
	},
	{
		name: "Tome of Tranquilizing Shot",
		slug: "tome-of-tranquilizing-shot",
		rarity: "Epic",
		imagesrc: "/path/to/tome_of_tranquilizing_shot.jpg",
	},
	{
		name: "Cenarion Boots",
		slug: "cenarion-boots",
		rarity: "Epic",
		imagesrc: "/path/to/cenarion_boots.jpg",
	},
	{
		name: "Earthfury Boots",
		slug: "earthfury-boots",
		rarity: "Epic",
		imagesrc: "/path/to/earthfury_boots.jpg",
	},
	{
		name: "Lawbringer Boots",
		slug: "lawbringer-boots",
		rarity: "Epic",
		imagesrc: "/path/to/lawbringer_boots.jpg",
	},
	{
		name: "Felheart Gloves",
		slug: "felheart-gloves",
		rarity: "Epic",
		imagesrc: "/path/to/felheart_gloves.jpg",
	},
	{
		name: "Gauntlets of Might",
		slug: "gauntlets-of-might",
		rarity: "Epic",
		imagesrc: "/path/to/gauntlets_of_might.jpg",
	},
	{
		name: "Crimson Shocker",
		slug: "crimson-shocker",
		rarity: "Rare",
		imagesrc: "/path/to/crimson_shocker.jpg",
	},
	{
		name: "Flamewaker Legplates",
		slug: "flamewaker-legplates",
		rarity: "Epic",
		imagesrc: "/path/to/flamewaker_legplates.jpg",
	},
	{
		name: "Heavy Dark Iron Ring",
		slug: "heavy-dark-iron-ring",
		rarity: "Rare",
		imagesrc: "/path/to/heavy_dark_iron_ring.jpg",
	},
	{
		name: "Helm of the Lifegiver",
		slug: "helm-of-the-lifegiver",
		rarity: "Epic",
		imagesrc: "/path/to/helm_of_the_lifegiver.jpg",
	},
	{
		name: "Manastorm Leggings",
		slug: "manastorm-leggings",
		rarity: "Epic",
		imagesrc: "/path/to/manastorm-leggings.jpg",
	},
	{
		name: "Ring of Spell Power",
		slug: "ring-of-spell-power",
		rarity: "Epic",
		imagesrc: "/path/to/ring_of_spell_power.jpg",
	},
	{
		name: "Robe of Volatile Power",
		slug: "robe-of-volatile-power",
		rarity: "Epic",
		imagesrc: "/path/to/robe_of_volatile_power.jpg",
	},
	{
		name: "Salamander Scale Pants",
		slug: "salamander-scale-pants",
		rarity: "Epic",
		imagesrc: "/path/to/salamander_scale_pants.jpg",
	},
	{
		name: "Sorcerous Dagger",
		slug: "sorcerous-dagger",
		rarity: "Rare",
		imagesrc: "/path/to/sorcerous_dagger.jpg",
	},
	{
		name: "Wristguards of Stability",
		slug: "wristguards-of-stability",
		rarity: "Epic",
		imagesrc: "/path/to/wristguards_of_stability.jpg",
	},
];

export const draggableNPCs: DraggableNPCData[] = [
	{
		name: "Lucifron",
		id: "lucifron",
		label: "boss_npc",
		type: "npc",
		encounter: "lucifron",
		image: "https://wow.zamimg.com/images/wow/journal/ui-ej-boss-lucifron.png",
		lootTable: {
			exclusive: [
				"Choker of Enlightenment",
				"Tome of Tranquilizing Shot",
				"Cenarion Boots",
				"Earthfury Boots",
				"Lawbringer Boots ",
				"Felheart Gloves",
				"Gauntlets of Might ",
			],
			shared: [
				"Crimson Shocker",
				"Flamewaker Legplates",
				"Heavy Dark Iron Ring",
				"Helm of the Lifegiver",
				"Manastorm Leggings",
				"Ring of Spell Power",
				"Robe of Volatile Power",
				"Salamander Scale Pants",
				"Sorcerous Dagger",
				"Wristguards of Stability",
			],
		},
	},
	{
		name: "Flamewaker Protector",
		id: "flamewaker_protector",
		label: "add_npc",
		type: "npc",
		encounter: "lucifron",
		image: "https://wow.zamimg.com/images/wow/journal/ui-ej-boss-lucifron.png",
	},
	{
		name: "Magmadar",
		id: "magmadar",
		label: "boss_npc",
		type: "npc",
		encounter: "magmadar",
		image: "https://wow.zamimg.com/images/wow/journal/ui-ej-boss-magmadar.png",
	},
	{
		name: "Gehennas",
		id: "gehennas",
		label: "boss_npc",
		type: "npc",
		encounter: "gehennas",
		image: "https://wow.zamimg.com/images/wow/journal/ui-ej-boss-gehennas.png",
	},
	{
		name: "Flamewaker",
		id: "flamewaker",
		label: "add_npc",
		type: "npc",
		encounter: "gehennas",
		image: "https://wow.zamimg.com/images/wow/journal/ui-ej-boss-gehennas.png",
	},
	{
		name: "Garr",
		id: "garr",
		label: "boss_npc",
		type: "npc",
		encounter: "garr",
		image: "https://wow.zamimg.com/images/wow/journal/ui-ej-boss-garr.png",
	},
	{
		name: "Firesworn",
		id: "firesworn",
		label: "add_npc",
		type: "npc",
		encounter: "garr",
		image: "https://wow.zamimg.com/images/wow/journal/ui-ej-boss-garr.png",
	},
	{
		name: "Baron Geddon",
		id: "baron_geddon",
		label: "boss_npc",
		type: "npc",
		encounter: "baron_geddon",
		image:
			"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-baron-geddon.png",
	},
	{
		name: "Shazzrah",
		id: "shazzrah",
		label: "boss_npc",
		type: "npc",
		encounter: "shazzrah",
		image: "https://wow.zamimg.com/images/wow/journal/ui-ej-boss-shazzrah.png",
	},
	{
		name: "Sulfuron Harbinger",
		id: "sulfuron_harbinger",
		label: "boss_npc",
		type: "npc",
		encounter: "sulfuron_harbinger",
		image:
			"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-sulfuron-harbinger.png",
	},
	{
		name: "Flamewaker Priest",
		id: "flamewaker Priest",
		label: "add_npc",
		type: "npc",
		encounter: "sulfuron_harbinger",
		image:
			"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-sulfuron-harbinger.png",
	},
	{
		name: "Golemagg the Incinerator",
		id: "golemagg_the_incinerator",
		label: "boss_npc",
		type: "npc",
		encounter: "golemagg_the_incinerator",
		image:
			"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-golemagg-the-incinerator.png",
	},
	{
		name: "Core Rager",
		id: "core_rager",
		label: "add_npc",
		type: "npc",
		encounter: "golemagg_the_incinerator",
		image: "https://wow.zamimg.com/images/wow/journal/ui-ej-boss-magmadar.png",
	},
	{
		name: "Majordomo Executus",
		id: "majordomo_executus",
		label: "boss_npc",
		type: "npc",
		encounter: "majordomo_executus",
		image:
			"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-majordomo-executus.png",
	},
	{
		name: "Flamewaker Elite",
		id: "flamewaker_elite",
		label: "add_npc",
		type: "npc",
		encounter: "majordomo_executus",
		image:
			"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-sulfuron-harbinger.png",
	},
	{
		name: "Flamewaker Healer",
		id: "flamewaker_healer",
		label: "add_npc",
		type: "npc",
		encounter: "majordomo_executus",
		image:
			"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-sulfuron-harbinger.png",
	},
	{
		name: "Ragnaros",
		id: "ragnaros",
		label: "boss_npc",
		type: "npc",
		encounter: "ragnaros",
		image: "https://wow.zamimg.com/images/wow/journal/ui-ej-boss-ragnaros.png",
	},
	{
		name: "Son of Flame",
		id: "son_of_flame",
		label: "add_npc",
		type: "npc",
		encounter: "ragnaros",
		image:
			"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-baron-geddon.png",
	},
];
