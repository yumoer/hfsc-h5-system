/**
 * Created by zfl273 on 2018/6/10.
 */
/**
 * Created by zfl273 on 2018/5/30.
 */

//获取任意一个父元素的第一个子级元素,兼容各个浏览器
/*
* element:父级元素
* return:第一个子元素
* */
function getFirstChildElement(element){
    if(element.firstElementChild){
        return element.firstElementChild;
    }else{
        var node = element.firstChild;
        while(node && node.nodeType!=1){
            node = node.nextSibling;
        }
        return node;
    }

}
//获取任意一个父元素的最后一个子级元素,兼容各个浏览器
/*
* element:父级元素
* return:最后一个子元素
* */
function getLastChildElement(element){
    if(element.lastElementChild){
        return element.lastElementChild;
    }else{
        var node = element.lastChild;
        while(node && node.nodeType!=1){
            node = node.previousSibling;
        }
        return node;
    }

}
/**
 * 获取某个元素的前一个兄弟元素
 * @param element 某个元素
 * @returns {*} 前一个兄弟元素
 */
function getPreviousElement(element) {
    if (element.previousElementSibling) {
        return element.previousElementSibling
    } else {
        var node = element.previousSibling;
        while (node && node.nodeType != 1) {
            node = node.previousSibling;
        }
        return node;
    }
}
/**
 * 获取某个元素的后一个兄弟元素
 * @param element 某个元素
 * @returns {*} 后一个兄弟元素
 */
function getNextElement(element) {
    if (element.nextElementSibling) {
        return element.nextElementSibling
    } else {
        var node = element.nextSibling;
        while (node && node.nodeType != 1) {
            node = node.nextSibling;
        }
        return node;
    }
}
/**
 * 获取某个元素的所有兄弟元素
 * @param element 某个元素
 * @returns {Array} 兄弟元素
 */
function getSiblings(element) {
    if (!element)return;
    var elements = [];
    var ele = element.previousSibling;
    while (ele) {
        if (ele.nodeType === 1) {
            elements.push(ele);
        }
        ele = ele.previousSibling;
    }
    ele = element.nextSibling;
    while (ele) {
        if (ele.nodeType === 1) {
            elements.push(ele);

        }
        ele = ele.nextSibling;
    }
    return elements;
}

/*根据.,#,id获取元素
*
*
*
* */
function getId(id){
    // if (id.startsWith('#')){
    //     return document.querySelector(id)
    // }else{
    //     return document.getElementById(id)
    // }
    return document.getElementById(id) || document.querySelector(id)
}
function getClass(el){
    "use strict";
    return document.querySelector(el);
}
function getAllClass(el){
    "use strict";
    return document.querySelectorAll(el);
}
/*IE、Safari、Opera和Chrome支持innerText属性。Firefox虽然不支持innerText，但支持作用类似的textContent属性。
textContent是DOM3级规定的一个属性，而且也得到了safari、opera和Chrome的支持。
为了确保跨浏览器兼容，有必要想下面这样通过函数来检测可以使用哪个属性：
*
* */
function getInnerText(element){
    return element.innerText||element.textContent;
}
function setInnerText(el,text){
    "use strict";
    if(typeof el.innerText){
        el.innerText = text
    }else{
        el.textContent = text
    }
}

// 事件处理函数兼容写法
function addEventListener(el,type,fn){
    "use strict";
    if(el.addEventListener){
        el.addEventListener(type,fn,false);
    }else if(el.attachEvent){
        el.attachEvent('on'+type,fn);
    }else{
        el['on'+type] = fn;
    }
}
//解绑事件函数
function removeEventListener(el,type,fn){
    "use strict";
    if(el.removeEventListener){
        el.removeEventListener(type,fn,false);
    }else if(el.detachEvent){
        el.detachEvent('on'+type,fn)
    }else{
        el['on'+type] = null;
    }
}

/**
 * 返回当前浏览器是什么类型的浏览器
 */
function userBrowser(){
    var browserName=navigator.userAgent.toLowerCase();
    if(/msie/i.test(browserName) && !/opera/.test(browserName)){
        console.log("IE");
    }else if(/firefox/i.test(browserName)){
        console.log("Firefox");
    }else if(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)){
        console.log("Chrome");
    }else if(/opera/i.test(browserName)){
        console.log("Opera");
    }else if(/webkit/i.test(browserName) &&!(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName))){
        console.log("Safari");
    }else{
        console.log("不知道什么鬼!");
    }
}

/*
* a.click = function(e){
*   e = e||window.event
*   e.stopPropagation()||e.cancelBubble = true
*
* }
*
* */

// url查询字符串--->对象
function getQueryStringArg(){
    var qs = (location.search.length>0? location.search.substring(1):''),
        args = {}, //保存数据
        items = qs.length ? qs.split("&") : [], //切割
        item = null,
        name = null,
        value = null,
        i = 0,
        len = items.length;
    for(i=0;i<len;i++){
        item = items[i].split('=');
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if(name.length){
            args[name] = value;
        }
    }
    return args;
}

//事件处理函数--->兼容DOM2 DOM1 IE
var EventUtil = {
    // 添加事件函数
    addHandler:function(element,type,handler){
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent('on'+type,handler);
        }else{
            element['on'+type] = handler;
        }
    },
    // 获取event对象
    getEvent:function(event){
        return event ? event:window.event;
        // return event||window.event;
    },
    //获取目标对象
    getTarget:function(event){
        return event.target || event.srcElement;
    },
    //阻止默认事件
    preventDefault:function(event){
        if(event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    },
    // 阻止事件冒泡
    stopPropagation:function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble = true;
        }
    },
    //删除事件函数
    removeHandler:function(element,type,handler){
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.detachEvent){
            element.detachEvent('on'+type,handler);
        }else{
            element['on'+type] = null;
        }
    }
};