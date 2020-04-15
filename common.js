// 自己封装的函数工具包MKTools
// 封装代码的目的就是为了节省写代码的时间 快捷获取元素的方法
function my$(id) {
  return document.getElementById(id);
}

// 处理浏览器兼容性
// 获取第一个子元素
function getFirstElementChild(element) {
    var node, nodes = element.childNodes, i = 0;
    while (node = nodes[i++]) {
        if (node.nodeType === 1) {
            return node;
        }
    }
    return null;
}

// 处理浏览器兼容性
// 获取下一个兄弟元素
 function getNextElementSibling(element) {
    var el = element;
    while (el = el.nextSibling) {
      if (el.nodeType === 1) {
          return el;
      }
    }
    return null;
  }


// 处理innerText和textContent的兼容性问题Firefox的Bug
// 设置标签之间的内容
function setInnerText(element, content) {
  // 判断当前浏览器是否支持 innerText
  if (typeof element.innerText === 'string') {
    element.innerText = content;
  } else {
    element.textContent = content;
  }
}


// 处理注册事件的兼容性问题
// eventName, 不带on，  click  mouseover  mouseout
function addEventListener(element, eventName, fn) {
  // 判断当前浏览器是否支持addEventListener 方法
  if (element.addEventListener) {
    element.addEventListener(eventName, fn);  // 第三个参数 默认是false
  } else if (element.attachEvent) {
    element.attachEvent('on' + eventName, fn);
  } else {
    // 相当于 element.onclick = fn;
    element['on' + eventName] = fn;
  }
}

// 处理移除事件的兼容性处理
function removeEventListener(element, eventName, fn) {
  if (element.removeEventListener) {
    element.removeEventListener(eventName, fn);
  } else if (element.detachEvent) {
    element.detachEvent('on' + eventName, fn);
  } else {
    element['on' + eventName] = null;
  }
}

// 获取页面滚动距离的浏览器兼容性问题
// 获取页面滚动出去的距离
function getScroll() {
  var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  }
}

// 获取鼠标在页面的位置，处理浏览器兼容性
function getPage(e) {
  var pageX = e.pageX || e.clientX + getScroll().scrollLeft;
  var pageY = e.pageY || e.clientY + getScroll().scrollTop;
  return {
    pageX: pageX,
    pageY: pageY
  }
}

/**
 * 获得页面滚动距离的兼容代码
 * 返回一个对象,拥有水平与垂直的距离
 */
function getScroll() {
    return {
        scrollTop: document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop ||0,
        scrollLeft: document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft ||0
    }
}
/**
 * 获得页面的可视区域
 * 返回一个对象
 */
function getClient() {
    return {
        clientWidth :  document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth || 0,
        clientHeight :  document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight || 0
    }
}

/**
 * 获得当前元素后面的所有元素节点
 * @param {当前元素} elm 
 */
function getNextElement(elm) {
    // 声明一个空数组,来存储后面的元素
    let arr = [];
    while (elm) {
        // 获取下一个元素节点然后赋值给 elm
        elm = elm.nextElementSibling;

        // 判断获得下一个元素节点是否存在
        // 如果获得节点存在,则将节点存储到数组中
        if (elm != null) {
            arr.push(elm)
        }
    }
    // 返回数组
    return arr;
}


//
function getPreviousElement(elm) {
    // 声明一个空数组,来存储后面的元素
    let arr = [];
    while (elm) {
        // 获取下一个元素节点然后赋值给 elm
        elm = elm.previousElementSibling;

        // 判断获得下一个元素节点是否存在
        // 如果获得节点存在,则将节点存储到数组中
        if (elm != null) {
            arr.unshift(elm)
        }
    }
    // 返回数组
    return arr;
}

//======================================animation
/**
 * Created by liujing on 20-4-3.
 */
/**
 *
 * @param {position} elm
 * @param {目标位置} target
 */
