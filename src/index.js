// require('./static/normalize')
// require('./static/reset')
// require('./scss/h11.scss')
require('./scss/home.scss')
// require('./scss/design.scss')
// import $ from 'jquery';
// import apiPost from './static/noncestamp';
// import PullToRefresh from './static/pulltorefresh';
console.log('00000-------------');
// // import LazyLoadImg from 'lazy-load-img';

// require('./js/h11');

// http://localhost:4000/?LoginToken=8Aw5ylMJqdhMFrY
/* global PullToRefresh */
// PullToRefresh.init({
//     mainElement: '#wrapper0', // above which element?
//     instructionsPullToRefresh: '加载中...',
//     onRefresh: function (cb) {
//         setTimeout(function () {
//             cb();
//             // alert('refresh');
//         }, 1500);
//     },

// });

 
// var ModalHelper = (function (bodyCls) {
//     var scrollTop;
//     return {
//         afterOpen: function () {
//             scrollTop = document.scrollingElement.scrollTop;
//             $('.ct').addClass(bodyCls);
//             $('.ct').css('top', -scrollTop)
//             // document.body.style.top = -scrollTop + 'px';
//         },
//         beforeClose: function () {
//             // document.body.classList.remove(bodyCls);
//             $('.ct').removeClass(bodyCls)
//             document.scrollingElement.scrollTop = scrollTop;
//         }
//     };
// })('modal-open')

// // window.onerror = function (message) {
// //     $('#app').append('<li>' + message + '</li>')
// // }

// var reqUrl;
// (function () {
//     var url = window.document.location.href.toString();
//     // if (url.indexOf('localhost') != -1) {
//     if (/localhost/g.test(url)) {
//         // return reqUrl = "https://apptest.ybren.com/index.php/";
//         return reqUrl = "http://test.ybren.com/index.php/";

//     }
//     else {
//         // if (url.indexOf('test') != -1) {
//         if (/test/g.test(url)) {
//             return reqUrl = "https://apptest.ybren.com/index.php/";
//         } else {
//             return reqUrl = "https://app.ybren.com/index.php/";
//         }
//     }

// })()
// var $_GET = (function () {
//     var url = window.document.location.href.toString();
//     var u = url.split("?");
//     if (typeof (u[1]) == "string") {
//         u = u[1].split("&");
//         var get = {};
//         for (var i in u) {
//             var j = u[i].split("=");
//             get[j[0]] = j[1];
//         }
//         return get;
//     } else {
//         return {};
//     }
// })();
// var LoginToken = $_GET['LoginToken']
// var g_type = 1,
//     g_filter = 1,
//     g_count = 520, g_position = 1;
// var g_isLock = false;
// var g_userId;
// // btn click event

