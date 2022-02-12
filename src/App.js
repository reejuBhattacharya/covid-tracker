import React from 'react';
import './App.css';
import GlobalCard from './Containers/GlobalCard/GlobalCard';
import CountryCard from './Containers/CountryCard/CountryCard';
import Search from './Components/Search/Search';
import { connect } from 'react-redux';
// import TotalChart from './Components/GlobalChart/TotalChart';
// import { slugData } from './Assets/countrySlug';
import List from './Components/List/List';

class App extends React.Component {
  render() {
    let countryCard = null;
    if (this.props.searchValue) {
      countryCard = <CountryCard />;
    }
    // console.log(slugData);
    return (
      <React.Fragment>
        <Search />
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <GlobalCard />
          {countryCard}
        </div >     
        <List />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchValue: state.searchValue
  }
}

export default connect(mapStateToProps)(App);
