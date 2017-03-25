/**
 * Created by PTR- on 2017/3/25.
 */
window.onload=function(){
    //获取元素
    function $(id){ return document.getElementById(id);}
    var js_slider=$("js_slider");//获得最大的盒子
    var slider_main_block=$("slider_main_block");//图片的父亲
    var imgs=slider_main_block.children;//获得所有的图片组
    var slider_ctr1=$("slider_ctr1");//获得控制的 父盒子

    //操作元素
    //自动生成小span
    for (var i=0; i<imgs.length;i++) {
        var span=document.createElement("span");
        span.innerHTML=imgs.length-i;
        span.className="slider-ctr1-con";
        slider_ctr1.insertBefore(span,slider_ctr1.children[1]);
    }

    var spans=slider_ctr1.children;
    //alert(spans.length);
    spans[1].setAttribute("class","slider-ctr1-con current");//换类名

    var scrollWidth=js_slider.clientWidth;//得到大盒子的宽度  也就是 后面动画走的距离
    //刚开始 第一张图片显示   其余的在右边
    for (var i=1;i<imgs.length;i++)
    {
        imgs[i].style.left= scrollWidth+"px";
    }

    var iNow=0;
   //遍历三个按钮
    // spans是8个按钮  他们都是span   所以可以用for  in 语句
    for (var k in spans ) {
        spans[k].onclick=function(){
            //alert(this.innerHTML);
            if (this.className=="slider-ctr1-prev")
            {
                //alert("您点击了左侧按钮");
                animate(imgs[iNow],{left:scrollWidth});
                --iNow<0 ? iNow=imgs.length-1 : iNow;
                imgs[iNow].style.left=-scrollWidth+"px";
                animate(imgs[iNow],{left: 0});
                setSquare ()//调用setSquare函数

            }
             else if (this.className=="slider-ctr1-next")
            {
                autoplay ();
            }
            else
            {
                //alert("您点击了小span");
                var that = this.innerHTML-1;
                if (that > iNow) {
                    //做法等同于 点击右侧按钮
                    animate(imgs[iNow],{left:-scrollWidth});//当前的这张慢慢的走出去  左侧
                    imgs[that].style.left= scrollWidth +"px";//点击的那个索引好  快速走到右侧 3
                    //animate(imgs[that],{left:0});
                }
                else if ( that < iNow) {
                    //等同于点击 左侧按钮
                    animate(imgs[iNow],{left: scrollWidth});
                    imgs[that].style.left= -scrollWidth+ "px";
                    //animate(imgs[that],{left:0});
                }
                iNow = that;//给当前的索引号
                animate(imgs[iNow],{left :0});
                setSquare ()//调用setSquare函数
            }
        }
    }

    //一个可以控制 播发 span 的函数   需要用到    当前iNow
    function  setSquare (){
        //首先清除所有的span current  留下满足需要的那一个
        for ( var i=1; i<spans.length-1; i++) { // 一共9个span  我们要1——8
            spans[i].className="slider-ctr1-con";
        }
        spans[iNow+1].className= "slider-ctr1-con current";
    }

    // 开启定时器， 实际上开启定时器等同于按时点击右侧按钮；即有
    var timer= null;
    timer=setInterval(autoplay,2000);//开启定时器
    function autoplay (){
        // alert("您点击了右侧按钮");
        animate(imgs[iNow],{left: -scrollWidth});//当前的那张图片慢慢走到-scrollidth的位置
        //变成1 先++ ++iNow  先自加 后  运算
        ++iNow > imgs.length-1 ? iNow=0 :iNow;
        imgs[iNow].style.left=scrollWidth+"px";//立马执行，快速走到右侧
        animate(imgs[iNow],{left: 0});
        setSquare ()//调用setSquare函数
    }
   //鼠标经过关闭定时器
    js_slider.onmouseover=function(){
        clearInterval(timer);
    }
    //鼠标移开开启定时器
    js_slider.onmouseout=function(){
        clearInterval(timer);//要执行定时器  先清除定时器
        timer=setInterval(autoplay,2000);//开启定时器
    }



}


