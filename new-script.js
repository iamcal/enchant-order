const ENCHANTMENT_LIMIT_INCLUSIVE = 10;
const BRACKET_LANE_WIDTH = 12;
const BRACKET_LANE_PADDING = 8;
const BRACKET_COLORS = ["#e03131", "#f08c00", "#0ca678", "#7048e8", "#e64980", "#1971c2"];

// item grid on screen 1 is grouped into these sections, in this order;
// each item in data.items must appear in exactly one of them
const ITEM_CATEGORIES = [
    { label: "Armor", items: ["helmet", "chestplate", "leggings", "boots", "turtle_shell", "elytra"] },
    { label: "Weapons", items: ["sword", "axe", "mace", "spear", "trident", "bow", "crossbow"] },
    { label: "Other", items: ["pickaxe", "shovel", "hoe", "shield", "brush", "fishing_rod", "shears",
        "flint_and_steel", "carrot_on_a_stick", "warped_fungus_on_a_stick", "pumpkin", "book"] }
];

let worker;
let start_time;
let total_steps;
let total_tries;
let languageJson;
let languageId;
let enchants_list;
let resize_timer;

const languages = {
    'en'    : 'English',

    // in alphabetical order
    'de'    : 'Deutsch',
    'es-ES' : 'Español',
    'fr-FR' : 'Français',
    'it-IT' : 'Italiano',
    'id'    : 'Indonesia',
    'hu-HU' : 'Magyar',
    'nl'    : 'Nederlands',
    'pl-PL' : 'Polski',
    'pt-BR' : 'Português',
    'de-CH' : 'Schwiizerdütsch',
    'vi-VN' : 'Tiếng Việt',
    'tr-TR' : 'Türkçe',
    'be-BY' : 'Беларуская',
    'ru-RU' : 'Русский',
    'ua-UA' : 'Українська',
    'th-TH' : 'ภาษาไทย',
    'zh-CN' : '简体中文',
    'zh-TW' : '繁體中文',
    'ja-JP' : '日本語',
    'ko-KR' : '한국어',
    'ar'    : 'اَلْعَرَبِيَّةُ',
};

const languages_cache_key = 6;

const prefers_color_scheme = window.matchMedia("(prefers-color-scheme: dark)");
if (prefers_color_scheme.matches) {
    document.documentElement.dataset.theme = 'dark';
    localStorage.setItem("tswitch-theme", 'dark');
} else {
    document.documentElement.dataset.theme = 'light';
    localStorage.setItem("tswitch-theme", 'light');
}

window.onload = function() {

    worker = new Worker("work.js?6");
    worker.onmessage = function(event) {
        if (event.data.msg === "complete") {
            afterFoundOptimalSolution(event.data);
        }
    };
    worker.postMessage({
        msg: "set_data",
        data: data
    });

    buildEnchantmentSelection();
    buildCalculateButton();
    buildFilters();
    setupLanguage();

    window.addEventListener("resize", function() {
        clearTimeout(resize_timer);
        resize_timer = setTimeout(function() {
            // reposition only (never rebuild): rebuilding would wipe out
            // any enchantment levels the user already picked
            if (retrieveSelectedItem()) {
                repositionBrackets();
            } else {
                syncWizardHeight();
            }
        }, 150);
    });
};

function buildCalculateButton() {
    $("#calculate").click(function() {
        const enchantment_foundation = retrieveEnchantmentFoundation();
        if (enchantment_foundation.length === 0) return;

        goToResultsScreen();
        calculate();
    });
}

function buildFilters() {
    $("#allow_incompatible").change(allowIncompatibleChanged);
    $("#allow_many").change(allowManyChanged);
}

function sortNamespacesByLocalizedName(namespaces, dictionary) {
    let locale;
    try {
        locale = languageId;
    } catch (e) {
        locale = undefined;
    }
    return namespaces.slice().sort((a, b) => {
        const name_a = dictionary[a];
        const name_b = dictionary[b];
        try {
            return name_a.localeCompare(name_b, locale);
        } catch (e) {
            return name_a.localeCompare(name_b);
        }
    });
}

