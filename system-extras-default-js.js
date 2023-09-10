(function (global) {
  const systemJSPrototype = global.System.constructor.prototype;

  const existingResolve = systemJSPrototype.resolve;

  const EXT = /\.[^/]+$/;

  systemJSPrototype.resolve = function (id, parentUrl) {
    if (id[0] === '.' && !EXT.test(id)) {
      return existingResolve.call(this, id + '.js', parentUrl)
    }
    return existingResolve.call(this, id, parentUrl);
  };
})(typeof self !== 'undefined' ? self : global);