// function sureSearch() {
//     apiPost(reqUrl + "/H5Eleven2018/Eleven2018List", {
//         "LoginToken": LoginToken,
//         "Count": g_count,
//         "Position": g_position,
//         "type": g_type,
//         "filter": g_filter,
//         "keywords": $('input[name="search_text"]').val(),
//     }, function (data) {
//         if (data.Status) {
//             if (data.Data.length > 0) {
//                 var str = [];
//                 for (var i = 0; i < data.Data.length; i++) {
//                     var item = data.Data[i];
//                     var stri = '<li><div class="title">' + '<div class="left">' + item.G_XM + '-' + item.G_XB + '-' + item.G_SJHM +
//                         '</div>' +
//                         '<div class="right">' +
//                         '<button>' + item.G_SFLX + '</button>' +
//                         '<div>' + item.XCLXSJ + '</div>' +
//                         '<div class="img_ct" onclick="getEditInfo(' + item.G_GKBH + ')">' +
//                         '<img class="img_all" src="https://appybrencdn.oss-cn-hangzhou.aliyuncs.com/Wx/komolei/images/icon_hdbjzt%402x.png">' +
//                         '</div>' +
//                         '</div>' +
//                         '</div>' +
//                         '<div class="content_c">' +
//                         '<div class="left">' +
//                         '<p>' +
//                         '<span class="text_1">' +
//                         '现金余额：' +
//                         '</span>' +
//                         '<span class="text_2">' +
//                         item.G_QBYE + '元' +
//                         '</span>' +
//                         '</p>' +
//                         '<p>' +
//                         '<span class="text_1">' +
//                         '活动余额：' +
//                         '</span>' +
//                         '<span class="text_2">' +
//                         item.G_HDYE + '元' +
//                         '</span>' +
//                         '</p>' +
//                         '<p>' +
//                         '<span class="text_1">' +
//                         '累计消费金额：' +
//                         '</span>' +
//                         '<span class="text_2">' +
//                         item.S_LJXFJE + '元' +
//                         '</span>' +
//                         '</p>' +
//                         '<p>' +
//                         '<span class="text_1">' +
//                         '备注：' +
//                         '</span>' +
//                         '<span class="text_2">' +
//                         item.G_BZ +
//                         '</span>' +
//                         '</p>' +
//                         '<div class="btns">' +
//                         '<div class="btn_history" onclick="handlerHistoryOrder(' + JSON.stringify(item).replace(/"/g, '&quot;') + ')">历史订单</div>' +
//                         '<div class="record" onclick="handlerPayRecord(' + item.G_GKBH + ')">充值记录</div>' +
//                         '</div>' +
//                         '</div>' +
//                         '<div class="right">' +
//                         '<p>' +
//                         '<span class="text_1">' +
//                         '购买频次：' +
//                         '</span>' +
//                         '<span class="text_2">' +
//                         item.S_LJXFCS + '次' +
//                         '</span>' +
//                         '</p>' +
//                         '<p>' +
//                         '<span class="text_1">' +
//                         '最近消费时间：' +
//                         '</span>' +
//                         '<span class="text_2">' +
//                         item.S_ZJYCXF +
//                         '</span>' +
//                         '</p>' +
//                         '</div>' +
//                         '</div>' + '</li>'
//                     str.push(stri);
//                     item = null;
//                     stri = null;

//                 }

//                 $('.wrapper' + (g_type - 1) + ' > .content').html(str.join(''));
//             } else {
//                 $('.wrapper' + (g_type - 1) + ' > .content').html('');
//                 jqueryAlert({
//                     'content': '暂无数据...',
//                     'closeTime': 1500
//                 })
//                 g_isLock = true;
//             }
//         } else {
//             jqueryAlert({
//                 'content': data['ErrorMsg'],
//                 'closeTime': 2000
//             })
//         }
//     }, false);

// }
// function tabSelect(ct, className) {
//     $(ct).on('click', function (e) {
//         if (e.target && e.target.tagName.toLocaleLowerCase() == 'div') {
//             $.each($(ct + '>div'), function (index, el) {
//                 $(this).removeClass(className)
//             })
//         }
//         e.target.classList.add(className)
//         var index = $(ct + '>div').index(e.target);
//         g_type = index;
//         if (g_position > 1) { g_position = 1 }
//         $.each($('.wrapper_ct>div'), function () {
//             $(this).fadeOut()
//         })
//         $('.wrapper' + index).fadeIn()
//         g_isLock = false;
//         handlerTab(g_count, g_position, index + 1, $('.downNav>li').index($('.select_li')) + 1)
//     })
// }

// tabSelect('.sel_command', 'show_border')

// function getPayRecord(UserId) {
//     apiPost(reqUrl + "/H5Eleven2018/getRechargeList", {
//         "LoginToken": LoginToken,
//         "userId": UserId,
//     }, function (data) {
//         // var str=data
//         if (data.Status) {
//             if (data.Data.length > 0) {
//                 var str = [];
//                 for (var i = 0; i < data.Data.length; i++) {
//                     var item = data.Data[i]
//                     var newStr = '<tr>' +
//                         '<td>' + item.CJSJ + '</td>' +
//                         '<td>' + item.JE + '</td>' +
//                         '</tr>'
//                     str.push(newStr)
//                     item = null;
//                     newStr = null;
//                 }
//                 var newStr = '<tr>' +
//                     '<th>充值时间</th>' +
//                     '<th>充值金额（元）</th>' +
//                     '</tr>'
//                 str.unshift(newStr)
//                 $('.pay_record .middle tbody').html(str.join(''));
//             } else {
//                 var str = '<tr>' +
//                     '<th>充值时间</th>' +
//                     '<th>充值金额（元）</th>' +
//                     '</tr>' + '<tr>' +
//                     '<td></td>' +
//                     '<td></td>' +
//                     '</tr>'
//                 // $('.pay_record_ct').html(str);
//                 $('.pay_record .middle tbody').html(str);

