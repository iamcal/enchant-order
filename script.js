let languageJson;
let chosenItem = "";
let chosenEnchants = [];
let moreEnchants = false;
let allowIncompatible = false;
let mode = 'levels'
let startTime;
let data;
let modpack = 'Minecraft';
const languages = {
    //key   : ['LABEL', cache-id],
    'en'    : ['English', 3],
    'pt-BR' : ['Português', 4],
    'ru-RU' : ['Русский', 3],
    'ua-UA' : ['Українська', 2],
    'be-BY' : ['беларускі', 1],
    'zh-CN' : ['中文', 4],
    'nl'    : ['Nederlands', 3],
    'de'    : ['Deutsch', 2],
    'es-ES' : ['Español', 5],
    'it-IT' : ['Italiano', 3],
};


function addLanguages() {
    for (const i in languages) {
        $("<option/>", {'value': i}).text(languages[i][0]).appendTo('#languages');
    }
    const languageDropdown = document.getElementById('languages');
    languageDropdown.addEventListener('click', clickHandler);
}


window.onload = async function () {
    worker = new Worker("work.js?1");
    worker.onmessage = function (event) {
        if (event.data.msg === "complete") {
            console.log(event.data);
            if (!event.data.extra) {
                const optimal_solution = document.getElementById('optimal_solution')
                optimal_solution.textContent = languageJson['no_solution_found']
                const solutionElement = document.getElementsByClassName('solution')
                solutionElement[0].style.display = 'initial'
            } else {
                solution(event.data);
            }
        }
    };
    await (async () => {
        const module = await import('./modpacks/Minecraft/data.js?1');
        data = module.data;

        worker.postMessage({
            msg: "set_data",
            data: data
        });
    })();

    const options = document.getElementsByClassName('options')
    options[0].addEventListener('click', clickHandler);
    await buildItems();
    await buildModpacks();
    defineBrowserLanguage();
    addLanguages();
};


function clickHandler(event) {
    const target = event.target;

    switch (true) {
        case target.classList.contains('level'): // select enchantment level
            selectNumber(target.offsetParent, target.innerHTML);
            break;
        case target.id === 'incompatible': // Allow incompatible enchantments
            allowIncompatible = !allowIncompatible;
            if (!allowIncompatible) {
                resetEnchants();
                return;
            }
            document.querySelectorAll('.unavailable').forEach(enchant => {
                enchant.classList.remove('unavailable');
                enchant.classList.add('enchant');
            });
            break;
        case target.id === 'more-enchants': // Allow more than 14 enchantments
            moreEnchants = !moreEnchants;
            if (!moreEnchants) {
                resetEnchants();
            }
            break;
        case target.type === 'radio': // Change calculation mode
            mode = target.id;
            break;
        case target.textContent === 'Calculate': // Calculate the optimal solution
            startTime = performance.now();
            worker.postMessage({
                msg: "process",
                item: chosenItem,
                enchants: chosenEnchants,
                mode: mode
            });
            $('.solution').show();
            $('#spin').show()
            $('#spin_text').text(languageJson['calculating_solution'])
            break;
        case target.parentElement.id === 'languages':
            $('#items').prop('selectedIndex', 0);
            buildLanguage(target.value, true);
            getModpackData(modpack, false)
            break;
    }
}


async function buildModpacks() {
    const dropdown = document.getElementById('modpacks')
    let modpacks = await fetch('modpacks.json')
    modpacks = await modpacks.json()

    // Add modpacks to the dropdown
    for (const item of modpacks) {
        const option = $("<option/>", item)
        option.text(item).appendTo(dropdown)
    }
}


async function getModpackData(modpackName, load = true) { // Called from index.html modpacks dropdown
    // Get new data and build items
    if (load) {
        await (async () => {
            const module = await import(`./modpacks/${modpackName}/data.js`);
            data = module.data;

            worker.postMessage({
                msg: "set_data",
                data: data,
                merge_level: modpackName === 'RLCraft' ? 60 : 39
            });
        })();

        await buildItems();
    }

    // Handle modpack-specific names
    if (modpackName !== 'Minecraft') {
        modpack = modpackName;
        // Fetch the additional items file
        const responseItems = await fetch(`modpacks/${modpackName}/items.json?1`);
        const itemsJson = await responseItems.json();

        // Fetch the additional enchants file
        const responseEnchants = await fetch(`modpacks/${modpackName}/enchants.json`);
        const enchantsJson = await responseEnchants.json();

        // Merge modpack-specific items and enchants with languageJson
        languageJson.items = {...languageJson.items, ...itemsJson};
        languageJson.enchants = {...languageJson.enchants, ...enchantsJson};
    }

    // Update page
    $('#enchants').empty(); // Clear all enchantments
    document.getElementsByClassName('solution')[0].style.display = 'none';
    buildLanguage();
}


