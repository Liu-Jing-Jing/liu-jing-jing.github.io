alert("Hello World");
var modules;

  modules = {};

  window.requireFunc = function(path) {
    var exports, file, root;

    if (modules[path]) {
      return modules[path];
    }
    root = OSX.NSBundle.mainBundle.resourcePath + '/html/';
    file = OSX.NSString.stringWithContentsOfFile(root + "/" + path + ".js");
      
      console.log(file);
    exports = {};
    eval("(function(exports){" + file + "}).call(exports, exports);");
    modules[path] = exports;
    return modules[path];
  };