function buildItemGrid() {
    const $groups = $("#item-grid");
    const previously_selected = retrieveSelectedItem();

    $groups.empty();

    ITEM_CATEGORIES.forEach(category => {
        const $section = $("<div>", { class: "item-category" });
        $section.append($("<h3>", { class: "item-category-title" }).text(category.label));

        const $grid = $("<div>", { class: "item-grid" });
        const sorted_items = sortNamespacesByLocalizedName(category.items, languageJson.items);

        sorted_items.forEach(item_namespace => {
            const $card = $("<button>", { type: "button", class: "item-card", "data-item": item_namespace });
            $card.append($("<img>", { src: "./images/" + item_namespace + ".gif", class: "item-icon", alt: "" }));
            $card.append($("<span>", { class: "item-label" }).text(languageJson.items[item_namespace]));
            if (item_namespace === previously_selected) {
                $card.addClass("selected");
            }
            $card.appendTo($grid);
        });

        $section.append($grid);
        $groups.append($section);
    });

    if (previously_selected) {
        buildEnchantList(previously_selected);
        updateEnchantTitle(previously_selected);
    }

    syncWizardHeight();
}

function updateEnchantTitle(item_namespace) {
    $("#enchant-title-item").text(languageJson.items[item_namespace]);
    $("#enchant-title-icon").attr("src", "./images/" + item_namespace + ".gif");
}

const WIZARD_SCREEN_SELECTORS = {
    items: "#screen-items",
    enchants: "#screen-enchants",
    results: "#screen-results"
};

function syncWizardHeight() {
    // .wizard itself has no padding (each .wizard-screen carries its own,
    // see new-style.css), so its height is simply the active screen's
    // own outer height (padding + content, via box-sizing: border-box)
    const step = $("#wizard-track").attr("data-step") || "items";
    $("#wizard").css("height", $(WIZARD_SCREEN_SELECTORS[step]).outerHeight() + "px");
}

function clearResults() {
    $("#progress").hide();
    $("#solution").hide();
    $("#error").hide();
    $("#phone-warn").hide();
    $("#steps").empty();
    $("#steps-header").empty();
    $("#level-cost").text("");
    $("#timings").text("").hide();
}

function goToItemsScreen() {
    $("#wizard-track").attr("data-step", "items");
    syncWizardHeight();
}

function goToEnchantScreen() {
    // arriving here (whether from the item grid or back from results) always
    // clears any previous calculation, since it no longer matches whatever
    // the user is about to select
    clearResults();
    $("#wizard-track").attr("data-step", "enchants");
    syncWizardHeight();
}

function goToResultsScreen() {
    $("#wizard-track").attr("data-step", "results");
    syncWizardHeight();
}

function incompatibleGroupFromNamespace(enchantment_namespace) {
    const enchantments_metadata = data.enchants;

    const incompatible_namespaces_queue = [enchantment_namespace];
    const incompatible_namespaces = [];

    while (incompatible_namespaces_queue.length) {
        const incompatible_namespace = incompatible_namespaces_queue.shift();
        const incompatible_already_grouped = incompatible_namespaces.includes(incompatible_namespace);

        if (!incompatible_already_grouped) {
            incompatible_namespaces.push(incompatible_namespace);
            const enchantment_metadata = enchantments_metadata[incompatible_namespace];
            const new_incompatible_namespaces = enchantment_metadata.incompatible;

            new_incompatible_namespaces.forEach(new_incompatible_namespace => {
                const new_incompatible_already_grouped = incompatible_namespaces.includes(new_incompatible_namespace);
                const new_incompatible_in_queue = incompatible_namespaces_queue.includes(new_incompatible_namespace);
                const push_new_incompatible = !new_incompatible_already_grouped && !new_incompatible_in_queue;
                if (push_new_incompatible) {
                    incompatible_namespaces_queue.push(new_incompatible_namespace);
                }
            });
        }
    }

    incompatible_namespaces.sort();
    return incompatible_namespaces;
}

function getWikiSubdomainLanguage() {
    const wiki_supported_languages = ["de", "es", "fr", "it", "ja", "ko", "lzh", "nl", "pt", "ru", "th", "uk", "zh"];
    let wiki_language = "en";

    if (wiki_supported_languages.includes(languageId.slice(0, 2))) {
        wiki_language = languageId.slice(0, 2);
    }

    return wiki_language;
}

