// 自己封装的函数工具包MKTools
// 封装代码的目的就是为了节省写代码的时间 快捷获取元素的方法
function my$(id) {
  //return document.getElementById(id);
  return document.querySelector(id);
}


// addClass
// removeClass
function removeClass(elem, str) {
    var cName = elem.className;
    var arrClassName = cName.split(" ");
    var newArr = [];

    for(var i=0; i<arrClassName.length;i++)
    {
	if(arrClassName[i] != str) newArr.push(arrClassName[i]);
    }

    var str = newArr.join(" ");
    elem.className = str;
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


//upload 请求报文
Last login: Thu May 21 15:06:14 on ttys002
MarkLewisdeMBP:~ mark$ cd /Users/mark/Sites/heroProject-SQLite
MarkLewisdeMBP:heroProject-SQLite mark$ node app.js
服务器启动成功提示:http://127.0.0.1:3002
获得列表数据的请求
获取数据的请求[object Object]
data is[object Object],[object Object],[object Object],[object Object]
uploadFile
解析文件完成--heima
Content-Disposition: form-data; name="img"; filename="meimei.png"
Content-Type: image/png
5��ntY��x�7D��,]��mno�m}��~�;�WV�_�8�Lw:������	e��2�v���L�PM�b\Ӥ�)84�C<ɔ,.�b%��|�g�oXd�3�&���
5�րm�.E:�M*dE2�I�]&�RiKF��fU��ZI�=6��(C�aƥ]���(D`-��V7����t��I�z�,U��zM{�V�z���L�g���a�	�����0ƌ�@
                  �Q�FG`"���<�f!1��������qp��,ŀ:�B����t H��_��s�BXp��Ӄ�kn��<Ox��ƭ�٥
   ��R������`{g�`<��6���
                        �5��n�j%]�K�#
                                     L���d�i�8�%�͊-��Sϐ۔^���e�t?�*x���&������W�aE�+K����+�0B8���J.P�Љ(v��o5���H
�
G�J�4�Td�%[�L
             �c�^`tR�i`��z�����B�+c��ၠ��h��Q��"n���ˎ��hy�$���?�"�;�#�O_��*��X�1�gT�*X�L�-HD�K��K�"���lp���7�F�d�:�:��]�?���[G3��d�����h:|&{�`+�v��sa�+o�ܫ��
                                                                          9R�\X\^^�y%d"� .a����+��	ؼ�����3���y��g���l���'�Cp5�V���&��Fso���U4i��;�5h2Ai<5���ٰP����*؃��n���m�ݍp�Y6V�N
��%cYSS`%��X�fY4w=,<Ȫ����M�*8��&�ga6^��_p#2�c+�n���\�&e:P��셠G����������"�Q�S3��x�d���Ё��4v�=[�K��B�5�P�̼t�:Ã����Rqݙ�h��m��s�`�������M�Q#y�6KE$��m���sVO�"�8�CB�<��J��Kyh9�!�T��E�Z�*
�'MFϒ@IA2�q���5�u,�D������TJ4��L{�dE?��3�T*�-YDNԟL�!|`=�0��t4d����V+�5X�q�9,�
                                �I?�O�:P�8)1==äd�D2g�a7��R��
                                                            �C����cQR��?,�!�4r�����n�̴gh!�T:�A�{��)c-��ut@��"��q#�K�W��6�0�WrJ�b�-������w�Gs&��D��r���Q�7���ә��Z�c������VV�T4ٖͬɞ��.��;��Է���b妖��F��Q�vS.|�,���9��.�J`%g�b�3,�i�"a|��r����4���H�R)��`��T0�7���f�5<�F�� ϔ?�|��Y��gm,j �$�F�Lgo0�[�w�o�u���n,�u�|�
�#�p��h                �m����a{���n���Hڪ'����\5��t�#3Ԫ@U&4���%놦ځz&�Q
��ᅇ��b'���X����!jA��g�En��1Vb��ےm��F���v���dbh�����#��?y���g�J�&� �f"����]�o�8g�i�d�t7&?�+�!�D)�w�FI{���JĒ�)U5�Ev��Q#b�L:���dG��
!TBdA/�ɚ�Q�tǚ<I!||��*�o�l0ҐX��xm�Nm������"5�<6-P�(2;�������ˎG��R�¾Y3!DZ��*�E*$˃T�(CL½�¨�=���Y�0�Bqr�U�qnκ ��w2�������߅���/>���7�n��´�ч�l?�̰�iccm8�w����΅˫���%�Y��?R��L爵£x�*½����>3q=�%�n<�^�y�/p2��* =��;�B&ڬ1�J��ã���g7K��e�|4uD*�шt�'9LczS���S:���,�1�g��빍i4��L,��P��6�QC         �,,�O6F/+�a(�P��i¾�BL�0��'�¼.�´Ŋ����8��2����d�N�95۞�d!(��-��1�Eµ���H���� ��jC�:'��+��w�c�VF+�-ɘ�d2궡+����_�p�pӋՋ8
                  ���լ;+��4�}��ϕIi���*���*�?If����Vi�#                D�N	�^b�zcL*�`�2�m4�$�Ev-v��8Q��,��                        ��#�M�l��Lfj�
                              FԈ���X5Of���BO��쳿F(                ��Y1�'��@L�E����Ou�#$5�)7�2�<�ǰ�A�4)                            �,�j����Kp�i��x�s�X+d�xutpԜ�C�b�Ӊ�>ӧ�߆ĉ�d0�4�EzR>�����ܿ�£�ȓ��n�'�ʁQ��z|Z]���]"g�.L���&тD�XСx�o����x�K��/"N.y=��$�3}�Ru�H���ۦ                       JI8^�4s��N��w`��Ξ�����ƒt$x�=�y�_ƒ�ޝ�����09½�XZZ�����x¾W���A��WW�e&h���d��;ճ�ȳ���m�Dn�JĀ䝙M��Xi�����kɕ��Ʌ�$O�����脂���M��:�e���\���N��ywA���m£���v���3�)?D�^�N�:��3cɼ�go����R:��Tr��2%0���9ҥ��.�b���½¼Ǒu�><�6�£��FN�ł%¾X0�4I8,f1¦��ܳ�Tj���c��x$�4<cL���£a��*$£�b�'��..�����£m:��0�¾I�A����������A*�
��
  d!Gy����5�A"����F`�rD����lUL�L�lo14&1�3
                                         ����7£���̠^�rqss¼n�3:,/.�gg���^���`(�Ch�7��{}:�tύ�ݽ�9��8�������v��^iUr�P���S��SZ�W��ʅ�`=��}V�	_+�!J�+��3�>Sd�*u��zA*�_%��"W���y�U-�>�I��5��;������½n�e�
                                 b��H83�M�ÿ¦�v½�4£t�r����͸۱;�D2�4��J�x��g¦��P���p5A�&����4�����I�5�
                    ��q���%Z%�I�x��6j½&c`�TQ2����x�=��´ڎN�=�ݳ̔�R9sa��.���¨�-�ӝɋh���l��v�£'
���3�?��OD7�+0�rCa4�֡b1��R�1�gE�$�b� �ÿL��£	�����¾a4����uT���h,��Np�PB^�x��n�L��cz����'�s䇝I��i�n�../]�pi�;w�!h��M��$�
Y00H+��VV9k���l��p�?a
  1��-b�S�3\��1����X���G�FT�[�&(這QdJ��ܜC
                                         }|0Kh����I��i´��І�V�!��e ��9�Gq�;!vHc������т	���.n�M ����Z���	c&1��oR�2̥X�5�jT����rTu�:�P�e���,����Lb�����nⴢ\��X23AU�~�ra�+
            v�7�t>�4�.��?����F���?w�S�tit���wLu�Z-Wy��Ӧ3��!S�rcVp2A�'#n0���  �@�/����xP!v7H��m4JO9�H�*J2�ؘ���A���6�|r�N��w���իWH��?�+��\X�L���WV/�/,�n�^[ۘ�����,�x��	QJC6H��Fi�ĕ���hp���h�"��޶bcȂu�?b]�kj���B�������
                                                       �Ӓ���,Q#�-HRCdQ���w�Zxj���pdK?�.�x:]���!K�p;0D��Őҋ
B�(M�0��$�_C�x!j�Jn��V�s�`A�U`�y�G��6`r����|0A�BhY���Xr|�t�(�؀H�p�%����?¤���#?8��%u��.QvK���3�OӶ	���9���?�]����B�B
                                         ��7ٮ��W,�B�m��x�z�^���9�,/Q�$�e$n�RZgf�-D�D[�G0fq�{���=T��Qw����5�-���P	�rf�G."ZY]f%zv�������g��O������R�
                                                                         �9ⲅ�	�������+;T���b��Q��������\�=ۼ|��37�=\�$�\X^^]b5�˂x����}�Ʌ��>?�]<�4���{���x�`�ϴ��D����%����?�Н�p��5�	bݝ�a/>� ��O6+V%�g�(Ym/�/;֘�q�A�v>����¤,v��J�?�W�bi
���7��E��U�����'5){��'�[��1?=�S$�"W�����s����u�P%�Т���/�0?_���Od�
                                                                 ��kgKP[t@Mu�UG.4I�9Ѕ��-j�E�h͡�0����F� H.����
                            *1M�8��b#
                                     �SJ�Sl�`���$�l�$'*�I�i�iG�`0�m,���@$~��LjuA��'lQg�,�.D�/_ͷ~��D��3�Z�Kp�
��g'Z-��L�d=�L'wau0e�
                     HN!��ɗ�IG�1���P4�i��t{��h�� n
                                                  !���ƌ��v�3�]f��;�i�~��t��\� ����\E��3Ϡ�!|0�3
Vk�xy��
       Lt��Q<����]����EOD�]������y*ufvve����˯��fj���]����K��\�1^�p�����������^��19f�r�<�AH`�����9e��/�r���h������Հԅز\f�S��Uq�FH�uA,t��ʲ�
�@r����8 �T�<e8�WVyc1�q���Oh�'��x-8'�R��i�@*�
                                             ���b�@Q��jS(xx��9�#6�-�7?%��{t��%p�:�|�q���)���0i�2-KiL��3��'A:X�G����
\ R^)s���Cfv�X�VNʒ���@2V6�ZHcar�>��Q���_�'TR�5E�@'3C@��5�G�g��c���\�^@���R*��C�$G�
ұ����`J3k�.GkPQ�b�q��\�����l��Qp��m�xv����s������v��p��/��
                                                          �ĺs���M�d���g�� �8?��EkיL_X���`�c9�)��h��@Y�3�g
                         ��
��aP��epn�=s	��~�+o}�[ߎ�4:�Yn�
                                 .��âJ`y�Mf^6��[�l�VEK���J��A��eԧ���f�����C{9�ODf$W�W�M
����+ר�X><L�ޟ��I<�-'��^QݎM�*CᓈK��5"�O�)�[)7d�oYL�N�<X��RW�C�(�b%�U���&  e��=����#��[ذ} g:�s�w�A�p$��
                    0���1Ƅ�sl�
                              � |A@�	C(�
                                           �BXp��ł�v*��WN%"M�~_�rŭ��)v�,������Z^�����,��޸q����:Y�����I�U B�,n
                             �\�1�E�a�F���z��������O�/.-�,��Ғy,�:bZ��������vCT��a�,!H�Xu+^"�ڨ�R�{e9��ȗSt�p��$UY*�Ooy������iR?M�q����|��V�q�iG3=�#[�mJ}cT�a ֠����3�Mњ)m�Y
       �
d���b���1\���b1$�n^d�%�z�)L��3t��Q��nHo��*\Y����8
                                                 ��������O�5�"+a!w�'�߰������Y9����<��G씅8�GEd�
              jn�4~���O��8`��a�/�'	f,""��s��Zd�ɸ+��Ͷ�&�f��KͱM��=8�CRC�}@���⎵Q�ܫ�))�%Q-�w���� �M�-���p@ީ&�
                              �G���b����^�G�[;��cp�A�r����՜+1߽�>s�k�[{{=�_�r1��� `d��ve�3�����Ʌ)��
                 I��~'w����_{uks����]�.���+������\;���b��^����ę��3�8*'#���a��$��
چНXF���J �rn��9���$!ԡ��h�
                         ��0W�7Ce��G���E��@1��Il'.[.���4�
��7��7%�I-8cBlqW|ʔ�|2����3l�\
%�Q]"ŀiZTц�4yΦ����Ȓa RO��W�E�Z��.P�"t�O8
�E�c�L��$30
           ��k'k�D�F&�g�o������D�.`rW���
