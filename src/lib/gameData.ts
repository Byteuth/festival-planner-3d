import { expansionItem, raidItem } from "@/types/gameData";

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
					"https://wow.zamimg.com/images/wow/journal/ui-ej-boss-magmadar.png",
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
        background: '#C9451B'
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
        background: '#674355'
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
        background: '#556B2F'
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
        background: '#F40006'
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
        background: '#662B5B'
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
        background: '#2A0134'
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
        background: '#FF2400'
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
