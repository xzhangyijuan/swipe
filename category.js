/**
 * Created by Administrator on 2017/1/16.
 */
window.onload=function(){
    /*1.获取dom元素*/
    var jd_left=document.querySelector(".jd_cLeft");
    var jdLeftHeight=jd_left.offsetHeight;
    /*2.获取滑动的菜单项*/
    var ulBox=jd_left.querySelector("ul");
    var ulBoxHeight=ulBox.offsetHeight;
    /*获取所有li标签*/
    var lis=ulBox.querySelectorAll("li");

    /*定义区间范围*/
    var maxY=0;//静止状态下的最大Y坐标值
    var maxBounceY=maxY+100;//弹簧状态下的最大Y坐标值
    var minY=jdLeftHeight-ulBoxHeight; //静止状态下的最小Y坐标值
    var minBounceY=minY-100;//弹簧状态下的最小Y坐标值

    /*一些封装*/
    var opentransiton=function(){
        ulBox.style.transition="transform .2s";
        ulBox.style.webkitTransition="transform .2s";
    }
    var closetransiton=function(){
        ulBox.style.transition="none";
        ulBox.style.webkitTransition="none";
    }
    var setTransform=function(distanceY){
        ulBox.style.transform="translateY("+distanceY+"px)";
        ulBox.style.webkitTransform="translateY("+distanceY+"px)";
    }

    /*3.实现滑动*/
    var startY=0;
    var moveY=0;
    var distanceY=0;
    /*创建变量来记录当前已经偏移的距离*/
    var currentY=0;
    ulBox.addEventListener("touchstart",function(e){
        startY= e.touches[0].clientY;
    });
    ulBox.addEventListener("touchmove",function(e){
        moveY= e.touches[0].clientY;
        distanceY=moveY-startY;
        console.log("currentY+distanceY:"+(currentY+distanceY));
        /*判断如果超出指定的最大的弹簧区间，则当前滑动操作不执行*/
        if(currentY+distanceY > maxBounceY || currentY+distanceY < minBounceY){
            console.log('超出Y坐标值区间');
            return;
        }
        /*清除过渡*/
        closetransiton();
        /*设置偏移*/
        setTransform(currentY+distanceY);
    });
    ulBox.addEventListener("touchend",function(e){
        console.log("touchend");
        /*判断当前滑动的距离*/
        if(currentY+distanceY > maxY){
            /*重置位置到静止状态下最大的Y坐标值*/
            currentY=maxY;
            /*回到指定的位置*/
            opentransiton();
            setTransform(maxY);
        }
        else if(currentY+distanceY < minY){
            /*重置位置到静止状态下最小的Y坐标值*/
            currentY=minY;
            /*回到指定的位置*/
            opentransiton();
            setTransform(minY);
        }
        else{
            /*累计之前已经滑动的距离*/
            currentY+=distanceY;
        }
        console.log("currentY:---:"+currentY);
    });

    /*在移动端，添加事件可以为父元素来添加，通过e.target值来获取到当前响应事件的子元素*/
    for(var i=0;i<lis.length;i++){
        /*可以为每一个li标签添加索引值*/
        //lis[i].setAttribute("index",i);
        lis[i].index=i;
    }
    itcast.tap(ulBox,function(e){
        /*清除所有li标签的active样式*/
        for(var i=0;i<lis.length;i++){
            lis[i].classList.remove("active");
        }
        var li=e.target.parentNode;
        /*获取li标签的高度*/
        var liHeight=li.offsetHeight;
        /*为当前被点击的li标签添加active样式*/
        li.classList.add("active");
        /*设置偏移*/
        var index= e.target.parentNode.index;
        console.log("e.target.parentNode.index:"+index);
        /*判断当前需要偏移的距离是否超出指定的区间范围*/
        if(-index*liHeight < minY){
            currentY=minY;
            opentransiton();
            setTransform(minY);
            return false;
        }
        else{
            currentY=-index*liHeight;
            /*开启过渡*/
            opentransiton();
            /*设置偏移*/
            setTransform(-index*liHeight);
        }
    });
}