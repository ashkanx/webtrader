$(document).ready(function(){$(function(){$("#menu").menu()})}),define(["jquery","jquery-ui","websockets/symbol_handler"],function(a,b,c){"use strict";function d(b){require(["validation/validation"],function(c){require(["charts/chartWindow"],function(d){if(!c.validateIfNoOfChartsCrossingThreshold(d.totalWindows()))return void require(["jquery","jquery-growl"],function(a){a.growl.error({message:"No more charts allowed!"})});var f=a("#instrumentsDialog").dialog("option","title"),g=a("#instrumentsDialog").data("symbol"),h=a("#instrumentsDialog").data("delay_amount");require(["common/util"],function(){var i=convertToTimeperiodObject(b);i?c.validateNumericBetween(i.intValue(),parseInt(a("#timePeriod").attr("min")),parseInt(a("#timePeriod").attr("max")))?h<=i.timeInSeconds()/60?(d.addNewWindow(g,f,b,null,isTick(b)?"line":"candlestick"),e.call(a("#instrumentsDialog"))):require(["jquery","jquery-growl"],function(a){a("#timePeriod").addClass("ui-state-error"),a.growl.error({message:"Charts of less than "+convertToTimeperiodObject(h+"m").humanReadableString()+" are not available for the "+f+"."})}):require(["jquery","jquery-growl"],function(a){a("#timePeriod").addClass("ui-state-error"),a.growl.error({message:"Only numbers between "+a("#timePeriod").attr("min")+" to "+a("#timePeriod").attr("max")+" is allowed for "+a("#units option:selected").text()+"!"})}):require(["jquery","jquery-growl"],function(a){a("#timePeriod").addClass("ui-state-error"),a.growl.error({message:"Only numbers between 1 to 100 is allowed!"})})})})})}function e(){a(this).dialog("close"),a(this).find("*").removeClass("ui-state-error")}function f(b,c){a.each(c,function(c,g){var h=a("<li>").append(g.display_name).data("symbol",g.symbol).data("delay_amount",g.delay_amount).appendTo(b);if(g.submarkets||g.instruments){h.click(function(a){return a.preventDefault(),!1});var i=a("<ul>");i.appendTo(h),f(i,g.submarkets||g.instruments)}else h.click(function(){0==a("#instrumentsDialog").length?a.get("instruments/instruments.html",function(b){a(b).css("display","none").appendTo("body"),a("#standardPeriodsButtonContainer").find("button").click(function(){d(a(this).attr("id"))}).button(),a("#units").change(function(){"t"==a(this).val()?a("#timePeriod").val("1").attr("disabled","disabled").attr("min",1).attr("max",1):(a("#timePeriod").removeAttr("disabled"),"m"==a("#units").val()?a("#timePeriod").attr("max",50):"h"==a("#units").val()?a("#timePeriod").attr("max",23):a("#timePeriod").attr("max",120))}),a("#instrumentsDialog").dialog({autoOpen:!1,resizable:!1,width:260,my:"center",at:"center",of:window,buttons:[{text:"Ok",click:function(){d(a("#timePeriod").val()+a("#units").val())}},{text:"Cancel",click:function(){e.call(this)}}]}),a("#instrumentsDialog").dialog("option","title",h.text()).data("symbol",h.data("symbol")).data("delay_amount",h.data("delay_amount")),a("#instrumentsDialog").dialog("open"),a("#instrumentSelectionMenuDIV").hide()}):(a("#instrumentsDialog").dialog("option","title",a(this).text()).data("symbol",a(this).data("symbol")).data("delay_amount",a(this).data("delay_amount")),a("#instrumentsDialog").dialog("open"),a("#instrumentSelectionMenuDIV").hide()),a(document).click()})})}var g=[];return{init:function(){a.isEmptyObject(g)&&(loadCSS("instruments/instruments.css"),c.fetchMarkets(function(b){if(!a.isEmptyObject(b)){g=b;var c=a(".mainContainer").find(".instruments"),d=a("<ul>");d.appendTo(c),f(d,b),d.menu()}}))},getMarketData:function(){return g},isMarketDataPresent:function(b,c){var d=!1;c||(c=g);var e=this;return a.each(c,function(c,f){return f.submarkets||f.instruments?d=e.isMarketDataPresent(b,f.submarkets||f.instruments):a.trim(f.display_name)==a.trim(b)&&(d=!0),!d}),d},getSpecificMarketData:function(b,c){var d={};c||(c=g);var e=this;return a.each(c,function(c,f){return f.submarkets||f.instruments?d=e.getSpecificMarketData(b,f.submarkets||f.instruments):a.trim(f.display_name)==a.trim(b)&&(d=f),a.isEmptyObject(d)}),d}}});