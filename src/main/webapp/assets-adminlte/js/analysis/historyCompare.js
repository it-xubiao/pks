var colors = ['#ff4d4d','#73b9ff','#ff00ff','#ff8000','#00aa00','#ff5c26','#0080ff','#9999ff','#b5c334','#fcce10'];

function top_data(names,values,colors,div_id,unit){
	$("#"+div_id).empty();
    for(var i=values.length-1;i>=0;i--){
    	var width = values[i]/values[values.length-1] * 100;
    	var view = unit == "元"?values[i]/100:values[i];
    	var str = '<div class="clearfix">'+
        			'<span style="color:black;font-size:15px;">'+names[i]+'</span>'+
        			'<small  style="color:black;float:right;font-size:15px;">' + view + unit + '</small>'+
        		   '</div>'+
        		   '<div class="progress xs">'+
        		   	' <div class="progress-bar progress-bar-red" style="width:'+ width +'%;background-color:'+colors[i]+';"></div>'+
        		   ' </div>';
    	$("#"+div_id).append(str);
    }
}

//显示利用率对比图
function historyLly(){
	var startDate = $('#parkDayStartDate').val();
  	var endDate = $('#parkDayEndDate').val();
  	 var regionId = $("#regionId").combotree("getValue");
  	 var showNum = 10;
   	$.ajax({
   		type : "post",
   		async : false, //同步执行  
   		url : "/spms/action/parkDay/getParkDayComparedData.do",
   		data : "startDate="+startDate+"&endDate="+endDate+"&regionId="+regionId+"&showNum="+showNum,
   		dataType : "json", //返回数据形式为json
   		success : function(result) {
   			result = eval(result);
   			if (typeof(result.option) != 'undefined') {
   				// 数据
   				var date = result.option.series[0].data;
   				// 停车点
   				var parklot = result.option.yAxis[0].data;
   				
   				top_data(parklot, date, colors, "parkDayCompareChart", '%');
   			}
   		}  
   	});
}

//显示周转率对比图
function historyZzl(){
	var startDate = $('#turnoverStartDate').val();
    var endDate = $('#turnoverEndDate').val();
    var regionId = $("#regionId").combotree("getValue");
  	var showNum = 10;
   	$.ajax({
   		 type : "post",
            async : false, //同步执行  
            url : "/spms/action/turnover/getTurnoverComparedData.do",
            data : "startDate="+startDate+"&endDate="+endDate+"&regionId="+regionId+"&showNum="+showNum,
            dataType : "json", //返回数据形式为json
            success : function(result) {
   			result = eval(result);
   			if (typeof(result.option) != 'undefined') {
   				// 数据
   				var date = result.option.series[0].data;
   				// 停车点
   				var parklot = result.option.yAxis[0].data;
   				
   				top_data(parklot, date, colors, "trunoverCompareChart", '次');
   			}
   		}  
   	});
}

function zylHistoryCompare(parklot, date) {
	top_data(parklot, date, colors, "occupyRatioChart", '%');
}

//显示泊位收益对比图
function historyProfit(){
	var startDate = $('#profitStartDate').val();
  	var endDate = $('#profitEndDate').val();
  	var regionId = $("#regionId").combotree("getValue");
  	var showNum = 10;
   	$.ajax({
   		type : "post",
   		async : false, //同步执行  
   		url : "/spms/action/profit/getProfitComparedData.do",
   		data : "startDate="+startDate+"&endDate="+endDate+"&regionId="+regionId+"&showNum="+showNum,
   		dataType : "json", //返回数据形式为json
   		success : function(result) {
   			result = eval(result);
   			if (typeof(result.option) != 'undefined') {
   				// 数据
   				var date = result.option.series[0].data;
   				// 停车点
   				if (typeof(result.option.yAxis[0].data) != 'undefined') {
   					var parklot = result.option.yAxis[0].data;   				
   					top_data(parklot, date, colors, "compareProfit", '元');
   				}
   			}
   		}  
   	});
}

// 显示两个柱图
function top_twobar_data(names, values1, values2, series_title1, series_title2, colors,div_id,unit){
	var maxView = Math.max.apply(null,values2)>Math.max.apply(null,values1)?Math.max.apply(null,values2):Math.max.apply(null,values1);
	$("#"+div_id).empty();
	for(var i=values1.length-1;i>=0;i--){
    	var width1 = values1[i]/maxView * 100;
    	var width2 = values2[i]/maxView * 100;
    	var str1 = '<div class="clearfix">'+
    				'<span style="color:black;font-size:15px;">'+names[i]+'</span><br/>'+
        			'<small  style="color:black;float:right;font-size:15px;">' + series_title1 + ':' + values1[i] + unit + '</small>'+
        		   '</div>'+
        		   '<div class="progress xs">'+
        		   ' <div class="progress-bar progress-bar-red" style="width:'+ width1 +'%;background-color:'+colors[i]+';"></div><br/>'+
        		   '</div>';
    	
    	var str2 = '<div class="clearfix">'+
				   '<small  style="color:black;float:right;font-size:15px;">' + series_title2 + ':'  + values2[i] + unit + '</small>'+
				   '</div>'+
				   '<div class="progress xs">'+
				   ' <div class="progress-bar progress-bar-red" style="width:'+ width2 +'%;background-color:'+colors[i]+';"></div>'+
				   '</div>';
    	
    	$("#"+div_id).append(str1).append(str2);
	}
}

//显示车辆趋势对比图
function historyParklotIdle(){
	var startDate = $('#parklotStartDate').val();
  	var endDate = $('#parklotEndDate').val();
  	var regionId = $("#regionId").combotree("getValue");
  	var showNum = 5;
  	$("#carChart").empty();
   	$.ajax({
   		type : "post",
   		async : false, //同步执行  
   		url : "/spms/action/parklotIdleBerthChange/getParklotComparedData.do",
   		data : "startDate="+startDate+"&endDate="+endDate+"&regionId="+regionId+"&showNum="+showNum,
   		dataType : "json", //返回数据形式为json
   		success : function(result) {
   			result = eval(result);
   			if (typeof(result.option) != 'undefined') {
   				// 数据
   				if (typeof(result.option.series[0].data) == 'undefined') {
   					return false;
   				}
   				var series_data0 = result.option.series[0].data;
   				var series_title0 = result.option.series[0].name;
   				
   				var series_data1 = result.option.series[1].data;
   				if (typeof(result.option.series[1].data) == 'undefined') {
   					return false;
   				}
   				var series_title1 = result.option.series[1].name;
   				
   				// 停车点名称
   				if (typeof(result.option.yAxis[0].data) == 'undefined') {
   					return false;
   				}
   				var parklot = result.option.yAxis[0].data;
   				
   				top_twobar_data(parklot, series_data0, series_data1, series_title0, series_title1, colors, "carChart", '辆');
   			}
   		}  
   	});
}
