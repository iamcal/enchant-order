var item = "boots";
var enchants = [
	["Protection", 4],
	["Respiration", 3],
	["Aqua Affinity", 1],
	["Thorns", 3],
	["Unbreaking", 3],
	["Mending", 1],
];

enchants = [
	["Protection", 4],
	["Thorns", 3],
	["Unbreaking", 3],
	["Mending", 1],
	["Feather Falling", 4],
	["Depth Strider", 3],
	["Soul Speed", 3],
];

var overrides = [
	['helmet'	, 'armor_1_14_1'],
	['chestplate'	, 'armor_1_14_1'],
	['leggings'	, 'armor_1_14_1'],
	['boots'	, 'armor_1_14_1'],
	['turtle_shell'	, 'armor_1_14_1'],
	['bow'		, 'bow_1_11'],
];

var w;
var start;
var in_progress = false;
var total_steps;
var total_tries;

window.onload = function(){

	w = new Worker('work.js?2');

	w.onmessage = function(e){
		var x = performance.now();
		var elapsed = x - start;
		console.log(x, 'msg back to master', e.data);

		if (e.data.msg == 'stage_complete'){
			stage_complete(e.data);
		}

		if (e.data.msg == 'complete'){
			completed(e.data);
		}
	};

	w.postMessage({
		'msg' : 'set_data',
		'data' : data,
	});

	for (var i in data.items){
		$('<option/>', { value : i }).text(data.items[i]).appendTo('select#item');
	}

	$('select#item').change(function(){
		var opt = $('select#item option:selected').val();
		if (opt){
			build_enchant_list(opt);
			build_overrides(opt);
		}else{
			$('#enchants').hide();
			$('#overrides').hide();
		}
	});

	$('#enchants table').on('click', 'button', function() {
		button_clicked($(this));
	});

	$('#calculate').click(calculate);

	if (0){
		start = performance.now();
		w.postMessage({
			'msg' : 'process',
			'item' : item,
			'enchants' : enchants,
		});
	}

	if (0){
		for (var i in data.items){
			var img = $('<img>').attr('src', './images/'+i+'.gif').attr('width', 16).attr('height', 16);
			var lbl = $('<span>').text(data.items[i]);

			$('#right').append($('<p>').append(img).append(lbl));
		}
	}
}

function build_enchant_list(item){

	//console.log('build list of enchants for '+item);

	$('#enchants table').html('');


	//
	// first, filter out which enchants apply to this item
	//

	var enchants = [];
	var max_max = 0;

	for (var i in data.enchants){

		var enchant = data.enchants[i];
		var allow = false;

		for (var j=0; j<enchant.items.length; j++){
			if (enchant.items[j] == item){
				allow = true;
				break;
			}
		}

		if (i.substr(0, 5) == "Curse") allow = false;

		if (allow){
			enchants.push(i);

			var e_info = data.enchants[i];
			max_max = Math.max(max_max, parseInt(e_info.levelMax));
		}
	}


	//
	// get overrides
	//

	var o_flags = get_override_flags();


	//
	// next, group them by incompatible enchants
	//

	var groups = [];

	while (enchants.length){
		var candidate = enchants.shift();
		var group = [candidate];

		var next = [];
		for (var i=0; i<enchants.length; i++){
			var e = enchants[i];
			var e_info = data.enchants[e];

			var is_incompatible = false;
			for (var j=0; j<e_info.incompatible.length; j++){
				if (e_info.incompatible[j] == candidate){
					is_incompatible = true;
					break;
				}
			}

			if (is_overriden(e, o_flags)) is_incompatible = false;

			if (is_incompatible){
				group.push(e);
			}else{
				next.push(e);
			}
		}

		groups.push(group);
		enchants = next;
	}


	//
	// finally, build some HTML
	//

	var g_toggle = true;

	for (var i=0; i<groups.length; i++){
		var group = groups[i];

		for (var j=0; j<group.length; j++){
			var enchant = group[j];
			var e_info = data.enchants[enchant];
			var max = parseInt(e_info.levelMax);

			var row = $('<tr>');
			row.addClass(g_toggle ? 'group1' : 'group2');

			row.append($('<td>').append(enchant));
			for (var k=1; k<=max_max; k++){
				if (max >= k){
					row.append($('<td>').append($('<button>').append(k).addClass('off').data({
						'level' : k,
						'enchant' : enchant,
					})));
				}else{
					row.append($('<td>'));
				}
			}

			//p.css({'backgroundColor' : g_toggle ? '#eee' : '#ddd'});
			$('#enchants table').append(row);

			//console.log(enchant, g_toggle);

			if (enchant == 'Riptide'){

				row = $('<tr>');
				row.addClass(g_toggle ? 'group1' : 'group2');

				row.append($('<td>'));
				row.append($('<td>').attr('colspan', max_max).append($('<i>').append("Channeling and Loyalty can be used together but neither can be used with Riptide")));

				$('#enchants table').append(row);
			}
		}

		g_toggle = !g_toggle;
	}

	$('#enchants').show();
}

