 // Get context with jQuery - using jQuery's .get() method.
var hours = ['0-1点','1-2点','2-3点','3-4点','4-5点','5-6点','6-7点','7-8点','8-9点','9-10点','10-11点','11-12点','12-13点','13-14点','14-15点',
	                '15-16点','16-17点','17-18点','18-19点','19-20点','20-21点','21-22点','22-23点','23-24点'];
var sf_djk = [0,0,0,0,0,0,0,0,0,189,712,1382,2147,3158,4272,5874,7212,8234,9044,10155,11354,11945,11945,11945,11945];
var sf_ylk = [58,158,258,358,458,558,658,758,858,965,1080,1188,1295,1310,1414,1523,1635,1746,1854,3562,3662,3762,3862,3962,3962];
var sf_zfb = [65,115,215,315,425,550,650,780,895,905,1033,1150,1267,1367,1489,1521,1628,1736,1840,2655,2755,2855,2955,2955,2955];
var sf_wx =  [88,112,218,324,428,528,628,770,885,995,1076,1183,1297,1397,1414,1521,1628,1728,1800,2255,2355,2455,2455,2655,2655];
var sf_hj =  new Array();
var sf_djk_hj = 0;
var sf_djk_hj_l = 0;
var sf_ylk_hj = 0;
var sf_ylk_hj_l = 0;
var sf_zfb_hj = 0;
var sf_zfb_hj_l = 0;
var sf_wx_hj = 0;
var sf_wx_hj_l = 0;
var now_sf = 0;
for(var i=0;i<hours.length;i++){
	sf_hj[i] = sf_djk[i] + sf_ylk[i] + sf_zfb[i] + sf_wx[i];		
}
var date = new Date();
var nowhour = date.getHours();  
sf_djk_hj = sf_djk[nowhour];
sf_ylk_hj = sf_ylk[nowhour];
sf_zfb_hj = sf_zfb[nowhour];
sf_wx_hj = sf_wx[nowhour];
now_sf = sf_djk_hj + sf_ylk_hj + sf_zfb_hj + sf_wx_hj;

$("#chargeAmount").text(parseNum(now_sf));
$("#chargeAmount2").text(parseNum(now_sf));
$("#chargePaymentAmount").text(parseNum(sf_djk_hj));
$("#chargeAlipayAmount").text(parseNum(sf_zfb_hj));
$("#chargeWechatAmount").text(parseNum(sf_wx_hj));
$("#chargeBankAmount").text(parseNum(sf_ylk_hj));



sf_djk_hj_l = Math.round(sf_djk_hj / now_sf * 100);
sf_ylk_hj_l = Math.round(sf_ylk_hj / now_sf * 100);
sf_zfb_hj_l = Math.round(sf_zfb_hj / now_sf * 100);
sf_wx_hj_l = Math.round(sf_wx_hj / now_sf * 100);
$("#chargePaymentAmount_pro").text("　"+sf_djk_hj_l + "%");
$("#chargeAlipayAmount_pro").text("　"+sf_zfb_hj_l + "%");
$("#chargeWechatAmount_pro").text("　"+sf_wx_hj_l + "%");
$("#chargeBankAmount_pro").text("　"+sf_ylk_hj_l + "%");

var lineChartData_sf_data = new Array();
for(var k=0;k<6;k++){ 
	lineChartData_sf_data[k]=new Array(); 
	for(var j=0;j<nowhour+1;j++){
		if(k==0){//时间点
			lineChartData_sf_data[k][j]=hours[j]; 
		}else if(k==1){//代缴卡
			lineChartData_sf_data[k][j]=sf_djk[j]; 
		}else if(k==2){//银联卡
			lineChartData_sf_data[k][j]=sf_ylk[j]; 
		}else if(k==3){//支付宝
			lineChartData_sf_data[k][j]=sf_zfb[j]; 
		}else if(k==4){//微信
			lineChartData_sf_data[k][j]=sf_wx[j]; 
		}else if(k==5){//合计
			lineChartData_sf_data[k][j]=sf_hj[j]; 
		}
		  
	}
}