function moveAnimation(elm,target) {
    clearInterval(elm.timeID);
    var position = elm.offsetLeft;
    var step = (target - position) > 0 ? 10 : -10;
    elm.timeID = setInterval(
        function () {
            position += step;
            if (Math.abs(target - position) > Math.abs(step)) {
                elm.style.left = position + 'px';
            } else {
                elm.style.left = target + 'px';
                clearInterval(elm.timeID);
            }
        },20
    )
}

function getStyle(box, styleString)
{
    return window.getComputedStyle(box, null)[styleString];
}



//
var box = document.getElementById('box');
var btn = document.getElementById('btn');

/* 回调函数版本的 Block*/
function slowAnimationWithBlock(ele, obj, fun)
{
    clearInterval(ele.timeID);

    ele.timeID = setInterval(
        function () {
            var flag = true;

            for(var key in obj){
                var position = window.getComputedStyle(ele)[key];
                position = parseInt(position);

                // obj key  以前的target
                var step = (obj[key] - position) > 0? Math.ceil(obj[key]- position/10):  Math.floor(obj[key] - position)/10;
                position += step;
                ele.style[key] = position + 'px';

                if(position != obj[key])
                {
                    flag = false;
                }
            }

            if(flag)
            {
                clearInterval(ele.timeID);
                ///**/
                /*optc SHORTCUT*/
                if(Object.prototype.toString.call(fun) == '[object Function]');
            }
        },
        20
    );

}


function slowAnimationWithMultiArgs(ele, obj) {
    clearInterval(ele.timeID);

    ele.timeID = setInterval(
        function () {
            //假设一个条件
            var flag = true;

            for (var key in obj){
                var position = window.getComputedStyle(ele)[key];

                position = parseInt(position);

                var step = (obj[key] - position) > 0? Math.ceil(obj[key]- position/10):  Math.floor(obj[key] - position)/10;
                position += step;
                ele.style[key] = position + 'px';

                if(position != obj[key])
                {
                    flag = false;
                }
            }


            if(flag)
            {
                clearInterval(ele.timeID);
                //
            }
        },
        20
    );
}


// 阻止事件冒泡的封装
function stopBubble(e){
    e = window.event || e;
    // 能力检查
    if(e.stopPropagation){
        e.stopPropagation();
    }
    else
    {
        e.cancelBubble = true;
    }
}


// Date and time tools