function buildEnchantList(item_namespace_chosen) {
    const enchantments_metadata = data.enchants;

    $("#enchant-list").empty();

    //
    // first, filter out which enchants apply to this item
    //

    const item_enchantment_namespaces = [];

    const enchantment_namespaces = Object.keys(enchantments_metadata);
    enchantment_namespaces.forEach(enchantment_namespace => {

        const enchantment_metadata = enchantments_metadata[enchantment_namespace];
        const item_namespaces = enchantment_metadata.items;

        let allow_enchantment = false;
        if (item_namespace_chosen === "book") {
            allow_enchantment = true;
        } else {
            item_namespaces.forEach(item_namespace => {
                if (item_namespace === item_namespace_chosen) {
                    allow_enchantment = true;
                }
            });
        }

        if (allow_enchantment) {
            item_enchantment_namespaces.push(enchantment_namespace);
        }
    });

    //
    // next, work out which enchants are mutually incompatible with each other
    // (used purely to draw the connecting brackets, not for the display order)
    //

    const enchantment_groups = [];
    const enchantments_grouped = [];

    function filterEnchantmentGroup(enchantment_namespace) {
        return item_enchantment_namespaces.includes(enchantment_namespace);
    }

    item_enchantment_namespaces.forEach(enchantment_namespace => {
        const namespace_already_grouped = enchantments_grouped.includes(enchantment_namespace);
        if (namespace_already_grouped) return;

        let enchantment_group = incompatibleGroupFromNamespace(enchantment_namespace);
        enchantment_group = enchantment_group.filter(filterEnchantmentGroup);

        enchantment_group.forEach(enchantment_namespace => {
            const enchantment_already_grouped = enchantments_grouped.includes(enchantment_namespace);
            if (!enchantment_already_grouped) {
                enchantments_grouped.push(enchantment_namespace);
            }
        });

        enchantment_groups.push(enchantment_group);
    });

    //
    // display order is alphabetical, by the enchantment's localized name
    //

    const sorted_namespaces = sortNamespacesByLocalizedName(item_enchantment_namespaces, languageJson.enchants);
    const namespace_index = {};
    sorted_namespaces.forEach((namespace, index) => { namespace_index[namespace] = index; });

    const wiki_language = getWikiSubdomainLanguage();

    sorted_namespaces.forEach((enchantment_namespace, index) => {
        const enchantment_metadata = enchantments_metadata[enchantment_namespace];
        const enchantment_max_level = enchantment_metadata.levelMax;
        const enchantment_name = languageJson.enchants[enchantment_namespace];

        const safe_namespace = encodeURIComponent(enchantment_name.replaceAll(" ", "_"));
        const enchantment_wiki_url = `https://${wiki_language}.minecraft.wiki/w/${safe_namespace}`;

        const $row = $("<div>", { class: "enchant-row" + (index % 2 ? " alt" : "") });
        $row.attr("data-ns", enchantment_namespace);
        const enchantment_cell_content = `<a class="wiki_url" href="${enchantment_wiki_url}" target="_blank" rel="noopener">${enchantment_name}</a>`;
        $row.append(enchantment_cell_content);

        const $levels = $("<div>", { class: "level-picker" });
        for (let enchantment_level = 1; enchantment_level <= enchantment_max_level; enchantment_level++) {
            const enchantment_button_data = {
                level: enchantment_level,
                enchant: enchantment_name
            };
            const enchantment_button = $("<button>", { type: "button" });
            enchantment_button.append(enchantment_level);
            enchantment_button.addClass("off");
            enchantment_button.addClass("level-button");
            enchantment_button.data(enchantment_button_data);
            $levels.append(enchantment_button);
        }
        $row.append($levels);

        $("#enchant-list").append($row);
    });

    //
    // work out how many "lanes" of brackets we need (incompatible groups can
    // overlap once sorted alphabetically, e.g. Bane of Arthropods..Smite
    // overlapping with Fortune..Silk Touch), then draw them
    //

    const bracket_groups = enchantment_groups
        .filter(group => group.length > 1)
        .map(group => {
            const indices = group.map(namespace => namespace_index[namespace]).sort((a, b) => a - b);
            return { indices: indices, start: indices[0], end: indices[indices.length - 1] };
        })
        .sort((a, b) => a.start - b.start);

    const lane_ends = [];
    bracket_groups.forEach(group => {
        let lane = lane_ends.findIndex(end => end < group.start);
        if (lane === -1) {
            lane = lane_ends.length;
        }
        lane_ends[lane] = group.end;
        group.lane = lane;
    });

    // cached so a viewport resize can reposition the brackets (rows may
    // reflow to a different height) without rebuilding the whole list,
    // which would otherwise wipe out the enchantment levels already chosen
    cached_bracket_groups = bracket_groups;
    cached_lane_count = lane_ends.length;

    // #screen-enchants is always laid out (it's only ever moved off-screen
    // via transform, never display:none), so row positions/heights below
    // are measurable right away, even while the items screen is showing
    renderIncompatibilityBrackets(cached_bracket_groups, cached_lane_count);

    syncWizardHeight();
    updateCalculateButtonState();
}

