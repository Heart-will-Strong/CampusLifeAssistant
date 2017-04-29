angular.module('starter.controllers', ['ngCordova', "ionic", "starter.service", "starter.filters", "ionic-datepicker"])
    .controller('AppCtrl', ["$scope", "$ionicModal", "$timeout", "common","$ionicPopup","$state",
        function($scope, $ionicModal, $timeout, common,$ionicPopup,$state) {
          $scope.root = "http://111.11.196.76:8080/lijiayu";

            //$scope.root = "http://192.168.191.1:8080";

    }])
    ///主界面的控制器
    .controller('MainCtrl', ["common","$scope",function(common,$scope) {



    }])
    //教室查询
    .controller("scheduleCtrl", ["$scope","$ionicPopup","$ionicLoading","common","$state",function($scope,$ionicPopup,$ionicLoading,common,$state) {


        $scope.parameter={
            week:"第一周",
            currentMonth:new Date().getMonth()+1,
            sid:common.getLocal('current').result.sid,
            begindate:common.getLocal("begindate")
        };

        if($scope.parameter.begindate==""||$scope.parameter.begindate==undefined||$scope.parameter.begindate==null)
        {
            $ionicPopup.show({
                title: '请设置当前学期开学日期!!!',
                scope: $scope,
                buttons: [{
                    text: '确定',
                    type: 'button-assertive',
                    onTap: function (e) {
                        $state.go("app.setting");
                    }
                }]
            });
        }

        var mappingWeeks= function ($week) {

            $weeknumber=-1;

            switch($week)
            {
                case "第一周":
                    $weeknumber=1;
                    break;
                case "第二周":
                    $weeknumber=2;
                    break;
                case "第三周":
                    $weeknumber=3;
                    break;
                case "第四周":
                    $weeknumber=4;
                    break;
                case "第五周":
                    $weeknumber=5;
                    break;
                case "第六周":
                    $weeknumber=6;
                    break;
                case "第七周":
                    $weeknumber=7;
                    break;
                case "第八周":
                    $weeknumber=8;
                    break;
                case "第九周":
                    $weeknumber=9;
                    break;
                case "第十周":
                    $weeknumber=10;
                    break;
                case "第十一周":
                    $weeknumber=11;
                    break;
                case "第十二周":
                    $weeknumber=12;
                    break;
                case "第十三周":
                    $weeknumber=13;
                    break;
                case "第十四周":
                    $weeknumber=14;
                    break;
                case "第十五周":
                    $weeknumber=15;
                    break;
                case "第十六周":
                    $weeknumber=16;
                    break;
                case "第十七周":
                    $weeknumber=17;
                    break;
                case "第十八周":
                    $weeknumber=18;
                    break;
                case "第十九周":
                    $weeknumber=19;
                    break;
                case "第二十周":
                    $weeknumber=20;
                    break;
            }

            return $weeknumber;
        };


        !function  test(){

            var  model=["第一周","第二周","第三周","第四周","第五周","第六周","第七周","第八周",
                "第九周","第十周","第十一周","第十二周","第十三周","第十三周","第十四周","第十五周",
                "第十六周","第十七周","第十八周","第十九周","第二十周"];

           var start=new Date($scope.parameter.begindate);

           var now=new Date();

           start=start-1000*60*60*24;

           $scope.parameter.week=model[Math.ceil(Math.abs((now - start))/(1000*60*60*24*7))-1];
       }();

        var classarry=[
            "active-bg-p","active-bg-h",
            "active-bg-r","active-bg-a",
            "active-bg-b","active-bg-c",
            "active-bg-d","active-bg-e",
            "active-bg-f","active-bg-g"
        ];

        $scope.init= function () {

            $ionicLoading.show({
                content: '请稍后...',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 200,
                showDelay: 0
            });

            $(".i-item").each(function () {
               $(this).removeClass("active-bg-p").removeClass("active-bg-r").removeClass("active-bg-a")
                   .removeClass("active-bg-b").removeClass("active-bg-c").removeClass("active-bg-d")
                   .removeClass("active-bg-e").removeClass("active-bg-f").removeClass("active-bg-g").removeClass("active-bg-h").empty();
            });
            $.ajax({
                "method":"post",
                "dataType":"json",
                "url":$scope.root + "/schedule.php",
                "data":{
                    sid:$scope.parameter.sid,
                    week:$scope.parameter.week
                },
                "success": function (data) {

                    console.log(data);

                    if(data.result==null)
                    {
                        $ionicLoading.hide();
                        return ;
                    }
                    var schedule=data.result;
                    for(var i=0;i<schedule.length;i++)
                    {
                        var classindex =Math.floor( 9*(Math.random()));
                        var  start=-1;
                        //设置映射
                        if(schedule[i].startknob==1) start=1;
                        if(schedule[i].startknob==3) start=2;
                        if(schedule[i].startknob==5) start=3;
                        if(schedule[i].startknob==7) start=4;
                        if(schedule[i].startknob==9) start=5;

                        var insertPattern=`<div><span class="disblock">${schedule[i].location}</span><span class="disblock">
                                                ${schedule[i].course_name}</span>
                                           </div>`;

                        var index=parseInt(index=(start-1)*7)+parseInt(schedule[i].weekday)
                        $(".i-item").each(function () {
                            if($(this).attr("index")==index)
                            {
                                $(this).addClass(classarry[classindex]).html(insertPattern);
                            }
                        });
                    }
                    $ionicLoading.hide();
                },
                "error": function (data) {
                    $ionicLoading.hide();
                    $cordovaToast.show('服务器错误','short','center');
                }
            });

        };


        $scope.refresh= function () {

            //在这儿

            debugger;

            var  number=mappingWeeks($scope.parameter.week);


            var  begin=new Date($scope.parameter.begindate);

           $scope.parameter.currentMonth=new Date(begin.getTime()+(number-1)*7*(24*3600*1000)).getMonth()+1;

            $scope.init();
        }

    }]).
    //课表查询
    controller("classroomCtrl", ["$scope","ionicDatePicker","$ionicPopup","$ionicLoading",function($scope, ionicDatePicker,$ionicPopup,$ionicLoading) {
        var request_data= function(){

            $ionicLoading.show({
                content: '请稍后...',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 200,
                showDelay: 0
            });


            $.ajax({
                "method":"post",
                "dataType":"json",
                "url":$scope.root + "/classroom.php",
                "data":$scope.parameter,
                "success": function (data) {
                    $scope.result.request=data.result;
                    $scope.result.length=data.length;
                    $ionicLoading.hide();
                    if($scope.result.init)
                    {
                        $scope.result.init=false;
                    }
                },
                error: function (data) {
                    $ionicLoading.hide();
                    if($scope.result.init)
                    {
                        $scope.result.init=false;
                    }
                }
            })

        };


        $scope.select= function () {

            if($scope.parameter.datetime.indexOf("请选择")<0)
            {
                request_data();
            }
        }

        $scope.parameter={
            "datetime":"请选择时间",
            "campus":"成都校区",
            "time":"1-2"
        };

        //请求结果
        $scope.result={
            request:null,
            length:0,
            init:true
        };

        var onSelectTime=function(val){
            var date=new Date();

            var _date=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();

            //组装日期
            var  date=new Date(val);

            var year=date.getFullYear();

            var month=date.getMonth()+1;

            var day=date.getDate();

            var assembly=year+"-"+month+"-"+day;

            var compareNow=new Date(_date);

            var select=new Date(assembly);

            if(select<compareNow)
            {
                $ionicPopup.show({
                    title: '时间已过期，请重新选择!!!',
                    scope: $scope,
                    buttons: [{
                        text: '确定',
                        type: 'button-assertive'
                    }]
                });
            }
            else{
                $scope.parameter.datetime=assembly;

                request_data();
            }
        }

        var options = {
            callback: onSelectTime,
            disabledDates: [ //Optional
                // new Date(2016, 2, 16),
                // new Date(2015, 3, 16),
                // new Date(2015, 4, 16),
                // new Date(2015, 5, 16),
                // new Date('Wednesday, August 12, 2015'),
                // new Date("08-16-2016"),
                // new Date(1439676000000)
            ],
            from: new Date(2016, 1, 1), //Optional
            to: new Date(2020, 12, 31), //Optional
            inputDate: new Date(), //Optional
            mondayFirst: false, //Optional
           // disableWeekdays: [], //Optional
            closeOnSelect: false, //Optional
            templateType: 'popup' //Optional
        };

        $scope.openDatePicker = function() {
            ionicDatePicker.openDatePicker(options);
        };

    }])
    //考试查询
    .controller('examCtrl', ["$scope","$stateParams","$state","common","$ionicPopup","$ionicLoading","$cordovaToast","$http",
        function($scope, $stateParams,$state,common, $ionicPopup,$ionicLoading,$cordovaToast,$http) {

        var requestParams={
            sid:null,
            semester:null
        };


        var transform = function(data){
            return $.param(data);
        }

        $scope.init= function () {

            var current_student=common.getLocal("current");

            var current_semester=common.getLocal("semester");

            //如果用户还没有登录，直接重新登录
            if(current_student==undefined)
            {
                $ionicPopup.show({
                    title: '当前登录信息已过期，请重新登录!!!',
                    scope: $scope,
                    buttons: [{
                        text: '确定',
                        type: 'button-assertive'
                    }]
                });
                $state.go("login");
                return ;
            }

            if(current_semester==undefined)
            {
                $ionicPopup.show({
                    title: '请设置当前学期!!!',
                    scope: $scope,
                    buttons: [{
                        text: '确定',
                        type: 'button-assertive'
                    }]
                });
                return ;
            }

            requestParams.sid=current_student.result.sid;

            requestParams.semester=current_semester;

            $ionicLoading.show({
                content: '请求中...',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 200,
                showDelay: 0
            });


            $http({
                url: $scope.root + "/exam.php",
                method:"post",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest: transform,
                data:requestParams
            }).success(function (data) {

                if(data.code==0){
                    $ionicLoading.hide();

                    $scope.parameters.data=data.result;

                    $scope.parameters.length=data.length;
                }
            }).error(function () {
                $ionicLoading.hide();
                $cordovaToast.show('服务器错误','short','center');
            });
        };

        $scope.parameters={
            data:null,
            length:0
        };
    }])
    //教师查询
    .controller("textbookCtrl", ["$scope","$ionicPopup","$ionicLoading","$cordovaToast","$http",function($scope,$ionicPopup,$ionicLoading,$cordovaToast,$http) {


    $scope.parameter={
        init:true,
        teachername:"",
        request:[]
    };


    $scope.search= function () {


        var transform = function(data){
            return $.param(data);
        }

        $ionicLoading.show({
            content: '加载中...',
            animation: 'fade-in',
            showBackdrop: false,
            maxWidth: 200,
            showDelay: 0
        });

        $scope.parameter.init=false;

        $http({
            url: $scope.root + "/teacher.php",
            method:"post",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transform,
            data: {
                "teachername":$scope.parameter.teachername
            }
        }).success(function (data) {

            $scope.parameter.request=data.result;

            $ionicLoading.hide();

        }).error(function () {
            $ionicLoading.hide();
            $cordovaToast.show('服务器错误','short','center');
        });

    }
    }])
    //通知查询
    .controller("informCtrl", ["$scope","$cordovaToast","$ionicLoading","$sce","$http",function($scope,$cordovaToast,$ionicLoading,$sce,$http) {
        $scope.parameter={
            length:-1,
            data:null
        };


        $scope.init= function () {

            $ionicLoading.show({
                content: '加载中...',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 200,
                showDelay: 0
            });

            $.ajax({
                "url":$scope.root + "/informcount.php",
                "method":"post",
                "data":null,
                "dataType":"JSON",
                "async":false,
                "success": function (data) {
                    $scope.parameter.length=data.length;

                    console.log( $scope.parameter);
                },
                "error": function (data) {
                    $ionicLoading.hide();
                    $cordovaToast.show('服务器错误','short','center');
                }
            });


            $("#pagination").paginator({
                url: $scope.root +"/inform.php?offset=",
                pageParent: "#pagination",
                totalBars: $scope.parameter.length,
                limit: 10,
                offset: 1,
                callback: function (data) {

                    console.log(data);
                    $scope.parameter.data=data.result;

                    $ionicLoading.hide();
                }
            });

           /* $http({
                url: $scope.root + "/inform.php",
                method:"post"
            }).success(function (data) {
                console.log(data);

                $ionicLoading.hide();
            }).error(function () {
                $ionicLoading.hide();
                $cordovaToast.show('服务器错误','short','center');
            });*/
        }
    }])
    //校历查询
    .controller("calendarCtrl", ["$scope","$cordovaToast","$ionicLoading","$http",function($scope,$cordovaToast,$ionicLoading,$http) {


        var transform = function(data){
            return $.param(data);
        }

        var requestData=function(callback){

            $http({
                url: $scope.root + "/calendar.php",
                method:"post",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest: transform,
                data: {
                    "year":parseInt($scope.selectParames.year),
                    "month":parseInt($scope.selectParames.month)
                }
            }).success(function (data) {

                $scope.parameter.request=data.result;

                console.log(data);

                if(typeof(callback)=="function")
                {
                    callback();
                }

                $ionicLoading.hide();

            }).error(function () {
                $ionicLoading.hide();
                $cordovaToast.show('服务器错误','short','center');
            });

        };



        //获取每个月的天数
        var getTotal= function (parame) {
            var total;
            switch(parame.month){
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                case 12:
                    total=31;
                    break;
                case 4:
                case 6:
                case 9:
                case 11:
                    total=30;
                    break;
                default:
                    if((parame.year%100==0&&parame.year%400==0)||parame.year%4==0)
                    {
                        total=29;
                    }
                    else{
                        total=28;
                    }
            }
            return total;
        };
        //获取上个月
        var getPreMonth= function () {

            var date=new Date();

            var month=date.getMonth()+1;

            var year=date.getFullYear();

            if(month==1)
            {
               return  {
                   year:year-1,
                   month:12
               };
            }

            return {
                year:year,
                month:month-1
            };

        }
        //获取下个月
        var getNextMonth= function () {
            var date=new Date();

            var month=date.getMonth()+1;

            var year=date.getFullYear();

            if(month==12)
            {
                return  {
                    year:year+1,
                    month:1
                };
            }

            return {
                year:year,
                month:month+1
            };
        };

        var renderCalendar=  function(parameter){



            var tool=new Date();

            tool.setYear(parameter.year);

            var  temp=parameter.month-1;

            tool.setMonth(temp);

            tool.setDate(1);

            var operate=new Date(tool);

            //开始渲染当前日期
            var date=1;

            var currentTotal=getTotal({year:parameter.year,month:parameter.month});
            //getTotal({year:operate.getFullYear(),month:(operate.getMonth()+1)});

            if(operate.getDay()==0){
                //第一行整行渲染成上个月
                var preTotal= getTotal(getPreMonth());
                var next=1;
                //把之前的渲染成已过期
                for(var i=preTotal,j=6;j>=0;j--,i--)
                {
                    $(".calendar-row").eq(1).children().eq(j).addClass("date-disable").find(".calendar-date").html(i);
                    //判断i
                }
                //渲染中间的4行
                for(var i= 2;i<6;i++)
                {
                    for(var k=0;k<7;k++)
                    {
                        $(".calendar-row").eq(i).children().eq(k).find(".calendar-date").html(date++);
                        //判断date
                    }
                }
                //渲染结尾date++,
                for(var i=0;i<7;i++)
                {
                   // debugger;

                    if(date<=currentTotal)
                    {
                        $(".calendar-row").eq(6).children().eq(i).find(".calendar-date").html(date++);
                        //判断date
                    }
                    else
                    {
                        $(".calendar-row").eq(6).children().eq(i).addClass("date-disable").find(".calendar-date").html(next++);
                        //判断next
                    }
                }
            }
            else{
                //不整行渲染

                var preTotal= getTotal(getPreMonth());

                var  date=1;

                var next=1;

                //把之前的渲染成已过期
                for(var i=preTotal,j=operate.getDay()-1;j>=0;j--,i--)
                {
                    $(".calendar-row").eq(1).children().eq(j).addClass("date-disable").find(".calendar-date").html(i);
                    //判断i
                }

                for(var i=operate.getDay();i<7;i++)
                {
                    $(".calendar-row").eq(1).children().eq(i).find(".calendar-date").html(date);
                    //判断date
                    date++;
                }

                //渲染中间的4行
                for(var i= 2;i<7;i++)
                {
                    for(var k=0;k<7;k++)
                    {
                        $(".calendar-row").eq(i).children().eq(k).find(".calendar-date").html(date++);
                        // 如果第一行是整行，那么，是不会出现，还没有渲染完了就超过日期了的情况
                         if(date>currentTotal){
                         //把该做的事情做完，就行了
                             for(var n=k+1;n<7;n++)
                             {
                                 $(".calendar-row").eq(i).children().eq(n).addClass("date-disable").find(".calendar-date").html(next++);
                                 //判断next
                             }
                             //如果搞到了最后的一行上去，那么就不用进行第二行渲染了
                             if(i<6)
                             {
                                 for(var n=0;n<7;n++)
                                 {
                                     $(".calendar-row").eq(6).children().eq(n).addClass("date-disable").find(".calendar-date").html(next++);
                                     //判断next
                                 }
                             }
                            renderEvent();
                            return;
                         }
                    }
                }
            }

            renderEvent();

        };


        var  renderEvent= function () {
            if($scope.parameter.request!=null&&$scope.parameter.request.length>0){
                $(".cbody-item").each(function () {
                    if (!$(this).hasClass("date-disable")) {
                        var date = $(this).find(".calendar-date").html();
                        for (var i = 0; i < $scope.parameter.request.length; i++) {
                            if ($scope.parameter.request[i].dateday == date) {
                                $(this).addClass("calendar-activity").find(".calendar-noevent").addClass("calendar-event").removeClass("calendar-noevent").html($scope.parameter.request[i].event_tick);
                            }
                        }
                    }
                });
            }
        };


        var  clear= function () {

            $(".cbody-item").each(function () {
                $(this).removeClass("date-disable").removeClass("calendar-activity");
            });

            $(".cbody-item").find(".calendar-event").removeClass("calendar-event").addClass("calendar-noevent");
        };

        $scope.selectParames={
            week:0,
            year:new Date().getFullYear()+"年",
            month:(new Date().getMonth()+1)+"月"
        };

        $scope.parameter={

        };

        $scope.rerenderCalendar= function () {
            $ionicLoading.show({
                content: '加载中...',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 200,
                showDelay: 0
            });

            var year=parseInt($scope.selectParames.year);

            var month=parseInt($scope.selectParames.month);

            clear();

            requestData(function () {
                renderCalendar({"year":year,"month":month});
            });
        };


        $scope.initCalendar= function () {

            $ionicLoading.show({
                content: '加载中...',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 200,
                showDelay: 0
            });

            var year=parseInt($scope.selectParames.year);

            var month=parseInt($scope.selectParames.month);

            clear();

            requestData(function () {
                renderCalendar({"year":year,"month":month});
            });
        };
    }]).
    //成绩查询
    controller("gradeCtrl", ["$scope","common","$ionicLoading","$cordovaToast",function($scope,common,$ionicLoading,$cordovaToast) {

        //结果
        $scope.result={
            data:null
        };

        //参数
        $scope.parameters={
            semester:'2016-2017-2',
            stuid:null
        };

        $scope.init= function () {
                //准备当前的学生的ID
            $scope.parameters.stuid=common.getLocal("current").result.sid;


            $ionicLoading.show({
                content: '加载中...',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 200,
                showDelay: 0
            });


            $.ajax({
                "url": $scope.root + "/grade.php",
                "method": "POST",
                "dataType": "JSON",
                "data": $scope.parameters,
                "success": function(data) {
                    $ionicLoading.hide();

                    $scope.result.data=data.result;

                    console.log(data);

                },
                "error": function(data) {
                    $ionicLoading.hide();
                    $cordovaToast.show('查找失败，请检查您的网络连接', 'short', 'center');
                }
            });
        }

        $scope.change= function () {



            $ionicLoading.show({
                content: '加载中...',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 200,
                showDelay: 0
            });


            $.ajax({
                "url": $scope.root + "/grade.php",
                "method": "POST",
                "dataType": "JSON",
                "data": $scope.parameters,
                "success": function(data) {
                    $ionicLoading.hide();

                    $scope.result.data=data.result;

                    console.log(data);

                },
                "error": function(data) {
                    $ionicLoading.hide();
                    $cordovaToast.show('查找失败，请检查您的网络连接', 'short', 'center');
                }
            });


        }
    }]).
    //电话查询
    controller("telephoneCtrl", ["$scope","$ionicLoading","$cordovaToast",function($scope,$ionicLoading,$cordovaToast) {


        $scope.parameter={
            data:null
        };

        $scope.init= function () {

            $ionicLoading.show({
                content: '加载中...',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 200,
                showDelay: 0
            });

            $.ajax({
                "url": $scope.root + "/telephone.php",
                "method": "POST",
                "dataType": "JSON",
                "data": null,
                "async":false,
                "success": function(data) {
                    $ionicLoading.hide();

                    $scope.parameter.data=data.result;


                    console.log($scope.parameter.data);

                },
                "error": function(data) {
                    $ionicLoading.hide();
                    $cordovaToast.show('查找失败，请检查您的网络连接', 'short', 'center');
                }
            });




        }


    }]).
    //图书查询
