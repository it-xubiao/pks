$(function(){
	var date = new Date();
	var day = date.getDate()==1?"01":((date.getDate()-1)<10?("0"+(date.getDate()-1)):(date.getDate()-1));
	if(date.getMonth()+1<10){
		$('#parklotStartDate').val(date.getFullYear()+"-"+("0"+(date.getMonth()+1))+"-01");
		$('#parklotEndDate').val(date.getFullYear()+"-"+("0"+(date.getMonth()+1))+"-"+day);
	}else{
		$('#parklotStartDate').val(date.getFullYear()+"-"+(date.getMonth()+1)+"-01");
		$('#parklotEndDate').val(date.getFullYear()+"-"+(date.getMonth()+1)+"-"+day);
	}
	
	var initTable = new TableInit();
	initTable.init();
	getRegion();
	getHistoryParklotChart();
//	getParklotIdChart();
	historyParklotIdle();
	$('#searchParklotBtn').click(function(){
		//searchParklotIdChart();
//		getParklotIdChart();
		historyParklotIdle();
		
		$('#data_list_table').bootstrapTable('refresh');
	});
	

});


// 搜索历史车辆趋势数据
function searchParklotIdChart(){
	ChenkinTime();	
}

function ChenkinTime() {
	var parkDayStartDate = $('#parklotStartDate').val();	
	var parkDayEndDate = $('#parklotEndDate').val();
	var startDate = formatDate(parkDayStartDate);
	var endDate = formatDate(parkDayEndDate);
	if( parkDayStartDate != "" && parkDayEndDate != "" ){
		if (startDate > endDate) {
			swal("警告", "起始时间必须小于结束时间.", "warning");
			return;		
		} else if(endDate - startDate > 30){
			swal("警告", "时间间隔超过一个月.", "warning");
			return;	
		}
		getHistoryParklotChart();
	}else{
		swal("警告", "时间不能为空！.", "warning");
	}
}

function formatDate(strDate){
	 var  str=strDate.toString();
     var date = new Date(str.replace(/-/g,"/"));
     return date.getTime()/(1000*60*60*24);
}

var TableInit = function () {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.init = function () {
      $('#data_list_table').bootstrapTable({
    	    url:'getParklotIdHistoryList.do',     //请求后台的URL（*）
    	    method: 'post',           //请求方式（*）
	        toolbar: '#toolbar',        //工具按钮用哪个容器
	        striped: false,           //是否显示行间隔色
	        cache: false,            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
	        showRefresh:false,
	        showToggle:false,
	        showColumns:false,
	        pagination: false,          //是否显示分页（*）
	        sortable: true,           //是否启用排序
	        showExport: false,                     //是否显示导出
            exportDataType: "all",              //basic', 'all', 'selected'.
            exportTypes : ['excel'],
	        sortName:"id",     //排序字段名称
	        sortOrder: "desc",          //排序方式
	        queryParamsType:'limit',
	        queryParams: oTableInit.queryParams,//传递参数（*）
	        //sidePagination: "server",      //分页方式：client客户端分页，server服务端分页（*）
	        pageNumber:1,            //初始化加载第一页，默认第一页
	        pageSize: 10,            //每页的记录行数（*）
	        // pageList: [10, 25, 50, 100],    //可供选择的每页的行数（*）
	        strictSearch: true,
	        clickToSelect: true,        //是否启用点击选中行
	 	    // height: 460,            //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
	        uniqueId: "id",           //每一行的唯一标识，一般为主键列
	        cardView: false,          //是否显示详细视图
	        detailView: false,          //是否显示父子表
	        contentType: "application/x-www-form-urlencoded",
	        /*onLoadSuccess : function(){
	        	parkTopFive();
	        },*/
	        columns: [
	          {field: 'REGIONNAME',title: '区域', align:'center',valign:'middle',sortable:false},
	          {field: 'PARKNAME',title: '停车点', align:'center',valign:'middle',sortable:false},
	          {field: 'ARRIVECOUNT',title: '驶入车辆', align:'center',valign:'middle',sortable:false},
	          {field: 'DEPARTURECOUNT',title: '驶离车辆', align:'center',valign:'middle',sortable:false}
	        ],

	      });
	    };
	    
	    oTableInit.queryParams = function (params) {
	      $.each(params,function(key,val){
	        if($.isPlainObject(val) || $.isArray(val)){
	          subObj(val);
	        }else{
	          //console.log(key+'='+val);
	        }
	      });
	      var temp = {  //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		  //page : params.offset==0 ? 1:(params.offset/params.limit)+1,  //pageIndex
	    	page : 10,
	        rows: params.limit, //页码
	        /* sort : params.sort,
	        order : params.order,
	        date: $("#codeType").val(),*/
	        regionId : $("#regionId").combotree("getValue"),
	        startDate : $("#parklotStartDate").val(),
	    	endDate : $("#parklotEndDate").val()
	      };
	      return temp;
	    };
	    return oTableInit;
}

