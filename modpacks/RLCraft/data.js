const all = ['helmet','chestplate','leggings','boots','elytra','sword','bs_battleaxe','battleaxe','bs_dagger',
    'bs_hammer','nunchaku','alt_weapon','throwable_weapon','axe','pickaxe','shovel','hoe','flint_hatchet','flint_knife',
    'flint_hoe','flint_pickaxe','mattock','saw','knife','shield','baubles_shield','gold_shield','bs_shield',
    'spartan_shield', 'bow','crossbow','switch-bow','switch-crossbow','umbra_blaster','ravager','fishing_rod','shears',
    'flint_and_steel', 'carrot_on_a_stick','launcher','lifebelt','concussion_smasher','lock','wolf_armor']

const EnchantmentDamage = ['lesser_sharpness', 'lesser_smite', 'lesser_bane_of_arthropods', 'adv_sharpness',
    'defusing_edge', 'adv_smite', 'adv_bane_of_arthropods', 'supreme_sharpness', 'supreme_smite',
    'supreme_bane_of_arthropods', 'sharpness', 'smite', 'bane_of_arthropods', 'reinforced_sharpness',
    'bluntness', 'inhumane', 'water_aspect', 'butchering']

const IEnchantmentDamage = ['adv_smite', 'adv_sharpness', 'adv_bane_of_arthropods', 'supreme_smite',
    'supreme_sharpness', 'reinforced_sharpness', 'supreme_bane_of_arthropods', 'lesser_smite', 'lesser_sharpness',
    'lesser_bane_of_arthropods']

const EnchantmentProtection = ['protection', 'fire_protection', 'blast_protection', 'projectile_protection',
    'magic_protection', 'physical_protection', 'adv_protection', 'adv_fire_protection', 'adv_blast_protection',
    'adv_projectile_protection', 'vulnerability_curse']

const IPotionDebuffer = ['levitator', 'desolator', 'disorienting_blade', 'envenomed', 'hors_de_combat', 'freezing', 'purification']

