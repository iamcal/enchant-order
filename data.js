var data = {
    enchants: {
        protection: {
            levelMax: "4",
            weight: "1",
            incompatible: ["blast_protection", "fire_protection", "projectile_protection"],
            items: ["helmet", "chestplate", "leggings", "boots", "turtle_shell"]
        },
        aqua_affinity: {
            levelMax: "1",
            weight: "2",
            incompatible: [],
            items: ["helmet", "turtle_shell"]
        },
        bane_of_arthropods: {
            levelMax: "5",
            weight: "1",
            incompatible: ["smite", "sharpness", "density", "breach"],
            items: ["sword", "axe", "mace", "spear"]
        },
        blast_protection: {
            levelMax: "4",
            weight: "2",
            incompatible: ["fire_protection", "protection", "projectile_protection"],
            items: ["helmet", "chestplate", "leggings", "boots", "turtle_shell"]
        },
        channeling: {
            levelMax: "1",
            weight: "4",
            incompatible: ["riptide"],
            items: ["trident"]
        },
        depth_strider: {
            levelMax: "3",
            weight: "2",
            incompatible: ["frost_walker"],
            items: ["boots"]
        },
        efficiency: {
            levelMax: "5",
            weight: "1",
            incompatible: [],
            items: ["pickaxe", "shovel", "axe", "hoe", "shears"]
        },
        feather_falling: {
            levelMax: "4",
            weight: "1",
            incompatible: [],
            items: ["boots"]
        },
        fire_aspect: {
            levelMax: "2",
            weight: "2",
            incompatible: [],
            items: ["sword", "mace", "spear"]
        },
        fire_protection: {
            levelMax: "4",
            weight: "1",
            incompatible: ["blast_protection", "protection", "projectile_protection"],
            items: ["helmet", "chestplate", "leggings", "boots", "turtle_shell"]
        },
        flame: {
            levelMax: "1",
            weight: "2",
            incompatible: [],
            items: ["bow"]
        },
        fortune: {
            levelMax: "3",
            weight: "2",
            incompatible: ["silk_touch"],
            items: ["pickaxe", "shovel", "axe", "hoe"]
        },
        frost_walker: {
            levelMax: "2",
            weight: "2",
            incompatible: ["depth_strider"],
            items: ["boots"]
        },
        impaling: {
            levelMax: "5",
            weight: "2",
            incompatible: [],
            items: ["trident"]
        },
        infinity: {
            levelMax: "1",
            weight: "4",
            incompatible: ["mending"],
            items: ["bow"]
        },
        knockback: {
            levelMax: "2",
            weight: "1",
            incompatible: [],
            items: ["sword", "spear"]
        },
        looting: {
            levelMax: "3",
            weight: "2",
            incompatible: [],
            items: ["sword", "spear"]
        },
        loyalty: {
            levelMax: "3",
            weight: "1",
            incompatible: ["riptide"],
            items: ["trident"]
        },
        luck_of_the_sea: {
            levelMax: "3",
            weight: "2",
            incompatible: [],
            items: ["fishing_rod"]
        },
        lunge: {
            levelMax: "3",
            weight: "1",
            incompatible: [],
            items: ["spear"]
        },
        lure: {
            levelMax: "3",
            weight: "2",
            incompatible: [],
            items: ["fishing_rod"]
        },
        mending: {
            levelMax: "1",
            weight: "2",
            incompatible: ["infinity"],
            items: ["helmet", "chestplate", "leggings", "boots", "pickaxe", "shovel", "axe", "sword", "hoe", "brush", "fishing_rod",
                "bow", "shears", "flint_and_steel", "carrot_on_a_stick", "warped_fungus_on_a_stick", "shield", "elytra", "trident",
                "turtle_shell", "crossbow", "mace", "spear"
            ]
        },
        multishot: {
            levelMax: "1",
            weight: "2",
            incompatible: ["piercing"],
            items: ["crossbow"]
        },
        piercing: {
            levelMax: "4",
            weight: "1",
            incompatible: ["multishot"],
            items: ["crossbow"]
        },
        power: {
            levelMax: "5",
            weight: "1",
            incompatible: [],
            items: ["bow"]
        },
        projectile_protection: {
            levelMax: "4",
            weight: "1",
            incompatible: ["protection", "blast_protection", "fire_protection"],
            items: ["helmet", "chestplate", "leggings", "boots", "turtle_shell"]
        },
        punch: {
            levelMax: "2",
            weight: "2",
            incompatible: [],
            items: ["bow"]
        },
        quick_charge: {
            levelMax: "3",
            weight: "1",
            incompatible: [],
            items: ["crossbow"]
        },
        respiration: {
            levelMax: "3",
            weight: "2",
            incompatible: [],
            items: ["helmet", "turtle_shell"]
        },
        riptide: {
            levelMax: "3",
            weight: "2",
            incompatible: ["channeling", "loyalty"],
            items: ["trident"]
        },
        sharpness: {
            levelMax: "5",
            weight: "1",
            incompatible: ["bane_of_arthropods", "smite"],
            items: ["sword", "axe", "spear"]
        },
        silk_touch: {
            levelMax: "1",
            weight: "4",
            incompatible: ["fortune"],
            items: ["pickaxe", "shovel", "axe", "hoe"]
        },
        smite: {
            levelMax: "5",
            weight: "1",
            incompatible: ["bane_of_arthropods", "sharpness", "density", "breach"],
            items: ["sword", "axe", "mace", "spear"]
        },
        soul_speed: {
            levelMax: "3",
            weight: "4",
            incompatible: [],
            items: ["boots"]
        },
        sweeping: {
            levelMax: "3",
            weight: "2",
            incompatible: [],
            items: ["sword"]
        },
        swift_sneak: {
            levelMax: "3",
            weight: "4",
            incompatible: [],
            items: ["leggings"]
        },
        thorns: {
            levelMax: "3",
            weight: "4",
            incompatible: [],
            items: ["helmet", "chestplate", "leggings", "boots", "turtle_shell"]
        },
        unbreaking: {
            levelMax: "3",
            weight: "1",
            incompatible: [],
            items: ["helmet", "chestplate", "leggings", "boots", "pickaxe", "shovel", "axe", "sword", "hoe", "brush", "fishing_rod",
                "bow", "shears", "flint_and_steel", "carrot_on_a_stick", "warped_fungus_on_a_stick", "shield", "elytra", "trident",
                "turtle_shell", "crossbow", "mace", "spear"
            ]
        },
        binding_curse: {
            levelMax: "1",
            weight: "4",
            incompatible: [],
            items: ["helmet", "chestplate", "leggings", "boots", "elytra", "pumpkin", "helmet", "turtle_shell"]
        },
        vanishing_curse: {
            levelMax: "1",
            weight: "4",
            incompatible: [],
            items: ["helmet", "chestplate", "leggings", "boots", "pickaxe", "shovel", "axe", "sword", "hoe", "brush", "fishing_rod",
                "bow", "shears", "flint_and_steel", "carrot_on_a_stick", "warped_fungus_on_a_stick", "shield", "elytra", "pumpkin",
                "helmet", "trident", "turtle_shell", "crossbow", "mace", "spear"
            ]
        },
        density: {
            levelMax: "5",
            weight: "1",
            incompatible: ["breach", "smite", "bane_of_arthropods"],
            items: ["mace"]
        },
        breach: {
            levelMax: "4",
            weight: "2",
            incompatible: ["density", "smite", "bane_of_arthropods"],
            items: ["mace"]
        },
        wind_burst: {
            levelMax: "3",
            weight: "2",
            incompatible: [],
            items: ["mace"]
        }
    },
    items: [
        'helmet',
        'chestplate',
        'leggings',
        'boots',
        'turtle_shell',
        'elytra',

        'sword',
        'axe',
        'mace',
        'spear',

        'trident',
        'bow',
        'crossbow',

        'pickaxe',
        'shovel',
        'hoe',
        'shield',
        'brush',

        'fishing_rod',
        'shears',
        'flint_and_steel',
        'carrot_on_a_stick',
        'warped_fungus_on_a_stick',
        'pumpkin',
        'book',
    ]
};
