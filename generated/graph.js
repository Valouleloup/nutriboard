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
        key: "getRows",
        value: function getRows(list) {
            var items = [];
            for (var key in list) {
                items.push(React.createElement(GraphFoodRow, { key: list[key], food: scores[list[key]] }));
            }
            return items;
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "table",
                { className: "simple-table" },
                React.createElement(
                    "thead",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "td",
                            null,
                            "Type"
                        ),
                        React.createElement(
                            "td",
                            null,
                            "Nom"
                        ),
                        React.createElement(
                            "td",
                            null,
                            "Nutriscore"
                        )
                    )
                ),
                React.createElement(
                    "tbody",
                    null,
                    this.getRows(this.props.items)
                )
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
                React.createElement("circle", { cx: points * scale + 10 * scale + offsetLeft, cy: "12", r: "6", stroke: "black", "stroke-width": "0", fill: this.state.color }),
                React.createElement("rect", { x: 10 * scale, y: "4", width: "1", height: "20", fill: "#ddd", "stroke-width": "0" }),
                React.createElement("rect", { x: 13 * scale, y: "4", width: "1", height: "20", fill: "#ddd", "stroke-width": "0" }),
                React.createElement("rect", { x: 21 * scale, y: "4", width: "1", height: "20", fill: "#ddd", "stroke-width": "0" }),
                React.createElement("rect", { x: 29 * scale, y: "4", width: "1", height: "20", fill: "#ddd", "stroke-width": "0" })
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

var GraphFoodRow = function (_React$Component3) {
    _inherits(GraphFoodRow, _React$Component3);

    function GraphFoodRow(props) {
        _classCallCheck(this, GraphFoodRow);

        var _this3 = _possibleConstructorReturn(this, (GraphFoodRow.__proto__ || Object.getPrototypeOf(GraphFoodRow)).call(this, props));

        _this3.state = { active: false };
        return _this3;
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