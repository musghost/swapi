'use strict';
var Swapi = require('../swapi');

Swapi.prototype.Starships = function(page, search) {
  var _this = this;
  var parameters = {
    resource: '/starships',
    page: page,
    search: search
  };

  var Starship = function(data) {
    for(var key in data) {
      if(data.hasOwnProperty(key)) {
        this[key] = data[key];
      }
    }
  };

  Starship.prototype.toString = function() {
    return this.name;
  };

  if(page) {
    return this.getList(Starship, parameters);
  }

  this.get = function(id) {
    if(typeof id === 'number') {
      parameters.id = id;
      return new Promise(function(resolve, reject) {
        _this.fetchData(parameters, Starship, function(error, data) {
          if(error) {
            return reject(error);
          }
          resolve(data);
        });
      });
    } else {
      throw new Error('The id should be a number');
    }
  }

  return this;
  
}