class GraphTable extends React.Component {
    constructor(props) {
        super(props);
    }

    getAliments(list) {
        var items = [];
        for(const [key, value] of Object.entries(list)) {
            items.push(<GraphAliment key={key} items={value} type={key}/>);
        }
        return items;
    }

    render() {
        return (
            <div>
                {this.getAliments(this.props.aliments)}
            </div>
        );
    }
}

class GraphNutriscoreCell extends React.Component {
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

    getPoint(nutripoint) {
        return (nutripoint !== '') ? nutripoint : 25;
    }

    getSvg(points) {
        var scale = 20;
        var offsetLeft = 10;
        return (
        <svg height="20" width="800">
            <circle cx={(points*scale)+10*scale+offsetLeft} cy="12" r="6" stroke="black" strokeWidth="0" fill={this.state.color} />
            <rect x={10*scale} y="4" width="1" height="20" fill="#ddd" strokeWidth="0" />
            <rect x={13*scale} y="4" width="1" height="20" fill="#ddd" strokeWidth="0" />
            <rect x={21*scale} y="4" width="1" height="20" fill="#ddd" strokeWidth="0" />
            <rect x={29*scale} y="4" width="1" height="20" fill="#ddd" strokeWidth="0" />
        </svg>
        );
    }

    render() {
        return (
            <td className="simple-cell-nutriscore" style={{backgroundColor: 'white'}}>
                <span>{this.getSvg(this.getPoint(this.props.nutripoint))}</span>
            </td>
        );
    }
}

class GraphAliment extends React.Component {
    constructor(props) {
        super(props);
    }

    getRows(list) {
        var items = [];
        console.log(list);
        for(var key in list) {
            items.push(<GraphFoodRow key={key} food={list[key]}/>);
        }
        return items;
    }

    getCategory(type) {
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

    render() {
        return (
            <div>
                <div className="category" id={this.props.type+'-cat'}>{this.getCategory(this.props.type)}</div>
                <table className="graph-table">
                    <tbody>
                        {this.getRows(this.props.items)}
                    </tbody>
                </table>
            </div>
        );
    }
}

class GraphFoodRow extends React.Component {
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
        return (
            <tr onClick={this.border.bind(this)} className={this.state.active ? 'active' : ''}>
                <FoodTypeCell type={this.props.food.type}/>
                <td className="cell-name">{this.props.food.name}</td>
                <GraphNutriscoreCell nutriscore={nutriscore} nutripoint={nutripoint}/>
            </tr>
        );
    }
}
