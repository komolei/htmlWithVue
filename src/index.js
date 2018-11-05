require('./static/normalize')
require('./static/reset')
require('./scss/h11.scss')

import PullToRefresh from './static/pulltorefresh';
console.log('00000-------------');
// // import LazyLoadImg from 'lazy-load-img';

document.ready = function () {
    setTimeout(() => {
        $('.mask').fadeOut()
    }, 1000);
}


/* global PullToRefresh */
PullToRefresh.init({
    mainElement: '#wrapper', // above which element?
    instructionsPullToRefresh: '加载中...',
    onRefresh: function (cb) {
        setTimeout(function () {
            cb();
            // alert('refresh');
        }, 1500);
    },

});
//获取滚动条当前的位置 
function getScrollTop() {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}

//获取当前可视范围的高度 
function getClientHeight() {
    var clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
    } else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
    }
    return clientHeight;
}

//获取文档完整的高度 
function getScrollHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}
window.onscroll = function () {
    if (getScrollTop() + getClientHeight() == getScrollHeight()) {
        console.log('xxxxxxxxxx----')
        $('.svg_ct').removeClass('hide')
        $('.wrapper>.content').append(`<li>xxx</li>`)
    } else {
        // $('.svg_ct').addClass('hide');
    }
}
//ajax从这里开始