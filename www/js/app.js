// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', "starter.service"])

.run(function($ionicPlatform, $ionicHistory, $ionicViewSwitcher, common, $state,$location,$ionicPopup,$rootScope) {

        $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }

        setTimeout(function () {
            navigator.splashscreen.hide();
        }, 1000);

        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        //判断是否是第一次进入应用程序，如果不是，那么读取不到标记，则设置标记
    });


        $ionicPlatform.registerBackButtonAction(function (e){
            //阻止默认的行为
            e.preventDefault();
            // 退出提示框
            function showConfirm() {
                var servicePopup = $ionicPopup.show({
                    title: '提示',
                    subTitle: '你确定要退出应用吗？',
                    scope: $rootScope,
                    buttons: [
                        {
                            text: '取消',
                            type: 'button-clear button-assertive',
                            onTap: function () {
                                return 'cancel';
                            }
                        },
                        {
                            text: '确认',
                            type: 'button-clear button-assertive border-left',
                            onTap: function (e) {
                                return 'active';
                            }
                        },
                    ]
                });
                servicePopup.then(function (res) {
                    if (res == 'active') {
                        // 退出app
                        ionic.Platform.exitApp();
                    }
                });
            }
            // 判断当前路由是否为各个导航栏的首页，是的话则显示提示框
            if ($location.path() == '/app/main' ||$location.path()=="/login") {
                showConfirm();
            } else  if($ionicHistory.backView()) {
                $ionicHistory.goBack();
            } else if($location.path() == '/app/setting' ||$location.path()=="/app/aboutme"){

                $state.go("app.main");

               // showConfirm();
            }
            return false;
        }, 101);

})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, ionicDatePickerProvider) {

    //将tabs放到下面
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('bottom');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');

    //更改返回图标ion-chevron-left
    $ionicConfigProvider.platform.ios.backButton.previousTitleText('返回').icon('ion-chevron-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('返回').icon('ion-chevron-left');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');


    var datePickerObj = {
        inputDate: new Date(),
        titleLabel: '请选择',
        setLabel: '确定',
        todayLabel: '今天',
        closeLabel: '关闭',
        mondayFirst: false,
        weeksList: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        monthsList: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9", "10月", "11月", "12月"],
        templateType: 'popup',
        from: new Date(2012, 8, 1),
        to: new Date(2018, 8, 1),
        showTodayButton: true,
        dateFormat: 'dd MMMM yyyy',
        closeOnSelect: false,
        disableWeekdays: []
    };


    ionicDatePickerProvider.configDatePicker(datePickerObj);





    //$ionicConfigProvider.views.transition('none');

    $stateProvider
    //app欢迎页面
        .state("start", {
            url: '/start',
            templateUrl: 'templates/start.html',
            controller: 'startCtrl'
        })
        //父视图
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'AppCtrl'
        })
        //登录状态
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl'
        })
        //主界面
        .state('app.main', {
            url: '/main',
            views: {
                'main': {
                    templateUrl: 'templates/main.html',
                    controller: 'MainCtrl'
                }
            }
        })

    .state('app.aboutme', {
            url: '/aboutme',
            views: {
                'aboutme': {
                    templateUrl: 'templates/aboutme.html',
                    controller: 'aboutmeCtrl'
                }
            }
        }).
        //设置学生个人信息
    state('app.setting', {
        url: '/setting',
        views: {
            'setting': {
                templateUrl: 'templates/setting.html',
                controller: 'settingCtrl'
            }
        }
    }).

    //教室查询
    state('app.classroom', {
            url: '/classroom',
            views: {
                'main': {
                    templateUrl: 'templates/classroom.html',
                    controller: "classroomCtrl"
                }
            }
        })
        //课表查询
        .state('app.schedule', {
            url: '/schedule',
            views: {
                'main': {
                    templateUrl: 'templates/schedule.html',
                    controller: "scheduleCtrl"
                }
            }
        })

    //考试查询
    .state('app.exam', {
            url: '/exam',
            views: {
                'main': {
                    templateUrl: 'templates/exam.html',
                    controller: 'examCtrl'
                }
            }
        }).
        //教材查询
    state('app.textbook', {
            url: '/textbook',
            views: {
                'main': {
                    templateUrl: 'templates/textbook.html',
                    controller: 'textbookCtrl'
                }
            }
        }).
        //通知信息
    state("app.inform", {
            url: '/inform',
            views: {
                'main': {
                    templateUrl: 'templates/inform.html',
                    controller: 'informCtrl'
                }
            }
        }).
        //校历查询
    state('app.calendar', {
            url: '/calendar',
            views: {
                'main': {
                    templateUrl: 'templates/calendar.html',
                    controller: 'calendarCtrl'
                }
            }
        }).
        //成绩查询
    state('app.grade', {
            url: '/grade',
            views: {
                'main': {
                    templateUrl: 'templates/grade.html',
                    controller: 'gradeCtrl'
                }
            }
        }).
        //电话查询
    state("app.telephone", {
        url: '/telephone',
        views: {
            'main': {
                templateUrl: 'templates/telephone.html',
                controller: 'telephoneCtrl'
            }
        }
    }).


    //图书查询
    state("app.library", {
            url: '/library',
            views: {
                'main': {
                    templateUrl: 'templates/library.html',
                    controller: 'libraryCtrl'
                }
            }
        }).
        //一卡通
    state("app.card", {
        url: '/card',
        views: {
            'main': {
                templateUrl: 'templates/card.html',
                controller: 'cardCtrl'
            }
        }
    }).

    //跳蚤市场
    state("app.market", {
            url: '/market',
            views: {
                'main': {
                    templateUrl: 'templates/market.html',
                    controller: 'marketCtrl'
                }
            }
        }).
        //文件概览
    state("app.file", {
            url: '/file',
            views: {
                'main': {
                    templateUrl: 'templates/file.html',
                    controller: 'fileCtrl'
                }
            }
        }).
        //校内地图
    state("app.map", {
            url: '/map',
            views: {
                'main': {
                    templateUrl: 'templates/map.html',
                    controller: 'mapCtrl'
                }
            }
        }).
        //校车查询
    state("app.bus", {
        url: '/bus',
        views: {
            'main': {
                templateUrl: 'templates/bus.html',
                controller: 'busCtrl'
            }
        }
    }).

    state("app.online", {
            url: '/online',
            views: {
                'main': {
                    templateUrl: 'templates/online.html',
                    controller: 'onlineCtrl'
                }
            }
        }).
        //反馈信息
    state("app.feedback", {
        url: '/feedback',
        views: {
            'main': {
                templateUrl: 'templates/feedback.html',
                controller: 'feedbackCtrl'
            }
        }
    }).



    state('app.message', {
        url: "/detail/:id",
        views: {
            'main': {
                templateUrl: 'templates/detail.html',
                controller: 'messageCtrl'
            }
        }
    }).
    state("app.filesdetail",{
        url:"/filesdetail/:id",
        views:{
           'main':{
               templateUrl: 'templates/filesdetail.html',
               controller: 'fileDetailCtrl'
           }
        }
     }).


    state("app.teacherinfo",{
            url:"/teacherinfo/:id",
            views:{
                'main': {
                    templateUrl: 'templates/teacherinfo.html',
                    controller: 'teacherinfoCtrl'
                }
            }
        });

    // if none of the above states are matched, use this as the fallback
    // $urlRouterProvider.otherwise('/login');

    $urlRouterProvider.otherwise('/login');
});