let cached_bracket_groups = [];
let cached_lane_count = 0;

function repositionBrackets() {
    renderIncompatibilityBrackets(cached_bracket_groups, cached_lane_count);
    syncWizardHeight();
}

function renderIncompatibilityBrackets(bracket_groups, lane_count) {
    const $gutter = $("#enchant-gutter").empty();
    const gutter_width = lane_count > 0 ? (lane_count * BRACKET_LANE_WIDTH + BRACKET_LANE_PADDING) : 0;

    $gutter.css("width", gutter_width + "px");
    $("#enchant-list").css("margin-left", gutter_width + "px");

    if (!bracket_groups.length) return;

    const $rows = $("#enchant-list > .enchant-row");

    bracket_groups.forEach((group, group_index) => {
        const lane_x = gutter_width - BRACKET_LANE_PADDING - (group.lane * BRACKET_LANE_WIDTH);
        const color = BRACKET_COLORS[group_index % BRACKET_COLORS.length];

        const member_centers = group.indices.map(index => {
            const $row = $rows.eq(index);
            return $row.position().top + ($row.outerHeight() / 2);
        });

        const top_y = Math.min.apply(null, member_centers);
        const bottom_y = Math.max.apply(null, member_centers);

        $("<div>", { class: "bracket-spine" }).css({
            left: lane_x + "px",
            top: top_y + "px",
            height: Math.max(bottom_y - top_y, 0) + "px",
            background: color
        }).appendTo($gutter);

        member_centers.forEach(center_y => {
            $("<div>", { class: "bracket-tick" }).css({
                left: lane_x + "px",
                top: (center_y - 1) + "px",
                width: (gutter_width - lane_x) + "px",
                background: color
            }).appendTo($gutter);
        });
    });
}

function doAllowIncompatibleEnchantments() {
    const allow_incompatible_checkbox = $("#allow_incompatible");
    return allow_incompatible_checkbox.is(":checked");
}

function doAllowManyEnchantments() {
    const allow_many_checkbox = $("#allow_many");
    return allow_many_checkbox.is(":checked");
}

function allowIncompatibleChanged() {
    const allow_incompatible = doAllowIncompatibleEnchantments();
    if (!allow_incompatible) {
        turnOffLevelButtons();
    }
}

function allowManyChanged() {
    const allow_many = doAllowManyEnchantments();
    if (!allow_many) {
        turnOffLevelButtons();
    }
}

function turnOffLevelButtons() {
    const enchantment_buttons = $(".level-button");
    turnOffButtons(enchantment_buttons);
}

function buildEnchantmentSelection() {
    $("#item-grid").on("click", ".item-card", function() {
        const $card = $(this);
        const item_namespace_selected = $card.data("item");

        $(".item-card").removeClass("selected");
        $card.addClass("selected");

        buildEnchantList(item_namespace_selected);
        updateEnchantTitle(item_namespace_selected);
        goToEnchantScreen();
    });

    $("#back-to-items").on("click", function() {
        goToItemsScreen();
    });

    $("#back-to-enchants").on("click", function() {
        goToEnchantScreen();
    });

    // expanding/collapsing "Advanced" changes #screen-enchants's height
    $("#advanced-details")[0].addEventListener("toggle", syncWizardHeight);

    $("#enchant-list").on("click", "button.level-button", function() {
        levelButtonClicked($(this));
    });
}