function get_override_flags(){
	return {
		'armor_1_14_1'	: !!$('#armor_1_14_1').is(':checked'),
		'bow_1_11'	: !!$('#bow_1_11').is(':checked'),
	};
}

function is_overriden(enchant, o_flags){

	if (enchant == 'Protection'		&& o_flags.armor_1_14_1) return true;
	if (enchant == 'Blast Protection'	&& o_flags.armor_1_14_1) return true;
	if (enchant == 'Fire Protection'	&& o_flags.armor_1_14_1) return true;
	if (enchant == 'Projectile Protection'	&& o_flags.armor_1_14_1) return true;

	if (enchant == 'Infinity'		&& o_flags.bow_1_11) return true;
	if (enchant == 'Mending'		&& o_flags.bow_1_11) return true;

	return false;
}


function build_overrides(item){

	$('#overrides p').html('');

	for (var i=0; i<overrides.length; i++){
		if (overrides[i][0] == item){
			var o = overrides[i][1];

			if (o == 'armor_1_14_1'){
				$('#overrides p').append('<label><input type="checkbox" id="armor_1_14_1" >Allow multiple Protection types (1.14.1 only)</label>');
			}
			if (o == 'bow_1_11'){
				$('#overrides p').append('<label><input type="checkbox" id="bow_1_11" >Allow Mending & Infinity (1.11 only)</label>');
			}
		}
	}

	$('#overrides p input').change(function(){ build_enchant_list(item); });

	$('#overrides').show();
}

function completed(msg){

	var x = performance.now();
	var elapsed = Math.round((x - start) / 1000);

	if (elapsed <= 1){
		$('#timings').text('Completed in under a second, trying '+number_format(total_tries)+' combinations');
	}else{
		$('#timings').text('Completed in '+elapsed+' seconds, trying '+number_format(total_tries)+' combinations');
	}

	in_progress = false;

	var names = {};
	for (var i in msg.enchants){
		var e = msg.enchants[i];
		var e_info = data.enchants[msg.enchants[i].enchant];

		names[i] = e_info.levelMax == "1" ? e.enchant : e.enchant + ' ' + e.level;
	}
	names['ITEM'] = data.items[msg.item];

	//console.log(names);

	$('#level-cost').text(msg.cost);
	$('#steps').html('');

	if (msg.tried == 0){
		$('#error .lbl').text("Please select one or more enchantments");
		$('#error').show();
		return;
	}

	for (var i=0; i<msg.path.length; i++){

		var n = i+1;
		var left = expand_name(msg.path[i].left, names, msg);
		var right = expand_name(msg.path[i].right, names, msg);

		$('#steps').append($('<li>').html('Combine <i>'+left+'</i> with <i>'+right+'</i><br><small>(Cost: '+msg.path[i].cost+' levels)</small>'));

	}

	$('#solution').show();
}