��|��`5	���b'5���[�p��������cmB����A��en6<�Q������|G	�B����ʬ0lo)��c�2P�P�Lಱ��3�}p{eiyx8rmm����Kx�������ꞣl�����+rs��\� �������*����<�*y�0ۀh"|>E��^�|y������vt2ERe$b@,�$��ijC掁�L�Ƴ�l�x7a!��]��`e�տ�@��-�EP+���DҠ��L%4�����+��g�\nf
                              L1<Y�ArU�C�k?�[S'k$�^��%�wʅr�'�ʜdH�����&ʖuq�#�*"u
                                                                               Qxu_U���D�2X�Q�Co�k�=16'�	��e/
�Enn�9�H�C��u��5���gv�(a,�          mx��#��{(p.�����9Ju>o��\d
                     ���ݝ����������MV��vY����V�B�Zwv�?��J���'6�G3Cn�0��de�s�÷߅8H
��z��sL�/�w�ݓ-C����\�
         GnyF�������:*�(�I����l_b���@ď%��6��aH�F	�����M�]ҋ�Di�#9�́n�qq �m(����!T�/)y��@
��3���{�={�u4&A詘E�Uoj+`g�)nס&o�lo���DlP�0�Ӎ�9�r̈́iJ�4F���24���͢����X�0R-�LY
                                                                         Xxј�d���BF���p�0��u�?�@������.�^
                         ����
                             6��Fc���i��G��^����G�_��O쪁µq��\p�T�`h�
	Ng���`�W�vD>�n
�"�Ԣʌ��0���%���|r^���@�3&��	� W
�O2ϰD{�fMP��Ԡ>�p�]A�c�]"�IW���]ӥ�zi����c*��4@Qc�<��ۗ�h��QT�,2���ӈQB�f�i![�f�p�,�
SԪJ��@���*
�i�
�E���������M5[->�2�n4Y�b�
                         ��jx�p�w֣1Y]Zf�
�� �@1���2:"n���6.�dQ���n5��;��A�V0�D|V�!*q�+�'�C��̅tȽ��x��������Fkv�}L�l��e�G�7�W���(*z.@���"��?���F����:)ӹP�1fGD�-q
                                    �b�5e;�p䉁3q��mX�)�
                                                       ��.�
���0Z������p֥����V	��X~�)=9���|f�*��V�SE�*�]�4.��.�O���阝sd#6V���M�����j.6D�Ն5$�H��f=�
i�AD��Cyb�T� ��D)�
                  	_	�{�2D��Wɵ]c���4Dč"�����cM=@�����y�`g-�$[�]��1�i�\���Z,���<;�6��>�7��իWo�z��ݭ�o��X�e�#�`�%����q�I����ѹQ/�'�b=	P!%��u�IƉb��A��3����\x�,?%����"o��h���;l�D_{��uq���;��wH1L��Zb�	��VW7�����]f$I�D�~S��&��d>!�4A]ESf�+��7(��x�Ϛ5
              $Bȷ��s��0r!
^ԃ<��8��is�ҋ��L�0{��������a���R��4!�J#�4��=�
                                            �
j$��Glz�}}̈́�4���"���M&�SK���糴��*�c����UaϷ�'�l���-Q��-J�q�.��?��8L�0zaa�m[
���n;ox������ƻ��h}}���Ǵ�y�?�ՔY�4�w
                                  ���S!(��\c��p��$�{3�ط1���י-�
                                                              �S��o�e!��=����Վ��S�?��?nz�
         �Z�1�	/�v5��ũ`V��Hhc�p<��%B�(�䄤�0�,2�����m��s����e�C"/��0�tQ
                                                                       ���|
#���Y|��R<)�I��O_>?�V���(��Nr�گ�1M�h9_�`+�!9�2§,a��J��n�$�Yf�80�`m�YK���TLSj���<1��g!i	��E�,Q9}���ѣ|�O�0!C�ñ@�т�1.Me�,�OY��=,���zͰ��Ny����/-<a%����d�YH����PL��{����|��>|x��
             ��#
�}���ĵ#`�X�q�����*ǀJ��Ѩ5�*��x���	����)�t(�RQ��bYQF�
7N��ttĨdsw��!w9[
��\r&_9&��#C�ya��d҄�t�0�')�OXJ�A�H�5��c�V
                                        �$K�p���/���5�}!��mG���~�@H2��2�B
                                                                         ��c�*2H�.�3�6�c`�6!�|ǊH+DHE�
               ��Xy�R�43���SI`P+�jj-���Z�q�e��0��Uڶo�ʉSw�PJ
)��ȴ�<�	C匁t����kZ�^��=����`Y-�,~-:!�n��FJ��$J�8�� ��8t���<�u83�\S�����x��/���?d��,��2�vj#;"�F���~鐪s����ѓ	�;{�IC5�]88�穫�6�G��s+<�ِ���]A�ZYq�N1KC&H;��У�g��q���3=Qڜ�A�+A�iG:dVzG£;���(�|��ɬ$��'������:�7[��	u����s_x���-.-�An|�`����H�d��C0�1(����5s��s�j�WUx��W����)��Yㅻ F�Uj�y*����.q�
                                                     ���_���Fl_H��kQ|�f$]j��nK����-9~�Ƀ0H)��lG���(/Z�t�f^4��A�$�XL��G}�
