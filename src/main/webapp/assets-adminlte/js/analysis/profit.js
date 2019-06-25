	$(function(){
		var date = new Date();
		var day = date.getDate()==1?"01":((date.getDate()-1)<10?("0"+(date.getDate()-1)):(date.getDate()-1));
		if(date.getMonth()+1<10){
			$('#profitStartDate').val(date.getFullYear()+"-"+("0"+(date.getMonth()+1))+"-01");
			$('#profitEndDate').val(date.getFullYear()+"-"+("0"+(date.getMonth()+1))+"-"+day);
		}else{
			$('#profitStartDate').val(date.getFullYear()+"-"+(date.getMonth()+1)+"-01");
			$('#profitEndDate').val(date.getFullYear()+"-"+(date.getMonth()+1)+"-"+day);
		}
		historyProfit();
		
		// 初始化列表数据
		var oTable = new TableInit();
		oTable.init();
		getHistoryProfitChart();
		getRegion();
		//showSearchProfitCompare();
		$('#searchProfitBtn').click(function(){
			$("#compareProfit").html('');
			searchProfitData(); // 历史数据图
			
			historyProfit();
			//showSearchProfitCompare(); // 历史对比图
			
			$('#data_list_table').bootstrapTable('refresh'); // 历史列表
	    });
	});
	
	var TableInit = function () {
       var oTableInit = new Object();
       //初始化Table
       oTableInit.init = function () {
       $('#data_list_table').bootstrapTable({
        	    url:'getProfitHistoryList.do',     //请求后台的URL（*）
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
		          {field: 'ALLPAYFEE',title: '停车收入（元）', align:'center',valign:'middle',sortable:false,
		        	  formatter:function(value,row,index){		        		  
		                  return value/100;  
		              }
		          },
		          {field: 'PAYMENTFEE',title: '代缴卡', align:'center',valign:'middle',sortable:false,
		        	  formatter:function(value,row,index){		        		  
		                  return value/100;  
		              }
		          },
		          {field: 'ALPAYFEE',title: '支付宝', align:'center',valign:'middle',sortable:false,
		        	  formatter:function(value,row,index){		        		  
		                  return value/100;  
		              }
		          },
		          {field: 'WECHATFEE',title: '微信', align:'center',valign:'middle',sortable:false,
		        	  formatter:function(value,row,index){		        		  
		                  return value/100;  
		              }
		          }
		        ],
		        
		      });
		    };

		    oTableInit.queryParams = function (params) {
		      $.each(params,function(key,val){
		        if($.isPlainObject(val) || $.isArray(val)){
		          subObj(val);
		        }else{
//		          console.log(key+'='+val);
		        }
		      });
		      var temp = {  //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
		        //page : params.offset==0 ? 1:(params.offset/params.limit)+1,  //pageIndex
        		page : 10,
		        rows: params.limit, //页码
		        /* sort : params.sort,
		        order : params.order,
		        date: $("#codeType").val(),*/
		        startDate : $("#profitStartDate").val(),
		    	endDate : $("#profitEndDate").val(),
		    	regionId : $("#regionId").combotree("getValue")
		      };
		      return temp;
		    };
		    return oTableInit;
	};
	
	// 获取历史收入图数据
	function getHistoryProfitChart(){
		$('#number').text(current_day_data[7][current_day_data[7].length-1]);
		var historyProfitChart = echarts.init(document.getElementById('historyProfit'));
		// 显示查询的历史数据
		var historyProfitOption = {
			title : {
		        text: '',
		        subtext: ''
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		    	data:['合计','代缴卡','支付宝','微信','银联卡']
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
		            	rotate : 35,
                        textStyle: {
                            color: '#607B8B' // 字体颜色
                        }
		            },
		            data : []
		        }
		    ],
		    yAxis : [
		        {
		        	name : '停车收费(元)',
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
		            }
		        }
		    ],
		    series : [
                {
	                name:'合计',
	                type:'line',
	                stack: '总量',
	                itemStyle : {
		        		normal : {
		        			lineStyle : {
			        			color : '#FF0000'
		        			}
		        		}
		        	},
                    data:[]     
                },
		        {
		        	name:'代缴卡',
		        	type:'line',
		        	itemStyle : {
		        		normal : {
		        			lineStyle : {
			        			color : '#0000FF'
		        			}
		        		}
		        	},
		           data:[]     
		        },
		        {
		        	name:'支付宝',
		        	type:'line',
		        	itemStyle : {
		        		normal : {
		        			lineStyle : {
			        			color : '#FF8800'
		        			}
		        		}
		        	},
		           data:[]     
		        },
		        {
		        	name:'微信',
		        	type:'line',
		        	itemStyle : {
		        		normal : {
		        			lineStyle : {
			        			color : '#00AA00'
		        			}
		        		}
		        	},
		           data:[]     
		        },
		        {
		        	name:'银联卡',
		        	type:'line',
		        	itemStyle : {
		        		normal : {
		        			lineStyle : {
			        			color : '#FF00FF'
		        			}
		        		}
		        	},
		           data:0     
		        }
		    ]
		}
		
		historyProfitChart.setOption(historyProfitOption);
		getHistoryProfitCharData(historyProfitChart);
	}
	function getHistoryProfitCharData(historyProfitChart) {
        //获得图表的options对象  
        var options = historyProfitChart.getOption();
        var startDate = $('#profitStartDate').val();
        var endDate = $('#profitEndDate').val();
        var regionId = $("#regionId").combotree("getValue");
        //通过Ajax获取数据  
        $.ajax({
            type : "post",
            async : false, //同步执行  
            url : "getProfitHistoryData.do",
            data :"startDate="+startDate+"&endDate="+endDate+"&regionId="+regionId,
            dataType : "json", //返回数据形式为json
            success : function(result) {
            	result = eval(result);
                if (result) {
                	// options.legend[0].data = result.option.legend.data;
                    // options.title[0].text = result.option.title.text;
                	for(var i = 0;i<result.option.series[0].data.length;i++){
                		options.series[0].data[i] = result.option.series[0].data[i]/100;
                		options.series[1].data[i] = result.option.series[1].data[i]/100;
                		options.series[2].data[i] = result.option.series[2].data[i]/100;
                		options.series[3].data[i] = result.option.series[3].data[i]/100;
                	}
                	
//                	options.series[0].data = result.option.series[0].data;
//                    options.series[1].data = result.option.series[1].data;
//                    options.series[2].data = result.option.series[2].data;
//                    options.series[3].data = result.option.series[3].data;
                    //options.series[4].data = result.option.series[4].data;
                    options.xAxis[0].data = result.option.xAxis[0].data;
                    
                    historyProfitChart.hideLoading();
                    historyProfitChart.setOption(options);
                    
                }
            },
            error : function(errorMsg) {
                alert("请求数据失败!");
                historyProfitChart.hideLoading();
            }  
        });
    }
	// 搜索
	function searchProfitData(){
		ChenkinTime();
	}
	
	// 验证查询条件
	function ChenkinTime() {
		var profitStartDate = $('#profitStartDate').val();	
		var profitEndDate = $('#profitEndDate').val();
		var startDate = formatDate(profitStartDate);
		var endDate = formatDate(profitEndDate);
		if( profitStartDate != "" && profitEndDate != "" ){
			if (startDate > endDate) {
				swal("警告", "起始时间必须小于结束时间.", "warning");
				return;		
			} else if(endDate - startDate > 30){
				swal("警告", "时间间隔超过一个月.", "warning");
				return;	
			}
			getHistoryProfitChart();
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
	}
	
	// 当前收入
    var option_current = {
		tooltip : {
			trigger: 'axis'
	    },
	    legend: {
	        data:['合计','代缴卡','支付宝','微信','银联卡'],
	    },
	    toolbox: {
	        show : false
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
	        		show : false
	        	},
	            axisLabel : {
	            	show: true,
	            	interval : 0,
//	            	rotate : 35,
//	            	formatter: '{value}',
                    textStyle: {
                        color: '#607B8B' // 字体颜色
                    }
	            },
	            data : current_day_data[6]
	        }
	    ],
	    yAxis : [
	        {
	        	name : '停车收费(元)',
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
	            name:'合计',
	            type:'line',
	            itemStyle : {
	        		normal : {
	        			lineStyle : {
		        			color : '#FF0000'
	        			}
	        		}
	        	},
	            data:current_day_data[7]
	        },
	        {
	            name:'代缴卡',
	            type:'line',
	            itemStyle : {
	        		normal : {
	        			lineStyle : {
		        			color : '#0000FF'
	        			}
	        		}
	        	},
	            data:current_day_data[8]
	        },
	        {
	            name:'支付宝',
	            type:'line',
	            itemStyle : {
	        		normal : {
	        			lineStyle : {
		        			color : '#FF8800'
	        			}
	        		}
	        	},
	            data:current_day_data[10]
	        },
	        {
	            name:'微信',
	            type:'line',
	            itemStyle : {
	        		normal : {
	        			lineStyle : {
		        			color : '#00AA00'
	        			}
	        		}
	        	},
	            data:current_day_data[11]
	        },
	        {
	            name:'银联卡',
	            type:'line',
	            itemStyle : {
	        		normal : {
	        			lineStyle : {
		        			color : '#FF00FF'
	        			}
	        		}
	        	},
	            data:current_day_data[9]
	        }
	    ]
	    
	};
    function getCurrentProfitData(showChar, showNum) {
        //获得图表的options对象  
        var options = currentProfitChart.getOption();
        var startDate = $('#profitStartDate').val();
        var endDate = $('#profitEndDate').val();
        //var regionId = $("#regionId").combotree("getValue");
        //通过Ajax获取数据  
        $.ajax({
            type : "post",
            async : false, //同步执行  
            url : "getCurrentProfitData.do",
            data : "startDate="+startDate+"&endDate="+endDate+"&showNum="+showNum+"&regionId="+regionId,
            dataType : "json", //返回数据形式为json
            success : function(result) {
            	result = eval(result);
                if (result) {
                	// options.legend[0].data = result.option.legend.data;
                    // options.title[0].text = result.option.title.text;
                	options.xAxis[0].data = result.option.xAxis[0].data;
                	options.series[0].data = result.option.series[0].data;
                	options.series[1].data = result.option.series[1].data;
                	options.series[2].data = result.option.series[2].data;
                	options.series[3].data = result.option.series[3].data;
                	//options.series[4].data = result.option.series[4].data;
                	
                	currentProfitChart.hideLoading();
                	currentProfitChart.setOption(options);
                }
            },
            error : function(errorMsg) {
                alert("请求数据失败!");
                currentProfitChart.hideLoading();
            }  
        });
    }
	//初始化echarts实例
	var currentProfitChart = echarts.init(document.getElementById('currentProfit'));
	currentProfitChart.setOption(option_current);
	currentProfitChart.hideLoading();
	//getCurrentProfitData(currentProfitChart, 20);//ajax后台交互
	
	// 临平各停车点收入对比
	var option_compareProfit = {
//		title : {
//	        text: '各停车点收入对比',
//	        x:'center'
//	     },
		 tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    legend: {
		           data:['停车收入（元）','代缴卡','银联卡','支付宝','微信'],
		           y : 'bottom'
		    },
		    toolbox: {
		        show : true
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    yAxis : [
		        {
		            type : 'category',
		            data : ['东梅路','市民之家(内)','藕花洲大街','育才路','府前路','马家弄','育才路']
		        }
		    ],
		    series : [
		        {
		            name:'停车收入（元）',
		            type:'bar',
		            stack: '总量',
		            itemStyle : { normal: {
		            	             label : {show: true, position: 'insideRight'},
		            	             color : '#B22D00'
		                          }
		            },
		            data:0
		        },
		        {
		            name:'代缴卡',
		            type:'bar',
		            stack: '总量',
		            itemStyle : { normal: {
		            	             label : {show: true, position: 'insideRight'},
		            	             color : '#00664C'
		                        }
		            },
		            data:0
		        },
		        {
		            name:'支付宝',
		            type:'bar',
		            stack: '总量',
		            itemStyle : { normal: {
		            	             label : {show: true, position: 'insideRight'},
		            	             color : '#FF8000'
		                        }
		            },
		            data:0
		        },
		        {
		            name:'微信',
		            type:'bar',
		            stack: '总量',
		            itemStyle : { normal: {
		            	             label : {show: true, position: 'insideRight'},
		            	             color : '#00AA00'
		                        }
		            },
		            data:0
		        },
		        {
		            name:'银联卡',
		            type:'bar',
		            stack: '总量',
		            itemStyle : { normal: {
		            	             label : {show: true, position: 'insideRight'},
		            	             color : '#FF00FF'
		                        }
		            },
		            data:0
		        }
		    ]
    }; 
	function getProfitCompareData(compareProfitChart, showNum) {// showNum显示条数
        //获得图表的options对象 
        var options = compareProfitChart.getOption();
        var startDate = $('#profitStartDate').val();
        var endDate = $('#profitEndDate').val();
        var regionId = $("#regionId").combotree("getValue");
        //通过Ajax获取数据 
        $.ajax({
            type : "post",
            async : false, //同步执行  
            url : "getProfitComparedData.do",
            data : "startDate="+startDate+"&endDate="+endDate+"&regionId="+regionId+"&showNum="+showNum,
            dataType : "json", //返回数据形式为json
            success : function(result) {
            	result = eval(result);
                if (result) {
                	// options.legend[0].data = result.option.legend.data;
//                    options.title[0].text = result.option.title.text;
                	if(typeof(result.option.yAxis[0].data)!='undefined'){
                		options.yAxis[0].data = result.option.yAxis[0].data;
                	}
                	if(typeof(result.option.series[0].data)!='undefined'){
                		options.series[0].data = result.option.series[0].data;
                	}
                	if(typeof(result.option.series[1].data)!='undefined'){
                		options.series[1].data = result.option.series[1].data;
                	}
                	if(typeof(result.option.series[2].data)!='undefined'){
                		options.series[2].data = result.option.series[2].data;
                	}
                	if(typeof(result.option.series[3].data)!='undefined'){
                		options.series[3].data = result.option.series[3].data;
                	}
                    
                	compareProfitChart.hideLoading();
                	compareProfitChart.setOption(options);
                }
            },
            error : function(errorMsg) {
                alert("请求数据失败!");
                compareProfitChart.hideLoading();
            }  
        });
    }
	// 显示查询的图状数据
	function showSearchProfitCompare(){
		var compareProfitChart = echarts.init(document.getElementById('compareProfit'));
		compareProfitChart.setOption(option_compareProfit);
		compareProfitChart.hideLoading();
		//getProfitCompareData(compareProfitChart, 20);//ajax后台交互
	}
	
	$('.form_datetime').datetimepicker({
	    format: 'yyyy-mm-dd',
    	language: 'zh-CN', //汉化 
    	todayBtn: 1,
    	minView: "month",
    	icon:'fa-arrow-right',
	   	autoclose:true //选择日期后自动关闭 
	});
	
	// 导出数据
	function exports() {
//		$.messager.confirm('确认', '确认导出符合查询条件的数据？', function(r) {
//			if (r) {
		if ($('#data_list_table').bootstrapTable("getData").length > 0) {
				var profitStartDate = $('#profitStartDate').val();
				var profitEndDate = $('#profitEndDate').val();
				var regionId = $("#regionId").combotree("getValue");
				var startDate = formatDate(profitStartDate);
				var endDate = formatDate(profitEndDate);
				if( profitStartDate != "" && profitEndDate != "" ){
					if (startDate > endDate) {
						swal("警告", "起始时间大于结束时间！", "warning");
					}else{
						window.open('../profit/exportProfitData.do?regionId=' + regionId
								+ "&startDate=" + profitStartDate + "&endDate="+ profitEndDate);
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
	