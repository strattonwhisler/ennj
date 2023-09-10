(function(global) {
  var systemJSPrototype = global.System.constructor.prototype;

  var moduleTypesRegEx = /^[^#?]+\.(glsl)([?#].*)?$/;
  var _shouldFetch = systemJSPrototype.shouldFetch.bind(systemJSPrototype)
  systemJSPrototype.shouldFetch = function (url) {
    return _shouldFetch(url) || moduleTypesRegEx.test(url);
  };

  var glslContentType = /^application\/octet-stream(;|$)/;

  var fetch = systemJSPrototype.fetch;
  systemJSPrototype.fetch = function (url, options) {
    return fetch(url, options)
      .then(function (res) {
        if (options.passThrough)
          return res;

        if (!res.ok)
          return res;
        var contentType = res.headers.get('content-type');
        if (glslContentType.test(contentType))
          return res.text()
            .then(function (text) {
              return new Response(new Blob([
                'System.register([],function(e){return{execute:function(){e("default",`' + text + '`)}}})'
              ], {
                type: 'application/javascript'
              }));
            });
        return res;
      });
  };
})(typeof self !== 'undefined' ? self : global);
