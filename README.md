# Backround information

You can use the tool here: https://plutoxar.github.io/enchant-order-solver/

This project is a fork of Cal Henderson's web-based tool available at https://github.com/iamcal/enchant-order. It extends support for modded content.

The motivation behind this project stemmed from the absence of a tool for modded content, handled more enchantments and was responsive enough for more enchantments.

The language files, vanilla Minecraft icons, and spin.svg, as well as modpacks/Minecraft/data.js, are from the original project. work.js has been merged with the original project but differs slightly. <br>
The UI is original, providing a better experience when more enchantments are present.

Adding more than 14 enchantments may not complete. With 14 enchantments, the process should take less than 2 minutes but is resource-intensive. If it doesn't finish in a few minutes with 14 or fewer enchantments, consider closing RLCraft or other demanding processes.

If the base item you want to enchant is a book, you can select 15 enchantments.

# RLCraft specific information:

Rusted enchantment cannot be applied to most gold items.

### Alternative weapon:
Spear, Glaive, Quarerstaff, Halberd, Pike, Lance, Mace, Club, Warhammer, Greatsword and Caestus
### Throwable weapon:
Throwing Axe, Throwing Knife, Javelin and Boomerang
### Sword:
Saber, Rapier, Longsword, Katana, Other Melee Weapons
### Bow:
Bow and Longbow
### Flint and steel or Carrot on a Stick:
Select either Flint and Steel or Carrot on a Stick for items like Trumpet, Warp Stone, and other items not covered elsewhere.
## Using Upgraded Potentials enchantment:
The optimal formula for determining when to apply Upgraded Potentials seems to be (total enchantments / 2). Round the result either down or up. Note that Upgraded Potentials itself is not counted in the total enchantments.

Identifying the absolute best enchantments to apply both before and after using Upgraded Potentials can be a challenging task. To provide some guidance, here's a general strategy:

Examine the level values of each enchantment using one of these methods:

1. Place an unenchanted item in the left slot and your enchanted book in the right slot of an anvil. The level cost shown represents the level value. 

2. Select the enchantment and desired level, then click "calculate" in the tool. The total cost is the level cost for that enchantment.

Strategically distribute your enchantments so that both sides, pre and post Upgraded Potentials application, feature a mix of very high and very low-costing enchantments. Aim for the total XP cost on both sides to be closely matched.

After distributing the enchantments, input both sides separately into the tool and allow it to find optimal solutions for both sides.

# Contribution

To have your changes applied, please open a pull request to this fork or the original repository.<br>
Feel free to add new languages to the original repository; your contributions are encouraged.