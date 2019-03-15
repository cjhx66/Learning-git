/**
 * Created by Administrator on 2016/9/19.
 * ����ʽ�ı�
 * ��
 * ��
 * ͸��
 * ��λ�е�left,right,top.bottom
 * ���֣��߿�
 * ����ͬʱ�ı������ԣ�Ҳ��������ʽ����һ����һ���ĸı䡣
 * ����ʱ��getMove(��ǩid,{�����б�json��ʽ����}����ʽ����)
 * ����getMove(dv1,{width:300,height:600},function(){getMove(dv1,{"opacity":100})})
 */
//��ȡ��ʽ
function getStyle(o, attr) {
    if (o.currentStyle) {
        return o.currentStyle[attr];
    } else {
        return window.getComputedStyle(o, null)[attr];
    }
}
//    �������˶�
function getMove(obj, json, fn) {
    clearInterval(obj.timer);
    var speed = 0;
    var curr = 0;
    obj.timer = setInterval(function () {
        var flag = true;//��������Ч����ʵ���ˣ���flag=true
        //Ӧ���ǵ�����Ч����ʵ�ֺ󣬲�����ʱ��
        //json��Ҫ�ڶ�ʱ���������
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