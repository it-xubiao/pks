    $(function () {
    	var date = new Date();
    	var day = date.getDate()==1?"01":((date.getDate()-1)<10?("0"+(date.getDate()-1)):(date.getDate()-1));
		if(date.getMonth()+1<10){
			$('#turnoverStartDate').val(date.getFullYear()+"-"+("0"+(date.getMonth()+1))+"-01");
			$('#turnoverEndDate').val(date.getFullYear()+"-"+("0"+(date.getMonth()+1))+"-"+day);
		}else{
			$('#turnoverStartDate').val(date.getFullYear()+"-"+(date.getMonth()+1)+"-01");
			$('#turnoverEndDate').val(date.getFullYear()+"-"+(date.getMonth()+1)+"-"+day);
		}
		historyZzl();
		var oTable = new TableInit();
		oTable.init();
		
		// 初始化历史记录
		showSearchChar();
		getRegion();
		//showTrunoverCompareChart();
		$('#searchBtn_zzl').click(function(){
			$("#trunoverCompareChart").html('');
			historyZzl();
			searchOccupancy();
			//showTrunoverCompareChart();
			
			$('#data_list_table').bootstrapTable('refresh');
	    });
	});
		
	var TableInit = function () {
	    var oTableInit = new Object();
	    //初始化Table
	    oTableInit.init = function () {
	      $('#data_list_table').bootstrapTable({
	        	url:'getTurnoverHistory.do',     //请求后台的URL（*）
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
		        columns: [
		          {field: 'REGIONNAME',title: '区域', align:'center',valign:'middle',sortable:false},
		          {field: 'PARKNAME',title: '停车点', align:'center',valign:'middle',sortable:false},
		          {field: 'BERTHCOUNT',title: '泊位数量', align:'center',valign:'middle',sortable:false},
		          {field: 'TURNOVER',title: '周转率', align:'center',valign:'middle',sortable:false}
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
			        rows: params.limit, //页码
			        sort : params.sort,
			        order : params.order,
			        startDate: $('#turnoverStartDate').val(),
			        endDate:$("#turnoverEndDate").val(),
			        regionId : $("#regionId").combotree("getValue")
		      };
		      return temp;
		    };
		 return oTableInit;
  	};
  	
  	
	// 今日每个时段周转率
	var option = {
		     tooltip : { // 提示框
		        trigger: 'axis',
		        formatter : '{b0}<br/>周转率: {c0} 次'
		     },
		    toolbox: { // 右上角功能按钮
		        show : false
		    }, 
		    legend: {
		        data:'当前时段周转率（次）'
		    },
		    calculable : true,
		    xAxis : [
		        {
		        	type : 'category', //category类目类型，必须从data中获取数据
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
		        	name : '周转率(次)',
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
		            data:current_day_data[3]
		        }
		    ],
		    series : [
		        {
		        	name:'周转率（次）',
		            type:'line',
		            data:current_day_data[3],
			        itemStyle : {
		        		normal : {
		        			lineStyle : {
			        			color : '#6495ED',
			        			width : 3
		        			}
		        		}
		        	},
		        	 markPoint : { // 图形标记最大值和最小值
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
		            }
		        }
		    ]
	};
	function getDayEveryChartData() {
        //获得图表的options对象  
        var options = dayEveryChart.getOption();
        //通过Ajax获取数据  
        $.ajax({
            type : "post",
            async : false, //同步执行  
            url : "getTurnoverData.do",
            data : {},
            dataType : "json", //返回数据形式为json
            success : function(result) {
            	result = eval(result);
                if (result) {
                	// options.legend[0].data = result.option.legend.data;
                    // options.title[0].text = result.option.title.text;
                	if(typeof(result.option.series) != 'undefined') {
                		options.series[0].data = result.option.series[0].data;
                	}
                	if(typeof(result.option.xAxis) != 'undefined') {
                		options.xAxis[0].data = result.option.xAxis[0].data;
                	}
                    
                    dayEveryChart.hideLoading();
                    dayEveryChart.setOption(options);
                }
            },
            error : function(errorMsg) {
                alert("请求数据失败!");
                myChart.hideLoading();
            }  
        });
    }
	//初始化echarts实例
	var dayEveryChart = echarts.init(document.getElementById('dayEveryChart'));
	dayEveryChart.setOption(option);
	dayEveryChart.hideLoading();
	getDayEveryChartData();//ajax后台交互
	
	
	// 历史利用率:截止 2016-04-15 临平周转率 
	var option_historyTurnChart = {
		    title : {
		        text: '',
		        subtext: ''
		    },
		    tooltip : {
		        trigger: 'axis',
		        formatter : '{b0}<br/>周转率: {c0} 次'
		    },
		    legend: {
		        //data:['今日每个时段利用率（%）']
		    },
		    toolbox: {
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
		        		show : false/* ,
		        		lineStyle : {
		        			color : '#CCCCCC',
		        			width : 1
		        		} */
		        	},
		            axisLabel : {
		            	show: true,
		            	interval : 0,
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
		        	name : '周转率(次)',
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
		            }
		        }
		    ],
		    series : [
		        {
		        	name:'周转率（次）',
		            type:'line',
		            itemStyle : {
		        		normal : {
		        			lineStyle : {
			        			color : '#6495ED',
			        			width : 3
		        			}
		        		}
		        	},
		        	data:[0.2, 0.2, 1.2, 2.2, 0.5, 0.7, 0.9,1.3,1.2,0.2,0.2]
		        }
		    ]
	};

	function getTurnoverCharData(historyTurnChart) {
		$('#number').text(current_day_data[3][current_day_data[3].length-1]);
        //获得图表的options对象  
        var options = historyTurnChart.getOption();
        var startDate = $('#turnoverStartDate').val();
        var endDate = $('#turnoverEndDate').val();
        var regionId = $("#regionId").combotree("getValue");
        //通过Ajax获取数据  
        $.ajax({
            type : "post",
            async : false, //同步执行  
            url : "getTurnoverHistoryData.do",
            data :"startDate="+startDate+"&endDate="+endDate+"&regionId="+regionId,
            dataType : "json", //返回数据形式为json
            success : function(result) {
            	result = eval(result);
                if (result) {
                	// options.legend[0].data = result.option.legend.data;
                    // options.title[0].text = result.option.title.text;
                    options.series[0].data = result.option.series[0].data;
                    options.xAxis[0].data = result.option.xAxis[0].data;
                    
                    historyTurnChart.hideLoading();
                    historyTurnChart.setOption(options);
                }
            },
            error : function(errorMsg) {
                alert("请求数据失败!");
                historyTurnChart.hideLoading();
            }  
        });
    }
	// 搜索
	function searchOccupancy(){
		ChenkinTime();
	}
	
	// 验证查询条件
	function ChenkinTime() {
		var createTimeFrom = $('#turnoverStartDate').val();	
		var createTimeTo = $('#turnoverEndDate').val();
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
			showSearchChar();
		}else{
			swal("警告", "时间不能为空！.", "warning");
		}
	}
	
	function formatDate(strDate){
		 var  str=strDate.toString();
	     var date = new Date(str.replace(/-/g,"/"));
	     return date.getTime()/(1000*60*60*24);
	}
	// 显示查询的图状数据
	function showSearchChar(){
		var historyTurnChart = echarts.init(document.getElementById('historyTurnChart'));
		historyTurnChart.setOption(option_historyTurnChart);
		getTurnoverCharData(historyTurnChart);
	}
	
	// 各停车点周转率对比图
	var option_compareChart = {
            title : {
	            text: '各停车点周转率（次）对比图',
	            x:'center'
	          },
	          tooltip : {
		        trigger: 'axis',
		        formatter : '{b0}<br/>周转率: {c0} 次'
			  },
	          toolbox: {
	            show : false
	          },     
	          calculable : true,
	          xAxis : [
	           {
	            type : 'value',
        	    splitLine : {
	        		show : false
	        	},
	        	axisTick : {
	            	show : false
	            },
	        	axisLine : {
	        		show : false
	        		/* 
	        		lineStyle : {
	        			color : '#CCCCCC',
	        			width : 1
	        		} */
	        	},
	            boundaryGap : [0, 0.01]
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
	           type:'bar',
	           name:'周转率（次）',
	           barCategoryGap : '30%', // 类目间的间距
	           barGap : '35%', // 柱间的间距
	           itemStyle : {
	        	   normal : {
	        		   color : '#6495ED'
	        	   }  
	           },
	           data:[0, 10, 20, 30, 40, 50, 60]
	          }
	        ]
    }; 
	function getTurnoverChartData(trunoverCompareChart,showNum) {
        //获得图表的options对象  
        var options = trunoverCompareChart.getOption();
        var startDate = $('#turnoverStartDate').val();
        var endDate = $('#turnoverEndDate').val();
        var regionId = $("#regionId").combotree("getValue");
        //通过Ajax获取数据  
        $.ajax({
            type : "post",
            async : false, //同步执行  
            url : "getTurnoverComparedData.do",
            data : "startDate="+startDate+"&endDate="+endDate+"&regionId="+regionId+"&showNum="+showNum,
            dataType : "json", //返回数据形式为json
            success : function(result) {
            	result = eval(result);
                if (result) {
                	// options.legend[0].data = result.option.legend.data;
                	options.title[0].text = result.option.title.text;
                	if (typeof(result.option.series[0].data) != 'undefined') {
                		options.series[0].data = result.option.series[0].data;               		
                	}
                	if (typeof(result.option.yAxis[0].data) != 'undefined') {
                		options.yAxis[0].data = result.option.yAxis[0].data;             		
                	}
                    
                    trunoverCompareChart.hideLoading();
                    trunoverCompareChart.setOption(options);
                }
            },
            error : function(errorMsg) {
                alert("请求数据失败!");
                trunoverCompareChart.hideLoading();
            }  
        });
    }
	// 显示对比图
	function showTrunoverCompareChart() {
//		//初始化echarts实例
//		var trunoverCompareChart = echarts.init(document.getElementById('trunoverCompareChart'));
//		//使用刚指定的配置项和数据显示图表。
//		trunoverCompareChart.setOption(option_compareChart);
//		trunoverCompareChart.hideLoading();
//		getTurnoverChartData(trunoverCompareChart,20);//ajax后台交互
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
//		$.messager.confirm('确认', '确认导出符合查询条件的数据？', function(r) {
//			if (r) {
		if ($('#data_list_table').bootstrapTable("getData").length > 0) {
				var createTimeFrom = $('#turnoverStartDate').val();
				var createTimeTo = $('#turnoverEndDate').val();
				var startDate = formatDate(createTimeFrom);
				var endDate = formatDate(createTimeTo);
				var regionId = $("#regionId").combotree("getValue");
				if( createTimeFrom != "" && createTimeTo != "" ){
					if (startDate > endDate) {
						swal("警告", "起始时间大于结束时间！", "warning");
					}else{
						window.open('../turnover/exportTurnoverData.do?regionId=' + regionId
								+ "&startDate=" + createTimeFrom + "&endDate="+ createTimeTo);
					}
				}else{
					swal("警告", "时间不能为空！", "warning");
				}
		 } else {
				swal("", "当前查询条件下没有数据", "warning");
		 }
//			}
//		});
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
	