function getHistoryParklotChart(){
	var historyChart = echarts.init(document.getElementById('historyParklotChart'));
	option = {
			tooltip : {
				trigger: 'axis'
		    },
		    legend: {
		    	data:['驶入','驶离']
		    },
		    toolbox: {
		        show : false		        
		    }, 
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
		            min : 0,
		            max : 23,
		            interval : 1,
		            splitLine : {
		        		show : false
		        	},
		        	axisTick : {
		            	show : false
		            },
		        	axisLine : {
		        		show : false
		        	},
		            axisLabel : {
		            	show: true,
		            	interval : 0,
		            	rotate : 35,
                        textStyle: {
                            color: '#607B8B' // 字体颜色
                        }
		            },
		            data : ['4-1','4-2','4-3','4-4','4-5','4-6','4-7','4-8','4-9','4-10','4-11','4-12']
		        }
		    ],
		    yAxis : [
		        {
		        	name : '(辆)',
		        	type : 'value',
		        	axisLine : {
		        		show : false
		        	},
		        	axisTick : {
		        		show : false
		        	},
		        	axisLabel : {
		        		textStyle: {
		        			color: '#607B8B' // 字体颜色
		        		},
		        		formatter: '{value}'
		        	}
		        }
		    ],
		    series : [
		        {
		        	name:'驶入',
		            type:'line',
		            itemStyle : {
		           		normal : {
		           			lineStyle : {
		    	        			color : '#CD0000'
		           			}
		           		}
		           	},
		            data:[120, 132, 101, 134, 90, 230, 210, 110, 210, 320, 280, 180]
		        },
		        {
		        	name:'驶离',
		            type:'line',
		            itemStyle : {
		           		normal : {
		           			lineStyle : {
		    	        			color : '#9370DB'
		           			}
		           		}
		           	},
		            data:[220, 182, 191, 234, 290, 330, 310, 210, 310, 420, 380, 280]     
		        }	        
		    ]
    };    
	historyChart.setOption(option);
	getParklotIdHistoryData(historyChart);
	//$('#data_list_table').bootstrapTable("refresh");
}
/*function parkTopFive(){
	var result = $('#data_list_table').bootstrapTable("getData","true");
	result = eval(result);
	console.log(result);
}*/
//历史车辆趋势
function getParklotIdHistoryData(historyChart){
	$('#parkin').text(current_day_data[4][current_day_data[4].length-1]);
	$('#parkout').text(current_day_data[5][current_day_data[5].length-1]);
	 var options = historyChart.getOption();
     var startDate = $('#parklotStartDate').val();
     var endDate = $('#parklotEndDate').val();
     var regionId = $("#regionId").combotree("getValue");
     //通过Ajax获取数据  
     $.ajax({
         type : "post",
         async : false, //同步执行  
         url : "getParklotIdHistoryData.do",
         data :"startDate="+startDate+"&endDate="+endDate+"&regionId="+regionId,
         dataType : "json", //返回数据形式为json
         success : function(result) {
         	result = eval(result);
             if (result) {
             	// options.legend[0].data = result.option.legend.data;
                 // options.title[0].text = result.option.title.text;
            	 if (typeof(result.option) != 'undefined') {
            		 if (typeof(result.option.series) != 'undefined') {
            			 options.series[0].data = result.option.series[0].data;
            			 options.series[1].data = result.option.series[1].data;
            		 }
            		 if (typeof(result.option.xAxis) != 'undefined') {
            			 options.xAxis[0].data = result.option.xAxis[0].data;
            		 }
            	 }
                 
                 historyChart.hideLoading();
                 historyChart.setOption(options);
             }
         },
         error : function(errorMsg) {
             alert("请求数据失败!");
             historyChart.hideLoading();
         }  
     });
}

