class SimpleTable extends React.Component {
    constructor(props) {
        super(props);
    }

    getRows(list) {
        var items = [];
        for(var key in list) {
            items.push(<SimpleFoodRow key={list[key]} food={scores[list[key]]}/>);
        }
        return items;
    }

    render() {
        return (
            <table className="simple-table">
                <thead>
                <tr>
                    <td>Type</td>
                    <td>Nom</td>
                    <td>Nutriscore</td>
                    <td>Energie</td>
                    <td>Sucres</td>
                    <td>Ac. gr. sat.</td>
                    <td>Sel</td>
                    <td>Fruit/Légum.</td>
                    <td>Protéines</td>
                    <td>Fibres alim.</td>
                </tr>
                </thead>
                <tbody>
                    {this.getRows(this.props.items)}
                </tbody>
            </table>
        );
    }
}

class SimpleNutriscoreCell extends React.Component {
    constructor(props) {
        super(props);

        // TODO mapping in separated class
        var nutriscoreColorMapping = {
            "A": "#038141",
            "B": "#85BB2F",
            "C": "#FECB02",
            "D": "#EE8100",
            "E": "#E63E11",
        };

        this.state = {color: nutriscoreColorMapping[props.nutriscore]};
    }

    getPlusOrMinus(nutripoint) {
        if ([-15, -14, -13, -12, -11, -10, 0, 3, 4, 11, 12, 19, 20, 21].includes(nutripoint)) {
            return '+';
        }
        if ([-5, -4, -3, -2, -1, 2, 9, 10, 17, 18].includes(nutripoint) || nutripoint > 25) {
            return '-';
        }
    }

    render() {
        return (
            <td className="simple-cell-nutriscore" style={{backgroundColor: this.state.color}}>
                {this.props.nutriscore}
                {this.props.nutripoint !== '' ? <span>{this.getPlusOrMinus(this.props.nutripoint)}</span> : false}
            </td>
        );
    }
}

class SimpleFoodRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {active:false};
    }

    border() {
        this.setState((state) => ({active: !state.active}));
    }

    render() {
        var food = this.props.food;
        var nutriscore = food.nutriscore.toUpperCase();
        var nutripoint = (food.nutriscore_data !== undefined) ? food.nutriscore_data.score : '';
        var fruits = (food.nutriscore_data != undefined) ? food.nutriscore_data['fruits_vegetables_nuts_colza_walnut_olive_oils'] : food.nutriments['fruits-estimate_100g'];
        var energy = (food.nutriments['energy-kcal_value']) ? food.nutriments['energy-kcal_value'] : Math.round(food.nutriments["energy-kj_100g"] / 4.184);
        var fiber = (food.nutriments['fiber_100g'] != undefined) ? food.nutriments['fiber_100g'] : '-';
        return (
            <tr onClick={this.border.bind(this)} className={this.state.active ? 'active' : ''}>
                <FoodTypeCell type={this.props.food.type}/>
                <td className="cell-name">{this.props.food.name}</td>
                <SimpleNutriscoreCell nutriscore={nutriscore} nutripoint={nutripoint}/>
                <SimpleEnergyCell value={energy}/>
                <SimpleSugarCell value={this.props.food.nutriments['sugars_100g']}/>
                <SimpleSaturatedFatCell value={this.props.food.nutriments['saturated-fat_100g']}/>
                <SimpleSaltCell value={this.props.food.nutriments['salt_100g']}/>
                <SimpleFruitsCell value={fruits}/>
                <SimpleProteinsCell value={this.props.food.nutriments['proteins_100g']}/>
                <SimpleFibersCell value={fiber}/>
            </tr>
        );
    }
}

class SimpleNegative extends React.Component {
    constructor(props) {
        super(props);

        var value = (isNaN(props.value)) ? 0 : Math.round(props.value*10)/10;

        this.state = {value: value};
    }

    getColorByValue(value) {
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

    getLimits() {
        return {"reallyBad": 100, "bad": 50, "soso": 20, "good": 5, "reallyGood": 10};
    }

    render() {
        return (
            <td className='cell-simple-negative' style={{backgroundColor: this.getColorByValue(this.state.value)}}></td>
        );
    }
}

class SimplePositive extends SimpleNegative {
    getColorByValue(value) {
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
}

class SimpleFruitsCell extends SimplePositive {
    getLimits() {
        return {"reallyBad": 20, "bad": 40, "soso": 60, "good": 80};
    }
}

class SimpleProteinsCell extends SimplePositive {
    getLimits() {
        return {"reallyBad": 1.6, "bad": 3.2, "soso": 4.8, "good": 6.4};
    }
}

class SimpleFibersCell extends SimplePositive {
    getLimits() {
        return {"reallyBad": 0.9, "bad": 1.9, "soso": 2.8, "good": 3.7};
    }
}

class SimpleEnergyCell extends SimpleNegative {
    getLimits() {
        return {"reallyBad": 560, "bad": 320, "soso": 160, "good": 80};
    }
}

class SimpleSugarCell extends SimpleNegative {
    getLimits() {
        return {"reallyBad": 31, "bad": 18, "soso": 9, "good": 4.5};
    }
}

class SimpleSaturatedFatCell extends SimpleNegative {
    getLimits() {
        return {"reallyBad": 7, "bad": 4, "soso": 2, "good": 1};
    }
}

class SimpleSaltCell extends SimpleNegative {
    getLimits() {
        return {"reallyBad": 0.63, "bad": 0.36, "soso": 0.18, "good": 0.09};
    }
}
