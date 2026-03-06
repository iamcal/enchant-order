import type {ItemNamespace} from '../types/enchant';
import type {EnchantSelection} from '../types/enchant';

export interface Loadout {
  id: string;
  name: string;
  enchants: EnchantSelection[];
}

export const loadoutsByItem: Record<ItemNamespace, Loadout[]> = {
  sword: [
    {
      id: 'sword-max',
      name: 'Max',
      enchants: [
        ['sharpness', 5],
        ['looting', 3],
        ['fire_aspect', 2],
        ['knockback', 2],
        ['sweeping', 3],
        ['unbreaking', 3],
        ['mending', 1],
      ],
    },
  ],
  pickaxe: [
    {
      id: 'pickaxe-fortune',
      name: 'Fortune',
      enchants: [
        ['efficiency', 5],
        ['fortune', 3],
        ['unbreaking', 3],
        ['mending', 1],
      ],
    },
    {
      id: 'pickaxe-silk',
      name: 'Silk Touch',
      enchants: [
        ['efficiency', 5],
        ['silk_touch', 1],
        ['unbreaking', 3],
        ['mending', 1],
      ],
    },
  ],
  axe: [
    {
      id: 'axe-fortune',
      name: 'Fortune',
      enchants: [
        ['efficiency', 5],
        ['fortune', 3],
        ['sharpness', 5],
        ['unbreaking', 3],
        ['mending', 1],
      ],
    },
    {
      id: 'axe-silk',
      name: 'Silk Touch',
      enchants: [
        ['efficiency', 5],
        ['silk_touch', 1],
        ['sharpness', 5],
        ['unbreaking', 3],
        ['mending', 1],
      ],
    },
  ],
  shovel: [
    {
      id: 'shovel-fortune',
      name: 'Fortune',
      enchants: [
        ['efficiency', 5],
        ['fortune', 3],
        ['unbreaking', 3],
        ['mending', 1],
      ],
    },
    {
      id: 'shovel-silk',
      name: 'Silk Touch',
      enchants: [
        ['efficiency', 5],
        ['silk_touch', 1],
        ['unbreaking', 3],
        ['mending', 1],
      ],
    },
  ],
  hoe: [
    {
      id: 'hoe-fortune',
      name: 'Fortune',
      enchants: [
        ['efficiency', 5],
        ['fortune', 3],
        ['unbreaking', 3],
        ['mending', 1],
      ],
    },
    {
      id: 'hoe-silk',
      name: 'Silk Touch',
      enchants: [
        ['efficiency', 5],
        ['silk_touch', 1],
        ['unbreaking', 3],
        ['mending', 1],
      ],
    },
  ],
  bow: [
    {
      id: 'bow-infinity',
      name: 'Infinity',
      enchants: [
        ['power', 5],
        ['infinity', 1],
        ['flame', 1],
        ['punch', 2],
        ['unbreaking', 3],
      ],
    },
    {
      id: 'bow-mending',
      name: 'Mending',
      enchants: [
        ['power', 5],
        ['mending', 1],
        ['flame', 1],
        ['punch', 2],
        ['unbreaking', 3],
      ],
    },
  ],
  crossbow: [
    {
      id: 'crossbow-multishot',
      name: 'Multishot',
      enchants: [
        ['quick_charge', 3],
        ['multishot', 1],
        ['unbreaking', 3],
        ['mending', 1],
      ],
    },
    {
      id: 'crossbow-piercing',
      name: 'Piercing',
      enchants: [
        ['quick_charge', 3],
        ['piercing', 4],
        ['unbreaking', 3],
        ['mending', 1],
      ],
    },
  ],
  trident: [
    {
      id: 'trident-loyalty-channeling',
      name: 'Loyalty + Channeling',
      enchants: [
        ['impaling', 5],
        ['loyalty', 3],
        ['channeling', 1],
        ['unbreaking', 3],
        ['mending', 1],
      ],
    },
    {
      id: 'trident-riptide',
      name: 'Riptide',
      enchants: [
        ['impaling', 5],
        ['riptide', 3],
        ['unbreaking', 3],
        ['mending', 1],
      ],
    },
  ],
  helmet: [
    {
      id: 'helmet-max',
      name: 'Max',
      enchants: [
        ['protection', 4],
        ['respiration', 3],
        ['aqua_affinity', 1],
        ['thorns', 3],
        ['unbreaking', 3],
        ['mending', 1],
      ],
    },
  ],
  chestplate: [
    {
      id: 'chestplate-max',
      name: 'Max',
      enchants: [
        ['protection', 4],
        ['thorns', 3],
        ['unbreaking', 3],
        ['mending', 1],
      ],
    },
  ],
  leggings: [
    {
      id: 'leggings-max',
      name: 'Max',
      enchants: [
        ['protection', 4],
        ['swift_sneak', 3],
        ['thorns', 3],
        ['unbreaking', 3],
        ['mending', 1],
      ],
    },
  ],
  boots: [
    {
      id: 'boots-depth',
      name: 'Depth Strider',
      enchants: [
        ['protection', 4],
        ['feather_falling', 4],
        ['depth_strider', 3],
        ['thorns', 3],
        ['unbreaking', 3],
        ['mending', 1],
        ['soul_speed', 3],
      ],
    },
    {
      id: 'boots-frost',
      name: 'Frost Walker',
      enchants: [
        ['protection', 4],
        ['feather_falling', 4],
        ['frost_walker', 2],
        ['thorns', 3],
        ['unbreaking', 3],
        ['mending', 1],
        ['soul_speed', 3],
      ],
    },
  ],
  turtle_shell: [
    {
      id: 'turtle-max',
      name: 'Max',
      enchants: [
        ['protection', 4],
        ['respiration', 3],
        ['aqua_affinity', 1],
        ['thorns', 3],
        ['unbreaking', 3],
        ['mending', 1],
      ],
    },
  ],
  elytra: [
    {
      id: 'elytra-max',
      name: 'Max',
      enchants: [
        ['unbreaking', 3],
        ['mending', 1],
      ],
    },
  ],
  shield: [
    {
      id: 'shield-max',
      name: 'Max',
      enchants: [
        ['unbreaking', 3],
        ['mending', 1],
      ],
    },
  ],
  fishing_rod: [
    {
      id: 'rod-max',
      name: 'Max',
      enchants: [
        ['luck_of_the_sea', 3],
        ['lure', 3],
        ['unbreaking', 3],
        ['mending', 1],
      ],
    },
  ],
  mace: [
    {
      id: 'mace-density',
      name: 'Density',
      enchants: [
        ['density', 5],
        ['wind_burst', 3],
        ['fire_aspect', 2],
        ['unbreaking', 3],
        ['mending', 1],
      ],
    },
    {
      id: 'mace-breach',
      name: 'Breach',
      enchants: [
        ['breach', 4],
        ['wind_burst', 3],
        ['fire_aspect', 2],
        ['unbreaking', 3],
        ['mending', 1],
      ],
    },
  ],
  spear: [
    {
      id: 'spear-max',
      name: 'Max',
      enchants: [
        ['sharpness', 5],
        ['looting', 3],
        ['lunge', 3],
        ['knockback', 2],
        ['unbreaking', 3],
        ['mending', 1],
      ],
    },
  ],
  brush: [
    {
      id: 'brush-max',
      name: 'Max',
      enchants: [
        ['unbreaking', 3],
        ['mending', 1],
      ],
    },
  ],
  shears: [
    {
      id: 'shears-max',
      name: 'Max',
      enchants: [
        ['efficiency', 5],
        ['unbreaking', 3],
        ['mending', 1],
      ],
    },
  ],
  flint_and_steel: [
    {
      id: 'flint-max',
      name: 'Max',
      enchants: [
        ['unbreaking', 3],
        ['mending', 1],
      ],
    },
  ],
  carrot_on_a_stick: [
    {
      id: 'carrot-max',
      name: 'Max',
      enchants: [
        ['unbreaking', 3],
        ['mending', 1],
      ],
    },
  ],
  warped_fungus_on_a_stick: [
    {
      id: 'warped-max',
      name: 'Max',
      enchants: [
        ['unbreaking', 3],
        ['mending', 1],
      ],
    },
  ],
  pumpkin: [],
  book: [],
};
