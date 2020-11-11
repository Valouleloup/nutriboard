class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			active: 0,
			mode: 'simple',
			type: 'tous'
		};
	}

	filter(type, key) {
		this.setState({type: type, active: key});
	}

	switchMode() {
		this.setState((state) => ({mode: (state.mode === 'simple' ? 'advanced' : 'simple')}));
	}

	getItemList(type) {
		var keys = [];
		for(var key in scores) {
			if (scores[key].type === type || type === 'tous') {
				keys.push(key);
			}
		}
		return keys;
	}

	getAlimentList(type) {
		if(type === 'tous') {
			return aliments;
		}
		return {type: aliments[type]};
	}

	getModeButtons() {
		return [
			<button key={1} onClick={this.switchMode.bind(this)} className={this.state.mode == 'simple' ? 'active' : ''}>Simple</button>,
			<button key={2} onClick={this.switchMode.bind(this)} className={this.state.mode == 'advanced' ? 'active' : ''}>Graph</button>
		]

	}

	getFilterButtons() {
		// TODO types in separated class
		var types = [
			"tous","yaourt","matières grasses","fromage","plat cuisiné","biscuits","féculent","légumes","viande","poisson","boisson","pain","apéro","dessert","soupe"
		];
		var result = [];
		for(var key in types) {
			var button = <button key={key} onClick={this.filter.bind(this, types[key], key)} className={this.state.active == key ? 'active' : ''}>{types[key]}</button>
			result.push(button);
		}
		return result;
	}

	getTable(mode) {
		return mode === 'advanced' ?
			<GraphTable items={this.getItemList(this.state.type)} aliments={this.getAlimentList(this.state.type)}/> :
			<SimpleTable items={this.getItemList(this.state.type)} aliments={this.getAlimentList(this.state.type)}/>;
	}

	render() {
		return (
			<div id="container">
				<div id="card" className="modes">
					{this.getModeButtons()}
				</div>
				<div id="card" className="filters">
					{this.getFilterButtons()}
				</div>
				<div id="card">
				{this.getTable(this.state.mode)}
				</div>
			</div>
		);
	}
}

// TODO find a better way
function addType(items, type) {
	for (var key in items) {
		items[key]['type'] = type;
	}
	return items;
}

// Todo use custom array
var scores = addType(dessert, 'dessert');
scores = scores.concat(addType(soupes, 'soupe'));
scores = scores.concat(addType(pains, 'pain'));
scores = scores.concat(addType(poissons, 'poisson'));
scores = scores.concat(addType(yaourts, 'yaourt'));
scores = scores.concat(addType(matieresGrasses, 'matières grasses'));
scores = scores.concat(addType(fromage, 'fromage'));
scores = scores.concat(addType(feculent, 'féculent'));
scores = scores.concat(addType(legumes, 'légumes'));
scores = scores.concat(addType(viande, 'viande'));
scores = scores.concat(addType(platCuisine, 'plat cuisiné'));
scores = scores.concat(addType(boisson, 'boisson'));
scores = scores.concat(addType(biscuits, 'biscuits'));
scores = scores.concat(addType(apero, 'apéro'));

var aliments = {};
aliments['dessert'] = dessert;
aliments['soupe'] = soupes;
aliments['pain'] = pains;
aliments['poisson'] = poissons;
aliments['yaourt'] = yaourts;
aliments['matiere-grasses'] = matieresGrasses;
aliments['fromage'] = fromage;
aliments['féculent'] = feculent;
aliments['légumes'] = legumes;
aliments['viande'] = viande;
aliments['plat-cuisiné'] = platCuisine;
aliments['boisson'] = boisson;
aliments['biscuits'] = biscuits;
aliments['apéro'] = apero;


ReactDOM.render(React.createElement(App), document.getElementById('root'));
