'use strict';
var axios = require('axios');

var Swapi = function() {
  var baseURL = 'http://swapi.co/api';
  var Scheme = Object;

  this.fetchData = function(parameters, Obj, callback) {
    if(Obj) {
      Scheme = Obj;
    }

    axios
      .get(baseURL + buildQuery(parameters))
      .then(function(response) {
        callback(null, parseInformation(response.data));
      })
      .catch(function(error) {
        callback(error.response);
      });
  }

  this.generic

  function mapScheme(scheme) {
    for(var key in scheme) {
      if(scheme.hasOwnProperty(key) && typeof scheme[key] === 'object' && typeof scheme[key].length !== 'undefined') {
        for (var i = scheme[key].length - 1; i >= 0; i--) {
          var url = scheme[key][i];
          scheme[key][i] = url.split('/').splice(-2, 1)[0];
        }
      }
    }
    return new Scheme(scheme);
  }

  function buildQuery(parameters) {
    var search = '';
    if(parameters.id) {
      return parameters.resource + '/' + parameters.id;
    } else {
      if(parameters.search) {
        search = '&search=' + parameters.search;
      }
      return parameters.resource + '?page=' + parameters.page + search;
    }
  }

  function mapArray(array) {
    return array.map(function(obj) {
      return mapScheme(obj);
    });
  }

  function parseInformation(obj) {
    if(typeof obj.results === 'object') {
      return mapArray(obj.results);
    } else {
      return mapScheme(obj);
    }
  }
};


module.exports = Swapi;