'use strict';
var Swapi = require('../swapi');

Swapi.prototype.People = function(page, search) {
  var _this = this;
  var parameters = {
    resource: '/people'
  };

  var Person = function(data) {
    for(var key in data) {
      if(data.hasOwnProperty(key)) {
        this[key] = data[key];
      }
    }
  };

  Person.prototype.toString = function() {
    return this.name;
  };

  if(typeof page === 'number') {
    return new Promise(function(resolve, reject) {
      
      if(page > 0) {
        parameters.page = page;
      } else {
        parameters.page = 1;
      }
      if(typeof search === 'string') {
        parameters.search = search;
      }
      _this.fetchData(parameters, Person, function(error, data) {
        if(error) {
          return reject(error);
        }
        resolve(data);
      });
    });
  }

  this.get = function(id) {
    if(typeof id === 'number') {
      return new Promise(function(resolve, reject) {
        parameters.id = id;
        _this.fetchData(parameters, Person, function(error, data) {
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