const ENCHANTMENT_LIMIT_INCLUSIVE = 10;

var worker;
var start_time;
var total_steps;
var total_tries;
var languageJson;


window.onload = function() {
    
    worker = new Worker("work.js?5");
    worker.onmessage = function(event) {
        if (event.data.msg == "complete") {
            afterFoundOptimalSolution(event.data);
        }
    };
    worker.postMessage({
        msg: "set_data",
        data: data
    });

    
    buildItemSelection();
    buildEnchantmentSelection();
    buildCalculateButton();
    buildFilters();
    setupLanguage();
};

function buildCalculateButton() {
    $("#calculate").click(calculate);
}

function buildFilters() {
    $("#allow_incompatible").change(allowIncompatibleChanged);
    $("#allow_many").change(allowManyChanged);
}

function buildItemSelection() {
    //convert json into map
    const item_namespace2style = data.items;
    const item_namespaces = Object.keys(item_namespace2style);
    
    item_namespaces.forEach(item_namespace => {
        const item_name = item_namespace2style[item_namespace];
        const item_listbox_metadata = { value: item_namespace };
        const item_listbox = $("<option/>", item_listbox_metadata);
        item_listbox.text(item_name).appendTo("select#item");
    });
}

function incompatibleGroupFromNamespace(enchantment_namespace) {
    const enchantments_metadata = data.enchants;
    
    var incompatible_namespaces_queue = [enchantment_namespace];
    var incompatible_namespaces = [];

    while (incompatible_namespaces_queue.length) {
        const incompatible_namespace = incompatible_namespaces_queue.shift();
        const incompatible_already_grouped = incompatible_namespaces.includes(incompatible_namespace);

        if (!incompatible_already_grouped) {
            incompatible_namespaces.push(incompatible_namespace);            
            const enchantment_metadata = enchantments_metadata[incompatible_namespace];
            var new_incompatible_namespaces = enchantment_metadata.incompatible; 

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

function buildEnchantList(item_namespace_chosen) {
    const enchantments_metadata = data.enchants;

    $("#enchants table").html("");

    //
    // first, filter out which enchants apply to this item
    //

    var item_enchantment_namespaces = [];
    var enchantment_level_maxmax = 0;

    const enchantment_namespaces = Object.keys(enchantments_metadata);
    enchantment_namespaces.forEach(enchantment_namespace => {

        const enchantment_metadata = enchantments_metadata[enchantment_namespace];
        const item_namespaces = enchantment_metadata.items;

        var allow_enchantment = false;
        if (item_namespace_chosen == "book") {
            allow_enchantment = true;
        } else {
            item_namespaces.forEach(item_namespace => {
                if (item_namespace == item_namespace_chosen) {
                    allow_enchantment = true;
                }
            });
        }

        if (allow_enchantment) {
            const enchantment_max_level = enchantment_metadata.levelMax;
            enchantment_level_maxmax = Math.max(enchantment_level_maxmax, enchantment_max_level);
            item_enchantment_namespaces.push(enchantment_namespace);
        }
    });

    //
    // next, group them by incompatible enchants
    //

    var enchantment_groups = [];
    var enchantments_grouped = [];

    function filterEnchantmentGroup(enchantment_namespace) {
        const is_valid_enchantment = item_enchantment_namespaces.includes(enchantment_namespace);
        return is_valid_enchantment;
    }

    item_enchantment_namespaces.forEach(enchantment_namespace => {
        const namespace_already_grouped = enchantments_grouped.includes(enchantment_namespace);
        if (namespace_already_grouped) return;

        var enchantment_group = incompatibleGroupFromNamespace(enchantment_namespace);
        enchantment_group = enchantment_group.filter(filterEnchantmentGroup);

        enchantment_group.forEach(enchantment_namespace => {
            const enchantment_already_grouped = enchantments_grouped.includes(enchantment_namespace);
            if (!enchantment_already_grouped) {
                enchantments_grouped.push(enchantment_namespace);
            }
        });

        enchantment_groups.push(enchantment_group);
    });

    var group_toggle_color = true;

    enchantment_groups.forEach(enchantment_group => {
        enchantment_group.forEach(enchantment_namespace => {
            const enchantment_metadata = enchantments_metadata[enchantment_namespace];
            const enchantment_max_level = enchantment_metadata.levelMax;
            const enchantment_name = enchantment_metadata["stylized"];
            

            var enchantment_row = $("<tr>");
            enchantment_row.addClass(group_toggle_color ? "group1" : "group2");            
            enchantment_row.append($("<td>").append(languageJson.enchants[enchantment_namespace].stylized));
            for (let enchantment_level = 1; enchantment_level <= enchantment_level_maxmax; enchantment_level++) {
                if (enchantment_max_level >= enchantment_level) {
                    const enchantment_button_data = {
                        level: enchantment_level,
                        enchant: enchantment_name
                    };
                    var enchantment_button = $("<button>");
                    enchantment_button.append(enchantment_level);
                    enchantment_button.addClass("off");
                    enchantment_button.addClass("level-button");
                    enchantment_button.data(enchantment_button_data);

                    const enchantment_row_append = $("<td>").append(enchantment_button);
                    enchantment_row.append(enchantment_row_append);
                } else {
                    enchantment_row.append($("<td>"));
                }
            }

            $("#enchants table").append(enchantment_row);
        });

        group_toggle_color = !group_toggle_color;
    });

    $("#enchants").show();
    updateCalculateButtonState();
}

function doAllowIncompatibleEnchantments() {
    const allow_incompatible_checkbox = $("#allow_incompatible");
    const allow_incompatible = allow_incompatible_checkbox.is(":checked");
    return allow_incompatible;
}

function doAllowManyEnchantments() {
    const allow_many_checkbox = $("#allow_many");
    const allow_many = allow_many_checkbox.is(":checked");
    return allow_many;
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
    $("select#item").change(function() {
        var item_namespace_selected = $("select#item option:selected").val();
        if (item_namespace_selected) {
            buildEnchantList(item_namespace_selected);
            $("#overrides").show();
        } else {
            $("#enchants").hide();
            $("#overrides").hide();
        }
    });

    $("#enchants table").on("click", "button", function() {
        levelButtonClicked($(this));
    });
}

function displayTime(time_milliseconds) {
    var time_text;

    if (time_milliseconds < 1) {
        const time_microseconds = Math.round(time_milliseconds * 1000);
        time_text = Math.round(time_microseconds) + " microseconds";
    } else if (time_milliseconds < 1000) {
        const time_round = Math.round(time_milliseconds);
        time_text = time_round + languageJson.millisecond;
        if (time_round != 1) time_text += "s";
    } else {
        const time_seconds = Math.round(time_milliseconds / 1000);
        time_text = time_seconds + languageJson.second;
        if (time_seconds != 1) time_text += "s";
    }

    return time_text;
}

function displayLevelsText(levels) {
    var level_text = levels + languageJson.level;
    if (levels != 1) {
        level_text += "s";
    }
    return level_text;
}

function displayXpText(xp, minimum_xp = -1) {
    var xp_text = "";
    if (minimum_xp >= 0) {
        xp_text += commaify(minimum_xp) + "-";
    }
    xp_text += commaify(xp) + " xp";
    return xp_text;
}

function commaify(n) {
    var out = "";
    var nstr = "" + n;
    while (nstr.length > 3) {
        out = "," + nstr.substr(nstr.length - 3) + out;
        nstr = nstr.substr(0, nstr.length - 3);
    }
    return nstr + out;
}

function displayLevelXpText(levels, xp, minimum_xp = -1) {
    const level_text = displayLevelsText(levels);
    const xp_text = displayXpText(xp, minimum_xp);
    const cost_text = level_text + " (" + xp_text + ")";
    return cost_text;
}

function displayInstructionText(instruction) {
    const left_item_obj = instruction[0];
    const right_item_obj = instruction[1];
    const levels = instruction[2];
    const xp = instruction[3];
    const prior_work = instruction[4];

    const left_item_text = displayItemText(left_item_obj);
    const right_item_text = displayItemText(right_item_obj);
    const prior_work_penalty = 2 ** prior_work - 1;

    const instruction_text = languageJson.combine + " <i>" + left_item_text + "</i> " + languageJson.with + " <i>" + right_item_text + "</i>";
    const cost_text = languageJson.cost + displayLevelXpText(levels, xp);
    const prior_work_text = languageJson.prior_work_penalty + displayLevelsText(prior_work_penalty);

    const display_text = instruction_text + "<br><small>" + cost_text + ", " + prior_work_text + "</small>";
    return display_text;
}

function displayEnchantmentText(enchantment_obj) {
    const enchantment_namespace = enchantment_obj.namespace;
    const enchantment_metadata = languageJson.enchants[enchantment_namespace];
    const enchantment_name = enchantment_metadata["stylized"];
    const enchantment_max_level = enchantment_metadata.levelMax;

    var text = enchantment_name;
    if (enchantment_max_level >= 2) {
        const enchantment_level = enchantment_obj.level;
        text += " " + enchantment_level;
    }
    return text;
}

function displayEnchantmentsText(enchantments_obj) {
    const enchantment_objs = enchantments_obj.enchantment_objs;
    const enchantment_count = enchantment_objs.length;

    var text = "";
    if (enchantment_count >= 1) text += "(";
    enchantment_objs.forEach((enchantment_obj, enchantment_index) => {
        const enchantment_text = displayEnchantmentText(enchantment_obj);
        text += enchantment_text;
        if (enchantment_index != enchantment_count - 1) text += ", ";
    });
    if (enchantment_count >= 1) text += ")";

    return text;
}

function displayItemText(item_obj) {
    const item_namespace = item_obj.item_namespace;
    const icon_text = '<img src="./images/' + item_namespace + '.gif" class="icon">';
    const items_metadata = languageJson.items;
    const item_name = items_metadata[item_namespace];

    const enchantments_obj = item_obj.enchantments_obj;
    const enchantments_text = displayEnchantmentsText(enchantments_obj);

    const display_name = icon_text + " " + item_name + " " + enchantments_text;
    return display_name;
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

function addInstructionDisplay(instruction) {
    const display_text = displayInstructionText(instruction);
    var solution_steps = $("#steps");
    solution_steps.append($("<li>").html(display_text));
}

function afterFoundOptimalSolution(msg) {
    $("#progress").hide();
    $("#phone-warn").hide();

    const instructions = msg.instructions;
    const instructions_count = instructions.length;

    const current_time = performance.now();
    const elapsed_time_milliseconds = current_time - start_time;
    updateTime(elapsed_time_milliseconds);

    var solution_section = $("#solution");
    var solution_header = $("#solution-header");
    var solution_steps = $("#steps");
    var steps_header = $("#solution h3");

    solution_steps.html("");
    solution_section.show();

    if (instructions_count === 0) {
        solution_header.html(languageJson.no_solution_found);
        steps_header.html("");
        updateCumulativeCost(0, 0);
    } else {
        steps_header.html(languageJson.steps);

        const final_item_obj = msg.item_obj;
        const cumulative_levels = final_item_obj.cumulative_levels;
        const minimum_xp = final_item_obj.cumulative_minimum_xp;
        const maximum_xp = final_item_obj.maximum_xp;
        updateCumulativeCost(cumulative_levels, maximum_xp, minimum_xp);

        instructions.forEach(instruction => {
            addInstructionDisplay(instruction);
        });

        if (minimum_xp && minimum_xp != maximum_xp) {
            $("#xp-range-note").show();
        } else {
            $("#xp-range-note").hide();
        }
    }
}

function enchantmentNamespaceFromStylized(enchantment_name) {
    const enchantments_metadata = data.enchants;
    const enchantment_namespaces = Object.keys(enchantments_metadata);

    var namespace_match = "";
    enchantment_namespaces.forEach(enchantment_namespace => {
        const enchantment_metadata = enchantments_metadata[enchantment_namespace];
        const enchantment_name_check = enchantment_metadata["stylized"];
        if (enchantment_name_check == enchantment_name) namespace_match = enchantment_namespace;
    });

    return namespace_match;
}

function buttonMatchesName(button, enchantment_name) {
    const button_name = button.data("enchant");
    const button_matches_name = button_name == enchantment_name;
    return button_matches_name;
}

function buttonMatchesLevel(button, enchantment_level) {
    const button_level = button.data("level");
    const button_matches_level = button_level == enchantment_level;
    return button_matches_level;
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
    const enchantments_metadata = data.enchants;
    const enchantment_buttons = $("#enchants button");

    incompatible_namespaces.forEach(incompatible_namespace => {
        const incompatible_metadata = enchantments_metadata[incompatible_namespace];
        const incompatible_name = incompatible_metadata["stylized"];

        var matching_buttons = enchantment_buttons.filter(function() {
            const this_button = $(this);
            const button_matches_name = filterButton(this_button, incompatible_name);
            return button_matches_name;
        });
        turnOffButtons(matching_buttons);
    });
}

function updateLevelButtonForOnState(level_button) {
    const button_data = level_button.data();
    const enchantments_metadata = data.enchants;
    const enchantment_buttons = $("#enchants button");

    turnOnButtons(level_button);

    const enchantment_name = button_data.enchant;
    const enchantment_level = button_data.level;

    var matching_buttons = enchantment_buttons.filter(function() {
        const this_button = $(this);
        return filterButton(this_button, enchantment_name, enchantment_level);
    });
    turnOffButtons(matching_buttons);

    const allow_incompatible = doAllowIncompatibleEnchantments();
    if (!allow_incompatible) {
        const enchantment_namespace = enchantmentNamespaceFromStylized(enchantment_name);
        const enchantment_metadata = enchantments_metadata[enchantment_namespace];
        var incompatible_namespaces = enchantment_metadata.incompatible;       
        filterEnchantmentButtons(incompatible_namespaces);
    }
}

function isTooManyEnchantments(enchantment_count) {
    const allow_many = doAllowManyEnchantments();
    const many_selected = enchantment_count > ENCHANTMENT_LIMIT_INCLUSIVE;
    const is_too_many = !allow_many && many_selected;
    return is_too_many;
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
            var alert_text = "";
            alert_text += languageJson.too_many_enchantments;
            alert_text += languageJson.more_than + ENCHANTMENT_LIMIT_INCLUSIVE + languageJson.enchantments_are_not_recomended;
            alert_text += languageJson.plese_select_enchantments;
            alert(alert_text);
        } else {
            updateLevelButtonForOnState(button_clicked);
        }
    }
}

function retrieveEnchantmentFoundation() {
    var enchantment_foundation = [];
    const buttons_on = $("#enchants button.on");

    buttons_on.each(function(button_index, button) {
        const enchantment_name = $(button).data("enchant");
        const enchantment_level = $(button).data("level");
        const enchantment_namespace = enchantmentNamespaceFromStylized(enchantment_name);
        enchantment_foundation.push([enchantment_namespace, enchantment_level]);
    });

    return enchantment_foundation;
}

function retrieveCheapnessMode() {
    const selected_mode = $('input[name="cheapness-mode"]:checked').val();
    return selected_mode;
}

function retrieveSelectedItem() {
    const item_namespace = $("select#item option:selected").val();
    return item_namespace;
}

function updateCalculateButtonState() {
    const enchantment_foundation = retrieveEnchantmentFoundation();
    if (enchantment_foundation.length == 0) {
        $("#calculate").attr("disabled", true);
    } else {
        $("#calculate").attr("disabled", false);
    }
}

function calculate() {
    const enchantment_foundation = retrieveEnchantmentFoundation();
    const no_enchantments_selected = enchantment_foundation.length == 0;
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
}

function languageChangeListener(){
    const selectLanguage = document.getElementById('language');    
    selectLanguage.addEventListener('change', function() {
        const selectedValue = selectLanguage.value;
        changePageLanguage(selectedValue);
    });
}

async function setupLanguage(){    
    defineBrowserLanguage();
    languageChangeListener();
}

function defineBrowserLanguage(){
    const browserLanguage = navigator.language || navigator.userLanguage;    
    changePageLanguage(browserLanguage);
}

async function changePageLanguage(language){
    languageJson = await loadJsonLanguage(language).then(languageData => { return languageData});
    chageLanguageByJson(languageJson);
}

function loadJsonLanguage(language) {
    return fetch('languages/'+language+'.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Can\' load file');
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


function chageLanguageByJson(languageJson){
    const h1Element = document.getElementsByTagName('h1')[0];
    h1Element.textContent = languageJson.h1_title;

    /* paragraphs */
    const paragraphs = document.getElementsByTagName('p');
    paragraphs[1].innerHTML = languageJson.paragraph_1;

    paragraphs[2].innerHTML = languageJson.paragraph_2;
    
    paragraphs[3].innerHTML = languageJson.paragraph_3;


    /* selection */
    const selectItem = document.getElementById("item");
    selectItem.getElementsByTagName("option")[0].textContent = languageJson.choose_an_item_to_enchant;
    selectItem.getElementsByTagName("option")[1].textContent = languageJson.items.helmet;
    selectItem.getElementsByTagName("option")[2].textContent = languageJson.items.chestplate;
    selectItem.getElementsByTagName("option")[3].textContent = languageJson.items.leggings;
    selectItem.getElementsByTagName("option")[4].textContent = languageJson.items.boots;
    selectItem.getElementsByTagName("option")[5].textContent = languageJson.items.turtle_shell;
    selectItem.getElementsByTagName("option")[6].textContent = languageJson.items.elytra;
    selectItem.getElementsByTagName("option")[7].textContent = languageJson.items.sword;
    selectItem.getElementsByTagName("option")[8].textContent = languageJson.items.axe;
    selectItem.getElementsByTagName("option")[9].textContent = languageJson.items.trident;
    selectItem.getElementsByTagName("option")[10].textContent = languageJson.items.pickaxe;
    selectItem.getElementsByTagName("option")[11].textContent = languageJson.items.shovel;
    selectItem.getElementsByTagName("option")[12].textContent = languageJson.items.hoe;
    selectItem.getElementsByTagName("option")[13].textContent = languageJson.items.bow;
    selectItem.getElementsByTagName("option")[14].textContent = languageJson.items.shield;
    selectItem.getElementsByTagName("option")[15].textContent = languageJson.items.crossbow;
    selectItem.getElementsByTagName("option")[16].textContent = languageJson.items.brush;
    selectItem.getElementsByTagName("option")[17].textContent = languageJson.items.fishing_rod;
    selectItem.getElementsByTagName("option")[18].textContent = languageJson.items.shears;
    selectItem.getElementsByTagName("option")[19].textContent = languageJson.items.flint_and_steel;
    selectItem.getElementsByTagName("option")[20].textContent = languageJson.items.carrot_on_a_stick;
    selectItem.getElementsByTagName("option")[21].textContent = languageJson.items.warped_fungus_on_a_stick;
    selectItem.getElementsByTagName("option")[22].textContent = languageJson.items.pumpkin;
    selectItem.getElementsByTagName("option")[23].textContent = languageJson.items.book;


    const checkboxDiv = document.getElementById("overrides");
    const labelsCheckBox = checkboxDiv.getElementsByTagName('label');
    labelsCheckBox[0].innerHTML = languageJson.checkbox_label_0;
    labelsCheckBox[1].innerHTML = languageJson.checkbox_label_1;
    
    document.getElementById("calculate").textContent = languageJson.calculate;

    const modeSelection = document.getElementById("mode_selection");
    
    modeSelection.textContent = languageJson.optimize_for
    
    var labelRadio1 = document.createElement("label");
    var labelRadio2 = document.createElement("label");

    labelRadio1.innerHTML = languageJson.label_radio_1;
    labelRadio2.innerHTML = languageJson.label_radio_2;

    modeSelection.appendChild(labelRadio1);
    modeSelection.appendChild(labelRadio2);

    const solutionDiv = document.getElementById("solution")
    solutionDiv.getElementsByTagName("b")[0].textContent = languageJson.total_cost;

    document.getElementById("xp-range-note").textContent = languageJson.note;
}
