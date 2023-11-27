# Minecraft Enchantment Ordering Tool

Esta es una herramienta web que permite encontrar la mejor manera de combinar los libros de encantamientos de Minecraft para así gastar menos XP

Puedes usarla aquí: https://koryfroste05.github.io/orden-encantamientos-mc/

The tool works by trying every possible combining sequence and calculating the cost of each.
For items with many enchantments, this can mean trying a few million combinations.
The work happens in a background thread (a WebWorker) and the best solution is explained.