//格式化日期对象，返回yyyy-MM-dd HH:mm:ss的形式
function formatDate(date) {
  // 判断参数date是否是日期对象
  // instanceof  instance 实例(对象)   of 的
  // console.log(date instanceof Date);
  if (!(date instanceof Date)) {
    console.error('date不是日期对象')
    return;
  }

  var year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate(),
      hour = date.getHours(),
      minute = date.getMinutes(),
      second = date.getSeconds();

  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  hour = hour < 10 ? '0' + hour : hour;
  minute = minute < 10 ? '0' + minute : minute;
  second = second < 10 ? '0' + second : second;

  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

// 获取两个日期的时间差
function getInterval(start, end) {
  // 两个日期对象，相差的毫秒数
  var interval = end - start;
  // 求 相差的天数/小时数/分钟数/秒数
  var day, hour, minute, second;

  // 两个日期对象，相差的秒数
  // interval = interval / 1000;
  interval /= 1000;

  day = Math.round(interval / 60 / 60 / 24);
  hour = Math.round(interval / 60 / 60 % 24);
  minute = Math.round(interval / 60 % 60);
  second = Math.round(interval % 60);

  return {
    day: day,
    hour: hour,
    minute: minute,
    second: second
  }
}

// jQuery 1.0 mini
window.undefined=window.undefined;function jQuery(d,f){if(d&&d.constructor==Function&&jQuery.fn.ready){return jQuery(document).ready(d)}d=d||jQuery.context||document;if(d.jquery){return $(jQuery.merge(d,[]))}if(f&&f.jquery){return $(f).find(d)}if(window==this){return new jQuery(d,f)}var b=/^[^<]*(<.+>)[^>]*$/.exec(d);if(b){d=jQuery.clean([b[1]])}this.get(d.constructor==Array||d.length&&!d.nodeType&&d[0]!=undefined&&d[0].nodeType?jQuery.merge(d,[]):jQuery.find(d,f));var e=arguments[arguments.length-1];if(e&&e.constructor==Function){this.each(e)}}if(typeof $!="undefined"){jQuery._$=$}var $=jQuery;jQuery.fn=jQuery.prototype={jquery:"$Rev$",size:function(){return this.length},get:function(a){if(a&&a.constructor==Array){this.length=0;[].push.apply(this,a);return this}else{return a==undefined?jQuery.map(this,function(b){return b}):this[a]}},each:function(b,a){return jQuery.each(this,b,a)},index:function(a){var b=-1;this.each(function(c){if(this==a){b=c}});return b},attr:function(a,c,b){return a.constructor!=String||c!=undefined?this.each(function(){if(c==undefined){for(var d in a){jQuery.attr(b?this.style:this,d,a[d])}}else{jQuery.attr(b?this.style:this,a,c)}}):jQuery[b||"attr"](this[0],a)},css:function(a,b){return this.attr(a,b,"curCSS")},text:function(f){f=f||this;var c="";for(var a=0;a<f.length;a++){var d=f[a].childNodes;for(var b=0;b<d.length;b++){if(d[b].nodeType!=8){c+=d[b].nodeType!=1?d[b].nodeValue:jQuery.fn.text([d[b]])}}}return c},wrap:function(){var b=jQuery.clean(arguments);return this.each(function(){var a=b[0].cloneNode(true);this.parentNode.insertBefore(a,this);while(a.firstChild){a=a.firstChild}a.appendChild(this)})},append:function(){return this.domManip(arguments,true,1,function(b){this.appendChild(b)})},prepend:function(){return this.domManip(arguments,true,-1,function(b){this.insertBefore(b,this.firstChild)})},before:function(){return this.domManip(arguments,false,1,function(b){this.parentNode.insertBefore(b,this)})},after:function(){return this.domManip(arguments,false,-1,function(b){this.parentNode.insertBefore(b,this.nextSibling)})},end:function(){return this.get(this.stack.pop())},find:function(a){return this.pushStack(jQuery.map(this,function(b){return jQuery.find(a,b)}),arguments)},clone:function(a){return this.pushStack(jQuery.map(this,function(b){return b.cloneNode(a!=undefined?a:true)}),arguments)},filter:function(a){return this.pushStack(a.constructor==Array&&jQuery.map(this,function(b){for(var c=0;c<a.length;c++){if(jQuery.filter(a[c],[b]).r.length){return b}}})||a.constructor==Boolean&&(a?this.get():[])||a.constructor==Function&&jQuery.grep(this,a)||jQuery.filter(a,this).r,arguments)},not:function(a){return this.pushStack(a.constructor==String?jQuery.filter(a,this,false).r:jQuery.grep(this,function(b){return b!=a}),arguments)},add:function(a){return this.pushStack(jQuery.merge(this,a.constructor==String?jQuery.find(a):a.constructor==Array?a:[a]),arguments)},is:function(a){return a?jQuery.filter(a,this).r.length>0:this.length>0},domManip:function(d,f,c,e){var g=this.size()>1;var b=jQuery.clean(d);return this.each(function(){var j=this;if(f&&this.nodeName=="TABLE"&&b[0].nodeName!="THEAD"){var a=this.getElementsByTagName("tbody");if(!a.length){j=document.createElement("tbody");this.appendChild(j)}else{j=a[0]}}for(var h=(c<0?b.length-1:0);h!=(c<0?c:b.length);h+=c){e.apply(j,[g?b[h].cloneNode(true):b[h]])}})},pushStack:function(c,d){var e=d&&d[d.length-1];if(!e||e.constructor!=Function){if(!this.stack){this.stack=[]}this.stack.push(this.get());this.get(c)}else{var b=this.get();this.get(c);if(e.constructor==Function){return this.each(e)}this.get(b)}return this}};jQuery.extend=jQuery.fn.extend=function(b,c){if(!c){c=b;b=this}for(var a in c){b[a]=c[a]}return b};jQuery.extend({init:function(){jQuery.initDone=true;jQuery.each(jQuery.macros.axis,function(a,b){jQuery.fn[a]=function(c){var d=jQuery.map(this,b);if(c&&c.constructor==String){d=jQuery.filter(c,d).r}return this.pushStack(d,arguments)}});jQuery.each(jQuery.macros.to,function(a,b){jQuery.fn[a]=function(){var c=arguments;return this.each(function(){for(var d=0;d<c.length;d++){$(c[d])[b](this)}})}});jQuery.each(jQuery.macros.each,function(a,b){jQuery.fn[a]=function(){return this.each(b,arguments)}});jQuery.each(jQuery.macros.filter,function(a,b){jQuery.fn[b]=function(c,d){return this.filter(":"+b+"("+c+")",d)}});jQuery.each(jQuery.macros.attr,function(a,b){b=b||a;jQuery.fn[a]=function(c){return c==undefined?this.length?this[0][b]:null:this.attr(b,c)}});jQuery.each(jQuery.macros.css,function(a,b){jQuery.fn[b]=function(c){return c==undefined?(this.length?jQuery.css(this[0],b):null):this.css(b,c)}})},each:function(d,c,a){if(d.length==undefined){for(var b in d){c.apply(d[b],a||[b,d[b]])}}else{for(var b=0;b<d.length;b++){c.apply(d[b],a||[b,d[b]])}}return d},className:{add:function(a,b){if(jQuery.className.has(a,b)){return}a.className+=(a.className?" ":"")+b},remove:function(a,b){a.className=!b?"":a.className.replace(new RegExp("(^|\\s*\\b[^-])"+b+"($|\\b(?=[^-]))","g"),"")},has:function(c,b){if(c.className!=undefined){c=c.className}return new RegExp("(^|\\s)"+b+"(\\s|$)").test(c)}},swap:function(c,d,b){for(var a in d){c.style["old"+a]=c.style[a];c.style[a]=d[a]}b.apply(c,[]);for(var a in d){c.style[a]=c.style["old"+a]}},css:function(h,g){if(g=="height"||g=="width"){var b={},c,a,j=["Top","Bottom","Right","Left"];for(var f in j){b["padding"+j[f]]=0;b["border"+j[f]+"Width"]=0}jQuery.swap(h,b,function(){if(jQuery.css(h,"display")!="none"){c=h.offsetHeight;a=h.offsetWidth}else{h=$(h.cloneNode(true)).css({visibility:"hidden",position:"absolute",display:"block"}).prependTo("body")[0];c=h.clientHeight;a=h.clientWidth;h.parentNode.removeChild(h)}});return g=="height"?c:a}else{if(g=="opacity"&&jQuery.browser.msie){return parseFloat(jQuery.curCSS(h,"filter").replace(/[^0-9.]/,""))||1}}return jQuery.curCSS(h,g)},curCSS:function(b,f,c){var a;if(!c&&b.style[f]){a=b.style[f]}else{if(b.currentStyle){var d=f.replace(/\-(\w)/g,function(g,h){return h.toUpperCase()});a=b.currentStyle[f]||b.currentStyle[d]}else{if(document.defaultView&&document.defaultView.getComputedStyle){f=f.replace(/([A-Z])/g,"-$1").toLowerCase();var e=document.defaultView.getComputedStyle(b,null);if(e){a=e.getPropertyValue(f)}else{if(f=="display"){a="none"}else{jQuery.swap(b,{display:"block"},function(){a=document.defaultView.getComputedStyle(this,null).getPropertyValue(f)})}}}}}return a},clean:function(b){var g=[];for(var e=0;e<b.length;e++){if(b[e].constructor==String){var f="";if(!b[e].indexOf("<thead")||!b[e].indexOf("<tbody")){f="thead";b[e]="<table>"+b[e]+"</table>"}else{if(!b[e].indexOf("<tr")){f="tr";b[e]="<table>"+b[e]+"</table>"}else{if(!b[e].indexOf("<td")||!b[e].indexOf("<th")){f="td";b[e]="<table><tbody><tr>"+b[e]+"</tr></tbody></table>"}}}var h=document.createElement("div");h.innerHTML=b[e];if(f){h=h.firstChild;if(f!="thead"){h=h.firstChild}if(f=="td"){h=h.firstChild}}for(var d=0;d<h.childNodes.length;d++){g.push(h.childNodes[d])}}else{if(b[e].jquery||b[e].length&&!b[e].nodeType){for(var c=0;c<b[e].length;c++){g.push(b[e][c])}}else{if(b[e]!==null){g.push(b[e].nodeType?b[e]:document.createTextNode(b[e].toString()))}}}}return g},expr:{"":"m[2]== '*'||a.nodeName.toUpperCase()==m[2].toUpperCase()","#":"a.getAttribute('id')&&a.getAttribute('id')==m[2]",":":{lt:"i<m[3]-0",gt:"i>m[3]-0",nth:"m[3]-0==i",eq:"m[3]-0==i",first:"i==0",last:"i==r.length-1",even:"i%2==0",odd:"i%2","nth-child":"jQuery.sibling(a,m[3]).cur","first-child":"jQuery.sibling(a,0).cur","last-child":"jQuery.sibling(a,0).last","only-child":"jQuery.sibling(a).length==1",parent:"a.childNodes.length",empty:"!a.childNodes.length",contains:"(a.innerText||a.innerHTML).indexOf(m[3])>=0",visible:"a.type!='hidden'&&jQuery.css(a,'display')!='none'&&jQuery.css(a,'visibility')!='hidden'",hidden:"a.type=='hidden'||jQuery.css(a,'display')=='none'||jQuery.css(a,'visibility')=='hidden'",enabled:"!a.disabled",disabled:"a.disabled",checked:"a.checked",selected:"a.selected"},".":"jQuery.className.has(a,m[2])","@":{"=":"z==m[4]","!=":"z!=m[4]","^=":"!z.indexOf(m[4])","$=":"z.substr(z.length - m[4].length,m[4].length)==m[4]","*=":"z.indexOf(m[4])>=0","":"z"},"[":"jQuery.find(m[2],a).length"},token:["\\.\\.|/\\.\\.","a.parentNode",">|/","jQuery.sibling(a.firstChild)","\\+","jQuery.sibling(a).next","~",function(b){var e=[];var d=jQuery.sibling(b);if(d.n>0){for(var c=d.n;c<d.length;c++){e.push(d[c])}}return e}],find:function(o,b){if(b&&b.nodeType==undefined){b=null}b=b||jQuery.context||document;if(o.constructor!=String){return[o]}if(!o.indexOf("//")){b=b.documentElement;o=o.substr(2,o.length)}else{if(!o.indexOf("/")){b=b.documentElement;o=o.substr(1,o.length);if(o.indexOf("/")>=1){o=o.substr(o.indexOf("/"),o.length)}}}var k=[b];var f=[];var l=null;while(o.length>0&&l!=o){var a=[];l=o;o=jQuery.trim(o).replace(/^\/\//i,"");var j=false;for(var g=0;g<jQuery.token.length;g+=2){if(j){continue}var n=new RegExp("^("+jQuery.token[g]+")");var e=n.exec(o);if(e){a=k=jQuery.map(k,jQuery.token[g+1]);o=jQuery.trim(o.replace(n,""));j=true}}if(!j){if(!o.indexOf(",")||!o.indexOf("|")){if(k[0]==b){k.shift()}f=jQuery.merge(f,k);a=k=[b];o=" "+o.substr(1,o.length)}else{var h=/^([#.]?)([a-z0-9\\*_-]*)/i;var e=h.exec(o);if(e[1]=="#"){var d=document.getElementById(e[2]);a=k=d?[d]:[];o=o.replace(h,"")}else{if(!e[2]||e[1]=="."){e[2]="*"}for(var g=0;g<k.length;g++){a=jQuery.merge(a,e[2]=="*"?jQuery.getAll(k[g]):k[g].getElementsByTagName(e[2]))}}}}if(o){var c=jQuery.filter(o,a);k=a=c.r;o=jQuery.trim(c.t)}}if(k&&k[0]==b){k.shift()}f=jQuery.merge(f,k);return f},getAll:function(d,c){c=c||[];var b=d.childNodes;for(var a=0;a<b.length;a++){if(b[a].nodeType==1){c.push(b[a]);jQuery.getAll(b[a],c)}}return c},attr:function(c,b,d){var a={"for":"htmlFor","class":"className","float":"cssFloat",innerHTML:"innerHTML",className:"className",value:"value",disabled:"disabled"};if(a[b]){if(d!=undefined){c[a[b]]=d}return c[a[b]]}else{if(c.getAttribute){if(d!=undefined){c.setAttribute(b,d)}return c.getAttribute(b,2)}else{b=b.replace(/-([a-z])/ig,function(f,e){return e.toUpperCase()});if(d!=undefined){c[b]=d}return c[b]}}},parse:[["\\[ *(@)S *([!*$^=]*) *Q\\]",1],["(\\[)Q\\]",0],["(:)S\\(Q\\)",0],["([:.#]*)S",0]],filter:function(t,r,not){var g=not!==false?jQuery.grep:function(a,f){return jQuery.grep(a,f,true)};while(t&&/^[a-z[({<*:.#]/i.test(t)){var p=jQuery.parse;for(var i=0;i<p.length;i++){var re=new RegExp("^"+p[i][0].replace("S","([a-z*_-][a-z0-9_-]*)").replace("Q"," *'?\"?([^'\"]*?)'?\"? *"),"i");var m=re.exec(t);if(m){if(p[i][1]){m=["",m[1],m[3],m[2],m[4]]}t=t.replace(re,"");break}}if(m[1]==":"&&m[2]=="not"){r=jQuery.filter(m[3],r,false).r}else{var f=jQuery.expr[m[1]];if(f.constructor!=String){f=jQuery.expr[m[1]][m[2]]}eval("f = function(a,i){"+(m[1]=="@"?"z=jQuery.attr(a,m[3]);":"")+"return "+f+"}");r=g(r,f)}}return{r:r,t:t}},trim:function(a){return a.replace(/^\s+|\s+$/g,"")},parents:function(b){var a=[];var c=b.parentNode;while(c&&c!=document){a.push(c);c=c.parentNode}return a},sibling:function(d,f,c){var a=[];var e=d.parentNode.childNodes;for(var b=0;b<e.length;b++){if(c===true&&e[b]==d){continue}if(e[b].nodeType==1){a.push(e[b])}if(e[b]==d){a.n=a.length-1}}return jQuery.extend(a,{last:a.n==a.length-1,cur:f=="even"&&a.n%2==0||f=="odd"&&a.n%2||a[f]==d,prev:a[a.n-1],next:a[a.n+1]})},merge:function(g,d){var a=[];for(var b=0;b<g.length;b++){a[b]=g[b]}for(var e=0;e<d.length;e++){var f=true;for(var c=0;c<g.length;c++){if(d[e]==g[c]){f=false}}if(f){a.push(d[e])}}return a},grep:function(c,e,b){if(e.constructor==String){e=new Function("a","i","return "+e)}var a=[];for(var d=0;d<c.length;d++){if(!b&&e(c[d],d)||b&&!e(c[d],d)){a.push(c[d])}}return a},map:function(b,d){if(d.constructor==String){d=new Function("a","return "+d)}var a=[];for(var c=0;c<b.length;c++){var e=d(b[c],c);if(e!==null&&e!=undefined){if(e.constructor!=Array){e=[e]}a=jQuery.merge(a,e)}}return a},event:{add:function(b,d,c){if(jQuery.browser.msie&&b.setInterval!=undefined){b=window}if(!c.guid){c.guid=this.guid++}if(!b.events){b.events={}}var a=b.events[d];if(!a){a=b.events[d]={};if(b["on"+d]){a[0]=b["on"+d]}}a[c.guid]=c;b["on"+d]=this.handle;if(!this.global[d]){this.global[d]=[]}this.global[d].push(b)},guid:1,global:{},remove:function(c,e,d){if(c.events){if(e&&c.events[e]){if(d){delete c.events[e][d.guid]}else{for(var b in c.events[e]){delete c.events[e][b]}}}else{for(var a in c.events){this.remove(c,a)}}}},trigger:function(c,e,b){e=e||[];if(!b){var d=this.global[c];if(d){for(var a=0;a<d.length;a++){this.trigger(c,e,d[a])}}}else{if(b["on"+c]){e.unshift(this.fix({type:c,target:b}));b["on"+c].apply(b,e)}}},handle:function(d){if(typeof jQuery=="undefined"){return}d=d||jQuery.event.fix(window.event);if(!d){return}var b=true;var e=this.events[d.type];for(var a in e){if(e[a].apply(this,[d])===false){d.preventDefault();d.stopPropagation();b=false}}return b},fix:function(a){if(a){a.preventDefault=function(){this.returnValue=false};a.stopPropagation=function(){this.cancelBubble=true}}return a}}});new function(){var a=navigator.userAgent.toLowerCase();jQuery.browser={safari:/webkit/.test(a),opera:/opera/.test(a),msie:/msie/.test(a)&&!/opera/.test(a),mozilla:/mozilla/.test(a)&&!/compatible/.test(a)};jQuery.boxModel=!jQuery.browser.msie||document.compatMode=="CSS1Compat"};jQuery.macros={to:{appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after"},css:"width,height,top,left,position,float,overflow,color,background".split(","),filter:["eq","lt","gt","contains"],attr:{val:"value",html:"innerHTML",id:null,title:null,name:null,href:null,src:null,rel:null},axis:{parent:"a.parentNode",ancestors:jQuery.parents,parents:jQuery.parents,next:"jQuery.sibling(a).next",prev:"jQuery.sibling(a).prev",siblings:jQuery.sibling,children:"jQuery.sibling(a.firstChild)"},each:{removeAttr:function(a){this.removeAttribute(a)},show:function(){this.style.display=this.oldblock?this.oldblock:"";if(jQuery.css(this,"display")=="none"){this.style.display="block"}},hide:function(){this.oldblock=this.oldblock||jQuery.css(this,"display");if(this.oldblock=="none"){this.oldblock="block"}this.style.display="none"},toggle:function(){$(this)[$(this).is(":hidden")?"show":"hide"].apply($(this),arguments)},addClass:function(a){jQuery.className.add(this,a)},removeClass:function(a){jQuery.className.remove(this,a)},toggleClass:function(a){jQuery.className[jQuery.className.has(this,a)?"remove":"add"](this,a)},remove:function(b){if(!b||jQuery.filter(b,[this]).r){this.parentNode.removeChild(this)}},empty:function(){while(this.firstChild){this.removeChild(this.firstChild)}},bind:function(b,a){if(a.constructor==String){a=new Function("e",(!a.indexOf(".")?"$(this)":"return ")+a)}jQuery.event.add(this,b,a)},unbind:function(b,a){jQuery.event.remove(this,b,a)},trigger:function(a,b){jQuery.event.trigger(a,b,this)}}};jQuery.init();
// myQuery
function $(value){
  
}