//当前车辆趋势
var day_option = {
	    tooltip : {
	        trigger: 'axis'
	    },
	    legend: {
	    	data:['驶入','驶离']
	    },
	    toolbox: {
	        show : false		        
	    }, 
	    calculable : true,
	    xAxis : [
	        {
	            type : 'category',
	            boundaryGap : false,
	            interval : 1,
	            splitLine : {
	        		show : false
	        	},
	        	axisTick : {
	            	show : false
	            },
	        	axisLine : {
	        		show : false
	        	},
	            axisLabel : {
	            	show: true,
	            	interval : 0,
//	            	rotate : 35,
                    textStyle: {
                        color: '#607B8B' // 字体颜色
                    }
	            },
	            data : current_day_data[0]
	        }
	    ],
	    yAxis : [
	        {
	        	name : '(辆)',
	        	type : 'value',
	        	axisLine : {
	        		show : false
	        	},
	        	axisTick : {
	        		show : false
	        	},
	        	axisLabel : {
	        		textStyle: {
	        			color: '#607B8B' // 字体颜色
	        		},
	        		formatter: '{value}'
	        	}
	        }
	    ],
	    series : [
	        {
	        	name:'驶入',
	            type:'line',
	            itemStyle : {
	        		normal : {
	        			lineStyle : {
		        			color : '#CD0000'
	        			}
	        		}
	        	},
	            data:current_day_data[4]     
	        },
	        {
	        	name:'驶离',
	            type:'line',
	            itemStyle : {
	        		normal : {
	        			lineStyle : {
		        			color : '#9370DB'
	        			}
	        		}
	        	},
	            data:current_day_data[5]     
	        }	        
	    ]
};
//初始化echarts实例
var currentParklotIdChart = echarts.init(document.getElementById('lineChart'));
currentParklotIdChart.setOption(day_option);
currentParklotIdChart.hideLoading();
//var regionId = $("#regionId").combotree("getValue");
//var startDate = $('#parklotStartDate').val();
//var endDate = $('#parklotEndDate').val();
//getParklotIdTodayData('getParklotIdTodayData.do',startDate,endDate,regionId, '', dayChart, 'line');

// 各停车点车辆趋势对比图
var parkLot_option = {
        title : {
//        text: '各停车点车辆趋势图',
//        x:'center'
      },
      tooltip : {
        trigger: 'axis'
      },
      toolbox: {
        show : true
      },     
      calculable : true,
      xAxis : [
       {
        type : 'value',
        boundaryGap : [0, 0.01],
        axisLabel : {
        	show: true,
        	interval : 0,
        	rotate : 45,
            textStyle: {
                color: '#607B8B' // 字体颜色
            }
        }
      }
     ],
     yAxis : [
      {
       type : 'category',
       data : ['东梅路','市民之家(内)','藕花洲大街','育才路','府前路','马家弄']
      }
    ],
    series : [
      {
       name:'驶入车辆',
       type:'bar',
       itemStyle : {
    	   normal : {
    		   color : '#8500B2'
    	   }  
       },
       barWidth : 12,
       data:[18203, 23489, 29034, 104970, 131744, 630230]
      },
      {
       name:'驶离车辆',
       type:'bar',
       itemStyle : {
    	   normal : {
    		   color : '#FF99FF'
    	   }  
       },
       barWidth : 12,
       data:[19325, 23438, 31000, 121594, 134141, 681807]
      }
    ],
	  legend: {
        data:['驶入车辆', '驶离车辆']
//        y : 'bottom'
    }
 };
