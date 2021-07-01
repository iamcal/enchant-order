# Minecraft Enchantment Ordering Tool

This web-based tools allows you to find the optimal order for combining enchant books in Minecraft to minimize XP cost.

You can use it here: https://iamcal.github.io/enchant-order/

The tool works by trying every possible combining sequence and calculating the cost of each.
For items with many enchantments, this can mean trying a few million combinations.
The work happens in a background thread (a WebWorker) and the best solution is explained.