function displayTime(time_milliseconds) {
    let time_text;

    if (time_milliseconds < 1) {
        const time_microseconds = Math.round(time_milliseconds * 1000);
        time_text = Math.round(time_microseconds) + languageJson.microseconds;
    } else if (time_milliseconds < 1000) {
        const time_round = Math.round(time_milliseconds);
        time_text = pluralize(time_round, 'millisecond');
    } else {
        const time_seconds = Math.round(time_milliseconds / 1000);
        time_text = pluralize(time_seconds, 'second');
    }

    return time_text;
}

function displayLevelsText(levels) {
    let level_text;
    level_text = pluralize(levels, 'level');
    return level_text;
}

function pluralize(num, key_root) {

    if (languageJson.use_russian_plurals) {
      if ((num % 10 === 1) && (num < 10 || num > 15)) {
        return String(num) + languageJson[key_root];
      } else if ((num % 10 === 2 || num % 10 === 3 || num % 10 === 4) && (num < 10 || num > 15)) {
        return String(num) + languageJson[key_root + '_low'];
      } else {
        return String(num) + languageJson[key_root + '_high'];
      }
    }

    if (num === 1) {
      return String(num) + languageJson[key_root];
    } else {
      return String(num) + languageJson[key_root + '_s'];
    }
}

function displayXpText(xp, minimum_xp = -1) {
    let xp_text = "";
    if (minimum_xp >= 0) {
        xp_text += commaify(minimum_xp) + "-";
    }
    xp_text += commaify(xp) + languageJson.xp;
    return xp_text;
}

function commaify(n) {
    let out = "";
    let nstr = "" + n;
    while (nstr.length > 3) {
        out = "," + nstr.substr(nstr.length - 3) + out;
        nstr = nstr.substr(0, nstr.length - 3);
    }
    return nstr + out;
}

function displayLevelXpText(levels, xp, minimum_xp = -1) {
    const level_text = displayLevelsText(levels);
    const xp_text = displayXpText(xp, minimum_xp);
    return level_text + " (" + xp_text + ")";
}

function displayEnchantmentsText(enchants) {
    let count = enchants.length

    let text = "";
    if (count >= 1) text += "(";
    enchants.forEach((enchant, index) => {
        if (languageJson.enchants.hasOwnProperty(enchant)) {
            text += languageJson.enchants[enchant];
            if (data.enchants[enchant].levelMax > 1) {
                text += ' ' + enchants_list.find(([entry]) => entry === enchant)[1]
            }

            if (index !== count - 1) text += ", ";
        }

    });
    if (count >= 1) text += ")";

    return text;
}

function displayItemText(item_obj) {

    let item_namespace;
    let enchantments_obj = [];
    if (languageJson.enchants.hasOwnProperty(item_obj.I)) {
        enchantments_obj.push(item_obj.I)
        item_namespace = 'book'
    } else if (typeof(item_obj.I) === 'string') {
        item_namespace = item_obj.I
    } else {
        item_namespace = languageJson.enchants.hasOwnProperty(item_obj.L.I) ? 'book' : item_obj.L.I;
        enchants = findEnchantments(item_obj)
        enchantments_obj = enchants
    }
    if (typeof(item_namespace) === 'undefined') {
        item_namespace = findItemNamespace(item_obj.L)
    }
    const icon_text = '<img src="./images/' + item_namespace + '.gif" class="icon">';
    const items_metadata = languageJson.items;
    const item_name = items_metadata[item_namespace];
    const enchantments_text = displayEnchantmentsText(enchantments_obj);

    return icon_text + " " + item_name + " " + enchantments_text;
}

function findItemNamespace(item) {
    if (item.L.I) {
        name = languageJson.enchants.hasOwnProperty(item.L.I) ? 'book' : item.L.I;
    }
    else {
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
            } else {
                enchants.push(item[key].I)
            }
        }
    }
    return enchants;
}

function updateTime(time_milliseconds) {
    const timing_text = languageJson.completed_in + displayTime(time_milliseconds);
    $("#timings").text(timing_text);
    $("#timings").show();
}


function updateCumulativeCost(cumulative_levels, cumulative_xp, minimum_xp = -1) {
    const cost_text = displayLevelXpText(cumulative_levels, cumulative_xp, minimum_xp);
    const cost_header = $("#level-cost");
    cost_header.text(cost_text);
}

