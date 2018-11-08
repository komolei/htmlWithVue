
    document.ready = function () {
        setTimeout(() => {
            $('.mask').fadeOut()
        }, 1000);
        $('.tab_loading').fadeOut();

    }
    var ModalHelper = (function (bodyCls) {
        var scrollTop;
        return {
            afterOpen: function () {
                scrollTop = document.scrollingElement.scrollTop;
                $('.ct').addClass(bodyCls);
                $('.ct').css('top', -scrollTop)
                // document.body.style.top = -scrollTop + 'px';
            },
            beforeClose: function () {
                // document.body.classList.remove(bodyCls);
                $('.ct').removeClass(bodyCls)
                document.scrollingElement.scrollTop = scrollTop;
            }
        };
    })('modal-open')
    $('.custom_ct').on('touchmove', function (e) {
        e.stopPropagation();
        e.preventDefault();
    })
    // $('.pay_ct').on('touchstart', function (e) {
    //     e.stopPropagation();
    //     e.preventDefault();
    // })
    // var contentNode=$('.pay_ct .middle')
    // console.log('contentNode',contentNode);
    // $('.pay_ct .middle').on('touchmove', function (e) {
    //     e.returnValue = true;
    //     e.stopPropagation();
    // })

    // contentNode.on('touchstart', e => {
    //     status = 1
    //     startY = e.targetTouches[0].pageY
    //     console.log('startY',startY);
    // }, false)

    // contentNode.on('touchmove', e => {
    //     // 判定一次就够了
    //     if (status !== 1) return

    //     status = 2

    //     let t = e.target || e.srcElement
    //     let py = e.targetTouches[0].pageY
    //     let ch = t.clientHeight // 内容可视高度
    //     let sh = t.scrollHeight // 内容滚动高度
    //     let st = t.scrollTop // 当前滚动高度

    //     // 已经到头部尽头了还要向上滑动，阻止它
    //     if (st === 0 && startY < py) {
    //         e.preventDefault()
    //     }

    //     // 已经到低部尽头了还要向下滑动，阻止它
    //     if ((st === sh - ch) && startY > py) {
    //         e.preventDefault()
    //     }
    // }, false)

    // contentNode.on('touchend', e => {
    //     status = 0
    // }, false)

    var reqUrl;
    //
    !(function () {
        var url = window.document.location.href.toString();
        if (url.indexOf('localhost') != -1) { return reqUrl = "https://apptest.ybren.com/index.php/"; }
        else {
            if (url.indexOf('htest') != -1) {
                return reqUrl = "https://apptest.ybren.com/index.php/";
            } else {
                return reqUrl = "https://app.ybren.com/index.php/";
            }
        }

    })()
    console.log('xxx', reqUrl);
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
    var g_type = 1,
        g_filter = 1,
        g_count = 20, g_position = 1;
    var g_isLock = false;
    var g_userId;
    // btn click event

    function tabSelect(ct, className) {
        $(ct).on('click', function (e) {
            if (e.target && e.target.tagName.toLocaleLowerCase() == 'div') {
                $.each($(ct + '>div'), function (index, el) {
                    $(this).removeClass(className)
                })
            }
            e.target.classList.add(className)
            $('.tab_loading').fadeIn();
            let index = $(ct + '>div').index(e.target);
            g_type = index;
            if (g_position > 1) { g_position = 1 }
            $.each($('.wrapper_ct>div'), function () {
                $(this).fadeOut()
            })
            $('.wrapper' + index).fadeIn()
            g_isLock = false;
            handlerTab(g_count, g_position, index + 1, $('.downNav>li').index($('.select_li')) + 1)
        })
    }

    tabSelect('.sel_command', 'show_border')

    function getPayRecord(UserId) {
        apiPost(reqUrl + "/H5Eleven2018/getRechargeList", {
            "LoginToken": LoginToken,
            "userId": UserId,
        }, function (data) {
            // var str=data
            if (data.Status) {
                if (data.Data.length > 0) {
                    var str = data.Data.map(function (item) {
                        return '<tr>' +
                            '<td>' + item.CJSJ + '</td>' +
                            '<td>' + item.JE + '</td>' +
                            '</tr>'
                    })
                    // var newStr = '<tr>' +
                    //     '<th>充值时间</th>' +
                    //     '<th>充值金额（元）</th>' +
                    //     '</tr>'
                    // str.unshift(newStr)
                    $('.pay_record .middle tbody').html(str.join(''));
                } else {
                    var str = '<tr>' +
                        '<th>充值时间</th>' +
                        '<th>充值金额（元）</th>' +
                        '</tr>' + '<tr>' +
                        '<td></td>' +
                        '<td></td>' +
                        '</tr>'
                    // $('.pay_record_ct').html(str);
                    $('.pay_record .middle tbody').html(str);

                }

            } else {
                jqueryAlert({
                    'content': data['ErrorMsg'],
                    'closeTime': 1000
                })
            }
            $('.tab_loading').fadeOut();

        }, false);
    }

    function handlerTab(Count, Position, type, filter) {
        g_count = Count;
        g_position = Position;
        g_type = type;
        // $('.svg_ct').show();
        if (g_isLock) return;
        apiPost(reqUrl + "/H5Eleven2018/Eleven2018List", {
            "LoginToken": LoginToken,
            "Count": Count,
            "Position": Position,
            "type": type,
            "filter": filter,
        }, function (data) {
            if (data.Status) {
                if (g_position > 1) {
                    if (data.Data.length > 0) {
                        var str = data.Data.map(function (item) {
                            return '<li><div class="title">' +
                                '<div class="left">' + item.G_XM + '-' + item.G_XB + '-' + item.G_SJHM +
                                '</div>' +
                                '<div class="right">' +
                                '<button>' + item.G_SFLX + '</button>' +
                                '<div>' + item.XCLXSJ + '</div>' +
                                '<div class="img_ct" onclick="getEditInfo(' + item.G_GKBH + ')">' +
                                '<img class="img_all" src="https://appybrencdn.oss-cn-hangzhou.aliyuncs.com/Wx/komolei/images/icon_hdbjzt%402x.png">' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="content_c">' +
                                '<div class="left">' +
                                '<p>' +
                                '<span class="text_1">' +
                                '现金余额：' +
                                '</span>' +
                                '<span class="text_2">' +
                                item.G_QBYE + '元' +
                                '</span>' +
                                '</p>' +
                                '<p>' +
                                '<span class="text_1">' +
                                '活动余额：' +
                                '</span>' +
                                '<span class="text_2">' +
                                item.G_HDYE + '元' +
                                '</span>' +
                                '</p>' +
                                '<p>' +
                                '<span class="text_1">' +
                                '累计消费金额：' +
                                '</span>' +
                                '<span class="text_2">' +
                                item.S_LJXFJE + '元' +
                                '</span>' +
                                '</p>' +
                                '<p>' +
                                '<span class="text_1">' +
                                '备注：' +
                                '</span>' +
                                '<span class="text_2">' +
                                item.G_BZ +
                                '</span>' +
                                '</p>' +
                                '<div class="btns">' +
                                '<div class="btn_history" onclick="handlerHistoryOrder(' + JSON.stringify(item).replace(/"/g, '&quot;') + ')">历史订单</div>' +
                                '<div class="record" onclick="handlerPayRecord(' + item.G_GKBH + ')">充值记录</div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="right">' +
                                '<p>' +
                                '<span class="text_1">' +
                                '购买频次：' +
                                '</span>' +
                                '<span class="text_2">' +
                                item.S_LJXFCS + '次' +
                                '</span>' +
                                '</p>' +
                                '<p>' +
                                '<span class="text_1">' +
                                '最近消费时间：' +
                                '</span>' +
                                '<span class="text_2">' +
                                item.S_ZJYCXF +
                                '</span>' +
                                '</p>' +
                                '</div>' +
                                '</div>' + '</li>'
                        })
                        $('.wrapper' + (g_type - 1) + ' > .content').append(str.join(''));
                    } else {
                        // $('.wrapper' + (g_type - 1) + ' > .content').append('<div style="text-align:center">暂无数据...</div>');
                        jqueryAlert({
                            'content': '暂无数据...',
                            'closeTime': 1500
                        })
                        g_isLock = true;
                        $('.svg_ct').fadeOut();
                    }
                } else {
                    if (data.Data.length > 0) {
                        var str = data.Data.map(function (item) {
                            return '<li><div class="title">' +
                                '<div class="left">' + item.G_XM + '-' + item.G_XB + '-' + item.G_SJHM +
                                '</div>' +
                                '<div class="right">' +
                                '<button>' + item.G_SFLX + '</button>' +
                                '<div>' + item.XCLXSJ + '</div>' +
                                '<div class="img_ct" onclick="getEditInfo(' + item.G_GKBH + ')">' +
                                '<img class="img_all" src="https://appybrencdn.oss-cn-hangzhou.aliyuncs.com/Wx/komolei/images/icon_hdbjzt%402x.png">' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="content_c">' +
                                '<div class="left">' +
                                '<p>' +
                                '<span class="text_1">' +
                                '现金余额：' +
                                '</span>' +
                                '<span class="text_2">' +
                                item.G_QBYE + '元' +
                                '</span>' +
                                '</p>' +
                                '<p>' +
                                '<span class="text_1">' +
                                '活动余额：' +
                                '</span>' +
                                '<span class="text_2">' +
                                item.G_HDYE + '元' +
                                '</span>' +
                                '</p>' +
                                '<p>' +
                                '<span class="text_1">' +
                                '累计消费金额：' +
                                '</span>' +
                                '<span class="text_2">' +
                                item.S_LJXFJE + '元' +
                                '</span>' +
                                '</p>' +
                                '<p>' +
                                '<span class="text_1">' +
                                '备注：' +
                                '</span>' +
                                '<span class="text_2">' +
                                item.G_BZ +
                                '</span>' +
                                '</p>' +
                                '<div class="btns">' +
                                '<div class="btn_history" onclick="handlerHistoryOrder(' + JSON.stringify(item).replace(/"/g, '&quot;') + ')">历史订单</div>' +
                                '<div class="record" onclick="handlerPayRecord(' + item.G_GKBH + ')">充值记录</div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="right">' +
                                '<p>' +
                                '<span class="text_1">' +
                                '购买频次：' +
                                '</span>' +
                                '<span class="text_2">' +
                                item.S_LJXFCS + '次' +
                                '</span>' +
                                '</p>' +
                                '<p>' +
                                '<span class="text_1">' +
                                '最近消费时间：' +
                                '</span>' +
                                '<span class="text_2">' +
                                item.S_ZJYCXF +
                                '</span>' +
                                '</p>' +
                                '</div>' +
                                '</div>' + '</li>'
                        })
                        $('.wrapper' + (g_type - 1) + ' > .content').html(str.join(''));
                    } else {
                        // $('.wrapper' + (g_type - 1) + ' > .content').append('<div style="text-align:center">暂无数据...</div>');
                        jqueryAlert({
                            'content': '暂无数据...',
                            'closeTime': 1000
                        })
                        g_isLock = true;
                        $('.svg_ct').fadeOut();
                    }
                }
            } else {
                jqueryAlert({
                    'content': data['ErrorMsg'],
                    'closeTime': 2000
                })
            }
            $('.tab_loading').fadeOut();
            $('.svg_ct').fadeOut();
        }, false);
    }

    // document ready invoke 
    handlerTab(20, 1, 1, 1)

    function handlerHistoryOrder(item) {
        var userName = item.G_XM, gender = item.G_XB, cellPhone = item.G_SJHM, userId = item.G_GKBH;
        var str = 'VC=YBRHistoryOrderViewController&userName=' + userName + '&gender=' + gender + '&cellPhone=' + cellPhone + '&userId=' + userId;
        var newStr = encodeURI(str)
        console.log(newStr);
        showHtmlcallNative(888, newStr, 888);
    }

    function handlerTabofEditInfo(Count, Position, type, filter) {
        g_count = Count;
        g_position = Position;
        g_type = type;
        // $('.svg_ct').show();
        if (g_isLock) return;
        apiPost(reqUrl + "/H5Eleven2018/Eleven2018List", {
            "LoginToken": LoginToken,
            "Count": Count,
            "Position": Position,
            "type": type,
            "filter": filter,
        }, function (data) {
            if (data.Status) {
                if (data.Data.length > 0) {
                    var str = data.Data.map(function (item) {
                        return '<li><div class="title">' +
                            '<div class="left">' + item.G_XM + '-' + item.G_XB + '-' + item.G_SJHM +
                            '</div>' +
                            '<div class="right">' +
                            '<button>' + item.G_SFLX + '</button>' +
                            '<div>' + item.XCLXSJ + '</div>' +
                            '<div class="img_ct" onclick="getEditInfo(' + item.G_GKBH + ')">' +
                            '<img class="img_all" src="https://appybrencdn.oss-cn-hangzhou.aliyuncs.com/Wx/komolei/images/icon_hdbjzt%402x.png">' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '<div class="content_c">' +
                            '<div class="left">' +
                            '<p>' +
                            '<span class="text_1">' +
                            '现金余额：' +
                            '</span>' +
                            '<span class="text_2">' +
                            item.G_QBYE + '元' +
                            '</span>' +
                            '</p>' +
                            '<p>' +
                            '<span class="text_1">' +
                            '活动余额：' +
                            '</span>' +
                            '<span class="text_2">' +
                            item.G_HDYE + '元' +
                            '</span>' +
                            '</p>' +
                            '<p>' +
                            '<span class="text_1">' +
                            '累计消费金额：' +
                            '</span>' +
                            '<span class="text_2">' +
                            item.S_LJXFJE + '元' +
                            '</span>' +
                            '</p>' +
                            '<p>' +
                            '<span class="text_1">' +
                            '备注：' +
                            '</span>' +
                            '<span class="text_2">' +
                            item.G_BZ +
                            '</span>' +
                            '</p>' +
                            '<div class="btns">' +
                            '<div class="btn_history" onclick="handlerHistoryOrder(' + JSON.stringify(item).replace(/"/g, '&quot;') + ')">历史订单</div>' +
                            '<div class="record" onclick="handlerPayRecord(' + item.G_GKBH + ')">充值记录</div>' +
                            '</div>' +
                            '</div>' +
                            '<div class="right">' +
                            '<p>' +
                            '<span class="text_1">' +
                            '购买频次：' +
                            '</span>' +
                            '<span class="text_2">' +
                            item.S_LJXFCS + '次' +
                            '</span>' +
                            '</p>' +
                            '<p>' +
                            '<span class="text_1">' +
                            '最近消费时间：' +
                            '</span>' +
                            '<span class="text_2">' +
                            item.S_ZJYCXF +
                            '</span>' +
                            '</p>' +
                            '</div>' +
                            '</div>' + '</li>'
                    })
                    $('.wrapper' + (g_type - 1) + ' > .content').html(str.join(''));
                } else {
                    $('.wrapper' + (g_type - 1) + ' > .content').html('');
                    g_isLock = true;

                    // $('.wrapper' + (g_type - 1) + ' > .content').append('<div style="text-align:center">暂无数据...</div>');
                    // jqueryAlert({
                    //     'content': '暂无数据...',
                    //     'closeTime': 1000
                    // })
                    $('.svg_ct').fadeOut();
                }

            } else {
                jqueryAlert({
                    'content': data['ErrorMsg'],
                    'closeTime': 1000
                })
            }
            $('.tab_loading').fadeOut();
            $('.svg_ct').fadeOut();
        }, false);
    }

    // userId
    function editInfo(UserId) {
        var status = $('input[name="custom_status"]').index($('input[name="custom_status"]:checked'))
        var time = status == 1 ? $('.time.show_time').text() : ''
        apiPost(reqUrl + "/H5Eleven2018/editInfo", {
            "LoginToken": LoginToken,
            "userId": UserId,
            'status': status + 1,
            'contactDate': time,
            'remark': $('.remark_input input').val()
        }, function (data) {
            // var str=data
            if (data.Status) {
                jqueryAlert({
                    'content': '编辑成功',
                    'closeTime': 1000
                })
                g_isLock = false;
                handlerTabofEditInfo(g_count, 1, g_type, g_filter)
            } else {
                jqueryAlert({
                    'content': data['ErrorMsg'],
                    'closeTime': 1000
                })
            }
            // $('.custom_ct').fadeToggle()

            $('.tab_loading').fadeOut();
            handlerContact_closed()

        }, false);
    }

    function getEditInfo(UserId) {
        g_userId = UserId;
        apiPost(reqUrl + "/H5Eleven2018/getEditInfo", {
            "LoginToken": LoginToken,
            "userId": UserId,
        }, function (data) {
            // var str=data
            if (data.Status) {
                if (JSON.stringify(data.Data) != '{}') {
                    var newData = data.Data;
                    var index = newData.G_SFLX == null ? 0 : Number(newData.G_SFLX) - 1
                    $('input[name="custom_status"]').eq(index).attr("checked", "checked");
                    if (newData.G_SFLX != null && Number(newData.G_SFLX) == 2) {
                        $('.select_time').fadeIn()
                        $.each($('.time_box div'), function (index, el) {
                            $(el).removeClass('show_time')
                            if ($(el).text() == newData.XCLXSJ) {
                                $('.time_box div').eq(index).addClass('show_time')
                            }
                        })
                    } else {
                        $('.select_time').hide()
                    }
                    $('.remark_input input').val(newData.G_BZ);
                    $('.remark>span').text(newData.G_BZ.length.toString())
                    handlerContact()

                } else {
                    handlerContact()
                }
                // jqueryAlert({
                //     'content': '编辑成功',
                //     'closeTime': 1000
                // })
            } else {
                jqueryAlert({
                    'content': data['ErrorMsg'],
                    'closeTime': 1000
                })
            }
            $('.tab_loading').fadeOut();

        }, false);
    }

    function handlerInput() {
        var length = $(this).val().length;
        if (length >= 20) {
            $(this).val($(this).val().substr(0, 20))
        }
        $('.remark>span').text(length.toString())
    }
    $('.remark_input input').on('input', handlerInput)

    function sureEditInfo() {
        editInfo(g_userId)
    }

    $('.top>.btn_all').on('touchstart', function (e) {
        e.stopPropagation()
        $('.down_ct').fadeIn()
    })

    $('body').on('click', function (e) {
        if (e.target && e.target.className.toLocaleLowerCase() != 'btn_all' && e.target.className.toLocaleLowerCase() !=
            'down_ct' && e.target.tagName.toLocaleLowerCase() != 'li' && $('.down_ct').css('display') ==
            'block') {
            $('.down_ct').fadeOut();
        }
    })

    $('.down_ct').on('touchend', function (e) {
        e.stopPropagation()
        $(this).fadeOut();
    })

    function singleSelect(ct, className) {
        $(ct).on('click', function (e) {
            if (e.target && e.target.tagName.toLocaleLowerCase() == 'div') {
                $.each($(ct + '>div'), function (index, el) {
                    $(this).removeClass(className)
                })
            }
            e.target.classList.add(className)
        })
    }
    singleSelect('.time_box', "show_time")

    tabLoading_toggle()
    // downnav 
    function handlerTabOfDownNav(Count, Position, type, filter) {
        g_count = Count;
        g_position = Position;
        g_type = type;
        // $('.svg_ct').show();
        if (g_isLock) return $('.svg_ct').fadeOut();
        apiPost(reqUrl + "/H5Eleven2018/Eleven2018List", {
            "LoginToken": LoginToken,
            "Count": Count,
            "Position": Position,
            "type": type,
            "filter": filter,
        }, function (data) {
            // var str=data
            if (data.Status) {
                if (g_position > 1) {
                    if (data.Data.length > 0) {
                        var str = data.Data.map(function (item) {
                            return '<li><div class="title">' +
                                '<div class="left">' + item.G_XM + '-' + item.G_XB + '-' + item.G_SJHM +
                                '</div>' +
                                '<div class="right">' +
                                '<button>' + item.G_SFLX + '</button>' +
                                '<div>' + item.XCLXSJ + '</div>' +
                                '<div class="img_ct" onclick="getEditInfo(' + item.G_GKBH + ')">' +
                                '<img class="img_all" src="https://appybrencdn.oss-cn-hangzhou.aliyuncs.com/Wx/komolei/images/icon_hdbjzt%402x.png">' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="content_c">' +
                                '<div class="left">' +
                                '<p>' +
                                '<span class="text_1">' +
                                '现金余额：' +
                                '</span>' +
                                '<span class="text_2">' +
                                item.G_QBYE + '元' +
                                '</span>' +
                                '</p>' +
                                '<p>' +
                                '<span class="text_1">' +
                                '活动余额：' +
                                '</span>' +
                                '<span class="text_2">' +
                                item.G_HDYE + '元' +
                                '</span>' +
                                '</p>' +
                                '<p>' +
                                '<span class="text_1">' +
                                '累计消费金额：' +
                                '</span>' +
                                '<span class="text_2">' +
                                item.S_LJXFJE + '元' +
                                '</span>' +
                                '</p>' +
                                '<p>' +
                                '<span class="text_1">' +
                                '备注：' +
                                '</span>' +
                                '<span class="text_2">' +
                                item.G_BZ +
                                '</span>' +
                                '</p>' +
                                '<div class="btns">' +
                                '<div class="btn_history" onclick="handlerHistoryOrder(' + JSON.stringify(item).replace(/"/g, '&quot;') + ')">历史订单</div>' +
                                '<div class="record" onclick="handlerPayRecord(' + item.G_GKBH + ')">充值记录</div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="right">' +
                                '<p>' +
                                '<span class="text_1">' +
                                '购买频次：' +
                                '</span>' +
                                '<span class="text_2">' +
                                item.S_LJXFCS + '次' +
                                '</span>' +
                                '</p>' +
                                '<p>' +
                                '<span class="text_1">' +
                                '最近消费时间：' +
                                '</span>' +
                                '<span class="text_2">' +
                                item.S_ZJYCXF +
                                '</span>' +
                                '</p>' +
                                '</div>' +
                                '</div>' + '</li>'
                        })
                        $('.wrapper' + (g_type - 1) + ' > .content').append(str.join(''));
                    } else {
                        $('.wrapper' + (g_type - 1) + ' > .content').html('');

                        // $('.wrapper' + (g_type - 1) + ' > .content').append('<div style="text-align:center">暂无数据...</div>');
                        jqueryAlert({
                            'content': '暂无数据...',
                            'closeTime': 1000
                        })
                        g_isLock = true;
                        $('.svg_ct').fadeOut();
                    }
                } else {
                    if (data.Data.length > 0) {
                        var str = data.Data.map(function (item) {
                            return '<li><div class="title">' +
                                '<div class="left">' + item.G_XM + '-' + item.G_XB + '-' + item.G_SJHM +
                                '</div>' +
                                '<div class="right">' +
                                '<button>' + item.G_SFLX + '</button>' +
                                '<div>' + item.XCLXSJ + '</div>' +
                                '<div class="img_ct" onclick="getEditInfo(' + item.G_GKBH + ')">' +
                                '<img class="img_all" src="https://appybrencdn.oss-cn-hangzhou.aliyuncs.com/Wx/komolei/images/icon_hdbjzt%402x.png">' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="content_c">' +
                                '<div class="left">' +
                                '<p>' +
                                '<span class="text_1">' +
                                '现金余额：' +
                                '</span>' +
                                '<span class="text_2">' +
                                item.G_QBYE + '元' +
                                '</span>' +
                                '</p>' +
                                '<p>' +
                                '<span class="text_1">' +
                                '活动余额：' +
                                '</span>' +
                                '<span class="text_2">' +
                                item.G_HDYE + '元' +
                                '</span>' +
                                '</p>' +
                                '<p>' +
                                '<span class="text_1">' +
                                '累计消费金额：' +
                                '</span>' +
                                '<span class="text_2">' +
                                item.S_LJXFJE + '元' +
                                '</span>' +
                                '</p>' +
                                '<p>' +
                                '<span class="text_1">' +
                                '备注：' +
                                '</span>' +
                                '<span class="text_2">' +
                                item.G_BZ +
                                '</span>' +
                                '</p>' +
                                '<div class="btns">' +
                                '<div class="btn_history" onclick="handlerHistoryOrder(' + JSON.stringify(item).replace(/"/g, '&quot;') + ')">历史订单</div>' +
                                '<div class="record" onclick="handlerPayRecord(' + item.G_GKBH + ')">充值记录</div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="right">' +
                                '<p>' +
                                '<span class="text_1">' +
                                '购买频次：' +
                                '</span>' +
                                '<span class="text_2">' +
                                item.S_LJXFCS + '次' +
                                '</span>' +
                                '</p>' +
                                '<p>' +
                                '<span class="text_1">' +
                                '最近消费时间：' +
                                '</span>' +
                                '<span class="text_2">' +
                                item.S_ZJYCXF +
                                '</span>' +
                                '</p>' +
                                '</div>' +
                                '</div>' + '</li>'
                        })
                        $('.wrapper' + (g_type - 1) + ' > .content').html(str.join(''));
                    } else {
                        $('.wrapper' + (g_type - 1) + ' > .content').html('');

                        // $('.wrapper' + (g_type - 1) + ' > .content').append('<div style="text-align:center">暂无数据...</div>');
                        jqueryAlert({
                            'content': '暂无数据...',
                            'closeTime': 1000
                        })
                        g_isLock = true;
                        $('.svg_ct').fadeOut();
                    }
                }


            } else {
                jqueryAlert({
                    'content': data['ErrorMsg'],
                    'closeTime': 1000
                })
            }
            $('.tab_loading').fadeOut();
            $('.svg_ct').fadeOut();

        }, false);
    }

    $('.downNav').on('click', function (e) {
        if (e.target && e.target.tagName.toLocaleLowerCase() == 'li') {
            $.each($('.downNav>li'), function (index, el) {
                $(this).removeClass('select_li')
            })
        }
        e.target.classList.add('select_li')
        let index = $('.downNav>li').index(e.target) + 1;
        g_filter = index;
        $('.btn_all').text($(e.target).text())
        g_isLock = false;
        g_position = 1;
        handlerTabOfDownNav(g_count, g_position, $('.sel_command> div').index($('.show_border')) + 1, index)
    })


    function tabLoading_toggle() {
        $('.tab_loading').fadeToggle()
    }

    // open pay record modal
    function handlerPayRecord(userId) {
        $('.pay_ct').fadeIn();
        getPayRecord(userId)
        // ModalHelper.afterOpen()

    }
    function closedPayRecord() {
        $('.pay_ct').fadeOut();
        // ModalHelper.beforeClose()
        // $('.pay_record .middle tbody').empty();

    }

    function handlerContact(content) {
        $('.custom_ct').fadeToggle()
        ModalHelper.afterOpen()
    }
    function handlerContact_closed(content) {
        $('.custom_ct').fadeToggle()
        ModalHelper.beforeClose()
    }
    // function handlerContactOfCustom(userId){
    //     getEditInfo(userId)
    // }
    function handlerSelectTime() {
        $('.select_time').fadeOut();
    }


    $('.custom_ct').on('click', function (e) {
        // if (e.target && e.target.className.toLocaleLowerCase() != 'custom') {
        //     $('.custom_ct').fadeOut()
        // }
        e.stopPropagation();
    })

    function handlerNextContact() {
        $('.select_time').fadeIn()
    }

    // debounce
    function debounce(func, wait, immediate) {

        var timeout, result;

        var debounced = function () {
            var context = this;
            var args = arguments;

            if (timeout) clearTimeout(timeout);
            if (immediate) {
                // 如果已经执行过，不再执行
                var callNow = !timeout;
                timeout = setTimeout(function () {
                    timeout = null;
                }, wait)
                if (callNow) result = func.apply(context, args)
            }
            else {
                timeout = setTimeout(function () {
                    func.apply(context, args)
                }, wait);
            }
            return result;
        };

        debounced.cancel = function () {
            clearTimeout(timeout);
            timeout = null;
        };

        return debounced;
    }
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
            $('.svg_ct').removeClass('hide')
            // $('.wrapper>.content').append(`<li>xxx</li>`)
            debounce(handlerTab(g_count, g_position + 1, g_type, g_filter), 1000, true)
        } else {
            $('.svg_ct').addClass('hide');
        }
    }



