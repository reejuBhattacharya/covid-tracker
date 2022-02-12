import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './List.css';

class List extends React.Component {
    componentDidMount() {
        axios.get('https://api.covid19api.com/summary')
        .then(response => {
            let myList = response.data.Countries;
            myList.sort((a, b) => {
                return (b.TotalConfirmed - a.TotalConfirmed);
            });
            this.props.setList(myList);
            this.props.setListLoaded();
        }).catch(err => {
            console.log(err);
        });
    }
    render() {
    let displayList = <h1>Loading...</h1>
    console.log(this.props.list);
    if(this.props.loaded) {
        displayList = this.props.list.map(item => {
            return (
                <tr className="list" key={item.CountryCode}>
                    <td className="cell country">
                        {item.Country}
                    </td>
                    <td className="cell">
                        {item.TotalConfirmed.toLocaleString()}
                    </td>
                    <td className="cell">
                        {item.TotalDeaths.toLocaleString()}
                    </td>
                </tr>
            );
        })
    }
    return (
            <table style={{width: "70%", margin: '0 auto'}}>
                <tr>
                    <th>Country</th>
                    <th>Total Confirmed</th>
                    <th>Total Deaths</th>
                </tr>
                {displayList}
            </table>
    );

    }
    
}

const mapStateToProps = state => {
    return {
        loaded: state.listLoaded,
        list: state.list
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setListLoaded: () => dispatch({type: 'LIST_LOADED'}),
        setList: (value) => dispatch({type: 'SET_LIST', value})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);