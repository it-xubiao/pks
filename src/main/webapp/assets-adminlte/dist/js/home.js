 // Get context with jQuery - using jQuery's .get() method.
$(function(){
	var reqUrl = basePath+"/action/homeStat/refreshData.do";
	$.ajax({
		url : reqUrl,
		type : 'get',
		success : function(result) {
			//今日收费
			$("#chargeAmount").html(parseNum(result.chargeAmount));
			$("#chargeAmount2").html(parseNum(result.chargeAmount));
			$("#chargePaymentAmount").html(parseNum(result.chargePaymentAmount));
			$("#chargeAlipayAmount").html(parseNum(result.chargeAlipayAmount));
			$("#chargeWechatAmount").html(parseNum(result.chargeWechatAmount));
			$("#chargeBankAmount").html(0);
			//今日收费百分比
			var chargePaymentAmount_pro,chargeAlipayAmount_pro,chargeWechatAmount_pro,chargeBankAmount_pro;
			if(result.chargeAmount==0){//总数0,直接返回
				chargePaymentAmount_pro = 0;
				chargeAlipayAmount_pro =0;
				chargeWechatAmount_pro = 0;
				chargeBankAmount_pro = 0;
			}else{
				chargePaymentAmount_pro = (result.chargePaymentAmount/result.chargeAmount).toFixed(2)*100;
				chargeAlipayAmount_pro = (result.chargeAlipayAmount/result.chargeAmount).toFixed(2)*100;
				chargeWechatAmount_pro = (result.chargeWechatAmount/result.chargeAmount).toFixed(2)*100;
				//chargeBankAmount_pro = (result.chargeBankAmount/result.chargeAmount).toFixed(2)*100;
				chargeBankAmount_pro = 0;
			}
			$("#chargePaymentAmount_pro").html(chargePaymentAmount_pro+"%");
			$("#chargeAlipayAmount_pro").html(chargeAlipayAmount_pro+"%");
			$("#chargeWechatAmount_pro").html(chargeWechatAmount_pro+"%");
			$("#chargeBankAmount_pro").html(chargeBankAmount_pro+"%");
			
			//今日充值
			$("#refillAmount").html(parseNum(result.refillAmount));
			$("#refillAmount2").html(parseNum(result.refillAmount));
			$("#paymentCardAmount").html(parseNum(result.paymentCardAmount));
			$("#ownerCardAmount").html(parseNum(result.ownerCardAmount));
			$("#individualAccountAmount").html(parseNum(result.individualAccountAmount));
			$("#refillBankAmount").html(0);
			
			//今日充值百分比
			var paymentCardAmount_pro,ownerCardAmount_pro,individualAccountAmount_pro;
			if(result.refillAmount==0){//总数0,直接返回
				paymentCardAmount_pro = 0;
				ownerCardAmount_pro = 0;
				individualAccountAmount_pro = 0;
			}else {
				paymentCardAmount_pro = (result.paymentCardAmount/result.refillAmount).toFixed(2)*100;
				ownerCardAmount_pro = (result.ownerCardAmount/result.refillAmount).toFixed(2)*100;
				individualAccountAmount_pro = (result.individualAccountAmount/result.refillAmount).toFixed(2)*100;
			}
			$("#paymentCardAmount_pro").html(paymentCardAmount_pro+"%");
			$("#ownerCardAmount_pro").html(ownerCardAmount_pro+"%");
			$("#individualAccountAmount_pro").html(individualAccountAmount_pro+"%");
			
			
			//停车次数
			var parkingCount = result.parkingCount;
			var yxBerthCount = result.yxBerthCount;
			var occupyBerthTimes = result.occupyBerthTimes;
			var occupyBerthCount = result.occupyBerthCount;
			var d = new Date();
			//alert(d.getHours()+":"+d.getMinutes()+":"+d.getSeconds());
			//停车总时长
			var allTimes = (d.getHours()*60*60 + d.getMinutes()*60 + d.getSeconds())*yxBerthCount;
			//泊位周转率：停车次数/有效泊位总数,//四舍五入(次)
			var berth_zzl,berth_lyl,berth_zyl;
			if(yxBerthCount==0){
				berth_zzl = 0;
				berth_zyl = 0;
			}else{
				berth_zzl = Math.round(parkingCount/yxBerthCount);
				berth_zyl = (occupyBerthCount/yxBerthCount).toFixed(2)*100;
			}
			if(allTimes==0){
				berth_lyl = 0;
			}else{
				berth_lyl = (occupyBerthTimes/allTimes).toFixed(2)*100;
			}
			$("#parkingCount").html(parseNum(parkingCount));
			$("#parkingCount2").html(parseNum(parkingCount));
			$("#berth_zzl").html(berth_zzl);
			$("#berth_lyl").html(berth_lyl+"%");
			$("#berth_zyl").html(berth_zyl+"%");
			
			//缴费次数
			var paymentCount = result.paymentCount;
			var avgPayment,unitPayment;
			if(paymentCount==0){
				avgPayment = 0;
			}else avgPayment = (result.chargeAmount/paymentCount).toFixed(2);
			
			if(result.berthNumber==0){
				unitPayment = 0;
			}else unitPayment = (result.chargeAmount/result.berthNumber).toFixed(2);
			
			$("#paymentCount").html(parseNum(paymentCount));
			$("#paymentCount2").html(parseNum(paymentCount));
			$("#avgPayment").html(avgPayment);
			$("#unitPayment").html(unitPayment);
			
			//今日泊位
			$("#berthNumber").html(parseNum(result.berthNumber));
			$("#berthNumberIdle").html(parseNum(result.berthNumberIdle));
			$("#berthNumberIdle2").html(parseNum(result.berthNumberIdle));
			$("#parkNumber").html(parseNum(result.parkNumber));
				
			//在线人数
			var onlineUsers = result.onlineUsers;
			var chargeUsers = result.chargeUsers;
			var offlineUsers = chargeUsers - onlineUsers;
			$("#onlineUsers").html(parseNum(onlineUsers));
			$("#onlineUsers2").html(parseNum(onlineUsers));
			$("#chargeUsers").html(parseNum(chargeUsers));
			$("#offlineUsers").html(parseNum(offlineUsers));
			
			 //停车次数趋势图
			 var tccsJson = eval(result.parkingDraw);
			 
			 var tccs_time = new Array();
			 var tccs_data = new Array();
		     for(var i=0; i<tccsJson.length; i++){  
		    	 tccs_time[i]= tccsJson[i].PARKINGTIME;
		    	 tccs_data[i]= tccsJson[i].PARKINGCOUNT;
			 }
		     //空余泊位数趋势
			 var idleBerthJson = eval(result.idleBerthDraw);
		     var idleBerth_time = new Array();
			 var idleBerth_data = new Array();
		     for(var i=0; i<idleBerthJson.length; i++){  
		    	 idleBerth_time[i]= idleBerthJson[i].BERTHTIME;
		    	 idleBerth_data[i]= idleBerthJson[i].BERTHCOUNTIDLE;
		 	 }
		     
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
			//今日累计收费
		     var lineChartData_sf = {
		        labels: ['1点','2点','3点','4点','5点','6点','7点','8点','9点','10点','11点','12点','13点','14点','15点',
		                '16点','17点','18点','19点','20点','21点','22点','23点','24点'],
		         datasets: [
		         {
		           label: "合计",
		           fillColor : "#3598DC", // 背景色
		           strokeColor : "#3598DC", // 线
		           pointColor : "#3598DC", // 点
		           pointStrokeColor : "#fff", // 点的包围圈
		           data: [165, 119, 120, 121, 156, 205, 210,212,213,121,143,171,176,232,234,176,211,221,223,232,253,251,181,232]//Y轴
		         },
		         {
		           label: "代缴卡",
		           fillColor : "#3598DC", // 背景色
		           strokeColor : "#8C4600", // 线
		           pointColor : "#8C4600", // 点
		           pointStrokeColor : "#fff", // 点的包围圈
		           data: [56,58,88,53,62,73,91,61,85,109,126,132,134,156,125,130,112,113,112,143,131,151,121,132]
		         },
		         {
		             label: "支付宝",
		             fillColor : "#FF5C26", // 背景色
		             strokeColor : "#FF5C26", // 线
		             pointColor : "#FF5C26", // 点
		             pointStrokeColor : "#fff", // 点的包围圈
		             data: [26,38,21,22,30,43,27,25,61,52,71,38,31,59,25,20,32,16,32,41,34,55,26,37]
		         },
		         {
		           label: "微信",
		           fillColor : "#00B259", // 背景色
		           strokeColor : "#00B259", // 线
		           pointColor : "#00B259", // 点
		           pointStrokeColor : "#fff", // 点的包围圈
		           data: [14,12,23,25,31,13,11,31,35,49,56,32,34,16,25,30,32,23,14,53,71,31,31,42]
		         }
		       ]
		     };
		     //今日累计充值
		     var lineChartData_cz = {
		    	   labels: ['1点','2点','3点','4点','5点','6点','7点','8点','9点','10点','11点','12点','13点','14点','15点',
				                '16点','17点','18点','19点','20点','21点','22点','23点','24点'],
	    	       datasets: [
	    	         {
	    	           label: "合计",
	    	           fillColor : "#3598DC", // 背景色
	    	           strokeColor : "#3598DC", // 线
	    	           pointColor : "#3598DC", // 点
	    	           pointStrokeColor : "#fff", // 点的包围圈
	    	           data: [165, 104, 100, 121, 156, 205, 210,212,213,121,143,171,176,232,234,176,211,221,223,232,253,251,181,232]//Y轴
	    	         },
	    	         {
	    	           label: "代缴卡",
	    	           fillColor : "#3598DC", // 背景色
	    	           strokeColor : "#8C4600", // 线
	    	           pointColor : "#8C4600", // 点
	    	           pointStrokeColor : "#fff", // 点的包围圈
	    	           data: [56,58,88,53,62,73,91,61,85,109,126,132,134,156,125,130,112,113,112,143,131,151,121,132]
	    	         },
	    	         {
	    	             label: "车主卡",
	    	             fillColor : "#FF5C26", // 背景色
	    	             strokeColor : "#FF5C26", // 线
	    	             pointColor : "#FF5C26", // 点
	    	             pointStrokeColor : "#fff", // 点的包围圈
	    	             data: [26,38,21,22,30,43,27,25,61,52,71,38,31,59,25,20,32,16,32,41,34,55,26,37]
	    	         },
	    	         {
	    	           label: "个人账户",
	    	           fillColor : "#FF73FF", // 背景色
	    	           strokeColor : "#FF73FF", // 线
	    	           pointColor : "#FF73FF", // 点
	    	           pointStrokeColor : "#fff", // 点的包围圈
	    	           data: [14,12,23,25,31,13,11,31,35,49,56,32,34,16,25,30,32,23,14,53,71,31,31,42]
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
		         pointDot: false,
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
		     
		     //区域收费情况
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
		            {
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
		                data:[
		                    {value:7000, name:'今日充值', selected:true ,itemStyle:{normal:{color:"#FF5C26"}}},
		                    {value:3000, name:'今日收费', itemStyle:{normal:{color:"#0080FF"}}}
		                ]
		            },
		            {
		                name:'今日收入',
		                type:'pie',
		                radius: [90, 120],
		                data:[
		                    {value:2000, name:'临平街道', itemStyle:{normal:{color:"#FFDC73"}}},                
		                    {value:5000, name:'南苑街道', itemStyle:{normal:{color:"#FFA64D"}}},
		                    
		                    {value:1000, name:'临平街道', itemStyle:{normal:{color:"#9999FF"}}},                
		                    {value:2000, name:'南苑街道', itemStyle:{normal:{color:"#73B9FF"}}}
		                    
		                ]
		            }
		        ]
		     };
		     pieEChart_qy.setOption(option_qy);
		     
		     
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
		            {
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
		                data:[
		                    {value:7000, name:'今日充值', selected:true ,itemStyle:{normal:{color:"#FF5C26"}}},
		                    {value:3000, name:'今日收费', itemStyle:{normal:{color:"#0080FF"}}}
		                ]
		            },
		            {
		                name:'今日收入',
		                type:'pie',
		                radius: [90, 120],
		                
		                data:[
		                    {value:2500, name:'代缴卡', itemStyle:{normal:{color:"#FF4D4D"}}},                
		                    {value:4000, name:'支付宝', itemStyle:{normal:{color:"#FF8000"}}},
		                    {value:500, name:'微信', itemStyle:{normal:{color:"#FFFF73"}}},
		                    
		                    {value:500, name:'个人账户', itemStyle:{normal:{color:"#7396FF"}}},                
		                    {value:1000, name:'车主卡', itemStyle:{normal:{color:"#7373FF"}}},
		                    {value:1500, name:'代缴卡', itemStyle:{normal:{color:"#73B9FF"}}}                
		                    
		                ]
		            }
		        ]
		     };
		     pieEChart_qd.setOption(option_qd);
		     
		     var lineChartData = {
			    labels :tccs_time,//["0点","2点","4点","6点","8点","10点","12点","14点","16点","18点","20点","22点",'24点'], //X轴 坐标
		    	datasets : [
			        {
			            fillColor : "ffff00", // 背景色
			            strokeColor : "#ef7c1f", // 线
			            pointColor : "#ef7c1f", // 点
			            pointStrokeColor : "#fff", // 点的包围圈
			            //tccs_data,
			            data :tccs_data//[120,140,110,130,350,170,160,234,124,234,55,23] // Y轴坐标
			        }
			    ]
		
			}
		    var lineChartData_sybw = {
			    labels : idleBerth_time,//["0点","2点","4点","6点","8点","10点","12点","14点","16点","18点","20点","22点",'24点'], //X轴 坐标
			    datasets : [
			        {
			            fillColor : "ffff00", // 背景色
			            strokeColor : "#ef7c1f", // 线
			            pointColor : "#ef7c1f", // 点
			            pointStrokeColor : "#fff", // 点的包围圈
			            uniqueId: "id",     
			            data : idleBerth_data//[20,40,10,30,3,17,10,2,14,34,55,23,50] // Y轴坐标
			        }
			    ]
		
			}
			var defaults = {
			    scaleOverlay : false,
			    scaleOverride : false,
			    scaleSteps : null,
			    scaleStepWidth : 10,
			    // Y 轴的起始值
			    scaleStartValue : null,
			    // Y/X轴的颜色
			    scaleLineColor : "rgba(0,0,0,.1)",
			    // X,Y轴的宽度
			    scaleLineWidth : 1,
			    // 刻度是否显示标签, 即Y轴上是否显示文字
			    scaleShowLabels : true,
			    // Y轴上的刻度,即文字
			    scaleLabel : "<%=value%>",
			    // 字体
			    scaleFontFamily : "'Arial'",
			    // 文字大小
			    scaleFontSize : 12,
			    // 文字样式
			    scaleFontStyle : "normal",
			    // 文字颜色
			    scaleFontColor : "#666",	
			    // 是否显示网格
			    scaleShowGridLines : true,
			    // 网格颜色
		//    		    scaleGridLineColor : "rgba(0,0,0,.05)",
			    // 网格宽度
			    scaleGridLineWidth : 1,	
			    // 是否使用贝塞尔曲线? 即:线条是否弯曲
			    bezierCurve : false,
			    // 是否显示点数
			    pointDot : true,
			    // 圆点的大小
			    pointDotRadius : 3,
			    // 圆点的笔触宽度, 即:圆点外层白色大小
		//    		    pointDotStrokeWidth : 2,
			    // 数据集行程
			    datasetStroke : true,
			    // 线条的宽度, 即:数据集
		//    		    datasetStrokeWidth : 2,
			    // 是否填充数据集
			    datasetFill : false,
			    onAnimationComplete : null
			    
			}
		     new Chart(document.getElementById("tccsDiv").getContext("2d")).Line(lineChartData, defaults);
		     new Chart(document.getElementById("sybwDiv").getContext("2d")).Line(lineChartData_sybw, defaults);
		     
		    /* var eChart_tccs =  echarts.init(document.getElementById('tccsDiv'));
		     option_tccs = {
				 	color:["#ff0000"],
				 	legend: {
				        data:['停车次数']
				    },
				    tooltip : {
				        trigger: 'axis'
				    },
				    calculable : true,
				    xAxis : [
				        {
				            type : 'category',
				            data : ["0-2点","2-4点","4-6点","6-8点","8-10点","10-12点","12-14点","14-16点","16-18点","18-20点","20-22点","22-24点"]
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value'
				        }
				    ],
				    series : [
				        {
				            name:'停车次数',
				            type:'line',
				            data : [120,140,110,130,350,170,160,234,124,234,55,23]
				        }
				    ]
				};
		       eChart_tccs.setOption(option_tccs);
		     
		      //剩余泊位趋势
		       var eChart_sybw =  echarts.init(document.getElementById('sybwDiv'));
		       option_sybw = {
		  		 	color:["#ff0000"],
		  		 	legend: {
		  		        data:['剩余泊位']
		  		    },
		  		    tooltip : {
		  		        trigger: 'axis'
		  		    },
		  		    calculable : true,
		  		    xAxis : [
		  		        {
		  		            type : 'category',
		  		            data : ["0点","1点","2点","3点","4点","5点","6点","7点","8点","9点","10点","11点",'12点']
		  		        }
		  		    ],
		  		    yAxis : [
		  		        {
		  		            type : 'value'
		  		        }
		  		    ],
		  		    series : [
		  		        {
		  		            name:'剩余泊位',
		  		            type:'line',
		  		            data : [20,40,10,30,3,17,10,2,14,34,55,23,50]
		  		        }
		  		    ]
		  		};
		         eChart_sybw.setOption(option_sybw);*/
		       
		     //停车点Top5
		     var eChart_tcd =  echarts.init(document.getElementById('tcdTop5Div'));
		     option_tcd = {
				    color:['#C1232B','#B5C334','#FCCE10','#E87C25','#FFA64D'],
		 		 	legend: {
		 		 		data:['东大街','后横街','清水弄','沿山路','景园路']
		 		    },
		    		tooltip : {
		 		        trigger: 'axis'
		 		    },
				    xAxis : [
				        {
				            type : 'value',
				            boundaryGap : [0, 0.05]
				        }
				    ],
				    yAxis : [
				        {
				            type : 'category',
				            data : ['东大街','后横街','清水弄','沿山路','景园路']
				        }
				    ],
				    series : [
				        {  
				            name:'停车点',  
				            type:'bar',  
				            selectedMode: 'single',  
				            itemStyle: {
				                normal: {
				                    color: function(params) {
				                        var colorList = ['#C1232B','#B5C334','#FCCE10','#E87C25','#FFA64D'];
				                        return colorList[params.dataIndex]
				                    },
				                    label : {show:true,position:'right',formatter:'{c} 元'}
				                }
				            },
				            data:[200, 300, 350, 400, 500]  
				        }  
				    ]
				};
		    		                    
		     eChart_tcd.setOption(option_tcd);
		     
		     //收费员Top5
		     var eChart_sfy =  echarts.init(document.getElementById('sfyTop5Div'));
		     option_sfy = {
		    		color:['#C1232B','#B5C334','#FCCE10','#E87C25','#FFA64D'],
		 		 	legend: {
		 		 		data:['小王','小李','小张','小黑','小黄']
		 		    },
		    		tooltip : {
				        trigger: 'axis'
				    },
				    xAxis : [
				        {
				            type : 'value',
				            boundaryGap : [0, 0.05]
				        }
				    ],
				    yAxis : [
				        {
				            type : 'category',
				            data : ['小王','小李','小张','小黑','小黄']
				        }
				    ],
				    //barCategoryGap : '10',//柱状大小
				    series : [
				        {  
				            name:'收费员',  
				            type:'bar',  
				            selectedMode: 'single',  
				            itemStyle: {
				                normal: {
				                    color: function(params) {
				                        var colorList = ['#C1232B','#B5C334','#FCCE10','#E87C25','#FFA64D'];
				                        return colorList[params.dataIndex]
				                    },
				                    label : {show:true,position:'right',formatter:'{c} 元'}
				                }
				            },
				            data:[200, 300, 350, 400, 500]
				        }  
				    ]
				};
		    		                    
		     eChart_sfy.setOption(option_sfy);
		     
		     //近7天数据
		     var eChart_day =  echarts.init(document.getElementById('barChart_7day'));
		     option_day = {
		    		 	color:["#00B285", "#B28500","#ff0000"],
		    		 	legend: {
		    		        data:['收费','充值','停车次数']
		    		    },
		    		    tooltip : {
		    		        trigger: 'axis'
		    		    },
		    		    barWidth:30,//柱子粗细
		    		    barGap:'20%',//柱子间距
		    		    calculable : true,
		    		    xAxis : [
		    		        {
		    		            type : 'category',
		    		            //data : ["1日", "2日", "3日", "4日","5日","6日","7日"]
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
		    		            name:'收费',
		    		            type:'bar',
		    		            itemStyle: {normal: {
		    		                label : {show:true,position:'top',formatter:'{c} 元'}
		    		            }},
		    		            data: charge_7day_data//[65, 59, 80, 81, 56, 55, 40]
		    		        },
		    		        {
		    		            name:'充值',
		    		            type:'bar',
		    		            itemStyle: {normal: {
		    		                label : {show:true,position:'top',formatter:'{c} 元'}
		    		            }},
		    		            data: refill_7day_data//[28, 48, 40, 19, 86, 27, 90]
		    		        },
		    		        {
		    		            name:'停车次数',
		    		            type:'line',
		    		            itemStyle: {normal: {
		    		                label : {show:true,position:'top',formatter:'{c} 次'}
		    		            }},
		    		            //data: [8, 12, 43, 54, 186, 127, 40]
		    		            data:tccs_7day_data
		    		        }
		    		    ]
		    		};
		    		                    
		     eChart_day.setOption(option_day);
		     
		     //- BAR CHART - 7日数据
		     /*var areaChartData = {
			     labels: ["1日", "2日", "3日", "4日","5日","6日","7日"],
			     datasets: [
			       {
			         label: "收费",
			         fillColor: "#00B285",
			         pointColor: "#00B285",
			         pointHighlightFill: "#fff",
			         data: [65, 59, 80, 81, 56, 55, 40]
			       },
			       {
			         label: "充值",
			         fillColor: "#B28500",
			         pointColor: "#B28500",
			         pointHighlightFill: "#fff",
			         data: [28, 48, 40, 19, 86, 27, 90]
			       }
			     ]
			   };
		     var barChartCanvas = $("#barChart_7day").get(0).getContext("2d");
		     var barChart = new Chart(barChartCanvas);
		     var barChartData = areaChartData;
		     var barChartOptions = {
		       scaleBeginAtZero: true,
		       scaleShowGridLines: true,
		       scaleGridLineColor: "rgba(0,0,0,.05)",
		       scaleGridLineWidth: 1,
		       scaleShowHorizontalLines: true,
		       scaleShowVerticalLines: true,
		       barShowStroke: true,
		       barStrokeWidth: 120,
		       barValueSpacing: 1,
		       barDatasetSpacing: 1,
		       barWidthRatio:0.5,
		       legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
		       responsive: true,
		       maintainAspectRatio: true
		     };
		
		     barChartOptions.datasetFill = false;
		     barChart.Bar(barChartData, barChartOptions);*/
     
		}
	});	
});
       