�%_#��%�
        �0h[i8�L���2�(�'%�4AH���x�J����+�I��z��`�
��N����v�C�1Q��Ǝ��/�Db;[[�����������ٜ�ȍ́2�K
�n��m����{+����<C\�!jm��FЭ/��|iO����Hch@�����V�rb�u�-A�;[B��g���a@E�{��<f�XX^���ݝT7�ę�E༅��V[�U~�ˀ/G��ޕK��ݻ��/��t4"���FJ��N)>�ZR"{�B�ѓ �Q6d�Ss>Ί���~��)�>����D	Fc����;�ùd����r)ʆ�G�L"�F>i���@��^<�
                                  �Ê�h�m�s#f����BD�!T#�5,��WRCc��b�/�tF6|�q�H'�sN1&-�Rؤ��S�~�$1*╥t�\�x���g�L

���+���
�@!�j��SrK"�X8�����ց���A �Xڡc&�j�W(�^����k8��������\g���nKY�P(����
                                                                  �
                                                                   �k�M��/./"�?���7_����5
         $��Upڲ����A�H��E%<}|�8�
                                <Q���i��6y�c�H\p!��N�m)ŊGBX&G�C�}(APm8�ڈA
                                                                         ���x���r+Wo��~��&�8X[��J�����-:� t�A'o
                               ���Id\���'i
�#W�	�(�}��P�V���t�c�galQdӢf)K�"@�Rxs��8T�����z�����l��#\�G"D�@�
�!L4��j�H��W��w酼s������߹��w>|�A�������Vp�|E|2}Q��(��U"F"�2�C�᭦`��,���
1+"��_�m$����T
-�J��X����ѩ�<�@�q��!�''�b_�|	.1�H�sa|�W�c�Yԝ�Z�K�.�ؑ��LhbO� ���e�{ͳ�~�ى�e���98��Z+��7�^�T���248�SF�	��{�J����N�-���OgE�,�S)e�?}�&�G��T��ؕ+9���#��=\
                                                                      mkډ#�&���d7c���s4|^��ہ���b�-�:��������3��.�R��M4#�EFm^N8�	J9hKg�� Y�ۉɜ��
l.�hH5�]?x�R���B*�!�
                    T
�$�?6���U: *.H��Kލ��������N:��l�@<]�5Sb�܋���h
                      ��rRLN>q���7������\�t���C��3N�2�%*y��%H٪����:��V����R��`ц�%���,��g�8:�m\��rWA����Ǹ�Dd��H�ݙ�D&��1����H���6b�K��<&�CG�~gn��	��������?z�r�FNF4������nܼI�[��m8&y��X<?�Y]����4v������l
                                      ��i4�F|x�=NǭL��)P�U�P��(r�%�w�=Ϥ;��|27H=)�0$��-���h���.�F��R~�Jd�V�~���̐s K��5�쏛���)�*��Sa�w�|Τ�C�\�0aI{�y#�l�c���5q�*��Z
                                                        qE��y�g�<�Cn�Z�Jp��Lz��y����g�ئ̎g \�ʢ�u�1a��(�"��ז�=���E�R���5}��(U.���p�b�e?p���ŕ?�G��w�ݿ���G̤��0�
                                                                         d|��Lw���*�&4ujj�����S�Nau1�R˼B3���KS���Kܰ�-	LG�|�Ê���c�c�8
4��X��C���۸=�^�a8����s�G�AU��5܃9�g��4�s7ok{k�����4�7i����n�
�@�>w�E���(m,��$�%��"�I�4�%����ɤ�'���
[z�.]�#��Ca���h�pzT*��eu;'��w=�/���J��<D�^�'k'ܳՀR"N��y�6��s_C��|����))1ΰ�S>�����Xuj
Ic�ɡ;~jm��!�1G�����֌��i�M�R�<V=[�ÑI�&Q	���Y��&.+�_X�-�Lj�@U���NE�d�ǽ�e#�3:.)�?�*%�B%�R�>ţr��n���`��7L,�p�-#�+/��w�������z���u����*��'�4�%�LN�Qؐ-X�ι՞��Y�c�:aS����یaJ���޲D�fҧ�̂���E��Q5̔��JC(j�mx�>�)ƝĜ���n�S��qa%�cR����!a(�]��w�	�߿��+{���$
?B����\�|*�O��E;��@�e=�ݧ�����ǁ�&ۯ��)�qx�������F�B�D���@y���������m-܅F[��)�G�?&��ĽG,����f��vмGZ��]3���ko���z��;\�,�EH��\\�t�Q^=����m*��t����
                                                           X�j���k��<e?Zq�Kr��ҽ����pU��T����ʈt3qҦ�y$;�2{#L �ntL̼�����׾�毿�����
D1���e'�SB��S<jS�u���n� V/f�=�0��%@\���d     E����J"�$��v\8�	�O
��{@'K�~|~�K�A��`�����CK���;>�ȧkr0��w��EH���n�n�<޿w�ҥ��
                                                       �.^������$'h��/�D�(f�8XM�r(.ՠ�e����%Kg��ʱ�A�ʫr�Y����iMҏ�{*�c^�J=JYF��I��]��K�g7N��,�&l�ey�RDiFc8d�Iz�Y�3m#,����n���S����Ջ��"�pHK�� 3H���S���B�FLB���αȊO�Z��yD
                         Ʋ���9)��G!��.�g6_�_��
                                              �т�8i=aO�cE��?�{���=qOς&��E�y�o�l�./�O��?������k�
               ��m�,J-�\�
                         \�0as�p��l)2!笨�l�15)�(��4��'&?�nrr�|S�XQ�����#�Cɘ<!�0X��t��p�YI��+'#�C�N�c'���6:&�eg��#[����=�D�4@�k�/�};^�vu0rه/�q�sg{�
                                                                  �?��?���>�2�	����J��(v���PΞ�Es��RfIe�9�
[��.]�����'��ǭ���Q��c�KsN�u�z�_��j@�t-Q#6u2[��'$"'�m��Y�����lXf`C�lt��/&����њ�L.
                                                                               �1�����t˺M���'��;Hh�	�W��D�������T��6i��4$G=�ks�'�4��{>A��5��^߰0���������ig
                                                                             !���B�x_��t������L�\���K�*�����t�v�Z=#h?����ߎ�{�z8����,��̠��N��:\R��T.�c�ZWM��i∗�L����vI�u��7�
_�Rf�fo�|�ގ-Ό��h�fճ�l~q	acb�t�HA��(�{;�l�Tv�Z&q�pz<|��r��ʀ���c�������s�s��C%"t�����;{�
      ���.\���oY�]/�n����<�`G9���D��z
                                     �z�8�c��1B��:5��9���	���m�L�ӶTۦ��	�"�) �j���e@�VX1��9���	�����=#Z�l�P�y"!u�8d���̜3O
                                                 �͎���[��2ACU(B�.��v���'�Eۋ���b	�q�H�(hs;<���`G0%qE�A�J'��#N��3�n/����|��x-\̣QI�>��L��*�$�
���,��������~�������p��@��&�k��v,�e�+�?���V�LY�4<����l��������ZWT�ŏ����[G��矓��"�O+�`�d�4~f2AY�ZG�"�|��
#i�fk!ГA7�6�䫐L9<����+(���
�3s��	,fC�3ׯ�0~����
                     +�ܟ����%���o<�|�����ݷ��"JFy�#wȦE��3���8a���/KK��3�TaK��إK���3I��qϋw�ۣR���������h�@{�6)�
                           O-�y[=>��*�Ȥ7�k�~vq�o�3郊�_�TT���8�r�z#��!��R98:d��wClm�L=@e�0��x3��"�����G�����������ڥ���;�\+)��&�S�pC cx��h�
                                                         ��!�g\oG�!t��e/������JR�I�A��\�I"�p�I�1��)�����&�k59��/�t�1(��ɠ�"�g�}�'���NLMN��<eqM�'ْ��7�	�8��Wv�D���V������ҥ
           �|�	�v��{� %��/�,9�������V
                                      D��
����w�c�Ü�����Lc�{�h{�zRD	�|���Z$v2�hcj.W���1��A�7 .��͎IL?7�.���7�
      ��W��Z,|��3sK��`��{_y=z�DAA.���K:�,��O�i��qT�b3�	O�P�qt��]�Γ�F�M��E���!F�|�v�R�N�6�:6aϜ!���=��QMS̊��'/P �Tb`e���J�G�_{��?����/����|�E�[�|F`������"��	�}�l)@�C��r(V�'(��!EeD٬��
/3T�R�ɼ�kL��$"X��F�$V�Assc��1�T�p�g|�Ҝ��\E�ڇ��90��!6_�x晫
                                                         �Q�{\R�r�ڕ��܁{h
                                                                        `��|wa�˷!�{��
     �?�ř�}��Z;1ى��'b�x&-o�rB���짍2����G����jj΅5�uϠg��s蜥PwyT*�0u��^��G{B�����8�$`25UÂ�>�u�C�;�N
1�U-@�d��9J���^zp���r�@L[�e�C��̐���ŝ��o���ǎ7b���J�f���Y�f�73<L�sQ?��~�kM��۲
                                                                          Lף��l�Em��ͪ�_��輥�~p�A��Xbʩ�X
                      W)�x-=�[f����K�:7E�tD�
                                            �/�O��*�*�֮iku�s��_�v��i�g����o�7������������F���RE��dZu�iG�4��^��J=8>H���W,V댻ڈe��&]�WIc1Pi*$KT}L���]i��p�0�CY`q
                                                                            �ˀ#
%�`%!A=��<Z��H��	�;a@U�0G�d C-_X^a���J�y
                                               �S��U�I�z�Y�����d����A�K/�AR�#���Gh�^M+�H�-p����(�^��~�7/O;=}�9s �%0ӱ�ʶ_���,Dc��(�����ȄP�Y?E�i�Qw�}���
�CRȐ#��vXUougg�Þ���k�3�UY��k�����������ɫK�s<��^ɛ�-�/_���P�ǙJKjHH��@K�:9S�	�:&Д��L����u��	��Ԭe��NU��,���͈'�
������w�����'r4���{���ڠ(�q":3��_�"gŒe�bFX�%&���1�6��.��;���y��$5��_r���W���������
  d��_�\(
kVD56gb�z/.�����/��^��ׯ354q���d]��[JHY�b3tgd��lMoom�����A
                                                         7bx����K4.\�����y�ݝmtLz�Ņ���8^{�>������������!�a�)��@&�*sM1T��;&苶�s���'|(/��T!����b˲V���`�ֲ��%�z�mߪ
                                                                            /oeϹ��h��V��̈́���������0�{8r���I�0J+s�]��@׭2�N�S�P|\����h�l?`4��E0W�N�A)�I�Ԥ2
                                                                       -�
�����r��܇��Q]JD�%<��Z(*�Ӧ��cN�1�<5���_�Ͷ���o�vw��<�D)9zh�,y���YX�ǆWa2L��4�"C|9e9ͧ#�I��d q�:N�{U.j�4�i1JZd�����H�T�.�&Z���<�~��A&+�=�I����wFЋ�
                                                             l�\^\��2"
                                                                      ����<k܌Ę�����7J�G�f�M�D�K\i��H������K�|@½�
                                }h7h�`4���k[���SL8�Z�����
                                                         ����?�V�*ZM�&�$����2B�\�3�	4Ɲ��!Q
|x���l!by�ޝ�Q!��H2S��y�6Ƭ=�\g�p�7JJ�hL毲��j�c	�½A� ��/`%�n����
                                                                �1��6z<;=�'�b�Juae��쭍�������7�������}&�(�'��j��j��W+�ä���tTe�a�����N�QyL�ɞ)�+ΊC#Q>?%Z7��X#N����GQ�h�Ԭ��YO���د�1֦(XG#�ة}^!��_,ФC�ww��m@p�3s0�a8_�$E��{�Z���/�Xa	A��_�s�#��E6A���r~���m����J�Ɗ(���7�vF��Vf1��_���EH|q�p�
                                    w��vG�;������`g_��xgfna��4?��Xʛ^��0 %�
�tm9�C�gZ�p������TQ�G
                     x*9H����?'�3��Œ���^ i�-���믾�����~�߳h�gjҳz ��"P��^e]Ra�%��UE����a� ����U�5i$�
                 ���`}��X�����C6Q2)�9E���3��F�k4�C�T�\�o㠇���{�\L��}��Ѡ���7�ѫ�.��Jf?	���(��>��_me�_(� �L��*ϟ�B�
                                  \Y>}ܿQ!z�@�2�a�c�A](� ��Fydu�n\�$�:i��jBo�5��;S�3��%�y�ql/�YBAQ-LP'�w���w�<�z��b��
                                   �j>Հ;��s3�yc(��K��f�ԕG(��Ɨ�\�_�1�$��f�l����SA�/~a-`5��RF|[)���j���ǠA������?�)��r��7u���SA��?e��̥����j�Mn�ۅ������/��w����������.h,��Eb�/�*q�BA�=�)xZM��',"�x��O�U!� �A����-��.�$��TV��	�:(8��H2�I���?B��]*�0z��ẋ#-Q̲3���0��|�#�����4�������&H�k_�"�cE����K,˰'�q�������s�>�h�q7X��ۣQ<�����������O�j+����?ߊ�b	�x
6$��"KҠ��;^�?D_>������ް�8y�ә�{&�t��2����|�G�R]��9�׽��>��'+�cb���D�3%�r(�)�
                                  �n��>���D��,���j"��+����g�7p���O4�`G�Vv�l�3EptGA��#F�E�k���dQ��J�
                   	�0:
                           M)��H~�7�:��ӈN��'{�/r�,w
9�0������/��?�惻w8�39����=񥘚P��<*]ȦW��|�L:�k��
_���$o\����-.�on�s��"z�K���o_��o06��B_���q򧻱�7�  Yf0WV�v���߿w��/_Y}���Pc!
                                                                        4�b���|������9P���O��8P�L^��Q�$�8�[2P%��Y赍\vKWJc��ObΈ��f'z��A������~GP�LK�D38�����>ᷱ}g}�����no��vy�%?
\&F�t��ن�6K  :�#�T*|�:b�h���9��m؍)���R�l6�]��S��ⰱn�ƕH��
           �,��Pq� �H�/5c����:m@��G����@Cvc�`|��ͭ͝Ź���ͯ}t�G��>�
                                                            p��V{)4i��]�������	=2EKfEv68|�r�ّ����
                J�e ���DCKj� @�h��_�噙���ܱX�Lz�q-��ǳFn��LL�x�&:�
                                                               I;�"f<��l��{�~g�K���...�v��7Z��������H˕+��n�x�18U����{��^��зg;�������͍����W/������yZ��}�����ͯ�W�D!uQ�xT%%��'���TO�"M�!'1�ɷ�g��Z�g�����������u{=���n�*1�d�gG��(��[�
SQ���J��Z�|�o2�;�#��8@�H�< ������u�%�~czsxp��������H�A          4v�'��GX��j��F��
                                                      �{��>�����#?P��6O��d!sx���a�1f�]�6lt
          >�!���v)坛�#y5X�F�x�#�5
                                 |4hA3�~�O�-���1����^wv���jwǁ(_Ue�s�:�De|T��-����h�gr)�E�
         _�O�|�蓎�ԁ�\Y��]"�!Hx#zX#\�\iTBQE��|1���9o��/j��;b�;]*
                                                               ���;��w�h1����먍�!L�,�Q3����YZ� )�c��2��G5�q�4Y��.�o�l�~�>���������j��w�f���.��>�����[K�8�
    �_rX{;��Z�0��ql�J�S�s�@U6��%j0��Z��D{"AYԅl�.Maj�
                                                    cb�j�X�ai��4Z~J�8����eH�4~�`�0l$B�@`�#���ꡩy�SE+c�S��B�̮�~l�NC@|�8
�a��i�d�cZ��HX�Y��%R�R�(jU�'��8�ؓ)7��)P��Psq6:"XJ���=?�ӟ�4Я�H-�
                                                              6���f����O�=t@��!?��3j��[�!&2�o�,p�d��-<}�leO��	+cwZ�p�<���hPTD��6؇�<0��t8�؍#�&����_z����k/���+��QĩG@�YO6����W��I����D��կ2A	ϡ�j��L�[���׾�5r��zO߂�g���S��.��vǔ^XAw|���p�$[�c���_
s��-�����[4Fa�ʉ S��/�J�����@��?��Af��a�=q?����dݶh�7⛐&4��g���2>�/�N��IM�Uł`e?k1�On�.'���G�'��'��w?�M�߳L�@��)�eI6-��a��1
                                     X=+j���<U�
                                               ��_�F�,��S(��r�B&8&58��xMI
KZ�s/|����1H�z��O>���3[;{++��G�p��
�Q�\s�ÈC|{���\U�V��0�HL�Vk?}Â�z��evI���B8F
�G%�0)޸"�zzZA(#nmǸ`8@�m���Έ�@�g�ǩ�$'�-�^gM6�P3�I�z��
>b�eN:I���
�d�r}s�~(dg%%[��4���Fh��t}:"Q�K��4���bꕖ$01-�S���ʴ=<��3fQ�f
                    ;˫+[;�s�]~K+��5��\��^z�������v�3�6�{�����y����B�Y��l��k����{���&`}�h�*�΄��T���ɢ'�r��S������D�x�B��¹N"��(t^�hR��ؖ��%0
                                                       �N
                                                         ��1�
��:6�Iy�� )�\�u��
                 ϧ�k���4G{�ؠ>:b
                               %Pb����*T�;i��)�G�9�1�yZ7	�i���I�z�,5�y�|+ˣܫ��D���` ,A]B�a^���6q7�-�/�L�XћE5D���1�Q�,�1%��E�gf/����Aq
                                                           ����
                                                               ��7�X�S^O�dr��Щ��<)T����=�����r��^��< &���_B蜁9D��q>� x�9E�G��^y��������.�����{/��2��d%]K@� �Ȍcp��`◾�%���w�7�7��)T�|9����*r��T�|�����Ɓ�"�s ��7j��,���r��Tc8���"��L�s���Ѥ%#�ld�&
                                                                               F��T�e�f�x�uh���#�l�YR^Uzh��-W=+��J�kJ1a�M߶_5��(Q[!J�
                                                    �FDH�)U'�<)�3����Ά��l�O���We�of�EyaG
        �ړ�A��~����yH�*��$~��O��[���S����0T4�%׭C�uMco��#2|�s&�+��%�<�Id��T�hDǗ0��2,�g�v��T
�|3�
����T$��5R���dl݉R`�.u�c�����18[�=�gD�{���v'C���6��$�@��-�B���Pe��H�fE#Cm�є�A[��蛧��7d%�W���G����V��r��T�=�^یX* Ҁ@C�Z�M��{�S%���P��g9RłH�^єڣ%����:�S^�zeZ��y�p����n`"�b��w��)>u�'UY9k2c�d
ʻ9wǏ���Z3��tN�(eQ�Zp��
�G�X���D��P�v���Ġ�Bbe�^�h�����[���n�D��{��b���쬈�����,�{�A�.���n���7�E�ү��:Z'����PK���O\�<7��,y#�>P:s[�3\w�^������,�*Sd:&(J�eP�����
                                                   k�S\������幼���
&O��iP4�j�PօpP�=x�
                  ��2x%9d��`�.Xg?���d�<F8����t4EjC�@�9��$"�j]B�X`wC��RƠ��|��A[�%�ƨ^� �Ka���bäc�Z=�S#@���ʘOR
                           &��#����t�����V���v��ki�W~q��;QY�`�̋� �['hU�b^d��>�P�;00�� .S��R�|�ah������
                     .�d=7�<} ����� B�	�U��k-
���o��/R`��������K������/�                    y����[~�x����4�E��R
          �`=��7�������������M��,ps�����"w�����繸��T~|�.lmo�|]'*�C��_
Y>i��V��_��)�:,	k�dH._2|:�("Ԝ�`���Z�A�F�ŭ[ϦU�M{SpO�Q�2�o?���.DB9
=,���S��Ǭ[wXt�J�y8t�J� �6n ��A                                  �ɧ-��R�F7sA�s
                              a��!9�*�#\uǈ��`B2�vǏl�d�vg��i�I6��W)0Gn !3�b䘷Q� *F'��()���%x¹�k��~�����*YC)���S^B��S��kl�gG
                                          �7���W�9f����ɑ�	���������I��$ �PYE�0���A,��Y^27��o�_)3�M�PF!X��鞊�;9����?�ͬ��㌧V����7��օ��g�]}������g����ko�������EV�����W����;��wq3)�"6Z�*����������
��3                                 Cn��2�b
   ����-`J�[��F��^�*Ne��g)N�?}��q@��_�Ie� �������IY�E`G&�,i.�!����/C��/.�p��a�Բ	����_w~�f6z��Z�)�h�W�2#D*�%rn�IG��-�
�O�n�D�L�q�3���|
�L�
PQ�"V.U�Oc����#AD�cv���k%�����A?�&����
J<������0��S�\���)�y
                    	m�
������YL,ba�Գ��%m7b'x�llH�"��y��@_��o�Q��^~���O��ο�ׯs���7��/�bc}�Y��Ջ, r����7�F>ߝeS��õo�f���5D2�{������}ت����E�Av���Ȍ��"W?�?$�R��<�T��s������r 
�)+��<�Pi3��PG,E�EE�,��`�˥'�m���@A�?1��mF*�S%�2
��e��Y!`��$��?y��l���2g6�̴Mb�T����fpC+R�7;*��0�2�0�T3�S�tx�5��� �Mza��(�K��}쳠@�*
.Y װ;��]������ׇ�������&_�$�l%d_
                              �N+օU�(k�\����<\���E`BJ3MQ
���Y^.7�7�޽��o|�;��.Gc��`��)H*��?|���]��:�����E�[LPtg;�?����L@I����
                                                            ��}�������-��z����,Z_۸q��õM�o%�����+�#�bI-f�xr8�S�DDU��,��By,7e��̷:��{6�>��D(^Φu:DT"�Y�����ٸg]*
v�RE(�2��q&}�0eP
                 ���I��;���h�
?��ѧ�lۭ�A��V�#t
Z��Oe��#M��k��x��<c,�D�"D �:�'�"Q��8��	�-���8ɜ&���נ"D�5��4ɗ�
P�|n�'u��-/������
B�<0�)Z�r�>k��� ��e�
               ����Nom�3� +U�k���EO��_eRVA�K^�9��b�(�:�3�z���^�NJ���H��|H�a����0���e����#03�t	���}�����k����?������+��ں����b{v�^�q�Y�D�h���\X����/Ǎ-t�[�n1�f	(�����jU�&v�
���y�(���<��}�8�LS�X�|�� KՀ���
                             LiW��ŏc#���^"X#߆�I�W��c��wI�HK:2�� �-�
                                                                   s
                                                                    �:�x�^�G�a����h���2���O��S�20��ƪ=��l�s]�7:O�*R��c(5_/�0T.����M:�<bn����D���`,H��%w&���=��c�̟*W�*B囌��,c��C+ɞ[�sy��<�r*b��T`�<���
F��'����,k�_��[_���D+�}��������˿�أ˨ymc���{
                                          ���dņ}����2�d�4�q����:��+����_����ri���<�
���C^�3�ᝏ��آp*���ِO]>���wfU��>FT�ӗ���Vrސ�V��c�ċJ�
                                                `EEd;�g����G���Ơ��ƅbt�6�v
                                                                         �%y��0�3��q
    H�����?�E{�Ӗ�y�*�����7k����2�͛wʹ2kD�"	J�A��h��� ��;��
G�mE��~�gp��
            8a�e�-�nJ�Zm�8I��T�Ps�7��:g�so�(8�����}�^{���^{��ge�,'<�!>�#p�6E%� )��j�R�sf4�o�
             ��Ji�KY���o��tQ[�U+��p���$,������no��t�m�q���	�lP�Q�:A>2��#5����$�����ķЭz2�����
                 0�I뎸����%���S*��iT��n�B]�Y�N���,�#��5f�%vvcW����>�����s_��W����3�M�A?bx�M�9���O�n�U�1�2!�=D�!������w�!��Eƥ���q ��A���|b(����bx�|2\)`U~�E
Fc��	$�M�)��zZ�����I�/�S�;)=5N��8J?[Y�;�a�:���R3t�9Wj�b+��G�����P`��-p(�r�ݩ|@�
 O����h�A�aT�(V���\N�	�t�a��t��AQ޼q��|�GQ`�@9'�а����c�����Ʌ�S'N.r;�����$g1�s�wbi	G9iq��'�/9�`V���#pқ�0k��S��C7�R(�
                                         �U��+!����P���A"A|��o2�6�c�C 'J�k�1[���JI��'3�(�;w���9=ma�w���G�G_���~��~�����!�{Ӭ��#ly�����M�ܐ�s����g�s�2c���\�r-I-`��
                                                                               ���5ʹ/��� r�*�0��a�)�î�;��Ʉ�Op d��� *k
                                     9��Wtȸ �Z�ƍ��vB�/l$y�%'t�N
��=~��[�B�Ü�T��P8"i��\D���

                          ��1ѣ�iZ@��c�!���K�&%~���:C�-�!����PM:�"@I���А�0�I�VY��'�@GH���B��aşe��J�C�:���(PD[gh�+Q����!�����k�Q+��jթ͵MNP��6i�hM�,܇+����X�F�2[O���n���[͚i���r�3�U�.�+�r�V��%��Vm�������ze�"H�u
                                           ���`\Hj� �̨@�~�ez�܏���QD��ae��Oe
                                                                          <j�"�ov��7q�ڊ�;��)�n�`�d����ȴ����SYg�7��3�_����?�?���������u�-3?\��ZUz�hIX��F����������Ys�gsz�o��/޼q}gcsaa��܈��p�S�}�<�)�Z�m$^����UV�K�М��G��
����6z&'�\j��Uj�������T��j��])?Ih���g!ɇ�óW
                                          �?
                                            .1n{�����6��K�W��(����%RE6yu��4�F`Z>D%o�A)e�z��Qu��V�f�i�F��������B�s��������D�0��n�5u͌-
                                                   ��=P!ynd{�I5H$�i����|�YZN�U$�)��΀�g�b�HY���3_U$%��5\=%D��%��	?��/�G��3˲RE�*���_x��B�STY��~���AF֠����A=�%� 9������}���œ(8z��]���A")��Xk�Q;�9�1�2'ڃ�co�41��Ժ)��Dab����I0��x΋V<h�$Z�:��3�U�� �3��<���(�_0಴�v�xa,B����/����L���ʈɌʫ֫��y����M�E;5��≅�|���Ϟa�#j_y�{�����7w�[qfv�_�Dsv�=�F��'���
          �Q����/\\YYe�������mJf!��tB�g�Oq@ɑ�ۆ������<�2�rx';�!0��q�%�?Y8W��r<�~�G���sHp`�9��Z�>9�G`9�g�3����1䁈#���N[
                                      -�~*(��٪�h��D������Y��Z�b�6��Ņ�E�K9JC�6���h�R����o�(=���쟲�鑨�`���P��J��F���-Ǫ��r)T=�L���_�7��a�x����l�އe��{.�MRn�(׌3�͓ڎ/	
                                                                               :MTn����w��ZZl���:����b��6Z>V����V��hXAMGq�o����r�q���A$ʥ"�L���G��&E��WQ�$�.�~T�Q��L��.� �T�2{���c:�*�8�'+gUq�
���f,.-���
          ���WpD�-/?�c��fk���Օe��s������{?��㶜�S��|�߀T�mz���.?s�R�����׮^e��o8+����c�����N�s$?�DL��� E���C)>�z�b�J-?\0?$J'G%HRR����?��nF����"��rP�+���}�#:$������?EI6�ۼt�]j	<�r! `,�9�y����J��p:.�����O��C&Qq:�[��
                                                     4;
                                                       Ni
                                                         |X
QUJ*��qIKN�1dU��<<�X<M�H!����׈(<3����@a����#z��+�@��tԎ:��rd	�^�Q)�//O��p�����&h�*��
$
���(��R��ʅ��jq�����A���W���Q=h
                              LTꀱT���V`M��z�+-�3I*#�-k��3o����?������o|�
�����{wل�����}�`9o��?�׍�]a�0Pa�6���7[�Ν=s��͛7�잚��k�o�/�Ol��}��k��Bc�r
Y�ua��/
       ˊ��$��i���S���!Z�� ��p�)�ͻI��`�%�
                                        &�*�A`��x�2

                                                   !�e����#�(�)��eY��U	�%%*�%5=��랄%e�e�L�~��k`Qb��>�ȓ6r
                         ��WkX�^Q�;�8�
                                      �Y^�
                                          E+HZLy��b��-���D��cx�qʥ���w�0I3ES��bJP4�ӷf~^�b��<�����bԂ�C,�f-���αv�2!u��M�����5e ��� �M�>hP�E�;D�S(\~������&UG�?��>p�+�]xx��¥�,�(�k��c~P|��=��g>��z����

                                  �����ܹ�&���^�����������\�x�5>����O�3Ljs$��?��vmu����������W����R���;2O�`��׻�};��0��O޳��Pլ�Ɵ��ZP�/zX��b��-1%y��� �BS^AQ@�������G��4sHp��F�W�Dm����)~��1B�1�1�&E�?�W�ٽw�Ҝ��u�7˔�%��?+c�$��J�bSvLH����F������b?�(iq��e4iK�[L��@��&��(b$P�w3�sT�Y.�KM
                                  >eQ��ӑ�&`��N���s@�F	C�'�ɜ$]�}ӕ��3���Ӂ�P&��<ԆE�Ι�qlcP�Jŉ`�g�/�����L��@�]�+ȱ�XL(J�
                            M���E�rI?F�,9���,���J�v{�������꫟��O]�p�=ݟ���~�7~��$�^,?x�o~��3���Zk�s2
                  �
�rTq���)           ��|��}��;���sϲ�M��k����#�<�nn.q�Z��ޞ��A߸�������
@�%?zP�V��>�()�3��x�Ky��2Ȭ�~�8�xt8�Cb	�|B�,_YK��_$E����� �Ӌ= t�$��¥
�E:�o)$� �IGI
w�sF1�&ʍ�Re���2a@a\�^]���J��y�A���x(.w��L4�/}���/��\<�E������LJ�s�R���҄i�9�iٝ-:֥I
                            u`n����?�
                                     �!�?Ta�R(�'��P��-l��UbtVN�V��&�z�<q�8c?��T������~��>��O�+_���|�����/~��g.r$����8�y8"B/\~��w�u��+�^��ٳ�3��o����7ߦ��w��������(їg]
    ��(%yU�6Q��XFy�G�������WB�7�ɹt4��?m�+E�P��VB�j�{�+��o��ҟpRq�˃:�ƔO�c�
                                                                        ��Z�4� �AR���g�Y
-�,݄T�rN���5�)t�'�@�t��sL4�������:9�
                                   ���l#b|Y�~��>?Li�.���=�F._�]�Mqd��.F߳�O5���uZ/�0���mw+����:˶������14�`ch:Z8�՜�ئ^E�QC5� �+�/�Vt�
                                                 Q"̈́��M �z���UW�C&�P8 ��mV�� +T@� Q�Y�(kBr����l:לj�?�E��Gͱ��Fi�h���J7�S��vw�۹{�����nӒݤb�w�����Ϲ#���()[����6��ȹA�Zcnf�Q����)Ҕ�ݿwƢ�yjT��vzK�m
\
 �<�eɇB��D���O06���Le>��u`�%�
                             W�{fyeUrH��
>��Cb	���Z�2�E�޳T�s,
                      )�ϪERV�h���t��9t�n�������T�h8�1�+�%)�I�$��%-�8�MF��GhM�^q����B+?�-�_e�]j5�I�P��6�=�T9N"E�-r�������#�I��F�y���S1�E3�����m��\h>Y�sWe,QmOk����S��N-a��_��()�.�:�d��4���Cg�Bd���.��S�a�㬧$��:�%]pd�n���!�Y�'*:��rl���|c�*e)[�՝��Lҙ�V���]�Q�Z���Szٽ�<�H,��Sڤv�X�(��gJ�肫T'��L�SHFKDg��^��������#��~���z�WN.-�7WN-.�Yn��������3OQNx����˯���"��K�N�|�Y�r獯���	\[]��?g���7��Zk�K�@����d@CV5S�)��j�P^�#�#��l�*;��LP��S��<)�����O'Lʥ{���)��!��)�* s�x��A��{�a�$9*Io�
                                                                   ����;<��m��j���	3��XPA8����x
���>�!�G;�Ta��m��%�Z�yŲ�Y֝�j����"���%A���R"j��
                                             Ӏ[,��^�rpV�Fv��} ���Z!g��A\ ��c\$ R�u�㡲
     ����2P�It��%if��bqfj�̻�n���S�,ow۳��G�v���V���XI}"�|�D_�c)m��p�l����Q^��ri�GZK��Ɏ8hR��)�ڰRE5��UqA�yc6��MqZ:$P0(�*�"P!@v�(l�Ϭ�4��KT�]�$4�I����}J�ƶY1g��b��*F�>��c�b/���p:/x�H\z�����~�e���}��֗ש��յ�d�Ӄ8%���3�v�$���X��P2���J���:ێ�4�Ɣf�C]s\��'
                                                                               >�5� ~�AAJ1J5��N4x
                 K�> 2D�lA�����@IDATb�T�ρ"I�r/�?��	O|DF��T[%��L
":;�CD�x�aF\��0��Ħ!��h$Ʈ��-���� ���A�,ؙ�";�%	�$�l�M���B1��0Ҽ�L[��LU���G�1�ϭ7�
                                                                               h#����L
      ֐:�]����|�5�崑�)	"b�(��&���>VW{s��6D���gҦ��~��sϝ�l�������Qbq@*OMTs8;m&x��ѱ�ڡj�$1�ئ�熩�;���ü��_��7^�h4��X��2��̬Xgaa	��;��d��x�2&П+`�-�)A듇S��,@��U��N^����f���x5��#wz�
���lu��f�������/�-ݼu���'?�ɧ�y��u�(9z���;�{,�y�w����B9�v�R�3<,D]o�2c�d�E�����*��:�G=F$0A
       !�yzIt�(�P��0y��Ȍ-�Zrw���x�V��(@���Dm
                                            ���0���Dk�F�/(�6X���u-&rer$W�p�&	�ؚ�
 S�J�e)G���k4¬@�Ui��ʭt�Ó�zs�:��bG��p
                                    (#��C7
�I	,[�{��x.��G_�W&6W�٬�n����>�#N�	a8�s�/ڀ[�v'��5̑�l-���{�c�����s1W��;�p��ׄ����%���yK�F$�����%���!�Ů5�I�G5�
