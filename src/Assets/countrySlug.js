import axios from 'axios';

let slugData = [];

axios.get('https://api.covid19api.com/countries')
    .then(response => {
        slugData = [...response.data];
    }).catch(err => {
        console.log(err);
    })


export { slugData };