'use strict';
var Swapi = require('../swapi');

Swapi.prototype.Species = function(page, search) {
  var _this = this;
  var parameters = {
    resource: '/species',
    page: page,
    search: search
  };

  var Specie = function(data) {
    for(var key in data) {
      if(data.hasOwnProperty(key)) {
        this[key] = data[key];
      }
    }
  };

  Specie.prototype.toString = function() {
    return this.name;
  };

  if(page) {
    return this.getList(Specie, parameters);
  }

  this.get = function(id) {
    if(typeof id === 'number') {
      parameters.id = id;
      return new Promise(function(resolve, reject) {
        _this.fetchData(parameters, Specie, function(error, data) {
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