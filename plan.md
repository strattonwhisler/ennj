# Functions and Modules
## Core
* 🗷 ennj.main
* 🗹 ennj.module
* 🗹 ennj.require
* 🗹 ennj.Class

## App
* 🗹 ennj.Game
* 🗷 ennj.State

## Asset
* 🗷 ennj.Loader
* 🗷 ennj.Image
* 🗷 ennj.ImageSheet
* 🗷 ennj.Sound
* 🗷 ennj.Music
* 🗷 ennj.Map

## Scene
* 🗷 ennj.Scene
* 🗷 ennj.Node
* 🗷 ennj.Entity
* 🗷 ennj.Camera

## Components
* 🗷 ennj.Animation

## Math
* 🗹 ennj.Vector

# code
## Module
```javascript
ennj.module('MODULE', ['MODULE1', 'MODULE2'], function(MODULE1, MODULE2) {
    'use-strict';

    // Define module stuff

    // Use a return statement
});
```

Here are some ways to return the module
```javascript
// Module is a Class
return CLASS;

// Module is a Singleton
return new CLASS();

// Module is a Namespace
return {
    ITEM: VALUE
};
```

## Class
```javascript
var PRIVATE = 1;

function CLASS() {
    this.PUBLIC = 1;
}

PARENT.extend(CLASS, {
    FUNCTION: FUNCTION
});

function FUNCTION() {

}
```
