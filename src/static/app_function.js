//在app中使用

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
var mode = $_GET['mode'];
var needlogin = false;
var islogin = false;
var versions = '';

var browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return { //移动终端浏览器版本信息 
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端 
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器 
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器 
            iPad: u.indexOf('iPad') > -1, //是否iPad 
        };
    }(),
}

function showHtmlcallNative(type, id, initial) {
    var from = $_GET['source'];
    var mode = $_GET['mode'];
    var plan = $_GET['plan'];
    var idea = $_GET['idea'];


    if (!from) {
        from = $_GET['utm_campaign'];
    }
    if (!from) {
        from = $_GET['from'];
    }
    if (!from) {
        from = $_GET['utm_source'];
    }

    if (type == 7) {
        var url = "/home/itemdetail/" + id;
        if (from) {
            url = url + "/from/" + from;
        }
        if (plan) {
            url = url + "/plan/" + plan;
        }
        if ('#share' == window.location.hash) {
            location.href = "//app.ybren.com/index.php?c=Share&a=item&ShopItemId=" + id;
            return;
        }
        if (mode != 'app') {
            location.href = url;
            return;
        }
    } else if (type == 6) {
        id = 'APP-' + plan;
        if (idea) {
            id += '-' + idea;
        }
        var url = "/index.php/Home/Yuyue/newyuyue";

        if (from) {
            url = url + "?source=" + from;
            if (plan) {
                url = url + "&plan=" + plan;
            }
            if (idea) {
                url = url + "&idea=" + idea;
            }
        }
        if (mode != 'app' || '#share' == window.location.hash) {
            location.href = url;
            return;
        }
    }

    if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {

        if (versions == '') {
            var url = "YBRenstore.type:" + type + ";param:" + id + ";initial:" + initial;
            document.location = url;
        }

        //新增ios交互方法适应新版本ios app 20170914    
        var body = "type:" + type + ";param:" + id + ";initial:" + initial;
        var message = { 'body': body };
        window.webkit.messageHandlers.ybrenstore.postMessage(message);
    }
    if (browser.versions.android) {
        var str = window.jsObj.HtmlcallNative(initial, id);
    }
}
function getHtmlcallNative(type, id, initial) {

    id = id.toString();
    if (id != "undefined" && id != null && id != '') {
        var Reg = id.match(/;Version:(\S+)/);
        if (Reg != null) {
            versions = Reg[1];
        }
        id = id.replace(/;Version:(\S+)/, "");
    }

    if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
        if (type > "4" && type < "8") {

        } else {
            if (id == '0') {
                showHtmlcallNative(3, id, initial);
            } else {
                if (initial != type) {
                    islogin = true;
                    // location.href='http://wx.ybren.com/index.php/Home/Yuyue/ActiveYuyue?type=cszty14';
                }
            }
        }
    }
    if (browser.versions.android) {

        if (id == '0') {
            window.jsObj.HtmlcallNative(3, id);
        } else {

        }
    }
}


function Kefu() {
    if ((browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) && mode == 'app') {
        showHtmlcallNative(9, '', 9);
    } else if (browser.versions.android && mode == 'app') {
        var str = window.jsObj.HtmlcallNative(9, 'http://bdkj.udesk.cn/im_client?web_plugin_id=18433&group_id=27469');
    } else {
        window.location.href = 'http://bdkj.udesk.cn/im_client?web_plugin_id=18433&group_id=27469';
    }
}
function callkefu() {
    if (browser.versions.android && mode == 'app') {
        var str = window.jsObj.HtmlcallNative(10, '400-673-8899');
    } else if ((browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) && mode == 'app') {
        showHtmlcallNative(15, '400-673-8899', 15);
    } else {
        window.location.href = 'tel://400-673-8899';
    }
}

function gotoList(cate_id) {

    var from = $_GET['source'];
    var url = "/home/product2/" + cate_id;
    if (mode == 'app' && '#share' != window.location.hash) {
        location.href = url + "?mode=app";
        return;
    }
    if (from) {
        url = url + "/from/" + from;
    }
    location.href = url;
} 