	$(function () {
		$('#number').text(current_day_data[2][current_day_data[2].length-1]);
		var oTable = new TableInit();
		 oTable.init();
		 
		 $('#number').text(current_day_data[2][current_day_data[2].length-1]);
		 
		// 初始化历史记录
//		 showSearchChar();
		 showSearchOccupyCompare();
		$('#searchBtn').click(function(){
			$("#occupyRatioChart").html('');
			searchOccupancy();
			showSearchOccupyCompare();
	    });
	});
		
	var TableInit = function () {
	    var oTableInit = new Object();
	    //初始化Table
	    oTableInit.init = function () {
	      $('#data_list_table').bootstrapTable({
	        	url:'getOccupancyList.do',     //请求后台的URL（*）
	        	method: 'post',           //请求方式（*）
		        toolbar: '#toolbar',        //工具按钮用哪个容器
		        striped: false,           //是否显示行间隔色
		        cache: false,            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		        showRefresh:false,
		        showToggle:false,
		        showColumns:false,
		        pagination: false,          //是否显示分页（*）
		        sortable: false,           //是否启用排序
		        //showExport: true,                     //是否显示导出
	            //exportDataType: "all",              //basic', 'all', 'selected'.
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
		        columns: [
		          {field: 'regionName',title: '区域', align:'center',valign:'middle',sortable:false},
		          {field: 'parkName',title: '停车点', align:'center',valign:'middle',sortable:false},
		          {field: 'berthCount',title: '泊位数量', align:'center',valign:'middle',sortable:false},
		          {field: 'correntOccupancy',title: '当前占用', align:'center',valign:'middle',sortable:false},
		          {field: 'occupancy',title: '占用率（%）', align:'center',valign:'middle',sortable:false}
		        ],

		      });
		    };

		    oTableInit.queryParams = function (params) {
		      $.each(params,function(key,val){
		        if($.isPlainObject(val) || $.isArray(val)){
		          subObj(val);
		        }else{
		          console.log(key+'='+val);
		        }
		      });
		      var temp = {  //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
//		        page : params.offset==0 ? 1:(params.offset/params.limit)+1,  //pageIndex
		        rows: params.limit, //页码
		        sort : params.sort,
		        order : params.order,
		        
//  			 	        tradetype:$('input:radio[name="tradetype"]:checked').val(),
//  			 	        success:$('input:radio[name="success"]:checked').val(),
		      };
		      return temp;
		    };
		    return oTableInit;
	};
	
	// 当前占用率
	var option = {
		    tooltip : { // 提示框
		        trigger: 'axis',
		        formatter : '{b0}<br/>占用率: {c0} %'
		    },
		    legend: {
		        data:'当前泊位占用率（%）'
		    },
		    toolbox: {
		        show : false
		    }, 
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category', //category类目类型，必须从data中获取数据
		            boundaryGap : false,
		            interval : 1,
		            boundaryGap : false,
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
//		            	rotate : 45,
                        textStyle: {
                            color: '#607B8B' // 字体颜色
                        }
		            },
		            data : current_day_data[0]
		        }
		    ],
		    yAxis : [
		        {
		        	name : '占用率(%)',
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
                        }
//		                formatter: '{value}'
		            }
		        }
		    ],
		    series : [
		        {
		            name:'占用率',
		        	type:'line',
		            itemStyle : {
		        		normal : {
		        			lineStyle : {
			        			color : '#6495ED',
			        			width : 3
		        			}
		        		}
		        	},
		        	markPoint : {
		        		symbol : 'pin',
		        		itemStyle : {
		        			normal : {
		        				color : '#FF8247'
		        			}
		        		},
		                data : [
		                    {type : 'max', name: '最大值', itemStyle:{normal:{color:'red'}}},
		                    {type : 'min', name: '最小值', itemStyle:{normal:{color:'blue'}}}
		                ]
		            },
		            data:current_day_data[2]
		        }
		    ]
	};
	function getCurrentDayChartData() {
        //获得图表的options对象  
        var options = currentDayChart.getOption();
        //通过Ajax获取数据  
        $.ajax({
            type : "post",
            async : false, //同步执行  
            url : "getCurrentDayData.do",
            data : {},
            dataType : "json", //返回数据形式为json
            success : function(result) {
            	result = eval(result);
                if (result) {
                	// options.legend[0].data = result.option.legend.data;
                    // options.title[0].text = result.option.title.text;
                    options.series[0].data = result.option.series[0].data;
                    options.xAxis[0].data = result.option.xAxis[0].data;
                    
                    currentDayChart.hideLoading();
                    currentDayChart.setOption(options);
                }
            },
            error : function(errorMsg) {
                alert("请求数据失败!");
                currentDayChart.hideLoading();
            }  
        });
    }
	//初始化echarts实例
	var currentDayChart = echarts.init(document.getElementById('currentDayChart'));
	currentDayChart.setOption(option);
	currentDayChart.hideLoading();
	//getCurrentDayChartData();//ajax后台交互
	
	
	// 各停车点占用率对比图
	var option_occupyRatioChart = {
            title : {
	            text: '各停车点占用率对比图（%）',
	            x:'center'
            },
            tooltip : {
		        trigger: 'axis',
		        formatter : '{b0}<br/>占用率: {c0} %'
			},
            toolbox: {
            	show : true
            },
            calculable : true,
            xAxis : [
            {
	            type : 'value',
	            interval : 10,
        	    splitLine : {
	        		show : false
	        	},
	        	axisTick : {
	            	show : false
	            },
	        	axisLine : {
	        		show : false
	        	}
	           }
            ],
            yAxis : [
            {
	           type : 'category',
	           lineStyle : {
        			width : 1
        	   },
	           data : ['东梅路','市民之家(内)','藕花洲大街','育才路','府前路','马家弄']
            }
            ],
            series : [
            {
	           type:'bar',
	           name:'占用率',
	           barCategoryGap : '30%', // 类目间的间距
	           barGap : '35%', // 柱间的间距
	           itemStyle : {
	        	   normal : {
	        		   color : '#6495ED'
	        	   }  
	           },
	           data:[0, 2, 4, 6, 8, 10]
            }
            ]
    };
	function getOccupyRatioChartData(occupyRatioChart,showNum) {
        //获得图表的options对象  
        var options = occupyRatioChart.getOption();
        //通过Ajax获取数据  
        $.ajax({
            type : "post",
            async : false, //同步执行  
            url : "getOccupancyComparedData.do",
            data : "showNum="+showNum,
            dataType : "json", //返回数据形式为json
            success : function(result) {
            	result = eval(result);
                if (result) {
                	// options.legend[0].data = result.option.legend.data;
                    options.title[0].text = result.option.title.text;
                    options.series[0].data = result.option.series[0].data;
                    options.yAxis[0].data = result.option.yAxis[0].data;
                    
                    occupyRatioChart.hideLoading();
                    occupyRatioChart.setOption(options);
                }
            },
            error : function(errorMsg) {
                alert("请求数据失败!");
                occupyRatioChart.hideLoading();
            }  
        });
    }
	// 显示查询的图状数据
	function showSearchOccupyCompare(){
		$.ajax({
	        type : "post",
	        async : false, //同步执行  
	        url : "/spms/action/occupancy/getOccupancyComparedData.do",
	        data : "showNum="+10,
	        dataType : "json", //返回数据形式为json
	        success : function(result) {
	        	result = eval(result);
	            if (result) {
	            	var date = result.option.series[0].data;
	            	var parklot = result.option.yAxis[0].data;
	            	
	            	zylHistoryCompare(parklot, date);
	            }
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
	
/*	// 历史周转率
	var option_dayOccupyChart = {
		    title : {
		        text: '',
		        subtext: ''
		    },
		    tooltip : { // 提示框
		    	show:false,
		    	showContent:false,
		        trigger: 'axis'
		    },
		    legend: {
		        data:['今日每个时段利用率（%）']
		    },
		    toolbox: { // 右上角功能按钮
		        show : false,
		        feature : {
		            mark : {show: true},
		            dataView : {show: true, readOnly: false},
		            magicType : {show: true, type: ['line', 'bar']},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    }, 
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
		            splitLine : {
		        		show : false
		        	},
		        	axisTick : {
		            	show : false
		            },
		        	axisLine : {
		        		show : false ,
		        		lineStyle : {
		        			color : '#CCCCCC',
		        			width : 1
		        		} 
		        	},
		            interval : 1,
		            axisLabel : {
		            	show: true,
		            	rotate : 35,
                        textStyle: {
                            color: '#607B8B' // 字体颜色
                        },
		                formatter: '{value}'
		            },
		            data:['2015/12/29', '2015/12/30', '2015/12/31', '2016/01/01', '2016/01/02', '2016/01/03', '2016/01/04']
		        }
		    ],
		    yAxis : [
		        {
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
		                formatter: '{value} '
		            },
		            interval : 0.5
		        }
		    ],
		    series : [
		        {
		            name:'今日每个时段利用率（%）',
		            type:'line',
		            itemStyle : {
		        		normal : {
		        			lineStyle : {
			        			color : '#6495ED',
			        			width : 3
		        			}
		        		}
		        	},
		            data:[0.5, 1.6, 2.0, 2.3, 1.2, 1.3, 0.6]
		             markPoint : {
		                data : [
		                    {type : 'max', name: '最大值'},
		                    {type : 'min', name: '最小值'}
		                ]
		            } 
		        }
		    ]
	};*/
	function getDayOccupyCharData(dayOccupyChart) {
        //获得图表的options对象  
        var options = dayOccupyChart.getOption();
        var startDate = $('#createTimeFrom').val();
        var endDate = $('#createTimeTo').val();
        //通过Ajax获取数据  
        $.ajax({
            type : "post",
            async : false, //同步执行  
            url : "getOccupancyHistoryData.do",
            data :"startDate="+startDate+"&endDate="+endDate,
            dataType : "json", //返回数据形式为json
            success : function(result) {
            	result = eval(result);
                if (result) {
                	// options.legend[0].data = result.option.legend.data;
                    // options.title[0].text = result.option.title.text;
                    options.series[0].data = result.option.series[0].data;
                    options.xAxis[0].data = result.option.xAxis[0].data;
                    
                    dayOccupyChart.hideLoading();
                    dayOccupyChart.setOption(options);
                }
            },
            error : function(errorMsg) {
                alert("请求数据失败!");
                dayOccupyChart.hideLoading();
            }  
        });
    }
	/*// 搜索
	function searchOccupancy(){
		ChenkinTime();
		showSearchChar();
	}
	
	// 验证查询条件
	function ChenkinTime() {
		var createTimeFrom = $('#createTimeFrom').val();	
		var createTimeTo = $('#createTimeTo').val();
		var startDate = formatDate(createTimeFrom);
		var endDate = formatDate(createTimeTo);
		if( createTimeFrom != "" && createTimeTo != "" ){
			if (startDate > endDate) {
				swal("警告", "起始时间必须小于结束时间.", "warning");
				return;		
			} else if(endDate - startDate > 30){
				swal("警告", "时间间隔超过一个月.", "warning");
				return;	
			}
		}else{
			swal("警告", "时间不能为空！.", "warning");
		}
	}*/
	
	function formatDate(strDate){
		 var  str=strDate.toString();
	     var date = new Date(str.replace(/-/g,"/"));
	     return date.getTime()/(1000*60*60*24);
	}
		