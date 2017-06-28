'use strict';
var Swapi = require('../swapi');

Swapi.prototype.Planets = function(page, search) {
  var _this = this;
  var parameters = {
    resource: '/planets',
    page: page,
    search: search
  };

  var Planets = function(data) {
    for(var key in data) {
      if(data.hasOwnProperty(key)) {
        this[key] = data[key];
      }
    }
  };

  Planets.prototype.toString = function() {
    return this.name + ', with: ' +  this.terrain;
  };

  if(page) {
    return this.getList(Planets, parameters);
  }

  this.get = function(id) {
    if(typeof id === 'number') {
      parameters.id = id;
      return new Promise(function(resolve, reject) {
        _this.fetchData(parameters, Planets, function(error, data) {
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