//             }

//         } else {
//             jqueryAlert({
//                 'content': data['ErrorMsg'],
//                 'closeTime': 1000
//             })
//         }
//     }, false);
// }

// function handlerTab(Count, Position, type, filter) {
//     g_count = Count;
//     g_position = Position;
//     g_type = type;
//     apiPost(reqUrl + "/H5Eleven2018/Eleven2018List", {
//         "LoginToken": LoginToken,
//         "Count": Count,
//         "Position": Position,
//         "type": type,
//         "filter": filter,
//         "keywords": $('input[name="search_text"]').val(),

//     }, function (data) {
//         if (data.Status) {
//             if (g_position > 1) {
//                 if (data.Data.length > 0) {
//                     var str = [];
//                     for (var i = 0; i < data.Data.length; i++) {
//                         var item = data.Data[i];
//                         var stri = '<li><div class="title">' + '<div class="left">' + item.G_XM + '-' + item.G_XB + '-' + item.G_SJHM +
//                             '</div>' +
//                             '<div class="right">' +
//                             '<button>' + item.G_SFLX + '</button>' +
//                             '<div>' + item.XCLXSJ + '</div>' +
//                             '<div class="img_ct" onclick="getEditInfo(' + item.G_GKBH + ')">' +
//                             '<img class="img_all" src="https://appybrencdn.oss-cn-hangzhou.aliyuncs.com/Wx/komolei/images/icon_hdbjzt%402x.png">' +
//                             '</div>' +
//                             '</div>' +
//                             '</div>' +
//                             '<div class="content_c">' +
//                             '<div class="left">' +
//                             '<p>' +
//                             '<span class="text_1">' +
//                             '现金余额：' +
//                             '</span>' +
//                             '<span class="text_2">' +
//                             item.G_QBYE + '元' +
//                             '</span>' +
//                             '</p>' +
//                             '<p>' +
//                             '<span class="text_1">' +
//                             '活动余额：' +
//                             '</span>' +
//                             '<span class="text_2">' +
//                             item.G_HDYE + '元' +
//                             '</span>' +
//                             '</p>' +
//                             '<p>' +
//                             '<span class="text_1">' +
//                             '累计消费金额：' +
//                             '</span>' +
//                             '<span class="text_2">' +
//                             item.S_LJXFJE + '元' +
//                             '</span>' +
//                             '</p>' +
//                             '<p>' +
//                             '<span class="text_1">' +
//                             '备注：' +
//                             '</span>' +
//                             '<span class="text_2">' +
//                             item.G_BZ +
//                             '</span>' +
//                             '</p>' +
//                             '<div class="btns">' +
//                             '<div class="btn_history" onclick="handlerHistoryOrder(' + JSON.stringify(item).replace(/"/g, '&quot;') + ')">历史订单</div>' +
//                             '<div class="record" onclick="handlerPayRecord(' + item.G_GKBH + ')">充值记录</div>' +
//                             '</div>' +
//                             '</div>' +
//                             '<div class="right">' +
//                             '<p>' +
//                             '<span class="text_1">' +
//                             '购买频次：' +
//                             '</span>' +
//                             '<span class="text_2">' +
//                             item.S_LJXFCS + '次' +
//                             '</span>' +
//                             '</p>' +
//                             '<p>' +
//                             '<span class="text_1">' +
//                             '最近消费时间：' +
//                             '</span>' +
//                             '<span class="text_2">' +
//                             item.S_ZJYCXF +
//                             '</span>' +
//                             '</p>' +
//                             '</div>' +
//                             '</div>' + '</li>'
//                         str.push(stri);
//                         item = null;
//                         stri = null;

//                     }



//                     $('.wrapper' + (g_type - 1) + ' > .content').append(str.join(''));
//                 } else {
//                     // $('.wrapper' + (g_type - 1) + ' > .content').append('<div style="text-align:center">暂无数据...</div>');
//                     jqueryAlert({
//                         'content': '暂无数据...',
//                         'closeTime': 1500
//                     })
//                     g_isLock = true;
//                     g_position=1;
//                 }
                
