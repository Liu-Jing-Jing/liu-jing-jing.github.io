// Generated by CoffeeScript 1.12.7
(function() {
  define(function(require, exports, module) {
    var Chrome, Dir, File, Process;
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
            return NSLog("I DON'T KNOW HOW TO DEAL WITH " + position);
        }
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
        isDir = new outArgument;
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
        isDir = new outArgument;
        exists = OSX.NSFileManager.defaultManager.fileExistsAtPath_isDirectory(path, isDir);
        return exists && isDir.valueOf();
      }
    };
    Process = {
      cwd: function(path) {
        if (typeof dir !== "undefined" && dir !== null) {
          return OSX.NSFileManager.defaultManager.changeCurrentDirectoryPath(path);
        } else {
          return OSX.NSFileManager.defaultManager.currentDirectoryPath();
        }
      },
      env: function() {
        return OSX.NSProcess.processInfo.environment();
      }
    };
    exports.Chrome = Chrome;
    exports.File = File;
    return exports.Dir = Dir;
  });

}).call(this);
