/**
 * Created by Administrator on 2017/2/17.
 */
$(function(){
    $(".header-nav").on("click","li", function () {
        $(this).addClass('active').siblings().removeClass('active');
    })
})