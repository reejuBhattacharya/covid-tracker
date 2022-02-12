import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './CountryCard.css';

class CountryCard extends React.Component {
    componentDidMount() {
        axios.get('https://api.covid19api.com/summary')
            .then(response => {
                // console.log(response.data.Countries);
                let cnt = null;
                response.data.Countries.forEach(item => {
                    if(item.Country.toLowerCase() === this.props.search.toLowerCase() )
                        cnt=item;
                })
                this.props.setCountry(cnt);           
                this.props.setLoaded();   
            }).catch(err => {
                console.log(err);
            })
    }
    componentDidUpdate() {
        if(!this.props.ld) {
        axios.get('https://api.covid19api.com/summary')
            .then(response => {
                // console.log(response.data.Countries);
                let cnt = null;
                response.data.Countries.forEach(item => {
                    if(item.Country.toLowerCase() === this.props.search.toLowerCase() )
                        cnt=item;
                })
                this.props.setCountry(cnt);           
                this.props.setLoaded();   
            }).catch(err => {
                console.log(err);
            })
        }
    }
    render() {
        let display = <h1>Loading...</h1>
        if (this.props.ld) {
            display = (
                <React.Fragment>
                    <h2>{this.props.country.Country}</h2>
                    <div className="stats">
                        <span>Cases Today:</span>
                        <span>{this.props.country.NewConfirmed.toLocaleString()}</span>
                    </div>
                    <div className="stats">
                        <span>Total Cases:</span>
                        <span>{this.props.country.TotalConfirmed.toLocaleString()}</span>
                    </div>
                    <div className="stats">
                        <span>New Deaths:</span>
                        <span>{this.props.country.NewDeaths.toLocaleString()}</span>
                    </div>
                    <div className="stats">
                        <span>Total Deaths:</span>
                        <span>{this.props.country.TotalDeaths.toLocaleString()}</span>
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
        ld: state.loadedCountry,
        country: state.country_data,
        search: state.searchValue
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLoaded: () => dispatch({ type: 'LOADED_COUNTRY_TRUE' }),
        setCountry: (value) => dispatch({ type: 'SET_COUNTRY', value }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryCard);