// 车辆趋势对比图
function getParklotIdChart(){
    var parkLotChart = echarts.init(document.getElementById('carChart'));
     parkLotChart.setOption(parkLot_option);
     parkLotChart.hideLoading();
     
     var regionId = $("#regionId").combotree("getValue");
     var startDate = $('#parklotStartDate').val();
     var endDate = $('#parklotEndDate').val();
     //getParklotIdTodayData('getParklotComparedData.do',startDate, endDate,regionId, 20, parkLotChart, 'bar');
}
function getParklotIdTodayData(url, startDate, endDate, regionId, showNum, chart, charType) {
    //获得图表的options对象  
    var options = chart.getOption();
    //通过Ajax获取数据  
    $.ajax({
        type : "post",
        async : false, //同步执行  
        url : url,
        data : "startDate="+startDate+"&endDate="+endDate+"&showNum="+showNum+"&regionId="+regionId,
        dataType : "json", //返回数据形式为json
        success : function(result) {
        	result = eval(result);
            if (result) {
            	// options.legend[0].data = result.option.legend.data;
            	if (charType == 'bar') {
//            		 options.title[0].text = result.option.title.text;
            	}
            	if (typeof(result.option.series[0].data) == "undefined") { 
            		options.series[0].data = [];
            	} else {
            		options.series[0].data = result.option.series[0].data;
            	}
            	
            	if (typeof(result.option.series[1].data) == "undefined") { 
            		options.series[1].data = [];
            	} else {
            		options.series[1].data = result.option.series[1].data;
            	}
            	
            	if (typeof(result.option.yAxis[0].data) == "undefined") { 
            		options.yAxis[0].data = [];
            	} else {
            		options.yAxis[0].data = result.option.yAxis[0].data;
            	}
                
                chart.hideLoading();
                chart.setOption(options);
            }
        },
        error : function(errorMsg) {
            alert("请求数据失败!");
            chart.hideLoading();
        }  
    });
}

$('.form_datetime').datetimepicker({
    format: 'yyyy-mm-dd',
	language: 'zh-CN', //汉化 
	todayBtn: 1,
	minView: "month",
	icon:'fa-arrow-right',
   	autoclose:true //选择日期后自动关闭 
});

//导出数据
function exports() {
	if ($('#data_list_table').bootstrapTable("getData").length > 0) {
			var parkDayStartDate = $('#parklotStartDate').val();
			var parkDayEndDate = $('#parklotEndDate').val();
			var regionId = $("#regionId").combotree("getValue");
			var startDate = formatDate(parkDayStartDate);
			var endDate = formatDate(parkDayEndDate);
			if( parkDayStartDate != "" && parkDayEndDate != "" ){
				if (startDate > endDate) {
					swal("警告", "起始时间大于结束时间！", "warning");
				}else{
					window.open('../parklotIdleBerthChange/exportParklotData.do?regionId=' + regionId
							+ "&startDate=" + parkDayStartDate + "&endDate="+ parkDayEndDate);
				}
			}else{
				swal("警告", "时间不能为空！", "warning");
			}
	} else {
		swal("", "当前查询条件下没有数据", "warning");
    }
}

//获取区域默认值
function getRegion(){
	$.ajax({
		type : "get",
        async : false, //同步执行  
        url : "/spms/park/getStreetTree.do",
        data : {},
        dataType : "json", //返回数据形式为json
        success : function(result) {
        	result = eval(result);
        	$('#regionId').combotree("setValue",result[0].id);
        }
	});
}
