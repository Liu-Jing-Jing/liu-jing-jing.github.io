/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/ 	
/******/ 	// The require function
/******/ 	function require(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/ 		
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/ 		
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(null, module, module.exports, require);
/******/ 		
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 		
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// The bundle contains no chunks. A empty chunk loading function.
/******/ 	require.e = function requireEnsure(_, callback) {
/******/ 		callback.call(null, this);
/******/ 	};
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	require.modules = modules;
/******/ 	
/******/ 	// expose the module cache
/******/ 	require.cache = installedModules;
/******/ 	
/******/ 	
/******/ 	// Load entry module and return exports
/******/ 	return require(0);
/******/ })
/************************************************************************/
/******/ ({
/******/ // __webpack_public_path__
/******/ c: "",

/***/ 0:
/***/ function(module, exports, require) {

	var Moment = require(4); 
	window.dateTool = Moment;
	window.timer = require(1)
	// var Polyfill = require('./vender/Polyfill')
	if (typeof console == "undefined") {
	  var console = {
	    error: function () {},
	    log: function (string) {
	      window.console && window.console.log(string);
	    },
	    warn: function (string) {
	      window.console && window.console.warn(string);
	    }
	  };
	}
	if (typeof Object.assign != "function") {
	  Object.assign = function (target) {
	    "use strict";
	    if (target == null) {
	      throw new TypeError("Cannot convert undefined or null to object");
	    }
	    var to = Object(target);
	    for (var index = 1; index < arguments.length; index++) {
	      var nextSource = arguments[index];
	      if (nextSource != null) {
	        for (var nextKey in nextSource) {
	          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
	            to[nextKey] = nextSource[nextKey];
	          }
	        }
	      }
	    }
	    return to;
	  };
	}

	// 解决IE9及其以下 不支持classList属性的问题
	if (!("classList" in document.documentElement)) {
	  Object.defineProperty(HTMLElement.prototype, "classList", {
	    get: function () {
	      var self = this;
	      function update(fn) {
	        return function (value) {
	          var classes = self.className.split(/\s+/g),
	            index = classes.indexOf(value);

	          fn(classes, index, value);
	          self.className = classes.join(" ");
	        };
	      }
	      return {
	        add: update(function (classes, index, value) {
	          if (!~index) classes.push(value);
	          console.log(classes);
	        }),

	        remove: update(function (classes, index) {
	          if (~index) classes.splice(index, 1);
	          console.log(classes);
	        }),

	        toggle: update(function (classes, index, value) {
	          if (~index) classes.splice(index, 1);
	          else classes.push(value);
	        }),

	        contains: function (value) {
	          return !!~self.className.split(/\s+/g).indexOf(value);
	        },

	        item: function (i) {
	          return self.className.split(/\s+/g)[i] || null;
	        },
	      };
	    },
	  });
	}
	if (!Function.prototype.bind) {
	  Function.prototype.bind = function (oThis) {
	    if (typeof this !== "function") {
	      throw new TypeError(
	        "Function.prototype.bind - what is trying to be bound is not callable"
	      );
	    }

	    var aArgs = Array.prototype.slice.call(arguments, 1),
	      fToBind = this,
	      fNOP = function () {},
	      fBound = function () {
	        return fToBind.apply(
	          this instanceof fNOP && oThis ? this : oThis,
	          aArgs.concat(Array.prototype.slice.call(arguments))
	        );
	      };

	    fNOP.prototype = this.prototype;
	    fBound.prototype = new fNOP();
	    return fBound;
	  };
	}

	// 兼容老版本浏览器的find filter map方法
	if (!Array.prototype.find) {
	  Array.prototype.find = function(callback, thisArg) {
	    var arr = this, i, len;
	    if (typeof callback !== 'function') {
	      throw new TypeError(callback + ' is not a function');
	    }
	    for (i = 0, len = arr.length; i < len; i++) {
	      if (i in arr) {
	        var val = arr[i];
	        if (callback.call(thisArg, val, i, arr)) {
	          return val;
	        }
	      }
	    }
	    return undefined;
	  };
	}

	if (!Array.prototype.findIndex) {
	  Array.prototype.findIndex = function(callback, thisArg) {
	    var arr = this, i, len;
	    if (typeof callback !== 'function') {
	      throw new TypeError(callback + ' is not a function');
	    }
	    for (i = 0, len = arr.length; i < len; i++) {
	      if (i in arr) {
	        var val = arr[i];
	        if (callback.call(thisArg, val, i, arr)) {
	          return i;
	        }
	      }
	    }
	    return -1;
	  };
	}

	if (!Array.prototype.map) {
	  Array.prototype.map = function(callback, thisArg) {
	    var arr = this, result = [], i, len;
	    if (typeof callback !== 'function') {
	      throw new TypeError(callback + ' is not a function');
	    }
	    for (i = 0, len = arr.length; i < len; i++) {
	      if (i in arr) {
	        result[i] = callback.call(thisArg, arr[i], i, arr);
	      }
	    }
	    return result;
	  };
	}

	function WebSocketTest2()
	{
	  xhr.open("GET", "/getIP", false); // 第三个参数是异步标志，true表示异步

	  xhr.onreadystatechange = function () {
	    if (xhr.readyState === 4 && xhr.status === 200) {
	      var res = xhr.responseText;
	      var json = JSON.parse(res);
	      console.log(json.data);

	      if ("WebSocket" in window)
	      {
	        var ws = new WebSocket(json.data + 'ws');
	        ws.onopen = function()
	        {
	          // Web Socket is connected
	          alert("websocket is open");
	          
	          // You can send data now
	          ws.send("Hey man, you got the time?");
	        };
	        socket.onmessage = function(event) {
	          alert(event.data)
	          if (event.data.startsWith("setbg:")) {
	            document.body.style.backgroundColor = event.data.split(":")[1];
	          }
	        };
	        socket.onclose = function() { setTimeout(connectWebSocket, 1000); };
	      }
	      else
	      {
	        alert("Browser doesn't support WebSocket!");
	      }

	      initTodos = Array.isArray(json) ? json : initTodos;
	    }
	  };
	  xhr.send();
	}
	window.socket = WebSocketTest2
	window.utils = {
	  isToday: function (moment) {
	    var today = Moment()
	    return (
	      today.diff(moment, 'days') === 0
	    )
	  },
	  stringToHex: function (str) {
	    // 十进制转16进制
	    var hex = str.toString(16);
	    return hex.length === 1? "0" + hex : hex;
	  },
	}
	var Vue = require(2);
	var appOptions = require(5);

	var _ = Vue.util, templateParser = Vue.parsers;
	var component = Vue.directive("component");
	console.log(_, templateParser, component);
	// 扩展Vue的方法，方便发送body参数
	Vue.prototype.$qs = function (obj) {
	  var queryString = [];
	  for (var key in obj) {
	    try {
	      // 使用hasOwnProperty来确保属性是对象自身的属性
	      if (obj.hasOwnProperty(key)) {
	        queryString.push(
	          encodeURIComponent(key) + "=" + encodeURIComponent(obj[key])
	        );
	      }
	    } catch (e) {}
	  }
	  return queryString.join("&");
	};


	// 定义自定义指令 v-touch
	Vue.directive("touch", {
	  bind: function (a, b) {
	    // 绑定点击事件
	    console.log("bind:", a);
	    console.log("bind:", b);
	  },
	  update: function (value) {
	    if (typeof value === "function") {
	      try {
	        var callback = value.bind(this);
	        console.log("update:", this.vm);
	        this.el.addEventListener("click", callback);
	        // 保存 value 以便在 unbind 时使用
	        this.el._touchHandler = callback;
	      } catch (error) {
	        console.error("Error adding click event listener:", error);
	      }
	    } else {
	      console.warn("The provided value is not a function");
	    }
	    var handler = value;
	    if (typeof handler !== "function") {
	      console.warn("The provided value is not a function");
	      return;
	    }

	    var startX, startY;
	    var el = this.el;
	    // 触摸开始时记录起始位置
	    el.addEventListener("touchstart", function (event) {
	      var touches = event.touches[0];
	      startX = touches.clientX;
	      startY = touches.clientY;
	    });
	    // 触摸移动时计算移动距离
	    el.addEventListener('touchmove', function (event) {
	      var touches = event.touches[0];
	      var deltaX = touches.clientX - startX;
	      var deltaY = touches.clientY - startY;
	      handler(event, { deltaX: deltaX, deltaY: deltaY });
	    });

	    // 触摸结束时调用回调函数
	    el.addEventListener("touchend", function (event) {
	      handler(event, { startX: startX, startY: startY });
	    });

	    // 保存事件处理器以便在 unbind 时使用
	    el._touchHandler = handler;
	  },
	  unbind: function () {
	    var el = this.el;
	    // 移除点击事件
	    var value = this.el._touchHandler;
	    if (typeof value === "function") {
	      try {
	        el.removeEventListener("click", value);
	        // 移除绑定的touch事件
	        el.removeEventListener("touchstart", handler);
	        el.removeEventListener("touchmove", handler);
	        el.removeEventListener("touchend", handler);
	        // 清除保存的 value
	        delete el._touchHandler;
	      } catch (error) {
	        console.error("Error removing click event listener:", error);
	      }
	    } else {
	      console.warn("No touch handler to remove");
	    }
	  },
	});


	function updateClass(el, value) {
	  if (typeof value === "object") {
	    // 如果值是对象，遍历对象并根据键值对设置类
	    Object.keys(value).forEach(function (className) {
	      if (value[className]) {
	        // classList不能兼容iOS 4系统
	        el.classList.add(className);
	      } else {
	        el.classList.remove(className);
	      }
	    });
	  } else if (typeof value === "string") {
	    // 如果值是字符串，直接设置类
	    el.className = value;
	  }
	}

	// 定义自定义指令 v-css
	Vue.directive("css", {
	  bind: function () {
	    // 初始化时设置类
	  },
	  update: function (value) {
	    // 更新时重新设置类
	    updateClass(this.el, value);
	  },
	});

	function updateAttributes(el, value) {
	  if (typeof value === "object") {
	    Object.keys(value).forEach(function (key) {
	      if (value[key] === true) {
	        el.setAttribute(key, value[key]);
	      } else {
	        el.removeAttribute(key);
	      }
	    });
	  }
	}
	// 定义自定义指令 v-attrs
	Vue.directive("attrs", {
	  bind: function () {
	    // 初始化时设置类
	  },
	  update: function (value) {
	    // 更新时重新设置类
	    updateAttributes(this.el, value);
	  },
	});
	// 定义自定义指令 v-click指令并且在点击时传递数据
	Vue.directive("click", {
	  bind: function () {
	    var self = this;
	    console.log(this.vm.done);
	    if (self.vm.$parent[self.expression]) {
	      var fn = self.vm.$parent[self.expression];
	      this.el && this.el.addEventListener("click", fn.bind(this, this.vm));
	    }
	  },
	  update: function (value) {},
	});
	function os () {
	  var ua = navigator.userAgent,
	  isWindowsPhone = /(?:Windows Phone)/.test(ua),
	  isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
	  isAndroid = /(?:Android)/.test(ua),
	  isFireFox = /(?:Firefox)/.test(ua),
	  isChrome = /(?:Chrome|CriOS)/.test(ua),
	  isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
	  isPhone = /(?:iPhone)/.test(ua) && !isTablet,
	  isPc = !isPhone && !isAndroid && !isSymbian;
	  return {
	      isTablet: isTablet,
	      isPhone: isPhone,
	      isAndroid: isAndroid,
	      isPc: isPc,
	      isFireFox: isFireFox,
	      isChrome: isChrome
	  };
	}
	window.osType = os;
	var birthDay = Moment('1995-2-16', 'YYYY-MM-DD');
	var nowDate = Moment('1995-7-16', 'YYYY-MM-DD');

	alert('火狐浏览器 = ' + (nowDate-birthDay) + os().isFireFox)
	var initTodos = [
	  { title: "make nesting controllers work", done: true, date: '2013-08-06' },
	  { title: "complete ArrayWatcher", done: true, date: '2013-08-08' },
	  { title: "computed properties", done: true, date: '2013-08-08' },
	  { title: "auto dependency extraction", done: true, date: '2013-08-09' },
	  { title: "parse textnodes", done: true, date: '2013-08-09' },
	  { title: "make nesting Objects work", done: false, date: '2013-08-09' },
	  { title: "standarized way to reuse components (v-component?)", done: false, date: '2013-08-09' },
	  { title: "computed properties with dynamic context", done: false, date: '2013-08-11' },
	  { title: "Simply API;more features:)", done: false, date: '2013-08-16' },
	  { title: "Learn JavaScript", done: false, date: '2015-01-01' },
	  { title: "Learn Vue.js", done: false, date: '2015-01-01' },
	  { title: "Build Something Awesome", done: false, date: '2015-01-01' }
	];

	var mainTabs = [
	  { title: "MY.代办列表", index: 0 },
	  { title: "MY.沙盒列表", index: 1 },
	  { title: "MY.无线图传", index: 2 },
	  { title: "MY.神奇滤镜", index: 3 },
	  { title: "联系我们", index: 4 },
	  { title: "关于我们", index: 5 },
	];
	function generateDateArray(startDate, endDate, duration, getTitle) {
	  var dates = [];
	  var currentData = startDate
	  while (currentData.valueOf() <= endDate.valueOf()) {
	    dates.push({
	      date: currentData.format('YYYY-MM-DD'),
	      title: getTitle(dates.length), // '提醒老婆吃叶酸的第' + dates.length + '天',
	      done: false,
	      index: dates.length,
	      HCG: 244.05,
	      E2: 281.04,
	      Prog: 25.74,
	      isEdit: false,
	    });
	    currentData = currentData.add('days', duration);
	  }

	  return dates;
	}
	// 示例使用
	// var ysTodosArray = generateDateArray(startDate, endDate, 1, function (index) {
	//   return '提醒老婆吃叶酸的第' + index + '天';
	// });
	// var hcgList = generateDateArray(hcgDate, hcgEndDate, 7, function (index) {
	//   return '第' + index + '周: 记录HCG=244.05, E2=281.04, Prog=25.74';
	// });
	var storageKey = "myData", storedData = [], ysTodos = [], hcgList = [];
	try {
	  var myData = JSON.parse(localStorage.getItem(storageKey));
	  ysTodos = myData.ysTodos
	  hcgList = myData.hcgList
	} catch (error) {
	  console.log(error);
	}
	initTodos = Array.isArray(storedData) ? storedData : initTodos;
	// 加载数据
	var xhr = new XMLHttpRequest();
	try {
	  xhr.open("GET", "/todoList", false);

	  xhr.onreadystatechange = function () {
	    if (xhr.readyState === 4 && xhr.status === 200) {
	      // 请求成功，处理返回的数据
	      // console.log();
	      var res = xhr.responseText;
	      var json = JSON.parse(res);
	      console.log(json);

	      initTodos = Array.isArray(json) ? json : initTodos;
	    }
	  };
	  xhr.send();
	} catch (error) { console.log(error) }


	function setup() {
	  console.log("--setup App with Vue 0.7--");
	  try {
	    var xhr = new XMLHttpRequest();
	    xhr.open("GET", "/fileList", true); // 第三个参数是异步标志，true表示异步
	  
	    xhr.onreadystatechange = function () {
	      if (xhr.readyState === 4 && xhr.status === 200) {
	        var res = xhr.responseText;
	        var json = JSON.parse(res);
	        console.log(json);
	        storedData = json
	        var app = new Vue({
	          el: document.querySelector("#app"),
	          components: appOptions.components,
	          directives: appOptions.directives,
	          filters: appOptions.filters,
	          template: appOptions.template,
	          methods: {},
	          data: Object.assign(
	            {
	              osType: os().isFireFox,
	              tabs: mainTabs,
	              tabSelect: 0,
	              activeTab: 0,
	              currentIndex: 0,
	              totalSlides: [], // 接口获取
	              currentImage: "",
	              newText: "",
	              name: "Vue 0.7",
	              fileList: json,
	              myTodos: initTodos,
	              total: 3,
	              filter: "all",
	              ysTodos: ysTodos || [], // 接口获取
	              hcgList: hcgList || [], // 接口获取
	              isPC: os().isPc,
	              showTimeString: true,
	              timeString: '--',
	              slotString: '',
	              isToday: window.utils.isToday,
	              generateDateArray: generateDateArray
	            },
	            appOptions.data
	          ),
	        });
	        console.log(app);
	      } else if (xhr.readyState === 4) {
	        // 请求失败，显示错误信息
	        console.error("Request failed with status:", xhr.status);
	      }
	    };
	    xhr.send();
	  } finally {
	    if (storedData.length) return;
	    var app = new Vue({
	      el: document.querySelector("#app"),
	      components: appOptions.components,
	      directives: appOptions.directives,
	      filters: appOptions.filters,
	      template: appOptions.template,
	      methods: {},
	      data: Object.assign(
	        {
	          osType: os().isFireFox,
	          fileList: [{ isDir: true, path: "fetch error" }],
	          msg: "hello world",
	          tabs: mainTabs,
	          activeTab: 0,
	          tabSelect: 0,
	          currentIndex: 0,
	          totalSlides: [
	            // 预定义的图片列表
	            "https://picsum.photos/600/400?1",
	            "https://picsum.photos/600/400?2",
	            "https://picsum.photos/600/400?3"
	          ],
	          currentImage: "",
	          newTitle: "",
	          name: "Vue 0.7",
	          myTodos: initTodos,
	          total: 3,
	          filter: "all",
	          ysTodos: ysTodos || [],
	          hcgList: hcgList || [],
	          isPC: os().isPc,
	          showTimeString: true,
	          timeString: '--',
	          slotString: '',
	          isToday: window.utils.isToday,
	          generateDateArray: generateDateArray
	        },
	        appOptions.data
	      ),
	    });
	    window.app = app;
	  }
	}

	var obj = {
	  name: 'liujing',
	  age: 18
	}

	var person = Object.assign(obj, {
	  age: 22
	})
	console.log(person.age)
	console.log(person.name)
	setup();


/***/ },

/***/ 1:
/***/ function(module, exports, require) {

	function parseDateString(t){if(t instanceof Date)return t;if(String(t).match(matchers))return String(t).match(/^[0-9]*$/)&&(t=Number(t)),String(t).match(/\-/)&&(t=String(t).replace(/\-/g,"/")),new Date(t);throw new Error("Couldn't cast `"+t+"` to a date object.")}function escapedRegExp(t){var e=t.toString().replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1");return new RegExp(e)}function strftime(t){return function(e){var s=e.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);if(s)for(var i=0,n=s.length;i<n;++i){var r=s[i].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),a=escapedRegExp(r[0]),o=r[1]||"",h=r[3]||"",c=null;r=r[2],DIRECTIVE_KEY_MAP.hasOwnProperty(r)&&(c=DIRECTIVE_KEY_MAP[r],c=Number(t[c])),null!==c&&("!"===o&&(c=pluralize(h,c)),""===o&&c<10&&(c="0"+c.toString()),e=e.replace(a,c.toString()))}return e=e.replace("%_M1",t.minutes_1).replace("%_M2",t.minutes_2).replace("%_S1",t.seconds_1).replace("%_S2",t.seconds_2).replace("%_H1",t.hours_1).replace("%_H2",t.hours_2).replace("%_D1",t.days_1).replace("%_D2",t.days_2),e=e.replace(/%%/,"%"),e}}function pluralize(t,e){var s="s",i="";return t&&(t=t.replace(/(:|;|\s)/gi,"").split(/\,/),1===t.length?s=t[0]:(i=t[0],s=t[1])),1===Math.abs(e)?i:s}function splitNumber(t){return t+="",t=(1===t.length?"0"+t:t)+"",t.split("")}var instances=[],matchers=[];matchers.push(/^[0-9]*$/.source),matchers.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),matchers.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),matchers=new RegExp(matchers.join("|"));var DIRECTIVE_KEY_MAP={Y:"years",m:"months",w:"weeks",D:"days",H:"hours",M:"minutes",S:"seconds"},Countdown=function(t,e){e=e||{},this.PRECISION=e.precision||100,this.interval=null,this.offset={},this.instanceNumber=instances.length,instances.push(this),this.setFinalDate(t)},Eventor=require(3);Eventor.mixTo(Countdown);var pro=Countdown.prototype,fns={start:function(){null!==this.interval&&clearInterval(this.interval);var t=this;return this.update(),this.interval=setInterval(function(){t.update.call(t)},this.PRECISION),this},stop:function(){return clearInterval(this.interval),this.interval=null,this._dispatchEvent("stoped"),this},toggle:function(){return this.interval?this.stop():this.start(),this},pause:function(){return this.stop()},resume:function(){return this.start()},remove:function(){this.stop.call(this),instances[this.instanceNumber]=null},setFinalDate:function(t){return this.finalDate=parseDateString(t),this},getOffset:function(){return this.totalSecsLeft=this.finalDate.getTime()-(new Date).getTime(),this.totalSecsLeft=Math.ceil(this.totalSecsLeft/1e3),this.totalSecsLeft=this.totalSecsLeft<0?0:this.totalSecsLeft,{seconds:this.totalSecsLeft%60,minutes:Math.floor(this.totalSecsLeft/60)%60,hours:Math.floor(this.totalSecsLeft/60/60)%24,days:Math.floor(this.totalSecsLeft/60/60/24),weeks:Math.floor(this.totalSecsLeft/60/60/24/7),months:Math.floor(this.totalSecsLeft/60/60/24/30),years:Math.floor(this.totalSecsLeft/60/60/24/365)}},update:function(){this.offset=this.getOffset();for(var t=["days","hours","minutes","seconds"],e=0;e<t.length;e++){var s=t[e],i=splitNumber(this.offset[s]);this.offset[s+"_1"]=i[0],this.offset[s+"_2"]=i[1]}return 0===this.totalSecsLeft?(this.stop(),this._dispatchEvent("finish")):this._dispatchEvent("update"),this},_dispatchEvent:function(t){var e={};e.finalDate=this.finalDate,e.offset=this.offset,e.strftime=strftime(this.offset),this.emit(t,e),this.emit("tick",e)}};for(var i in fns)pro[i]=fns[i];module.exports=Countdown;

/***/ },

/***/ 2:
/***/ function(module, exports, require) {

	/* VueJS (c) 2013 Evan You */
	!function(){function a(b,c,d){var e=a.resolve(b);if(null==e){d=d||b,c=c||"root";var f=new Error('Failed to require "'+d+'" from "'+c+'"');throw f.path=d,f.parent=c,f.require=!0,f}var g=a.modules[e];if(!g._resolving&&!g.exports){var h={};h.exports={},h.client=h.component=!0,g._resolving=!0,g.call(this,h.exports,a.relative(e),h),delete g._resolving,g.exports=h.exports}return g.exports}a.modules={},a.aliases={},a.resolve=function(b){"/"===b.charAt(0)&&(b=b.slice(1));for(var c=[b,b+".js",b+".json",b+"/index.js",b+"/index.json"],d=0;d<c.length;d++){var b=c[d];if(a.modules.hasOwnProperty(b))return b;if(a.aliases.hasOwnProperty(b))return a.aliases[b]}},a.normalize=function(a,b){var c=[];if("."!=b.charAt(0))return b;a=a.split("/"),b=b.split("/");for(var d=0;d<b.length;++d)".."==b[d]?a.pop():"."!=b[d]&&""!=b[d]&&c.push(b[d]);return a.concat(c).join("/")},a.register=function(b,c){a.modules[b]=c},a.alias=function(b,c){if(!a.modules.hasOwnProperty(b))throw new Error('Failed to alias "'+b+'", it does not exist');a.aliases[c]=b},a.relative=function(b){function c(a,b){for(var c=a.length;c--;)if(a[c]===b)return c;return-1}function d(c){var e=d.resolve(c);return a(e,b,c)}var e=a.normalize(b,"..");return d.resolve=function(d){var f=d.charAt(0);if("/"==f)return d.slice(1);if("."==f)return a.normalize(e,d);var g=b.split("/"),h=c(g,"deps")+1;return h||(h=0),d=g.slice(0,h+1).join("/")+"/deps/"+d},d.exists=function(b){return a.modules.hasOwnProperty(d.resolve(b))},d},a.register("component-emitter/index.js",function(a,b,c){function d(a){return a?e(a):void 0}function e(a){for(var b in d.prototype)a[b]=d.prototype[b];return a}c.exports=d,d.prototype.on=d.prototype.addEventListener=function(a,b){return this._callbacks=this._callbacks||{},(this._callbacks[a]=this._callbacks[a]||[]).push(b),this},d.prototype.once=function(a,b){function c(){d.off(a,c),b.apply(this,arguments)}var d=this;return this._callbacks=this._callbacks||{},c.fn=b,this.on(a,c),this},d.prototype.off=d.prototype.removeListener=d.prototype.removeAllListeners=d.prototype.removeEventListener=function(a,b){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var c=this._callbacks[a];if(!c)return this;if(1==arguments.length)return delete this._callbacks[a],this;for(var d,e=0;e<c.length;e++)if(d=c[e],d===b||d.fn===b){c.splice(e,1);break}return this},d.prototype.emit=function(a){this._callbacks=this._callbacks||{};var b=[].slice.call(arguments,1),c=this._callbacks[a];if(c){c=c.slice(0);for(var d=0,e=c.length;e>d;++d)c[d].apply(this,b)}return this},d.prototype.listeners=function(a){return this._callbacks=this._callbacks||{},this._callbacks[a]||[]},d.prototype.hasListeners=function(a){return!!this.listeners(a).length}}),a.register("vue/src/main.js",function(a,b,c){function d(a){var b=this;a=e(a,b.options,!0),m.processOptions(a);var c=function(c,d){d||(c=e(c,a,!0)),b.call(this,c,!0)},f=c.prototype=Object.create(b.prototype);m.defProtected(f,"constructor",c);var g=a.methods;if(g)for(var h in g)h in j.prototype||"function"!=typeof g[h]||(f[h]=g[h]);return c.extend=d,c['super']=b,c.options=a,c}function e(a,b,c){if(a=a||m.hash(),!b)return a;for(var d in b)if("el"!==d&&"methods"!==d){var g=a[d],h=b[d],i=m.typeOf(g);c&&"Function"===i&&h?a[d]=f(g,h):c&&"Object"===i?e(g,h):void 0===g&&(a[d]=h)}return a}function f(a,b){return function(c){b.call(this,c),a.call(this,c)}}function g(){n.forEach(h)}function h(a){i.attrs[a]=i.prefix+"-"+a}var i=b("./config"),j=b("./viewmodel"),k=b("./directives"),l=b("./filters"),m=b("./utils");j.config=function(a){return a&&(m.extend(i,a),a.prefix&&g()),this},j.directive=function(a,b){return b?(k[a]=b,this):k[a]},j.filter=function(a,b){return b?(l[a]=b,this):l[a]},j.component=function(a,b){return b?(m.components[a]=m.toConstructor(b),this):m.components[a]},j.partial=function(a,b){return b?(m.partials[a]=m.toFragment(b),this):m.partials[a]},j.transition=function(a,b){return b?(m.transitions[a]=b,this):m.transitions[a]},j.extend=d;var n=["pre","text","repeat","partial","component","component-id","transition"];g(),c.exports=j}),a.register("vue/src/emitter.js",function(a,b,c){var d,e="emitter";try{d=b(e)}catch(f){d=b("events").EventEmitter,d.prototype.off=function(){var a=arguments.length>1?this.removeListener:this.removeAllListeners;return a.apply(this,arguments)}}c.exports=d}),a.register("vue/src/config.js",function(a,b,c){c.exports={prefix:"v",debug:!1,silent:!1,enterClass:"v-enter",leaveClass:"v-leave",attrs:{}}}),a.register("vue/src/utils.js",function(a,b,c){function d(){return Object.create(null)}var e,f=b("./config"),g=f.attrs,h=Object.prototype.toString,i=Array.prototype.join,j=window.console,k=window.webkitRequestAnimationFrame||window.requestAnimationFrame||window.setTimeout,l=c.exports={hash:d,components:d(),partials:d(),transitions:d(),attr:function(a,b,c){var d=g[b],e=a.getAttribute(d);return c||null===e||a.removeAttribute(d),e},defProtected:function(a,b,c,d,e){a.hasOwnProperty(b)||Object.defineProperty(a,b,{value:c,enumerable:!!d,configurable:!!e})},typeOf:function(a){return h.call(a).slice(8,-1)},bind:function(a,b){return function(c){return a.call(b,c)}},toText:function(a){return"string"==typeof a||"boolean"==typeof a||"number"==typeof a&&a==a?a:""},extend:function(a,b,c){for(var d in b)c&&a[d]||(a[d]=b[d])},unique:function(a){for(var b,c=l.hash(),d=a.length,e=[];d--;)b=a[d],c[b]||(c[b]=1,e.push(b));return e},toFragment:function(a){if("string"!=typeof a)return a;if("#"===a.charAt(0)){var b=document.getElementById(a.slice(1));if(!b)return;a=b.innerHTML}var c,d=document.createElement("div"),e=document.createDocumentFragment();for(d.innerHTML=a.trim();c=d.firstChild;)e.appendChild(c);return e},toConstructor:function(a){return e=e||b("./viewmodel"),"Object"===l.typeOf(a)?e.extend(a):"function"==typeof a?a:null},processOptions:function(a){var b,c=a.components,d=a.partials,e=a.template;if(c)for(b in c)c[b]=l.toConstructor(c[b]);if(d)for(b in d)d[b]=l.toFragment(d[b]);e&&(a.template=l.toFragment(e))},log:function(){f.debug&&j&&j.log(i.call(arguments," "))},warn:function(){!f.silent&&j&&j.warn(i.call(arguments," "))},nextTick:function(a){k(a,0)}}}),a.register("vue/src/compiler.js",function(a,b,c){function d(a,b){var c=this;c.init=!0,b=c.options=b||r(),i.processOptions(b);var d=c.data=b.data||{};s(a,d,!0),s(a,b.methods,!0),s(c,b.compilerOptions);var h=c.setupElement(b);q("\nnew VM instance:",h.tagName,"\n"),c.vm=a,c.dirs=[],c.exps=[],c.computed=[],c.childCompilers=[],c.emitter=new f;var j=c.parentCompiler;c.bindings=j?Object.create(j.bindings):r(),c.rootCompiler=j?e(j):c,t(a,"$",r()),t(a,"$el",h),t(a,"$compiler",c),t(a,"$root",c.rootCompiler.vm);var k=i.attr(h,"component-id");j&&(j.childCompilers.push(c),t(a,"$parent",j.vm),k&&(c.childId=k,j.vm.$[k]=a)),c.setupObserver(),c.execHook("beforeCompile","created"),s(d,a),g.observe(d,"",c.observer),c.repeat&&(t(d,"$index",c.repeatIndex,!1,!0),c.createBinding("$index")),Object.defineProperty(a,"$data",{enumerable:!1,get:function(){return c.data},set:function(a){var b=c.data;g.unobserve(b,"",c.observer),c.data=a,g.copyPaths(a,b),g.observe(a,"",c.observer)}}),c.compile(h,!0),c.computed.length&&m.parse(c.computed),c.init=!1,c.execHook("afterCompile","ready")}function e(a){for(;a.parentCompiler;)a=a.parentCompiler;return a}var f=b("./emitter"),g=b("./observer"),h=b("./config"),i=b("./utils"),j=b("./binding"),k=b("./directive"),l=b("./text-parser"),m=b("./deps-parser"),n=b("./exp-parser"),o=m.observer,p=Array.prototype.slice,q=i.log,r=i.hash,s=i.extend,t=i.defProtected,u=Object.prototype.hasOwnProperty,v=d.prototype;v.setupElement=function(a){var b=this.el="string"==typeof a.el?document.querySelector(a.el):a.el||document.createElement(a.tagName||"div"),c=a.template;if(c)if(a.replace&&1===c.childNodes.length){var d=c.childNodes[0].cloneNode(!0);b.parentNode&&(b.parentNode.insertBefore(d,b),b.parentNode.removeChild(b)),b=d}else b.innerHTML="",b.appendChild(c.cloneNode(!0));a.id&&(b.id=a.id),a.className&&(b.className=a.className);var e=a.attributes;if(e)for(var f in e)b.setAttribute(f,e[f]);return b},v.setupObserver=function(){function a(a){u.call(c,a)||b.createBinding(a)}var b=this,c=b.bindings,d=b.observer=new f;d.proxies=r(),d.on("get",function(b){a(b),o.emit("get",c[b])}).on("set",function(b,e){d.emit("change:"+b,e),a(b),c[b].update(e)}).on("mutate",function(b,e,f){d.emit("change:"+b,e,f),a(b),c[b].pub()})},v.compile=function(a,b){var c=this,d=a.nodeType,e=a.tagName;if(1===d&&"SCRIPT"!==e){if(null!==i.attr(a,"pre"))return;var f,g,j,l;if(f=i.attr(a,"repeat"))l=k.parse(h.attrs.repeat,f,c,a),l&&c.bindDirective(l);else if(!b&&(g=i.attr(a,"component")))l=k.parse(h.attrs.component,g,c,a),l&&(-1===g.indexOf(":")&&(l.isSimple=!0,l.arg=l.key),c.bindDirective(l));else{if(a.vue_trans=i.attr(a,"transition"),j=i.attr(a,"partial")){var m=c.getOption("partials",j);m&&(a.innerHTML="",a.appendChild(m.cloneNode(!0)))}c.compileNode(a)}}else 3===d&&c.compileTextNode(a)},v.compileNode=function(a){var b,c,d=a.attributes;if(d&&d.length){var e,f,g,h;for(b=d.length;b--;){for(e=d[b],f=!1,g=k.split(e.value),c=g.length;c--;){h=g[c];var i=k.parse(e.name,h,this,a);i&&(f=!0,this.bindDirective(i))}f&&a.removeAttribute(e.name)}}if(a.childNodes.length){var j=p.call(a.childNodes);for(b=0,c=j.length;c>b;b++)this.compile(j[b])}},v.compileTextNode=function(a){var b=l.parse(a.nodeValue);if(b){for(var c,d,e,f=h.attrs.text,g=0,i=b.length;i>g;g++){if(d=b[g],d.key)if(">"===d.key.charAt(0)){var j=d.key.slice(1).trim(),m=this.getOption("partials",j);m&&(c=m.cloneNode(!0),this.compileNode(c))}else c=document.createTextNode(""),e=k.parse(f,d.key,this,c),e&&this.bindDirective(e);else c=document.createTextNode(d);a.parentNode.insertBefore(c,a)}a.parentNode.removeChild(a)}},v.bindDirective=function(a){if(this.dirs.push(a),a.isSimple)return a.bind&&a.bind(),void 0;var b,c=this,d=a.key,e=d.split(".")[0];b=a.isExp?c.createBinding(d,!0,a.isFn):u.call(c.data,e)||u.call(c.vm,e)?u.call(c.bindings,d)?c.bindings[d]:c.createBinding(d):c.bindings[d]||c.rootCompiler.createBinding(d),b.instances.push(a),a.binding=b,a.bind&&a.bind();var f=b.value;void 0!==f&&(b.isComputed?a.refresh(f):a.update(f,!0))},v.createBinding=function(a,b,c){var d=this,e=d.bindings,f=new j(d,a,b,c);if(b){var h=n.parse(a,d);h&&(q("  created expression binding: "+a),f.value=c?h:{$get:h},d.markComputed(f),d.exps.push(f))}else if(q("  created binding: "+a),e[a]=f,f.root)d.define(a,f);else{g.ensurePath(d.data,a);var i=a.slice(0,a.lastIndexOf("."));u.call(e,i)||d.createBinding(i)}return f},v.define=function(a,b){q("    defined root binding: "+a);var c=this,d=c.data,e=c.vm,f=b.value=d[a];"Object"===i.typeOf(f)&&f.$get&&c.markComputed(b),a in d||(d[a]=void 0),d.__observer__&&g.convert(d,a),Object.defineProperty(e,a,{get:b.isComputed?function(){return c.data[a].$get()}:function(){return c.data[a]},set:b.isComputed?function(b){c.data[a].$set&&c.data[a].$set(b)}:function(b){c.data[a]=b}})},v.markComputed=function(a){var b=a.value,c=this.vm;a.isComputed=!0,a.isFn?a.value=i.bind(b,c):(b.$get=i.bind(b.$get,c),b.$set&&(b.$set=i.bind(b.$set,c))),this.computed.push(a)},v.getOption=function(a,b){var c=this.options,d=this.parentCompiler;return c[a]&&c[a][b]||(d?d.getOption(a,b):i[a]&&i[a][b])},v.execHook=function(a,b){var c=this.options,d=c[a]||c[b];d&&d.call(this.vm,c)},v.destroy=function(){var a,b,c,d,e,f=this,h=f.vm,i=f.el,j=f.dirs,k=f.exps,l=f.bindings;for(f.execHook("beforeDestroy"),f.observer.off(),f.emitter.off(),a=j.length;a--;)c=j[a],c.isSimple||c.binding.compiler===f||(d=c.binding.instances,d&&d.splice(d.indexOf(c),1)),c.unbind();for(a=k.length;a--;)k[a].unbind();for(b in l)u.call(l,b)&&(e=l[b],e.root&&g.unobserve(e.value,e.key,f.observer),e.unbind());var m=f.parentCompiler,n=f.childId;m&&(m.childCompilers.splice(m.childCompilers.indexOf(f),1),n&&delete m.vm.$[n]),i===document.body?i.innerHTML="":h.$remove(),f.execHook("afterDestroy")},c.exports=d}),a.register("vue/src/viewmodel.js",function(a,b,c){function d(a){new g(this,a)}function e(a){return"string"==typeof a?document.querySelector(a):a}function f(a,b){var c=b[0],d=a.$compiler.bindings[c];return d?d.compiler.vm:null}var g=b("./compiler"),h=b("./utils"),i=b("./transition"),j=h.defProtected,k=h.nextTick,l=d.prototype;j(l,"$set",function(a,b){var c=a.split("."),d=f(this,c);if(d){for(var e=0,g=c.length-1;g>e;e++)d=d[c[e]];d[c[e]]=b}}),j(l,"$watch",function(a,b){this.$compiler.observer.on("change:"+a,b)}),j(l,"$unwatch",function(a,b){var c=["change:"+a],d=this.$compiler.observer;b&&c.push(b),d.off.apply(d,c)}),j(l,"$destroy",function(){this.$compiler.destroy()}),j(l,"$broadcast",function(){for(var a,b=this.$compiler.childCompilers,c=b.length;c--;)a=b[c],a.emitter.emit.apply(a.emitter,arguments),a.vm.$broadcast.apply(a.vm,arguments)}),j(l,"$emit",function(){var a=this.$compiler,b=a.emitter,c=a.parentCompiler;b.emit.apply(b,arguments),c&&c.vm.$emit.apply(c.vm,arguments)}),["on","off","once"].forEach(function(a){j(l,"$"+a,function(){var b=this.$compiler.emitter;b[a].apply(b,arguments)})}),j(l,"$appendTo",function(a,b){a=e(a);var c=this.$el;i(c,1,function(){a.appendChild(c),b&&k(b)},this.$compiler)}),j(l,"$remove",function(a){var b=this.$el,c=b.parentNode;c&&i(b,-1,function(){c.removeChild(b),a&&k(a)},this.$compiler)}),j(l,"$before",function(a,b){a=e(a);var c=this.$el,d=a.parentNode;d&&i(c,1,function(){d.insertBefore(c,a),b&&k(b)},this.$compiler)}),j(l,"$after",function(a,b){a=e(a);var c=this.$el,d=a.parentNode,f=a.nextSibling;d&&i(c,1,function(){f?d.insertBefore(c,f):d.appendChild(c),b&&k(b)},this.$compiler)}),c.exports=d}),a.register("vue/src/binding.js",function(a,b,c){function d(a,b,c,d){this.value=void 0,this.isExp=!!c,this.isFn=d,this.root=!this.isExp&&-1===b.indexOf("."),this.compiler=a,this.key=b,this.instances=[],this.subs=[],this.deps=[]}var e=d.prototype;e.update=function(a){this.value=a;for(var b=this.instances.length;b--;)this.instances[b].update(a);this.pub()},e.refresh=function(){for(var a=this.instances.length;a--;)this.instances[a].refresh();this.pub()},e.pub=function(){for(var a=this.subs.length;a--;)this.subs[a].refresh()},e.unbind=function(){for(var a=this.instances.length;a--;)this.instances[a].unbind();a=this.deps.length;for(var b;a--;)b=this.deps[a].subs,b.splice(b.indexOf(this),1)},c.exports=d}),a.register("vue/src/observer.js",function(a,b,c){function d(a){for(var b in a)f(a,b)}function e(a,b){var c=a.__observer__;if(c||(c=new n,r(a,"__observer__",c)),c.path=b,w)a.__proto__=x;else for(var d in x)r(a,d,x[d])}function f(a,b){var c=b.charAt(0);if("$"!==c&&"_"!==c||"$index"===b){var d=a.__observer__,e=a[b],f=d.values;f[b]=e,d.emit("set",b,e),Object.defineProperty(a,b,{get:function(){var a=f[b];return p.active&&q(a)!==t&&d.emit("get",b),a},set:function(a){var c=f[b];l(c,b,d),f[b]=a,i(a,c),d.emit("set",b,a),k(a,b,d)}}),k(e,b,d)}}function g(a){m=m||b("./viewmodel");var c=q(a);return!(c!==t&&c!==u||a instanceof m)}function h(a){var b=q(a),c=a&&a.__observer__;if(b===u)c.emit("set","length",a.length);else if(b===t){var d,e;for(d in a)e=a[d],c.emit("set",d,e),h(e)}}function i(a,b){if(q(b)===t&&q(a)===t){var c,d,e,f;for(c in b)c in a||(e=b[c],d=q(e),d===t?(f=a[c]={},i(f,e)):a[c]=d===u?[]:void 0)}}function j(a,b){for(var c,d=b.split("."),e=0,g=d.length-1;g>e;e++)c=d[e],a[c]||(a[c]={},a.__observer__&&f(a,c)),a=a[c];q(a)===t&&(c=d[e],c in a||(a[c]=void 0,a.__observer__&&f(a,c)))}function k(a,b,c){if(g(a)){var f,i=b?b+".":"",j=!!a.__observer__;j||r(a,"__observer__",new n),f=a.__observer__,f.values=f.values||o.hash(),c.proxies=c.proxies||{};var k=c.proxies[i]={get:function(a){c.emit("get",i+a)},set:function(a,b){c.emit("set",i+a,b)},mutate:function(a,d,e){var f=a?i+a:b;c.emit("mutate",f,d,e);var g=e.method;"sort"!==g&&"reverse"!==g&&c.emit("set",f+".length",d.length)}};if(f.on("get",k.get).on("set",k.set).on("mutate",k.mutate),j)h(a);else{var l=q(a);l===t?d(a):l===u&&e(a)}}}function l(a,b,c){if(a&&a.__observer__){b=b?b+".":"";var d=c.proxies[b];d&&(a.__observer__.off("get",d.get).off("set",d.set).off("mutate",d.mutate),c.proxies[b]=null)}}var m,n=b("./emitter"),o=b("./utils"),p=b("./deps-parser").observer,q=o.typeOf,r=o.defProtected,s=Array.prototype.slice,t="Object",u="Array",v=["push","pop","shift","unshift","splice","sort","reverse"],w={}.__proto__,x=Object.create(Array.prototype);v.forEach(function(a){r(x,a,function(){var b=Array.prototype[a].apply(this,arguments);return this.__observer__.emit("mutate",this.__observer__.path,this,{method:a,args:s.call(arguments),result:b}),b},!w)});var y={remove:function(a){if("function"==typeof a){for(var b=this.length,c=[];b--;)a(this[b])&&c.push(this.splice(b,1)[0]);return c.reverse()}return"number"!=typeof a&&(a=this.indexOf(a)),a>-1?this.splice(a,1)[0]:void 0},replace:function(a,b){if("function"==typeof a){for(var c,d=this.length,e=[];d--;)c=a(this[d]),void 0!==c&&e.push(this.splice(d,1,c)[0]);return e.reverse()}return"number"!=typeof a&&(a=this.indexOf(a)),a>-1?this.splice(a,1,b)[0]:void 0}};for(var z in y)r(x,z,y[z],!w);c.exports={observe:k,unobserve:l,ensurePath:j,convert:f,copyPaths:i,watchArray:e}}),a.register("vue/src/directive.js",function(a,b,c){function d(a,b,c,d,g){this.compiler=d,this.vm=d.vm,this.el=g;var h=""===b;if("function"==typeof a)this[h?"bind":"_update"]=a;else for(var i in a)"unbind"===i||"update"===i?this["_"+i]=a[i]:this[i]=a[i];if(h)return this.isSimple=!0,void 0;this.expression=b.trim(),this.rawKey=c,e(this,c),this.isExp=!q.test(this.key)||p.test(this.key);var j=this.expression.slice(c.length).match(n);if(j){this.filters=[];for(var k,l=0,m=j.length;m>l;l++)k=f(j[l],this.compiler),k&&this.filters.push(k);this.filters.length||(this.filters=null)}else this.filters=null}function e(a,b){var c=b;if(b.indexOf(":")>-1){var d=b.match(m);c=d?d[2].trim():c,a.arg=d?d[1].trim():null}a.key=c}function f(a,b){var c=a.slice(1).match(o);if(c){c=c.map(function(a){return a.replace(/'/g,"").trim()});var d=c[0],e=b.getOption("filters",d)||j[d];return e?{name:d,apply:e,args:c.length>1?c.slice(1):null}:(h.warn("Unknown filter: "+d),void 0)}}var g=b("./config"),h=b("./utils"),i=b("./directives"),j=b("./filters"),k=/(?:['"](?:\\.|[^'"])*['"]|\((?:\\.|[^\)])*\)|\\.|[^,])+/g,l=/^(?:['"](?:\\.|[^'"])*['"]|\\.|[^\|]|\|\|)+/,m=/^([\w- ]+):(.+)$/,n=/\|[^\|]+/g,o=/[^\s']+|'[^']+'/g,p=/^\$(parent|root)\./,q=/^[\w\.\$]+$/,r=d.prototype;r.update=function(a,b){(b||a!==this.value)&&(this.value=a,this.apply(a))},r.refresh=function(a){if(a&&(this.value=a),this.isFn)a=this.value;else{if(a=this.value.$get(),void 0!==a&&a===this.computedValue)return;this.computedValue=a}this.apply(a)},r.apply=function(a){this._update(this.filters?this.applyFilters(a):a)},r.applyFilters=function(a){for(var b,c=a,d=0,e=this.filters.length;e>d;d++)b=this.filters[d],c=b.apply.call(this.vm,c,b.args);return c},r.unbind=function(a){this.el&&(this._unbind&&this._unbind(a),a||(this.vm=this.el=this.binding=this.compiler=null))},d.split=function(a){return a.indexOf(",")>-1?a.match(k)||[""]:[a]},d.parse=function(a,b,c,e){var f=g.prefix+"-";if(0===a.indexOf(f)){a=a.slice(f.length);var j=c.getOption("directives",a)||i[a];if(!j)return h.warn("unknown directive: "+a);var k;if(b.indexOf("|")>-1){var m=b.match(l);m&&(k=m[0].trim())}else k=b.trim();return k||""===b?new d(j,b,k,c,e):h.warn("invalid directive expression: "+b)}},c.exports=d}),a.register("vue/src/exp-parser.js",function(a,b,c){function d(a){return a=a.replace(l,"").replace(m,",").replace(k,"").replace(n,"").replace(o,""),a?a.split(/,+/):[]}function e(a,b){for(var c="",d=b.vm,e=a.indexOf("."),f=e>-1?a.slice(0,e):a;;){if(i.call(d.$data,f)||i.call(d,f))break;if(!d.$parent)break;d=d.$parent,c+="$parent."}return b=d.$compiler,i.call(b.bindings,a)||"$"===a.charAt(0)||b.createBinding(a),c}function f(a,b){var c;try{c=new Function(a)}catch(d){h.warn("Invalid expression: "+b)}return c}function g(a){return"$"===a.charAt(0)?"\\"+a:a}var h=b("./utils"),i=Object.prototype.hasOwnProperty,j="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,undefined,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,Math",k=new RegExp(["\\b"+j.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),l=/\/\*(?:.|\n)*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|'[^']*'|"[^"]*"|[\s\t\n]*\.[\s\t\n]*[$\w\.]+/g,m=/[^\w$]+/g,n=/\b\d[^,]*/g,o=/^,+|,+$/g;c.exports={parse:function(a,b){var c=d(a);if(!c.length)return f("return "+a,a);c=h.unique(c);var i="",j=new RegExp("[^$\\w\\.]("+c.map(g).join("|")+")[$\\w\\.]*\\b","g"),k=("return "+a).replace(j,function(a){var c=a.charAt(0);a=a.slice(1);var d="this."+e(a,b)+a;return i+=d+";",c+d});return k=i+k,f(k,a)}}}),a.register("vue/src/text-parser.js",function(a,b,c){var d=/\{\{(.+?)\}\}/;c.exports={parse:function(a){if(!d.test(a))return null;for(var b,c,e=[];b=a.match(d);)c=b.index,c>0&&e.push(a.slice(0,c)),e.push({key:b[1].trim()}),a=a.slice(c+b[0].length);return a.length&&e.push(a),e}}}),a.register("vue/src/deps-parser.js",function(a,b,c){function d(a){if(!a.isFn){f.log("\n─ "+a.key);var b=f.hash();g.on("get",function(c){var d=b[c.key];d&&d.compiler===c.compiler||(b[c.key]=c,f.log("  └─ "+c.key),a.deps.push(c),c.subs.push(a))}),a.value.$get(),g.off("get")}}var e=b("./emitter"),f=b("./utils"),g=new e;c.exports={observer:g,parse:function(a){f.log("\nparsing dependencies..."),g.active=!0,a.forEach(d),g.active=!1,f.log("\ndone.")}}}),a.register("vue/src/filters.js",function(a,b,c){var d={enter:13,tab:9,"delete":46,up:38,left:37,right:39,down:40,esc:27};c.exports={capitalize:function(a){return a||0===a?(a=a.toString(),a.charAt(0).toUpperCase()+a.slice(1)):""},uppercase:function(a){return a||0===a?a.toString().toUpperCase():""},lowercase:function(a){return a||0===a?a.toString().toLowerCase():""},currency:function(a,b){if(!a&&0!==a)return"";var c=b&&b[0]||"$",d=Math.floor(a).toString(),e=d.length%3,f=e>0?d.slice(0,e)+(d.length>3?",":""):"",g="."+a.toFixed(2).slice(-2);return c+f+d.slice(e).replace(/(\d{3})(?=\d)/g,"$1,")+g},pluralize:function(a,b){return b.length>1?b[a-1]||b[b.length-1]:b[a-1]||b[0]+"s"},key:function(a,b){if(a){var c=d[b[0]];return c||(c=parseInt(b[0],10)),function(b){b.keyCode===c&&a.call(this,b)}}}}}),a.register("vue/src/transition.js",function(a,b,c){function d(a,b,c){if(!g)return c(),k.CSS_SKIP;var d=a.classList,e=a.vue_trans_cb;if(b>0){e&&(a.removeEventListener(g,e),a.vue_trans_cb=null),d.add(i),c();{a.clientHeight}return d.remove(i),k.CSS_E}d.add(j);var f=function(b){b.target===a&&(a.removeEventListener(g,f),a.vue_trans_cb=null,c(),d.remove(j))};return a.addEventListener(g,f),a.vue_trans_cb=f,k.CSS_L}function e(a,b,c,d,e){var f=e.getOption("transitions",d);if(!f)return c(),k.JS_SKIP;var g=f.enter,h=f.leave;return b>0?"function"!=typeof g?(c(),k.JS_SKIP_E):(g(a,c),k.JS_E):"function"!=typeof h?(c(),k.JS_SKIP_L):(h(a,c),k.JS_L)}function f(){var a=document.createElement("vue"),b="transitionend",c={transition:b,mozTransition:b,webkitTransition:"webkitTransitionEnd"};for(var d in c)if(void 0!==a.style[d])return c[d]}var g=f(),h=b("./config"),i=h.enterClass,j=h.leaveClass,k={CSS_E:1,CSS_L:2,JS_E:3,JS_L:4,CSS_SKIP:-1,JS_SKIP:-2,JS_SKIP_E:-3,JS_SKIP_L:-4,INIT:-5,SKIP:-6},l=c.exports=function(a,b,c,f){var g=function(){c(),f.execHook(b>0?"enteredView":"leftView")};if(f.init)return g(),k.INIT;var h=a.vue_trans;return h?e(a,b,g,h,f):""===h?d(a,b,g):(g(),k.SKIP)};l.codes=k}),a.register("vue/src/directives/index.js",function(a,b,c){function d(a){return"-"===a.charAt(0)&&(a=a.slice(1)),a.replace(g,function(a,b){return b.toUpperCase()})}var e=b("../utils"),f=b("../transition");c.exports={on:b("./on"),repeat:b("./repeat"),model:b("./model"),"if":b("./if"),component:b("./component"),attr:function(a){this.el.setAttribute(this.arg,a)},text:function(a){this.el.textContent=e.toText(a)},html:function(a){this.el.innerHTML=e.toText(a)},visible:function(a){this.el.style.visibility=a?"":"hidden"},show:function(a){var b=this.el,c=a?"":"none",d=function(){b.style.display=c};f(b,a?1:-1,d,this.compiler)},"class":function(a){this.arg?this.el.classList[a?"add":"remove"](this.arg):(this.lastVal&&this.el.classList.remove(this.lastVal),a&&(this.el.classList.add(a),this.lastVal=a))},style:{bind:function(){this.arg=d(this.arg)},update:function(a){this.el.style[this.arg]=a}}};var g=/-(.)/g}),a.register("vue/src/directives/if.js",function(a,b,c){var d=b("../config"),e=b("../transition");c.exports={bind:function(){this.parent=this.el.parentNode,this.ref=document.createComment(d.prefix+"-if-"+this.key),this.el.vue_ref=this.ref},update:function(a){function b(){if(d.parentNode){var a=d.nextSibling;a?f.insertBefore(g,a):f.appendChild(g),f.removeChild(d)}}function c(){d.parentNode||(f.insertBefore(d,g),f.removeChild(g))}var d=this.el;if(!this.parent){if(!d.parentNode)return;this.parent=d.parentNode}var f=this.parent,g=this.ref,h=this.compiler;a?e(d,1,c,h):e(d,-1,b,h)},unbind:function(){this.el.vue_ref=null}}}),a.register("vue/src/directives/repeat.js",function(a,b,c){var d,e=b("../observer"),f=b("../emitter"),g=b("../utils"),h=b("../config"),i=b("../transition"),j={push:function(a){var b,c=a.args.length,d=this.collection.length-c;for(b=0;c>b;b++)this.buildItem(a.args[b],d+b)},pop:function(){var a=this.vms.pop();a&&a.$destroy()},unshift:function(a){var b,c=a.args.length;for(b=0;c>b;b++)this.buildItem(a.args[b],b)},shift:function(){var a=this.vms.shift();a&&a.$destroy()},splice:function(a){var b,c,d=a.args[0],e=a.args[1],f=a.args.length-2,g=this.vms.splice(d,e);for(b=0,c=g.length;c>b;b++)g[b].$destroy();for(b=0;f>b;b++)this.buildItem(a.args[b+2],d+b)},sort:function(){var a,b,c,d,e=this.vms,f=this.collection,g=f.length,h=new Array(g);for(a=0;g>a;a++)for(d=f[a],b=0;g>b;b++)if(c=e[b],c.$data===d){h[a]=c;break}for(a=0;g>a;a++)this.container.insertBefore(h[a].$el,this.ref);this.vms=h},reverse:function(){var a=this.vms;a.reverse();for(var b=0,c=a.length;c>b;b++)this.container.insertBefore(a[b].$el,this.ref)}};c.exports={bind:function(){var a=this,c=a.el,e=a.container=c.parentNode;d=d||b("../viewmodel");var f=g.attr(c,"component");a.ChildVM=a.compiler.getOption("components",f)||d,a.hasTrans=c.hasAttribute(h.attrs.transition),a.ref=document.createComment(h.prefix+"-repeat-"+a.arg),e.insertBefore(a.ref,c),e.removeChild(c),a.initiated=!1,a.collection=null,a.vms=null,a.mutationListener=function(b,c,d){var e=d.method;j[e].call(a,d),"push"!==e&&"pop"!==e&&a.updateIndexes()}},update:function(a){if(this.unbind(!0),this.container.vue_dHandlers=g.hash(),this.initiated||a&&a.length||(this.buildItem(),this.initiated=!0),a=this.collection=a||[],this.vms=[],a.__observer__||e.watchArray(a,null,new f),a.__observer__.on("mutate",this.mutationListener),a.length)for(var b=0,c=a.length;c>b;b++)this.buildItem(a[b],b)},buildItem:function(a,b){var c,d,e=this.el.cloneNode(!0),f=this.container;a&&(c=this.vms.length>b?this.vms[b].$el:this.ref,c.parentNode||(c=c.vue_ref),e.vue_trans=g.attr(e,"transition",!0),i(e,1,function(){f.insertBefore(e,c)},this.compiler)),d=new this.ChildVM({el:e,data:a,compilerOptions:{repeat:!0,repeatIndex:b,repeatCollection:this.collection,parentCompiler:this.compiler,delegator:f}}),a?this.vms.splice(b,0,d):d.$destroy()},updateIndexes:function(){for(var a=this.vms.length;a--;)this.vms[a].$data.$index=a},unbind:function(){if(this.collection){this.collection.__observer__.off("mutate",this.mutationListener);for(var a=this.vms.length;a--;)this.vms[a].$destroy()}var b=this.container,c=b.vue_dHandlers;for(var d in c)b.removeEventListener(c[d].event,c[d]);b.vue_dHandlers=null}}}),a.register("vue/src/directives/on.js",function(a,b,c){function d(a,b,c){for(;a&&a!==b;){if(a[c])return a;a=a.parentNode}}var e=b("../utils");c.exports={isFn:!0,bind:function(){this.compiler.repeat&&(this.el[this.expression]=!0,this.el.vue_viewmodel=this.vm)},update:function(a){if(this.unbind(!0),"function"!=typeof a)return e.warn('Directive "on" expects a function value.');var b=this.compiler,c=this.arg,f=this.binding.compiler.vm;if(b.repeat&&!this.vm.constructor['super']&&"blur"!==c&&"focus"!==c){var g=b.delegator,h=this.expression,i=g.vue_dHandlers[h];if(i)return;i=g.vue_dHandlers[h]=function(b){var c=d(b.target,g,h);c&&(b.el=c,b.targetVM=c.vue_viewmodel,a.call(f,b))},i.event=c,g.addEventListener(c,i)}else{var j=this.vm;this.handler=function(b){b.el=b.currentTarget,b.targetVM=j,a.call(f,b)},this.el.addEventListener(c,this.handler)}},unbind:function(a){this.el.removeEventListener(this.arg,this.handler),this.handler=null,a||(this.el.vue_viewmodel=null)}}}),a.register("vue/src/directives/model.js",function(a,b,c){var d=b("../utils"),e=navigator.userAgent.indexOf("MSIE 9.0")>0;c.exports={bind:function(){var a=this,b=a.el,c=b.type,d=b.tagName;a.lock=!1,a.event=a.compiler.options.lazy||"SELECT"===d||"checkbox"===c||"radio"===c?"change":"input";var f=a.attr="checkbox"===c?"checked":"INPUT"===d||"SELECT"===d||"TEXTAREA"===d?"value":"innerHTML";a.set=a.filters?function(){var c;try{c=b.selectionStart}catch(d){}setTimeout(function(){a.vm.$set(a.key,b[f]),void 0!==c&&b.setSelectionRange(c,c)},0)}:function(){a.lock=!0,a.vm.$set(a.key,b[f]),a.lock=!1},b.addEventListener(a.event,a.set),e&&(a.onCut=function(){setTimeout(function(){a.set()},0)},a.onDel=function(b){(46===b.keyCode||8===b.keyCode)&&a.set()},b.addEventListener("cut",a.onCut),b.addEventListener("keyup",a.onDel))},update:function(a){if(!this.lock){var b=this,c=b.el;if("SELECT"===c.tagName){for(var e=c.options,f=e.length,g=-1;f--;)if(e[f].value==a){g=f;break}e.selectedIndex=g}else"radio"===c.type?c.checked=a==c.value:"checkbox"===c.type?c.checked=!!a:c[b.attr]=d.toText(a)}},unbind:function(){this.el.removeEventListener(this.event,this.set),e&&(this.el.removeEventListener("cut",this.onCut),this.el.removeEventListener("keyup",this.onDel))}}}),a.register("vue/src/directives/component.js",function(a,b,c){var d=b("../utils");c.exports={bind:function(){this.isSimple&&this.build()},update:function(a){this.component?this.component.$data=a:this.build(a)},build:function(a){var b=this.compiler.getOption("components",this.arg);b||d.warn("unknown component: "+this.arg);var c={el:this.el,data:a,compilerOptions:{parentCompiler:this.compiler}};this.component=new b(c)},unbind:function(){this.component.$destroy()}}}),a.alias("component-emitter/index.js","vue/deps/emitter/index.js"),a.alias("component-emitter/index.js","emitter/index.js"),a.alias("vue/src/main.js","vue/index.js"),true?module.exports=a("vue"):"function"==typeof define&&define.amd?define(function(){return a("vue")}):this.Vue=a("vue")}();

/***/ },

/***/ 3:
/***/ function(module, exports, require) {

	function Events(){}function triggerEvents(t,e,r){var n=!0;if(t){var i=0,s=t.length,o=e[0],f=e[1],l=e[2];switch(e.length){case 0:for(;i<s;i+=2)n=!1!==t[i].call(t[i+1]||r)&&n;break;case 1:for(;i<s;i+=2)n=!1!==t[i].call(t[i+1]||r,o)&&n;break;case 2:for(;i<s;i+=2)n=!1!==t[i].call(t[i+1]||r,o,f)&&n;break;case 3:for(;i<s;i+=2)n=!1!==t[i].call(t[i+1]||r,o,f,l)&&n;break;default:for(;i<s;i+=2)n=!1!==t[i].apply(t[i+1]||r,e)&&n}}return n}function isFunction(t){return"[object Function]"===Object.prototype.toString.call(t)}var eventSplitter=/\s+/;Events.prototype.on=function(t,e,r){var n,i,s;if(!e)return this;for(n=this.__events||(this.__events={}),t=t.split(eventSplitter);i=t.shift();)s=n[i]||(n[i]=[]),s.push(e,r);return this},Events.prototype.once=function(t,e,r){var n=this,i=function(){n.off(t,i),e.apply(r||n,arguments)};return this.on(t,i,r)},Events.prototype.off=function(t,e,r){var n,i,s,o;if(!(n=this.__events))return this;if(!(t||e||r))return delete this.__events,this;for(t=t?t.split(eventSplitter):keys(n);i=t.shift();)if(s=n[i],s)if(e||r)for(o=s.length-2;o>=0;o-=2)e&&s[o]!==e||r&&s[o+1]!==r||s.splice(o,2);else delete n[i];return this},Events.prototype.trigger=function(t){var e,r,n,i,s,o,f=[],l=!0;if(!(e=this.__events))return this;for(t=t.split(eventSplitter),s=1,o=arguments.length;s<o;s++)f[s-1]=arguments[s];for(;r=t.shift();)(n=e.all)&&(n=n.slice()),(i=e[r])&&(i=i.slice()),"all"!==r&&(l=triggerEvents(i,f,this)&&l),l=triggerEvents(n,[r].concat(f),this)&&l;return l},Events.prototype.emit=Events.prototype.trigger;var keys=Object.keys;keys||(keys=function(t){var e=[];for(var r in t)t.hasOwnProperty(r)&&e.push(r);return e}),Events.mixTo=function(t){function e(e){t[e]=function(){return r[e].apply(i,Array.prototype.slice.call(arguments)),this}}var r=Events.prototype;if(isFunction(t))for(var n in r)r.hasOwnProperty(n)&&(t.prototype[n]=r[n]);else{var i=new Events;for(var n in r)r.hasOwnProperty(n)&&e(n)}},module.exports=Events;

/***/ },

/***/ 4:
/***/ function(module, exports, require) {

	/* WEBPACK VAR INJECTION */(function(require, module) {// Moment.js author : Tim Wood
	(function(a,b){function k(a,b){var c=a+"";while(c.length<b)c="0"+c;return c}function l(b,c,d,e){var f=typeof c=="string",g=f?{}:c,h,i,j;return f&&e&&(g[c]=e),h=(g.ms||g.milliseconds||0)+(g.s||g.seconds||0)*1e3+(g.m||g.minutes||0)*6e4+(g.h||g.hours||0)*36e5+(g.d||g.days||0)*864e5+(g.w||g.weeks||0)*6048e5,i=(g.M||g.months||0)+(g.y||g.years||0)*12,h&&b.setMilliseconds(b.getMilliseconds()+h*d),i&&(j=b.getDate(),b.setDate(1),b.setMonth(b.getMonth()+i*d),b.setDate(Math.min((new a(b.getFullYear(),b.getMonth()+1,0)).getDate(),j))),b}function m(a){return Object.prototype.toString.call(a)==="[object Array]"}function n(b){return new a(b[0],b[1]||0,b[2]||1,b[3]||0,b[4]||0,b[5]||0,b[6]||0)}function o(b,d){function p(d){var m,q;switch(d){case"M":return e+1;case"Mo":return e+1+c.ordinal(e+1);case"MM":return k(e+1,2);case"MMM":return c.monthsShort[e];case"MMMM":return c.months[e];case"D":return f;case"Do":return f+c.ordinal(f);case"DD":return k(f,2);case"DDD":return m=new a(g,e,f),q=new a(g,0,1),~~((m-q)/864e5+1.5);case"DDDo":return m=p("DDD"),m+c.ordinal(m);case"DDDD":return k(p("DDD"),3);case"d":return h;case"do":return h+c.ordinal(h);case"ddd":return c.weekdaysShort[h];case"dddd":return c.weekdays[h];case"w":return m=new a(g,e,f-h+5),q=new a(m.getFullYear(),0,4),~~((m-q)/864e5/7+1.5);case"wo":return m=p("w"),m+c.ordinal(m);case"ww":return k(p("w"),2);case"YY":return(g+"").slice(-2);case"YYYY":return g;case"a":return i>11?"pm":"am";case"A":return i>11?"PM":"AM";case"H":return i;case"HH":return k(i,2);case"h":return i%12||12;case"hh":return k(i%12||12,2);case"m":return j;case"mm":return k(j,2);case"s":return l;case"ss":return k(l,2);case"zz":case"z":return(b.toString().match(o)||[""])[0].replace(n,"");default:return d.replace("\\","")}}var e=b.getMonth(),f=b.getDate(),g=b.getFullYear(),h=b.getDay(),i=b.getHours(),j=b.getMinutes(),l=b.getSeconds(),m=/(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|dddd?|do?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|zz?)/g,n=/[^A-Z]/g,o=/\([A-Za-z ]+\)|:[0-9]{2} [A-Z]{3} /g;return d.replace(m,p)}function p(a,b){function i(a,b){switch(a){case"M":case"MM":c[1]=~~b-1;break;case"D":case"DD":case"DDD":case"DDDD":c[2]=~~b;break;case"YY":b=~~b,c[0]=b+(b>70?1900:2e3);break;case"YYYY":c[0]=~~b;break;case"a":case"A":h=b.toLowerCase()==="pm";break;case"H":case"HH":case"h":case"hh":c[3]=~~b;break;case"m":case"mm":c[4]=~~b;break;case"s":case"ss":c[5]=~~b}}var c=[0],d=/[0-9a-zA-Z]+/g,e=a.match(d),f=b.match(d),g,h;for(g=0;g<f.length;g++)i(f[g],e[g]);return h&&c[3]<12&&(c[3]+=12),n(c)}function q(a,b){var c=Math.min(a.length,b.length),d=Math.abs(a.length-b.length),e=0,f;for(f=0;f<c;f++)~~a[f]!==~~b[f]&&e++;return e+d}function r(a,b){var c,d=/[0-9a-zA-Z]+/g,e=a.match(d),f=[],g=99,h,i,j;for(h=0;h<b.length;h++)i=p(a,b[h]),j=q(e,o(i,b[h]).match(d)),j<g&&(g=j,c=i);return c}function s(a){this._d=a}function t(a,b){return c.relativeTime[a].replace(/%d/i,b||1)}function u(a){var b=Math.abs(a)/1e3,c=b/60,e=c/60,f=e/24,g=f/365;return b<45&&t("s",d(b))||d(c)===1&&t("m")||c<45&&t("mm",d(c))||d(e)===1&&t("h")||e<22&&t("hh",d(e))||d(f)===1&&t("d")||f<25&&t("dd",d(f))||f<45&&t("M")||f<345&&t("MM",d(f/30))||d(g)===1&&t("y")||t("yy",d(g))}function v(a,b){c.fn[a]=function(a){return a?(this._d["set"+b](a),this):this._d["get"+b]()}}var c,d=Math.round,e={},f=typeof module!="undefined",g="months|monthsShort|weekdays|weekdaysShort|relativeTime|ordinal".split("|"),h,i="1.0.1",j="Month|Date|Hours|Minutes|Seconds".split("|");c=function(c,d){var e;return c&&c._d instanceof a?e=c._d:d?m(d)?e=r(c,d):e=p(c,d):e=c===b?new a:c instanceof a?c:m(c)?n(c):new a(c),new s(e)},c.version=i,c.lang=function(a,b){var d,h,i;b&&(e[a]=b);if(e[a])for(d=0;d<g.length;d++)h=g[d],c[h]=e[a][h]||c[h];else f&&(i=require(6)("./"+a),c.lang(a,i))},c.lang("en",{months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),relativeTime:{future:"in %s",past:"%s ago",s:"seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},ordinal:function(a){var b=a%10;return~~(a%100/10)===1?"th":b===1?"st":b===2?"nd":b===3?"rd":"th"}}),c.fn=s.prototype={valueOf:function(){return+this._d},"native":function(){return this._d},format:function(a){return o(this._d,a)},add:function(a,b){return this._d=l(this._d,a,1,b),this},subtract:function(a,b){return this._d=l(this._d,a,-1,b),this},diff:function(a,b){return this._d-c(a,b)._d},from:function(a,b){var d=this.diff(a),e=d<0?c.relativeTime.past:c.relativeTime.future,f=u(d);return b?f:e.replace(/%s/i,f)},fromNow:function(a){return this.from(c(),a)},isLeapYear:function(){var a=this._d.getFullYear();return a%4===0&&a%100!==0||a%400===0}};for(h=0;h<j.length;h++)v(j[h].toLowerCase(),j[h]);v("year","FullYear"),c.fn.day=function(){return this._d.getDay()},f&&(module.exports=c),typeof window!="undefined"&&(window.moment=c)})(Date)
	/* WEBPACK VAR INJECTION */}(require, require(7)(module)))

/***/ },

/***/ 5:
/***/ function(module, exports, require) {

	require(17)(".am-flex[am-mode~=average] .am-flexbox-item,.range-bar{width:100%}.am-flex{text-align:left;display:-webkit-box;display:-webkit-flex;-webkit-box-align:center;-webkit-align-items:center}.am-flex .am-flex-item{-webkit-box-sizing:border-box;-webkit-box-flex:1;-webkit-flex:1;margin-left:8px;min-width:20px}*,body{margin:0}.am-flex .am-flex-item:first-child{margin-left:0}*{padding:0;box-sizing:border-box;-webkit-box-sizing:border-box}body{font-family:'Helvetica Neue',Arial,sans-serif;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkAgMAAAANjH3HAAAADFBMVEXu7u7r6+vm5ubf39+t3zZzAAAH/UlEQVR4XnWW0WriihaGl0HFSKckQSUJrZhgJAnWZ2i8mj1UqbnaU6oY76ZUn0EDZ5gOUzFhzjAWlSTMGdqieYY6tKX1SsVK9aoVlcanOJ672Xv3PMHP4v/Wtxb0ppfd8WLxdPOv26v5rDuZPzvOi/NrWgda8HA+kfcibs6FoSERR/AYhnl5Gt7uZO29jb3mu7fhy+NOYyOx12mTJ836IbCYq1CTDCXPYHkJY8qVvJI3dKuMwO1oeD2/nuqr/s3D4F57nt2XV4vV85MFnlgACIFnUS9Hu8iAmxUEF8SEaBD+PNqJbzbb5MWX1sVZrnXcaVK5RGKzEwarouVNxcwrSRlnJVmR8Vo+Y2o6AXPnvjy7/m4+fF2n/LzujcyHdfLj4xAA5z0+mmYpoGjBR3IcR9EB3huKwYbtS+8kSm/jF5sbxVQ8vZe6SHQ2stkt0CUso9QwCVFwpqIweUM1oKBbEQSW07tBfzxyFub1bDH8dT25mY7rZ99XH4H3c2IIDboITqR50RMTI4EY5xUiMegcbZ+RzUTJTqR3NsPFP/Y29w4auS9fLkDXjEhGSybLuurKQ3k/r8hMzbWr5mE5uho6L7OT28W0+zi6thyne7V05g9LEGIxnvfEonTIjRMsQmM0HvMTjOiHN6nLsFAsVUtosdQWjpqtZrH0/jKcbUBN1QvJmq7JGsOqmSSLSLqkEUYFgbuHz+t+Vs/z1XI6mA213vDnYLxcOXOIstEI7RVRkcKiAkFCDCWDUdJDCdD68P48flbtpOuHxWypkaPeNcLN7GaqA7JsaeWMbML+uqWMXMuvcyNJxJWB3t3z8uyzczldTp9u67ezq9X4qrt6uv4GRCyK+LGIN0C4o26aEDFPEEdxhkVhr9E+vuxsNdonB83Wdvtz6/yyvZNI2SXAwCobrMSq0u5u2aURCmMUjEhS0uDVWRbfHldAoy6eRrwCgpGYKBKxWISM4ICLHBxvxDd37PBpFs3tJMJxO5VI8Id2sVoEqyBLjMHqmYKRrFV2y0YZVKtQQzC4WY3NiXkyXK5m81n/eTn6ejW/ubh5uQMq5F7TjATQKCeIokB5QjQdC+F8FP7Csn/74GInvJHIdv6wQZJVk1H2NVaWpYImWYai7jM4UajBaqJN7hc/6rWvo95g3F8+jl5O5jNnMAfGxXloH0/zKI5HiQiN0DEBjaCID8Lh8OarbMPrS2poFixfzp2T++Fq2nOeB4/D8XS5mBhLczEF1OcWfLSXpsUYHqAYQRQEGvFQgSjYh/Z2+1P8oHFuHzVPyVRLPEzQZ5RdhdeQVlVDj0B/NR7XF8545SxvJtZtr/8wcR7NbrcPBOrFPbQY8ATZgIAKHpGL0UyIwtzQ2jp+00lk9z7Em4eNevh9rlNNVxOn9iHUDLacByVZruWxSsFETEXRZa1g6dB9vB2vev3xw3Tyn5+9wa3Vux92H/T5DfjRwNpqpCfq5lBa8GOoy0thhAsPwLbdOEuR2WKDTG0Wt4WTD8Jxu9reODqDgpyRkF0XwxqKgVs4gUgRa1/B1Qw8jAbfvv3of1wOl1P1dzlA1ONlomgo9o89gtbBO/LkqNS5+NTyb/pPS6eX2beHp+lqFRjCUBBNL+/XymveDMW0LAWXdEKHv7jTmd/UK05vPPze+wlkKCiu52F5txhleS/hCZIhYGiMhWK6dbCVTmTj8VQj2/lQv6iel1o7x6ctUMCqWRlFrRAyzrJqhF2H5rGCpkC9O+x9XAxvlovnxcnL/H4xubkbd7vLMQhMMOYPxSgREymcQrkohQUCfjyEQdW236Atu5n7n3CqHbvZ2TrOpdvZFBhJQivUKlCRzXJ532VJhGbWaoqJwWK8vL+fjQZ3v4bz/uLaMbuPjrWY3H8HnguFWD5Co0TIAxwlun1uCgGa5aH+tlnqfMntvTts2o3ORmOr2HzDb1PpD5DUkxm1nEnuA6HKiMuK7FoVXVFNGR5ftIU5tM4t1XAmy8rtxbfRD+t2+LCAdUiQ5WL/1CkkLkvNo3bO3qinjz43q6X4H+HD0z/b6T1g9RqGFHRJLmRMi7As2ciYGURTMPg1H57/+Hp9dzUZLIdnH1fq9Xwyevl2NQYcxWNuf4AJrgVHkgTQlJ/kfbTAwN/PaPZLqp3aLoknUK5YOpZ3mWxmV4lo+zWNWEtVTaosDC+cZW/gzC573afBxdNIfZjOr67vRz/gb/IUOZGJsELUQ0G8KjROirntT/FcY+s0jdqljfhRvH3chIhuyMy+a7dm5C0TqxkVWdNxQ9UNGD8P/91/miwGY717NXi5uZtOZ5OrydQBlkcFP+lxsyQPrG8NHU9xiF8k/GDHbSHceSUNMmXJkPACW5FZuaAXCmpZLkhmXsJh9PX/EAeiGMEoUQgKQijEi7RA415PVPQECOh8Jg+/2/ZZwj5vnP8OBeA6prEFi00yCKFIu8iuXJPLZTOThLOrmx+j819Py7uvfz1FEBMRzktzLp/XTZAhn5uh/JSHFYIEVMnj6mFuL77XCif+PM1mU9SHo5SvVEyASciGgjOgl5Oyoii7+V3E3M+4pAz81khl9bM3ufo17027n+oTEHA2xPBi0M8GCI4OsQyEBDftDSFwGm++aWVTG9/t9wdbv8sbCvmyKe3qct6yQDNVg5EYJGIwlgsWt5Ppw3TlPI/vnmfrt2A6vuv35x975+AFmuACXgINoijOBUUyyrM8zfloKH4uthqvSQ6ISuV1JfwXb7b94C65p5AAAAAASUVORK5CYII=) #eaeaea;background:linear-gradient(to bottom,#f0f0f0,#e0e0e0);color:#333;line-height:1.6;padding:20px;display:flex;justify-content:center;align-items:center;min-height:100vh}.web-margin{margin:20px 0}.range-bar{background-color:#a9acb1;border-radius:15px;-webkit-border-radius:15px;display:block;height:4px;position:relative}.range-quantity{background-color:#04be02;border-radius:15px;-webkit-border-radius:15px;display:block;height:100%;width:0}.range-handle{background-color:#fff;border-radius:100%;-webkit-border-radius:15px;cursor:move;height:30px;left:0;top:-13px;position:absolute;width:30px;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.4);box-shadow:0 1px 3px rgba(0,0,0,.4)}.range-max,.range-min{color:#181819;font-size:12px;height:20px;padding-top:4px;position:absolute;text-align:center;top:-9px;width:24px}.range-min{left:-30px}.range-max{right:-30px}.vertical{height:100%;width:4px}.vertical .range-quantity{bottom:0;height:0;position:absolute;width:100%}.vertical .range-handle{bottom:0;left:-13px;top:auto}.vertical .range-max,.vertical .range-min{left:-10px;right:auto;top:auto}.vertical .range-min{bottom:-30px}.vertical .range-max{top:-30px}.unselectable{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.range-disabled{cursor:default}");
	var __vue_template__ = "<div class=\"rootView\" v-css=\"{'web-margin': isPC}\">\n    <div v-component=\"nav\" v-if=\"isPC\"></div>\n    <div v-component=\"tab\" v-if=\"!isPC\"></div>\n    <!-- <button v-on=\"click: isNav = true\">显示</button> -->\n  </div>";
	module.exports = {
	  data: {
	    isNav: true
	  },
	  ready: function() {
	    return alert(isPC);
	  },
	  components: {
	    nav: require(8),
	    tab: require(9)
	  }
	};

	;(typeof module.exports === "function"? module.exports.options: module.exports).template = __vue_template__;


/***/ },

/***/ 6:
/***/ function(module, exports, require) {

	var map = {
		"./all.min": 10,
		"./all.min.js": 10,
		"./fr": 11,
		"./fr.js": 11,
		"./fr.min": 12,
		"./fr.min.js": 12,
		"./it": 13,
		"./it.js": 13,
		"./it.min": 14,
		"./it.min.js": 14,
		"./pt": 15,
		"./pt.js": 15,
		"./pt.min": 16,
		"./pt.min.js": 16
	};
	function webpackContext(req) {
		return require(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;


/***/ },

/***/ 7:
/***/ function(module, exports, require) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },

/***/ 8:
/***/ function(module, exports, require) {

	require(17)(".container,.ios-nav-container{margin:0 auto;background:#fff}.ios-title,.slogan{font-weight:300;text-align:center}.rootView{width:100vw;height:100%}.container{max-width:960px;width:100%;border-radius:8px;box-shadow:0 4px 15px rgba(0,0,0,.15);overflow:hidden;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-moz-box-orient:vertical;-moz-box-direction:normal;-moz-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-moz-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.ios-nav-container{padding:20px 0;width:96%}.ios-title{font-size:36px;color:#333;margin:10px 0 30px;letter-spacing:-.5px;text-shadow:0 1px 1px rgba(0,0,0,.1)}.ios-nav{display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-moz-box-pack:justify;-ms-flex-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;background:#f8f8f8;border:1px solid #e0e0e0;border-radius:6px;overflow:hidden;box-shadow:0 2px 5px rgba(0,0,0,.08)}.nav-item{-webkit-box-flex:1;-moz-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;text-align:center;padding:15px 5px;font-weight:500;color:#555;font-size:16px;position:relative;background:linear-gradient(to bottom,#fcfcfc,#f0f0f0);transition:all .2s ease;text-shadow:0 1px 0 rgba(255,255,255,.8);cursor:pointer;min-width:104px}.product-header,.slogan{text-shadow:0 1px 1px rgba(0,0,0,.1)}.nav-item:not(:last-child)::after{content:'';position:absolute;right:0;top:10%;height:80%;width:1px;background:linear-gradient(to bottom,#e0e0e0,#f0f0f0,#e0e0e0)}.nav-item.active{background:#d5d5d5;background:linear-gradient(to bottom,#e0e0e0,#d5d5d5);box-shadow:inset 0 1px 3px rgba(0,0,0,.2);color:#333;font-weight:700}.content{padding:40px 20px;background:#fff;min-height:300px;width:100%}.content-section{display:none;animation:fadeIn .5s ease}.content-section.active{display:block}@keyframes fadeIn{from{opacity:0}to{opacity:1}}.product-header{text-align:center;font-size:24px;margin-bottom:20px;color:#36c}.product-content{display:flex;align-items:center;justify-content:center;gap:20px}.product-image{width:200px;height:200px;background:linear-gradient(to bottom right,#f0f0f0,#e0e0e0);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:60px;color:#888;box-shadow:0 3px 8px rgba(0,0,0,.1)}.product-info{max-width:400px;padding:15px;background:#f8f8f8;border-radius:6px;border:1px solid #e0e0e0}.product-title{font-size:20px;margin-bottom:10px;color:#333}.product-description{color:#555;line-height:1.6}.slogan{font-size:28px;color:#444;margin:30px 0;line-height:1.4}.highlight{color:#36c;font-weight:500}.footer{padding:20px;-moz-border-radius:8px;margin:0 8px 8px;text-align:center;color:#777;font-size:13px;border-top:1px solid #eee;background:#f9f9f9}.subtitle{text-align:left;font-size:14px;color:#666}.yellow{color:#ff1}");
	var __vue_template__ = "<div class=\"container\">\n    <div class=\"ios-nav-container\" v-if=\"!osType\">\n      <h1 class=\"ios-title\">萌仔网</h1>\n      <div class=\"ios-nav\" id=\"iosNav\">\n        <div class=\"nav-item\" v-css=\"{'active': $index === 2}\" v-repeat=\"tabs\" v-click=\"clickNav\">{{title}}</div>\n      </div>\n    </div>\n\n    <div class=\"content\" v-if=\"!osType\">\n      <div class=\"content-section\" id=\"section-0\" name=\"0\">\n        <div class=\"app-container\" v-if=\"newTodos\" v-component=\"todo\">\n        </div>\n      </div>\n\n      <div class=\"content-section\" id=\"section-1\" name=\"1\">\n        <div class=\"product-header\" v-component=\"fileList\"></div>\n      </div>\n\n      <div class=\"content-section active\" id=\"section-2\" name=\"2\">\n        <div class=\"\" v-component=\"a\"></div>\n      </div>\n\n      <div class=\"content-section\" id=\"section-3\" name=\"3\">\n        <div class=\"product-header\">\n          <div class=\"\" v-component=\"fillLight\"></div>\n        </div>\n      </div>\n\n      <div class=\"content-section\" id=\"section-4\" name=\"4\">\n        <div class=\"product-header\">\n          iTunes - The Best Way to Enjoy Your Media\n        </div>\n      </div>\n\n      <div class=\"content-section\" id=\"section-5\" name=\"5\">\n        <div class=\"product-header\">\n          产品:MY.补光灯{{hcgList.length}}\n          <ul class=\"li\">视觉设计：老婆大人</ul>\n          <ul class=\"li\">客户端：刘竞</ul>\n          <ul class=\"li\">Web端：刘竞</ul>\n          <ul class=\"li\">服务端：刘竞</ul>\n          <a class=\"weui_cell\" v-repeat=\"hcgList\">\n            <div class=\"weui_cell_bd weui_cell_primary\">\n              <div v-css=\"{'yellow': !isEdit}\">                \n                <span v-click=\"eidtHCGValue\">{{HCG}}</span>\n                <span class=\"subtitle\"> / </span>\n                <span v-click=\"eidtProgValue\">{{ Prog}}</span>\n                <span class=\"subtitle\"> / </span>\n                <span v-click=\"eidtE2Value\">{{ E2}}</span>\n                \n              </div>\n\n              <span class=\"subtitle\">{{date}} - 第 {{$index}} 周</span>\n            </div>\n            <div class=\"weui_cell_ft with_arrow\">点击数值</div>\n          </a>\n        </div>\n      </div>\n      <a class=\"weui_cell\">\n        <div class=\"weui_cell_bd weui_cell_primary\">\n        </div>\n      </a>\n      <p class=\"slogan\">\n        We've taken iOS<br>to a whole\n        <span class=\"highlight\">new Level!</span>\n      </p>\n    </div>\n    <div v-if=\"!osType\">\n      <a class=\"weui_cell\" href=\"javascript:;\" v-repeat=\"hcgList\" v-click=\"userAgent\">\n        <div class=\"weui_cell_bd weui_cell_primary\">\n          <p>浏览器</p>\n          <img src=\"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==\" alt=\"\">\n        </div>\n        <div class=\"weui_cell_ft with_arrow\">\n          userAgent\n        </div>\n      </a>\n    </div>\n    <div class=\"footer\">\n      <h1 v-if=\"osType\">火狐浏览器 版本过低</h1>\n      <p>Copyright © 2015-2025 Meng-zi.com</p>\n      <p>\n        Text is available under the Creative Commons Attribution-ShareAlike\n        License 4.0; additional terms may apply.\n      </p>\n    </div>\n    <!-- <div class=\"\" v-component='popup'></div> -->\n  </div>";
	module.exports = {
	  name: 'nav',
	  components: {
	    todo: require(18),
	    a: require(19),
	    fileList: require(20),
	    fillLight: require(21)
	  },
	  ready: function() {
	    console.log(this.$el);
	    return this.originJSCode();
	  },
	  methods: {
	    userAgent: function() {
	      return alert(navigator.userAgent);
	    },
	    eidtHCGValue: function() {
	      var inputValue;
	      console.log('eidtHCGValue', this.vm);
	      inputValue = prompt("编辑HCG数值:", this.vm.HCG);
	      alert(this.vm.date + "这天的HCG数值将更新为: " + inputValue + "!");
	      inputValue && (this.vm.HCG = inputValue);
	      return this.vm.isEdit = true;
	    },
	    eidtProgValue: function() {
	      var inputValue;
	      console.log('eidtProgValue', this.vm);
	      inputValue = prompt("编辑Prog数值:", this.vm.Prog);
	      alert(this.vm.date + "这天的Prog数值将更新为: " + inputValue + "!");
	      inputValue && (this.vm.Prog = inputValue);
	      return this.vm.isEdit = true;
	    },
	    eidtE2Value: function() {
	      var inputValue;
	      console.log('eidtE2Value', this.vm);
	      inputValue = prompt("编辑E2数值:", this.vm.E2);
	      alert(this.vm.date + "这天的E2数值将更新为, " + inputValue + "!");
	      inputValue && (this.vm.E2 = inputValue);
	      return this.vm.isEdit = true;
	    },
	    setupData: function() {
	      var _this, xhr;
	      _this = this;
	      xhr = new XMLHttpRequest();
	      xhr.open('GET', '/todoList', true);
	      xhr.onreadystatechange = function() {
	        var json, newDatas;
	        if (xhr.readyState === 4 && xhr.status === 200) {
	          json = JSON.parse(xhr.responseText);
	          newDatas = json.map(function(obj) {
	            return {
	              title: obj.title,
	              done: Boolean(obj.done)
	            };
	          });
	          console.log(newDatas);
	          _this.$root.myTodos = newDatas;
	          _this.$root.newTodos = newDatas;
	          return console.log('更新待办列表', json);
	        } else if (xhr.readyState === 4) {
	          return console.error('Request erro status:', xhr.status);
	        }
	      };
	      return xhr.send();
	    },
	    clickNav: function(vm, e) {
	      var activeTab;
	      return activeTab = vm.index;
	    },
	    originJSCode: function() {
	      var i, len, navItem, navItems, results, root;
	      console.log('navbar');
	      root = this;
	      navItems = document.getElementsByClassName('nav-item');
	      results = [];
	      for (i = 0, len = navItems.length; i < len; i++) {
	        navItem = navItems[i];
	        results.push(navItem.addEventListener('click', function() {
	          var contentSections, index, item, j, k, len1, len2, section, targetId, targetSection;
	          for (index = j = 0, len1 = navItems.length; j < len1; index = ++j) {
	            item = navItems[index];
	            item.className = item.className.replace(/\bactive\b/g, '');
	            item.setAttribute('name', index);
	            root.$root.activeTab = index;
	          }
	          this.className += ' active';
	          targetId = 'section-' + this.getAttribute('name');
	          contentSections = document.getElementsByClassName('content-section');
	          for (k = 0, len2 = contentSections.length; k < len2; k++) {
	            section = contentSections[k];
	            section.className = section.className.replace(/\bactive\b/g, '');
	          }
	          targetSection = document.getElementById(targetId);
	          if (targetSection) {
	            return targetSection.className += ' active';
	          }
	        }));
	      }
	      return results;
	    }
	  }
	};

	;(typeof module.exports === "function"? module.exports.options: module.exports).template = __vue_template__;


/***/ },

/***/ 9:
/***/ function(module, exports, require) {

	require(17)(".cell{width:100vw;overflow:hidden}.pink-cell{color:pink}.vuee-sticky{width:100%;position:-webkit-sticky;position:sticky;top:0;z-index:999}.vuee-fixed{width:100%;position:fixed;top:0}body{margin:0;padding:0}.app-container{width:100%;background:#fff}.router-view{height:100%;margin:0 auto}.vuee-tab{display:-webkit-box;display:-webkit-flex;background-color:#fff;height:44px;user-select:none}.weui_cell_ft.with_arrow:after{content:\" \";display:inline-block;-webkit-transform:rotate(45deg);transform:rotate(45deg);height:6px;width:6px;border-width:2px 2px 0 0;border-color:#C8C8CD;border-style:solid;position:relative;top:-2px;top:-1px;margin-left:.3em}.label_desc{font-size:14px;color:#666}.vux-clocker-tpl{height:200px;color:#f80;background:pink;text-align:center}.button-group{padding:8px 16px;height:100%}.increase-rate,.red_record{color:red}.normal-rate{color:#666}.vuee-tab button{padding:0;border:0;outline:0;background:0 0;-webkit-appearance:none;user-select:none}.vuee-tab .vuee-tab-item{display:block;-webkit-box-flex:1;-webkit-flex:1;width:100%;height:100%;-webkit-box-sizing:border-box;background:-webkit-gradient(linear,left top,left bottom,from(#e5e5e5),to(#e5e5e5)) bottom left no-repeat;background:-webkit-linear-gradient(270deg,#e5e5e5,#e5e5e5,rgba(229,229,229,0)) bottom left no-repeat;background:linear-gradient(180deg,#e5e5e5,#e5e5e5,rgba(229,229,229,0)) bottom left no-repeat;-webkit-background-size:100% 1px;font-size:14px;text-align:center;line-height:44px;color:#666}.vuee-tab .vuee-tab-item.vuee-tab-selected{background:0 0;color:#04be02;border-bottom:3px solid #04be02}");
	var __vue_template__ = "<div class=\"app-container\">\n    <!-- 测试Sticky兼容 -->\n    <div class=\"vuee-tab\">\n      <div class=\"vuee-tab-item\" v-css=\"{'vuee-tab-selected': tabSelect === 0}\" v-touch=\"tapTabItemOne\">\n        叶酸提醒{{$root.tabSelect}}\n      </div>\n      <div class=\"vuee-tab-item\" v-css=\"{'vuee-tab-selected': tabSelect === 1}\" v-touch=\"tapTabItemTwo\">\n        HCG\n      </div>\n      <div class=\"vuee-tab-item\" v-css=\"{'vuee-tab-selected': tabSelect === 2}\" v-touch=\"tapTabItemThree\">\n        孕酮\n      </div>\n      <div class=\"vuee-tab-item\" v-css=\"{'vuee-tab-selected': tabSelect === 3}\" v-touch=\"tapTabItemFour\">\n        雌二醇\n      </div>\n    </div>\n    <div class=\"router-view\" v-if=\"tabSelect === 0\">\n      <div class=\"button-group\">\n        <a href=\"javascript:;\" class=\"weui_btn weui_btn_primary\" v-touch=\"saveAction\">保存</a>\n      </div>\n      <div class=\"weui_cell weui_cell_switch pink-cell\">\n        <div class=\"weui_cell_bd weui_cell_primary\">\n          <div class=\"vux-clocker-tpl\">\n            距离7-7还有\n            <span>{{timeString}}</span>\n          </div>\n        </div>\n      </div>\n      <div class=\"weui_cell weui_cell_switch\" v-css=\"{&quot;pink-cell&quot;: isToday(date) &amp;&amp; !done}\" v-repeat=\"ysTodos\">\n        <div class=\"weui_cell_bd weui_cell_primary\">\n          <p v-css=\"{&quot;red&quot;: isToday(date) &amp;&amp; !done}\">{{ title }}</p>\n          <span v-css=\"{&quot;red_record&quot;: isToday(date) &amp;&amp; !done}\" class=\"label_desc\">{{ date }}</span>\n        </div>\n        <div class=\"weui_cell_ft\">\n          <input class=\"weui_switch\" type=\"checkbox\" v-attrs=\"{'disabled': done}\" v-model=\"done\">\n        </div>\n      </div>\n      <div class=\"button-group\" style=\"padding:8px;height:100%\">\n        <a href=\"javascript:;\" class=\"weui_btn weui_btn_warn\" v-touch=\"initLocalData\">初始化数据</a>\n      </div>\n      <!-- <div v-component='mybtn:title=\"test\"'></div> -->\n    </div>\n    <div class=\"router-view\" style=\"user-select: none\" v-if=\"tabSelect === 1 || tabSelect === 2 ||tabSelect === 3\">\n      <div class=\"button-group\">\n        <a href=\"javascript:;\" class=\"weui_btn weui_btn_primary\" v-touch=\"saveAction\">保存</a>\n      </div>\n      <a class=\"weui_cell\" href=\"javascript:;\" v-repeat=\"hcgList\" v-click=\"editCellValue\">\n        <div class=\"weui_cell_bd weui_cell_primary\">\n          <p v-if=\"tabSelect === 1\">{{HCG}} \n            <span v-css=\"{'increase-rate': getPreviousRate($index, HCG) } \" v-if=\"$index\">上升 {{getPreviousRate($index, HCG)}} %</span>\n          </p>\n          <span class=\"label_desc\">预期增长400%, 参考值: {{expectHCG($index)}}</span>\n          <p v-if=\"tabSelect === 2\">{{E2}}</p>\n          <p v-if=\"tabSelect === 3\">{{Prog}}</p>\n        </div>\n        <div class=\"weui_cell_ft with_arrow\">\n        {{index + 1}} 周 ({{date}})\n        </div>\n      </a>\n    </div>\n    <div id=\"loadingToast\" class=\"weui_loading_toast\">\n    <div class=\"weui_toast\">\n      <div class=\"weui_loading\">\n        <div class=\"weui_loading_leaf weui_loading_leaf_0\"></div>\n        <div class=\"weui_loading_leaf weui_loading_leaf_1\"></div>\n        <div class=\"weui_loading_leaf weui_loading_leaf_2\"></div>\n        <div class=\"weui_loading_leaf weui_loading_leaf_3\"></div>\n        <div class=\"weui_loading_leaf weui_loading_leaf_4\"></div>\n        <div class=\"weui_loading_leaf weui_loading_leaf_5\"></div>\n        <div class=\"weui_loading_leaf weui_loading_leaf_6\"></div>\n        <div class=\"weui_loading_leaf weui_loading_leaf_7\"></div>\n        <div class=\"weui_loading_leaf weui_loading_leaf_8\"></div>\n        <div class=\"weui_loading_leaf weui_loading_leaf_9\"></div>\n        <div class=\"weui_loading_leaf weui_loading_leaf_10\"></div>\n        <div class=\"weui_loading_leaf weui_loading_leaf_11\"></div>\n      </div>\n      <p class=\"weui_toast_content\">Loading...</p>\n    </div>\n  </div>\n  </div>";
	module.exports = {
	  components: function() {},
	  ready: function() {
	    var _this;
	    _this = this;
	    return setTimeout(function() {
	      var ck;
	      document.getElementById('loadingToast').style.display = 'none';
	      console.log(this);
	      _this.slot = document.querySelector('.vux-clocker-tpl');
	      console.log(_this.slot);
	      _this.slotString = _this.slot.innerHTML;
	      if (_this.slotString !== '<div>  </div>' && _this.slotString !== '<div></div>') {
	        _this.showTimeString = false;
	      }
	      return ck = new window.timer('2025-8-29').on('tick', (function(_this) {
	        return function(event) {
	          return _this.app.timeString = event.strftime('%D 天 %H 小时 %M 分 %S 秒');
	        };
	      })(this)).on('finish', (function(_this) {
	        return function() {
	          return _this.timeString = '00:00:00';
	        };
	      })(this)).start();
	    }, 2000);
	  },
	  methods: {
	    divide: function(arg1, arg2, acc) {
	      var c, r1, r2, ref, ref1, result, t1, t2;
	      if (acc == null) {
	        acc = 2;
	      }
	      if (arg2 === 0) {
	        throw new RangeError('Cannot divide by zero');
	      }
	      t1 = ((ref = arg1.toString().split('.')[1]) != null ? ref.length : void 0) || 0;
	      t2 = ((ref1 = arg2.toString().split('.')[1]) != null ? ref1.length : void 0) || 0;
	      c = Math.max(t1, t2, acc);
	      r1 = Number(arg1.toString().replace('.', ''));
	      r2 = Number(arg2.toString().replace('.', ''));
	      result = (r1 / r2) * Math.pow(10, t2 - t1);
	      return +result.toFixed(c);
	    },
	    expectHCG: function(index) {
	      var expectValue;
	      if (index > 0) {
	        if (index > 40) {
	          if (index > 42) {
	            if (index > 44) {
	              return 5;
	            }
	            return 100;
	          }
	          return this.divide(this.$root.hcgList[index - 1].HCG, 2, 2);
	        }
	        expectValue = Number(this.$root.hcgList[index - 1].HCG * 4 * index).toFixed(2);
	        return expectValue;
	      } else {
	        return null;
	      }
	    },
	    getPreviousRate: function(index, value) {
	      if (index > 0) {
	        return this.divide(value, this.$root.hcgList[index - 1].HCG, 2) * 100 - 100;
	      } else {
	        return null;
	      }
	    },
	    myDataLength: function() {
	      return JSON.parse(localStorage.getItem('myData'));
	    },
	    update: function() {
	      if (this.showTimeString) {
	        return this.timeString = event.strftime(this.format);
	      } else {
	        return this.slot.innerHTML = event.strftime(this.slotString);
	      }
	    },
	    editCellValue: function(value, typename) {
	      var inputValue, typenames;
	      value = 0;
	      typenames = ['HCG', 'E2', 'Prog'];
	      typename = typenames[this.vm.$root.tabSelect - 1];
	      switch (this.vm.$root.tabSelect) {
	        case 1:
	          value = this.vm.HCG;
	          break;
	        case 2:
	          value = this.vm.E2;
	          break;
	        case 3:
	          value = this.vm.Prog;
	      }
	      inputValue = prompt("编辑" + typename + "数值:", value);
	      inputValue && alert(this.vm.date + "这天的" + typename + "数值将更新为: " + inputValue + "!");
	      inputValue && (this.vm.HCG = inputValue);
	      return this.vm.isEdit = true;
	    },
	    HCGCellClickHandler: function() {
	      console.log(this.vm);
	      return this.vm.isEdit = true;
	    },
	    isToday: function(moment) {
	      return {};
	    },
	    saveAction: function() {
	      var newData, otherData;
	      alert('保存');
	      otherData = this.vm.$root.hcgList;
	      newData = this.vm.$root.ysTodos;
	      return localStorage.setItem('myData', JSON.stringify({
	        hcgList: otherData,
	        ysTodos: newData
	      }));
	    },
	    switchAction: function() {},
	    initLocalData: function() {
	      var b, div, endDate, g, hcgDate, hcgEndDate, newData, otherData, r, startDate;
	      startDate = window.dateTool('2025-6-15', 'YYYY-MM-DD');
	      endDate = window.dateTool('2025-11-15', 'YYYY-MM-DD');
	      hcgDate = window.dateTool('2025-6-15', 'YYYY-MM-DD');
	      hcgEndDate = window.dateTool('2026-5-1', 'YYYY-MM-DD');
	      newData = window.app.generateDateArray(startDate, endDate, 1, (function(_this) {
	        return function(index) {
	          return '可爱老婆吃叶酸的第' + index + '天';
	        };
	      })(this));
	      this.vm.$root.ysTodos = this.vm.$root.ysTodos.concat(newData);
	      otherData = window.app.generateDateArray(hcgDate, hcgEndDate, 7, (function(_this) {
	        return function(index) {
	          return '第' + index + '周: 指标值';
	        };
	      })(this));
	      localStorage.setItem('myData', '');
	      localStorage.setItem('myData', JSON.stringify({
	        hcgList: otherData,
	        ysTodos: newData
	      }));
	      sessiongStorage.setItem('myData', JSON.stringify({
	        hcgList: otherData,
	        ysTodos: newData
	      }));
	      console.log(otherData.length, newData.length);
	      div = document.querySelector('.router-view');
	      r = Math.floor(Math.random() * 10) + 5;
	      g = Math.floor(Math.random() * 50) + 100;
	      b = Math.floor(Math.random() * 255);
	      div.style.backgroundColor = '#' + window.utils.stringToHex(r) + window.utils.stringToHex(g) + window.utils.stringToHex(b);
	      return alert(div.style.backgroundColor);
	    },
	    tapTabItemOne: function() {
	      return this.vm.$root.tabSelect = 0;
	    },
	    tapTabItemTwo: function() {
	      return this.vm.$root.tabSelect = 1;
	    },
	    tapTabItemThree: function() {
	      return this.vm.$root.tabSelect = 2;
	    },
	    tapTabItemFour: function() {
	      return this.vm.$root.tabSelect = 3;
	    },
	    selected: function() {
	      return this.tabSelected === index;
	    }
	  }
	};

	;(typeof module.exports === "function"? module.exports.options: module.exports).template = __vue_template__;


/***/ },

/***/ 10:
/***/ function(module, exports, require) {

	/* WEBPACK VAR INJECTION */(function(require, module) {(function(){var a={months:"Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Aout_Septembre_Octobre_Novembre_Décembre".split("_"),monthsShort:"Jan_Fev_Mar_Avr_Mai_Juin_Juil_Aou_Sep_Oct_Nov_Dec".split("_"),weekdays:"Dimanche_Lundi_Mardi_Mercredi_Jeudi_Vendredi_Samedi".split("_"),weekdaysShort:"Dim_Lun_Mar_Mer_Jeu_Ven_Sam".split("_"),relativeTime:{future:"in %s",past:"il y a %s",s:"secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"une année",yy:"%d années"},ordinal:function(a){return~~(a%100/10)===1?"er":"ème"}};typeof module!="undefined"&&(module.exports=a),typeof window!="undefined"&&this.moment&&this.moment.lang&&this.moment.lang("fr",a)})(),function(){var a={months:"Gennaio_Febbraio_Marzo_Aprile_Maggio_Giugno_Luglio_Agosto_Settebre_Ottobre_Novembre_Dicembre".split("_"),monthsShort:"Gen_Feb_Mar_Apr_Mag_Giu_Lug_Ago_Set_Ott_Nov_Dic".split("_"),weekdays:"Domenica_Lunedi_Martedi_Mercoledi_Giovedi_Venerdi_Sabato".split("_"),weekdaysShort:"Dom_Lun_Mar_Mer_Gio_Ven_Sab".split("_"),relativeTime:{future:"in %s",past:"%s fa",s:"secondi",m:"un minuto",mm:"%d minuti",h:"un ora",hh:"%d ore",d:"un giorno",dd:"%d giorni",M:"un mese",MM:"%d mesi",y:"un anno",yy:"%d anni"},ordinal:function(){return"º"}};typeof module!="undefined"&&(module.exports=a),typeof window!="undefined"&&this.moment&&this.moment.lang&&this.moment.lang("it",a)}(),function(){var a={months:"Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),monthsShort:"Jan_Feb_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),weekdays:"Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado".split("_"),weekdaysShort:"Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),relativeTime:{future:"em %s",past:"%s atrás",s:"segundos",m:"um minuto",mm:"%d minutos",h:"uma hora",hh:"%d horas",d:"um dia",dd:"%d dias",M:"um mês",MM:"%d meses",y:"um ano",yy:"%d anos"},ordinal:function(a){return"º"}};typeof module!="undefined"&&(module.exports=a),typeof window!="undefined"&&this.moment&&this.moment.lang&&this.moment.lang("pt",a)}()
	/* WEBPACK VAR INJECTION */}(require, require(7)(module)))

/***/ },

/***/ 11:
/***/ function(module, exports, require) {

	(function () {
	    var lang = {
	            months : "Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Aout_Septembre_Octobre_Novembre_Décembre".split("_"),
	            monthsShort : "Jan_Fev_Mar_Avr_Mai_Juin_Juil_Aou_Sep_Oct_Nov_Dec".split("_"),
	            weekdays : "Dimanche_Lundi_Mardi_Mercredi_Jeudi_Vendredi_Samedi".split("_"),
	            weekdaysShort : "Dim_Lun_Mar_Mer_Jeu_Ven_Sam".split("_"),
	            relativeTime : {
	                future : "in %s",
	                past : "il y a %s",
	                s : "secondes",
	                m : "une minute",
	                mm : "%d minutes",
	                h : "une heure",
	                hh : "%d heures",
	                d : "un jour",
	                dd : "%d jours",
	                M : "un mois",
	                MM : "%d mois",
	                y : "une année",
	                yy : "%d années"
	            },
	            ordinal : function (number) {
	                return (~~ (number % 100 / 10) === 1) ? 'er' : 'ème';
	            }
	        };

	    // Node
	    if (true) {
	        module.exports = lang;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && this.moment && this.moment.lang) {
	        this.moment.lang('fr', lang);
	    }
	}());

/***/ },

/***/ 12:
/***/ function(module, exports, require) {

	/* WEBPACK VAR INJECTION */(function(require, module) {(function(){var a={months:"Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Aout_Septembre_Octobre_Novembre_Décembre".split("_"),monthsShort:"Jan_Fev_Mar_Avr_Mai_Juin_Juil_Aou_Sep_Oct_Nov_Dec".split("_"),weekdays:"Dimanche_Lundi_Mardi_Mercredi_Jeudi_Vendredi_Samedi".split("_"),weekdaysShort:"Dim_Lun_Mar_Mer_Jeu_Ven_Sam".split("_"),relativeTime:{future:"in %s",past:"il y a %s",s:"secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"une année",yy:"%d années"},ordinal:function(a){return~~(a%100/10)===1?"er":"ème"}};typeof module!="undefined"&&(module.exports=a),typeof window!="undefined"&&this.moment&&this.moment.lang&&this.moment.lang("fr",a)})()
	/* WEBPACK VAR INJECTION */}(require, require(7)(module)))

/***/ },

/***/ 13:
/***/ function(module, exports, require) {

	(function () {
	    var lang = {
	            months : "Gennaio_Febbraio_Marzo_Aprile_Maggio_Giugno_Luglio_Agosto_Settebre_Ottobre_Novembre_Dicembre".split("_"),
	            monthsShort : "Gen_Feb_Mar_Apr_Mag_Giu_Lug_Ago_Set_Ott_Nov_Dic".split("_"),
	            weekdays : "Domenica_Lunedi_Martedi_Mercoledi_Giovedi_Venerdi_Sabato".split("_"),
	            weekdaysShort : "Dom_Lun_Mar_Mer_Gio_Ven_Sab".split("_"),
	            relativeTime : {
	                future : "in %s",
	                past : "%s fa",
	                s : "secondi",
	                m : "un minuto",
	                mm : "%d minuti",
	                h : "un ora",
	                hh : "%d ore",
	                d : "un giorno",
	                dd : "%d giorni",
	                M : "un mese",
	                MM : "%d mesi",
	                y : "un anno",
	                yy : "%d anni"
	            },
	            ordinal: function () {
	                return 'º';
	            }
	        };

	    // Node
	    if (true) {
	        module.exports = lang;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && this.moment && this.moment.lang) {
	        this.moment.lang('it', lang);
	    }
	}());

/***/ },

/***/ 14:
/***/ function(module, exports, require) {

	/* WEBPACK VAR INJECTION */(function(require, module) {(function(){var a={months:"Gennaio_Febbraio_Marzo_Aprile_Maggio_Giugno_Luglio_Agosto_Settebre_Ottobre_Novembre_Dicembre".split("_"),monthsShort:"Gen_Feb_Mar_Apr_Mag_Giu_Lug_Ago_Set_Ott_Nov_Dic".split("_"),weekdays:"Domenica_Lunedi_Martedi_Mercoledi_Giovedi_Venerdi_Sabato".split("_"),weekdaysShort:"Dom_Lun_Mar_Mer_Gio_Ven_Sab".split("_"),relativeTime:{future:"in %s",past:"%s fa",s:"secondi",m:"un minuto",mm:"%d minuti",h:"un ora",hh:"%d ore",d:"un giorno",dd:"%d giorni",M:"un mese",MM:"%d mesi",y:"un anno",yy:"%d anni"},ordinal:function(){return"º"}};typeof module!="undefined"&&(module.exports=a),typeof window!="undefined"&&this.moment&&this.moment.lang&&this.moment.lang("it",a)})()
	/* WEBPACK VAR INJECTION */}(require, require(7)(module)))

/***/ },

/***/ 15:
/***/ function(module, exports, require) {

	(function () {
	    var lang = {
	            months : "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),
	            monthsShort : "Jan_Feb_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),
	            weekdays : "Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado".split("_"),
	            weekdaysShort : "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),
	            relativeTime : {
	                future : "em %s",
	                past : "%s atrás",
	                s : "segundos",
	                m : "um minuto",
	                mm : "%d minutos",
	                h : "uma hora",
	                hh : "%d horas",
	                d : "um dia",
	                dd : "%d dias",
	                M : "um mês",
	                MM : "%d meses",
	                y : "um ano",
	                yy : "%d anos"
	            },
	            ordinal : function (number) {
	                return 'º';
	            }
	        };

	    // Node
	    if (true) {
	        module.exports = lang;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && this.moment && this.moment.lang) {
	        this.moment.lang('pt', lang);
	    }
	}());

/***/ },

/***/ 16:
/***/ function(module, exports, require) {

	/* WEBPACK VAR INJECTION */(function(require, module) {(function(){var a={months:"Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),monthsShort:"Jan_Feb_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),weekdays:"Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado".split("_"),weekdaysShort:"Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),relativeTime:{future:"em %s",past:"%s atrás",s:"segundos",m:"um minuto",mm:"%d minutos",h:"uma hora",hh:"%d horas",d:"um dia",dd:"%d dias",M:"um mês",MM:"%d meses",y:"um ano",yy:"%d anos"},ordinal:function(a){return"º"}};typeof module!="undefined"&&(module.exports=a),typeof window!="undefined"&&this.moment&&this.moment.lang&&this.moment.lang("pt",a)})()
	/* WEBPACK VAR INJECTION */}(require, require(7)(module)))

/***/ },

/***/ 17:
/***/ function(module, exports, require) {

	var inserted = {};

	module.exports = function (css, options) {
	    if (inserted[css]) return;
	    inserted[css] = true;
	    
	    var elem = document.createElement('style');
	    elem.setAttribute('type', 'text/css');

	    if ('textContent' in elem) {
	      elem.textContent = css;
	    } else {
	      elem.styleSheet.cssText = css;
	    }
	    
	    var head = document.getElementsByTagName('head')[0];
	    if (options && options.prepend) {
	        head.insertBefore(elem, head.childNodes[0]);
	    } else {
	        head.appendChild(elem);
	    }
	};


/***/ },

/***/ 18:
/***/ function(module, exports, require) {

	require(17)("");
	var __vue_template__ = "<div class=\"todos\" v-component=\"MainList\">\n  </div>";
	module.exports = {
	  name: 'TodoList',
	  components: {
	    MainList: require(22)
	  },
	  ready: function() {
	    return console.log('TodoList ready');
	  }
	};

	;(typeof module.exports === "function"? module.exports.options: module.exports).template = __vue_template__;


/***/ },

/***/ 19:
/***/ function(module, exports, require) {

	require(17)(".box,.browser{margin:0 auto}.file-style,>{padding-left:4px}.container-ie{overflow:hidden}.item-ie{float:left;width:30%}.item{-webkit-box-flex:1;-webkit-flex:1;text-align:center;flex:1;border-right:1px solid #ccc}.item:last-child{border-right:none}.box{display:-webkit-box;display:flex;flex-direction:row;height:350px}.browser{display:-webkit-box;-webkit-box-orient:vertical;-webkit-box-flex:1;-webkit-box-align:center}.sandbox{-webkit-box-align:end}.sandbox li{border-bottom:1px solid #ccc}");
	var __vue_template__ = "<div>\n    <section class=\"box\">\n      <div class=\"browser\">\n        <p style=\"text-align:center\">窝正在努力加载 {{currentImage || '图片'}} <span v-if=\"currentImage\">😘</span> 请您稍等片刻</p>\n        <div>\n          <img style=\"object-fit:cover\" id=\"file-container\" width=\"480\" height=\"270\">\n        </div>\n      </div>\n    </section>\n  </div>";
	module.exports = {
	  components: { todo: require(22) },
	  data: function() {
	    return {
	      msg: "Hello from Component 111A!"
	    };
	  },
	  computed: {
	    greet: function() {
	      return "Hello from Component A!";
	    }
	  },
	  ready: function() {
	    console.log("我是组件A的", this.$root);
	    var self = this;
	    setInterval(function (params) {
	      self.getImageUrl()
	    }, 500)
	  },
	  methods: {
	    getImageUrl: function() {
	      var xhr = new XMLHttpRequest();
	      xhr.open("GET", "/updateImage", true); // 第三个参数是异步标志，true表示异步

	      xhr.onreadystatechange = function() {
	        if (xhr.readyState === 4 && xhr.status === 200) {
	          var res = xhr.responseText;
	          // alert(res);
	          var json = JSON.parse(res);
	          if (res && res != this.currentImage) {
	            var imgNode = document.querySelector("#file-container");
	            document.body.style.background = json.color;
	            if (document.querySelector("#light-box")) {
	              var div = document.querySelector("#light-box")
	              div.style.background = json.color
	            }
	            imgNode.setAttribute('src', json.data);
	            console.log('我选择了' + this.currentImage);
	            imgNode.onload = function () {
	              this.currentImage = res;
	            }
	          }
	        } else if (xhr.readyState === 4) {
	          console.error("Request failed with status:", xhr.status);
	        }
	      };
	      xhr.send();
	    },
	    changeImage: function(url) {
	      alert(url);
	      console.log(url);
	      if (this.isImageURL(url)) {
	        this.currentImage = url;
	        console.log(this.currentImage);
	      }
	    },
	    isImageURL: function(url) {
	      // 处理带哈希或查询参数的 URL（如 image.jpg?param=123#section）
	      var cleanUrl = url.split("#")[0].split("?")[0];
	      var extension = cleanUrl
	        .split(".")
	        .pop()
	        .toLowerCase(); // 提取并转小写
	      var imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
	      // 检查扩展名是否在允许的列表中
	      return imageExtensions.indexOf(extension) > -1;
	    }
	  }
	};
	;(typeof module.exports === "function"? module.exports.options: module.exports).template = __vue_template__;


/***/ },

/***/ 20:
/***/ function(module, exports, require) {

	require(17)(".file-style{padding-left:4px}.dir-style{text-align:left}");
	var __vue_template__ = "<div class=\"file-list\">\n    <!-- <div v-component=\"Cell\" data-title='test'></div> -->\n    <ul class=\"sandbox\">\n      <li v-repeat=\"fileList\" v-if=\"fileList.length\" class=\"weui_cell_hd weui_cell_primary\">\n        <!-- <p>{{isDir ? '文件夹': '文件'}}</p> -->\n        <span class=\"dir-style\" v-if=\"isDir\"> 📂 {{path.split('/')[path.split('/').length-1]}}</span>\n        <span class=\"file-button\" style=\"color:gray;cursor:pointer\" v-if=\"!isDir\" v-click=\"changeImage\">{{path.split('/')[path.split('/').length-1]}}</span>\n      </li>\n    </ul>\n  </div>";
	module.exports = {
	  name: 'file-list',
	  data: {
	    title: 'file-list'
	  },
	  components: {
	    // Cell: require('./XUI/Boolean/index.vue')
	  },
	  ready: function () {
	    var buttons = document.getElementsByClassName("file-button");
	    for (var i = 0; i < buttons.length; i++) {
	      buttons[i].addEventListener("click", function(e) {
	        // console.log("按钮被点击了！", self.currentImage);
	        alert('请在我的补光灯APP中操作文件')
	      });
	    }
	  },
	  methods: {
	    changeImage: function()  {
	      console.log('请在我的补光灯APP中操作文件')
	      var eventSource = new EventSource('/sse');
	      var eventDiv = document.getElementById('events');
	      
	      eventSource.onmessage = function(event) {
	        console.log(event)
	      };
	      eventSource.onopen = function () {
	        console.log('开启SSE', eventSource)
	      }
	      eventSource.addEventListener('customEvent', function(event) {
	          var p = document.createElement('p');
	          p.textContent = 'Custom Event: ' + event.data;
	          eventDiv.appendChild(p);
	      });
	      
	      eventSource.onerror = function(err) {
	          console.error("EventSource failed:", err);
	      };
	    }
	  }
	};
	;(typeof module.exports === "function"? module.exports.options: module.exports).template = __vue_template__;


/***/ },

/***/ 21:
/***/ function(module, exports, require) {

	require(17)(".change-color{margin:0 auto}.ring-light{stroke:red;stroke-dasharray:400;stroke-dashoffset:400;animation:glow 2s ease-in-out infinite}");
	var __vue_template__ = "<div id=\"light-box\">\n    <svg width=\"200\" height=\"200\" viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\">\n      <!-- 背景圆 -->\n      <circle cx=\"100\" cy=\"100\" r=\"80\" fill=\"none\" stroke=\"#e0e0e0\" stroke-width=\"20\"></circle>\n      <!-- 主体圆环 -->\n      <circle cx=\"100\" cy=\"100\" r=\"80\" fill=\"none\" stroke=\"#ffcc00\" stroke-width=\"20\"></circle>\n    </svg>\n    <!-- <a href=\"javascript:window.socket()\">Open WebSocket and tell me what time it is.</a> -->\n  </div>";
	var indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	module.exports = {
	  name: 'fillLight',
	  ready: function() {
	    return this.$root.light = document.getElementById('light-box');
	  },
	  methods: {
	    changeBackgroundColor: function() {
	      var ws;
	      if (indexOf.call(window, "WebSocket") >= 0) {
	        ws = new WebSocket("%%WEBSOCKET_URL%%");
	        ws.onopen = function() {
	          alert("websocket is open");
	          return ws.send("Hey man, you got the time?");
	        };
	        ws.onmessage = function(evt) {
	          return alert("received: " + evt.data);
	        };
	        return ws.close = function() {
	          return alert("websocket is closed");
	        };
	      }
	    }
	  }
	};

	;(typeof module.exports === "function"? module.exports.options: module.exports).template = __vue_template__;


/***/ },

/***/ 22:
/***/ function(module, exports, require) {

	require(17)("#main,#new-todo,#todo-list li,#todoapp,.edit{position:relative}#todo-list label.completed,.done{text-decoration:line-through}.red{color:red}.app-container{font:14px 'Helvetica Neue',Helvetica,Arial,sans-serif;line-height:1.4em;color:#4d4d4d;width:660px;margin:0 auto;-webkit-font-smoothing:antialiased;-moz-font-smoothing:antialiased;-ms-font-smoothing:antialiased;-o-font-smoothing:antialiased;font-smoothing:antialiased}#filters li a.selected,#todoapp h1,#todoapp.active [data-filter=active],#todoapp.all [data-filter=all],#todoapp.completed [data-filter=completed]{font-weight:700}#todoapp{background:#fff;background:rgba(255,255,255,.9);margin:130px 0 40px;border:1px solid #ccc;border-top-left-radius:2px;border-top-right-radius:2px;box-shadow:0 2px 6px 0 rgba(0,0,0,.2),0 25px 50px 0 rgba(0,0,0,.15)}#todoapp:before{content:'';border-left:1px solid #f5d6d6;border-right:1px solid #f5d6d6;width:2px;position:absolute;top:0;left:40px;height:100%}#todoapp input::-webkit-input-placeholder{font-style:italic}#todoapp input::-moz-placeholder{font-style:italic;color:#a9a9a9}#todoapp h1{position:absolute;top:-120px;width:100%;font-size:70px;text-align:center;color:#b3b3b3;color:rgba(255,255,255,.3);text-shadow:-1px -1px rgba(0,0,0,.2);-webkit-text-rendering:optimizeLegibility;-moz-text-rendering:optimizeLegibility;-ms-text-rendering:optimizeLegibility;-o-text-rendering:optimizeLegibility;text-rendering:optimizeLegibility}#header{padding-top:15px;border-radius:inherit}#new-todo,.edit{margin:0;width:100%;font-size:24px;font-family:inherit;line-height:1.4em;outline:0;color:inherit;padding:6px;border:1px solid #999;box-shadow:inset 0 -1px 5px 0 rgba(0,0,0,.2);-webkit-box-sizing:border-box;-moz-box-sizing:border-box;-ms-box-sizing:border-box;-o-box-sizing:border-box;box-sizing:border-box;-webkit-font-smoothing:antialiased;-moz-font-smoothing:antialiased;-ms-font-smoothing:antialiased;-o-font-smoothing:antialiased;font-smoothing:antialiased}#new-todo{padding:16px 16px 16px 60px;border:none;background:rgba(0,0,0,.02);z-index:2;box-shadow:none}#main{z-index:2;border-top:1px dotted #adadad}label[for=toggle-all]{display:none}#toggle-all{position:absolute;top:-42px;left:-4px;width:40px;text-align:center;border:none}#toggle-all:before{content:'»';font-size:28px;color:#d9d9d9;padding:0 25px 7px}#toggle-all:checked:before{color:#737373}#todo-list{margin:0;padding:0;list-style:none}#todo-list li{font-size:24px;border-bottom:1px dotted #ccc}#todo-list li:last-child{border-bottom:none}#todo-list li.editing{border-bottom:none;padding:0}#todo-list li.editing .edit{display:block;width:506px;padding:13px 17px 12px;margin:0 0 0 43px}#todo-list li.editing .view{display:none}#todo-list li .toggle{text-align:center;width:40px;height:auto;position:absolute;top:0;bottom:0;margin:auto 0;border:none;-webkit-appearance:none;-ms-appearance:none;-o-appearance:none;appearance:none}#todo-list li .toggle:after{content:'✔';line-height:43px;font-size:20px;color:#d9d9d9;text-shadow:0 -1px 0 #bfbfbf}#todo-list li .toggle:checked:after{color:#85ada7;text-shadow:0 1px 0 #669991;bottom:1px;position:relative}#todo-list li label{word-break:break-word;padding:15px;margin-left:45px;display:block;line-height:1.2;-webkit-transition:color .4s;-moz-transition:color .4s;-ms-transition:color .4s;-o-transition:color .4s;transition:color .4s}#todo-list label.completed{color:#a9a9a9}#todo-list li .destroy{display:none;position:absolute;top:0;right:10px;bottom:0;width:40px;height:40px;margin:auto 0;font-size:22px;color:#a88a8a;-webkit-transition:all .2s;-moz-transition:all .2s;-ms-transition:all .2s;-o-transition:all .2s;transition:all .2s}#todo-list li .destroy:hover{text-shadow:0 0 1px #000,0 0 10px rgba(199,107,107,.8);-webkit-transform:scale(1.3);-moz-transform:scale(1.3);-ms-transform:scale(1.3);-o-transform:scale(1.3);transform:scale(1.3);border:none}#todo-list li .destroy:after{content:'✖'}#footer:before,#header:before{content:'';position:absolute;right:0;left:0}#todo-list li:hover .destroy{display:block;border:none}#todo-list li .edit{display:none}#todo-list li.editing:last-child{margin-bottom:-1px}#footer{color:#777;padding:0 15px;position:absolute;right:0;bottom:-31px;left:0;height:20px;z-index:1;text-align:center}#footer:before{bottom:31px;height:50px;z-index:-1;box-shadow:0 1px 1px rgba(0,0,0,.3),0 6px 0 -3px rgba(255,255,255,.8),0 7px 1px -3px rgba(0,0,0,.3),0 43px 0 -6px rgba(255,255,255,.8),0 44px 2px -6px rgba(0,0,0,.2)}#todo-count{float:left;text-align:left}#filters{margin:0;padding:0;list-style:none;position:absolute;right:0;left:0}#filters li{display:inline}#todoapp.active #todo-list li.completed,#todoapp.completed #todo-list li:not(.completed),.hidden{display:none}#filters li a{color:#83756f;margin:2px;text-decoration:none}#clear-completed{float:right;position:relative;line-height:20px;text-decoration:none;background:rgba(0,0,0,.1);font-size:11px;padding:0 10px;border:0;border-radius:3px;box-shadow:0 -1px 0 0 rgba(0,0,0,.2)}#clear-completed:hover{background:rgba(0,0,0,.15);box-shadow:0 -1px 0 0 rgba(0,0,0,.3)}#info{margin:65px auto 0;color:#a6a6a6;font-size:12px;text-shadow:0 1px 0 rgba(255,255,255,.7);text-align:center}#info a{color:inherit}@media screen and (-webkit-min-device-pixel-ratio:0){#todo-list li .toggle,#toggle-all{background:0 0}#todo-list li .toggle{height:40px}#toggle-all{top:-56px;left:-15px;width:65px;height:41px;-webkit-transform:rotate(90deg);transform:rotate(90deg);-webkit-appearance:none;appearance:none}}#header:before{top:0;height:15px;z-index:2;border-bottom:1px solid #6c615c;background:#8d7d77;background:-webkit-gradient(linear,left top,left bottom,from(rgba(132,110,100,.8)),to(rgba(101,84,76,.8)));background:-webkit-linear-gradient(top,rgba(132,110,100,.8),rgba(101,84,76,.8));background:-moz-linear-gradient(top,rgba(132,110,100,.8),rgba(101,84,76,.8));background:-o-linear-gradient(top,rgba(132,110,100,.8),rgba(101,84,76,.8));background:-ms-linear-gradient(top,rgba(132,110,100,.8),rgba(101,84,76,.8));background:linear-gradient(top,rgba(132,110,100,.8),rgba(101,84,76,.8));filter:progid:DXImageTransform.Microsoft.gradient(GradientType=0, StartColorStr='#9d8b83', EndColorStr='#847670');border-top-left-radius:1px;border-top-right-radius:1px}");
	var __vue_template__ = "<section id=\"todoapp\">\n    <header id=\"header\">\n      <h1>MY-待办列表</h1>\n      <!-- main input box -->\n      <input id=\"new-todo\" v-model=\"newTitle\" v-on=\"keyup:addTodo | key enter\" placeholder=\"What needs to be done?\">\n    </header>\n    <section id=\"main\" v-show=\"total\">\n      <input id=\"toggle-all\" type=\"checkbox\" v-model=\"allDone\" v-on=\"change:toggleAll\">\n      <ul id=\"todo-list\">\n        <!-- a single todo item -->\n        <li v-repeat=\"myTodos\">\n          <div class=\"view\">\n            <input class=\"toggle check-task\" type=\"checkbox\" v-model=\"done\" v-click=\"toggoleThisTodo\">\n            <label v-text=\"title\" v-on=\"dblclick:edit\" v-css=\"{'completed': done}\"></label>\n            <button class=\"destroy\" v-click=\"removeTodo\"></button>\n          </div>\n          <input class=\"edit\" type=\"text\" sd-focus=\"todo.editing\" sd-on=\"blur:stopEdit, keyup:stopEdit | key enter\" sd-value=\"todo.text\">\n        </li>\n      </ul>\n    </section>\n    <footer id=\"footer\">\n      <span id=\"todo-count\">\n        <span>剩余</span>\n        <strong v-text=\"remainingCount()\"></strong>\n        <span>个项目</span>\n      </span>\n      <ul id=\"filters\">\n        <!-- <li>\n          <a href=\"#/all\" data-filter=\"all\" sd-on=\"click:setFilter\">All</a>\n        </li>\n        <li>\n          <a href=\"#/active\" data-filter=\"active\" sd-on=\"click:setFilter\">Active</a>\n        </li>\n        <li>\n          <a href=\"#/completed\" data-filter=\"completed\" sd-on=\"click:setFilter\">Completed</a>\n        </li> -->\n      </ul>\n      <button id=\"clear-completed\" sd-on=\"click:removeCompleted\">\n        Remove Completed (\n        <span v-text=\"completedCount()\"></span>)\n      </button>\n    </footer>\n  </section>";
	module.exports = {
	  data: function() {
	    return {};
	  },
	  created: function() {
	    Array.prototype.filter = function(predicate) {
	      var element, i, index, len, ref, results;
	      ref = this;
	      results = [];
	      for (index = i = 0, len = ref.length; i < len; index = ++i) {
	        element = ref[index];
	        if (predicate(element, index, this)) {
	          results.push(element);
	        }
	      }
	      return results;
	    };
	    console.log(this.$root.remaining);
	    return this.setupEvent();
	  },
	  methods: {
	    completedCount: function() {
	      return this.$root.myTodos.filter(function(n) {
	        return n.done;
	      }).length;
	    },
	    remainingCount: function() {
	      var count, items;
	      items = this.$root.myTodos.filter(function(n) {
	        return !n.done;
	      });
	      count = items.length;
	      return count;
	    },
	    todoCount: function() {
	      console.log(this.$root.myTodos.length + '个数');
	      return this.$root.myTodos.length;
	    },
	    addRequest: function(text, callback) {
	      var params, response, xhr;
	      xhr = new XMLHttpRequest();
	      xhr.open('POST', '/addTodo', true);
	      xhr.setRequestHeader("Content-Type", "'application/json;charset=UTF-8'");
	      params = {
	        text: text,
	        done: false
	      };
	      xhr.onreadystatechange = function() {};
	      if (xhr.readyState === 4) {
	        if (xhr.status === 200) {
	          response = JSON.parse(xhr.responseText);
	          alert("Response: " + JSON.stringify(response));
	          callback && callback();
	        } else {
	          console.log('error');
	        }
	      }
	      return xhr.send(this.$qs(params));
	    },
	    setupEvent: function() {
	      var i, index, len, nodes, results;
	      nodes = document.getElementsByClassName('check-task');
	      results = [];
	      for (i = 0, len = nodes.length; i < len; i++) {
	        index = nodes[i];
	        results.push(console.log(nodes));
	      }
	      return results;
	    },
	    addTodo: function() {
	      var list, newList, newText;
	      newText = this.$root.newTitle;
	      console.log(newText);
	      if (newText.length === 0) {
	        return;
	      }
	      list = this.$root.myTodos;
	      newList = list.filter(function(n) {
	        return n.text === newText;
	      });
	      if (newList.length === 0) {
	        this.$root.myTodos.push({
	          title: this.$root.newTitle,
	          done: false
	        });
	        this.addRequest(this.$root.newTitle);
	        return this.$root.newTitle = '';
	      } else {
	        return alert('不能记录已存在的待办事项');
	      }
	    },
	    removeTodo: function(vm, event) {
	      var clickIndex, findIndex, previosu;
	      findIndex = function(array, predicate) {
	        var element, i, index, len, results;
	        results = [];
	        for (index = i = 0, len = array.length; i < len; index = ++i) {
	          element = array[index];
	          if (predicate(element, index, array)) {
	            results.push(element);
	          }
	        }
	        return results;
	      };
	      clickIndex = vm.$root.myTodos.findIndex(function(item) {
	        return item.title === vm.title;
	      });
	      alert(vm.title);
	      previosu = vm.$root.myTodos.length;
	      return vm.$root.myTodos.splice(clickIndex, 1);
	    },
	    toggoleThisTodo: function(vm, event) {
	      return console.log(vm);
	    },
	    toggleAll: function(e) {
	      var i, j, len, len1, ref, ref1, results, results1, todo;
	      console.log(this.$root.allDone);
	      if (e.target.value === 'on') {
	        this.$root.remaining = 0;
	        ref = this.$root.myTodos;
	        results = [];
	        for (i = 0, len = ref.length; i < len; i++) {
	          todo = ref[i];
	          results.push(todo.done = true);
	        }
	        return results;
	      } else {
	        this.$root.remaining = this.$root.myTodos.length;
	        ref1 = this.$root.myTodos;
	        results1 = [];
	        for (j = 0, len1 = ref1.length; j < len1; j++) {
	          todo = ref1[j];
	          results1.push(todo.done = false);
	        }
	        return results1;
	      }
	    }
	  }
	};

	;(typeof module.exports === "function"? module.exports.options: module.exports).template = __vue_template__;


/***/ }
/******/ })