var data = {
    enchants: {
        protection: {
            levelMax: "4",
            weight: "1",
            incompatible: ["blast_protection", "fire_protection", "projectile_protection"],
            items: ["book", "helmet", "chestplate", "leggings", "boots", "turtle_shell"],
            stylized: "Protection"
        },
        aqua_affinity: {
            levelMax: "1",
            weight: "2",
            incompatible: [],
            items: ["book", "helmet", "turtle_shell"],
            stylized: "Aqua Affinity"
        },
        bane_of_arthropods: {
            levelMax: "5",
            weight: "1",
            incompatible: ["smite", "sharpness"],
            items: ["book", "sword", "axe"],
            stylized: "Bane of Arthropods"
        },
        blast_protection: {
            levelMax: "4",
            weight: "2",
            incompatible: ["fire_protection", "protection", "projectile_protection"],
            items: ["book", "helmet", "chestplate", "leggings", "boots", "turtle_shell"],
            stylized: "Blast Protection"
        },
        channeling: {
            levelMax: "1",
            weight: "4",
            incompatible: ["riptide"],
            items: ["book", "trident"],
            stylized: "Channeling"
        },
        depth_strider: {
            levelMax: "3",
            weight: "2",
            incompatible: ["frost_walker"],
            items: ["book", "boots"],
            stylized: "Depth Strider"
        },
        efficiency: {
            levelMax: "5",
            weight: "1",
            incompatible: [],
            items: ["book", "pickaxe", "shovel", "axe", "hoe", "shears"],
            stylized: "Efficiency"
        },
        feather_falling: {
            levelMax: "4",
            weight: "1",
            incompatible: [],
            items: ["book", "boots"],
            stylized: "Feather Falling"
        },
        fire_aspect: {
            levelMax: "2",
            weight: "2",
            incompatible: [],
            items: ["book", "sword"],
            stylized: "Fire Aspect"
        },
        fire_protection: {
            levelMax: "4",
            weight: "1",
            incompatible: ["blast_protection", "protection", "projectile_protection"],
            items: ["book", "helmet", "chestplate", "leggings", "boots", "turtle_shell"],
            stylized: "Fire Protection"
        },
        flame: {
            levelMax: "1",
            weight: "2",
            incompatible: [],
            items: ["book", "bow"],
            stylized: "Flame"
        },
        fortune: {
            levelMax: "3",
            weight: "2",
            incompatible: ["silk_touch"],
            items: ["book", "pickaxe", "shovel", "axe", "hoe"],
            stylized: "Fortune"
        },
        frost_walker: {
            levelMax: "2",
            weight: "2",
            incompatible: ["depth_strider"],
            items: ["book", "boots"],
            stylized: "Frost Walker"
        },
        impaling: {
            levelMax: "5",
            weight: "2",
            incompatible: [],
            items: ["book", "trident"],
            stylized: "Impaling"
        },
        infinity: {
            levelMax: "1",
            weight: "4",
            incompatible: ["mending"],
            items: ["book", "bow"],
            stylized: "Infinity"
        },
        knockback: {
            levelMax: "2",
            weight: "1",
            incompatible: [],
            items: ["book", "sword"],
            stylized: "Knockback"
        },
        looting: {
            levelMax: "3",
            weight: "2",
            incompatible: [],
            items: ["book", "sword"],
            stylized: "Looting"
        },
        loyalty: {
            levelMax: "3",
            weight: "1",
            incompatible: ["riptide"],
            items: ["book", "trident"],
            stylized: "Loyalty"
        },
        luck_of_the_sea: {
            levelMax: "3",
            weight: "2",
            incompatible: [],
            items: ["book", "fishing_rod"],
            stylized: "Luck of the Sea"
        },
        lure: {
            levelMax: "3",
            weight: "2",
            incompatible: [],
            items: ["book", "fishing_rod"],
            stylized: "Lure"
        },
        mending: {
            levelMax: "1",
            weight: "2",
            incompatible: ["infinity"],
            items: ["book", "helmet", "chestplate", "leggings", "boots", "pickaxe", "shovel", "axe", "sword", "hoe", "brush", "fishing_rod",
                "bow", "shears", "flint_and_steel", "carrot_on_a_stick", "warped_fungus_on_a_stick", "shield", "elytra", "trident",
                "turtle_shell", "crossbow"
            ],
            stylized: "Mending"
        },
        multishot: {
            levelMax: "1",
            weight: "2",
            incompatible: ["piercing"],
            items: ["book", "crossbow"],
            stylized: "Multishot"
        },
        piercing: {
            levelMax: "4",
            weight: "1",
            incompatible: ["multishot"],
            items: ["book", "crossbow"],
            stylized: "Piercing"
        },
        power: {
            levelMax: "5",
            weight: "1",
            incompatible: [],
            items: ["book", "bow"],
            stylized: "Power"
        },
        projectile_protection: {
            levelMax: "4",
            weight: "1",
            incompatible: ["protection", "blast_protection", "fire_protection"],
            items: ["book", "helmet", "chestplate", "leggings", "boots", "turtle_shell"],
            stylized: "Projectile Protection"
        },
        punch: {
            levelMax: "2",
            weight: "2",
            incompatible: [],
            items: ["book", "bow"],
            stylized: "Punch"
        },
        quick_charge: {
            levelMax: "3",
            weight: "1",
            incompatible: [],
            items: ["book", "crossbow"],
            stylized: "Quick Charge"
        },
        respiration: {
            levelMax: "3",
            weight: "2",
            incompatible: [],
            items: ["book", "helmet", "turtle_shell"],
            stylized: "Respiration"
        },
        riptide: {
            levelMax: "3",
            weight: "2",
            incompatible: ["channeling", "loyalty"],
            items: ["book", "trident"],
            stylized: "Riptide"
        },
        sharpness: {
            levelMax: "5",
            weight: "1",
            incompatible: ["bane_of_arthropods", "smite"],
            items: ["book", "sword", "axe"],
            stylized: "Sharpness"
        },
        silk_touch: {
            levelMax: "1",
            weight: "4",
            incompatible: ["fortune"],
            items: ["book", "pickaxe", "shovel", "axe", "hoe"],
            stylized: "Silk Touch"
        },
        smite: {
            levelMax: "5",
            weight: "1",
            incompatible: ["bane_of_arthropods", "sharpness"],
            items: ["book", "sword", "axe"],
            stylized: "Smite"
        },
        soul_speed: {
            levelMax: "3",
            weight: "4",
            incompatible: [],
            items: ["book", "boots"],
            stylized: "Soul Speed"
        },
        sweeping: {
            levelMax: "3",
            weight: "2",
            incompatible: [],
            items: ["book", "sword"],
            stylized: "Sweeping Edge"
        },
        swift_sneak: {
            levelMax: "3",
            weight: "4",
            incompatible: [],
            items: ["book", "leggings"],
            stylized: "Swift Sneak"
        },
        thorns: {
            levelMax: "3",
            weight: "4",
            incompatible: [],
            items: ["book", "helmet", "chestplate", "leggings", "boots", "turtle_shell"],
            stylized: "Thorns"
        },
        unbreaking: {
            levelMax: "3",
            weight: "1",
            incompatible: [],
            weight: "1",
            items: ["book", "helmet", "chestplate", "leggings", "boots", "pickaxe", "shovel", "axe", "sword", "hoe", "brush", "fishing_rod",
                "bow", "shears", "flint_and_steel", "carrot_on_a_stick", "warped_fungus_on_a_stick", "shield", "elytra", "trident",
                "turtle_shell", "crossbow"
            ],
            stylized: "Unbreaking"
        },
        binding_curse: {
            levelMax: "1",
            weight: "4",
            incompatible: [],
            items: ["book", "helmet", "chestplate", "leggings", "boots", "elytra", "pumpkin", "helmet", "turtle_shell"],
            stylized: "Curse of Binding"
        },
        vanishing_curse: {
            levelMax: "1",
            weight: "4",
            incompatible: [],
            items: ["book", "helmet", "chestplate", "leggings", "boots", "pickaxe", "shovel", "axe", "sword", "hoe", "brush", "fishing_rod",
                "bow", "shears", "flint_and_steel", "carrot_on_a_stick", "warped_fungus_on_a_stick", "shield", "elytra", "pumpkin",
                "helmet", "trident", "turtle_shell", "crossbow"
            ],
            stylized: "Curse of Vanishing"
        }
    },
    items: {
        helmet: "Helmet",
        chestplate: "Chestplate",
        leggings: "Leggings",
        boots: "Boots",
        turtle_shell: "Turtle Shell",
        elytra: "Elytra",

        sword: "Sword",
        axe: "Axe",
        trident: "Trident",
        pickaxe: "Pickaxe",
        shovel: "Shovel",
        hoe: "Hoe",
        bow: "Bow",
        shield: "Shield",
        crossbow: "Crossbow",
        brush: "Brush",

        fishing_rod: "Fishing Rod",
        shears: "Shears",
        flint_and_steel: "Flint & Steel",
        carrot_on_a_stick: "Carrot on a Stick",
        warped_fungus_on_a_stick: "Warped Fungus on a Stick",
        pumpkin: "Pumpkin",
        book: "Book"
    }
};
