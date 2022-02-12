import React from 'react';
import { Line } from 'react-chartjs-2';
import { slugData } from '../../Assets/countrySlug';
import axios from 'axios';
import { connect } from 'react-redux';

const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

const state = {
    labels: [],
    datasets: [
        {
            fill: false,
            pointRadius: 0,
            pointHoverRadius: 0,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: []
        }
    ]
}

const totalChart = props => {
    let slug = null;
    let graph = <div>Loading....</div>
    if (props.search && !props.loaded) {
        slugData.forEach(item => {
            if (item.Country.toLowerCase() === props.search.toLowerCase()) {
                slug = item.Slug;
            }
        })
        axios.get(`https://api.covid19api.com/country/${slug}/status/confirmed?from=2020-03-01T00:00:00Z&to=${(new Date).toISOString().slice(0, 10)}T00:00:00Z`)
            .then(response => {
                response.data.forEach(item => {
                    state.datasets[0].data.push(item.Cases);
                    state.labels.push(months[(new Date(item.Date)).getMonth()]);
                })
                console.log(state.labels, state.datasets[0].data);
                props.graphLoaded();
            }).catch(err => {
                console.log(err);
            })
    }
    if (props.loaded) {
        graph = <div style={{width: '50%', margin: '0 auto'}}>
            <Line data={state} />
        </div>
    }
    return (
        <React.Fragment>{graph}</React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        search: state.searchValue,
        loaded: state.totalGraphLoaded
    }
}

const mapDispatchToProps = dispatch => {
    return {
        graphLoaded: () => dispatch({type: 'TOTAL_GRAPH_LOADED'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(totalChart);