//             } else {
//                 if (data.Data.length > 0) {
//                     var str = [];
//                     for (var i = 0; i < data.Data.length; i++) {
//                         var item = data.Data[i];
//                         var stri = '<li><div class="title">' + '<div class="left">' + item.G_XM + '-' + item.G_XB + '-' + item.G_SJHM +
//                             '</div>' +
//                             '<div class="right">' +
//                             '<button>' + item.G_SFLX + '</button>' +
//                             '<div>' + item.XCLXSJ + '</div>' +
//                             '<div class="img_ct" onclick="getEditInfo(' + item.G_GKBH + ')">' +
//                             '<img class="img_all" src="https://appybrencdn.oss-cn-hangzhou.aliyuncs.com/Wx/komolei/images/icon_hdbjzt%402x.png">' +
//                             '</div>' +
//                             '</div>' +
//                             '</div>' +
//                             '<div class="content_c">' +
//                             '<div class="left">' +
//                             '<p>' +
//                             '<span class="text_1">' +
//                             '现金余额：' +
//                             '</span>' +
//                             '<span class="text_2">' +
//                             item.G_QBYE + '元' +
//                             '</span>' +
//                             '</p>' +
//                             '<p>' +
//                             '<span class="text_1">' +
//                             '活动余额：' +
//                             '</span>' +
//                             '<span class="text_2">' +
//                             item.G_HDYE + '元' +
//                             '</span>' +
//                             '</p>' +
//                             '<p>' +
//                             '<span class="text_1">' +
//                             '累计消费金额：' +
//                             '</span>' +
//                             '<span class="text_2">' +
//                             item.S_LJXFJE + '元' +
//                             '</span>' +
//                             '</p>' +
//                             '<p>' +
//                             '<span class="text_1">' +
//                             '备注：' +
//                             '</span>' +
//                             '<span class="text_2">' +
//                             item.G_BZ +
//                             '</span>' +
//                             '</p>' +
//                             '<div class="btns">' +
//                             '<div class="btn_history" onclick="handlerHistoryOrder(' + JSON.stringify(item).replace(/"/g, '&quot;') + ')">历史订单</div>' +
//                             '<div class="record" onclick="handlerPayRecord(' + item.G_GKBH + ')">充值记录</div>' +
//                             '</div>' +
//                             '</div>' +
//                             '<div class="right">' +
//                             '<p>' +
//                             '<span class="text_1">' +
//                             '购买频次：' +
//                             '</span>' +
//                             '<span class="text_2">' +
//                             item.S_LJXFCS + '次' +
//                             '</span>' +
//                             '</p>' +
//                             '<p>' +
//                             '<span class="text_1">' +
//                             '最近消费时间：' +
//                             '</span>' +
//                             '<span class="text_2">' +
//                             item.S_ZJYCXF +
//                             '</span>' +
//                             '</p>' +
//                             '</div>' +
//                             '</div>' + '</li>'
//                         str.push(stri);
//                         item = null;
//                         stri = null;

//                     }



//                     $('.wrapper' + (g_type - 1) + ' > .content').html(str.join(''));
//                 } else {
//                     // $('.wrapper' + (g_type - 1) + ' > .content').append('<div style="text-align:center">暂无数据...</div>');
//                     jqueryAlert({
//                         'content': '暂无数据...',
//                         'closeTime': 1000
//                     })
//                     g_isLock = true;
//                 }
//             }
//         } else {
//             jqueryAlert({
//                 'content': data['ErrorMsg'],
//                 'closeTime': 2000
//             })
//         }
//     }, false);
// }

// // document ready invoke 
// handlerTab(520, 1, 1, 1)

// function handlerHistoryOrder(item) {
//     var userName = item.G_XM, gender = item.G_XB, cellPhone = item.G_SJHM, userId = item.G_GKBH;
//     var str = 'VC=YBRHistoryOrderViewController&userName=' + userName + '&gender=' + gender + '&cellPhone=' + cellPhone + '&userId=' + userId;
//     var newStr = encodeURI(str)
//     showHtmlcallNative(888, newStr, 888);
// }

// function handlerTabofEditInfo(Count, Position, type, filter) {
//     g_count = Count;
//     g_position = Position;
//     g_type = type;
//     // if (g_isLock) return;
//     apiPost(reqUrl + "/H5Eleven2018/Eleven2018List", {
//         "LoginToken": LoginToken,
//         "Count": Count,
//         "Position": Position,
//         "type": type,
//         "filter": filter,
//         "keywords": $('input[name="search_text"]').val(),

