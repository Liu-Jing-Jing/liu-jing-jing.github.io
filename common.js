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
