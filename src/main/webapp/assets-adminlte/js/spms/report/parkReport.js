$(function () {
	var longTime = (new Date().getTime()) - (60*60*1000);
	var rsTime = new Date(longTime);
	//$("#dayTimeDay").val(rsTime.getFullYear() + "-" +"0"+(rsTime.getMonth() + 1) + "-"+"0" + (rsTime.getDate());//设定时间为昨天
	$("#dayTimeMonth").val(rsTime.getFullYear() + "-" + ((rsTime.getMonth()+1) < 10 ? "0" : "")+(rsTime.getMonth() + 1));
	$("#dayTimeDay").val(rsTime.getFullYear() + "-" + ((rsTime.getMonth()+1) < 10 ? "0" : "")+(rsTime.getMonth() + 1)+"-"+((rsTime.getDate()) < 10 ? "0" : "")+(rsTime.getDate()-1));
	$("#dayTimeYear").val(rsTime.getFullYear());
	
	var oTable = new TableInit();
	oTable.Init();
 
	//2.初始化Button的点击事件
	var oButtonInit = new ButtonInit();
	oButtonInit.Init();
	
});

var TableInit = function () {
	var oTableInit = new Object();
	    //初始化Table
	    oTableInit.Init = function () {
			$('#data_list_table').bootstrapTable({
		        url: basePath + '/action/parkReport/searchForm.do',     //请求后台的URL（*）
		        method: 'post',           //请求方式（*）
		        toolbar: '#toolbar',        //工具按钮用哪个容器
		        striped: true,           //是否显示行间隔色
		        cache: false,            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
//		        showRefresh:true,    
//		        showToggle:true,
//		        showColumns:true,
		        pagination: true,          //是否显示分页（*）
		        sortable: true,           //是否启用排序
		        sortName:"id",     //排序字段名称
		        sortOrder: "desc",          //排序方式
		        queryParamsType:'limit',
		        queryParams: oTableInit.queryParams,//传递参数（*）
		        strictSearch: true,
		        clickToSelect: true,        //是否启用点击选中行
	 	   //   height: auto,            	//行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
		        uniqueId: "id",           //每一行的唯一标识，一般为主键列
		        cardView: false,          //是否显示详细视图
		        detailView: false,          //是否显示父子表 
		        contentType: "application/x-www-form-urlencoded",
		        
		        columns: [
	                  {field: 'stringStatDate', title: '日期', align:'center', valign:'middle',width:"120px", sortable:true},
	                  {field: 'parkName', title: '停车点', align:'center', valign:'middle', sortable:true,visible:false},
	                  {field: 'parkIsDeleted', title: '停车点是否已删除', align:'center', valign:'middle', sortable:true,visible:false,formatter:function(value){
							if(value==0){
								return "否";
							}else if(value==1){
								return "是";
							}else{
								return "-"
							}
		                }},
	                  {field: 'parkIsValid', title: '停车点是否已作废', align:'center', valign:'middle', sortable:true,visible:false,formatter:function(value){
	                	  	if(value==0){
								return "否";
							}else if(value==1){
								return "是";
							}else{
								return "-"
							}
		                }},
	                  {field: 'berthCount',title: '泊位数', align:'center',valign:'middle',sortable:true,formatter:function(value){
							if(value<0){
								return "";
							}else{
								return value;
							}
		                }},
	                  {field: 'receivableAmount',title: '应收金额', align:'center',valign:'middle',sortable:true,formatter : function(value){
					    	 return value / 100;
					    }},
	                  {field: 'realPaidAmount',title: '实收金额', align:'center',valign:'middle',sortable:true,formatter : function(value){
					    	 return value / 100;
					    }},
	                  {field: 'realDiscountFeeAmount',title: '优惠金额', align:'center',valign:'middle',visible:false,formatter : function(value){
					    	 return value / 100;
					    }},
	                  {field: 'prepayFee',title: '预付金额', align:'center',valign:'middle',sortable:true,visible:false,formatter : function(value){
					    	 return value / 100;
					    }},
	                  {field: 'prepayUndoneFee',title: '未驶离预付', align:'center',valign:'middle',sortable:true,formatter : function(value){
					    	 return value / 100;
					    }},
	                  {field: 'prepayDoneFee',title: '当日驶离预付', align:'center',valign:'middle',sortable:true,visible:false,formatter : function(value){
					    	 return value / 100;
					    }},
	                  {field: 'repayAmount',title: '补缴金额', align:'center',valign:'middle',sortable:true,formatter : function(value){
					    	 return value / 100;
					    }},
	                  {field: 'beyondFee',title: '预付超额', align:'center',valign:'middle',sortable:true,visible:false,formatter : function(value){
					    	 return value / 100;
					    }},
	                  {field: 'returnFee',title: '预付退款', align:'center',valign:'middle',sortable:true,formatter : function(value){
					    	 return value / 100;
					    }},
	                  {field: 'sumFee',title: '合计收入', align:'center',valign:'middle',sortable:true,formatter : function(value){
					    	 return value / 100;
					    }},
	                  {field: 'failureFee',title: '故障金额', align:'center',valign:'middle',sortable:true,visible:false,formatter : function(value){
					    	 return value / 100;
					    }},
	                  {field: 'monthlyCarFee',title: '包月停车费', align:'center',valign:'middle',sortable:true,visible:false,formatter : function(value){
					    	 return value / 100;
					    }},
	                  {field: 'specialCarAmount',title: '特殊停车费', align:'center',valign:'middle',sortable:true,visible:false,formatter : function(value){
					    	 return value / 100;
					    }},
	                  {field: 'paymentCardFee',title: '代刷金额', align:'center',valign:'middle',sortable:true,visible:false,formatter : function(value){
					    	 return value / 100;
					    }},
	                  {field: 'paymentCardNormalFee',title: '代缴卡正常支付', align:'center',valign:'middle',sortable:true,visible:false,formatter : function(value){
					    	 return value / 100;
					    }},
	                  {field: 'paymentCardRepayFee',title: '代缴卡补缴', align:'center',valign:'middle',sortable:true,visible:false,formatter : function(value){
					    	 return value / 100;
					    }},
	                  {field: 'carOwnerCardFee',title: '车主刷卡', align:'center',valign:'middle',sortable:true,visible:false,formatter : function(value){
					    	 return value / 100;
					    }},
	                  {field: 'carOwnerCardNormalFee',title: '车主卡正常支付', align:'center',valign:'middle',sortable:true,visible:false,formatter : function(value){
					    	 return value / 100;
					    }},
	                  {field: 'carOwnerCardRepayFee',title: '车主卡补缴', align:'center',valign:'middle',sortable:true,visible:false,formatter : function(value){
					    	 return value / 100;
					  }},
					  {field:'appAlipayFee',title:'APP支付宝总金额',align:'center',valign:'middle',sortable:true,formatter : function(value){
					    	 return value / 100;
				      }},
				      {field:'appAlipayNormalFee',title:'APP支付宝正常缴费',align:'center',valign:'middle',sortable:true,visible:false,formatter : function(value){
				    	 return value / 100;
				      }},
				      {field:'appAlipayRepayFee',title:'APP支付宝补缴',align:'center',valign:'middle',sortable:true,visible:false,formatter : function(value){
				    	 return value / 100;
				      }},
				      {field:'appAlipayBarFee',title:'APP支付宝条码支付',align:'center',valign:'middle',sortable:true,visible:false,formatter : function(value){
				    	 return value / 100;
				      }},
				      {field:'appAlipayFastFee',title:'App支付宝快捷支付',align:'center',valign:'middle',sortable:true,visible:false,formatter : function(value){
				    	 return value / 100;
				      }},
				      {field:'appAlipayQrFee',title:'App支付宝二维码支付',align:'center',valign:'middle',sortable:true,visible:false,formatter : function(value){
				    	 return value / 100;
				      }},
				      {field:'appWechatFee',title:'App微信总金额',align:'center',valign:'middle',sortable:true,formatter : function(value){
				    	 return value / 100;
				      }},
				      {field:'appWechatNormalFee',title:'App微信正常缴费',align:'center',valign:'middle',sortable:true,visible:false,formatter : function(value){
				    	 return value / 100;
				      }},
				      {field:'appWechatRepayFee',title:'App微信补缴',align:'center',valign:'middle',sortable:true,visible:false,formatter : function(value){
				    	 return value / 100;
				      }},
				      {field:'appWechatBarFee',title:'App微信条码支付',align:'center',valign:'middle',sortable:true,visible:false,formatter : function(value){
				    	 return value / 100;
				      }},
				      {field:'appWechatFastFee',title:'App微信快捷支付',align:'center',valign:'middle',sortable:true,visible:false,formatter : function(value){
				    	 return value / 100;
				      }},
				      {field:'appWechatQrFee',title:'App微信二维码支付',align:'center',valign:'middle',sortable:true,visible:false,formatter : function(value){
				    	 return value / 100;
				      }},
				      {field:'wechatPBFee',title:'微信公众号总金额',align:'center',valign:'middle',sortable:true,visible:false,formatter : function(value){
				    	 return value / 100;
				      }},
				      {field:'wechatPBNormalFee',title:'微信公众号正常缴费',align:'center',valign:'middle',sortable:true,visible:false,formatter : function(value){
				    	 return value / 100;
				      }},
				      {field:'wechatPBRepayFee',title:'微信公众号补缴',align:'center',valign:'middle',sortable:true,visible:false,formatter : function(value){
				    	 return value / 100;
				      }},
				      {field:'wechatPBFastFee',title:'微信公众号快捷支付',align:'center',valign:'middle',sortable:true,visible:false,formatter : function(value){
				    	 return value / 100;
				      }},
				      {field:'appBalanceFee',title:'APP账户缴费总金额',align:'center',valign:'middle',sortable:true,visible:false,formatter : function(value){
				    	 return value / 100;
				      }},
				      {field:'appBalanceNormalFee',title:'APP账户正常缴费',align:'center',valign:'middle',sortable:true,visible:false,formatter : function(value){
				    	 return value / 100;
				      }},
				      {field:'appBalanceRepayFee',title:'APP账户补缴',align:'center',valign:'middle',sortable:true,visible:false,formatter : function(value){
				    	 return value / 100;
				      }},
				      {field:'appBalanceFastFee',title:'APP账户余额支付',align:'center',valign:'middle',sortable:true,visible:false,formatter : function(value){
				    	 return value / 100;
				      }},
				      {field:'carTagFee',title:'车载标签缴费',align:'center',valign:'middle',sortable:true,visible:false,formatter : function(value){
				    	 return value / 100;
				      }},
	                  {field: 'parkingCount',title: '停车总次数', align:'center',valign:'middle',sortable:true,visible:false},
	                  {field: 'monthlyCount',title: '包月停车次数', align:'center',valign:'middle',sortable:true,visible:false},
	                  {field: 'freeCount',title: '免费次数', align:'center',valign:'middle',sortable:true,visible:false},
	                  {field: 'unpaidCount',title: '逃缴次数', align:'center',valign:'middle',sortable:true,visible:false},
	                  {field: 'failureCount',title: '故障停车次数', align:'center',valign:'middle',sortable:true,visible:false},
	                  {field: 'specialCount',title: '特殊停车次数', align:'center',valign:'middle',sortable:true,visible:false},
	                  {field: 'normalCount',title: '正常缴费停车次数', align:'center',valign:'middle',sortable:true,visible:false},
	                  {field: 'berthUtilizationRatio',title: '泊位利用率%', align:'center',valign:'middle',sortable:true,visible:false,formatter : function(value){
					    	 return value / 100.0;
					    }},
	                  {field: 'avgBerthFee',title: '平均泊位收益', align:'center',valign:'middle',sortable:true,visible:false},
	                  {field: 'berthTurnoverRate',title: '周转率(次)', align:'center',valign:'middle',sortable:true,visible:false,formatter : function(value){
					    	 return value / 100.0;
					    }},
	                  {field: 'stringDurations',title: '停车时长', align:'center',valign:'middle',sortable:true,visible:false},
	                  {field: 'stringMonthlyDurations',title: '包月停车时长', align:'center',valign:'middle',sortable:true,visible:false},
	                  {field: 'stringFreeDurations',title: '免费停车时长', align:'center',valign:'middle',sortable:true,visible:false},
	                  {field: 'freeRatio',title: '免费率%', align:'center',valign:'middle',sortable:true,visible:false}
	               ],
			});
		};
	    
	oTableInit.queryParams = function (params) {
		var dayTime;
		if($("#reportType").val()==0){
			dayTime=$("#dayTimeDay").val();
		}else if($("#reportType").val()==1||$("#reportType").val()==""){
			dayTime=$("#dayTimeMonth").val();
		}else if($("#reportType").val()==2){
			dayTime=$("#dayTimeYear").val();
		}
		var temp = {  //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			reportType: $("#reportType").val(),
			dayTime:dayTime, /*$("#day$TimeDay").val(),*/
			parkId: $("#park_select0").val(),
			regionId: $("#region_select0").val(),
			streetId: $("#street_select0").val(),
			regionLevel:"2",  
		};
		return temp;
	};
	return oTableInit;
	};

	var ButtonInit=function(){
		var oButtonInit = new Object();
		//初始化Table
		oButtonInit.Init = function () {
			$('#searchBtn').click(function(){ 
				$('#data_list_table').bootstrapTable("refresh");
			});
		};
	return oButtonInit;
};

jQuery(function(e) {
	setDateFormat_day();
	setDateFormat_month();
	setDateFormat_year();
});

function GetDateStr(AddDayCount) { 
	var dd = new Date(); 
	dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
	var y = dd.getFullYear(); 
	var m = dd.getMonth()+1;//获取当前月份的日期 
	if(m<10){
		m = "0" + m;
	}
	var d = dd.getDate(); 
	if(d<10){
		d = "0" + d;
	}
	return y+"-"+m+"-"+d; 
} 

function setDateFormat_day(){
	$('#dayTimeDay').val(GetDateStr(-1));
	$('#dayTimeDay').datetimepicker({
	    format: 'yyyy-mm-dd',
    	language: 'zh-CN', //汉化 
    	todayBtn: 1,
    	minView: "month",
    	icon:'fa-arrow-right',
	   	autoclose:true //选择日期后自动关闭 
	});
}
function setDateFormat_month(){
	$('#dayTimeMonth').datetimepicker({
		format: 'yyyy-mm',  
        weekStart: 1,  
        autoclose: true,  
        startView: 3,  
        minView: 3,  
        forceParse: false,  
        language: 'zh-CN'  
	});
}
function setDateFormat_year(){
	$('#dayTimeYear').datetimepicker({
		format: 'yyyy',  
        weekStart: 1,  
        autoclose: true,  
        startView: 4,  
        minView: 4,  
        forceParse: false,  
        language: 'zh-CN'  
	});
}


