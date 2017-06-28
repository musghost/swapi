'use strict';
var Swapi = require('../swapi');

Swapi.prototype.Vehicles = function(page, search) {
  var _this = this;
  var parameters = {
    resource: '/vehicles',
    page: page,
    search: search
  };

  var Vehicle = function(data) {
    for(var key in data) {
      if(data.hasOwnProperty(key)) {
        this[key] = data[key];
      }
    }
  };

  Vehicle.prototype.toString = function() {
    return this.name;
  };

  if(page) {
    return this.getList(Vehicle, parameters);
  }

  this.get = function(id) {
    if(typeof id === 'number') {
      parameters.id = id;
      return new Promise(function(resolve, reject) {
        _this.fetchData(parameters, Vehicle, function(error, data) {
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