controller("libraryCtrl", ["$scope","$cordovaToast","$ionicLoading",function($scope,$cordovaToast,$ionicLoading) {


        $scope.ctrl=$scope;

        $scope.digest=false;

        $scope.parameter={
            keyword:""
        };

        $scope.result={
            length:-1,
            data:{

            },
            digest:false
        };

        //查询控制器
        $scope.search=function(){
            $ionicLoading.show({
                content: '请稍后...',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 200,
                showDelay: 0
            });

            $.ajax({
                "url": $scope.root + "/library.php",
                "method": "POST",
                "dataType": "JSON",
                "data": $scope.parameter,
                "success": function(data) {
                    $ionicLoading.hide();
                    $scope.result.length=data.length;

                    $scope.result.data=data.result;

                    console.log(data);

                },
                "error": function(data) {
                    $ionicLoading.hide();
                    $cordovaToast.show('查找失败，请检查您的网络连接', 'short', 'center');
                }
            });

            $scope.result.digest=true;
        }




    }]).
    //一卡通
controller("cardCtrl", function($scope) {

    }).
    //跳蚤市场
controller("marketCtrl", function($scope) {

    }).
    //文件概览
controller("fileCtrl", ["$scope","$cordovaToast","$ionicLoading","$http",function($scope,$cordovaToast,$ionicLoading,$http) {


       $scope.parameter={
           data:null,
           length:-1
       };


       $scope.init= function () {

           $ionicLoading.show({
               content: '加载中...',
               animation: 'fade-in',
               showBackdrop: false,
               maxWidth: 200,
               showDelay: 0
           });


           $.ajax({
               "url":$scope.root + "/filescount.php",
               "method":"post",
               "data":null,
               "dataType":"JSON",
               "async":false,
               "success": function (data) {
                   $scope.parameter.length=data.length;
               },
               "error": function (data) {
                   $ionicLoading.hide();
                   $cordovaToast.show('服务器错误','short','center');
               }
           });



           $("#pagination").paginator({
               url: $scope.root +"/files.php?offset=",
               pageParent: "#pagination",
               totalBars: $scope.parameter.length,
               limit: 10,
               offset: 1,
               callback: function (data) {

                   $scope.parameter.data=data.result;

                   $ionicLoading.hide();
               }
           });



       };





}]).
controller("mapCtrl", ["$scope","$cordovaToast",function($scope,$cordovaToast) {

        $scope.parameter={
            "keyword":"",
            "mapContext":null
        }

        try{
            $scope.parameter.mapContext = new BMap.Map("map"); // 创建Map实例

            $scope.parameter.mapContext.centerAndZoom(new BMap.Point(98.240119, 39.850774), 11); // 初始化地图,设置中心点坐标和地图级别

            $scope.parameter.mapContext.setCurrentCity("嘉峪关市"); // 设置地图显示的城市 此项是必须设置的

            $scope.parameter.mapContext.enableScrollWheelZoom(true);

            var navigationControl = new BMap.NavigationControl({
                // 靠左上角位置
                anchor: BMAP_ANCHOR_TOP_LEFT,
                // LARGE类型
                type: BMAP_NAVIGATION_CONTROL_LARGE,
                // 启用显示定位
                enableGeolocation: true
            });

            $scope.parameter.mapContext.addControl(navigationControl);

        }
        catch (exception){
            $cordovaToast.show('无法访问网络!','short','center');
        }

        $scope.search= function () {
            var local = new BMap.LocalSearch($scope.parameter.mapContext, {
                renderOptions:{map: $scope.parameter.mapContext}
            });

            local.search($scope.parameter.keyword);
        }








    }]).
    //校车查询
