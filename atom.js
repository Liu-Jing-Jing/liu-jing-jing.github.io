//https://www.zhihu.com/question/46428964/answer/109377533

// Mode.js
(function() {
  var _, ace, modeForLanguage, modeMap, setMode;

  _ = require('underscore');

  ace = require('editor').ace;

  modeMap = {
    js: 'javascript',
    c: 'c_cpp',
    cpp: 'c_cpp',
    h: 'c_cpp',
    m: 'c_cpp',
    md: 'markdown',
    cs: 'csharp'
  };

  modeForLanguage = function(language) {
    var e, modeName;
    console.log("modeForLanguage(" + language + ")");
    language = language.toLowerCase();
    modeName = modeMap[language] || language;
    console.log("modeName: " + modeName);
    try {
      return require("ace/mode/" + modeName).Mode;
    } catch (error) {
      e = error;
      return null;
    }
  };

  setMode = function(arg) {
    var filename, mode;
    filename = arg.filename;
    console.log("setMode(" + filename + ")");
    if (mode = modeForLanguage(_.last(filename.split('.')))) {
      console.dir(mode);
      return ace.getSession().setMode(new mode);
    }
  };

  exports.init = function() {
    ace.on('open', setMode);
    return ace.on('save', setMode);
  };

  exports.modeMap = modeMap;

}).call(this);


// project.js
(function() {
  var Modes;

  exports.Modes = Modes = require('modes/modes');

  Modes.init();

}).call(this);



// Generated by CoffeeScript 1.12.7
(function() {
  var $, Chrome, Dir, Editor, File, Process, _, bindKey, ref;

  $ = require('jquery');

  _ = require('underscore');

  ref = require('osx'), Chrome = ref.Chrome, Dir = ref.Dir, File = ref.File, Process = ref.Process;

  Editor = require('editor');

  bindKey = Editor.bindKey;

  exports.init = function() {
    this.html = require("project/project.html");
    bindKey('toggleProjectDrawer', 'Command-Ctrl-N', (function(_this) {
      return function(env) {
        return _this.toggle();
      };
    })(this));
    Editor.ace.on('open', (function(_this) {
      return function() {
        if ((_this.dir != null) && Process.cwd() !== _this.dir) {
          return _this.reload();
        }
      };
    })(this));
    $('#project .cwd').live('click', (function(_this) {
      return function(event) {
        return Editor.open(_this.dir.replace(_.last(_this.dir.split('/')), ''));
      };
    })(this));
    return $('#project li').live('click', (function(_this) {
      return function(event) {
        var el, path;
        $('#project .active').removeClass('active');
        el = $(event.currentTarget);
        el.addClass('active');
        path = decodeURIComponent(el.attr('path'));
        return Editor.open(path);
      };
    })(this));
  };

  exports.toggle = function() {
    if (this.showing) {
      $('#project').parent().remove();
    } else {
      Chrome.addPane('left', this.html);
      this.reload();
    }
    return this.showing = !this.showing;
  };

  exports.reload = function() {
    var dir, files, listItems;
    this.dir = dir = Process.cwd();
    $('#project .cwd').text(_.last(dir.split('/')));
    $('#project li').remove();
    files = Dir.list(dir);
    listItems = _.map(files, function(path) {
      var filename, type;
      filename = path.replace(dir, "").substring(1);
      type = Dir.isDir(path) ? 'dir' : 'file';
      return "<li class='" + type + "' path='" + (encodeURIComponent(path)) + "'>" + filename + "</li>";
    });
    return $('#project .files').append(listItems.join('\n'));
  };

}).call(this);
// Generated by CoffeeScript 1.12.7
(function() {
  exports.Project = require('project/project').init();

}).call(this);


