$(function(){
	var reqUrl = basePath+"/action/homeStat/refreshData.do";
	$.ajax({
		url : reqUrl,
		type : 'get',
		success : function(result) {
			//7日数据
		     var tccs7dayJson = eval(result.parkingDraw_7day);
		     var charge7dayJson = eval(result.chargeDraw_7day);
		     var refill7dayJson = eval(result.refillDraw_7day);
		     //停车
		     var tccs_7day_time = new Array();
			 var tccs_7day_data = new Array();
		     for(var i=0; i<tccs7dayJson.length; i++){  
		    	 tccs_7day_time[i]= tccs7dayJson[i].TIME_BREAK;
		    	 tccs_7day_data[i]= tccs7dayJson[i].DEPARTURE_COUNT;
		 	 }
		     //收费
		     var charge_7day_time = new Array();
			 var charge_7day_data = new Array();
		     for(var i=0; i<charge7dayJson.length; i++){  
		    	 charge_7day_time[i]= charge7dayJson[i].DAY_CHARGE;
		    	 charge_7day_data[i]= charge7dayJson[i].CHARGE_AMOUNT;
		 	 }
		     //充值
		     var refill_7day_time = new Array();
			 var refill_7day_data = new Array();
		     for(var i=0; i<refill7dayJson.length; i++){  
		    	 refill_7day_time[i]= refill7dayJson[i].DAY_REFILL;
		    	 refill_7day_data[i]= refill7dayJson[i].REFILL_AMOUNT;
		 	 }
			//近7天数据
		     var eChart_day =  echarts.init(document.getElementById('barChart_7day'));
		     option_day = {
		    		 	color:["#00B285", "#B28500","#ff0000"],
		    		 	legend: {
		    		        data:['收费(元)','充值(元)','停车次数(次)']
		    		    },
		    		    tooltip : {
		    		        trigger: 'axis'
		    		    },
		    		    barWidth:25,//柱子粗细
		    		    barGap:'80%',//柱子间距
		    		    calculable : true,
		    		    xAxis : [
		    		        {
		    		            type : 'category',
		    		            data:tccs_7day_time
		    		        }
		    		    ],
		    		    yAxis : [
		    		        {
		    		            type : 'value'
		    		        }
		    		    ],
		    		    series : [
		    		        {
		    		            name:'收费(元)',
		    		            type:'bar',
		    		            itemStyle: {normal: {
		    		                label : {show:true,position:'top',formatter:'{c} 元'}
		    		            }},
		    		            data: charge_7day_data
		    		        },
		    		        {
		    		            name:'充值(元)',
		    		            type:'bar',
		    		            itemStyle: {normal: {
		    		                label : {show:true,position:'top',formatter:'{c} 元'}
		    		            }},
		    		            data: refill_7day_data
		    		        },
		    		        {
		    		            name:'停车次数(次)',
		    		            type:'line',
	//				    		            itemStyle: {normal: {
	//				    		                label : {show:true,position:'top',formatter:'{c} 次'}
	//				    		            }},
		    		            data:tccs_7day_data
		    		        }
		    		    ]
		    		};
		    		                    
		     eChart_day.setOption(option_day);
		}
	});
		     
});
       