controller("busCtrl", function($scope) {

}).
controller("onlineCtrl", function($scope) {

    }).
    //反馈
controller("feedbackCtrl", ["$scope", "$cordovaToast", "common", "$ionicPopup", "$ionicLoading", "$state", function($scope, $cordovaToast, common, $ionicPopup, $ionicLoading, $state) {
        $scope.currentUser = common.getLocal("current");;



        $scope.submitParameters = {
            "sname": $scope.currentUser.result.sname,
            "snumber": $scope.currentUser.result.snumber,
            "smajor": $scope.currentUser.result.smajor,
            "stelephone": $scope.currentUser.result.stelephone,
            "message": ""
        }


        $scope.submit = function() {
            //如果没有填写用户反馈信息
            if ($scope.submitParameters.message == "") {
                $ionicPopup.show({
                    title: '请填写反馈信息',
                    scope: $scope,
                    buttons: [{
                        text: '确定',
                        type: 'button-assertive'
                    }]
                });
                return;
            }

            $ionicLoading.show({
                content: '提交中...',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 200,
                showDelay: 0
            });

            $.ajax({
                "url": $scope.root + "/feedback.php",
                "method": "POST",
                "dataType": "JSON",
                "data": $scope.submitParameters,
                "success": function(data) {
                    $ionicLoading.hide();

                    var call = $ionicPopup.show({
                        title: '提交成功!',
                        //subTitle: '请输入用户信息!',
                        scope: $scope,
                        buttons: [{
                            text: '确定',
                            type: 'button-assertive'
                        }]
                    });

                    call.then(function(res) {
                        $state.go("app.main");
                    });

                },
                "error": function(data) {
                    $ionicLoading.hide();
                    $cordovaToast.show('提交失败，请检查您的网络连接', 'short', 'center');
                }
            });
        }
    }])
    //登录