//     }, function (data) {
//         if (data.Status) {
//             if (data.Data.length > 0) {
//                 var str = [];
//                 for (var i = 0; i < data.Data.length; i++) {
//                     var item = data.Data[i];
//                     var stri = '<li><div class="title">' + '<div class="left">' + item.G_XM + '-' + item.G_XB + '-' + item.G_SJHM +
//                         '</div>' +
//                         '<div class="right">' +
//                         '<button>' + item.G_SFLX + '</button>' +
//                         '<div>' + item.XCLXSJ + '</div>' +
//                         '<div class="img_ct" onclick="getEditInfo(' + item.G_GKBH + ')">' +
//                         '<img class="img_all" src="https://appybrencdn.oss-cn-hangzhou.aliyuncs.com/Wx/komolei/images/icon_hdbjzt%402x.png">' +
//                         '</div>' +
//                         '</div>' +
//                         '</div>' +
//                         '<div class="content_c">' +
//                         '<div class="left">' +
//                         '<p>' +
//                         '<span class="text_1">' +
//                         '现金余额：' +
//                         '</span>' +
//                         '<span class="text_2">' +
//                         item.G_QBYE + '元' +
//                         '</span>' +
//                         '</p>' +
//                         '<p>' +
//                         '<span class="text_1">' +
//                         '活动余额：' +
//                         '</span>' +
//                         '<span class="text_2">' +
//                         item.G_HDYE + '元' +
//                         '</span>' +
//                         '</p>' +
//                         '<p>' +
//                         '<span class="text_1">' +
//                         '累计消费金额：' +
//                         '</span>' +
//                         '<span class="text_2">' +
//                         item.S_LJXFJE + '元' +
//                         '</span>' +
//                         '</p>' +
//                         '<p>' +
//                         '<span class="text_1">' +
//                         '备注：' +
//                         '</span>' +
//                         '<span class="text_2">' +
//                         item.G_BZ +
//                         '</span>' +
//                         '</p>' +
//                         '<div class="btns">' +
//                         '<div class="btn_history" onclick="handlerHistoryOrder(' + JSON.stringify(item).replace(/"/g, '&quot;') + ')">历史订单</div>' +
//                         '<div class="record" onclick="handlerPayRecord(' + item.G_GKBH + ')">充值记录</div>' +
//                         '</div>' +
//                         '</div>' +
//                         '<div class="right">' +
//                         '<p>' +
//                         '<span class="text_1">' +
//                         '购买频次：' +
//                         '</span>' +
//                         '<span class="text_2">' +
//                         item.S_LJXFCS + '次' +
//                         '</span>' +
//                         '</p>' +
//                         '<p>' +
//                         '<span class="text_1">' +
//                         '最近消费时间：' +
//                         '</span>' +
//                         '<span class="text_2">' +
//                         item.S_ZJYCXF +
//                         '</span>' +
//                         '</p>' +
//                         '</div>' +
//                         '</div>' + '</li>'
//                     str.push(stri);
//                     item = null;
//                     stri = null;

//                 }



//                 $('.wrapper' + (g_type - 1) + ' > .content').html(str.join(''));
//             } else {
//                 $('.wrapper' + (g_type - 1) + ' > .content').html('');
//                 g_isLock = true;

//                 // $('.wrapper' + (g_type - 1) + ' > .content').append('<div style="text-align:center">暂无数据...</div>');
//                 // jqueryAlert({
//                 //     'content': '暂无数据...',
//                 //     'closeTime': 1000
//                 // })
//             }

//         } else {
//             jqueryAlert({
//                 'content': data['ErrorMsg'],
//                 'closeTime': 1000
//             })
//         }
//     }, false);
// }

// // userId
// function editInfo(UserId) {
//     var status = $('input[name="custom_status"]').index($('input[name="custom_status"]:checked'))
//     var time = status == 1 ? $('.time.show_time').text() : ''
//     apiPost(reqUrl + "/H5Eleven2018/editInfo", {
//         "LoginToken": LoginToken,
//         "userId": UserId,
//         'status': status + 1,
//         'contactDate': time,
//         'remark': $('.remark_input input').val()
//     }, function (data) {
//         // var str=data
//         if (data.Status) {
//             jqueryAlert({
//                 'content': '编辑成功',
//                 'closeTime': 1000
//             })
//             g_isLock = false;
//             handlerTabofEditInfo(g_count, 1, g_type, g_filter)
//         } else {
//             jqueryAlert({
//                 'content': data['ErrorMsg'],
//                 'closeTime': 1000
//             })
//         }
//         // $('.custom_ct').fadeToggle()

//         handlerContact_closed()

//     }, false);
// }

// function getEditInfo(UserId) {
//     g_userId = UserId;
//     apiPost(reqUrl + "/H5Eleven2018/getEditInfo", {
//         "LoginToken": LoginToken,
//         "userId": UserId,
//     }, function (data) {
//         // var str=data
//         if (data.Status) {
//             if (JSON.stringify(data.Data) != '{}') {
//                 var newData = data.Data;
//                 var index = newData.G_SFLX == null ? 0 : Number(newData.G_SFLX) - 1
//                 $('input[name="custom_status"]').eq(index).attr("checked", "checked");
//                 if (newData.G_SFLX != null && Number(newData.G_SFLX) == 2) {
//                     $('.select_time').fadeIn()
//                     $.each($('.time_box div'), function (index, el) {
//                         $(el).removeClass('show_time')
//                         if ($(el).text() == newData.XCLXSJ) {
//                             $('.time_box div').eq(index).addClass('show_time')
//                         }
//                     })
//                 } else {
//                     $('.select_time').hide()
//                 }
//                 $('.remark_input input').val(newData.G_BZ);
//                 $('.remark>span').text(newData.G_BZ.length.toString())
//                 handlerContact()

//             } else {
//                 handlerContact()
//             }
//             // jqueryAlert({
//             //     'content': '编辑成功',
//             //     'closeTime': 1000
//             // })
//         } else {
//             jqueryAlert({
//                 'content': data['ErrorMsg'],
//                 'closeTime': 1000
//             })
//         }

//     }, false);
// }

// function handlerInput() {
//     var length = $(this).val().length;
//     if (length >= 20) {
//         $(this).val($(this).val().substr(0, 20))
//     }
//     $('.remark>span').text(length.toString())
// }
// $('.remark_input input').on('input', handlerInput)

// function sureEditInfo() {
//     editInfo(g_userId)
// }

// $('.top>.btn_all').on('click', function (e) {
//     e.stopPropagation()
//     // $('.down_ct').fadeIn()
//     $('.down_ct').toggle()
//     $('.triangle').fadeIn();
//     $('.down_ct').fadeIn();

// })

// $('#app').on('click', function (e) {
//     if (e.target && e.target.className.toLocaleLowerCase() != 'btn_all' && e.target.className.toLocaleLowerCase() !=
//         'down_ct' && e.target.tagName.toLocaleLowerCase() != 'li' && $('.down_ct').css('display') ==
//         'block') {
//         $('.down_ct').fadeOut();
//     }
// })

// // $('.down_ct').on('touchend', function (e) {
// //     e.stopPropagation()
// //     $(this).fadeOut();
// // })

// function singleSelect(ct, className) {
//     $(ct).on('click', function (e) {
//         if (e.target && e.target.tagName.toLocaleLowerCase() == 'div') {
//             $.each($(ct + '>div'), function (index, el) {
//                 $(this).removeClass(className)
//             })
//         }
//         e.target.classList.add(className)
//     })
// }
// singleSelect('.time_box', "show_time")

// // downnav 
// function handlerTabOfDownNav(Count, Position, type, filter) {
//     g_count = Count;
//     g_position = Position;
//     g_type = type;
//     // if (g_isLock) return
//     apiPost(reqUrl + "/H5Eleven2018/Eleven2018List", {
//         "LoginToken": LoginToken,
//         "Count": Count,
//         "Position": Position,
//         "type": type,
//         "filter": filter,
//         "keywords": $('input[name="search_text"]').val(),

//     }, function (data) {
//         // var str=data
//         if (data.Status) {
//             if (g_position > 1) {
//                 if (data.Data.length > 0) {
//                     var str = [];
//                     for (var i = 0; i < data.Data.length; i++) {
//                         var item = data.Data[i];
//                         var stri = '<li><div class="title">' + '<div class="left">' + item.G_XM + '-' + item.G_XB + '-' + item.G_SJHM +
//                             '</div>' +
//                             '<div class="right">' +
//                             '<button>' + item.G_SFLX + '</button>' +
//                             '<div>' + item.XCLXSJ + '</div>' +
//                             '<div class="img_ct" onclick="getEditInfo(' + item.G_GKBH + ')">' +
//                             '<img class="img_all" src="https://appybrencdn.oss-cn-hangzhou.aliyuncs.com/Wx/komolei/images/icon_hdbjzt%402x.png">' +
//                             '</div>' +
//                             '</div>' +
//                             '</div>' +
//                             '<div class="content_c">' +
//                             '<div class="left">' +
//                             '<p>' +
//                             '<span class="text_1">' +
//                             '现金余额：' +
//                             '</span>' +
//                             '<span class="text_2">' +
//                             item.G_QBYE + '元' +
//                             '</span>' +
//                             '</p>' +
//                             '<p>' +
//                             '<span class="text_1">' +
//                             '活动余额：' +
//                             '</span>' +
//                             '<span class="text_2">' +
//                             item.G_HDYE + '元' +
//                             '</span>' +
//                             '</p>' +
//                             '<p>' +
//                             '<span class="text_1">' +
//                             '累计消费金额：' +
//                             '</span>' +
//                             '<span class="text_2">' +
//                             item.S_LJXFJE + '元' +
//                             '</span>' +
//                             '</p>' +
//                             '<p>' +
//                             '<span class="text_1">' +
//                             '备注：' +
//                             '</span>' +
//                             '<span class="text_2">' +
//                             item.G_BZ +
//                             '</span>' +
//                             '</p>' +
//                             '<div class="btns">' +
//                             '<div class="btn_history" onclick="handlerHistoryOrder(' + JSON.stringify(item).replace(/"/g, '&quot;') + ')">历史订单</div>' +
//                             '<div class="record" onclick="handlerPayRecord(' + item.G_GKBH + ')">充值记录</div>' +
//                             '</div>' +
//                             '</div>' +
//                             '<div class="right">' +
//                             '<p>' +
//                             '<span class="text_1">' +
//                             '购买频次：' +
//                             '</span>' +
//                             '<span class="text_2">' +
//                             item.S_LJXFCS + '次' +
//                             '</span>' +
//                             '</p>' +
//                             '<p>' +
//                             '<span class="text_1">' +
//                             '最近消费时间：' +
//                             '</span>' +
//                             '<span class="text_2">' +
//                             item.S_ZJYCXF +
//                             '</span>' +
//                             '</p>' +
//                             '</div>' +
//                             '</div>' + '</li>'
//                         str.push(stri);
//                         item = null;
//                         stri = null;

//                     }



//                     $('.wrapper' + (g_type - 1) + ' > .content').append(str.join(''));
//                 } else {
//                     $('.wrapper' + (g_type - 1) + ' > .content').html('');

//                     // $('.wrapper' + (g_type - 1) + ' > .content').append('<div style="text-align:center">暂无数据...</div>');
//                     jqueryAlert({
//                         'content': '暂无数据...',
//                         'closeTime': 1000
//                     })
//                     g_isLock = true;
//                 }
//             } else {
//                 if (data.Data.length > 0) {
//                     var str = [];
//                     for (var i = 0; i < data.Data.length; i++) {
//                         var item = data.Data[i];
//                         var stri = '<li><div class="title">' + '<div class="left">' + item.G_XM + '-' + item.G_XB + '-' + item.G_SJHM +
//                             '</div>' +
//                             '<div class="right">' +
//                             '<button>' + item.G_SFLX + '</button>' +
//                             '<div>' + item.XCLXSJ + '</div>' +
//                             '<div class="img_ct" onclick="getEditInfo(' + item.G_GKBH + ')">' +
//                             '<img class="img_all" src="https://appybrencdn.oss-cn-hangzhou.aliyuncs.com/Wx/komolei/images/icon_hdbjzt%402x.png">' +
//                             '</div>' +
//                             '</div>' +
//                             '</div>' +
//                             '<div class="content_c">' +
//                             '<div class="left">' +
//                             '<p>' +
//                             '<span class="text_1">' +
//                             '现金余额：' +
//                             '</span>' +
//                             '<span class="text_2">' +
//                             item.G_QBYE + '元' +
//                             '</span>' +
//                             '</p>' +
//                             '<p>' +
//                             '<span class="text_1">' +
//                             '活动余额：' +
//                             '</span>' +
//                             '<span class="text_2">' +
//                             item.G_HDYE + '元' +
//                             '</span>' +
//                             '</p>' +
//                             '<p>' +
//                             '<span class="text_1">' +
//                             '累计消费金额：' +
//                             '</span>' +
//                             '<span class="text_2">' +
//                             item.S_LJXFJE + '元' +
//                             '</span>' +
//                             '</p>' +
//                             '<p>' +
//                             '<span class="text_1">' +
//                             '备注：' +
//                             '</span>' +
//                             '<span class="text_2">' +
//                             item.G_BZ +
//                             '</span>' +
//                             '</p>' +
//                             '<div class="btns">' +
//                             '<div class="btn_history" onclick="handlerHistoryOrder(' + JSON.stringify(item).replace(/"/g, '&quot;') + ')">历史订单</div>' +
//                             '<div class="record" onclick="handlerPayRecord(' + item.G_GKBH + ')">充值记录</div>' +
//                             '</div>' +
//                             '</div>' +
//                             '<div class="right">' +
//                             '<p>' +
//                             '<span class="text_1">' +
//                             '购买频次：' +
//                             '</span>' +
//                             '<span class="text_2">' +
//                             item.S_LJXFCS + '次' +
//                             '</span>' +
//                             '</p>' +
//                             '<p>' +
//                             '<span class="text_1">' +
//                             '最近消费时间：' +
//                             '</span>' +
//                             '<span class="text_2">' +
//                             item.S_ZJYCXF +
//                             '</span>' +
//                             '</p>' +
//                             '</div>' +
//                             '</div>' + '</li>'
//                         str.push(stri);
//                         item = null;
//                         stri = null;

//                     }

//                     $('.wrapper' + (g_type - 1) + ' > .content').html(str.join(''));
//                 } else {
//                     $('.wrapper' + (g_type - 1) + ' > .content').html('');

//                     // $('.wrapper' + (g_type - 1) + ' > .content').append('<div style="text-align:center">暂无数据...</div>');
//                     jqueryAlert({
//                         'content': '暂无数据...',
//                         'closeTime': 1000
//                     })
//                     g_isLock = true;
//                 }
//             }


//         } else {
//             jqueryAlert({
//                 'content': data['ErrorMsg'],
//                 'closeTime': 1000
//             })
//         }

//     }, false);
// }

// $('.downNav').on('click', function (e) {
//     if (e.target && e.target.tagName.toLocaleLowerCase() == 'li') {
//         $.each($('.downNav>li'), function (index, el) {
//             $(this).removeClass('select_li')
//         })
//     }
//     e.target.classList.add('select_li')
//     var index = $('.downNav>li').index(e.target) + 1;
//     g_filter = index;
//     $('.btn_all').text($(e.target).text())
//     g_isLock = false;
//     g_position = 1;
//     handlerTabOfDownNav(g_count, g_position, $('.sel_command> div').index($('.show_border')) + 1, index);
//     $('.down_ct').fadeToggle()
//     $('.triangle').fadeToggle();
    
// })

// // open pay record modal
// function handlerPayRecord(userId) {
//     $('.pay_ct').fadeIn();
//     getPayRecord(userId)
//     // ModalHelper.afterOpen()

// }
// function closedPayRecord() {
//     $('.pay_ct').fadeOut();
//     // ModalHelper.beforeClose()
//     // $('.pay_record .middle tbody').empty();

// }

// function handlerContact(content) {
//     $('.custom_ct').fadeToggle()
//     ModalHelper.afterOpen()
// }
// function handlerContact_closed(content) {
//     $('.custom_ct').fadeToggle()
//     ModalHelper.beforeClose()
// }
// // function handlerContactOfCustom(userId){
// //     getEditInfo(userId)
// // }
// function handlerSelectTime() {
//     $('.select_time').fadeOut();
// }


// function handlerNextContact() {
//     $('.select_time').fadeIn()
// }

// window.onscroll = function () {
//     // if (getScrollTop() + getClientHeight() == getScrollHeight()) {
//     if ($(document).scrollTop() + $(window).height() == $(document).height()) {
        
//         handlerTab(g_count, g_position + 1, g_type, g_filter)
//     }
// }