// Tab.js
(function() {
  var $, Chrome, Dir, File, Process, _, addTab, bindKey, hideTabs, ref, showTabs, switchToTab;

  $ = require('jquery');

  _ = require('underscore');

  ref = require('osx'), Chrome = ref.Chrome, File = ref.File, Dir = ref.Dir, Process = ref.Process;

  bindKey = require('editor').bindKey;

  $(document).delegate('#tabs ul li:not(.add) a', 'click', function() {
    switchToTab(this);
    return false;
  });

  $(document).delegate('#tabs .add a', 'click', function() {
    addTab();
    return false;
  });

  bindKey('toggleTabs', 'Command-Ctrl-T', function(env) {
    if ($('#tabs').length) {
      return hideTabs();
    } else {
      return showTabs();
    }
  });

  showTabs = function() {
    var css;
    Chrome.addPane('top', require('tabs/tabs.html'));
    $('#tabs').parents('.pane').css({
      height: 'inherit'
    });
    css = $('<style id="tabs-style"></style>').html(require('tabs/tabs.css'));
    return $('head').append(css);
  };

  hideTabs = function() {
    $('#tabs').parents('.pane').remove();
    return $('#tabs-style').remove();
  };

  addTab = function() {
    $('#tabs ul .add').before('<li><a href="#">untitled</a></li>');
    $('#tabs ul .active').removeClass();
    return $('#tabs ul .add').prev().addClass('active');
  };

  switchToTab = function(tab) {
    $('#tabs ul .active').removeClass();
    return $(tab).parents('li').addClass('active');
  };

  exports.show = exports.showTabs = showTabs;

  exports.hideTabs = hideTabs;

  exports.addTab = addTab;

  exports.switchToTab = switchToTab;

}).call(this);
// Generated by CoffeeScript 1.12.7
(function() {
  var Tabs;

  exports.Tabs = Tabs = require('tabs/tabs');

}).call(this);






//bootstrap.js
(function() {
  var code, path, root;

  root = OSX.NSBundle.mainBundle.resourcePath;

  code = OSX.NSString.stringWithContentsOfFile(path = root + "/src/require.js");

  __jsc__.evalJSString_withScriptPath(code, path);

  console.log('require tests:');

  console.log(require.resolve('underscore'));

  console.log(require.resolve('osx'));

  console.log(require.resolve('tabs/tabs'));

  console.log(require.resolve('~/.atomicity'));

  console.log(require.resolve('ace/requirejs/text!ace/css/editor.css'));

  console.log(require.resolve('ace/keyboard/keybinding'));

  console.log('--------------');

}).call(this);
// Document
(function() {
  var Document,
    slice = [].slice;

  Document = (function() {
    var open;

    Document.prototype.path = null;

    Document.prototype.text = null;

    Document.prototype.listeners = [];

    function Document(path, text) {
      this.path = path;
      this.text = text;
    }

    Document.prototype.name = function() {
      if (this.path) {
        return _.last(this.path.split('/'));
      }
    };

    Document.prototype.save = function() {
      return trigger('saved');
    };

    open = function() {
      return trigger('opened');
    };

    Document.prototype.on = function(message, listener) {
      return this.listeners.push(listener);
    };

    Document.prototype.trigger = function() {
      var args, message;
      message = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      return _.each(this.listeners, function(listener) {
        return listener.call.apply(listener, args);
      });
    };

    return Document;

  })();

}).call(this);




