function onLoad() {
    var loader = ennj.require('test.TestLoader');

    var config = {
        width: 800,
        height: 500
    };

    ennj.main('canvas', 'test.Test', loader, config);
}
window.onload = onLoad;
