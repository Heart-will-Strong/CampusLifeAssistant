'use strict';
angular.module("starter.filters", [])
    .filter("gender", function() {
        return function(input) {
            return parseInt(input) == 0 ? "男" : "女";
        }
    }).filter("campus", function () {

        var campusText=["市北校区","黄岛校区","临沂校区"];

        return function(input){

            var code= parseInt(input);

            return  code<0||code>2?"未知校区":campusText[code];

        }


    }).filter("formate", function () {

        return function(input){
            var strPattern=["周日","周一","周二","周三","周四","周五","周六"];
            var date=new Date(input);
            return  input+" "+strPattern[date.getDay()];
        }
    }).filter("cuttime",function(){
        return function(input){
            return  input.split(' ')[0];
        }
    });