function addInstructionDisplay(instruction, step_index) {
    const left_item_obj = instruction[0];
    const right_item_obj = instruction[1];
    const levels = instruction[2];
    const xp = instruction[3];
    const work = instruction[4];

    const left_item_text = displayItemText(left_item_obj);
    const right_item_text = displayItemText(right_item_obj);
    const cost_text = languageJson.cost + displayLevelXpText(levels, xp);
    const prior_work_text = languageJson.prior_work_penalty + displayLevelsText(work);

    const $step = $("<li>", { class: "step-card" });
    $step.append($("<span>", { class: "step-number" }).text(step_index));
    $step.append(`
        <div class="step-body">
            <div class="step-combine">
                <span class="step-item">${left_item_text}</span>
                <span class="step-plus">+</span>
                <span class="step-item">${right_item_text}</span>
            </div>
            <div class="step-meta">
                <span class="meta-pill">${cost_text}</span>
                <span class="meta-pill meta-pill-secondary">${prior_work_text}</span>
            </div>
        </div>
    `);

    $("#steps").append($step);
}


function afterFoundOptimalSolution(msg) {
    $("#progress").hide();
    $("#phone-warn").hide();
    const instructions = msg.instructions;
    const instructions_count = instructions.length;
    enchants_list = msg.enchants

    const current_time = performance.now();
    const elapsed_time_milliseconds = current_time - start_time;
    updateTime(elapsed_time_milliseconds);

    const solution_section = $("#solution");
    const solution_header = $("#solution-header");
    const solution_steps = $("#steps");
    const steps_header = $("#steps-header");

    solution_steps.html("");
    solution_section.show();

    let minimum_xp;
    if (instructions_count === 0) {
        solution_header.html(languageJson.no_solution_found);
        steps_header.html("");
        updateCumulativeCost(0, 0);
    } else {
        steps_header.html(languageJson.steps);

        const item = msg.item_obj;
        const cumulative_levels = msg.extra[0];
        minimum_xp = item.x;
        const maximum_xp = msg.extra[1]; // UNUSED
        updateCumulativeCost(cumulative_levels, maximum_xp, minimum_xp);

        instructions.forEach((instruction, index) => {
            addInstructionDisplay(instruction, index + 1);
        });

        if (minimum_xp && minimum_xp !== maximum_xp) {
            $("#xp-range-note").show();
        } else {
            $("#xp-range-note").hide();
        }
    }

    // the results screen was sized for the "Calculating..." spinner;
    // now that the (usually much taller) solution/no-solution content
    // replaced it, the wizard box needs to grow to fit
    syncWizardHeight();
}

function enchantmentNamespaceFromStylized(enchantment_name) {
    const enchantments_metadata = data.enchants;
    const enchantment_namespaces = Object.keys(enchantments_metadata);

    let namespace_match = "";
    enchantment_namespaces.forEach(enchantment_namespace => {
        const enchantment_name_check = languageJson.enchants[enchantment_namespace];
        if (enchantment_name_check === enchantment_name) namespace_match = enchantment_namespace;
    });

    return namespace_match;
}

function buttonMatchesName(button, enchantment_name) {
    const button_name = button.data("enchant");
    return button_name === enchantment_name;
}

function buttonMatchesLevel(button, enchantment_level) {
    const button_level = button.data("level");
    return button_level === enchantment_level;
}

function filterButton(button, enchantment_name, enchantment_level = -1) {
    const button_matches_name = buttonMatchesName(button, enchantment_name);
    const button_matches_level = buttonMatchesLevel(button, enchantment_level);
    return button_matches_name && !button_matches_level;
}

function turnOffButtons(buttons) {
    buttons.addClass("off");
    buttons.removeClass("on");
    updateCalculateButtonState();
}

function turnOnButtons(buttons) {
    buttons.addClass("on");
    buttons.removeClass("off");
}

function filterEnchantmentButtons(incompatible_namespaces) {
    const enchantment_buttons = $("#enchant-list button");

    incompatible_namespaces.forEach(incompatible_namespace => {
        const incompatible_name = languageJson.enchants[incompatible_namespace];

        const matching_buttons = enchantment_buttons.filter(function () {
            const this_button = $(this);
            return filterButton(this_button, incompatible_name);
        });
        turnOffButtons(matching_buttons);
    });
}

