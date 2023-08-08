var overrides = [
    ["helmet", "armor_1_14_1"],
    ["chestplate", "armor_1_14_1"],
    ["leggings", "armor_1_14_1"],
    ["boots", "armor_1_14_1"],
    ["turtle_shell", "armor_1_14_1"],
    ["bow", "bow_1_11"]
];

var worker;
var start_time;
var total_steps;
var total_tries;

window.onload = function() {
    const item_namespace2style = data.items;

    worker = new Worker("work.js?2");

    worker.onmessage = function(e) {
        const current_time = performance.now();
        var elapsed_time = current_time - start_time;
        console.log(current_time, "msg back to master", e.data);

        if (e.data.msg == "complete") {
            afterFoundOptimalSolution(e.data);
        }
    };

    worker.postMessage({
        msg: "set_data",
        data: data
    });

    const item_namespaces = Object.keys(item_namespace2style);
    item_namespaces.forEach(item_namespace => {
        const item_name = item_namespace2style[item_namespace];
        const item_listbox_metadata = { value: item_namespace };
        const item_listbox = $("<option/>", item_listbox_metadata);
        item_listbox.text(item_name).appendTo("select#item");
    });

    $("select#item").change(function() {
        var option = $("select#item option:selected").val();
        if (option) {
            buildEnchantList(option);
            build_overrides(option);
        } else {
            $("#enchants").hide();
            $("#overrides").hide();
        }
    });

    $("#enchants table").on("click", "button", function() {
        buttonClicked($(this));
    });

    $("#calculate").click(calculate);

    if (0) {
        start_time = performance.now();
        worker.postMessage({
            msg: "process",
            item: item,
            enchants: enchants
        });
    }

    if (0) {
        for (var i in item_namespace2style) {
            var img = $("<img>").attr("src", "./images/" + i + ".gif").attr("width", 16).attr("height", 16);
            var lbl = $("<span>").text(item_namespace2style[i]);

            $("#right").append($("<p>").append(img).append(lbl));
        }
    }

    setup_darkmode();
};

function buildEnchantList(item_namespace_chosen) {
    const enchantments_metadata = data.enchants;

    $("#enchants table").html("");

    //
    // first, filter out which enchants apply to this item
    //

    var enchantments_allowed = [];
    var enchantment_level_maxmax = 0;

    const enchantment_namespaces = Object.keys(enchantments_metadata);
    enchantment_namespaces.forEach(enchantment_namespace => {
        const enchantment_metadata = enchantments_metadata[enchantment_namespace];
        const item_namespaces = enchantment_metadata.items;

        var allow_enchantment = false;
        item_namespaces.forEach(item_namespace => {
            if (item_namespace == item_namespace_chosen) {
                allow_enchantment = true;
                return;
            }
        });

        if (allow_enchantment) {
            const enchantment_max_level = enchantment_metadata.levelMax;
            enchantment_level_maxmax = Math.max(enchantment_level_maxmax, enchantment_max_level);
            enchantments_allowed.push(enchantment_namespace);
        }
    });

    //
    // get overrides
    //

    var o_flags = get_override_flags();

    //
    // next, group them by incompatible enchants
    //

    var enchantment_groups = [];

    while (enchantments_allowed.length) {
        var candidate = enchantments_allowed.shift();
        var enchantment_group = [candidate];

        var next_enchantment_namespace = [];
        for (let i = 0; i < enchantments_allowed.length; i++) {
            const enchantment_namespace = enchantments_allowed[i];
            const enchantment_metadata = enchantments_metadata[enchantment_namespace];

            var is_incompatible = false;
            for (let j = 0; j < enchantment_metadata.incompatible.length; j++) {
                if (enchantment_metadata.incompatible[j] == candidate) {
                    is_incompatible = true;
                    break;
                }
            }

            if (is_overriden(enchantment_namespace, o_flags)) is_incompatible = false;

            if (is_incompatible) {
                enchantment_group.push(enchantment_namespace);
            } else {
                next_enchantment_namespace.push(enchantment_namespace);
            }
        }

        enchantment_groups.push(enchantment_group);
        enchantments_allowed = next_enchantment_namespace;
    }

    //
    // finally, build some HTML
    //

    var group_toggle = true;

    enchantment_groups.forEach(enchantment_group => {
        enchantment_group.forEach(enchantment_namespace => {
            const enchantment_metadata = enchantments_metadata[enchantment_namespace];
            const enchantment_max_level = enchantment_metadata.levelMax;
            const enchantment_name = enchantment_metadata["stylized"];

            var enchantment_row = $("<tr>");
            enchantment_row.addClass(group_toggle ? "group1" : "group2");

            enchantment_row.append($("<td>").append(enchantment_name));
            for (let enchantment_level = 1; enchantment_level <= enchantment_level_maxmax; enchantment_level++) {
                if (enchantment_max_level >= enchantment_level) {
                    const enchantment_button_data = {
                        level: enchantment_level,
                        enchant: enchantment_name
                    };
                    var enchantment_button = $("<button>");
                    enchantment_button.append(enchantment_level).addClass("off").data(enchantment_button_data);
                    const enchantment_row_append = $("<td>").append(enchantment_button);
                    enchantment_row.append(enchantment_row_append);
                } else {
                    enchantment_row.append($("<td>"));
                }
            }

            $("#enchants table").append(enchantment_row);

            if (enchantment_name == "Riptide") {
                const trident_footnote =
                    "Channeling and Loyalty can be used together but neither can be used with Riptide";
                enchantment_row = $("<tr>");
                enchantment_row.addClass(group_toggle ? "group1" : "group2");

                enchantment_row.append($("<td>"));

                const trident_row_append = $("<td>")
                    .attr("colspan", enchantment_level_maxmax)
                    .append($("<i>").append(trident_footnote));
                enchantment_row.append(trident_row_append);

                $("#enchants table").append(enchantment_row);
            }
        });

        group_toggle = !group_toggle;
    });

    $("#enchants").show();
}

