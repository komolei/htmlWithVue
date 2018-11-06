require('./static/normalize')
require('./static/reset')
require('./scss/h11.scss')
// import apiPost from './static/noncestamp';
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
    mainElement: '#wrapper0', // above which element?
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
//#endregion
var reqUrl = "http://apptest.ybren.com/index.php/";
//
var $_GET = (function () {
    var url = window.document.location.href.toString();
    var u = url.split("?");
    if (typeof (u[1]) == "string") {
        u = u[1].split("&");
        var get = {};
        for (var i in u) {
            var j = u[i].split("=");
            get[j[0]] = j[1];
        }
        return get;
    } else {
        return {};
    }
})();
var LoginToken = $_GET['LoginToken']
console.log('token 222is', LoginToken);

// apiPost(reqUrl + "/H5Eleven2018/Eleven2018List", {
//     "LoginToken": LoginToken,
//     "Count": 20,
//     "Position": 1,
//     "type": 1,
//     "filter": 1,
// }, function (data) {
//     data={"Status":1,"ErrorMsg":"","Data":[{"S_LJXFJE":"53351","G_QBYE":"27386.12","S_ZJYCXF":"Oct 20 2018 10:06:28:690AM","XCLXSJ":null,"G_BZ":"","G_SFLX":null,"CZTZ":"","S_LJXFCS":"40","G_HDYE":"1144.12","ROW":"1"}]}
//     console.log('ddd', data)
//     // var str=data.
//     if (data.Status) {
//         var str = data.Data.map(item => {
//             return `<li>
//                             <div class="title">
//                                 <div class="left">${item.G_XM ? item.G_XM : ''}</div>
//                                 <div class="right">
//                                     <span onclick="handlerContact()">${item.G_SFLX ? item.G_SFLX : ''}</span>
//                                     <div class="img_ct">
//                                         <img class="img_all" src="https://appybrencdn.oss-cn-hangzhou.aliyuncs.com/Wx/komolei/images/icon_hdbjzt%402x.png">
//                                     </div>
//                                 </div>

//                             </div>
//                             <div class="content_c">
//                                 <div class="left">
//                                     <p>
//                                         <span class="text_1">
//                                             现金余额：
//                                         </span>
//                                         <span class="text_2">
//                                             ${item.G_QBYE ? item.G_QBYE : 0}元
//                                         </span>
//                                     </p>
//                                     <p>
//                                         <span class="text_1">
//                                             活动余额：
//                                         </span>
//                                         <span class="text_2">
//                                             ${item.G_HDYE ? item.G_HDYE : 0}元
//                                         </span>
//                                     </p>
//                                     <p>
//                                         <span class="text_1">
//                                             累计消费金额：
//                                         </span>
//                                         <span class="text_2">
//                                                 ${item.S_LJXFJE ? item.S_LJXFJE : 0}元
//                                         </span>
//                                     </p>
//                                     <p>
//                                         <span class="text_1">
//                                             备注：
//                                         </span>
//                                         <span class="text_2">
//                                                 ${item.G_BZ ? item.G_BZ : ''}

//                                         </span>
//                                     </p>
//                                     <div class="btns">
//                                         <div class="btn_history">历史订单</div>
//                                         <div class="record" onclick="handlerPayRecord()">充值记录</div>
//                                     </div>
//                                 </div>
//                                 <div class="right">
//                                     <p>
//                                         <span class="text_1">
//                                                 购买频次：
//                                         </span>
//                                         <span class="text_2">
//                                                 ${item.S_LJXFCS ? item.S_LJXFCS : ''}次

//                                         </span>
//                                     </p>
//                                     <p>
//                                         <span class="text_1">
//                                                 最近消费时间：
//                                         </span>
//                                         <span class="text_2">
//                                                 ${item.S_ZJYCXF ? item.S_ZJYCXF : ''}
//                                         </span>
//                                     </p>
//                                 </div>
//                             </div>
//                         </li>`
//         })
//     }
//     console.log('str is', str);
// }, false);