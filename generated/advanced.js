var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FoodTypeCell = function (_React$Component) {
    _inherits(FoodTypeCell, _React$Component);

    function FoodTypeCell(props) {
        _classCallCheck(this, FoodTypeCell);

        // TODO mapping in separated class
        var _this = _possibleConstructorReturn(this, (FoodTypeCell.__proto__ || Object.getPrototypeOf(FoodTypeCell)).call(this, props));

        var typeColorMapping = {
            "yaourt": "#e17b7b",
            "fromage": "lemonchiffon",
            "plat cuisiné": "deeppink",
            "biscuits": "darkorange",
            "féculent": "gold",
            "légumes": "green",
            "viande": "crimson",
            "poisson": "darkturquoise",
            "boisson": "#89ff95",
            "pain": "#edae44",
            "apéro": "peru",
            "dessert": "#ffe548",
            "matières grasses": "#f9ff77",
            "soupe": "#e36031"
        };

        _this.state = { color: typeColorMapping[props.type] };
        return _this;
    }

    _createClass(FoodTypeCell, [{
        key: "render",
        value: function render() {
            return React.createElement("td", { className: "cell-food-type", style: { backgroundColor: this.state.color } });
        }
    }]);

    return FoodTypeCell;
}(React.Component);

var NutriscoreCell = function (_React$Component2) {
    _inherits(NutriscoreCell, _React$Component2);

    function NutriscoreCell(props) {
        _classCallCheck(this, NutriscoreCell);

        // TODO mapping in separated class
        var _this2 = _possibleConstructorReturn(this, (NutriscoreCell.__proto__ || Object.getPrototypeOf(NutriscoreCell)).call(this, props));

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

    _createClass(NutriscoreCell, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "td",
                { className: "cell-nutriscore", style: { backgroundColor: this.state.color } },
                this.props.nutriscore,
                this.props.nutripoint !== '' ? React.createElement(
                    "span",
                    null,
                    "(",
                    this.props.nutripoint,
                    ")"
                ) : false
            );
        }
    }]);

    return NutriscoreCell;
}(React.Component);

var NovaCell = function (_React$Component3) {
    _inherits(NovaCell, _React$Component3);

    function NovaCell(props) {
        _classCallCheck(this, NovaCell);

        // TODO mapping in separated class
        var _this3 = _possibleConstructorReturn(this, (NovaCell.__proto__ || Object.getPrototypeOf(NovaCell)).call(this, props));

        var novaColorMapping = {
            1: "#00AA00",
            2: "#FFCC00",
            3: "#FF6600",
            4: "#FF0000",
            5: "#E63E11"
        };

        _this3.state = { color: novaColorMapping[props.nova] };
        return _this3;
    }

    _createClass(NovaCell, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "td",
                { className: "cell-nova", style: { backgroundColor: this.state.color } },
                this.props.nova
            );
        }
    }]);

    return NovaCell;
}(React.Component);

var LabelCell = function (_React$Component4) {
    _inherits(LabelCell, _React$Component4);

    function LabelCell(props) {
        _classCallCheck(this, LabelCell);

        var _this4 = _possibleConstructorReturn(this, (LabelCell.__proto__ || Object.getPrototypeOf(LabelCell)).call(this, props));

        _this4.state = { bio: _this4.isBio(props.labels) };
        return _this4;
    }

    _createClass(LabelCell, [{
        key: "isBio",
        value: function isBio(labels) {
            return labels != undefined && (labels.includes('en:fr-bio-01') || labels.includes('en:fr-bio-10') || labels.includes('en:ab-agriculture-biologique'));
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "td",
                { className: "cell-labels", style: this.state.bio ? { backgroundColor: "#49d14b" } : {} },
                this.state.bio ? 'Bio' : ''
            );
        }
    }]);

    return LabelCell;
}(React.Component);

var OriginCell = function (_React$Component5) {
    _inherits(OriginCell, _React$Component5);

    function OriginCell(props) {
        _classCallCheck(this, OriginCell);

        return _possibleConstructorReturn(this, (OriginCell.__proto__ || Object.getPrototypeOf(OriginCell)).call(this, props));
    }

    _createClass(OriginCell, [{
        key: "getColorByOrigins",
        value: function getColorByOrigins(origins) {
            if (this.isFrance(origins) === true) {
                return "#49d14b";
            } else if (this.isFrance(origins) === false) {
                return "#ff684a";
            }
        }
    }, {
        key: "isFrance",
        value: function isFrance(origins) {
            if (origins != undefined && (origins.indexOf('France') != -1 || origins.indexOf('france') != -1)) {
                return true;
            } else if (origins != undefined && origins != '' && origins.indexOf('France') == -1 && origins.indexOf('france') == -1) {
                return false;
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "td",
                { className: "cell-origins", style: this.props.origins ? { backgroundColor: this.getColorByOrigins(this.props.origins) } : {} },
                this.isFrance(this.props.origins) ? 'France' : ''
            );
        }
    }]);

    return OriginCell;
}(React.Component);

