require('./static/normalize')
require('./static/reset')
require('./scss/h11.scss')


console.log('00000-------------');
import BScroll from 'better-scroll';
// // import LazyLoadImg from 'lazy-load-img';

document.ready = function () {
    $('.mask').fadeOut()
}

            /*
             * 滑动的是第0个子元素，其实和自己写的是一样的思路，或者说自己和别人是一样的思路
             * 
             */
            let wrap = document.querySelector(".wrap");
            let list = document.querySelector(".list");
            let tip = document.querySelector(".tip");

            let bScroll = new BScroll(wrap, {
                scrollY: true,
                pullUpLoad: {
                    threshold: 50
                },
                pullDownRefresh: {
                    threshold: 50,
                    stop: 50
                }
            });
            /*
             * pullingUp: 监听的应该是，元素滚动过程中，被滚动的那个元素的底边与父级外框底边的距离，如果达到某个值，就执行其回调函数；
             * finishPullUp: 这个类似控制一个开关，比如在触发pullingUp事件的时候，插件肯定会把一个开关给关掉，防止用户重复上拉
             *	在数据加载完成以后，需要执行finishPullUp()把开关打开，以便下次可以继续执行上拉刷新；
             * refresh：其实就是重新计算一下内容的高度和宽度，也许也会计算外框的高度和宽度，因为dom结构发生了变化了，所以宽高要从新计算
             * 以为整个插件基本上都是在计算一些距离差值，所以肯定需要从新计算的；
             * 
             * 虽然没看过源码，但是看过类似的iScroll的教程，自己也写过类似的插件，只不过自己写的插件没那么好用而已；
             */
            bScroll.on("pullingUp", function () {

                console.log('正在加载....');
                list.classList.add("pullUp");

                setTimeout(function () {
                    var inner = '';
                    for (var i = 0; i < 5; i++) {
                        inner += '<li>新增的' + i + '</li>';
                    }
                    list.innerHTML += inner;
                    this.finishPullUp();
                    this.refresh();
                    list.classList.remove("pullUp");
                    console.log('加载完成');
                }.bind(this), 1000);

            });
            /*
             * 下拉更新：
             * 	下拉更新的触发时机是用户手指抬起的时候触发的，在手指抬起的时候计算滚动元素上边距与父级元素上边距的距离是否大于了threshold，
             * 	如果大于的话就触发pullingDown的回调函数；
             * 	stop： 在下拉更新的时候，滚动元素停留在哪个位置，一般都是用来放置提示文字的，比如loading之类的
             * 	finishPullDown()后就会自动回到0的位置
             */
            bScroll.on("pullingDown", function () {
                console.log("下拉更新");
                list.classList.add("pullDown");
                tip.style.display = 'none';
                setTimeout(function () {
                    var inner = '';
                    for (var i = 0; i < 5; i++) {
                        inner += '<li>新增的' + i + '</li>';
                    }
                    list.innerHTML = inner + list.innerHTML;
                    this.finishPullDown();
                    this.refresh();
                    list.classList.remove("pullDown");
                    setTimeout(function () {
                        tip.style.display = 'block';
                    }, 100);
                    console.log("下拉更新结束");
                }.bind(this), 3000);
            });


// $('.btn_all').on('click', function () {
//     $('.downNav').fadeIn()
// })
// let wrapper = document.querySelector('.wrapper')
// let newScroll = new BScroll(wrapper, {
//     scrollY: true,
//     click: true,
//     // bounce: {
//     //     top: true,
//     //     bottom: true,
//     //     left: true,
//     //     right: true
//     // },
//     pullDownRefresh: {
//         threshold: 50,
//         stop: 20
//     },
//     pullUpLoad: {
//         threshold: 50
//     },
//     // mouseWheel: {
//     //     speed: 20,
//     //     invert: true,
//     //     easeTime: 300
//     // }
//     // startY:100,
// })
// newScroll.on('pullingUp',function(){
//     alert('refersh1')
//     newScroll.finishPullUp()
// })
// newScroll.on('pullingDown',function(){
//     alert('refersh')
//     // newScroll.finishPullDown()
//     console.log("下拉更新");
//     setTimeout(function(){
//         var inner = '';
//         for (var i=0; i<5; i++) {
//             inner += '<li>新增的'+ i +'</li>';
//         }
//         list.innerHTML = inner + list.innerHTML;
//         this.finishPullDown();
//         this.refresh();
//         list.classList.remove("pullDown");
//         setTimeout(function(){
//             tip.style.display = 'block';
//         },100);
//         console.log("下拉更新结束");
//     }.bind(this),3000);

// })

// newScroll.refresh();



// !(function () {
//     var ul = document.getElementById('list')
//     for (var i = 1; i <= 21; i++) {
//         var li = document.createElement('li')
//         li.innerHTML = `<img src="https://appybrencdn.oss-cn-hangzhou.aliyuncs.com/Wx/komolei/images/b69b782a44e0a90b4d48e27ae7297297-net-error.png" 
//         data-src="https://appybrencdn.oss-cn-hangzhou.aliyuncs.com/Wx/komolei/images/c725ebeefe2185dbecc308f1892c4939-circle3.png">`
//         ul.appendChild(li)
//     }
// })()
// var lazyLoadImg = new LazyLoadImg({
//     el: document.querySelector('#list'),
//     mode: 'default', //默认模式，将显示原图，diy模式，将自定义剪切，默认剪切居中部分
//     time: 300, // 设置一个检测时间间隔
//     done: true, //页面内所有数据图片加载完成后，是否自己销毁程序，true默认销毁，false不销毁
//     position: { // 只要其中一个位置符合条件，都会触发加载机制
//         top: 0, // 元素距离顶部
//         right: 0, // 元素距离右边
//         bottom: 0, // 元素距离下面
//         left: 0 // 元素距离左边
//     },
//     before: function () {

//     },
//     success: function (el) {
//         el.classList.add('success')
//     },
//     error: function (el) {
//         el.src = './image/privacy3.png'
//     }
// })

// lazyLoadImg.start() // 重新开启懒加载程序
// lazyLoadImg.destroy() // 销毁图片懒加载程序
