(function($) {
    $.fn.paginator = function(options) {
        //this指向当前的选择器
        var config = {
                url: "",
                pageParent: "",
                totalBars: -1,
                limit: -1,
                offset: 1,
                callback: null,
                error:null
            }
            //合并参数
        var opts = $.extend(config, options);

        opts.totalBars = Math.ceil(opts.totalBars / opts.limit);
        //计算按钮的总个数

        //获取offset参数
        var queryString = function(url) {
            // var offset =(url.split("?")[1]).split("=")[1];
            var offset = -1;
            var queryParams = (url.split("?")[1]).split("&");
            for (var i = 0; i < queryParams.length; i++) {
                if (queryParams[i].toString().indexOf("offset") >= 0) {
                    offset = parseInt(queryParams[i].split("=")[1]);
                }
            }
            return parseInt(offset);
        }

        //ajax核心方法，用于分页的数据操作
        var ajaxCore = function(offset, fn) {
            try {
                $.ajax({
                    "url": opts.url,
                    "data": {
                        "offset": offset,
                        "pagesize": opts.limit
                    },
                    "dataType": "JSON",
                    "method": "POST",
                    "success": function(data) {
                        fn(data);

                    },
                    "error": function(data) {
                        console.log("error");
                    }
                });
            } catch (exception) {
                console.log(exception);
            }
        }

        //重新装配分页按钮
        var pageCore = function(offset) {
            if (opts.offset == offset) {
                return;
            } //如果是当前页面，那么就什么事都不用干了！
            else {
                ajaxCore(offset, opts.callback);
                $(opts.pageParent).empty();
                //否则，清空所有的节点，重新向DOM插入新的分页按钮
                var output = "";
                var nextBar = offset == opts.totalBars ? "<a yxhref=\"javascript:;\"  class=\"button  button-small button-balanced\"><i class=\"ion-chevron-right\"></i></a>" : "<a yxhref=\"" + opts.url + (offset + 1) + "\" class=\"button  button-small button-balanced\"><i class=\"ion-chevron-right\"></i></a>";
                var preBar = offset == 1 ? "<a yxhref=\"javascript:;\" class=\"button  button-small button-balanced\"><i class=\"ion-chevron-left\"></i></a>" : "<a class=\"button  button-small button-balanced\" yxhref=\"" + opts.url + (offset - 1) + "\"><i class=\"ion-chevron-left\"></i></a>";
                //组装向上一个节点和下一页节点
                if (opts.totalBars > 7) {
                    if (offset < 5) {
                        output += preBar;
                        for (var i = 1; i <= 5; i++) {
                            if (i == offset) {
                                //
                                output += "<a yxhref=\"" + opts.url + offset + "\"  class=\"button btn-active button-small button-balanced\">" + offset + "</a>";
                            } else {
                                output += "<a yxhref=\"" + opts.url + i + "\" class=\"button  button-small button-balanced\">" + i + "</a>";
                            }
                        }
                        output += "<a class=\"button  button-small button-balanced\">...</a>";
                        output += "<a yxhref=\"" + opts.url + (opts.totalBars) + "\" class=\"button  button-small button-balanced\">" + (opts.totalBars) + "</a>" + nextBar;
                    } else if (offset >= 5 && offset <= opts.totalBars - 4) {
                        //当页面大于7个的时候，那么在第五个和倒数第五个时，执行
                        output += preBar;
                        output += "<a yxhref=\"" + opts.url + 1 + "\" class=\"button  button-small button-balanced\">" + 1 + "</a>";
                        //第一个
                        output += "<a class=\"button  button-small button-balanced\">...</a>"; //省略号

                        output += "<a yxhref=\"" + opts.url + (offset - 1) + "\" class=\"button  button-small button-balanced\">" + (offset - 1) + "</a>";
//
                        output += "<a  yxhref=\"" + opts.url + offset + "\" class=\"button btn-active button-small button-balanced\">" + offset + "</a>";

                        output += "<a yxhref=\"" + opts.url + (offset + 1) + "\" class=\"button  button-small button-balanced\">" + (offset + 1) + "</a>";

                        output += "<a class=\"button  button-small button-balanced\">...</a>"; //省略号;

                        output += "<a yxhref=\"" + opts.url + (opts.totalBars) + "\" class=\"button  button-small button-balanced\">" + (opts.totalBars) + "</a>"; //尾页

                        output += nextBar;

                    } else if (offset > opts.totalBars - 4 && offset <= opts.totalBars) {
                        //当页面位于倒数第四个时候
                        output += preBar;
                        output += "<a yxhref=\"" + opts.url + 1 + "\" class=\"button  button-small button-balanced\">" + 1 + "</a>" + "<a class=\"button  button-small button-balanced\">...</a>";

                        for (var j = 4; j >= 0; j--) {
                            if (opts.totalBars - j == offset) {

                                output += "<a yxhref=\"" + opts.url + (opts.totalBars - j) + "\" class=\"button btn-active button-small button-balanced\">" + (opts.totalBars - j) + "</a>";
                            } else {
                                output += "<a class=\"button  button-small button-balanced\" yxhref=\"" + opts.url + (opts.totalBars - j) + "\">" + (opts.totalBars - j) + "</a>";
                            }
                        }
                        output += nextBar;
                    } else {
                        console.log("分页数据出错！");
                        return;
                    }
                } else {
                    output += preBar;
                    for (var i = 1; i <= opts.totalBars; i++) {
                        if (i == offset) {

                            output += "<a yxhref=\"" + opts.url + offset + "\" class=\"button btn-active  button-small button-balanced\">" + offset + "</a>";
                        } else {
                            output += "<a class=\"button  button-small button-balanced\"  yxhref=\"" + opts.url + i + "\">" + i + "</a>";
                        }
                    }
                    output += nextBar;
                }
                $(opts.pageParent).append(output);
                opts.offset = offset; //将偏移量赋值给config里面的offset
            }
        }

        //清理函数，防止多绑定事件和重新计算分页
        var clear = function() {
            $(opts.pageParent).empty().undelegate();
        }


        //初始化装配分页按钮
        var init = function(fn) {
            if (typeof(fn) != "function") {
                console.log("将不能正确的执行回调函数");
            } else {
                opts.callback = fn;
            }
            clear();
            ajaxCore(1, opts.callback); //执行初始化ajax方法
            var preBar = "<a yxhref=\"javascript:;\" class=\"button  button-small button-balanced\"><i class=\"ion-chevron-left\"></i></a>";
            //上一页,（禁用的效果）
            //如果只有一页，那么禁用下一页
            var nextBar = opts.totalBars > 1 ? "<a yxhref=\"" + opts.url + 2 + "\" class=\"button  button-small button-balanced\"><i class=\"ion-chevron-right\"></i></a>" : "<a yxhref=\"javascript:;\" class=\"button  button-small button-balanced\"><i class=\"ion-chevron-right\"></i></a>";
            //最后一页
            // btn-active
            var output = "<a class=\"button  button-small  btn-active button-balanced\" yxhref=\"" + opts.url + 1 + "\">1</a>";

            if (opts.totalBars <= 7) {
                for (var i = 1; i < opts.totalBars; i++) {
                    output += "<a class=\"button  button-small button-balanced\"  yxhref=\"" + opts.url + (i + 1) + "\">" + (i + 1) + "</a>";
                }
            } else {
                for (var j = 1; j < 5; j++) {
                    output += "<a class=\"button  button-small button-balanced\" yxhref=\"" + opts.url + (j + 1) + "\">" + (j + 1) + "</a>";
                }
                output += "<a class=\"button  button-small button-balanced\">...</a>";
                output += "<a class=\"button  button-small button-balanced\"  yxhref=\"" + opts.url + (opts.totalBars) + "\">" + (opts.totalBars) + "</a>";
            }
            $(opts.pageParent).delegate("a", "click", function() {
                var offset = null;
                try {
                    offset = queryString($(this).attr("yxhref"));
                } catch (exception) {
                    return;
                }
                pageCore(offset);
            });
            $(opts.pageParent).append(preBar + output + nextBar);
        };
        init(opts.callback); //初始化分页引擎
    }
}(window.jQuery))