var NutrimentCell = function (_React$Component6) {
    _inherits(NutrimentCell, _React$Component6);

    function NutrimentCell(props) {
        _classCallCheck(this, NutrimentCell);

        var _this6 = _possibleConstructorReturn(this, (NutrimentCell.__proto__ || Object.getPrototypeOf(NutrimentCell)).call(this, props));

        var value = isNaN(props.value) ? 0 : Math.round(props.value * 10) / 10;

        _this6.state = { value: value };
        return _this6;
    }

    _createClass(NutrimentCell, [{
        key: "getColorByValue",
        value: function getColorByValue(value) {
            switch (true) {
                case value > this.getLimits().bad:
                    return "#ff5b3b";
                case value > this.getLimits().soso:
                    return "#fca546";
                case value > this.getLimits().good:
                    return "#FEC107";
                default:
                    return "#49d14b";
            }
        }
    }, {
        key: "getLimits",
        value: function getLimits() {
            return { "bad": 50, "soso": 20, "good": 5 };
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "td",
                { className: "cell-nutriment" },
                React.createElement(
                    "span",
                    { className: "round", style: { backgroundColor: this.getColorByValue(this.state.value) } },
                    this.state.value
                )
            );
        }
    }]);

    return NutrimentCell;
}(React.Component);

var EnergyCell = function (_NutrimentCell) {
    _inherits(EnergyCell, _NutrimentCell);

    function EnergyCell() {
        _classCallCheck(this, EnergyCell);

        return _possibleConstructorReturn(this, (EnergyCell.__proto__ || Object.getPrototypeOf(EnergyCell)).apply(this, arguments));
    }

    _createClass(EnergyCell, [{
        key: "getLimits",
        value: function getLimits() {
            return { "bad": 400, "soso": 200, "good": 100 };
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "td",
                { className: "cell-energy", style: { backgroundColor: this.getColorByValue(this.state.value) } },
                this.props.value
            );
        }
    }]);

    return EnergyCell;
}(NutrimentCell);

var SugarCell = function (_NutrimentCell2) {
    _inherits(SugarCell, _NutrimentCell2);

    function SugarCell() {
        _classCallCheck(this, SugarCell);

        return _possibleConstructorReturn(this, (SugarCell.__proto__ || Object.getPrototypeOf(SugarCell)).apply(this, arguments));
    }

    _createClass(SugarCell, [{
        key: "getLimits",
        value: function getLimits() {
            return { "bad": 25, "soso": 8, "good": 4.2 };
        }
    }]);

    return SugarCell;
}(NutrimentCell);

var FatCell = function (_NutrimentCell3) {
    _inherits(FatCell, _NutrimentCell3);

    function FatCell() {
        _classCallCheck(this, FatCell);

        return _possibleConstructorReturn(this, (FatCell.__proto__ || Object.getPrototypeOf(FatCell)).apply(this, arguments));
    }

    _createClass(FatCell, [{
        key: "getLimits",
        value: function getLimits() {
            return { "bad": 30, "soso": 20, "good": 3 };
        }
    }]);

    return FatCell;
}(NutrimentCell);

var SaturatedFatCell = function (_NutrimentCell4) {
    _inherits(SaturatedFatCell, _NutrimentCell4);

    function SaturatedFatCell() {
        _classCallCheck(this, SaturatedFatCell);

        return _possibleConstructorReturn(this, (SaturatedFatCell.__proto__ || Object.getPrototypeOf(SaturatedFatCell)).apply(this, arguments));
    }

    _createClass(SaturatedFatCell, [{
        key: "getLimits",
        value: function getLimits() {
            return { "bad": 12, "soso": 5, "good": 1 };
        }
    }]);

    return SaturatedFatCell;
}(NutrimentCell);

var SaltCell = function (_NutrimentCell5) {
    _inherits(SaltCell, _NutrimentCell5);

    function SaltCell() {
        _classCallCheck(this, SaltCell);

        return _possibleConstructorReturn(this, (SaltCell.__proto__ || Object.getPrototypeOf(SaltCell)).apply(this, arguments));
    }

    _createClass(SaltCell, [{
        key: "getLimits",
        value: function getLimits() {
            return { "bad": 1.5, "soso": 1.5, "good": 0.3 };
        }
    }]);

    return SaltCell;
}(NutrimentCell);