function get_override_flags() {
    return {
        armor_1_14_1: !!$("#armor_1_14_1").is(":checked"),
        bow_1_11: !!$("#bow_1_11").is(":checked")
    };
}

function is_overriden(enchant, o_flags) {
    if (enchant == "Protection" && o_flags.armor_1_14_1) return true;
    if (enchant == "Blast Protection" && o_flags.armor_1_14_1) return true;
    if (enchant == "Fire Protection" && o_flags.armor_1_14_1) return true;
    if (enchant == "Projectile Protection" && o_flags.armor_1_14_1) return true;

    if (enchant == "Infinity" && o_flags.bow_1_11) return true;
    if (enchant == "Mending" && o_flags.bow_1_11) return true;

    return false;
}

function build_overrides(item) {
    $("#overrides p").html("");

    for (var i = 0; i < overrides.length; i++) {
        if (overrides[i][0] == item) {
            var o = overrides[i][1];

            if (o == "armor_1_14_1") {
                $("#overrides p").append(
                    '<label><input type="checkbox" id="armor_1_14_1" >Allow multiple Protection types (1.14.1 only)</label>'
                );
            }
            if (o == "bow_1_11") {
                $("#overrides p").append(
                    '<label><input type="checkbox" id="bow_1_11" >Allow Mending & Infinity (1.11 only)</label>'
                );
            }
        }
    }

    $("#overrides p input").change(function() {
        buildEnchantList(item);
    });

    $("#overrides").show();
}

function afterFoundOptimalSolution(msg) {
    // if (msg.tried == 0) {
    //     $("#error .lbl").text("Please select one or more enchantments");
    //     $("#error").show();
    //     return;
    // }

    const current_time = performance.now();
    const elapsed_time_milliseconds = current_time - start_time;

    var timing_text;
    console.log(elapsed_time_milliseconds);
    if (elapsed_time_milliseconds < 1) {
        const elapsed_time_microseconds = Math.round(elapsed_time_milliseconds * 1000);
        timing_text = "Completed in " + Math.round(elapsed_time_microseconds) + " microseconds";
    } else if (elapsed_time_milliseconds < 1000) {
        const elasped_time_round = Math.round(elapsed_time_milliseconds);
        timing_text = "Completed in " + elasped_time_round + " millisecond";
        if (elasped_time_round != 0) timing_text += "s";
    } else {
        const elapsed_time_seconds = Math.round(elapsed_time_milliseconds / 1000);
        timing_text = "Completed in " + elapsed_time_seconds + " second";
        if (elapsed_time_seconds != 1) timing_text += "s";
    }

    $("#timings").text(timing_text);
    $("#timings").show();

    const final_item_obj = msg.item_obj;
    const cumulative_cost = final_item_obj.cumulative_cost;

    $("#level-cost").text(cumulative_cost);
    $("#steps").html("");

    const steps = msg.steps;
    steps.forEach(step => {
        const left_item_obj = step[0];
        const right_item_obj = step[1];
        const cost = step[2];
        const prior_work = step[3];

        const left_item_text = displayItemText(left_item_obj);
        const right_item_text = displayItemText(right_item_obj);
        const prior_work_penalty = 2 ** prior_work - 1;

        const display_text =
            "Combine <i>" +
            left_item_text +
            "</i> with <i>" +
            right_item_text +
            "</i><br><small>(Cost: " +
            cost +
            " levels, Prior Work Penalty: " +
            prior_work_penalty +
            ")</small>";
        $("#steps").append($("<li>").html(display_text));
    });

    $("#solution").show();
}