var cz_djk = [0,0,0,0,0,0,0,0,1000,4000,6000,6600,6600,6600,8600,8900,9900,9900,9900,9900,9900,9900,9900,9900];
var cz_czk = [50,50,50,50,200,300,500,800,900,1000,1500,1600,1600,1600,1800,1900,2300,2400,2350,2500,2700,2700,2750,2750];
var cz_grzh= [50,50,50,100,100,200,400,500,800,1000,1200,1400,1400,1400,1400,1500,1600,1650,1700,1750,1800,1900,2100,2300];
var cz_hj = new Array();     
for(var i=0;i<hours.length;i++){
	cz_hj[i] = cz_djk[i] + cz_czk[i] + cz_grzh[i];		
} 	 
var lineChartData_cz_data = new Array();
for(var k=0;k<5;k++){ 
	lineChartData_cz_data[k]=new Array(); 
	for(var j=0;j<nowhour+1;j++){
		if(k==0){//时间点
			lineChartData_cz_data[k][j]=hours[j]; 
		}else if(k==1){//代缴卡
			lineChartData_cz_data[k][j]=cz_djk[j]; 
		}else if(k==2){//车主卡
			lineChartData_cz_data[k][j]=cz_czk[j]; 
		}else if(k==3){//个人账户
			lineChartData_cz_data[k][j]=cz_grzh[j]; 
		}else if(k==4){//合计
			lineChartData_cz_data[k][j]=cz_hj[j]; 
		}			  
	}
}
$("#refillAmount").text(parseNum(cz_hj[nowhour]));
$("#refillAmount2").text(parseNum(cz_hj[nowhour]));
$("#paymentCardAmount").text(parseNum(cz_djk[nowhour]));
$("#ownerCardAmount").text(parseNum(cz_czk[nowhour]));
$("#individualAccountAmount").text(parseNum(cz_grzh[nowhour]));

$("#paymentCardAmount_pro").text("　"+Math.round(cz_djk[nowhour] / cz_hj[nowhour] * 100)+"%");
$("#ownerCardAmount_pro").text("　"+Math.round(cz_czk[nowhour] / cz_hj[nowhour] * 100)+"%");
$("#individualAccountAmount_pro").text("　"+Math.round(cz_grzh[nowhour] / cz_hj[nowhour] * 100)+"%");

