/**
 * Created by Administrator on 2017/1/13.
 */
window.onload=function(){
    banner();
}

function banner(){
    /*一.实现自动轮播*/
    /*1.获取banner*/
    var banner=document.querySelector(".jd_banner");
    /*2.获取banner的宽度*/
    var bannerWidth=banner.offsetWidth;
    /*3.获取用于轮播的ul*/
    var imgBox=banner.querySelector("ul:first-of-type");
    /*4.获取点标记*/
    var indicators=banner.querySelector("ul:last-of-type").querySelectorAll("li");
    /*5.创建图片索引:已经有了默认的一个宽度的偏移*/
    var index=1;
    
    /*6.添加时钟*/
    var timerId=setInterval(function(){
        /*6.1索引自增*/
        index++;
        /*6.2设置过渡效果*/
        imgBox.style.transition="transform .2s";
        imgBox.style.webkitTransition="transform .2s";
        /*6.3偏移*/
        imgBox.style.transform="translateX("+(-index*bannerWidth)+"px)";
        imgBox.style.webkitTransform="translateX("+(-index*bannerWidth)+"px)";


        /*意味着下面的操作就是过渡结束之后需要执行的操作*/
        /*判断索引  setTimeout的目的是先完成之前的过渡操作*/
        /*setTimeout(function(){
            if(index==9){
                /!*之前添加的过渡效果如果没有清除，那么在下次设置某个样式的时候还会拥有之前添加的过渡效果*!/
                index=1;
                imgBox.style.transition="none";
                imgBox.style.webkitTransition="none";
                /!*6.3偏移*!/
                imgBox.style.transform="translateX("+(-index*bannerWidth)+"px)";
                imgBox.style.webkitTransform="translateX("+(-index*bannerWidth)+"px)";
            }
        },200);*/
    },2000);


    /*二.实现滑动-手动轮播*/
    var startX=0;
    var moveX=0;
    var distanceX=0;
    /*7.为imgBox添加滑动事件*/
    imgBox.addEventListener("touchstart",function(e){
        /*清除时钟*/
        clearInterval(timerId);
        /*获取手指起始x坐标*/
        startX= e.touches[0].clientX;
    });
    imgBox.addEventListener("touchmove",function(e){
        /*获取手指滑动过程中x坐标*/
        moveX= e.touches[0].clientX;
        /*计算本次滑动的x差异值*/
        distanceX=moveX-startX;
        console.log(distanceX);
        /*清除过渡*/
        imgBox.style.transition="none";
        imgBox.style.webkitTransition="none";
        /*设置偏移*/
        imgBox.style.transform="translateX("+(-index*bannerWidth+distanceX)+"px)";
        imgBox.style.webkitTransform="translateX("+(-index*bannerWidth+distanceX)+"px)";

    });
    imgBox.addEventListener("touchend",function(e){
        /*判断当前滑动的距离是否超出了1/3 ---翻页*/
        if(Math.abs(distanceX )> bannerWidth/3){
            /*上一页*/
            if(distanceX>0){
                index--;
            }
            else if(distanceX <0){
                index++;
            }
            imgBox.style.transition="transform .2s";
            imgBox.style.webkitTransition="transform .2s";
            /*6.3偏移*/
            imgBox.style.transform="translateX("+(-index*bannerWidth)+"px)";
            imgBox.style.webkitTransform="translateX("+(-index*bannerWidth)+"px)";
        }
        else if(Math.abs(distanceX ) > 0){
            imgBox.style.transition="transform .2s";
            imgBox.style.webkitTransition="transform .2s";
            /*6.3偏移*/
            imgBox.style.transform="translateX("+(-index*bannerWidth)+"px)";
            imgBox.style.webkitTransform="translateX("+(-index*bannerWidth)+"px)";
        }
        /*重新开启时钟*/
       setTimeout(function(){
           timerId=setInterval(function(){
               /*6.1索引自增*/
               index++;
               /*6.2设置过渡效果*/
               imgBox.style.transition="transform .2s";
               imgBox.style.webkitTransition="transform .2s";
               /*6.3偏移*/
               imgBox.style.transform="translateX("+(-index*bannerWidth)+"px)";
               imgBox.style.webkitTransform="translateX("+(-index*bannerWidth)+"px)";
           },2000);
       },200);
    });


    /*添加过渡效果结束的监听*/
    imgBox.addEventListener("webkitTransitionEnd",function(){
        if(index==9){
            /*之前添加的过渡效果如果没有清除，那么在下次设置某个样式的时候还会拥有之前添加的过渡效果*/
            index=1;
            imgBox.style.transition="none";
            imgBox.style.webkitTransition="none";
            /*6.3偏移*/
            imgBox.style.transform="translateX("+(-index*bannerWidth)+"px)";
            imgBox.style.webkitTransform="translateX("+(-index*bannerWidth)+"px)";
        }
        else if(index==0){
            index=8;
            imgBox.style.transition="none";
            imgBox.style.webkitTransition="none";
            /*6.3偏移*/
            imgBox.style.transform="translateX("+(-index*bannerWidth)+"px)";
            imgBox.style.webkitTransform="translateX("+(-index*bannerWidth)+"px)";
        }
    });
    imgBox.addEventListener("transitionEnd",function(){
        if(index==9){
            /*之前添加的过渡效果如果没有清除，那么在下次设置某个样式的时候还会拥有之前添加的过渡效果*/
            index=1;
            imgBox.style.transition="none";
            imgBox.style.webkitTransition="none";
            /*6.3偏移*/
            imgBox.style.transform="translateX("+(-index*bannerWidth)+"px)";
            imgBox.style.webkitTransform="translateX("+(-index*bannerWidth)+"px)";
        }
        else if(index==0){
            index=8;
            imgBox.style.transition="none";
            imgBox.style.webkitTransition="none";
            /*6.3偏移*/
            imgBox.style.transform="translateX("+(-index*bannerWidth)+"px)";
            imgBox.style.webkitTransform="translateX("+(-index*bannerWidth)+"px)";
        }
    });
}