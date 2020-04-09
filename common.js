// 自己封装的函数工具包
// 封装代码的目的就是为了节省写代码的时间
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