var FruitsCell = function (_NutrimentCell6) {
    _inherits(FruitsCell, _NutrimentCell6);

    function FruitsCell(props) {
        _classCallCheck(this, FruitsCell);

        var _this12 = _possibleConstructorReturn(this, (FruitsCell.__proto__ || Object.getPrototypeOf(FruitsCell)).call(this, props));

        var value = isNaN(props.value) ? 0 : Math.round(props.value * 10) / 10;

        _this12.state = { value: value };
        return _this12;
    }

    _createClass(FruitsCell, [{
        key: "getColorByValue",
        value: function getColorByValue(value) {
            switch (true) {
                case value < this.getLimits().bad:
                    return "#ff5b3b";
                case value < this.getLimits().soso:
                    return "#fca546";
                case value < this.getLimits().good:
                    return "#FEC107";
                default:
                    return "#49d14b";
            }
        }
    }, {
        key: "getLimits",
        value: function getLimits() {
            return { "bad": 40, "soso": 60, "good": 80 };
        }
    }]);

    return FruitsCell;
}(NutrimentCell);

var FoodRow = function (_React$Component7) {
    _inherits(FoodRow, _React$Component7);

    function FoodRow(props) {
        _classCallCheck(this, FoodRow);

        return _possibleConstructorReturn(this, (FoodRow.__proto__ || Object.getPrototypeOf(FoodRow)).call(this, props));
    }

    _createClass(FoodRow, [{
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
                null,
                React.createElement(FoodTypeCell, { type: this.props.food.type }),
                React.createElement(
                    "td",
                    { className: "cell-name" },
                    this.props.food.name
                ),
                React.createElement(NutriscoreCell, { nutriscore: nutriscore, nutripoint: nutripoint }),
                React.createElement(NovaCell, { nova: this.props.food.nutriments['nova-group_100g'] }),
                React.createElement(LabelCell, { labels: this.props.food['labels_tags'] }),
                React.createElement(OriginCell, { origins: this.props.food.origins }),
                React.createElement(EnergyCell, { value: energy }),
                React.createElement(NutrimentCell, { value: this.props.food.nutriments['carbohydrates_100g'] }),
                React.createElement(SugarCell, { value: this.props.food.nutriments['sugars_100g'] }),
                React.createElement(FatCell, { value: this.props.food.nutriments['fat_100g'] }),
                React.createElement(SaturatedFatCell, { value: this.props.food.nutriments['saturated-fat_100g'] }),
                React.createElement(FruitsCell, { value: fruits }),
                React.createElement(
                    "td",
                    { className: "cell-proteins" },
                    this.props.food.nutriments['proteins_100g']
                ),
                React.createElement(
                    "td",
                    { className: "cell-fibres" },
                    fiber
                ),
                React.createElement(SaltCell, { value: this.props.food.nutriments['salt_100g'] })
            );
        }
    }]);

    return FoodRow;
}(React.Component);

var AdvancedTable = function (_React$Component8) {
    _inherits(AdvancedTable, _React$Component8);

    function AdvancedTable(props) {
        _classCallCheck(this, AdvancedTable);

        return _possibleConstructorReturn(this, (AdvancedTable.__proto__ || Object.getPrototypeOf(AdvancedTable)).call(this, props));
    }

    _createClass(AdvancedTable, [{
        key: "getRows",
        value: function getRows(list) {
            var items = [];
            for (var key in list) {
                items.push(React.createElement(FoodRow, { key: list[key], food: scores[list[key]] }));
            }
            return items;
        }
    }, {
        key: "render",
        value: function render() {
            console.log('render');
            return React.createElement(
                "table",
                null,
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
                            "Nova"
                        ),
                        React.createElement(
                            "td",
                            null,
                            "Labels"
                        ),
                        React.createElement(
                            "td",
                            null,
                            "Origine"
                        ),
                        React.createElement(
                            "td",
                            null,
                            "Energie (kcal)"
                        ),
                        React.createElement(
                            "td",
                            null,
                            "Glucides"
                        ),
                        React.createElement(
                            "td",
                            null,
                            "Sucres"
                        ),
                        React.createElement(
                            "td",
                            null,
                            "Mat grasses"
                        ),
                        React.createElement(
                            "td",
                            null,
                            "Ac. gr. satur\xE9s"
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
                        ),
                        React.createElement(
                            "td",
                            null,
                            "Sel"
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

    return AdvancedTable;
}(React.Component);