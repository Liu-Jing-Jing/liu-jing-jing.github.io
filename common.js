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
