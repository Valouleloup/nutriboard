var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
	_inherits(App, _React$Component);

	function App(props) {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

		_this.state = {
			active: 0,
			mode: 'advanced',
			type: 'tous'
		};
		return _this;
	}

	_createClass(App, [{
		key: 'filter',
		value: function filter(type, key) {
			this.setState({ type: type, active: key });
		}
	}, {
		key: 'switchMode',
		value: function switchMode() {
			this.setState(function (state) {
				return { mode: state.mode === 'simple' ? 'advanced' : 'simple' };
			});
		}
	}, {
		key: 'getItemList',
		value: function getItemList(type) {
			var keys = [];
			for (var key in scores) {
				if (scores[key].type === type || type === 'tous') {
					keys.push(key);
				}
			}
			return keys;
		}
	}, {
		key: 'getAlimentList',
		value: function getAlimentList(type) {
			if (type === 'tous') {
				return aliments;
			}
			return { type: aliments[type] };
		}
	}, {
		key: 'getModeButtons',
		value: function getModeButtons() {
			return [React.createElement(
				'button',
				{ key: 1, onClick: this.switchMode.bind(this), className: this.state.mode == 'simple' ? 'active' : '' },
				'Simple'
			), React.createElement(
				'button',
				{ key: 2, onClick: this.switchMode.bind(this), className: this.state.mode == 'advanced' ? 'active' : '' },
				'Graph'
			)];
		}
	}, {
		key: 'getFilterButtons',
		value: function getFilterButtons() {
			// TODO types in separated class
			var types = ["tous", "yaourt", "matières grasses", "fromage", "plat cuisiné", "biscuits", "féculent", "légumes", "viande", "poisson", "boisson", "pain", "apéro", "dessert", "soupe"];
			var result = [];
			for (var key in types) {
				var button = React.createElement(
					'button',
					{ key: key, onClick: this.filter.bind(this, types[key], key), className: this.state.active == key ? 'active' : '' },
					types[key]
				);
				result.push(button);
			}
			return result;
		}
	}, {
		key: 'getTable',
		value: function getTable(mode) {
			return mode === 'advanced' ? React.createElement(GraphTable, { items: this.getItemList(this.state.type), aliments: this.getAlimentList(this.state.type) }) : React.createElement(SimpleTable, { items: this.getItemList(this.state.type), aliments: this.getAlimentList(this.state.type) });
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ id: 'container' },
				React.createElement(
					'div',
					{ id: 'card', className: 'modes' },
					this.getModeButtons()
				),
				React.createElement(
					'div',
					{ id: 'card', className: 'filters' },
					this.getFilterButtons()
				),
				React.createElement(
					'div',
					{ id: 'card' },
					this.getTable(this.state.mode)
				)
			);
		}
	}]);

	return App;
}(React.Component);

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