import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://calorieninjas.p.rapidapi.com/v1/nutrition',
  params: {query: 'tomato'},
  dataType: "json",
  headers: {
    'x-rapidapi-host': 'calorieninjas.p.rapidapi.com',
    'x-rapidapi-key': 'd1a9325936msh0179d332e5deb83p179947jsn6228ebb26b02'
  }
};

axios.request(options).then(function (response) {
	console.log(results.concat(response.data));
}).catch(function (error) {
	console.error(error);
});