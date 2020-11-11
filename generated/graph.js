var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GraphTable = function (_React$Component) {
    _inherits(GraphTable, _React$Component);

    function GraphTable(props) {
        _classCallCheck(this, GraphTable);

        return _possibleConstructorReturn(this, (GraphTable.__proto__ || Object.getPrototypeOf(GraphTable)).call(this, props));
    }

    _createClass(GraphTable, [{
        key: "getAliments",
        value: function getAliments(list) {
            var items = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Object.entries(list)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _ref = _step.value;

                    var _ref2 = _slicedToArray(_ref, 2);

                    var key = _ref2[0];
                    var value = _ref2[1];

                    items.push(React.createElement(GraphAliment, { key: key, items: value, type: key }));
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return items;
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                this.getAliments(this.props.aliments)
            );
        }
    }]);

    return GraphTable;
}(React.Component);

var GraphNutriscoreCell = function (_React$Component2) {
    _inherits(GraphNutriscoreCell, _React$Component2);

    function GraphNutriscoreCell(props) {
        _classCallCheck(this, GraphNutriscoreCell);

        // TODO mapping in separated class
        var _this2 = _possibleConstructorReturn(this, (GraphNutriscoreCell.__proto__ || Object.getPrototypeOf(GraphNutriscoreCell)).call(this, props));

        var nutriscoreColorMapping = {
            "A": "#038141",
            "B": "#85BB2F",
            "C": "#FECB02",
            "D": "#EE8100",
            "E": "#E63E11"
        };

        _this2.state = { color: nutriscoreColorMapping[props.nutriscore] };
        return _this2;
    }

    _createClass(GraphNutriscoreCell, [{
        key: "getPlusOrMinus",
        value: function getPlusOrMinus(nutripoint) {
            if ([-15, -14, -13, -12, -11, -10, 0, 3, 4, 11, 12, 19, 20, 21].includes(nutripoint)) {
                return '+';
            }
            if ([-5, -4, -3, -2, -1, 2, 9, 10, 17, 18].includes(nutripoint) || nutripoint > 25) {
                return '-';
            }
        }
    }, {
        key: "getPoint",
        value: function getPoint(nutripoint) {
            return nutripoint !== '' ? nutripoint : 25;
        }
    }, {
        key: "getSvg",
        value: function getSvg(points) {
            var scale = 20;
            var offsetLeft = 10;
            return React.createElement(
                "svg",
                { height: "20", width: "800" },
                React.createElement("circle", { cx: points * scale + 10 * scale + offsetLeft, cy: "12", r: "6", stroke: "black", strokeWidth: "0", fill: this.state.color }),
                React.createElement("rect", { x: 10 * scale, y: "4", width: "1", height: "20", fill: "#ddd", strokeWidth: "0" }),
                React.createElement("rect", { x: 13 * scale, y: "4", width: "1", height: "20", fill: "#ddd", strokeWidth: "0" }),
                React.createElement("rect", { x: 21 * scale, y: "4", width: "1", height: "20", fill: "#ddd", strokeWidth: "0" }),
                React.createElement("rect", { x: 29 * scale, y: "4", width: "1", height: "20", fill: "#ddd", strokeWidth: "0" })
            );
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "td",
                { className: "simple-cell-nutriscore", style: { backgroundColor: 'white' } },
                React.createElement(
                    "span",
                    null,
                    this.getSvg(this.getPoint(this.props.nutripoint))
                )
            );
        }
    }]);

    return GraphNutriscoreCell;
}(React.Component);

var GraphAliment = function (_React$Component3) {
    _inherits(GraphAliment, _React$Component3);

    function GraphAliment(props) {
        _classCallCheck(this, GraphAliment);

        return _possibleConstructorReturn(this, (GraphAliment.__proto__ || Object.getPrototypeOf(GraphAliment)).call(this, props));
    }

    _createClass(GraphAliment, [{
        key: "getRows",
        value: function getRows(list) {
            var items = [];
            console.log(list);
            for (var key in list) {
                items.push(React.createElement(GraphFoodRow, { key: key, food: list[key] }));
            }
            return items;
        }
    }, {
        key: "getCategory",
        value: function getCategory(type) {
            var names = {};
            names['dessert'] = 'Desserts';
            names['soupe'] = 'Soupes';
            names['pain'] = 'Pain';
            names['poisson'] = 'Poissons';
            names['yaourt'] = 'Yaourts';
            names['matiere-grasses'] = 'Matières grasses';
            names['fromage'] = 'Fromages';
            names['féculent'] = 'Féculents';
            names['légumes'] = 'Légumes';
            names['viande'] = 'Viandes';
            names['plat-cuisiné'] = 'Plats cuisinés';
            names['boisson'] = 'Boissons';
            names['biscuits'] = 'Biscuits';
            names['apéro'] = 'Apéro';
            return names[type];
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "category", id: this.props.type + '-cat' },
                    this.getCategory(this.props.type)
                ),
                React.createElement(
                    "table",
                    { className: "graph-table" },
                    React.createElement(
                        "tbody",
                        null,
                        this.getRows(this.props.items)
                    )
                )
            );
        }
    }]);

    return GraphAliment;
}(React.Component);

var GraphFoodRow = function (_React$Component4) {
    _inherits(GraphFoodRow, _React$Component4);

    function GraphFoodRow(props) {
        _classCallCheck(this, GraphFoodRow);

        var _this4 = _possibleConstructorReturn(this, (GraphFoodRow.__proto__ || Object.getPrototypeOf(GraphFoodRow)).call(this, props));

        _this4.state = { active: false };
        return _this4;
    }

    _createClass(GraphFoodRow, [{
        key: "border",
        value: function border() {
            this.setState(function (state) {
                return { active: !state.active };
            });
        }
    }, {
        key: "render",
        value: function render() {
            var food = this.props.food;
            var nutriscore = food.nutriscore.toUpperCase();
            var nutripoint = food.nutriscore_data !== undefined ? food.nutriscore_data.score : '';
            return React.createElement(
                "tr",
                { onClick: this.border.bind(this), className: this.state.active ? 'active' : '' },
                React.createElement(FoodTypeCell, { type: this.props.food.type }),
                React.createElement(
                    "td",
                    { className: "cell-name" },
                    this.props.food.name
                ),
                React.createElement(GraphNutriscoreCell, { nutriscore: nutriscore, nutripoint: nutripoint })
            );
        }
    }]);

    return GraphFoodRow;
}(React.Component);