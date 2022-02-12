import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './GlobalCard.css';

class GlobalCard extends React.Component {
    componentDidMount() {
        axios.get('https://api.covid19api.com/summary')
            .then(response => {
                console.log(response);
                this.props.setGlobal(response.data.Global);
                this.props.setLoaded();
            }).catch(err => {
                console.log(err);
            })
    }
    render() {
        let display = <h1>Loading...</h1>
        if (this.props.ld) {
            display = (
                <React.Fragment>
                    <h2>Global</h2>
                    <div className="stats">
                        <span>Cases Today:</span>
                        <span>{this.props.global.NewConfirmed.toLocaleString()}</span>
                    </div>
                    <div className="stats">
                        <span>Total Cases:</span>
                        <span>{this.props.global.TotalConfirmed.toLocaleString()}</span>
                    </div>
                    <div className="stats">
                        <span>Total Deaths:</span>
                        <span>{this.props.global.TotalDeaths.toLocaleString()}</span>
                    </div>
                    <div className="stats">
                        <span>New Deaths:</span>
                        <span>{this.props.global.NewDeaths.toLocaleString()}</span>
                    </div>
                </React.Fragment>
            );
        }
        return (
            <div className="card">{display}</div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ld: state.loadedGlobal,
        global: state.global_data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLoaded: () => dispatch({ type: 'LOADED_GLOBAL_TRUE' }),
        setGlobal: (value) => dispatch({ type: 'SET_GLOBAL', value })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalCard);