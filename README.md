# Minecraft Enchantment Ordering Tool

This web-based tool allows you to find the optimal order for combining enchant books in Minecraft to minimize XP cost.

You can use it here: https://iamcal.github.io/enchant-order/

The tool works by trying every possible combining sequence and calculating the cost of each.
For items with many enchantments, this can mean trying a few million combinations.
The work happens in a background thread (a WebWorker) and the best solution is explained.


## Localization

You can add support for new languages by:

* Adding a new JSON file inside `languages/` (see existing files there for hints)
* Modifying `script.js` to add the language to the supported list
* Modifying `langs.html` in the same way
* Opening `langs.html` in the browser to verify if the required strings are all implemented

Please open a PR with the above changes to have your language merged (or updated).
