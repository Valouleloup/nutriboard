class FoodTypeCell extends React.Component {
    constructor(props) {
        super(props);

        // TODO mapping in separated class
        var typeColorMapping = {
            "yaourt": "#f28f8f",
            "fromage": "#f2e2a0",
            "plat cuisiné": "#ff7ac2",
            "biscuits": "#ffba65",
            "féculent": "#ffd075",
            "légumes": "green",
            "viande": "#d9505c",
            "poisson": "#78dfd1",
            "boisson": "#95e89d",
            "pain": "#ffbf7b",
            "apéro": "peru",
            "dessert": "#fed78c",
            "matières grasses": "#5d8f53",
            "soupe" : "#f25767"
        };

        this.state = {color: typeColorMapping[props.type]};
    }

    render() {
        return (
            <td className="cell-food-type" style={{backgroundColor: this.state.color}}></td>
        );
    }
}

class NutriscoreCell extends React.Component {
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

    render() {
        return (
            <td className="cell-nutriscore" style={{backgroundColor: this.state.color}}>
                {this.props.nutriscore}
                {this.props.nutripoint !== '' ? <span>({this.props.nutripoint})</span> : false}
            </td>
        );
    }
}

class NovaCell extends React.Component {
    constructor(props) {
        super(props);

        // TODO mapping in separated class
        var novaColorMapping = {
            1: "#00AA00",
            2: "#FFCC00",
            3: "#FF6600",
            4: "#FF0000",
            5: "#E63E11",
        };

        this.state = {color: novaColorMapping[props.nova]};
    }

    render() {
        return (
            <td className="cell-nova" style={{backgroundColor: this.state.color}}>{this.props.nova}</td>
        );
    }
}

class LabelCell extends React.Component {
    constructor(props) {
        super(props);

        this.state = {bio: this.isBio(props.labels)};
    }

    isBio(labels) {
        return labels != undefined && (labels.includes('en:fr-bio-01') || labels.includes('en:fr-bio-10') || labels.includes('en:ab-agriculture-biologique'));
    }

    render() {
        return (
            <td className='cell-labels' style={this.state.bio ? {backgroundColor:"#49d14b"}: {}}>{this.state.bio ? 'Bio': ''}</td>
        );
    }
}

class OriginCell extends React.Component {
    constructor(props) {
        super(props);
    }

    getColorByOrigins(origins) {
        if (this.isFrance(origins) === true) {
            return "#49d14b";
        } else if (this.isFrance(origins) === false) {
            return "#ff684a";
        }
    }

    isFrance(origins) {
        if (origins != undefined && (origins.indexOf('France') != -1 || origins.indexOf('france') != -1)) {
            return true;
        } else if ((origins != undefined && origins != '') && (origins.indexOf('France') == -1 && origins.indexOf('france') == -1)) {
            return false;
        }
    }

    render() {
        return (
            <td className='cell-origins' style={this.props.origins ? {backgroundColor: this.getColorByOrigins(this.props.origins)}: {}}>
                {this.isFrance(this.props.origins) ? 'France' : ''}
            </td>
        );
    }
}

class NutrimentCell extends React.Component {
    constructor(props) {
        super(props);

        var value = (isNaN(props.value)) ? 0 : Math.round(props.value*10)/10;

        this.state = {value: value};
    }

    getColorByValue(value) {
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

    getLimits() {
        return {"bad": 50, "soso": 20, "good": 5};
    }

    render() {
        return (
            <td className='cell-nutriment'>
                <span className="round" style={{backgroundColor: this.getColorByValue(this.state.value)}}>{this.state.value}</span>
            </td>
        );
    }
}

class EnergyCell extends NutrimentCell {
    getLimits() {
        return {"bad": 400, "soso": 200, "good": 100};
    }

    render() {
        return (
            <td className='cell-energy' style={{backgroundColor: this.getColorByValue(this.state.value)}}>{this.props.value}</td>
        );
    }
}

class SugarCell extends NutrimentCell {
    getLimits() {
        return {"bad": 25, "soso": 8, "good": 4.2};
    }
}

class FatCell extends NutrimentCell {
    getLimits() {
        return {"bad": 30, "soso": 20, "good": 3};
    }
}

class SaturatedFatCell extends NutrimentCell {
    getLimits() {
        return {"bad": 12, "soso": 5, "good": 1};
    }
}

class SaltCell extends NutrimentCell {
    getLimits() {
        return {"bad": 1.5, "soso": 1.5, "good": 0.3};
    }
}

class FruitsCell extends NutrimentCell {
    constructor(props) {
        super(props);

        var value = (isNaN(props.value)) ? 0 : Math.round(props.value*10)/10;

        this.state = {value: value};
    }

    getColorByValue(value) {
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

    getLimits() {
        return {"bad": 40, "soso": 60, "good": 80};
    }
}

class FoodRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var food = this.props.food;
        var nutriscore = food.nutriscore.toUpperCase();
        var nutripoint = (food.nutriscore_data !== undefined) ? food.nutriscore_data.score : '';
        var fruits = (food.nutriscore_data != undefined) ? food.nutriscore_data['fruits_vegetables_nuts_colza_walnut_olive_oils'] : food.nutriments['fruits-estimate_100g'];
        var energy = (food.nutriments['energy-kcal_value']) ? food.nutriments['energy-kcal_value'] : Math.round(food.nutriments["energy-kj_100g"] / 4.184);
        var fiber = (food.nutriments['fiber_100g'] != undefined) ? food.nutriments['fiber_100g'] : '-';
        return (
            <tr>
                <FoodTypeCell type={this.props.food.type}/>
                <td className="cell-name">{this.props.food.name}</td>
                <NutriscoreCell nutriscore={nutriscore} nutripoint={nutripoint}/>
                <NovaCell nova={this.props.food.nutriments['nova-group_100g']}/>
                <LabelCell labels={this.props.food['labels_tags']}/>
                <OriginCell origins={this.props.food.origins}/>
                <EnergyCell value={energy}/>
                <NutrimentCell value={this.props.food.nutriments['carbohydrates_100g']}/>
                <SugarCell value={this.props.food.nutriments['sugars_100g']}/>
                <FatCell value={this.props.food.nutriments['fat_100g']}/>
                <SaturatedFatCell value={this.props.food.nutriments['saturated-fat_100g']}/>
                <FruitsCell value={fruits}/>
                <td className="cell-proteins">{this.props.food.nutriments['proteins_100g']}</td>
                <td className="cell-fibres">{fiber}</td>
                <SaltCell value={this.props.food.nutriments['salt_100g']}/>
            </tr>
        );
    }
}

class AdvancedTable extends React.Component {
    constructor(props) {
        super(props);
    }

    getRows(list) {
        var items = [];
        for(var key in list) {
            items.push(<FoodRow key={list[key]} food={scores[list[key]]}/>);
        }
        return items;
    }

    render() {
        console.log('render');
        return (
            <table>
                <thead>
                <tr>
                    <td>Type</td>
                    <td>Nom</td>
                    <td>Nutriscore</td>
                    <td>Nova</td>
                    <td>Labels</td>
                    <td>Origine</td>
                    <td>Energie (kcal)</td>
                    <td>Glucides</td>
                    <td>Sucres</td>
                    <td>Mat grasses</td>
                    <td>Ac. gr. saturés</td>
                    <td>Fruit/Légum.</td>
                    <td>Protéines</td>
                    <td>Fibres alim.</td>
                    <td>Sel</td>
                </tr>
                </thead>
                <tbody>
                {this.getRows(this.props.items)}
                </tbody>
            </table>
        );
    }
}
