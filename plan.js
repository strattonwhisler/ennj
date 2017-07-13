var ennj = {
    // UUID.js
    uuidv4: function() {/* Generate UUIDv4 */},

    // Core.js
    version: 'ennj 1.0.0a',
    main: function(canvas, game, loader, config) {/* Start Game */},

    // Module.js
    _modules: {/* Stores Modules */
        'name': {
            instance: null,
            loader: function() {},
            name: 'name',
            requires: [/* Required Names */],
            ns: false
        }
    },
    module: function(name, requires, loader, ns) {/* Create Module */},
    require: function(name) {/* Loads Module */},

    // Loader.js
    _assets: {/* Stores Assets */
        'url': {
            type: 'image|sheet|sound|music|json',
            loaders: [/* Loader Ids */],
            loaded: false,
            value: null
        }
    },
    Loader: function() {/* Asyc Resource Manager */
        // Add several assets
        this.batch = function() {};
        // Add one asset
        this.addImage = function(url) {};
        this.addSheet = function(url) {};
        this.addSound = function(url) {};
        this.addMusic = function(url) {};
        this.addModule = function(url) {};
        this.addJson = function(url) {};
        // Load assets
        this.load = function() {};
        // Unload assets
        this.unload = function() {};
        // Callback for owner when done loading
        this.onDone = function(lamda) {};
    },

    // Image.js
    Image: function(url) {/* Creates Image Asset */
        this.loaded = false;

        this.load = function(success, error) {};
        this.unload = function() {};
    },

    // Sheet.js
    Sheet: function(url) {/* Creates Sheet Asset */
        this.loaded = false;

        this.load = function(success, error) {};
        this.unload = function() {};
    },

    // Sound.js
    Sound: function(url) {/* Creates Sound Asset */
        this.loaded = false;

        this.load = function(success, error) {};
        this.unload = function() {};
    },

    // Audio.js
    Audio: function(url) {/* Creates Audio Asset */
        this.loaded = false;

        this.load = function(success, error) {};
        this.unload = function() {};
    },

    // Game.js
    Game: function() {/* Game Interface */
        this.init = function() {};
        this.update = function(delta) {};
        this.draw = function(ctx) {};
        this.drawUi = function(ctx) {};
        this.destroy = function() {};
    },

    // State.js
    State: function() {/* State Interface */
        this.init = function() {};
        this.enter = function() {};
        this.update = function(delta) {};
        this.draw = function(ctx) {};
        this.drawUi = function(ctx) {};
        this.exit = function() {};
        this.destroy = function() {};
    },

    // Input.js
    Input: function() {/* Input manager */
        // Called to update events
        this.update = function(delta) {};
        // 60x per second binds
        this.bind = function(name, action) {};
        this.unbind = function(name, action) {};
        // Once on start
        this.bindDown = function(name, action) {};
        this.unbindDown = function(name, action) {};
        // Once on end
        this.bindUp = function(name, action) {};
        this.unbindUp = function(name, action) {};
        // all
        this.unbindAll = function() {};
        // Callback for event name
        this.on = function(name, lamda) {};
    },

    // Logger.js
    Logger: function() {
        this.levels = {
            all: 0,
            none: 0,
            debug: 0,
            info: 0,
            notice: 0,
            warning: 0,
            error: 0,
            critical: 0
        };

        this.setLevel = function() {};
        this.debug = function() {};
        this.info = function() {};
        this.notice = function() {};
        this.warning = function() {};
        this.error = function() {};
        this.critical = function() {};
    },
};