// editor.js
(function() {
  var $, Chrome, Dir, File, Process, _, ace, bindKey, canon, editor, filename, open, ref, save, saveAs;

  $ = require('jquery');

  _ = require('underscore');

  ref = require('osx'), Chrome = ref.Chrome, File = ref.File, Process = ref.Process, Dir = ref.Dir;

  ace = require('ace/ace');

  canon = require('pilot/canon');

  Chrome.addPane('main', '<div id="editor"></div>');

  exports.ace = editor = ace.edit("editor");

  editor.setTheme(require("ace/theme/twilight"));

  editor.getSession().setUseSoftTabs(true);

  editor.getSession().setTabSize(2);

  setTimeout(function() {
    editor.focus();
    return editor.resize();
  }, 200);

  filename = null;

  editor.getSession().on('change', function() {
    return Chrome.setDirty(true);
  });

  save = function() {
    File.write(filename, editor.getSession().getValue());
    Chrome.setDirty(false);
    return editor._emit('save', {
      filename: filename
    });
  };

  exports.open = open = function(path) {
    filename = path;
    if (Dir.isDir(filename)) {
      Process.cwd(filename);
      Chrome.title(_.last(filename.split('/')));
      editor.getSession().setValue("");
      Chrome.setDirty(false);
    } else {
      if (/png|jpe?g|gif/i.test(filename)) {
        Chrome.openURL(filename);
      } else {
        Chrome.title(_.last(filename.split('/')));
        editor.getSession().setValue(File.read(filename));
        Chrome.setDirty(false);
      }
    }
    return editor._emit('open', {
      filename: filename
    });
  };

  saveAs = function() {
    var file;
    if (file = Chrome.savePanel()) {
      filename = file;
      Chrome.title(_.last(filename.split('/')));
      return save();
    }
  };

  exports.bindKey = bindKey = function(name, shortcut, callback) {
    return canon.addCommand({
      name: name,
      exec: callback,
      bindKey: {
        win: null,
        mac: shortcut,
        sender: 'editor'
      }
    });
  };

  bindKey('open', 'Command-O', function(env, args, request) {
    var file;
    if (file = Chrome.openPanel()) {
      return open(file);
    }
  });

  bindKey('openURL', 'Command-Shift-O', function(env, args, request) {
    var url;
    if (url = prompt("Enter URL:")) {
      return Chrome.openURL(url);
    }
  });

  bindKey('saveAs', 'Command-Shift-S', function(env, args, request) {
    return saveAs();
  });

  bindKey('save', 'Command-S', function(env, args, request) {
    if (filename) {
      return save();
    } else {
      return saveAs();
    }
  });

  bindKey('new', 'Command-N', function(env, args, request) {
    return Chrome.createWindow();
  });

  bindKey('copy', 'Command-C', function(env, args, request) {
    var text;
    text = editor.getSession().doc.getTextRange(editor.getSelectionRange());
    return Chrome.writeToPasteboard(text);
  });

  bindKey('cut', 'Command-X', function(env, args, request) {
    var text;
    text = editor.getSession().doc.getTextRange(editor.getSelectionRange());
    Chrome.writeToPasteboard(text);
    return editor.session.remove(editor.getSelectionRange());
  });

  bindKey('eval', 'Command-R', function(env, args, request) {
    return eval(env.editor.getSession().getValue());
  });

  bindKey('togglecomment', 'Command-/', function(env) {
    return env.editor.toggleCommentLines();
  });

  bindKey('tmoutdent', 'Command-[', function(env) {
    return env.editor.blockOutdent();
  });

  bindKey('tmindent', 'Command-]', function(env) {
    return env.editor.indent();
  });

  bindKey('moveforward', 'Alt-F', function(env) {
    return env.editor.navigateWordRight();
  });

  bindKey('moveback', 'Alt-B', function(env) {
    return env.editor.navigateWordLeft();
  });

  bindKey('deleteword', 'Alt-D', function(env) {
    return env.editor.removeWordRight();
  });

  bindKey('selectwordright', 'Alt-B', function(env) {
    return env.editor.navigateWordLeft();
  });

  bindKey('home', 'Alt-Shift-,', function(env) {
    return env.editor.navigateFileStart();
  });

  bindKey('end', 'Alt-Shift-.', function(env) {
    return env.editor.navigateFileEnd();
  });

  bindKey('fullscreen', 'Command-Shift-Return', function(env) {
    return Chrome.toggleFullscreen();
  });

  bindKey('console', 'Command-Ctrl-k', function(env) {
    return Chrome.inspector().showConsole(1);
  });

  bindKey('reload', 'Command-Ctrl-r', function(env) {
    Chrome.createWindow();
    return WindowController.close();
  });

  bindKey('consolelog', 'Ctrl-L', function(env) {
    env.editor.insert('console.log ""');
    return env.editor.navigateLeft();
  });

}).call(this);


//jscocoa
// Generated by CoffeeScript 1.12.7
(function() {
  var slice = [].slice;

  exports.outArgument = function() {
    var args, o;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    if (this.outArgument2 == null) {
      OSX.JSCocoa.createClass_parentClass_('JSCocoaOutArgument2', 'JSCocoaOutArgument');
    }
    o = OSX.JSCocoaOutArgument2.instance;
    o.isOutArgument = true;
    if (args.length === 2) {
      o.mateWithMemoryBuffer_atIndex_(args[0], args[1]);
    }
    return o;
  };

}).call(this);

