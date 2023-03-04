var data = {};

onmessage = function(e) {
	//console.log('Message received from main script');
	//console.log(e.data);

	if (e.data.msg == 'set_data'){
		data = e.data.data;
		//console.log('data', data);
	}

	if (e.data.msg == 'process'){
		//console.log('data (later)', data);
		process(e.data.item, e.data.enchants);
		//console.log('work complete');
	}
}

var work_penalty = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511];


// TODO: calculate the score as we expand out our options.
// after each step, cull any paths where the remaining list is the same, keeping the best scores only

// potential future optimization: replace same-cost enchantments when the same key, so that we can
// cull more paths during the expansion phase

function process(item, enchants_raw){

	// turn list of desired enchantments into objects including their weight & score, keyed by character.
	// also create an array of characters we'll use to build the paths.

	var enchants = {};
	var costs = {};
	var items = ['ITEM'];

	for (var i=0; i<enchants_raw.length; i++){
		var e_info = data.enchants[enchants_raw[i][0]];
		var weight = parseInt(e_info.weight);
		var score = weight * enchants_raw[i][1];

		var key = String.fromCharCode(i + 97);

		enchants[key] = {
			'enchant'	: enchants_raw[i][0],
			'level'		: enchants_raw[i][1],
			'weight'	: weight,
			'score'		: score
		};

		costs[key] = score;

		items.push(key);
	}


	// now we have the list of items, start to expand them

	// start by creating a single (incomplete) path
	var incomplete_paths = [
		{
			'cost' : 0,
			'maxCost': 0,
			'remaining' : items,
			'steps' : [],
			'workings' : {}
		}
	];

	incomplete_paths[0].workings['ITEM'] = 0;
	for (var i=0; i<items.length; i++) incomplete_paths[0].workings[items[i]] = 0;

	var best_path = {'cost': Infinity, 'maxCost': Infinity};
	var paths_tried = 0;

	// while we have incomplete paths, iterate over each one, and find every possible next step.
	// for each next step, create a new path, either on the incomplete_paths list (is remaining.length > 1),
	// or the complete_paths list.

	var n = 1;
	while (incomplete_paths.length > 0){

		var total_tries = 0;
		var new_incomplete_paths = [];

		for (var i=0; i<incomplete_paths.length; i++){

			var ret = explode_path(incomplete_paths[i], costs);
			paths = ret.paths;
			total_tries += ret.tries;

			for (var j=0; j<paths.length; j++){
				if (paths[j].remaining.length > 1){
					new_incomplete_paths.push(paths[j]);
				}else{
					//delete paths[j].remaining;
					//complete_paths.push(paths[j]);
					paths_tried++;
					if (paths[j].cost < best_path.cost || (paths[j].cost === best_path.cost && paths[j].maxCost < best_path.maxCost)){
						best_path = paths[j];
						//console.log('found best path!', paths[j].cost);
					}
				}
			}
		}

		incomplete_paths = new_incomplete_paths;

		//console.log("completed one step");
		//console.log("COMPLETE", complete_paths);
		//console.log("INCOMPLETE", JSON.stringify(incomplete_paths));

		//for (var i=0; i<incomplete_paths.length; i++){
		//	console.log("INCOMPLETE", JSON.stringify(incomplete_paths[i]));
		//}

		postMessage({
			'msg': 'stage_complete',
			'num': n,
			'tries': total_tries,
		});
		n++;

		//console.log("INCOMPLETE", incomplete_paths);
		//return;
	}

	//console.log("ALL DONE");
	//console.log(complete_paths);

	//console.log(best_path);
	//console.log('tried', paths_tried);

	postMessage({
		'msg': 'complete',
		'item' : item,
		'cost' : best_path.cost,
		'path': best_path.steps,
		'enchants': enchants,
		'tried' : paths_tried,
	});

	//return complete_paths;
}

function explode_path(path, costs){

	// build a hash of flat-key => path, so we only have a single path to
	// each destination - we will flatten this into an array when we return.

	var best_paths = {};
	var tries = 0;

	var len = path.remaining.length;
	for (var a=0; a<len; a++){
		for (var b=0; b<len; b++){
			if (b == a) continue;
			if (path.remaining[b] == 'ITEM') continue;
			if (path.remaining[b].substr(0, 4) == 'ITEM') continue;

			var new_path = {
				'cost' : 0,
				'maxCost': 0,
				'remaining' : [],
				'steps' : [],
				'workings' : {},
			};

			for (var i=0; i<len; i++){
				if (i != a && i != b){
					new_path.remaining.push(path.remaining[i]);
				}
			}

			var a_item = path.remaining[a];
			var b_item = path.remaining[b];
			var combined = sort_flat(a_item+'|'+b_item);

			new_path.remaining.push(combined);
			new_path.remaining.sort();

			var work_a = path.workings[a_item];
			var work_b = path.workings[b_item];

			var new_work = Math.max(work_a, work_b) + 1;

			new_path.workings = { ...path.workings };
			new_path.workings[combined] = new_work;

			for (var i=0; i<path.steps.length; i++){
				new_path.steps.push(path.steps[i]);
			}

			// calculate step cost
			// COST = score_of_sacrifice + both work penalties
			var step_cost_enchants = calc_item_cost(b_item, costs);
			var step_cost_penalties = work_penalty[work_a] + work_penalty[work_b];

			// push the step to the array with the cost
			new_path.steps.push({left: a_item, right: b_item, cost: step_cost_enchants + step_cost_penalties});

			new_path.cost = path.cost + step_cost_enchants + step_cost_penalties;
			new_path.maxCost = Math.max(step_cost_enchants + step_cost_penalties, path.maxCost);

			tries++;


			// is there already a better score
			var flat_key = new_path.remaining.join('/');

			if (best_paths[flat_key]){
				// there is an existing path for this destination - only overwrite if this is a better cost.
				if (
					(best_paths[flat_key].cost > new_path.cost) ||
					(best_paths[flat_key].cost === new_path.cost && best_paths[flat_key].maxCost > new_path.maxCost)
				) {
					best_paths[flat_key] = new_path;
					//console.log('overriding path - better score');
				}else{
					//console.log('dropping path - same or worse score');
				}
			}else{
				// first path to get to this destination
				best_paths[flat_key] = new_path;
			}

			//console.log(JSON.stringify(new_path));
		}
	}

	var out = [];
	for (var i in best_paths){
		out.push(best_paths[i]);
	}

	return {
		'paths' : out,
		'tries' : tries,
	};

}

function calc_item_cost(item, costs){

	var total = 0;
	var bits = item.split('|');
	for (var i=0; i<bits.length; i++){
		total += costs[bits[i]];
	}
	return total;
}

function sort_flat(a){
	var bits = a.split('|');
	bits.sort();
	return bits.join('|');
}