function expand_name(k, names, context){

	var bits = k.split('|');

	// just a single item is easy
	if (bits.length == 1){
		var icon = bits[0] == 'ITEM' ? context.item : 'book';
		return '<img src="./images/'+icon+'.gif" class="icon"> '+names[bits[0]];
	}


	// for multiple items, make it fancy
	var icon = 'book';
	var lbl = 'Book';

	if (bits[0] == 'ITEM'){
		bits.shift();
		icon = context.item;
		lbl = names['ITEM'];
	}

	var parts = [];
	for (var i=0; i<bits.length; i++){
		parts.push(names[bits[i]]);
	}
		
	var extra = parts.join(' + ');
	if (icon != 'book') extra = 'w/ '+extra;

	return '<img src="./images/'+icon+'.gif" class="icon"> '+lbl+' ('+extra+')';
}

function button_clicked(elm){

	var b_data = elm.data();

	// when we click on a button, we need to:
	// 1) figure out if it's already on
	// 2) if it is, turn it off (no longer using this enchant)
	// 3) if it's not, turn it on and turn off any other button in the same enchant group (inc other levels of this enchant)

	if (elm.attr('class') == 'on'){
		elm.attr('class', 'off');
	}else{
		elm.attr('class', 'on');
		$("#enchants button").filter(function(){ return $(this).data("enchant") == b_data.enchant && $(this).data("level") != b_data.level; }).attr('class', 'off');
		var e_info = data.enchants[b_data.enchant];


		// Treat these special: Channeling and Loyalty can be used together but neither can be used with Riptide

		if (b_data.enchant == 'Channeling' || b_data.enchant == 'Loyalty'){
			$("#enchants button").filter(function(){ return $(this).data("enchant") == 'Riptide'; }).attr('class', 'off');
		}else if (b_data.enchant == 'Riptide'){
			$("#enchants button").filter(function(){ return $(this).data("enchant") == 'Channeling' || $(this).data("enchant") == 'Loyalty'; }).attr('class', 'off');

		}else{
			if (is_overriden(b_data.enchant, get_override_flags())) return;

			for (var i=0; i<e_info.incompatible.length; i++){
				$("#enchants button").filter(function(){ return $(this).data("enchant") == e_info.incompatible[i]; }).attr('class', 'off');
			}
		}
	}
}

function calculate(){

	// get list of enchants to use

	var enchants = [];

	$("#enchants button.on").each(function(idx, elm){
		enchants.push([$(elm).data('enchant'), $(elm).data('level')]);
	});

	var item = $('select#item option:selected').val();

	start_job(item, enchants);
}

function start_job(item, enchants){

	if (in_progress == true){
		alert('calculation already in progress');
		return;
	}

	if (enchants.length >= 6){
		 if (navigator.userAgent.match(/Android/i)
			|| navigator.userAgent.match(/iPhone/i)
			|| navigator.userAgent.match(/iPad/i)){
				$('#phone-warn').show();
		}
	}

	in_progress = true;
	total_steps = enchants.length;
	total_tries = 0;
	start = performance.now();

	$('#solution').hide();
	$('#error').hide();

	$('#progress .lbl').text("Calculating stage 1 of "+total_steps);
	$('#progress').show();

	w.postMessage({
		'msg' : 'process',
		'item' : item,
		'enchants' : enchants,
	});
}

function stage_complete(data){

	total_tries = Math.max(total_tries, data.tries);

	if (data.num < total_steps){
		$('#progress .lbl').text("Calculating stage "+(data.num+1)+" of "+total_steps+" ("+number_format(data.tries)+" paths explored)");
	}else{
		$('#progress').hide();
		$('#phone-warn').hide();
	}
}

function number_format(x){
	return Number(x).toLocaleString();
}
