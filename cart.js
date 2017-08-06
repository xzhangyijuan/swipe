/**
 * Created by Administrator on 2017/1/16.
 */
window.onload=function(){
    var jd_win=document.querySelector(".jd_win");
    var jd_win_box=jd_win.querySelector(".jd_win_box")

    /*获取垃圾桶元素*/
    var f_rights=document.querySelectorAll(".f_right");
    /*添加事件 不能直接传入数组*/
    for(var i=0;i<f_rights.length;i++){
        itcast.tap(f_rights[i],function(e){
            jd_win.style.display="block";
            jd_win_box.classList.add("bounceInDown");

            /*让垃圾桶盖子打开*/
            /*获取盖子*/
            var up=e.target.parentNode.querySelector(".up");
            //console.log(e.target.parentNode.querySelector(".up"));
            /*添加过渡*/
            up.style.transition="transform .2s";
            up.style.webkitTransition="transform .2s";
            /*设置transform中的旋转*/
            up.style.transform="rotate(-30deg)";
            up.style.webkitTransform="rotate(-30deg)";
            /*设置旋转轴心*/
            up.style.transformOrigin="left top";
        });
    }
}