export const data = {
    enchants: {
        // Protection
        protection: {
            levelMax: '4',
            weight: '1',
            incompatible: [...EnchantmentProtection.flat()].filter(item => item !== 'protection'),
            items: ['helmet', 'chestplate', 'leggings', 'boots']
        },
        blast_protection: {
            levelMax: '4',
            weight: '2',
            incompatible: [...EnchantmentProtection.flat()].filter(item => item !== 'blast_protection'),
            items: ['helmet', 'chestplate', 'leggings', 'boots']
        },
        fire_protection: {
            levelMax: '4',
            weight: '1',
            incompatible: [...EnchantmentProtection.flat()].filter(item => item !== 'fire_protection'),
            items: ['helmet', 'chestplate', 'leggings', 'boots']
        },
        projectile_protection: {
            levelMax: '4',
            weight: '1',
            incompatible: [...EnchantmentProtection.flat()].filter(item => item !== 'projectile_protection'),
            items: ['helmet', 'chestplate', 'leggings', 'boots']
        },
        adv_protection: {
            levelMax: '4',
            weight: '4',
            incompatible: [...EnchantmentProtection.flat()].filter(item => item !== 'adv_protection'),
            items: ['leggings', 'boots', 'chestplate', 'helmet', 'lifebelt']
        },
        adv_fire_protection: {
            levelMax: '4',
            weight: '4',
            incompatible: [...EnchantmentProtection.flat()].filter(item => item !== 'adv_fire_protection'),
            items: ['leggings', 'boots', 'chestplate', 'helmet', 'lifebelt']
        },
        adv_blast_protection: {
            levelMax: '4',
            weight: '2',
            incompatible: [...EnchantmentProtection.flat()].filter(item => item !== 'adv_blast_protection'),
            items: ['leggings', 'boots', 'chestplate', 'helmet', 'lifebelt']
        },
        adv_projectile_protection: {
            levelMax: '4',
            weight: '2',
            incompatible: [...EnchantmentProtection.flat()].filter(item => item !== 'adv_projectile_protection'),
            items: ['leggings', 'boots', 'chestplate', 'helmet', 'lifebelt']
        },
        magic_protection: {
            levelMax: '4',
            weight: '1',
            incompatible: [...EnchantmentProtection.flat()].filter(item => item !== 'magic_protection'),
            items: ['leggings', 'boots', 'chestplate', 'helmet', 'lifebelt']
        },
        physical_protection: {
            levelMax: '4',
            weight: '2',
            incompatible: [...EnchantmentProtection.flat()].filter(item => item !== 'physical_protection'),
            items: ['leggings', 'boots', 'chestplate', 'helmet', 'lifebelt']
        },
        feather_falling: {
            levelMax: '4',
            weight: '1',
            incompatible: ['adv_feather_falling', 'vulnerability_curse'],
            items: ['boots']
        },
        adv_feather_falling: {
            levelMax: '4',
            weight: '4',
            incompatible: ['feather_falling'],
            items: ['boots']
        },
        // Temperature
        chilling: {
            levelMax: '1',
            weight: '1',
            incompatible: ['heating'],
            items: ['leggings', 'boots', 'chestplate', 'helmet', 'lifebelt']
        },
        heating: {
            levelMax: '1',
            weight: '1',
            incompatible: ['chilling'],
            items: ['leggings', 'boots', 'chestplate', 'helmet', 'lifebelt']
        },
        // Thorns
        thorns: {
            levelMax: '3',
            weight: '4',
            incompatible: ['burning_thorns', 'adv_thorns', 'fire_aspect'],
            items: ['helmet', 'chestplate', 'leggings', 'boots']
        },
        adv_thorns: {
            levelMax: '3',
            weight: '2',
            incompatible: ['thorns', 'burning_thorns'],
            items: ['leggings', 'boots', 'chestplate', 'helmet', 'lifebelt']
        },
        burning_thorns: {
            levelMax: '3',
            weight: '4',
            incompatible: ['thorns', 'adv_thorns'],
            items: ['leggings', 'boots', 'chestplate', 'helmet', 'lifebelt']
        },
        // aArmor enchantments
        aqua_affinity: {
            levelMax: '1',
            weight: '2',
            incompatible: [],
            items: ['helmet']
        },
        respiration: {
            levelMax: '3',
            weight: '2',
            incompatible: [],
            items: ['helmet']
        },
        strengthened_vitality: {
            levelMax: '5',
            weight: '4',
            incompatible: [],
            items: ['chestplate', 'lifebelt']
        },
        meltdown: {
            levelMax: '2',
            weight: '4',
            incompatible: [],
            items: ['chestplate', 'lifebelt']
        },
        inner_berserk: {
            levelMax: '4',
            weight: '4',
            incompatible: [],
            items: ['chestplate', 'lifebelt']
        },
        evasion: {
            levelMax: '1',
            weight: '2',
            incompatible: [],
            items: ['leggings']
        },
        agility: {
            levelMax: '2',
            weight: '2',
            incompatible: [],
            items: ['leggings']
        },
        high_jump: {
            levelMax: '2',
            weight: '2',
            incompatible: [],
            items: ['boots']
        },
        wall_running: {
            levelMax: '1',
            weight: '4',
            incompatible: [],
            items: ['boots']
        },
        double_jump: {
            levelMax: '1',
            weight: '4',
            incompatible: [],
            items: ['boots']
        },
        sliding: {
            levelMax: '1',
            weight: '4',
            incompatible: [],
            items: ['boots']
        },
        depth_strider: {
            levelMax: '3',
            weight: '2',
            incompatible: ['frost_walker', 'underwater_strider'],
            items: ['boots']
        },
        frost_walker: {
            levelMax: '2',
            weight: '2',
            incompatible: ['depth_strider'],
            items: ['boots']
        },
        underwater_strider: {
            levelMax: '3',
            weight: '2',
            incompatible: ['depth_strider'],
            items: ['boots']
        },
        magma_walker: {
            levelMax: '2',
            weight: '4',
            incompatible: [],
            items: ['boots']
        },
        light_weight: {
            levelMax: '3',
            weight: '2',
            incompatible: [],
            items: ['boots']
        },
        // Tools
        efficiency: {
            levelMax: '5',
            weight: '1',
            incompatible: ['adv_efficiency', 'inefficient', 'knockback', 'fire_aspect'],
            items: ['pickaxe', 'shovel', 'axe', 'hoe', 'shears']
        },
        adv_efficiency: {
            levelMax: '5',
            weight: '2',
            incompatible: ['efficiency', 'inefficient', 'bluntness', 'blessed_edge', 'defusing_edge', 'water_aspect',
                'inhumane', ...IEnchantmentDamage.flat()],
            items: ['saw', 'pickaxe', 'axe', 'shovel', 'flint_hatchet', 'flint_pickaxe', 'mattock']
        },
        silk_touch: {
            levelMax: '1',
            weight: '4',
            incompatible: ['fortune', 'smelter', 'smelting', 'diamonds_everywhere', 'looting', 'luck_of_the_sea',
                'lucky_throw'],
            items: ['pickaxe', 'shovel', 'axe', 'hoe']
        },
        fortune: {
            levelMax: '3',
            weight: '2',
            incompatible: ['silk_touch', 'diamonds_everywhere', 'looting'],
            items: ['pickaxe', 'shovel', 'axe', 'hoe']
        },
        diamonds_everywhere: {
            levelMax: '3',
            weight: '2',
            incompatible: ['silk_touch', 'fortune'],
            items: ['pickaxe']
        },
        smelter: {
            levelMax: '1',
            weight: '4',
            incompatible: ['silk_touch'],
            items: ['saw', 'pickaxe', 'axe', 'shovel', 'flint_hatchet', 'flint_pickaxe', 'mattock']
        },
        smelting: {
            levelMax: '1',
            weight: '4',
            incompatible: ['silk_touch'],
            items: ['saw', 'pickaxe', 'axe', 'shovel', 'flint_hatchet', 'flint_pickaxe', 'mattock']
        },
        tunneling: {
            levelMax: '2',
            weight: '2',
            incompatible: [],
            items: ['saw', 'pickaxe', 'axe', 'shovel', 'flint_hatchet', 'flint_pickaxe', 'mattock']
        },
        versatility: {
            levelMax: '1',
            weight: '1',
            incompatible: [],
            items: ['saw', 'pickaxe', 'axe', 'shovel', 'flint_hatchet', 'flint_pickaxe', 'mattock']
        },
        reinforced_sharpness: {
            levelMax: '5',
            weight: '2',
            incompatible: ['blessed_edge', 'spell_breaker', 'penetrating_edge', ...EnchantmentDamage.flat()].filter(item => item !== 'reinforced_sharpness'),
            items: ['shovel', 'pickaxe', 'axe', 'saw', 'mattock', 'flint_hatchet', 'flint_pickaxe']
        },
        magnetic: {
            levelMax: '1',
            weight: '2',
            incompatible: [],
            items: ['saw', 'pickaxe', 'axe', 'shovel', 'flint_hatchet', 'flint_pickaxe', 'mattock']
        },
        // Damage
        sharpness: {
            levelMax: '5',
            weight: '1',
            incompatible: ['penetration', ...EnchantmentDamage.flat()].filter(item => item !== 'sharpness'),
            items: ['sword', 'axe']
        },
        bane_of_arthropods: {
            levelMax: '5',
            weight: '1',
            incompatible: ['penetration',
                ...EnchantmentDamage.flat()].filter(item => item !== 'bane_of_arthropods'),
            items: ['sword', 'axe']
        },
        smite: {
            levelMax: '5',
            weight: '1',
            incompatible: ['blessed_edge', 'penetration', ...EnchantmentDamage.flat()].filter(item => item !== 'smite'),
            items: ['sword', 'axe']
        },
        lesser_sharpness: {
            levelMax: '5',
            weight: '1',
            incompatible: ['blessed_edge', 'spell_breaker', 'penetrating_edge', ...EnchantmentDamage.flat()].filter(item => item !== 'lesser_sharpness'),
            items: ['sword', 'axe', 'battleaxe', 'alt_weapon',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku']
        },
        lesser_bane_of_arthropods: {
            levelMax: '5',
            weight: '1',
            incompatible: ['blessed_edge', 'spell_breaker', 'penetrating_edge', ...EnchantmentDamage.flat()].filter(item => item !== 'lesser_bane_of_arthropods'),
            items: ['sword', 'axe', 'battleaxe', 'alt_weapon',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku']
        },
        lesser_smite: {
            levelMax: '5',
            weight: '1',
            incompatible: ['blessed_edge', 'spell_breaker', 'penetrating_edge', ...EnchantmentDamage.flat()].filter(item => item !== 'lesser_smite'),
            items: ['sword', 'axe', 'battleaxe', 'alt_weapon',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku']
        },
        adv_sharpness: {
            levelMax: '5',
            weight: '2',
            incompatible: ['adv_efficiency', 'blessed_edge', 'spell_breaker', 'penetrating_edge',
                ...EnchantmentDamage.flat()].filter(item => item !== 'adv_sharpness'),
            items: ['sword', 'axe', 'battleaxe', 'alt_weapon', 'wolf_armor',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        adv_bane_of_arthropods: {
            levelMax: '5',
            weight: '2',
            incompatible: ['adv_efficiency', 'blessed_edge', 'spell_breaker', 'penetrating_edge',
                ...EnchantmentDamage.flat()].filter(item => item !== 'adv_bane_of_arthropods'),
            items: ['sword', 'axe', 'battleaxe', 'alt_weapon', 'wolf_armor',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        adv_smite: {
            levelMax: '5',
            weight: '2',
            incompatible: ['adv_efficiency', 'blessed_edge', 'spell_breaker', 'penetrating_edge',
                ...EnchantmentDamage.flat()].filter(item => item !== 'adv_smite'),
            items: ['sword', 'axe', 'battleaxe', 'alt_weapon', 'wolf_armor',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        supreme_sharpness: {
            levelMax: '5',
            weight: '4',
            incompatible: ['blessed_edge', 'spell_breaker', 'penetrating_edge', ...EnchantmentDamage.flat()].filter(item => item !== 'supreme_sharpness'),
            items: ['sword', 'axe', 'battleaxe', 'alt_weapon',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku']
        },
        supreme_bane_of_arthropods: {
            levelMax: '5',
            weight: '4',
            incompatible: ['blessed_edge', 'spell_breaker', 'penetrating_edge', ...EnchantmentDamage.flat()].filter(item => item !== 'supreme_bane_of_arthropods'),
            items: ['sword', 'axe', 'battleaxe', 'alt_weapon',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku']
        },
        supreme_smite: {
            levelMax: '5',
            weight: '4',
            incompatible: ['blessed_edge', 'spell_breaker', 'penetrating_edge', ...EnchantmentDamage.flat()].filter(item => item !== 'supreme_smite'),
            items: ['sword', 'axe', 'battleaxe', 'alt_weapon',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku']
        },
        // Fire
        fire_aspect: {
            levelMax: '2',
            weight: '2',
            incompatible: ['lesser_fire_aspect', 'adv_fire_aspect', 'supreme_fire_aspect', 'ash_destroyer', 'fiery_edge',
                'thorns', 'efficiency', 'water_aspect'],
            items: ['sword']
        },
        lesser_fire_aspect: {
            levelMax: '2',
            weight: '1',
            incompatible: ['fire_aspect', 'adv_fire_aspect', 'supreme_fire_aspect'],
            items: ['sword', 'battleaxe', 'alt_weapon',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku']
        },
        adv_fire_aspect: {
            levelMax: '2',
            weight: '2',
            incompatible: ['fire_aspect', 'lesser_fire_aspect', 'supreme_fire_aspect'],
            items: ['sword', 'battleaxe', 'alt_weapon',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku']
        },
        supreme_fire_aspect: {
            levelMax: '2',
            weight: '4',
            incompatible: ['fire_aspect', 'adv_fire_aspect', 'lesser_fire_aspect'],
            items: ['sword', 'battleaxe', 'alt_weapon',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku']
        },
        fiery_edge: {
            levelMax: '2',
            weight: '4',
            incompatible: ['ash_destroyer', 'fire_aspect', 'water_aspect'],
            items: ['sword', 'battleaxe', 'alt_weapon', 'wolf_armor',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        // Often used
        education: {
            levelMax: '3',
            weight: '2',
            incompatible: ['looting', 'adept', 'adv_looting'],
            items: ['sword', 'battleaxe', 'alt_weapon', 'throwable_weapon', 'wolf_armor',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        adept: {
            levelMax: '3',
            weight: '2',
            incompatible: ['education'],
            items: ['sword', 'axe', 'battleaxe', 'alt_weapon', 'bow', 'switch-bow', 'switch-crossbow',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku']
        },
        looting: {
            levelMax: '3',
            weight: '2',
            incompatible: ['adv_looting', 'education', 'silk_touch', 'fortune'],
            items: ['sword']
        },
        adv_looting: {
            levelMax: '3',
            weight: '4',
            incompatible: ['looting', 'education'],
            items: ['sword', 'battleaxe', 'alt_weapon', 'wolf_armor',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        mending: {
            levelMax: '1',
            weight: '2',
            incompatible: ['infinity', 'adv_mending'],
            items: ['helmet', 'chestplate', 'leggings', 'boots', 'pickaxe', 'shovel', 'axe', 'sword', 'hoe', 'brush', 'fishing_rod',
                'bow', 'shears', 'flint_and_steel', 'carrot_on_a_stick', 'warped_fungus_on_a_stick', 'shield', 'elytra', 'trident',
                'crossbow'
            ]
        },
        adv_mending: {
            levelMax: '1',
            weight: '4',
            incompatible: ['mending'],
            items: all.filter(item => item !== 'lock')
        },
        unbreaking: {
            levelMax: '3',
            weight: '1',
            incompatible: ['instability', 'rusted'],
            items: all
        },
        // Subject
        subject_science: {
            levelMax: '4',
            weight: '2',
            incompatible: ['subject_pe', 'subject_english'],
            items: ['sword', 'axe', 'battleaxe', 'alt_weapon',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku']
        },
        subject_english: {
            levelMax: '4',
            weight: '2',
            incompatible: ['subject_pe', 'subject_science'],
            items: ['sword', 'axe', 'battleaxe', 'alt_weapon',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku']
        },
        subject_pe: {
            levelMax: '5',
            weight: '2',
            incompatible: ['subject_english', 'subject_science'],
            items: ['sword', 'axe', 'battleaxe', 'alt_weapon',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku']
        },
        // Weather
        clearskies_favor: {
            levelMax: '6',
            weight: '2',
            incompatible: ['thunderstoms_bestowment', 'sols_blessing', 'rain_bestowment', 'lunars_blessing', 'winters_grace'],
            items: ['sword', 'axe', 'battleaxe', 'alt_weapon',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        lunars_blessing: {
            levelMax: '5',
            weight: '2',
            incompatible: ['thunderstoms_bestowment', 'sols_blessing', 'rain_bestowment', 'clearskies_favor', 'winters_grace'],
            items: ['sword', 'battleaxe', 'alt_weapon', 'wolf_armor',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        rain_bestowment: {
            levelMax: '6',
            weight: '4',
            incompatible: ['thunderstoms_bestowment', 'sols_blessing', 'lunars_blessing', 'clearskies_favor', 'winters_grace'],
            items: ['sword', 'axe', 'battleaxe', 'alt_weapon',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        sols_blessing: {
            levelMax: '5',
            weight: '4',
            incompatible: ['thunderstoms_bestowment', 'lunars_blessing', 'rain_bestowment', 'clearskies_favor', 'winters_grace'],
            items: ['sword', 'battleaxe', 'alt_weapon',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku']
        },
        thunderstoms_bestowment: {
            levelMax: '6',
            weight: '4',
            incompatible: ['lunars_blessing', 'sols_blessing', 'rain_bestowment', 'clearskies_favor', 'winters_grace'],
            items: ['sword', 'battleaxe', 'alt_weapon', 'wolf_armor',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        winters_grace: {
            levelMax: '6',
            weight: '4',
            incompatible: ['thunderstoms_bestowment', 'sols_blessing', 'rain_bestowment', 'clearskies_favor', 'lunars_blessing'],
            items: ['sword', 'battleaxe', 'alt_weapon', 'wolf_armor',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        //IPotionDebuffer
        levitator: {
            levelMax: '2',
            weight: '2',
            incompatible: [...IPotionDebuffer.flat()].filter(item => item !== 'levitator'),
            items: ['sword', 'battleaxe', 'alt_weapon', 'wolf_armor',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        desolator: {
            levelMax: '4',
            weight: '2',
            incompatible: [...IPotionDebuffer.flat()].filter(item => item !== 'desolator'),
            items: ['axe', 'bs_battleaxe', 'battleaxe']
        },
        disorienting_blade: {
            levelMax: '4',
            weight: '2',
            incompatible: [...IPotionDebuffer.flat()].filter(item => item !== 'disorienting_blade'),
            items: ['sword', 'battleaxe', 'alt_weapon', 'wolf_armor',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        envenomed: {
            levelMax: '3',
            weight: '2',
            incompatible: [...IPotionDebuffer.flat()].filter(item => item !== 'envenomed'),
            items: ['sword', 'battleaxe', 'alt_weapon', 'wolf_armor',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        hors_de_combat: {
            levelMax: '4',
            weight: '2',
            incompatible: [...IPotionDebuffer.flat()].filter(item => item !== 'hors_de_combat'),
            items: ['sword', 'battleaxe', 'alt_weapon', 'wolf_armor',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        purification: {
            levelMax: '5',
            weight: '1',
            incompatible: ['butchering', ...IPotionDebuffer.flat()].filter(item => item !== 'purification'),
            items: ['axe', 'bs_battleaxe', 'battleaxe']
        },
        freezing: {
            levelMax: '3',
            weight: '2',
            incompatible: [...IPotionDebuffer.flat()].filter(item => item !== 'freezing'),
            items: ['sword', 'battleaxe', 'alt_weapon',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku']
        },
        // IConditionalDamage+
        luck_magnification: {
            levelMax: '2',
            weight: '2',
            incompatible: ['critical_strike', 'mortalitas', 'ash_destroyer', 'reviled_blade', 'cursed_edge', 'instability'],
            items: ['sword', 'axe', 'battleaxe', 'alt_weapon',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku']
        },
        ash_destroyer: {
            levelMax: '5',
            weight: '2',
            incompatible: ['fire_aspect', 'fiery_edge', 'critical_strike', 'mortalitas',
                'reviled_blade', 'cursed_edge', 'luck_magnification', 'instability'],
            items: ['sword', 'battleaxe', 'alt_weapon', 'wolf_armor',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        critical_strike: {
            levelMax: '4',
            weight: '2',
            incompatible: ['luck_magnification', 'ash_destroyer', 'mortalitas', 'reviled_blade', 'cursed_edge', 'instability'],
            items: ['sword', 'axe', 'battleaxe', 'alt_weapon',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        reviled_blade: {
            levelMax: '4',
            weight: '4',
            incompatible: ['cursed_edge', 'swifter_slashes', 'critical_strike',
                'mortalitas', 'ash_destroyer', 'luck_magnification', 'instability'],
            items: ['sword', 'battleaxe', 'alt_weapon', 'wolf_armor',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        swifter_slashes: {
            levelMax: '5',
            weight: '4',
            incompatible: ['bluntness', 'knockback', 'blessed_edge', 'reviled_blade', 'cursed_edge', 'heavy_weight'],
            items: ['sword', 'battleaxe', 'alt_weapon', 'wolf_armor',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        blessed_edge: {
            levelMax: '5',
            weight: '2',
            incompatible: ['adv_efficiency', 'swifter_slashes', 'lifesteal', 'penetrating_edge', 'water_aspect',
                'spell_breaker', 'cursed_edge', 'defusing_edge', 'butchering', 'smite', 'inhumane',
                ...IEnchantmentDamage.flat()],
            items: ['sword', 'battleaxe', 'alt_weapon', 'wolf_armor',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        defusing_edge: {
            levelMax: '5',
            weight: '2',
            incompatible: ['adv_efficiency', 'blessed_edge', 'spell_breaker', 'water_aspect',
                'penetrating_edge', ...EnchantmentDamage.flat()].filter(item => item !== 'defusing_edge'),
            items: ['sword', 'axe', 'battleaxe', 'alt_weapon', 'wolf_armor',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        penetrating_edge: {
            levelMax: '6',
            weight: '2',
            incompatible: ['rune_arrow_piercing', 'rune_piercing_capabilities', 'blessed_edge',
                ...EnchantmentDamage.flat()].filter(item => item !== 'butchering'),
            items: ['axe', 'bs_battleaxe', 'battleaxe']
        },
        butchering: {
            levelMax: '5',
            weight: '2',
            incompatible: ['bluntness', 'water_aspect', 'spell_breaker', 'defusing_edge', 'sharpness', 'smite',
                'bane_of_arthropods', 'cursed_edge', 'blessed_edge', 'inhumane', 'purification',
                ...IEnchantmentDamage.flat()],
            items: ['sword', 'axe', 'battleaxe', 'alt_weapon', 'wolf_armor',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        spell_breaker: {
            levelMax: '5',
            weight: '2',
            incompatible: ['blessed_edge', ...EnchantmentDamage.flat()],
            items: ['sword', 'axe', 'battleaxe', 'alt_weapon',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        mortalitas: {
            levelMax: '8',
            weight: '4',
            incompatible: ['luck_magnification', 'ash_destroyer', 'critical_strike', 'reviled_blade', 'viper',
                'dark_shadows', 'instability'],
            items: ['sword', 'axe', 'battleaxe', 'alt_weapon',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        // Other damage
        lifesteal: {
            levelMax: '2',
            weight: '2',
            incompatible: ['blessed_edge', 'cursed_edge'],
            items: ['sword', 'axe', 'battleaxe', 'alt_weapon',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        viper: {
            levelMax: '5',
            weight: '2',
            incompatible: ['mortalitas', 'dark_shadows'],
            items: ['sword', 'battleaxe', 'alt_weapon', 'wolf_armor',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        vampirism: {
            levelMax: '2',
            weight: '2',
            incompatible: [],
            items: ['sword', 'battleaxe', 'alt_weapon', 'throwable_weapon', 'wolf_armor',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        dark_shadows: {
            levelMax: '3',
            weight: '2',
            incompatible: ['mortalitas', 'viper'],
            items: ['sword', 'battleaxe', 'alt_weapon',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku']
        },
        inhumane: {
            levelMax: '5',
            weight: '2',
            incompatible: ['blessed_edge', 'spell_breaker', 'penetrating_edge', 'adv_efficiency',
                ...EnchantmentDamage.flat()].filter(item => item !== 'inhumane'),
            items: ['sword', 'axe', 'battleaxe', 'alt_weapon',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        water_aspect: {
            levelMax: '5',
            weight: '2',
            incompatible: ['adv_efficiency', 'fire_aspect', 'fiery_edge', 'spell_breaker', 'penetrating_edge',
                ...EnchantmentDamage.flat()].filter(item => item !== 'water_aspect'),
            items: ['sword', 'battleaxe', 'alt_weapon', 'wolf_armor',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        penetration: {
            levelMax: '5',
            weight: '2',
            incompatible: ['smite', 'sharpness', 'bane_of_arthropods'],
            items: ['sword', 'battleaxe', 'alt_weapon', 'throwable_weapon', 'wolf_armor',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        atomic_deconstructor: {
            levelMax: '2',
            weight: '2',
            incompatible: [],
            items: ['sword', 'battleaxe', 'alt_weapon', 'wolf_armor',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        parry: {
            levelMax: '1',
            weight: '2',
            incompatible: ['possession_curse'],
            items: ['sword', 'axe', 'battleaxe', 'alt_weapon',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        assassinate: {
            levelMax: '3',
            weight: '2',
            incompatible: [],
            items: ['bs_dagger']
        },
        bash: {
            levelMax: '3',
            weight: '2',
            incompatible: [],
            items: ['bs_hammer']
        },
        combo: {
            levelMax: '3',
            weight: '2',
            incompatible: [],
            items: ['nunchaku']
        },
        disarm: {
            levelMax: '3',
            weight: '2',
            incompatible: [],
            items: ['bs_battleaxe']
        },
        disarmament: {
            levelMax: '5',
            weight: '2',
            incompatible: [],
            items: ['axe', 'bs_battleaxe', 'battleaxe']
        },
        brutality: {
            levelMax: '5',
            weight: '2',
            incompatible: [],
            items: ['axe', 'bs_battleaxe', 'battleaxe']
        },
        culling: {
            levelMax: '3',
            weight: '4',
            incompatible: [],
            items: ['axe', 'bs_battleaxe', 'battleaxe']
        },
        purging_blade: {
            levelMax: '5',
            weight: '1',
            incompatible: [],
            items: ['sword', 'battleaxe', 'alt_weapon', 'wolf_armor',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        unsheating: {
            levelMax: '1',
            weight: '4',
            incompatible: [],
            items: ['sword', 'battleaxe', 'alt_weapon',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku']
        },
        true_strike: {
            levelMax: '1',
            weight: '2',
            incompatible: ['inaccuracy_curse'],
            items: ['sword', 'battleaxe', 'alt_weapon',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku']
        },
        arc_slash: {
            levelMax: '3',
            weight: '4',
            incompatible: ['sweeping'],
            items: ['sword', 'battleaxe', 'alt_weapon', 'wolf_armor',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        sweeping: {
            levelMax: '3',
            weight: '2',
            incompatible: ['arc_slash'],
            items: ['sword']
        },
        knockback: {
            levelMax: '2',
            weight: '1',
            incompatible: ['swifter_slashes', 'adv_knockback', 'flinging', 'fling', 'efficiency'],
            items: ['sword']
        },
        adv_knockback: {
            levelMax: '2',
            weight: '4',
            incompatible: ['flinging', 'knockback'],
            items: ['sword', 'axe', 'battleaxe', 'alt_weapon',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        flinging: {
            levelMax: '2',
            weight: '1',
            incompatible: ['knockback', 'adv_knockback'],
            items: ['sword', 'battleaxe', 'alt_weapon', 'wolf_armor',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        fling: {
            levelMax: '2',
            weight: '2',
            incompatible: ['knockback'],
            items: ['sword', 'battleaxe', 'alt_weapon', 'wolf_armor',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        rune_piercing_capabilities: {
            levelMax: '4',
            weight: '4',
            incompatible: ['penetrating_edge', 'rune_arrow_piercing'],
            items: ['sword', 'battleaxe', 'alt_weapon', 'wolf_armor',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        rune_arrow_piercing: {
            levelMax: '4',
            weight: '4',
            incompatible: ['penetrating_edge', 'rune_piercing_capabilities'],
            items: ['bow', 'switch-bow', 'switch-crossbow', 'crossbow']
        },
        // Bow
        power: {
            levelMax: '5',
            weight: '1',
            incompatible: ['powerless', 'adv_power'],
            items: ['bow']
        },
        adv_power: {
            levelMax: '5',
            weight: '4',
            incompatible: ['power', 'powerless'],
            items: ['bow', 'switch-bow', 'switch-crossbow', 'crossbow']
        },
        infinity: {
            levelMax: '1',
            weight: '4',
            incompatible: ['mending', 'strafe', 'arrow_recovery'],
            items: ['bow']
        },
        flame: {
            levelMax: '1',
            weight: '2',
            incompatible: ['supreme_flame', 'lesser_flame', 'adv_flame'],
            items: ['bow']
        },
        lesser_flame: {
            levelMax: '1',
            weight: '1',
            incompatible: ['flame', 'supreme_flame', 'adv_flame'],
            items: ['bow', 'switch-bow', 'switch-crossbow', 'crossbow']
        },
        adv_flame: {
            levelMax: '1',
            weight: '4',
            incompatible: ['flame', 'lesser_flame', 'supreme_flame'],
            items: ['bow', 'switch-bow', 'switch-crossbow', 'crossbow']
        },
        supreme_flame: {
            levelMax: '1',
            weight: '4',
            incompatible: ['flame', 'lesser_flame', 'adv_flame'],
            items: ['bow', 'switch-bow', 'switch-crossbow', 'crossbow']
        },
        punch: {
            levelMax: '2',
            weight: '2',
            incompatible: ['adv_punch', 'strafe', 'blast', 'dragging'],
            items: ['bow']
        },
        adv_punch: {
            levelMax: '2',
            weight: '4',
            incompatible: ['punch', 'strafe', 'dragging'],
            items: ['bow', 'switch-bow', 'switch-crossbow', 'crossbow']
        },
        dragging: {
            levelMax: '2',
            weight: '4',
            incompatible: ['punch', 'adv_punch'],
            items: ['bow', 'switch-bow', 'switch-crossbow', 'crossbow']
        },
        strafe: {
            levelMax: '4',
            weight: '1',
            incompatible: ['pushing', 'punch', 'adv_punch', 'infinity'],
            items: ['bow', 'switch-bow', 'switch-crossbow']
        },
        pushing: {
            levelMax: '1',
            weight: '4',
            incompatible: ['strafe'],
            items: ['bow', 'switch-bow', 'switch-crossbow']
        },
        arrow_recovery: {
            levelMax: '3',
            weight: '1',
            incompatible: ['infinity'],
            items: ['bow', 'switch-bow', 'switch-crossbow']
        },
        blast: {
            levelMax: '2',
            weight: '2',
            incompatible: ['multishot', 'punch'],
            items: ['bow']
        },
        multishot: {
            levelMax: '4',
            weight: '1',
            incompatible: ['blast', 'splitshot'],
            items: ['bow', 'switch-bow', 'switch-crossbow']
        },
        range: {
            levelMax: '1',
            weight: '2',
            incompatible: [],
            items: ['bow', 'switch-bow', 'switch-crossbow', 'crossbow']
        },
        rapid_fire: {
            levelMax: '2',
            weight: '2',
            incompatible: [],
            items: ['bow', 'switch-bow', 'switch-crossbow']
        },
        splitshot: {
            levelMax: '4',
            weight: '4',
            incompatible: ['multishot'],
            items: ['bow', 'switch-bow', 'switch-crossbow', 'crossbow']
        },
        rapid_load: {
            levelMax: '3',
            weight: '1',
            incompatible: [],
            items: ['crossbow']
        },
        spreadshot: {
            levelMax: '1',
            weight: '2',
            incompatible: [],
            items: ['crossbow']
        },
        sharpshooter: {
            levelMax: '3',
            weight: '2',
            incompatible: [],
            items: ['crossbow']
        },
        pull_speed: {
            levelMax: '3',
            weight: '2',
            incompatible: [],
            items: ['switch-bow']
        },
        scope: {
            levelMax: '1',
            weight: '2',
            incompatible: [],
            items: ['bow', 'switch-bow', 'switch-crossbow']
        },
        reduce_cooldown: {
            levelMax: '5',
            weight: '2',
            incompatible: [],
            items: ['switch-crossbow']
        },
        // Fishing
        luck_of_the_sea: {
            levelMax: '3',
            weight: '2',
            incompatible: ['adv_luck_of_the_sea', 'silk_touch'],
            items: ['fishing_rod']
        },
        adv_luck_of_the_sea: {
            levelMax: '3',
            weight: '4',
            incompatible: ['luck_of_the_sea'],
            items: ['fishing_rod']
        },
        lure: {
            levelMax: '3',
            weight: '2',
            incompatible: ['adv_lure'],
            items: ['fishing_rod']
        },
        adv_lure: {
            levelMax: '3',
            weight: '4',
            incompatible: ['lure'],
            items: ['fishing_rod']
        },
        // Shield
        blocking_power: {
            levelMax: '3',
            weight: '1',
            incompatible: ['spellproof'],
            items: ['bs_shield']
        },
        heaviness: {
            levelMax: '1',
            weight: '2',
            incompatible: ['weightless'],
            items: ['bs_shield']
        },
        reflection: {
            levelMax: '3',
            weight: '2',
            incompatible: [],
            items: ['bs_shield']
        },
        spellproof: {
            levelMax: '3',
            weight: '1',
            incompatible: ['blocking_power'],
            items: ["bs_shield"]
        },
        weightless: {
            levelMax: '1',
            weight: '1',
            incompatible: ['heaviness'],
            items: ['bs_shield']
        },
        empowered_defence: {
            levelMax: '2',
            weight: '2',
            incompatible: [],
            items: ['shield', 'baubles_shield', 'gold_shield', 'bs_shield', 'spartan_shield']
        },
        burning_shield: {
            levelMax: '4',
            weight: '2',
            incompatible: [],
            items: ['shield', 'baubles_shield', 'gold_shield', 'bs_shield', 'spartan_shield']
        },
        natural_blocking: {
            levelMax: '2',
            weight: '2',
            incompatible: [],
            items: ['shield', 'baubles_shield', 'gold_shield', 'bs_shield', 'spartan_shield']
        },
        spikes: {
            levelMax: '3',
            weight: '1',
            incompatible: [],
            items: ['baubles_shield', 'gold_shield', 'bs_shield', 'spartan_shield']
        },
        // Throwable weapon
        propulsion: {
            levelMax: '3',
            weight: '1',
            incompatible: [],
            items: ['throwable_weapon']
        },
        razors_edge: {
            levelMax: '5',
            weight: '1',
            incompatible: [],
            items: ['throwable_weapon']
        },
        incendiary: {
            levelMax: '1',
            weight: '2',
            incompatible: ['hydrodynamic'],
            items: ['throwable_weapon']
        },
        lucky_throw: {
            levelMax: '3',
            weight: '2',
            incompatible: ['silk_touch'],
            items: ['throwable_weapon']
        },
        hydrodynamic: {
            levelMax: '1',
            weight: '4',
            incompatible: ['incendiary'],
            items: ['throwable_weapon']
        },
        supercharge: {
            levelMax: '2',
            weight: '2',
            incompatible: [],
            items: ['throwable_weapon']
        },
        expanse: {
            levelMax: '2',
            weight: '2',
            incompatible: [],
            items: ['throwable_weapon']
        },
        return: {
            levelMax: '3',
            weight: '4',
            incompatible: [],
            items: ['throwable_weapon']
        },
        // Umbra Blaster, Ravager, Concussion Smasher
        precision: {
            levelMax: '3',
            weight: '1',
            incompatible: [],
            items: ['umbra_blaster', 'ravager']
        },
        economical: {
            levelMax: '4',
            weight: '1',
            incompatible: [],
            items: ['umbra_blaster', 'ravager']
        },
        destructive: {
            levelMax: '5',
            weight: '1',
            incompatible: [],
            items: ['umbra_blaster', 'concussion_smasher']
        },
        safeguard: {
            levelMax: '1',
            weight: '1',
            incompatible: [],
            items: ['umbra_blaster']
        },
        blazing: {
            levelMax: '1',
            weight: '4',
            incompatible: [],
            items: ['umbra_blaster']
        },
        // Hoe
        homing: {
            levelMax: '1',
            weight: '2',
            incompatible: [],
            items: ['hoe']
        },
        moisturized: {
            levelMax: '1',
            weight: '1',
            incompatible: [],
            items: ['hoe', 'flint_hoe']
        },
        jagged_rake: {
            levelMax: '5',
            weight: '2',
            incompatible: [],
            items: ['hoe', 'flint_hoe']
        },
        plowing: {
            levelMax: '2',
            weight: '2',
            incompatible: [],
            items: ['hoe', 'flint_hoe']
        },
        // Lock
        shocking: {
            levelMax: '5',
            weight: '1',
            incompatible: [],
            items: ['lock']
        },
        sturdy: {
            levelMax: '3',
            weight: '2',
            incompatible: [],
            items: ['lock']
        },
        complexity: {
            levelMax: '3',
            weight: '4',
            incompatible: [],
            items: ['lock']
        },
        // Curses
        possession_curse: {
            levelMax: '1',
            weight: '4',
            incompatible: ['decay_curse'],
            items: all
        },
        binding_curse: {
            levelMax: '1',
            weight: '4',
            incompatible: [],
            items: ['helmet', 'chestplate', 'leggings', 'boots', 'elytra', 'pumpkin', 'helmet']
        },
        vanishing_curse: {
            levelMax: '1',
            weight: '4',
            incompatible: [],
            items: ['helmet', 'chestplate', 'leggings', 'boots', 'pickaxe', 'shovel', 'axe', 'sword', 'hoe', 'brush', 'fishing_rod',
                'bow', 'shears', 'flint_and_steel', 'carrot_on_a_stick', 'warped_fungus_on_a_stick', 'shield', 'elytra', 'pumpkin',
                'helmet', 'trident', 'crossbow'
            ]
        },
        curse_break: {
            levelMax: '1',
            weight: '1',
            incompatible: [],
            items: all
        },
        rusting_curse: {
            levelMax: '1',
            weight: '4',
            incompatible: [],
            items: all
        },
        clumsiness_curse: {
            levelMax: '1',
            weight: '4',
            incompatible: [],
            items: ['sword', 'battleaxe', 'alt_weapon', 'throwable_weapon', 'wolf_armor',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        haunting_curse: {
            levelMax: '1',
            weight: '4',
            incompatible: [],
            items: ['sword', 'battleaxe', 'alt_weapon', 'throwable_weapon', 'wolf_armor',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        harming_curse: {
            levelMax: '1',
            weight: '4',
            incompatible: [],
            items: all
        },
        inefficient: {
            levelMax: '5',
            weight: '2',
            incompatible: ['adv_efficiency', 'efficiency'],
            items: ['saw', 'pickaxe', 'axe', 'shovel', 'flint_hatchet', 'flint_pickaxe', 'mattock']
        },
        heavy_weight: {
            levelMax: '5',
            weight: '2',
            incompatible: ['swifter_slashes'],
            items: ['sword', 'battleaxe', 'alt_weapon', 'throwable_weapon', 'wolf_armor',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        rusted: {
            levelMax: '3',
            weight: '2',
            incompatible: ['unbreaking'],
            items: all.filter(item => item !== 'gold_shield')
        },
        bluntness: {
            levelMax: '5',
            weight: '2',
            incompatible: ['adv_efficiency', 'spell_breaker', 'swifter_slashes', 'penetrating_edge',
                ...EnchantmentDamage.flat()].filter(item => item !== 'bluntness'),
            items: ['sword', 'axe', 'battleaxe', 'alt_weapon']
        },
        cursed_edge: {
            levelMax: '5',
            weight: '2',
            incompatible: ['swifter_slashes', 'lifesteal', 'blessed_edge', 'critical_strike', 'reviled_blade',
                'ash_destroyer', 'luck_magnification', 'butchering', 'instability'],
            items: ['sword', 'battleaxe', 'alt_weapon', 'wolf_armor',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        unpredictable: {
            levelMax: '2',
            weight: '4',
            incompatible: [],
            items: ['sword', 'axe', 'battleaxe', 'alt_weapon',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'knife', 'flint_knife']
        },
        powerless: {
            levelMax: '5',
            weight: '2',
            incompatible: ['power', 'adv_power'],
            items: ['bow', 'switch-bow', 'switch-crossbow', 'crossbow']
        },
        decay_curse: {
            levelMax: '1',
            weight: '4',
            incompatible: ['possession_curse'],
            items: all
        },
        inaccuracy_curse: {
            levelMax: '2',
            weight: '4',
            incompatible: ['true_strike'],
            items: ['sword', 'axe', 'battleaxe', 'alt_weapon', 'bow', 'switch-bow', 'switch-crossbow', 'crossbow',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku']
        },
        holding_curse: {
            levelMax: '2',
            weight: '4',
            incompatible: [],
            items: all
        },
        vulnerability_curse: {
            levelMax: '4',
            weight: '4',
            incompatible: ['feather_falling', ...EnchantmentProtection.flat()].filter(item => item !== 'vulnerability_curse'),
            items: ['leggings', 'boots', 'chestplate', 'helmet', 'lifebelt']
        },
        unreasonable: {
            levelMax: '2',
            weight: '2',
            incompatible: [],
            items: ['sword', 'battleaxe', 'alt_weapon',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku']
        },
        instability: {
            levelMax: '3',
            weight: '4',
            incompatible: ['unbreaking', 'critical_strike', 'mortalitas', 'luck_magnification',
                'ash_destroyer', 'reviled_blade', 'cursed_edge'],
            items: ['sword', 'axe', 'battleaxe', 'alt_weapon', 'shovel', 'pickaxe', 'flint_pickaxe', 'saw',
                'bs_hammer', 'bs_dagger', 'bs_battleaxe', 'nunchaku', 'flint_hatchet', 'mattock']
        },
        pandoras_curse: {
            levelMax: '1',
            weight: '4',
            incompatible: [],
            items: all
        },
    },
    items: [
        // ARMOR
        'helmet',
        'chestplate',
        'leggings',
        'boots',
        'elytra',
            //RL CRAFT

        // WEAPONS
        'sword',
            // RL CRAFT
        'bs_battleaxe',
        'battleaxe',
        'bs_dagger',
        'bs_hammer',
        'nunchaku',
        'alt_weapon',
        'throwable_weapon',

        // TOOLS
        'axe',
        'pickaxe',
        'shovel',
        'hoe',
            // RL CRAFT
        'flint_hatchet',
        'flint_knife',
        'flint_hoe',
        'flint_pickaxe',
        'mattock',
        'saw',
        'knife',
        
        //SHIELDS
        'shield',
            //RL CRAFT
        'baubles_shield',
        'bs_shield',
        'spartan_shield',

        //RANGED
        'bow',
            // RL CRAFT
        'crossbow',
        'switch-bow',
        'switch-crossbow',
        'umbra_blaster',
        'ravager',

        // OTHER
        'fishing_rod',
        'shears',
        'flint_and_steel',
        'carrot_on_a_stick',
        'book',
            //RL CRAFT
        'launcher',
        'lifebelt',
        'concussion_smasher',
        'lock',
        'wolf_armor'
    ]
};