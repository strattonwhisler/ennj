function onLoad() {
    var config = {
        width: 800,
        height: 500
    };

    ennj.main('canvas', 'test.Test', 'test.TestLoader', config);
}
window.onload = onLoad;
