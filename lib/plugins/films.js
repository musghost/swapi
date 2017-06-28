'use strict';
var Swapi = require('../swapi');

Swapi.prototype.Films = function(page, search) {
  var _this = this;
  var parameters = {
    resource: '/films',
    page: page,
    search: search
  };

  var Films = function(data) {
    for(var key in data) {
      if(data.hasOwnProperty(key)) {
        this[key] = data[key];
      }
    }
  };

  Films.prototype.toString = function() {
    return this.title;
  };

  if(page) {
    return this.getList(Films, parameters);
  }

  this.get = function(id) {
    if(typeof id === 'number') {
      parameters.id = id;
      return new Promise(function(resolve, reject) {
        _this.fetchData(parameters, Films, function(error, data) {
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