// OSX
(function() {
  var $, Chrome, Dir, File, Process, _, jscocoa;

  $ = require('jquery');

  _ = require('underscore');

  jscocoa = require('jscocoa');

  Chrome = {
    addPane: function(position, html) {
      var el, horizontalDiv, verticalDiv;
      verticalDiv = $('#app-vertical');
      horizontalDiv = $('#app-horizontal');
      el = document.createElement("div");
      el.setAttribute('class', "pane " + position);
      el.innerHTML = html;
      switch (position) {
        case 'top':
        case 'main':
          return verticalDiv.prepend(el);
        case 'left':
          return horizontalDiv.prepend(el);
        case 'bottom':
          return verticalDiv.append(el);
        case 'right':
          return horizontalDiv.append(el);
        default:
          throw "I DON'T KNOW HOW TO DEAL WITH " + position;
      }
    },
    inspector: function(webView) {
      if (webView == null) {
        webView = WindowController.webView;
      }
      return this._inspector != null ? this._inspector : this._inspector = OSX.WebInspector.alloc.initWithWebView(webView);
    },
    createWindow: function(path) {
      var c;
      c = OSX.AtomWindowController.alloc.initWithWindowNibName("AtomWindow");
      c.window;
      return c.window.makeKeyAndOrderFront(null);
    },
    setDirty: function(bool) {
      return Chrome.activeWindow().setDocumentEdited(bool);
    },
    dirty: function() {
      return Chrome.activeWindow().isDocumentEdited();
    },
    activeWindow: function() {
      return OSX.NSApplication.sharedApplication.keyWindow;
    },
    openPanel: function() {
      var panel;
      panel = OSX.NSOpenPanel.openPanel;
      panel.setCanChooseDirectories(true);
      if (panel.runModal !== OSX.NSFileHandlingPanelOKButton) {
        return null;
      }
      return panel.filenames.lastObject;
    },
    savePanel: function() {
      var panel;
      panel = OSX.NSSavePanel.savePanel;
      if (panel.runModal !== OSX.NSFileHandlingPanelOKButton) {
        return null;
      }
      return panel.filenames.lastObject;
    },
    writeToPasteboard: function(text) {
      var pb;
      pb = OSX.NSPasteboard.generalPasteboard;
      pb.declareTypes_owner([OSX.NSStringPboardType], null);
      return pb.setString_forType(text, OSX.NSStringPboardType);
    },
    openURL: function(url) {
      window.location = url;
      return Chrome.title(_.last(url.replace(/\/$/, '').split('/')));
    },
    title: function(text) {
      return WindowController.window.title = text;
    },
    appRoot: function() {
      return OSX.NSBundle.mainBundle.resourcePath;
    }
  };

  File = {
    read: function(path) {
      return OSX.NSString.stringWithContentsOfFile(File.expand(path));
    },
    write: function(path, contents) {
      var str;
      str = OSX.NSString.stringWithString(contents);
      return str.writeToFile_atomically(File.expand(path), true);
    },
    expand: function(path) {
      if (/~/.test(path)) {
        return OSX.NSString.stringWithString(path).stringByExpandingTildeInPath;
      } else if (path.indexOf('./') === 0) {
        return Chrome.appRoot + "/" + path;
      } else {
        return path;
      }
    },
    isFile: function(path) {
      var exists, isDir;
      isDir = new jscocoa.outArgument;
      exists = OSX.NSFileManager.defaultManager.fileExistsAtPath_isDirectory(path, isDir);
      return exists && !isDir.valueOf();
    }
  };

  Dir = {
    list: function(path, recursive) {
      var fm, paths;
      path = File.expand(path);
      fm = OSX.NSFileManager.defaultManager;
      if (recursive) {
        paths = fm.subpathsAtPath(path);
      } else {
        paths = fm.contentsOfDirectoryAtPath_error(path, null);
      }
      return _.map(paths, function(entry) {
        return path + "/" + entry;
      });
    },
    isDir: function(path) {
      var exists, isDir;
      isDir = new jscocoa.outArgument;
      exists = OSX.NSFileManager.defaultManager.fileExistsAtPath_isDirectory(path, isDir);
      return exists && isDir.valueOf();
    }
  };

  Process = {
    cwd: function(path) {
      if (path != null) {
        return OSX.NSFileManager.defaultManager.changeCurrentDirectoryPath(path);
      } else {
        return OSX.NSFileManager.defaultManager.currentDirectoryPath.toString();
      }
    },
    env: function() {
      return OSX.NSProcess.processInfo.environment;
    }
  };

  exports.Chrome = Chrome;

  exports.File = File;

  exports.Dir = Dir;

  exports.Process = Process;

}).call(this);