$(function () {	
	//今日累计收费
     var lineChartData_sf = {
         labels: lineChartData_sf_data[0],
         datasets: [
         {
           label: "合计",
           fillColor : "#FF0000 ", // 背景色
           strokeColor : "#FF0000 ", // 线
           pointColor : "#FF0000 ", // 点
           pointStrokeColor : "#fff", // 点的包围圈
           data: lineChartData_sf_data[5]//Y轴
         },
         {
           label: "代缴卡",
           fillColor : "#0000FF", // 背景色
           strokeColor : "#0000FF", // 线
           pointColor : "#0000FF", // 点
           pointStrokeColor : "#fff", // 点的包围圈
           data:lineChartData_sf_data[1]
         },
         {
             label: "银联卡",
             fillColor : "#FF00FF", // 背景色
             strokeColor : "#FF00FF", // 线
             pointColor : "#FF00FF", // 点
             pointStrokeColor : "#fff", // 点的包围圈
             data: lineChartData_sf_data[2]
         },
         {
             label: "支付宝",
             fillColor : "#FF8800", // 背景色
             strokeColor : "#FF8800", // 线
             pointColor : "#FF8800", // 点
             pointStrokeColor : "#fff", // 点的包围圈
             data: lineChartData_sf_data[3]
         },
         {
           label: "微信",
           fillColor : "#00AA00", // 背景色
           strokeColor : "#00AA00", // 线
           pointColor : "#00AA00", // 点
           pointStrokeColor : "#fff", // 点的包围圈
           data: lineChartData_sf_data[4]
         }
       ]
     };
     
     
 	 
     //今日累计充值
     var lineChartData_cz = {
       labels: lineChartData_cz_data[0],
       datasets: [
         {
           label: "合计",
           fillColor : "#FF0000", // 背景色
           strokeColor : "#FF0000", // 线
           pointColor : "#FF0000", // 点
           pointStrokeColor : "#fff", // 点的包围圈
           data: lineChartData_cz_data[4]//Y轴
         },
         {
           label: "代缴卡",
           fillColor : "#0000FF", // 背景色
           strokeColor : "#0000FF", // 线
           pointColor : "#0000FF", // 点
           pointStrokeColor : "#fff", // 点的包围圈
           data: lineChartData_cz_data[1]
         },
         {
             label: "车主卡",
             fillColor : "#FF00FF", // 背景色
             strokeColor : "#FF00FF", // 线
             pointColor : "#FF00FF", // 点
             pointStrokeColor : "#fff", // 点的包围圈
             data: lineChartData_cz_data[2]
         },
         {
           label: "个人账户",
           fillColor : "#00AA00", // 背景色
           strokeColor : "#00AA00", // 线
           pointColor : "#00AA00", // 点
           pointStrokeColor : "#fff", // 点的包围圈
           data: lineChartData_cz_data[3]
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
                    {value:lineChartData_cz_data[4][nowhour], name:'今日充值', selected:true ,itemStyle:{normal:{color:"#FF5C26"}}},
                    {value:lineChartData_sf_data[5][nowhour], name:'今日收费', itemStyle:{normal:{color:"#0080FF"}}}
                ]
            },
            {
                name:'今日收入',
                type:'pie',
                radius: [90, 120],
                data:[
                    {value:Math.round(lineChartData_cz_data[4][nowhour]/10*4), name:'临平街道', itemStyle:{normal:{color:"#FF4D4D"}}},                
                    {value:Math.round(lineChartData_cz_data[4][nowhour]/10*6), name:'南苑街道', itemStyle:{normal:{color:"#FF8000"}}},
                    
                    {value:Math.round(lineChartData_sf_data[5][nowhour]/20*8), name:'临平街道', itemStyle:{normal:{color:"#9999FF"}}},                
                    {value:Math.round(lineChartData_sf_data[5][nowhour]/20*12), name:'南苑街道', itemStyle:{normal:{color:"#73B9FF"}}}
                    
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
                    {value:lineChartData_cz_data[4][nowhour], name:'今日充值', selected:true ,itemStyle:{normal:{color:"#FF5C26"}}},
                    {value:lineChartData_sf_data[5][nowhour], name:'今日收费', itemStyle:{normal:{color:"#0080FF"}}}
                ]
            },
            {
                name:'今日收入',
                type:'pie',
                radius: [90, 120],
                
                data:[                  
                    
                    {value:Math.round(lineChartData_cz_data[3][nowhour]), name:'个人账户', itemStyle:{normal:{color:"#E87C25"}}},                
                    {value:Math.round(lineChartData_cz_data[2][nowhour]), name:'车主卡', itemStyle:{normal:{color:"#7373FF"}}},
                    {value:Math.round(lineChartData_cz_data[1][nowhour]), name:'代缴卡', itemStyle:{normal:{color:"#73B9FF"}}}, 
                    
                    {value:Math.round(lineChartData_sf_data[1][nowhour]), name:'代缴卡', itemStyle:{normal:{color:"#FF4D4D"}}},  
                    {value:Math.round(lineChartData_sf_data[2][nowhour]), name:'银联卡', itemStyle:{normal:{color:"#FF00FF"}}},
                    {value:Math.round(lineChartData_sf_data[3][nowhour]), name:'支付宝', itemStyle:{normal:{color:"#FF8000"}}},
                    {value:Math.round(lineChartData_sf_data[4][nowhour]), name:'微信', itemStyle:{normal:{color:"#00AA00"}}}
                    
                ]
            }
        ]
     };
     pieEChart_qd.setOption(option_qd);
     
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
	            data:[Math.round(lineChartData_sf_data[1][nowhour-1]/39*2), Math.round(lineChartData_sf_data[1][nowhour-1]/39*3), Math.round(lineChartData_sf_data[1][nowhour-1]/39*4), Math.round(lineChartData_sf_data[1][nowhour-1]/39*5), Math.round(lineChartData_sf_data[1][nowhour-1]/39*6)]  
	        }  
	    ]
	};
    		                    
     eChart_tcd.setOption(option_tcd);
     
     //收费员Top5
     var eChart_sfy =  echarts.init(document.getElementById('sfyTop5Div'));
     option_sfy = {
    		color:['#C1232B','#B5C334','#FCCE10','#E87C25','#FFA64D'],
 		 	legend: {
 		 		data:['陈文水','徐红','李伯庆','吴清义','高翔']
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
		            data : ['陈文水','徐红','李伯庆','吴清义','高翔']
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
		            data:[Math.round(lineChartData_sf_data[1][nowhour-1]/35*2), Math.round(lineChartData_sf_data[1][nowhour-1]/35*3), Math.round(lineChartData_sf_data[1][nowhour-1]/35*4), Math.round(lineChartData_sf_data[1][nowhour-1]/35*5), Math.round(lineChartData_sf_data[1][nowhour-1]/35*6)]
		        }  
		    ]
		};
    		                    
     eChart_sfy.setOption(option_sfy);
     
     var datetime = new Array();
     var tccsdata = new Array();
     var sybwdata = new Array();
     switch(nowhour){
     	case 0: 
     		alldatetime = ["0点"]; 
     		tccsdata = [200]; 
     		sybwdata = [335]; 
     		break;
     	case 1: 
     		alldatetime = ["0点"]; 
     		tccsdata = [200];
     		sybwdata = [335];
     		break;
     	case 2: 
     		alldatetime = ["0点","2点"]; 
     		tccsdata = [200,212]; 
     		sybwdata = [335,323]; 
     		break;
     	case 3: 
     		alldatetime = ["0点","2点"]; 
     		tccsdata = [200,212]; 
     		sybwdata = [335,323]; 
     		break;
     	case 4: 
     		alldatetime = ["0点","2点","4点"]; 
     		tccsdata = [200,212,212]; 
     		sybwdata = [335,323,323];
     		break;
     	case 5: 
     		alldatetime = ["0点","2点","4点"]; 
     		tccsdata = [200,212,212]; 
     		sybwdata = [335,323,323]; 
     		break;
     	case 6: 
     		alldatetime = ["0点","2点","4点","6点"]; 
     		tccsdata = [200,212,212,453]; 
     		sybwdata = [335,323,323,341];  
     		break;
     	case 7: 
     		alldatetime = ["0点","2点","4点","6点"]; 
     		tccsdata = [200,212,212,453]; 
     		sybwdata = [335,323,323,341]; 
     		break;
     	case 8: 
     		alldatetime = ["0点","2点","4点","6点","8点"]; 
     		tccsdata = [200,212,212,453,898]; 
     		sybwdata = [335,323,323,341,124]; 
     		break;
     	case 9: 
     		alldatetime = ["0点","2点","4点","6点","8点"]; 
     		tccsdata = [200,212,212,453,898]; 
     		sybwdata = [335,323,323,341,124]; 
     		break;
     	case 10: 
     		alldatetime = ["0点","2点","4点","6点","8点","10点"]; 
     		tccsdata = [200,212,212,453,898,1221]; 
     		sybwdata = [335,323,323,341,124,251];  
     		break;
     	case 11: 
     		alldatetime = ["0点","2点","4点","6点","8点","10点"]; 
     		tccsdata = [200,212,212,453,898,1221]; 
     		sybwdata = [335,323,323,341,124,251]; 
     		break;
     	case 12: 
     		alldatetime = ["0点","2点","4点","6点","8点","10点","12点"]; 
     		tccsdata = [200,212,212,453,898,1221,2061]; 
     		sybwdata = [335,323,323,341,124,251,231]; 
     		break;
     	case 13: 
     		alldatetime = ["0点","2点","4点","6点","8点","10点","12点"]; 
     		tccsdata = [200,212,212,453,898,1221,2061]; 
     		sybwdata = [335,323,323,341,124,251,231]; 
     		break;
     	case 14: 
     		alldatetime = ["0点","2点","4点","6点","8点","10点","12点","14点"]; 
     		tccsdata = [200,212,212,453,898,1221,2061,2114]; 
     		sybwdata = [335,323,323,341,124,251,231,132]; 
     		break;
     	case 15: 
     		alldatetime = ["0点","2点","4点","6点","8点","10点","12点","14点"]; 
     		tccsdata = [200,212,212,453,898,1221,2061,2114]; 
     		sybwdata = [335,323,323,341,124,251,231,132]; 
     		break;
     	case 16: 
     		alldatetime = ["0点","2点","4点","6点","8点","10点","12点","14点","16点"]; 
     		tccsdata = [200,212,212,453,898,1221,2061,2114,2031]; 
     		sybwdata = [335,323,323,341,124,251,231,132,145]; 
     		break;
     	case 17: 
     		alldatetime = ["0点","2点","4点","6点","8点","10点","12点","14点","16点"]; 
     		tccsdata = [200,212,212,453,898,1221,2061,2114,2031]; 
     		sybwdata = [335,323,323,341,124,251,231,132,145]; 
     		break;
     	case 18: 
     		alldatetime = ["0点","2点","4点","6点","8点","10点","12点","14点","16点","18点"]; 
     		tccsdata = [200,212,212,453,898,1221,2061,2114,2031,1893]; 
     		sybwdata = [335,323,323,341,124,251,231,132,145,232]; 
     		break;
     	case 19: 
     		alldatetime = ["0点","2点","4点","6点","8点","10点","12点","14点","16点","18点"]; 
     		tccsdata = [200,212,212,453,898,1221,2061,2114,2031,1893]; 
     		sybwdata = [335,323,323,341,124,251,231,132,145,232]; 
     		break;
     	case 20: 
     		alldatetime = ["0点","2点","4点","6点","8点","10点","12点","14点","16点","18点","20点"]; 
     		tccsdata = [200,212,212,453,898,1221,2061,2114,2031,1893,1931]; 
     		sybwdata = [335,323,323,341,124,251,231,132,145,232,321]; 
     		break;
     	case 21: 
     		alldatetime = ["0点","2点","4点","6点","8点","10点","12点","14点","16点","18点","20点"]; 
     		tccsdata = [200,212,212,453,898,1221,2061,2114,2031,1893,1931]; 
     		sybwdata = [335,323,323,341,124,251,231,132,145,232,321]; 
     		break;
     	case 22: 
     		alldatetime = ["0点","2点","4点","6点","8点","10点","12点","14点","16点","18点","20点","22点"]; 
     		tccsdata = [200,212,212,453,898,1221,2061,2114,2031,1893,1931,1896]; 
     		sybwdata = [335,323,323,341,124,251,231,132,145,232,321,284]; 
     		break;
     	case 23: 
     		alldatetime = ["0点","2点","4点","6点","8点","10点","12点","14点","16点","18点","20点","22点",'24点']; 
     		tccsdata = [200,212,212,453,898,1221,2061,2114,2031,1893,1931,1896,652]; 
     		sybwdata = [335,323,323,341,124,251,231,132,145,232,321,284,301]; 
     		break;
     }
     var now_tccs = 0;
     for(var i=0;i<tccsdata.length;i++){
    	 now_tccs = now_tccs + tccsdata[i];
     }
     $("#parkingCount").text(parseNum(now_tccs));
     $("#parkingCount2").text(parseNum(now_tccs));
     
     $("#berth_zzl").text(Math.round(now_tccs/1660)+2);
     $("#berth_lyl").text(85+ "%");
     $("#berth_zyl").text(92+ "%");
     
     var lineChartData = {
	    labels : alldatetime, //X轴 坐标
	    datasets : [
	        {
	            fillColor : "ffff00", // 背景色
	            strokeColor : "#ef7c1f", // 线
	            pointColor : "#ef7c1f", // 点
	            pointStrokeColor : "#fff", // 点的包围圈
	            data : tccsdata // Y轴坐标
	        }
	    ]

	}
    var lineChartData_sybw = {
	    labels : alldatetime, //X轴 坐标
	    datasets : [
	        {
	            fillColor : "ffff00", // 背景色
	            strokeColor : "#ef7c1f", // 线
	            pointColor : "#ef7c1f", // 点
	            pointStrokeColor : "#fff", // 点的包围圈
	            data : sybwdata // Y轴坐标
	        }
	    ]

	}
	var defaults = {
	    scaleOverlay : false,
	    scaleOverride : false,
	    scaleSteps : null,
	    scaleStepWidth : 10,
	    scaleStartValue : null,
	    scaleLineColor : "rgba(0,0,0,.1)",
	    scaleLineWidth : 1,
	    scaleShowLabels : true,
	    scaleLabel : "<%=value%>",
	    scaleFontFamily : "'Arial'",
	    scaleFontSize : 12,
	    scaleFontStyle : "normal",
	    scaleFontColor : "#666",
	    scaleShowGridLines : true,
	    scaleGridLineWidth : 1,
	    bezierCurve : false,
	    pointDot : true,
	    pointDotRadius : 3,
	    datasetStroke : true,
	    datasetFill : false,
	    onAnimationComplete : null	    
	}
     
    new Chart(document.getElementById("tccsDiv").getContext("2d")).Line(lineChartData, defaults);
    new Chart(document.getElementById("sybwDiv").getContext("2d")).Line(lineChartData_sybw, defaults);
    
    var days = new Array(7); 
    var now = new Date();
    now = new Date(now - 24 * 60 * 60 * 1000);
    var s = '';
    var i = 1;
    while (i < 8) {
    	days[7-i] = (now.getMonth() + 1) + '-' + now.getDate();
        now = new Date(now - 24 * 60 * 60 * 1000);
        i++;
    }
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
	    barGap:'30%',//柱子间距
	    calculable : true,
	    xAxis : [
	        {
	            type : 'category',
	            data : days
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
	            data: [20516, 19513, 20514, 22219, 24318, 20117, 21011]
	        },
	        {
	            name:'充值',
	            type:'bar',
	            itemStyle: {normal: {
	                label : {show:true,position:'top',formatter:'{c} 元'}
	            }},
	            data: [12700, 12650, 13300, 13700, 14550, 12350, 15150]
	        },
	        {
	            name:'停车次数',
	            type:'line',
	            itemStyle: {normal: {
	                label : {show:true,position:'top',formatter:'{c} 次'}
	            }},
	            data: [14087, 13522, 14595, 15561, 13593, 14595, 13296]
	        }
	    ]
	};
    		                    
    eChart_day.setOption(option_day);  
});
       