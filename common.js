// 自己封装的函数工具包MKTools
// 封装代码的目的就是为了节省写代码的时间 快捷获取元素的方法
function my$(id) {
  //return document.getElementById(id);
  return document.querySelector(id);
}



// basic
// mozilla(firefox)
// webkit or chrome
function getObjectURL(file) {

            var url = null;

            if (window.createObjectURL != undefined) {



                url = window.createObjectURL(file);

            } else if (window.URL != undefined) {

// mozilla(firefox)

                url = window.URL.createObjectURL(file);

            } else if (window.webkitURL != undefined) {

// webkit or chrome

                url = window.webkitURL.createObjectURL(file);

            }

            return url;

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

// ECMA Script6
// 封装ajax的通用工具函数
// 请求方式不一样
// 请求url不一样
// 请求所需要传递的参数不一样
// 数据处理逻辑不一样

// type:请求方式
// url:请求url
// data:请求所需要传递的参数
// success:数据请求成功之后的处理逻辑--回调函数
// 下面这种函数声明有什么不足
// 1.参数数量固定,不方便后期的扩展,如想添加新的功能,不是很方便
// 2.参数顺序固定,不方便用户的调用
// 3.这个函数一个全局函数,如果这种函数太多了,会造成内存泄露--全局污染(全局的成员不会释放)
// function ajax(type,url,data,success){

// }
// function get(){}
// function post(){}

// 改造函数的声明方式,以对象做为参数,因为js对象是有动态特征
// options.type:请求方式
// options.url:请求url
// options.data:请求所需要传递的参数
// options.success:数据请求成功之后的处理逻辑--回调函数

// 以对象做为参数,立马解决了参数数量固定和参数顺序固定的问题
// 不足:还是会造成全局污染
// function ajax(options){

// }
// function get(options){}
// function post(options){}

// 为了避免全局污染,可以将成员封装到对象中
// $就是我当前的对象的名称,在js中,支持使用$做为变量名
// 使用const原因只有一个,我这个$工具以后只希望别人使用,而不希望别人修改
const $ = {
    // options.type:请求方式
    // options.url:请求url
    // options.data:请求所需要传递的参数
    // options.success:数据请求成功之后的处理逻辑--回调函数
    // option.dataType:响应数据的目标类型,用户希望你给他"返回"什么类型的数据
    ajax:function(options){
        // 处理参数,为参数设置默认值(如果你传递了参数,就使用你传递的参数,如果没有传递参数,就给你默认值)
        // 如果访问对象的不存在的属性,返回undefined
        let type = options.type || 'get'
        let url = options.url
        let data = options.data || ''
        let success = options.success
        let dataType = options.dataType || "text/html"

        // 创建异步对象
        let xhr = new XMLHttpRequest()

        // 发送请求
        // 请求行
        if(type == 'get'){
            // 拼接参数  http://127.0.0.1:3002/getuserbyid?id=1
            url = url + "?" + data
            // 拼接之后,将data参数重置为null
            data = null
        }
        xhr.open(type,url)
        // 请求头
        if(type == 'post'){
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
        }
        // 请求体
        xhr.send(data)

        // 接收响应
        xhr.onload = function(){
            // 我也不知道你要做什么,我只是一个工具函数,那么你得告诉我你想做什么
            // 调用回调函数,同时传入获取到的数据
            // &&判断success是否传递了,如果传递了则调用,否则不调用
            // 转换
            let res = null
            if(dataType == 'json'){ // 说明你想要js对象
                res = JSON.parse(xhr.response)
            }else if(dataType == 'xml'){ // 说明你要xml格式的数据
                res = xhr.responseXML
            }else { // 默认值
                res = xhr.response
            }
            // let res = xhr.response
            success && success(res)
        }
    }
}

// var:没有作用域的概念,会造成变量提升
// let:会产生块级作用域,且不会变量提升
// const:定义常量,一旦定义好之后,只能使用,不能修改

