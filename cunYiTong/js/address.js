/**
 * Created by Administrator on 2017/2/22.
 */
$(function () {
    var index;
    $(".city>li").click(function () {
        $('.outbox>div').eq(index).css({marginBottom: 0});
        var county = '<li class="cityCenter">'
            + '<ul class="county">' +
            '<li class="san"></li>' +
            '<li class="sanBie"></li>' +
            '<li><a href="javascript:void(0)">十里县</a></li>' +
            '<li><a href="javascript:void(0)">十里县</a></li>' +
            '<li><a href="javascript:void(0);">十里县</a></li>' +
            '</ul></li>';

        var first = $(this).parent().children().first();
        var last = $(this).parent().children().last();
        $(".pro").find(".active").removeClass();
        $(this).addClass("active");
        $(this).parents('.pro').siblings().find(".city>li").css('margin-bottom', '0');

        if ($(".cityCenter").length > 0) {
            $(".cityCenter").remove();
        }
        //添加二级县城
        first.after(county);
        var height = $(".cityCenter").innerHeight();
        //二级点击事件
        if ($(this).offset().top == first.offset().top) {
            oLi($(this), height, true);
        } else {
            $(".cityCenter").css('top', '75px');
            oLi($(this), height, false);
        }
        var sFirst = '';
        var sLast = '';
        $(".county>li").click(function () {

            var town = '<li class="countyCenter">'
                + '<ul class="town">' +
                '<li class="san1"></li>' +
                '<li><a href="javascript:void(0)">新乡</a></li>' +
                '<li><a href="javascript:void(0)">新乡</a></li>' +
                '</ul></li>';

            sFirst = $(this).parent().children().eq(2);
            sLast = $(this).parent().children().last();
            index = $(this).parents('.pro').index();
            $(this).parent().find(".active").removeClass();
            $(this).parents(".pro").css('margin-bottom', 0);
            $(this).addClass("active");

            if ($(".countyCenter").length > 0) {
                $(".countyCenter").remove();
            }

            sFirst.after(town);
            var sHeight = $(".countyCenter").innerHeight();
            //三级点击事件

            if (sFirst.offset().top == sLast.offset.top) {
                sFirst.offset().top = sLast.offset().top;
            }
            if ($(this).offset().top == sFirst.offset().top) {
                oLi($(this), sHeight, 2);
            } else if ($(this).offset().top == sLast.offset().top) {
                $(".countyCenter").css('top', '110px');
                oLi($(this), sHeight, 0)
            } else {
                $(".countyCenter").css('top', '75px');
                oLi($(this), sHeight, 1);
            }

            $(this).parents(".pro").css('margin-bottom', $(this).parents(".cityCenter").height() - 25);

            $(".town>li").click(function () {
                $(this).parent().find(".active").removeClass();
                $(this).addClass("active");
            })
        });

        function oLi(val, height, bol) {
            if (val.parent().is(".county")) {
                var sli = val.parent().children().not('.countyCenter');
                $(".san1").css('left', val.offset().left - sFirst.offset().left + 15);

                if (bol == 2) {
                    for (var i = 0; i < sli.length; i++) {
                        sli.eq(i).css('margin-bottom', 0);
                        if (sli.eq(i).offset().top == sFirst.offset().top) {
                            sli.eq(i).css('margin-bottom', height + 10);
                        }
                    }
                } else if (bol == 0) {
                    for (var i = 0; i < sli.length; i++) {
                        sli.eq(i).css('margin-bottom', 0);
                        if (sli.eq(i).offset().top == sLast.offset().top) {
                            sli.eq(i).css('margin-bottom', height);
                        }
                    }
                } else {
                    for (var i = 0; i < sli.length; i++) {
                        sli.eq(i).css('margin-bottom', 0);
                        if (sli.eq(i).offset().top != sFirst.offset().top && sli.eq(i).offset().top != sLast.offset().top) {
                            sli.eq(i).css('margin-bottom', height);
                        }
                    }
                }
            } else {
                var li = val.parent().children().not('.cityCenter');
                $(".san").css('left', val.offset().left - first.offset().left + 15);
                $(".sanBie").css('left', val.offset().left - first.offset().left + 15);
                if (bol) {
                    for (var i = 0; i < li.length; i++) {
                        li.eq(i).css('margin-bottom', 0);
                        if (li.eq(i).offset().top == first.offset().top) {
                            li.eq(i).css('margin-bottom', height + 10);
                        }
                    }
                } else {
                    for (var i = 0; i < li.length; i++) {
                        li.eq(i).css('margin-bottom', 0);
                        if (li.eq(i).offset().top == last.offset().top) {
                            console.log(last.offset().top);
                            li.eq(i).css('margin-bottom', height);
                        }
                    }
                }
            }
        }
    })
})