.controller('loginCtrl', ["$scope", "$state", "$http", "$ionicLoading", "$ionicPopup", "$cordovaToast", "common",
        function($scope, $state, $http, $ionicLoading, $ionicPopup, $cordovaToast, common) {
            // $scope.ctrl = $scope;
            $scope.login = {
                "username": "",
                "password": "",
                isRememberMe:false
            };

            $scope.test={
                val:window.devicePixelRatio
            };

            var isRemember = common.getLocal('remember');

            if(isRemember!=null&&isRemember!=undefined&&isRemember.isRememberMe==true)
            {
                $scope.login=isRemember;

            }

            //清空当前信息
           // common.setLocal('current',null);

            $scope.loginAction = function() {

                var transform = function(data){
                    return $.param(data);
                }

                if ($scope.login.username == "" || $scope.login.password == "") {
                    $ionicPopup.show({
                        title: '请填写登录信息',
                        //subTitle: '请输入信息!',
                        scope: $scope,
                        buttons: [{
                            text: '确定',
                            type: 'button-assertive'
                        }]
                    });
                    return;
                }

                $ionicLoading.show({
                    content: '登录中...',
                    animation: 'fade-in',
                    showBackdrop: false,
                    maxWidth: 200,
                    showDelay: 0
                });


                $http({
                    url: $scope.root + "/login.php",
                    method:"post",
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    transformRequest: transform,
                    data:  {
                        "username": $scope.login.username,
                        "password": $scope.login.password
                    }
                }).success(function (data) {
                    if (data.code == -2) {
                        $ionicLoading.hide();

                        $ionicPopup.show({
                            title: '请填写登录信息',
                            //subTitle: '请输入用户信息!',
                            scope: $scope,
                            buttons: [{
                                text: '确定',
                                type: 'button-assertive'
                            }]
                        });
                    } else if (data.code == -1) {

                        $ionicLoading.hide();

                        $ionicPopup.show({
                            title: '密码错误，请检查重新登录',
                            //subTitle: '!',
                            scope: $scope,
                            buttons: [{
                                text: '确定',
                                type: 'button-assertive'
                            }]
                        });
                    } else {
                        //缓存信息
                        common.setLocal("current", data);

                        common.setLocal('remember',$scope.login);


                        $ionicLoading.hide();

                        $state.go("app.main");
                    }
                }).error(function () {
                    $ionicLoading.hide();
                    $cordovaToast.show('服务器错误','short','center');
                });
            }
        }
    ]).

