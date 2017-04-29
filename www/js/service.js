'use strict';

angular.module("starter.service", []).
factory("common", ["$http", "$window", function($http, $window) {
    return {
        setLocal: function(key, value) {
            window.localStorage[key] = JSON.stringify(value);
        },
        getLocal: function(key) {
            return eval("(" + window.localStorage[key] + ")");
        },
        setLocalStorage: function (key,value) {
            window.localStorage[key] = JSON.stringify(value);
        },
        getLocalStorage: function (key) {
            return eval("(" + window.localStorage[key] + ")");
        },
        putStartUp: function() {
            localStorage.setItem("startup", "init");
        },
        getStartUp: function() {
            return localStorage.getItem("startup");
        }
    }
}]);