// plugins by CoffeeScript 1.12.7
(function() {
  var $, Chrome, Dir, File, _, css, head, ref, rules, style;

  $ = require('jquery');

  _ = require('underscore');

  ref = require('osx'), Chrome = ref.Chrome, Dir = ref.Dir, File = ref.File;

  _.map(Dir.list(Chrome.appRoot() + "/plugins"), function(plugin) {
    return require(plugin);
  });

  if (css = File.read("~/.atomicity/twilight.css")) {
    head = $('head')[0];
    style = document.createElement('style');
    rules = document.createTextNode(css);
    style.type = 'text/css';
    style.appendChild(rules);
    head.appendChild(style);
  }

  _.map(Dir.list("~/.atomicity/"), function(path) {
    return require(path);
  });

}).call(this);


// Generated by CoffeeScript 1.12.7
(function() {
  var __exists, __modules, __read, define, defines, expandPath, exts, paths, require, resolve, resourcePath;

  resourcePath = OSX.NSBundle.mainBundle.resourcePath;

  paths = ["/Users/chris/Code/Atomicity/src", "/Users/chris/Code/Atomicity/plugins", resourcePath + "/src", resourcePath + "/plugins", resourcePath + "/vendor"];

  require = function(file, cb) {
    var ext, parts;
    if (cb != null) {
      return cb(require(file));
    }
    file = resolve(file);
    parts = file.split('.');
    ext = parts[parts.length - 1];
    if (__modules[file] != null) {
      return __modules[file];
    }
    __modules[file] = {};
    __modules[file] = (exts[ext] || function(file) {
      return __read(file);
    })(file);
    return __modules[file];
  };

  defines = [];

  define = function(cb) {
    return defines.push(function() {
      var exports, module;
      exports = {};
      module = {
        exports: exports
      };
      cb.call(exports, require, exports, module);
      return module.exports || exports;
    });
  };

  exts = {
    js: function(file, code) {
      var ref;
      code || (code = __read(file));
      if (!/define\(/.test(code)) {
        code = "define(function(require, exports, module) {\n  " + code + ";\n});";
      }
      __jsc__.evalJSString_withScriptPath(code, file);
      return (ref = defines.pop()) != null ? ref.call() : void 0;
    },
    coffee: function(file) {
      return exts.js(file, CoffeeScript.compile(__read(file)));
    }
  };

  resolve = function(file) {
    var parts;
    if (/!/.test(file)) {
      parts = file.split('!');
      file = parts[parts.length - 1];
    }
    if (file[0] === '~') {
      file = OSX.NSString.stringWithString(file).stringByExpandingTildeInPath;
    }
    if (file.slice(0, 2) === './') {
      throw "require: ./ prefix not yet implemented";
    }
    if (file.slice(0, 3) === '../') {
      throw "require: ../ prefix not yet implemented";
    }
    if (file[0] !== '/') {
      paths.some(function(path) {
        var expanded;
        if (/\.(.+)$/.test(file) && __exists(path + "/" + file)) {
          return file = path + "/" + file;
        } else if (expanded = expandPath(path + "/" + file)) {
          return file = expanded;
        }
      });
    } else {
      file = expandPath(file) || file;
    }
    if (file[0] !== '/') {
      throw "require: Can't find '" + file + "'";
    }
    return file;
  };

  expandPath = function(path) {
    var ext, handler;
    for (ext in exts) {
      handler = exts[ext];
      if (__exists(path + "." + ext)) {
        return path + "." + ext;
      } else if (__exists(path + "/index." + ext)) {
        return path + "/index." + ext;
      }
    }
    return null;
  };

  __exists = function(path) {
    return OSX.NSFileManager.defaultManager.fileExistsAtPath(path);
  };

  __read = function(path) {
    return OSX.NSString.stringWithContentsOfFile(path);
  };

  __modules = {};

  this.require = require;

  this.define = define;

  this.require.paths = paths;

  this.require.exts = exts;

  this.require.resolve = resolve;

  this.require.nameToUrl = function(path) {
    return path + ".js";
  };

  this.require.__modules = __modules;

}).call(this);