controller("settingCtrl", ["$scope","$state","common","ionicDatePicker",function($scope, $state,common,ionicDatePicker) {

        var onSelectTime=function(val){

            var  date=new Date(val);

            var year=date.getFullYear();

            var month=date.getMonth()+1;

            var day=date.getDate();

            var assembly=year+"-"+month+"-"+day;

            common.setLocalStorage("begindate", assembly);

            $scope.parameters.begindate=assembly;
        }

        var options = {
            callback: onSelectTime,
            disabledDates: [ //Optional
                // new Date(2016, 2, 16),
                // new Date(2015, 3, 16),
                // new Date(2015, 4, 16),
                // new Date(2015, 5, 16),
                // new Date('Wednesday, August 12, 2015'),
                // new Date("08-16-2016"),
                // new Date(1439676000000)
            ],
            from: new Date(2016, 1, 1), //Optional
            to: new Date(2020, 12, 31), //Optional
            inputDate: new Date(), //Optional
            mondayFirst: false, //Optional
            // disableWeekdays: [], //Optional
            closeOnSelect: false, //Optional
            templateType: 'popup' //Optional
        };

        $scope.openDatePicker = function() {
            ionicDatePicker.openDatePicker(options);
        };

        //设置学期开始的时间
        $scope.parameters={
            begindate: common.getLocal("begindate")||'暂未设置'
        };

       //默认设置为这个学期
       var currentSemester=$("#select").val();

       common.setLocal("semester", currentSemester);

        //当下拉选项改变的时候，设置学期
        $("#select").bind("change",function(){

            var currentSemester=$("#select").val();

            common.setLocal("semester",currentSemester);
        })
}]).
//详细信息
controller("messageCtrl", ["$stateParams","$scope","$state", "$cordovaToast","$ionicLoading","$http","$sce",
        function($stateParams,$scope, $state,$cordovaToast,$ionicLoading,$http,$sce) {
        $scope.parameter={
            id:$stateParams.id,
            data:null
        };

        var transform = function(data){
            return $.param(data);
        }

        $scope.init= function () {


            $ionicLoading.show({
                content: '加载中...',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 200,
                showDelay: 0
            });


            $http({
                url: $scope.root + "/newsdetail.php",
                method:"post",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest: transform,
                data:  {
                    id:$stateParams.id
                }
            }).success(function (data) {

                $ionicLoading.hide();

                $scope.parameter.data=data.result;

                $scope.parameter.data.newscontent=$sce.trustAsHtml($scope.parameter.data.newscontent);

                console.log($scope.parameter.data);

            }).error(function () {
                $ionicLoading.hide();
                $cordovaToast.show('服务器错误','short','center');
            });


        };







}]).
controller("aboutmeCtrl", ["$scope", "$state", "common","$ionicPopup",function($scope, $state, common, $ionicPopup) {
    //从缓存中读取信息，提升效率
        $scope.init=function(){

            $scope.currentUser=common.getLocal('current');


            if( $scope.currentUser==null|| $scope.currentUser==undefined)
            {

                $ionicPopup.show({
                    title: '登录信息已过期或未登录',
                    //subTitle: '请输入用户信息!',
                    scope: $scope,
                    buttons: [{
                        text: '确定',
                        type: 'button-assertive',
                        onTap:function (e) {
                            $state.go("login");
                        }
                    }]
                });
            }
        }
}]).
controller("teacherinfoCtrl", ["$stateParams","$scope","$cordovaToast","$ionicLoading","$http",
        function ($stateParams,$scope,$cordovaToast,$ionicLoading,$http) {

        $scope.parameter={
            tid:$stateParams.id,
            request:null
        }

        $scope.init= function () {

            var transform = function(data){
                return $.param(data);
            }

            $ionicLoading.show({
                content: '加载中...',
                animation: 'fade-in',
                showBackdrop: false,
                maxWidth: 200,
                showDelay: 0
            });

            $http({
                url: $scope.root + "/teacherdetail.php",
                method:"post",
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                transformRequest: transform,
                data: {
                    "tid":$scope.parameter.tid
                }
            }).success(function (data) {

                $scope.parameter.request=data.result;

                console.log($scope.parameter.request);

                $ionicLoading.hide();

                console.log(data);

            }).error(function () {
                $ionicLoading.hide();
                $cordovaToast.show('服务器错误','short','center');
            });
        }
}]).
controller("fileDetailCtrl",["$stateParams","$scope","$state", "$cordovaToast","$ionicLoading","$http","$sce",
        function ($stateParams,$scope, $state,$cordovaToast,$ionicLoading,$http,$sce) {


            $scope.parameter={
                id:$stateParams.id,
                data:null
            };

            var transform = function(data){
                return $.param(data);
            }

            $scope.init= function () {


                $ionicLoading.show({
                    content: '加载中...',
                    animation: 'fade-in',
                    showBackdrop: false,
                    maxWidth: 200,
                    showDelay: 0
                });


                $http({
                    url: $scope.root + "/filesdetail.php",
                    method:"post",
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    transformRequest: transform,
                    data:  {
                        id:$stateParams.id
                    }
                }).success(function (data) {

                    $ionicLoading.hide();

                    $scope.parameter.data=data.result;

                    $scope.parameter.data.newscontent=$sce.trustAsHtml($scope.parameter.data.newscontent);


                }).error(function () {
                    $ionicLoading.hide();
                    $cordovaToast.show('服务器错误','short','center');
                });
            };
        }]);
