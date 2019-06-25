 // Get context with jQuery - using jQuery's .get() method.
var colors_qy = ['#ff7f50','#DA70D6','#87CEFA'];
var colors_qd = ['#32CD32','#FF7F50','#87CEFA','#DA70D6'];
var top_5_color = ['#C1232B','#B5C334','#FCCE10','#E87C25','#FFA64D'];
$(function(){
	
	function top(names,values,colors,div_id){		
	    for(var i=values.length-1;i>=0;i--){
	    	var width = values[i]/values[values.length-1] * 100;
	    	var str = '<div class="clearfix">'+
            			'<span class="pull-left">'+names[i]+'</span>'+
            			'<small class="pull-right">'+values[i]+'元</small>'+
            		   '</div>'+
            		   '<div class="progress xs">'+
            		   	' <div class="progress-bar progress-bar-red" style="width:'+width+'%;background-color:'+colors[i]+';"></div>'+
            		   ' </div>';
	    	$("#"+div_id).append(str);
	    }
	}
	
	function top5Park(topParkJson){
		var parksTop = topParkJson.parksTop;
	    var totalChargeFee_park = topParkJson.totalChargeFee;
	    top(parksTop, totalChargeFee_park, top_5_color, "top5Park");
	}
	
	function top5Collector(topCollectorJson){
	    var collectorsTop = topCollectorJson.collectorsTop;
	    var totalChargeFee_coll = topCollectorJson.totalChargeFee;
	    top(collectorsTop, totalChargeFee_coll, top_5_color, "top5Collector");	    
	}
	
	var myDate = new Date();
	var year = myDate.getFullYear();
	var month = myDate.getMonth()+1;
	var day = myDate.getDate(); 
	if(month<10){
		month = "0"+month;
	}
	if(day<10){
		day = "0"+day;
	}
	var date = year+"-"+month+"-"+day;
	var reqUrl = basePath+"/action/homeStat/getOverviewJson.do";
	$.ajax({
		url : reqUrl,
		type : 'get',
		data:{dataDate:date},
		success : function(result) {
			//今日收费
			result = result[0];
			var todayChargeJson = eval("("+result.todayCharge+")");
			var totalChargeFee = todayChargeJson.totalChargeFee;
	        var paymentCard = todayChargeJson.paymentCard;
	        var alipay = todayChargeJson.alipay;
	        var wecha = todayChargeJson.wecha;
	        var unionPay = todayChargeJson.unionPay;
			$("#totalChargeFee").html((totalChargeFee));
			$("#totalChargeFee2").html((totalChargeFee));
			$("#paymentCard").html((paymentCard));
			$("#alipay").html((alipay));
			$("#wecha").html((wecha));
			$("#unionPay").html((unionPay));
			//今日收费百分比
			var paymentCard_pro,alipay_pro,wecha_pro,unionPay_pro;
			if(totalChargeFee==0){//总数0,直接返回
				paymentCard_pro = 0;
				alipay_pro =0;
				wecha_pro = 0;
				unionPay_pro = 0;
			}else{
				if(paymentCard!=0){
					paymentCard_pro = Math.round((paymentCard/totalChargeFee)*100);
					$("#paymentCard_pro").html(""+paymentCard_pro+"%");
				}
				if(alipay!=0){
					alipay_pro = Math.round((alipay/totalChargeFee)*100);
					$("#alipay_pro").html(""+paymentCard_pro+"%");
				}
				if(wecha!=0){
					wecha_pro = Math.round((wecha/totalChargeFee)*100);
					$("#wecha_pro").html(""+wecha_pro+"%");
				}
				if(unionPay!=0){
					unionPay_pro = Math.round((unionPay/totalChargeFee)*100);
					$("#unionPay_pro").html(""+unionPay_pro+"%");
				}
			}
			
			//今日充值
			var todayRefileeJson = eval("("+result.todayRefilee+")");	       
	        var totalRefillFee = todayRefileeJson.totalRefillFee;
	        var payment_Card = todayRefileeJson.paymentCard;
	        var driverCard = todayRefileeJson.driverCard;
	        var versualCard = todayRefileeJson.versualCard;			
			$("#totalRefillFee").html((totalRefillFee));
			$("#totalRefillFee2").html((totalRefillFee));
			$("#payment_Card").html((payment_Card));
			$("#driverCard").html((driverCard));
			$("#versualCard").html((versualCard));
			
			//今日充值百分比
			var paymentCard_pro,driverCard_pro,versualCard_pro;
			if(totalRefillFee==0){//总数0,直接返回
				paymentCard_pro = 0;
				driverCard_pro = 0;
				versualCard_pro = 0;
			}else {
				if(payment_Card!=0){
					paymentCard_pro = Math.round((payment_Card/totalRefillFee)*100);
					$("#payment_Card_pro").html(""+paymentCard_pro+"%");
				}
				if(driverCard!=0){
					driverCard_pro = Math.round((driverCard/totalRefillFee)*100);
					$("#driverCard_pro").html(""+driverCard_pro+"%");
				}
				if(versualCard!=0){
					versualCard_pro = Math.round((versualCard/totalRefillFee)*100);
					$("#versualCard_pro").html(""+versualCard_pro+"%");
				}
			}
			
			//停车次数
			var todayParktimesJson = eval("("+result.todayParktimes+")");	      
	        var parkTimes = todayParktimesJson.parkTimes;
	        var berthTurnover = todayParktimesJson.berthTurnover;
	        var berthBusyRadio = todayParktimesJson.berthBusyRadio;
	        var berthUserRadio = todayParktimesJson.berthUserRadio;	        
			$("#parkTimes").html((parkTimes));
			$("#parkTimes2").html((parkTimes));
			$("#berthTurnover").html(berthTurnover);
			if(berthBusyRadio!=0) $("#berthBusyRadio").html(Math.round(berthBusyRadio)+"%");
			if(berthUserRadio!=0) $("#berthUserRadio").html(Math.round(berthUserRadio)+"%");
			//缴费次数
			 var todayChargetimesJson = eval("("+result.todayChargetimes+")");		        
	        var totalChargeTimes = todayChargetimesJson.totalChargeTimes;
	        var chargeFeeAverage = todayChargetimesJson.chargeFeeAverage;
	        var berthAverageFee = todayChargetimesJson.berthAverageFee;			
			$("#totalChargeTimes").html((totalChargeTimes));
			$("#totalChargeTimes2").html((totalChargeTimes));
			$("#chargeFeeAverage").html(chargeFeeAverage);
			$("#berthAverageFee").html(berthAverageFee);
			
			//今日泊位
			var todayIdleBerthNumJson = eval("("+result.todayIdleBerthNum+")");	      
		    var idleBerthNum = todayIdleBerthNumJson.idleBerthNum;   
		    var berthNum = todayIdleBerthNumJson.berthNum;   
		    var parkNum = todayIdleBerthNumJson.parkNum;   			
			$("#berthNum").html((berthNum));
			$("#idleBerthNum").html((idleBerthNum));
			$("#idleBerthNum2").html((idleBerthNum));
			$("#parkNum").html((parkNum));
				
			//在线人数
			var todayOnlineCollectorJson = eval("("+result.todayOnlineCollector+")");				    
		    var onlineNum = todayOnlineCollectorJson.onlineNum;
		    var collectorNum = todayOnlineCollectorJson.collectorNum;
		    var offlineNum = todayOnlineCollectorJson.offlineNum;			
			$("#onlineNum").html((onlineNum));
			$("#onlineNum2").html((onlineNum));
			$("#collectorNum").html((collectorNum));
			$("#offlineNum").html((offlineNum));	
	        
		    //收费累计趋势图
		    var tendChrageJson = eval("("+result.tendChrage+")");	    
		    var hours_ljsf = tendChrageJson.hours;
		    var totalChargeFee_ljsf = tendChrageJson.totalChargeFee;
		    var paymentCard_ljsf = tendChrageJson.paymentCard;
		    var alipay_ljsf = tendChrageJson.alipay;
		    var unionPay_ljsf = tendChrageJson.unionPay;
		    var wecha_ljsf = tendChrageJson.wecha;
		    
		    
		    //充值累计趋势图
		    var tendRefillJson = eval("("+result.tendRefill+")");
		    var hours_ljcz = tendRefillJson.hours;
		    var totalRefillFee_ljcz = tendRefillJson.totalRefillFee;
		    var paymentCard_ljcz = tendRefillJson.paymentCard;
		    var driverCard_ljcz = tendRefillJson.driverCard;
		    var versualCard_ljcz = tendRefillJson.versualCard;

		    //停车点Top5
		    var topParkJson = eval("("+result.topPark+")");		    
		    top5Park(topParkJson);
		    
		    //收费员Top5
		    var topCollectorJson = eval("("+result.topCollector+")");			    
		    top5Collector(topCollectorJson);
		    
		    //停车次数
		    var tendParkTimesJson = eval("("+result.tendParkTimes+")");		    
		    var hours_park_lj = tendParkTimesJson.hours;
		    var parkTimes_lj = tendParkTimesJson.parkTimes;
		    
		    //空余泊位
		    var tendIdleBerthJson = eval("("+result.tendIdleBerth+")");		    
		    var hours_berth_lj = tendIdleBerthJson.hours;
		    var idleBerthNum_lj = tendIdleBerthJson.idleBerthNum;
		    
		     
			//今日累计收费		  
		     var lineChartData_sf = {
		         labels:hours_ljsf,
		         datasets: [
		         {
		           label: "合计",
		           fillColor : "#FF0000", // 背景色
		           strokeColor : "#FF0000", // 线
		           pointColor : "#FF0000", // 点
		           pointStrokeColor : "#fff", // 点的包围圈
		           data: totalChargeFee_ljsf//Y轴
		         },
		         {
		           label: "代缴卡",
		           fillColor : "#0000FF", // 背景色
		           strokeColor : "#0000FF", // 线
		           pointColor : "#0000FF", // 点
		           pointStrokeColor : "#fff", // 点的包围圈
		           data: paymentCard_ljsf
		         },
		         {
			           label: "银联卡",
			           fillColor : "#FF00FF", // 背景色
			           strokeColor : "#FF00FF", // 线
			           pointColor : "#FF00FF", // 点
			           pointStrokeColor : "#fff", // 点的包围圈
			           data: unionPay_ljsf
			     },
		         {
		             label: "支付宝",
		             fillColor : "#FF8800", // 背景色
		             strokeColor : "#FF8800", // 线
		             pointColor : "#FF8800", // 点
		             pointStrokeColor : "#fff", // 点的包围圈
		             data: alipay_ljsf
		         },
		         {
		           label: "微信",
		           fillColor : "#00AA00", // 背景色
		           strokeColor : "#00AA00", // 线
		           pointColor : "#00AA00", // 点
		           pointStrokeColor : "#fff", // 点的包围圈
		           data: wecha_ljsf
		         }
		       ]
		     };
		     //今日累计充值
		     var lineChartData_cz = {
		    	   labels: hours_ljcz,
	    	       datasets: [
	    	         {
	    	           label: "合计",
	    	           fillColor : "#FF0000", // 背景色
	    	           strokeColor : "#FF0000", // 线
	    	           pointColor : "#FF0000", // 点
	    	           pointStrokeColor : "#fff", // 点的包围圈
	    	           data: totalRefillFee_ljcz
	    	         },
	    	         {
	    	           label: "代缴卡",
	    	           fillColor : "#0000FF", // 背景色
	    	           strokeColor : "#0000FF", // 线
	    	           pointColor : "#0000FF", // 点
	    	           pointStrokeColor : "#fff", // 点的包围圈
	    	           data: paymentCard_ljcz
	    	         },
	    	         {
	    	             label: "车主卡",
	    	             fillColor : "#FF00FF", // 背景色
	    	             strokeColor : "#FF00FF", // 线
	    	             pointColor : "#FF00FF", // 点
	    	             pointStrokeColor : "#fff", // 点的包围圈
	    	             data: driverCard_ljcz
	    	         },
	    	         {
	    	           label: "个人账户",
	    	           fillColor : "#00AA00", // 背景色
	    	           strokeColor : "#00AA00", // 线
	    	           pointColor : "#00AA00", // 点
	    	           pointStrokeColor : "#fff", // 点的包围圈
	    	           data: versualCard_ljcz
	    	         }
	    	       ]
		    };
		     var lineChartOptions = {
		         showScale: true,
		         scaleShowGridLines: false,
		         scaleGridLineColor: "rgba(0,0,0,.05)",
		         // Y/X轴的颜色
		         //scaleLineColor : "rgba(223,223,223)",
		         // 字体
		         scaleFontFamily : "'Arial'",
		         scaleGridLineWidth: 1,
		         scaleShowHorizontalLines: true,
		         scaleShowVerticalLines: true,
		         bezierCurve: true,
		         bezierCurveTension: 0.3,
		         pointDot: true,
		         pointDotRadius: 4,
		         pointDotStrokeWidth: 1,
		         pointHitDetectionRadius: 20,
		         datasetStroke: true,
		         datasetStrokeWidth: 2,
		         datasetFill: true,
		         legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
		         maintainAspectRatio: true,
		         responsive: true
		       };
		     //收费趋势
		     var lineChartCanvas_sf = $("#lineChart_sf").get(0).getContext("2d");
		     var lineChart_sf = new Chart(lineChartCanvas_sf);
		     lineChartOptions.datasetFill = false;
		     lineChart_sf.Line(lineChartData_sf, lineChartOptions);
		     //充值趋势
		     var lineChartCanvas_cz = $("#lineChart_cz").get(0).getContext("2d");
		     var lineChart_cz = new Chart(lineChartCanvas_cz);
		     lineChartOptions.datasetFill = false;
		     lineChart_cz.Line(lineChartData_cz, lineChartOptions);
		     
		     //各区域收入情况
		    var radioIncomeByAreaJson = eval("("+result.radioIncomeByArea+")");	
		    var areaChargeTotal_qy = radioIncomeByAreaJson.areaChargeTotal;
		    var areaRefillTotal_qy = radioIncomeByAreaJson.areaRefillTotal;
		    		    
		    //充值
		    var areaRefilleRankContent_qy = radioIncomeByAreaJson.areaRefilleRankContent;
		    var regions_qycz = new Array();
		    var refillTotal_qycz = new Array();
		    for(var i=0; i<areaRefilleRankContent_qy.length; i++){  
		    	regions_qycz[i]= areaRefilleRankContent_qy[i].region;
		    	refillTotal_qycz[i]= areaRefilleRankContent_qy[i].refillTotal;
		 	}
		    
		  //收费
		    var areaChargeRankContent_qy = radioIncomeByAreaJson.areaChargeRankContent;
		    var regions_qysf = new Array();
		    var chargeTotal_qysf = new Array();
		    for(var i=0; i<areaChargeRankContent_qy.length; i++){  
		    	regions_qysf[i]= areaChargeRankContent_qy[i].region;
		    	chargeTotal_qysf[i]= areaChargeRankContent_qy[i].chargeTotal;
		 	}
		     var series_data=[
                //{value:areaRefillTotal_qy, name:'今日充值', selected:true ,itemStyle:{normal:{color:"#FF5C26"}}},
                {value:areaChargeTotal_qy, name:'今日收费', itemStyle:{normal:{color:"#0080FF"}}}
             ];
		     var option_qy_value = new Array();
		     /*for(var i=0;i<regions_qycz.length;i++){
		    	 option_qy_value[option_qy_value.length] = {value:refillTotal_qycz[i], name:regions_qycz[i], itemStyle:{normal:{color:colors[option_qy_value.length]}}};
		     }*/
		     var count=0;
		     for(var i=0;i<regions_qysf.length;i++){
		    	 if(chargeTotal_qysf[i] == 0){
//		    		 option_qy_value.length = option_qy_value.length + 1;
		    		 i++;
		    	 }
		    	 option_qy_value[count] = {value:chargeTotal_qysf[i], name:regions_qysf[i], itemStyle:{normal:{color:colors_qy[i]}}};
		    	 count++;
		     }
		     
		     var pieEChart_qy =  echarts.init(document.getElementById('qyDiv'));
		     option_qy = {
		        tooltip: {
		            trigger: 'item',
		            /* {a}, {b}，{c}，{d}%，分别表示系列名，数据名，数据值  百分比 */
		            formatter: "{a} <br/>{b}: {c} ({d}%)"
		        },
		        /*legend: {
		            orient: 'vertical',
		            x: 'left',
		            data:['今日收费','今日充值','临平街道','南苑街道']
		        },*/
		        series: [
		            /*{
		                name:'今日收入',
		                type:'pie',
		                selectedMode: 'single',
		                radius : [0, 70],
		
		                label: {
		                    normal: {
		                        position: 'inner'
		                    }
		                },
		                labelLine: {
		                    normal: {
		                        show: false
		                    }
		                },
		                data:series_data
		            },
		            {
		                name:'今日收入',
		                type:'pie',
		                radius: [90, 120],
		                data:option_qy_value
		            }*/
		            {
    		            name: '今日收费',
    		            type: 'pie',
    		            radius : '80%',
    		            center: ['50%', '50%'],
    		            data:option_qy_value,
    		        }
		        ]
		     };
		     pieEChart_qy.setOption(option_qy);
		     
		    
		   //各渠道收入情况
		    var radioIncomeByPaytypeJson = eval("("+result.radioIncomeByPaytype+")");	
		    var areaChargeTotal_qd = radioIncomeByPaytypeJson.areaChargeTotal;
		    var areaRefillTotal_qd = radioIncomeByPaytypeJson.areaRefill;
			
			var series_data_qd=[
                //{value:areaRefillTotal_qd, name:'今日充值', selected:true ,itemStyle:{normal:{color:"#FF5C26"}}},
                {value:areaChargeTotal_qd, name:'今日收费', itemStyle:{normal:{color:"#0080FF"}}}
             ];
			
		    //收费
		    var areaChargeRankContent_qd = radioIncomeByPaytypeJson.areaChargeRankContent;
		    var regions_qdsf = new Array();
		    var chargeTotal_qdsf = new Array();
		    for(var i=0; i<areaChargeRankContent_qd.length; i++){  
		    	regions_qdsf[i]= areaChargeRankContent_qd[i].name;
		    	chargeTotal_qdsf[i]= areaChargeRankContent_qd[i].value;
		 	}
		    //充值
		    /*var areaRefilleRankContent_qd = radioIncomeByPaytypeJson.areaRefilleRankContent;
		    var regions_qdcz = new Array();
		    var refillTotal_qdcz = new Array();
		    for(var i=0; i<areaRefilleRankContent_qd.length; i++){  
		    	regions_qdcz[i]= areaRefilleRankContent_qd[i].name;
		    	refillTotal_qdcz[i]= areaRefilleRankContent_qd[i].value;
		 	}*/
		     
		     var option_qd_value = new Array();
		    /* for(var i=0;i<regions_qdcz.length;i++){
		    	 option_qd_value[option_qd_value.length] = {value:refillTotal_qdcz[i], name:regions_qdcz[i], itemStyle:{normal:{color:colors[option_qd_value.length]}}};
		     }*/
		     var count=0;
		     for(var i=0;i<regions_qdsf.length;i++){
		    	 if(chargeTotal_qdsf[i] == 0){
		    		 i++;
		    	 }
		    	 option_qd_value[count] = {value:chargeTotal_qdsf[i], name:regions_qdsf[i], itemStyle:{normal:{color:colors_qd[i]}}};
		    	 count++;
		     }
		     
		   //收费渠道情况
		     var pieEChart_qd =  echarts.init(document.getElementById('qdDiv'));
		     option_qd = {
		        tooltip: {
		            trigger: 'item',
		            /* {a}, {b}，{c}，{d}%，分别表示系列名，数据名，数据值  百分比 */
		            formatter: "{a} <br/>{b}: {c} ({d}%)"
		        },
		        /*legend: {
		            orient: 'vertical',
		            x: 'left',
		            data:['今日收费','今日充值','临平街道','南苑街道']
		        },*/
		        series: [
		            /*{
		                name:'今日收入',
		                type:'pie',
		                selectedMode: 'single',
		                radius : [0, 70],
		
		                label: {
		                    normal: {
		                        position: 'inner'
		                    }
		                },
		                labelLine: {
		                    normal: {
		                        show: false
		                    }
		                },
		                data:series_data_qd
		            },
		            {
		                name:'今日收入',
		                type:'pie',
		                radius: [90, 120],
		                
		                data:option_qd_value
		            }*/
		            {
    		            name: '今日收费',
    		            type: 'pie',
    		            radius : '60%',
    		            center: ['50%', '50%'],
    		            data:option_qd_value,
    		        }
		        ]
		     };
		     pieEChart_qd.setOption(option_qd);
		     
			  //停车次数		  
		     var lineChartData_tccs = {
		         labels:hours_park_lj,
		         datasets: [
		         {
		           label: "累计停车次数",
		           fillColor : "#FF0000", // 背景色
		           strokeColor : "#FF0000", // 线
		           pointColor : "#FF0000", // 点
		           pointStrokeColor : "#fff", // 点的包围圈
		           data: parkTimes_lj//Y轴
		         }
		       ]
		     };
		     var lineChartCanvas_tccs = $("#tccsDiv").get(0).getContext("2d");
		     var lineChart_tccs = new Chart(lineChartCanvas_tccs);
		     lineChartOptions.datasetFill = false;
		     lineChart_tccs.Line(lineChartData_tccs, lineChartOptions);
		     
		     //空余泊位趋势
		     var lineChartData_kybw = {
		         labels:hours_berth_lj,
		         datasets: [
		         {
		           label: "空余泊位趋势",
		           fillColor : "#FF0000", // 背景色
		           strokeColor : "#FF0000", // 线
		           pointColor : "#FF0000", // 点
		           pointStrokeColor : "#fff", // 点的包围圈
		           data: idleBerthNum_lj//Y轴
		         }
		       ]
		     };
		     var lineChartCanvas_kybw = $("#sybwDiv").get(0).getContext("2d");
		     var lineChart_kybw = new Chart(lineChartCanvas_kybw);
		     lineChartOptions.datasetFill = false;
		     lineChart_kybw.Line(lineChartData_kybw, lineChartOptions);
		     
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
		     
		     
		}
	});	
});
       