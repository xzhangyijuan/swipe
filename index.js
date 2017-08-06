/**
 * Created by Administrator on 2017/1/13.
 */
window.onload=function(){
    /*使用严格模式*/
    "use strict";
    /*var age=20;
    console.log("age:"+age);*/
    banner();
    header();
    timeBack();
}

function header(){
    var banner=document.querySelector(".jd_banner");
    var bannerHeight=banner.offsetHeight;
    var header=document.querySelector(".jd_header");
    window.onscroll=function(){
        /*获取当面页面滚出屏幕之后的距离*/
        var top=document.body.scrollTop;
        var opacity=0;
        if(top < bannerHeight){
            opacity=top/bannerHeight;
        }
        else{
            opacity=1;
        }
        header.style.background="rgba(233,35,34,"+opacity+")";
    }
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

    /*开启过渡*/
    var openTransition=function(){
        imgBox.style.transition="transform .2s";
        imgBox.style.webkitTransition="transform .2s";
    }
    /*关闭过渡*/
    var closeTransition=function(){
        imgBox.style.transition="none";
        imgBox.style.webkitTransition="none";
    }
    /*设置偏移*/
    var setTransform=function(distanceX){
        imgBox.style.transform="translateX("+distanceX+"px)";
        imgBox.style.webkitTransform="translateX("+distanceX+"px)";
    }
    /*开启定时器*/
    var timerId;
    var openTimer=function(){
        timerId=setInterval(function(){
            /*6.1索引自增*/
            index++;
            /*6.2设置过渡效果*/
            openTransition();
            /*6.3偏移*/
            setTransform(-index*bannerWidth);

            console.log("setInterval"+index);
        },2000);
    }
    /*设置标记样式*/
    /*index:当前需要添加样式的li标签索引*/
    var setIndicator=function(index){
        console.log(index);
        /*清除所有li标签的样式*/
        for(var i=0;i<indicators.length;i++){
            indicators[i].classList.remove('active');
        }
        /*为当前li标签添加样式*/
        indicators[index-1].classList.add('active');
    }

    /*6.添加时钟*/
    openTimer();


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
        /*如果发现索引越界，那么不执行当前的滑动操作*/
        if(!index>=9  && !index<=0){
            /*清除过渡*/
            closeTransition();
            /*设置偏移*/
            setTransform(-index*bannerWidth+distanceX);

        }
    });
    imgBox.addEventListener("touchend",function(e){
        /*判断当前滑动的距离是否超出了1/3 ---翻页*/
        if(Math.abs(distanceX )> bannerWidth/6){
            /*上一页*/
            if(distanceX>0){
                index--;
            }
            else if(distanceX <0){
                index++;
            }
            openTransition();
            /*6.3偏移*/
            setTransform(-index*bannerWidth);
        }
        else if(Math.abs(distanceX ) > 0){
            openTransition();
            /*6.3偏移*/
            setTransform(-index*bannerWidth);
        }
        /*再次清除时钟，保障在任何一个时间点只有一个时钟*/
        clearInterval(timerId);
        /*重新开启时钟*/
        setTimeout(function(){
           openTimer();
        },200);
    });


    /*监听过渡结束之后的操作*/
    var tend=function(){
        /*作用：可能会越界，但是越界后又会重新回到正确的位置*/
        if(index>=9){
            console.log("addTransitionEnd"+index);
            /*之前添加的过渡效果如果没有清除，那么在下次设置某个样式的时候还会拥有之前添加的过渡效果*/
            index=1;
            closeTransition();
            /*6.3偏移*/
            setTransform(-index*bannerWidth);
        }
        else if(index<=0){
            index=8;
            closeTransition();
            /*6.3偏移*/
            setTransform(-index*bannerWidth);
        }
        /*点标记*/
        setIndicator(index);
    }
    /*添加过渡效果结束的监听*/
    itcast.addTransitionEnd(imgBox,tend);
   /* imgBox.addEventListener("webkitTransitionEnd",function(){
        tend();
    });
    imgBox.addEventListener("transitionEnd",function(){
        tend();
    });
    imgBox.addEventListener("oTransitionEnd",function(){
        tend();
    });
    imgBox.addEventListener("msTransitionEnd",function(){
        tend();
    });
    imgBox.addEventListener("mozTransitionEnd",function(){
        tend();
    });*/

    /*添加window的onresize事件:就是当屏幕大小改变的时候，需要重置bannerWidth值*/
    window.addEventListener("resize",function(){
        bannerWidth=banner.offsetWidth;
    })

    window.addEventListener("blur",function(){
        clearInterval(timerId);
    })
    window.addEventListener("focus",function(){
        openTimer();
    })
}

function timeBack(){
    /*获取所有span*/
    var spans=document.querySelector(".jd_sk_time").querySelectorAll("span");
    /*总时长*/
    var total=5;
    /*开启定时器*/
    var timerId=setInterval(function(){
        total--;
        if(total<0){
            clearInterval(timerId);
            return;
        }
        /*数学问题开始：获取时分秒*/
        var hour=Math.floor(total/3600);
        //hour=hour<10?"0"+hour:hour;
        var minute=Math.floor(total%3600/60); //3700-3600=100/60=1
        //minute=minute<10?"0"+minute:minute;
        var second=Math.floor(total%60);
        //second=second<10?"0"+second:second;
        /*赋值*/
        spans[0].innerHTML=Math.floor(hour/10);
        spans[1].innerHTML=Math.floor(hour%10);

        spans[3].innerHTML=Math.floor(minute/10);
        spans[4].innerHTML=Math.floor(minute%10);

        spans[6].innerHTML=Math.floor(second/10);
        spans[7].innerHTML=Math.floor(second%10);
    },1000);
}