function resetEnchants() {
    // Reset chosenEnchants and remove selected state from all enchants
    chosenEnchants = []
    const selected = document.querySelectorAll('.selected');
    for (const box of selected) {
        box.classList.remove('selected');
    }
}


function buildItems() {
    const selectElement = document.getElementById('items')

    // Remove all options except the first one
    while (selectElement.options.length > 1) {
        selectElement.remove(1);
    }

    // Append all items from data to dropdown menu
    data.items.forEach(item => {
        const listItem = {value: item};
        const itemOption = $("<option/>", listItem);
        itemOption.text(item).appendTo(selectElement);
    });
}

function buildEnchantments(item) { // Called from index.html items dropdown
    chosenEnchants = []
    chosenItem = item
    let i = 0

    // Add click handler to enchants
    const enchantsContainer = document.getElementById("enchants");
    enchantsContainer.addEventListener('click', clickHandler);

    // Show calculate button
    const calculateButton = document.getElementById("calculate")
    calculateButton.addEventListener('click', clickHandler);
    calculateButton.style.display = 'block';

    $('#enchants').empty(); // Clear all enchantments
    Object.keys(data.enchants).forEach(enchantName => {
        const enchant = data.enchants[enchantName];
        if (enchant.items.includes(item) || item === 'book') {

            // Create enchantment container
            const newEnchantDiv = document.createElement("div");
            newEnchantDiv.className = "enchant";
            newEnchantDiv.id = enchantName;

            // Create enchantment text
            const enchantTextDiv = document.createElement("div");
            enchantTextDiv.className = "enchant-text";
            enchantTextDiv.textContent = enchantName;

            // Create level boxes container
            const levelsDiv = document.createElement("div");
            levelsDiv.className = "levels";
            levelsDiv.id = "numberContainer";

            // Create level box div element
            const levelDiv = document.createElement("div");
            levelDiv.className = "level";

            // Create level boxes for every level
            for (let j = 1; j <= enchant.levelMax; j++) {
                const levelDiv = document.createElement("div");
                levelDiv.className = "level";
                levelDiv.textContent = j;
                levelsDiv.appendChild(levelDiv);
            }
            // Display all new elements
            newEnchantDiv.appendChild(enchantTextDiv);
            newEnchantDiv.appendChild(levelsDiv);
            document.querySelector('.fields .enchants').appendChild(newEnchantDiv);
            updateLevelBoxes(newEnchantDiv.id)
            i += 1
        }
    });
    // Update enchantment names
    buildLanguage();
}


function updateLevelBoxes(containerId) {
    const container = document.getElementById(containerId);
    const numberContainers = container.querySelectorAll('.levels');

    // Put level boxes into a grid
    numberContainers.forEach(numberContainer => {
        numberContainer.style.gridTemplateColumns = `repeat(${numberContainers[0].childElementCount}, auto)`;
    });
}


function selectNumber(container, level) {
    // Checks if enchant can be selected
    if (container && !container.classList.contains("unavailable")) {
        const clickedBox = container.querySelector(`.level:nth-child(${level})`);

        if (clickedBox) {
            // Checks if the clicked box is already selected
            const isSelected = clickedBox.classList.contains('selected');
            if (!moreEnchants && chosenEnchants.length >= 14 && chosenItem !== 'book' &&(!isSelected
                && !chosenEnchants.some(entry => entry.includes(container.id)))) {
                return
            }
            else if (!moreEnchants && chosenEnchants.length >= 15 &&(!isSelected
                && !chosenEnchants.some(entry => entry.includes(container.id)))) {
                return
            }

            // Get all number boxes within the container
            const levels = container.querySelectorAll('.level');

            // Remove 'selected' class from all boxes within the container
            levels.forEach(box => {
                box.classList.remove('selected');
            });

            // Remove enchant from chosenEnchants
            const entry = [container.id, level]
            chosenEnchants = chosenEnchants.filter(item => item[0] !== entry[0])
            // Add enchant to chosenEnchants
            if (!isSelected) {
                clickedBox.classList.add('selected');
                chosenEnchants.push(entry)
                disableIncompatible(entry, true) // Disable incompatible enchants
                return
            }
            disableIncompatible(entry, false) // Enable incompatible enchants
        }
    }
}