function displayEnchantmentText(enchantment_obj) {
    const enchantment_namespace = enchantment_obj.namespace;
    const enchantment_metadata = data.enchants[enchantment_namespace];
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
    const items_metadata = data.items;
    const item_name = items_metadata[item_namespace];

    const enchantments_obj = item_obj.enchantments_obj;
    const enchantments_text = displayEnchantmentsText(enchantments_obj);

    const display_name = icon_text + " " + item_name + " " + enchantments_text;
    return display_name;
}

function enchantmentNamespaceFromStylized(enchantment_name) {
    const enchantments_metadata = data.enchants;
    const enchantment_namespaces = Object.keys(enchantments_metadata);

    var namespace_match = "";
    enchantment_namespaces.forEach(enchantment_namespace => {
        const enchantment_metadata = enchantments_metadata[enchantment_namespace];
        const enchantment_name_check = enchantment_metadata["stylized"];
        if (enchantment_name_check == enchantment_name) namespace_match = enchantment_namespace;
        return;
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

function buttonClicked(button_clicked) {
    const button_data = button_clicked.data();
    const enchantments_metadata = data.enchants;
    const enchantment_buttons = $("#enchants button");

    // when we click on a button, we need to:
    // 1) figure out if it's already on
    // 2) if it is, turn it off (no longer using this enchant)
    // 3) if it's not, turn it on and turn off any other button in the same enchant group (inc other levels of this enchant)

    const button_is_on = button_clicked.attr("class") == "on";

    if (button_is_on) {
        button_clicked.attr("class", "off");
    } else {
        button_clicked.attr("class", "on");

        const clicked_enchantment_name = button_data.enchant;
        const clicked_enchantment_level = button_data.level;

        enchantment_buttons
            .filter(function() {
                const this_button = $(this);
                return filterButton(this_button, clicked_enchantment_name, clicked_enchantment_level);
            })
            .attr("class", "off");

        // Treat these special: Channeling and Loyalty can be used together but neither can be used with Riptide

        const name_is_channeling = clicked_enchantment_name == "Channeling";
        const name_is_loyalty = clicked_enchantment_name == "Loyalty";
        const name_is_riptide = clicked_enchantment_name == "Riptide";

        if (name_is_channeling || name_is_loyalty) {
            enchantment_buttons
                .filter(function() {
                    const this_button = $(this);
                    const name_is_riptide = buttonMatchesName(this_button, "Riptide");
                    return name_is_riptide;
                })
                .attr("class", "off");
        } else if (name_is_riptide) {
            enchantment_buttons
                .filter(function() {
                    const this_button = $(this);
                    const name_is_channeling = buttonMatchesName(this_button, "Riptide");
                    const name_is_loyalty = buttonMatchesName(this_button, "Loyalty");
                    return name_is_channeling || name_is_loyalty;
                })
                .attr("class", "off");
        } else {
            if (is_overriden(button_data.enchant, get_override_flags())) return;

            const enchantment_namespace = enchantmentNamespaceFromStylized(clicked_enchantment_name);
            const enchantment_metadata = enchantments_metadata[enchantment_namespace];
            const incompatible_namespaces = enchantment_metadata.incompatible;

            incompatible_namespaces.forEach(incompatible_namespace => {
                const incompatible_metadata = enchantments_metadata[incompatible_namespace];
                const incompatible_name = incompatible_metadata["stylized"];

                enchantment_buttons
                    .filter(function() {
                        const this_button = $(this);
                        const button_matches_name = buttonMatchesName(this_button, incompatible_name);
                        return button_matches_name;
                    })
                    .attr("class", "off");
            });
        }
    }
}

function calculate() {
    var enchantment_foundation = [];
    const buttons_on = $("#enchants button.on");

    buttons_on.each(function(button_index, button) {
        const enchantment_name = $(button).data("enchant");
        const enchantment_level = $(button).data("level");
        const enchantment_namespace = enchantmentNamespaceFromStylized(enchantment_name);
        enchantment_foundation.push([enchantment_namespace, enchantment_level]);
    });

    const item_namespace = $("select#item option:selected").val();
    startCalculating(item_namespace, enchantment_foundation);
}

function startCalculating(item_namespace, enchantment_foundation) {
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

    worker.postMessage({
        msg: "process",
        item: item_namespace,
        enchants: enchantment_foundation
    });
}

function setup_darkmode() {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    darkModeToggle.addEventListener("click", function() {
        body.classList.toggle("dark-mode");

        // Save user preference in localStorage
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
            darkModeToggle.textContent = "Light Mode";
        } else {
            localStorage.setItem("darkMode", "disabled");
            darkModeToggle.textContent = "Dark Mode";
        }
    });

    // Check user preference on page load
    const userPreference = localStorage.getItem("darkMode");
    if (userPreference === "enabled") {
        body.classList.add("dark-mode");
        darkModeToggle.textContent = "Light Mode";
    } else {
        body.classList.remove("dark-mode");
        darkModeToggle.textContent = "Dark Mode";
    }
}
