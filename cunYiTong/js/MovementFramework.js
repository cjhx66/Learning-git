/**
 * Created by Administrator on 2016/9/19.
 * 缓冲式改变
 * 宽
 * 高
 * 透明
 * 定位中的left,right,top.bottom
 * 文字，边框
 * 可以同时改变多个属性，也可以用链式法，一个接一个的改变。
 * 引用时：getMove(标签id,{属性列表，json格式数据}，链式函数)
 * 例：getMove(dv1,{width:300,height:600},function(){getMove(dv1,{"opacity":100})})
 */
//获取样式
function getStyle(o, attr) {
    if (o.currentStyle) {
        return o.currentStyle[attr];
    } else {
        return window.getComputedStyle(o, null)[attr];
    }
}
//    多物体运动
function getMove(obj, json, fn) {
    clearInterval(obj.timer);
    var speed = 0;
    var curr = 0;
    obj.timer = setInterval(function () {
        var flag = true;//假设所有效果都实现了，给flag=true
        //应该是等所有效果都实现后，才清理定时器
        //json需要在定时器里面解析
        for (var attr in json) {
            if (attr == "opacity") {
                curr = Math.round(parseFloat(getStyle(obj, "opacity")) * 100);
            } else {
                curr = parseInt(getStyle(obj, attr));
            }
            speed = (json[attr] - curr) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (json[attr] != curr) {
                flag = false;
            }
            if (attr == "opacity") {
                curr += speed;
                obj.style.opacity = curr / 100;
                obj.style.filter = "alpha(opacity=" + curr + ")";
            } else {
                obj.style[attr] = curr + speed + "px";
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, 30)
}