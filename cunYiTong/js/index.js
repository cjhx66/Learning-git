function load() {
    var carousel = document.getElementById("carousel");
    var tu = document.getElementById("tu");
    var left = document.getElementById("left");
    var right = document.getElementById("right");
    var oImg = carousel.getElementsByTagName("img");
    var yuan = carousel.getElementsByTagName("span");

    //pre next
    var page = document.getElementById("page");
    page.style.width = carousel.offsetWidth + window.screen.width * 0.1 + "px";

    var img = document.createElement("img");
    img.src = "img/1.jpg";
    tu.appendChild(img);

    var oImgW = 0;
    for (var i = 0; i < oImg.length; i++) {
        oImgW = oImg[i].width = carousel.offsetWidth;
    }
    tu.style.width = (oImgW) * (oImg.length) + "px";
    function move(index) {
        for (var i = 0; i < oImg.length; i++) {
            oImg[i].index = i;
            oImg[i].style.left = 0;
        }
//        设置圆点
        for (var j = 0; j < yuan.length; j++) {
            yuan[j].style.background = "white";
            yuan[j].style.width = "6px";
        }
        getMove(tu, {left: -(oImg[0].offsetWidth * index)});
        if (index == 4) {
            yuan[3].style.background = "#00B38C";
            yuan[3].style.width = "12px";
        } else {
            yuan[index].style.background = "#00d38c";
            yuan[index].style.width = "12px";
        }
    }

    move(0);
    var num = 1;

    function jiSu() {
        if (num == oImg.length) {
            num = 0;
            tu.style.left = 0;
        }
        move(num);
        num++;
    }

    var time = setInterval(jiSu, 2000);
    left.onclick = function () {
        clearInterval(time);
        num--;
        if (num == -1) {
            num = oImg.length - 2;
            tu.style.left = -(oImg.length - 1) * oImg[0].offsetWidth + "px";
        }
        move(num);
        time = setInterval('jiSu', 2000);
    };
    right.onclick = function () {
        clearInterval(time);
        jiSu();
        time = setInterval('jiSu', 2000);
    };
    for (var j = 0; j < yuan.length; j++) {
        yuan[j].onmouseover = function (event) {
            clearInterval(time);
//            获取对应原点的自定义属性
            num = event.target.dataset.index;
            move(num);
            time = setInterval('jiSu', 2000);
        }
    }
    tu.onmousemove = function () {
        clearInterval(time);
    }
    tu.onmouseout = function () {
        time = setInterval(jiSu, 2000);
    }

    //省略号
    var artel = document.getElementsByClassName("artel-left-right-content");
    var index = 0;
    for (var j = 0; j < artel.length; j++) {
        index = artel[j];
        $clamp(index, {clamp: 3, useNativeClamp: false});
    }
}