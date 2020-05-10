var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SimpleTable = function (_React$Component) {
    _inherits(SimpleTable, _React$Component);

    function SimpleTable(props) {
        _classCallCheck(this, SimpleTable);

        return _possibleConstructorReturn(this, (SimpleTable.__proto__ || Object.getPrototypeOf(SimpleTable)).call(this, props));
    }

    _createClass(SimpleTable, [{
        key: "getRows",
        value: function getRows(list) {
            var items = [];
            for (var key in list) {
                items.push(React.createElement(SimpleFoodRow, { key: list[key], food: scores[list[key]] }));
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
                        ),
                        React.createElement(
                            "td",
                            null,
                            "Energie"
                        ),
                        React.createElement(
                            "td",
                            null,
                            "Sucres"
                        ),
                        React.createElement(
                            "td",
                            null,
                            "Ac. gr. sat."
                        ),
                        React.createElement(
                            "td",
                            null,
                            "Sel"
                        ),
                        React.createElement(
                            "td",
                            null,
                            "Fruit/L\xE9gum."
                        ),
                        React.createElement(
                            "td",
                            null,
                            "Prot\xE9ines"
                        ),
                        React.createElement(
                            "td",
                            null,
                            "Fibres alim."
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

    return SimpleTable;
}(React.Component);

var SimpleNutriscoreCell = function (_React$Component2) {
    _inherits(SimpleNutriscoreCell, _React$Component2);

    function SimpleNutriscoreCell(props) {
        _classCallCheck(this, SimpleNutriscoreCell);

        // TODO mapping in separated class
        var _this2 = _possibleConstructorReturn(this, (SimpleNutriscoreCell.__proto__ || Object.getPrototypeOf(SimpleNutriscoreCell)).call(this, props));

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

    _createClass(SimpleNutriscoreCell, [{
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
        key: "render",
        value: function render() {
            return React.createElement(
                "td",
                { className: "simple-cell-nutriscore", style: { backgroundColor: this.state.color } },
                this.props.nutriscore,
                this.props.nutripoint !== '' ? React.createElement(
                    "span",
                    null,
                    this.getPlusOrMinus(this.props.nutripoint)
                ) : false
            );
        }
    }]);

    return SimpleNutriscoreCell;
}(React.Component);

var SimpleFoodRow = function (_React$Component3) {
    _inherits(SimpleFoodRow, _React$Component3);

    function SimpleFoodRow(props) {
        _classCallCheck(this, SimpleFoodRow);

        var _this3 = _possibleConstructorReturn(this, (SimpleFoodRow.__proto__ || Object.getPrototypeOf(SimpleFoodRow)).call(this, props));

        _this3.state = { active: false };
        return _this3;
    }

    _createClass(SimpleFoodRow, [{
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
            var fruits = food.nutriscore_data != undefined ? food.nutriscore_data['fruits_vegetables_nuts_colza_walnut_olive_oils'] : food.nutriments['fruits-estimate_100g'];
            var energy = food.nutriments['energy-kcal_value'] ? food.nutriments['energy-kcal_value'] : Math.round(food.nutriments["energy-kj_100g"] / 4.184);
            var fiber = food.nutriments['fiber_100g'] != undefined ? food.nutriments['fiber_100g'] : '-';
            return React.createElement(
                "tr",
                { onClick: this.border.bind(this), className: this.state.active ? 'active' : '' },
                React.createElement(FoodTypeCell, { type: this.props.food.type }),
                React.createElement(
                    "td",
                    { className: "cell-name" },
                    this.props.food.name
                ),
                React.createElement(SimpleNutriscoreCell, { nutriscore: nutriscore, nutripoint: nutripoint }),
                React.createElement(SimpleEnergyCell, { value: energy }),
                React.createElement(SimpleSugarCell, { value: this.props.food.nutriments['sugars_100g'] }),
                React.createElement(SimpleSaturatedFatCell, { value: this.props.food.nutriments['saturated-fat_100g'] }),
                React.createElement(SimpleSaltCell, { value: this.props.food.nutriments['salt_100g'] }),
                React.createElement(SimpleFruitsCell, { value: fruits }),
                React.createElement(SimpleProteinsCell, { value: this.props.food.nutriments['proteins_100g'] }),
                React.createElement(SimpleFibersCell, { value: fiber })
            );
        }
    }]);

    return SimpleFoodRow;
}(React.Component);

var SimpleNegative = function (_React$Component4) {
    _inherits(SimpleNegative, _React$Component4);

    function SimpleNegative(props) {
        _classCallCheck(this, SimpleNegative);

        var _this4 = _possibleConstructorReturn(this, (SimpleNegative.__proto__ || Object.getPrototypeOf(SimpleNegative)).call(this, props));

        var value = isNaN(props.value) ? 0 : Math.round(props.value * 10) / 10;

        _this4.state = { value: value };
        return _this4;
    }

    _createClass(SimpleNegative, [{
        key: "getColorByValue",
        value: function getColorByValue(value) {
            switch (true) {
                case value > this.getLimits().reallyBad:
                    return "#49170d";
                case value > this.getLimits().bad:
                    return "#ff5b3b";
                case value > this.getLimits().soso:
                    return "#ffd248";
                case value > this.getLimits().good:
                    return "#49d14b";
                default:
                    return "#038141";
            }
        }
    }, {
        key: "getLimits",
        value: function getLimits() {
            return { "reallyBad": 100, "bad": 50, "soso": 20, "good": 5, "reallyGood": 10 };
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("td", { className: "cell-simple-negative", style: { backgroundColor: this.getColorByValue(this.state.value) } });
        }
    }]);

    return SimpleNegative;
}(React.Component);

var SimplePositive = function (_SimpleNegative) {
    _inherits(SimplePositive, _SimpleNegative);

    function SimplePositive() {
        _classCallCheck(this, SimplePositive);

        return _possibleConstructorReturn(this, (SimplePositive.__proto__ || Object.getPrototypeOf(SimplePositive)).apply(this, arguments));
    }

    _createClass(SimplePositive, [{
        key: "getColorByValue",
        value: function getColorByValue(value) {
            switch (true) {
                case value < this.getLimits().reallyBad:
                    return "#49170d";
                case value < this.getLimits().bad:
                    return "#ff5b3b";
                case value < this.getLimits().soso:
                    return "#ffd248";
                case value < this.getLimits().good:
                    return "#49d14b";
                default:
                    return "#038141";
            }
        }
    }]);

    return SimplePositive;
}(SimpleNegative);

var SimpleFruitsCell = function (_SimplePositive) {
    _inherits(SimpleFruitsCell, _SimplePositive);

    function SimpleFruitsCell() {
        _classCallCheck(this, SimpleFruitsCell);

        return _possibleConstructorReturn(this, (SimpleFruitsCell.__proto__ || Object.getPrototypeOf(SimpleFruitsCell)).apply(this, arguments));
    }

    _createClass(SimpleFruitsCell, [{
        key: "getLimits",
        value: function getLimits() {
            return { "reallyBad": 20, "bad": 40, "soso": 60, "good": 80 };
        }
    }]);

    return SimpleFruitsCell;
}(SimplePositive);

var SimpleProteinsCell = function (_SimplePositive2) {
    _inherits(SimpleProteinsCell, _SimplePositive2);

    function SimpleProteinsCell() {
        _classCallCheck(this, SimpleProteinsCell);

        return _possibleConstructorReturn(this, (SimpleProteinsCell.__proto__ || Object.getPrototypeOf(SimpleProteinsCell)).apply(this, arguments));
    }

    _createClass(SimpleProteinsCell, [{
        key: "getLimits",
        value: function getLimits() {
            return { "reallyBad": 1.6, "bad": 3.2, "soso": 4.8, "good": 6.4 };
        }
    }]);

    return SimpleProteinsCell;
}(SimplePositive);

var SimpleFibersCell = function (_SimplePositive3) {
    _inherits(SimpleFibersCell, _SimplePositive3);

    function SimpleFibersCell() {
        _classCallCheck(this, SimpleFibersCell);

        return _possibleConstructorReturn(this, (SimpleFibersCell.__proto__ || Object.getPrototypeOf(SimpleFibersCell)).apply(this, arguments));
    }

    _createClass(SimpleFibersCell, [{
        key: "getLimits",
        value: function getLimits() {
            return { "reallyBad": 0.9, "bad": 1.9, "soso": 2.8, "good": 3.7 };
        }
    }]);

    return SimpleFibersCell;
}(SimplePositive);

var SimpleEnergyCell = function (_SimpleNegative2) {
    _inherits(SimpleEnergyCell, _SimpleNegative2);

    function SimpleEnergyCell() {
        _classCallCheck(this, SimpleEnergyCell);

        return _possibleConstructorReturn(this, (SimpleEnergyCell.__proto__ || Object.getPrototypeOf(SimpleEnergyCell)).apply(this, arguments));
    }

    _createClass(SimpleEnergyCell, [{
        key: "getLimits",
        value: function getLimits() {
            return { "reallyBad": 560, "bad": 320, "soso": 160, "good": 80 };
        }
    }]);

    return SimpleEnergyCell;
}(SimpleNegative);

var SimpleSugarCell = function (_SimpleNegative3) {
    _inherits(SimpleSugarCell, _SimpleNegative3);

    function SimpleSugarCell() {
        _classCallCheck(this, SimpleSugarCell);

        return _possibleConstructorReturn(this, (SimpleSugarCell.__proto__ || Object.getPrototypeOf(SimpleSugarCell)).apply(this, arguments));
    }

    _createClass(SimpleSugarCell, [{
        key: "getLimits",
        value: function getLimits() {
            return { "reallyBad": 31, "bad": 18, "soso": 9, "good": 4.5 };
        }
    }]);

    return SimpleSugarCell;
}(SimpleNegative);

var SimpleSaturatedFatCell = function (_SimpleNegative4) {
    _inherits(SimpleSaturatedFatCell, _SimpleNegative4);

    function SimpleSaturatedFatCell() {
        _classCallCheck(this, SimpleSaturatedFatCell);

        return _possibleConstructorReturn(this, (SimpleSaturatedFatCell.__proto__ || Object.getPrototypeOf(SimpleSaturatedFatCell)).apply(this, arguments));
    }

    _createClass(SimpleSaturatedFatCell, [{
        key: "getLimits",
        value: function getLimits() {
            return { "reallyBad": 7, "bad": 4, "soso": 2, "good": 1 };
        }
    }]);

    return SimpleSaturatedFatCell;
}(SimpleNegative);

var SimpleSaltCell = function (_SimpleNegative5) {
    _inherits(SimpleSaltCell, _SimpleNegative5);

    function SimpleSaltCell() {
        _classCallCheck(this, SimpleSaltCell);

        return _possibleConstructorReturn(this, (SimpleSaltCell.__proto__ || Object.getPrototypeOf(SimpleSaltCell)).apply(this, arguments));
    }

    _createClass(SimpleSaltCell, [{
        key: "getLimits",
        value: function getLimits() {
            return { "reallyBad": 0.63, "bad": 0.36, "soso": 0.18, "good": 0.09 };
        }
    }]);

    return SimpleSaltCell;
}(SimpleNegative);