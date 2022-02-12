import React from 'react';
import { connect } from 'react-redux'; 
import 'font-awesome/css/font-awesome.min.css';
import './Search.css'

class search extends React.Component {
    state = {
        value: null
    }
    searchHandler = (e) => {
        this.setState({value : e.target.value});
    }
    submitHandler = (e) => {
        e.preventDefault();
        this.props.changeSearchValue(this.state.value);
        this.props.setLoadedFalse();
    }
    render () {
        return (
            <form className="search">
                <input type="text" placeholder="Type your search" onChange={this.searchHandler} />
                <button type="submit" onClick={this.submitHandler}>
                    Search
                </button>
            </form>
        );
    }
}   

const mapDispatchToProps = dispatch => {
    return {
        changeSearchValue: (value) => dispatch({type:"SEARCH", value}),
        setLoadedFalse: () => dispatch({type: "LOADED_COUNTRY_FALSE"})
    }
}
export default connect(null, mapDispatchToProps)(search)