function disableIncompatible(enchant, disable) {
    if (allowIncompatible) {
        return
    }
    // for each incompatible enchantment of the selected/unselected enchantment
    for (const incompatibleEnchant of data.enchants[enchant[0]].incompatible) {
        const enchantContainer = document.getElementById(incompatibleEnchant)
        // Disable enchantment
        if (enchantContainer && disable) {
            enchantContainer.className = 'unavailable';
        }
        // Enable enchantment
        else if (enchantContainer && !disable) {
            // Check if any of the chosen enchantments still disable it
            let trueDisable = false;
            for (const enchantment of chosenEnchants) {
                if (data.enchants[enchantment[0]].incompatible.includes(incompatibleEnchant)) {
                    trueDisable = true
                }
            }
            enchantContainer.className = trueDisable ? 'unavailable' : 'enchant';
        }
    }
}


function defineBrowserLanguage() {
    if (!localStorage.getItem("savedlanguage")) {
        // language isn't saved and has to be detected
        const browserLanguage = navigator.language || navigator.userLanguage;
        if (languages[browserLanguage]) {
            buildLanguage(browserLanguage);
        } else {
            buildLanguage('en');
        }
    } else {
        // language is saved, load from save
        buildLanguage(localStorage.getItem("savedlanguage"));
    }
}


async function buildLanguage(lang = 'en', update = false) {
    // Fetch the main language file
    if (!languageJson?.enchants || update) {
        const languageFile = await fetch(`languages/${lang}.json?${languages[lang][1]}`);
        languageJson = await languageFile.json();
        localStorage.setItem("savedlanguage", lang);
    }

    // Update items language
    const options = document.getElementById("items").getElementsByTagName("option");
    let i = 1;
    options[0].textContent = languageJson.choose_an_item_to_enchant;
    data.items.forEach(item_namespace => {
        options[i].textContent = languageJson.items[item_namespace];
        i++;
    });

    // Update settings language
    $('label[for="levels"]').html(languageJson['optimize_for'] + '<br>' + languageJson['radio_label_optimize_xp'])
    $('label[for="prior-work"]').html(languageJson['optimize_for'] + '<br>' + languageJson['radio_label_optimize_pwp'])
    $('label[for="incompatible"]').html(languageJson['checkbox_label_incompatible']);
    $('label[for="more-enchants"]').html(languageJson['checkbox_label_max_number'].replace(/0/g, '4'));

    // Update enchantments language
    for (const enchant of $('#enchants').children()) {
        const enchantText = enchant.querySelector(".enchant-text");

        // Assuming you have a languageJson object with corresponding properties
        const enchantName = enchantText.textContent.trim();
        enchantText.textContent = languageJson.enchants[enchantName];
    }

    // Update top text
    $('.title').text(languageJson['h1_title']);
    const text = document.getElementsByClassName('text-block')
    for (i = 0; i <= 2; i++) {
        text[i].innerHTML = languageJson[`paragraph_${i + 1}`]
    }
    const extraInfo = document.createElement('a');
    extraInfo.href = 'https://www.google.com'
    extraInfo.innerHTML = '<strong>Extra guidance for RLCraft</strong>'
    text[2].innerHTML += '<br>'
    text[2].append(extraInfo)
}


function getText(value, type = 'time') {
    // Plural
    let pluralSuffix;
    if (languageJson?.level_s) {
        pluralSuffix = value > 1 ? '_s' : '';
    } else {
        pluralSuffix = (value % 10 > 4 || value % 10 === 0) ? '_high' : (value % 10 > 1) ? '_low' : '';
    }
    // Unit type
    const unit = (type === 'time' && value > 2000) ? ['second', Math.round(value / 1000)] : [type === 'time' ? 'millisecond' : 'level', value];
    return unit[1] + languageJson[unit[0] + pluralSuffix]
}