function updateLevelButtonForOnState(level_button) {
    const button_data = level_button.data();
    const enchantments_metadata = data.enchants;
    const enchantment_buttons = $("#enchant-list button");

    turnOnButtons(level_button);

    const enchantment_name = button_data.enchant;
    const enchantment_level = button_data.level;

    const matching_buttons = enchantment_buttons.filter(function () {
        const this_button = $(this);
        return filterButton(this_button, enchantment_name, enchantment_level);
    });
    turnOffButtons(matching_buttons);

    const allow_incompatible = doAllowIncompatibleEnchantments();
    if (!allow_incompatible) {
        const enchantment_namespace = enchantmentNamespaceFromStylized(enchantment_name);
        const enchantment_metadata = enchantments_metadata[enchantment_namespace];
        const incompatible_namespaces = enchantment_metadata.incompatible;
        filterEnchantmentButtons(incompatible_namespaces);
    }
}

function isTooManyEnchantments(enchantment_count) {
    const allow_many = doAllowManyEnchantments();
    const many_selected = enchantment_count > ENCHANTMENT_LIMIT_INCLUSIVE;
    return !allow_many && many_selected;
}

function levelButtonClicked(button_clicked) {
    const button_is_on = button_clicked.hasClass("on");

    if (button_is_on) {
        turnOffButtons(button_clicked);
    } else {
        const enchantment_foundation = retrieveEnchantmentFoundation();
        const enchantment_count = enchantment_foundation.length;
        const is_too_many = isTooManyEnchantments(enchantment_count + 1);

        if (is_too_many) {
            let alert_text = "";
            alert_text += languageJson.too_many_enchantments;
            alert_text += languageJson.more_than + ENCHANTMENT_LIMIT_INCLUSIVE + languageJson.enchantments_are_not_recommended;
            alert_text += languageJson.please_select_enchantments;
            alert(alert_text);
        } else {
            updateLevelButtonForOnState(button_clicked);
        }
    }
}

function retrieveEnchantmentFoundation() {
    const enchantment_foundation = [];
    const buttons_on = $("#enchant-list button.on");

    buttons_on.each(function(button_index, button) {
        const enchantment_name = $(button).data("enchant");
        const enchantment_level = $(button).data("level");
        const enchantment_namespace = enchantmentNamespaceFromStylized(enchantment_name);
        enchantment_foundation.push([enchantment_namespace, enchantment_level]);
    });

    return enchantment_foundation;
}

function retrieveCheapnessMode() {
    return $("#cheapness-mode").val();
}

function retrieveSelectedItem() {
    return $(".item-card.selected").data("item") || "";
}

function updateCalculateButtonState() {
    const enchantment_foundation = retrieveEnchantmentFoundation();
    if (enchantment_foundation.length === 0) {
        $("#calculate").attr("disabled", true);
    } else {
        $("#calculate").attr("disabled", false);
    }
}

function calculate() {
    const enchantment_foundation = retrieveEnchantmentFoundation();
    const no_enchantments_selected = enchantment_foundation.length === 0;
    if (no_enchantments_selected) return;

    const cheapness_mode = retrieveCheapnessMode();
    const item_namespace = retrieveSelectedItem();

    startCalculating(item_namespace, enchantment_foundation, cheapness_mode);
}

function solutionHeaderTextFromMode(mode) {
    let solution_header_text;
    if (mode === "levels") {
        solution_header_text = languageJson.optimal_solution_cumulative_levels;
    } else if (mode === "prior_work") {
        solution_header_text = languageJson.optimal_solution_prior_work;
    }
    return solution_header_text;
}

function updateSolutionHeader(mode) {
    const solution_header_text = solutionHeaderTextFromMode(mode);
    const solution_header = $("#solution-header");
    solution_header.text(solution_header_text);
}

function startCalculating(item_namespace, enchantment_foundation, mode) {
    if (enchantment_foundation.length >= 6) {
        if (
            navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i)
        ) {
            $("#phone-warn").show();
        }
    }

    total_steps = enchantment_foundation.length;
    total_tries = 0;
    start_time = performance.now();

    $("#solution").hide();
    $("#error").hide();
    updateSolutionHeader(mode);

    worker.postMessage({
        msg: "process",
        item: item_namespace,
        enchants: enchantment_foundation,
        mode: mode
    });
    $("#progress .lbl").text(languageJson.calculating_solution);
    $("#progress").show();

    syncWizardHeight();
}