function onchangeReprot(){
	var value = $('#reportType').val();
	if(value == 0){
		$('#data_list_table').bootstrapTable("refresh");
		$('#defaultForm').bootstrapTable('reset', true);
		$('#dayTimeMonth').hide();
		$('#dayTimeYear').hide();
		$('#dayTimeDay').show();
//		$('#park').show();
//		$('#park_div').show();
//		$('#street').show();
//		$('#street_div').show();
//		$('#street_select0').show();
//		$('#park_select0').show();
		$('#day').show();
		$('#month').hide();
		$('#year').hide();
		setDateFormat_day();
		$('#data_list_table').bootstrapTable('showColumn', 'parkName');
		$('#data_list_table').bootstrapTable('hideColumn', 'stringStatDate');
		$('#select_columns1').html("");
		select_columns1();
//		$(".col-sm-3").each(function(){
//			  $(this).removeClass("col-sm-3");
//			  $(this).removeClass("col-md-3");
//			  $(this).addClass("col-sm-4");
//			  $(this).addClass("col-md-4");
//		});
		
	}else if(value == 1|| value==""){
		$('#data_list_table').bootstrapTable("refresh");
		$('#defaultForm').bootstrapTable('reset', true);
		$('#dayTimeDay').hide();
		$('#dayTimeYear').hide();
		$('#dayTimeMonth').show();
//		$('#park').hide();
//		$('#park_div').hide();
//		$('#street').hide();
//		$('#street_div').hide();	
//		$('#street_select0').hide();
//		$('#park_select0').hide();
		$('#month').show();
		$('#day').hide();
		$('#year').hide();
		setDateFormat_month();
		$('#data_list_table').bootstrapTable('showColumn', 'stringStatDate');
		$('#data_list_table').bootstrapTable('hideColumn', 'parkName');
		
//		$(".col-sm-4").each(function(){
//			$(this).removeClass("col-sm-4");
//			$(this).removeClass("col-md-4");
//			$(this).addClass("col-sm-3");
//			$(this).addClass("col-md-3");
//		});
		
	}else if(value == 2){
		$('#data_list_table').bootstrapTable("refresh");
		$('#defaultForm').bootstrapTable('reset', true);
		$('#dayTimeDay').hide();
		$('#dayTimeMonth').hide();
		$('#dayTimeYear').show();
//		$('#park').hide();
//		$('#park_div').hide();
//		$('#street').hide();
//		$('#street_div').hide();		
//		$('#street_select0').hide();
//		$('#park_select0').hide();
		$('#year').show();
		$('#month').hide();
		$('#day').hide();
		setDateFormat_year();
		$('#data_list_table').bootstrapTable('showColumn', 'stringStatDate');
		$('#data_list_table').bootstrapTable('hideColumn', 'parkName');
//		$(".col-sm-4").each(function(){
//			$(this).removeClass("col-sm-4");
//			$(this).removeClass("col-md-4");
//			$(this).addClass("col-sm-3");
//			$(this).addClass("col-md-3");
//		});
	}
	 
}

/* 表单转成json数据 */
$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};

function exports() {
	if ($('#data_list_table').bootstrapTable("getData").length > 0) {
		var columns = $('#data_list_table').bootstrapTable('getOptions').columns;
		column = columns[0];
		var name = '';
		var title = '';
		for (var i = 0; i < column.length - 1; i++) {
			if (column[i].visible == true) {
				name += column[i].title + ",";
			}
		}

		title = name.replace("%", "").replace("%", "").replace("%", "")
				.replace("%", "");

		var param = $('#searchForm').serializeObject();
		var value = $('#reportType').val();
		var day = $('#dayTimeDay').val();
		var month = $('#dayTimeMonth').val();
		var year = $('#dayTimeYear').val();
		// var regionLevel =
		// $("#regionId").val()==""?1:($("#streetId").val()==""?2:3);
		var regionLevel = 2;
		if (param.parkId == undefined) {
			param.parkId = "";
		}
		if (param.streetId == undefined) {
			param.streetId = "";
		}
		if (value == 0) {
			window.open(basePath + '/action/parkReport/export.do?reportType='
					+ param.reportType + "&dayTime=" + param.dayTimeDay
					+ "&regionId=" + param.regionId + "&streetId="
					+ param.streetId + "&parkId=" + param.parkId
					+ "&regionLevel=" + regionLevel + "&title=" + title);
		}
		if (value == 1) {
			window.open(basePath + '/action/parkReport/export.do?reportType='
					+ param.reportType + "&regionId=" + param.regionId
					+ "&dayTime=" + param.dayTimeMonth + "&regionLevel="
					+ regionLevel + "&title=" + title);
		}
		if (value == 2) {
			window.open(basePath + '/action/parkReport/export.do?reportType='
					+ param.reportType + "&regionId=" + param.regionId
					+ "&dayTime=" + param.dayTimeYear + "&regionLevel="
					+ regionLevel + "&title=" + title);
		}
	} else {
		swal("", "当前查询条件下没有数据", "warning");
	}
	 
	
};
