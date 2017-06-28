## Swapi wrapper

This library is intended to be used as a node API to retrieve information from the exposed SWAPI REST API. The library could be easily extended with the use of the prototyping feature.

### Why node and how was the library structured

Node is stable and portable, to keep the things simple I decided to create this files with node.

The function invocation pattern that I used has the ability to have private functions and variables. Since the plugins shouldn't be allowed to change the url variable or some other methods, the patterns solves this issue.

Finally, modularization is something native in node, you can take advantage of the node modules system.

## Installation

Right now you just have to clone the directory in order to use the library. It would be better if this repository could be registered in the npm page so you just had to make an `npm install swapi-js`, for example.

## Installing plugins

Using the plugins is very straightforward. The only consideration to keep in mind is that the requirement of the library should be placed before the importation of the plugins.

```javascript
var Swapi = require('./lib/swapi');
require('./lib/plugins/people');
```

## Retrieve information from the API

The setup of the plugin related to the model that you want to retrieve is mandatory.

Once you have set the plugins, you can retrieve data using the plugin's method that is included. The first parameter is the number of the page. The second parameter is the search string.

```javascript
var swapi = new Swapi();
// Getting the first page of the Starships
swapi.Starships(1)
  .then(function(data) {
    console.log(data);
  })
  .catch(function(error){
  	console.log(error);
  });
  
// Searching for the Executor
swapi.Starships(1, 'Executor')
  .then(function(data) {
    console.log(data);
  })
  .catch(function(error){
  	console.log(error);
  });
```

The get method is useful to retrieve a single model by its id.

```javascript
swapi.Starships().get(15)
  .then(function(data) {
    console.log(data);
  })
  .catch(function(error){
    console.log(error);
  });
```

## Creating a plugin

Plugins have to be created using the prototype property. Every plugin has to have it's own model object in order to extend the functionalities of the single element from the list. You could include methods to one object (for example, create a function that makes calculations with the information of a planet).

The function receives two arguments, the number page and the search string. Those variables belongs to the parameter object that is used by the method `fetchData` in order to retrieve the information.

```javascript
Swapi.prototype.Starships = function(page, search) {
  var parameters = {
    resource: '/starships',
    page: page,
    search: search
  };
}
```

The object has to copy the attributes of the given javascript plain object (and you could omit the attributes that you want).

The next example is the declaration of the Starship object

```javascript
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
```

### Getting a list

Inside the function, a condition should be placed to know if a list should be retrieved by checking if the page variable has been set. 
```javascript
if(page) {
  return this.getList(Starship, parameters);
}
```


### Getting a single element

If one single element should be returned a method have to be added with the name of get and should receive an id as parameter. If the fetchData method checks that an id has been given is going to retrieve the single model. 

Since the control of the flow is given by Promises, the result of the method should be also a simple promise.

```javascript
   var this_ = this;
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
```