function languageChangeListener(){
    const selectLanguage = document.getElementById('language');
    selectLanguage.addEventListener('change', function() {
        const selectedValue = selectLanguage.value;
        changePageLanguage(selectedValue);
    });
}

async function setupLanguage(){
    for (const i in languages){
        $("<option/>", {'value': i}).text(languages[i]).appendTo('#language');
    }
    defineBrowserLanguage();
    languageChangeListener();
}

function defineBrowserLanguage(){
    if (!localStorage.getItem("savedlanguage")) {
        // language isn't saved and has to be detected
        const browserLanguage = navigator.language || navigator.userLanguage;
        if (languages[browserLanguage]){
            changePageLanguage(browserLanguage);
        } else {
            changePageLanguage('en');
        }
    } else {
        // language is saved, load from save
        changePageLanguage(localStorage.getItem("savedlanguage"));
    }
}

async function changePageLanguage(language){
    if (!languages[language]){
        console.error("Trying to switch to unknown language:", language);
        return;
    }

    languageId = language;
    if (language == 'en'){
      languageJson = await loadJsonLanguage(language).then(languageData => { return languageData});
    }else{
      var languageJsonEn = await loadJsonLanguage('en').then(languageData => { return languageData});
      languageJson = await loadJsonLanguage(language).then(languageData => { return languageData});
      languageJson = mergeKeys(languageJson, languageJsonEn);
    }
    if (languageJson){
        changeLanguageByJson(languageJson);
        localStorage.setItem("savedlanguage", language);
        // ^ Save language choice to localstorage
    }
}

function mergeKeys(a, b){
  var o = {};
  for (var i in b){
    if (typeof b[i] === 'object'){
      o[i] = mergeKeys(a.hasOwnProperty(i) ? a[i] : {}, b[i]);
    }else{
      if (a.hasOwnProperty(i)){
        o[i] = a[i]
      }else{
        o[i] = b[i];
      }
    }
  }
  return o;
}

function loadJsonLanguage(language) {
    return fetch('languages/'+language+'.json?'+languages_cache_key)
      .then(response => {
        if (!response.ok) {
          throw new Error('Can\'t load language file');
        }
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error('Language file error:', error);
        return null;
      });
}


function changeLanguageByJson(languageJson){
    /* check for duplicate names */
    const map = {};
    for (let i in languageJson.enchants){
        if (map[languageJson.enchants[i]]){
            console.error("Duplicate string for enchant names (must be unique)", languageId, i, map[languageJson.enchants[i]]);
        }
        map[languageJson.enchants[i]] = i;
    }

    document.getElementById('main-title').textContent = languageJson.h1_title;

    /* summaries */
    document.getElementById('about-enchant-summary').innerHTML = languageJson.summary_1;
    document.getElementById('about-tool-summary').innerHTML = languageJson.summary_2;

    /* paragraphs */
    document.getElementById('paragraph-1').innerHTML = languageJson.paragraph_1;
    document.getElementById('paragraph-2').innerHTML = languageJson.paragraph_2;
    document.getElementById('paragraph-3').innerHTML = languageJson.paragraph_3;

    /* item picker */
    document.getElementById("step1-label").textContent = languageJson.choose_an_item_to_enchant;
    buildItemGrid();

    /* other UI */
    document.getElementById("override-incompatible").textContent = languageJson.checkbox_label_incompatible;
    document.getElementById("override-max-number").textContent = languageJson.checkbox_label_max_number;

    document.getElementById("calculate").textContent = languageJson.calculate;

    document.getElementById("optimize-label").textContent = languageJson.optimize_for;
    document.getElementById("optimize-xp").textContent = languageJson.radio_label_optimize_xp;
    document.getElementById("optimize-pwp").textContent = languageJson.radio_label_optimize_pwp;

    document.getElementById("total-cost-label").textContent = languageJson.total_cost;

    document.getElementById("xp-range-note").textContent = languageJson.note;

    $("#solution").hide();
    $("#error").hide();
}
