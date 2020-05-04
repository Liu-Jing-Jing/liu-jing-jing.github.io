window.onload = function() {
  
  var Document,   slice = [].slice;
  // 文档对象的定义 与具体的操作
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
  
  
  
  
  /*
   * OSX JS 
   */
  var Chrome, Dir, File, canon;

  canon = require('pilot/canon');

  Chrome = {
    init: function() {
      return console.log = OSX.NSLog;
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
    bindKey: function(name, shortcut, callback) {
      return canon.addCommand({
        name: name,
        exec: callback,
        bindKey: {
          win: null,
          mac: shortcut,
          sender: 'editor'
        }
      });
    },
    title: function(text) {
      return WindowController.window.title = text;
    },
    toggleFullscreen: function() {
      if (Chrome.fullscreen != null) {
        return Chrome.leaveFullscreen();
      } else {
        return Chrome.enterFullscreen();
      }
    },
    leaveFullscreen: function() {
      var window;
      Chrome.fullscreen = false;
      OSX.NSMenu.setMenuBarVisible(!OSX.NSMenu.menuBarVisible);
      return window = WindowController.window;
    },
    enterFullscreen: function() {
      var contentView, frame, fullscreenWindow, window;
      Chrome.fullscreen = true;
      OSX.NSMenu.setMenuBarVisible(!OSX.NSMenu.menuBarVisible);
      window = WindowController.window;
      fullscreenWindow = OSX.NSWindow.alloc.initWithContentRect_styleMask_backing_defer_screen(window.contentRectForFrameRect(window.frame), OSX.NSBorderlessWindowMask, OSX.NSBackingStoreBuffered, true, window.screen);
      contentView = window.contentView;
      window.setContentView(OSX.NSView.alloc.init);
      fullscreenWindow.setHidesOnDeactivate(true);
      fullscreenWindow.setLevel(OSX.NSFloatingWindowLevel);
      fullscreenWindow.setContentView(contentView);
      fullscreenWindow.setTitle(window.title);
      fullscreenWindow.makeFirstResponder(null);
      fullscreenWindow.makeKeyAndOrderFront(null);
      frame = fullscreenWindow.frameRectForContentRect(fullscreenWindow.screen.frame);
      return fullscreenWindow.setFrame_display_animate(frame, true, true);
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
      } else {
        return path;
      }
    }
  };

  Dir = {
    list: function(path) {
      path = File.expand(path);
      return _.map(OSX.NSFileManager.defaultManager.subpathsAtPath(path), function(entry) {
        return path + "/" + entry;
      });
    }
  };

  this.Chrome = Chrome;

  this.File = File;

  this.Dir = Dir;
  
  
  // 程序启示 Atom JS
  var CoffeeMode, HTMLMode, JavaScriptMode, css, editor, filename, head, open, rules, save, saveAs, setMode, style;

  Chrome.init();

  editor = ace.edit("editor");

  editor.setTheme("ace/theme/twilight");

  JavaScriptMode = require("ace/mode/javascript").Mode;

  CoffeeMode = require("ace/mode/coffee").Mode;

  HTMLMode = require("ace/mode/html").Mode;

  editor.getSession().setMode(new JavaScriptMode);

  editor.getSession().setUseSoftTabs(true);

  editor.getSession().setTabSize(2);

  if (css = File.read("~/.atomicity/twilight.css")) {
    head = $('head')[0];
    style = document.createElement('style');
    rules = document.createTextNode(css);
    style.type = 'text/css';
    style.appendChild(rules);
    head.appendChild(style);
  }

  _.map(Dir.list("~/.atomicity/"), function(path) {
    if (/\.js$/.test(path)) {
      return $.getScript(path);
    } else if (/\.coffee/.test(path)) {
      return eval(CoffeeScript.compile(File.read(path)));
    }
  });

  filename = null;

  editor.getSession().on('change', function() {
    return Chrome.setDirty(true);
  });

  save = function() {
    File.write(filename, editor.getSession().getValue());
    setMode();
    return Chrome.setDirty(false);
  };

  open = function() {
    if (/png|jpe?g|gif/i.test(filename)) {
      return Chrome.openURL(filename);
    } else {
      Chrome.title(_.last(filename.split('/')));
      editor.getSession().setValue(File.read(filename));
      setMode();
      return Chrome.setDirty(false);
    }
  };

  setMode = function() {
    if (/\.js$/.test(filename)) {
      return editor.getSession().setMode(new JavaScriptMode);
    } else if (/\.coffee$/.test(filename)) {
      return editor.getSession().setMode(new CoffeeMode);
    } else if (/\.html/.test(filename)) {
      return editor.getSession().setMode(new HTMLMode);
    }
  };

  saveAs = function() {
    var file;
    if (file = Chrome.savePanel()) {
      filename = file;
      Chrome.title(_.last(filename.split('/')));
      return save();
    }
  };

  Chrome.bindKey('open', 'Command-O', function(env, args, request) {
    var file;
    if (file = Chrome.openPanel()) {
      filename = file;
      return open();
    }
  });

  Chrome.bindKey('openURL', 'Command-Shift-O', function(env, args, request) {
    var url;
    if (url = prompt("Enter URL:")) {
      return Chrome.openURL(url);
    }
  });

  Chrome.bindKey('saveAs', 'Command-Shift-S', function(env, args, request) {
    return saveAs();
  });

  Chrome.bindKey('save', 'Command-S', function(env, args, request) {
    if (filename) {
      return save();
    } else {
      return saveAs();
    }
  });

  Chrome.bindKey('new', 'Command-N', function(env, args, request) {
    return Chrome.createWindow();
  });

  Chrome.bindKey('copy', 'Command-C', function(env, args, request) {
    var text;
    text = editor.getSession().doc.getTextRange(editor.getSelectionRange());
    return Chrome.writeToPasteboard(text);
  });

  Chrome.bindKey('cut', 'Command-X', function(env, args, request) {
    var text;
    text = editor.getSession().doc.getTextRange(editor.getSelectionRange());
    Chrome.writeToPasteboard(text);
    return editor.session.remove(editor.getSelectionRange());
  });

  Chrome.bindKey('eval', 'Command-R', function(env, args, request) {
    return eval(env.editor.getSession().getValue());
  });

  Chrome.bindKey('togglecomment', 'Command-/', function(env) {
    return env.editor.toggleCommentLines();
  });

  Chrome.bindKey('tmoutdent', 'Command-[', function(env) {
    return env.editor.blockOutdent();
  });

  Chrome.bindKey('tmindent', 'Command-]', function(env) {
    return env.editor.indent();
  });

  Chrome.bindKey('moveforward', 'Alt-F', function(env) {
    return env.editor.navigateWordRight();
  });

  Chrome.bindKey('moveback', 'Alt-B', function(env) {
    return env.editor.navigateWordLeft();
  });

  Chrome.bindKey('deleteword', 'Alt-D', function(env) {
    return env.editor.removeWordRight();
  });

  Chrome.bindKey('selectwordright', 'Alt-B', function(env) {
    return env.editor.navigateWordLeft();
  });

  Chrome.bindKey('home', 'Alt-Shift-,', function(env) {
    return env.editor.navigateFileStart();
  });

  Chrome.bindKey('end', 'Alt-Shift-.', function(env) {
    return env.editor.navigateFileEnd();
  });

  Chrome.bindKey('fullscreen', 'Command-Shift-Return', function(env) {
    return Chrome.toggleFullscreen();
  });

  Chrome.bindKey('consolelog', 'Ctrl-L', function(env) {
    env.editor.insert('console.log ""');
    return env.editor.navigateLeft();
  });


  // ace modify
  
  var tes = document.getElementsByClassName('ace_print_margin')[0];
  tes.style.left  = 1196+'px';
};
