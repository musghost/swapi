var Swapi = require('./lib/swapi');
require('./lib/plugins/people');

var swapi = new Swapi();

swapi.People(1, 'Skywalker')
  .then(function(data) {
    console.log(data);
  })
  .catch(function(error){
  	console.log(error);
  });

swapi.People(1, 'Skywalker')
  .then(function(data) {
    console.log(data[0].toString());
  })
  .catch(function(error){
    console.log(error.data);
  });

swapi.People().get(2)
  .then(function(data) {
    console.log(data.toString());
  })
  .catch(function(error){
    console.log(error.data);
  });