function solution(solutionData) {
    // Display solution
    $('#spin').hide();
    $('#optimal_solution').show();
    // Optimal solution
    $('#optimal_solution').textContent = mode === 'levels' ? languageJson['optimal_solution_cumulative_levels'] : languageJson['optimal_solution_prior_work']

    // Time
    const time_text = getText(performance.now() - startTime);
    const levels_text = getText(solutionData.extra[0], 'level');
    $('#time').text(languageJson['completed_in'] + time_text);

    // Total Cost
    $('#cost-label').text(languageJson['total_cost']);
    let xp_range;
    if (solutionData.item_obj.x === solutionData.extra[1]) {
        xp_range = solutionData.item_obj.x;
    } else {
        xp_range = `${solutionData.item_obj.x}-${solutionData.extra[1]}`;
        $('.note').text(languageJson['note']).css('display', 'block');
    }
    $('#cost').html(`${levels_text} (${xp_range} ${languageJson['xp']})`)

    // Steps
    $('#steps-label').text(languageJson['steps'])
    $('#steps').html('')

    // Instructions
    for (let instruction of solutionData.instructions) {
        const newLine = document.createElement('li');

        // Get items' namespaces
        const left_item = findItemNamespace(instruction[0]);
        const right_item = findItemNamespace(instruction[1]);

        // Fetch items' enchantments
        let left_enchants = enchantLevels(instruction[0], solutionData)
        let right_enchants = enchantLevels(instruction[1], solutionData)

        // Add parentheses
        left_enchants = left_enchants.length > 0 ? `(${left_enchants})` : left_enchants;
        right_enchants = right_enchants.length > 0 ? `(${right_enchants})` : right_enchants;

        // Apply plural or singular version
        const level_string = getText(instruction[2], 'level');
        const work_string = getText(instruction[4], 'level');

        // Create icons
        const left_icon = '<img src="./images/' + left_item + '.gif" class="icon">';
        const right_icon = '<img src="./images/' + right_item + '.gif" class="icon">';

        const line1 = `${languageJson['combine']} ${left_icon} ${languageJson.items[left_item]} ${left_enchants} ${languageJson['with']} ${right_icon} ${languageJson.items[right_item]} ${right_enchants}`;
        const line2 = `${languageJson['cost']}${level_string} (${instruction[3]}${languageJson['xp']}), ${languageJson['prior_work_penalty']}${work_string}`;
        newLine.innerHTML = line1 + "<br><div><small>" + line2 + "</small></div>";
        steps.appendChild(newLine);
    }
}


function enchantLevels(instruction, solutionData) {
    const enchantLevels = []
    let level;
    let enchants;

    // Get enchantments of the item
    if (languageJson.enchants.hasOwnProperty(instruction.I)) {
        enchants = [instruction.I];
    } else {
        enchants = findEnchantments(instruction);
    }

    if (enchants.length < 1) {
        return [] // No enchantments
    }

    for (const enchant of enchants) {
        if (data.enchants[enchant].levelMax === '1') {
            enchantLevels.push([languageJson.enchants[enchant]])
        } else {
            level = solutionData.enchants.find(entry => entry[0] === enchant)[1]
            enchantLevels.push([languageJson.enchants[enchant] + ' ' + level])
        }
    }
    return enchantLevels.join(', ')
}


function findItemNamespace(item) {
    if (item.I) {
        return languageJson.enchants.hasOwnProperty(item.I) ? 'book' : item.I;
    } else if (item.L.I) {
        name = languageJson.enchants.hasOwnProperty(item.L.I) ? 'book' : item.L.I;
    } else {
        findItemNamespace(item.L)
    }
    return name
}


function findEnchantments(item) {
    let enchants = []
    let child_enchants;
    for (const key in item) {
        if (key === "L" || key === "R") {
            if (!item[key].I) {
                child_enchants = findEnchantments(item[key])
                child_enchants.forEach(enchant => {
                    enchants.push(enchant);
                })
            } else if (languageJson.enchants.hasOwnProperty(item[key].I)) {
                enchants.push(item[key].I)
            }
        }
    }
    return enchants;
}