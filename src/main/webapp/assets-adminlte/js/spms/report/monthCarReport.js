$(function () {
	setDateFormat_month();
	setDateFormat_year();
	setDateFormat_day();
	var date = new Date();
	var day = date.getDate()==1?"01":((date.getDate()-1)<10?("0"+(date.getDate()-1)):(date.getDate()-1))
	if(date.getMonth()+1<10){
		$('#startTime_0').val(date.getFullYear()+"-"+("0"+(date.getMonth()+1))+"-01");
		$('#endTime_0').val(date.getFullYear()+"-"+("0"+(date.getMonth()+1))+"-"+day);
	}else{
		$('#startTime_0').val(date.getFullYear()+"-"+(date.getMonth()+1)+"-01");
		$('#endTime_0').val(date.getFullYear()+"-"+(date.getMonth()+1)+"-"+day);
	}
	
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
		        url: basePath + '/action/monthcarreport/searchForm.do',     //请求后台的URL（*）
		        method: 'post',           //请求方式（*）
		        toolbar: '#toolbar',        //工具按钮用哪个容器
		        striped: true,           //是否显示行间隔色
		        cache: false,            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		        pagination: true,          //是否显示分页（*）
		        sortable: true,           //是否启用排序
		        sortName:"id",     //排序字段名称
		        sortOrder: "desc",          //排序方式
		        queryParamsType:'limit',
		        queryParams: oTableInit.queryParams,//传递参数（*）
		        strictSearch: true,
		        clickToSelect: true,        //是否启用点击选中行
		        uniqueId: "id",           //每一行的唯一标识，一般为主键列
		        cardView: false,          //是否显示详细视图
		        detailView: false,          //是否显示父子表 
		        contentType: "application/x-www-form-urlencoded",
		        columns: [
	                  {field: 'dateTime', title: '日期', align:'center', valign:'middle',width:"120px", sortable:true},
	                  {field: 'counts', title: '包月车数', align:'center', valign:'middle'},
	                  {field: 'amounts', title: '包月金额', align:'center', valign:'middle'},	                  
	                  {field:'operate',title:'操作',width:'60px',align:'center',valign:'middle',
	                      formatter:function(value,rowData,rowIndex){
	                         return '<a herf="#" type="button" onclick="getMonthCars(\''+rowData.dateTime+'\')" style="cursor:pointer">查看</a>';
	                      }
	                  }
	           ],
			});
			
			$('#data_list_table_info').bootstrapTable({
	            url:basePath+'/action/monthcarreport/searchInfo.do',     //请求后台的URL（*）
	            method: 'post',           //请求方式（*）
	            toolbar: '#toolbar',        //工具按钮用哪个容器
	            striped: true,           //是否显示行间隔色
	            cache: false,            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
	            pagination: true,          //是否显示分页（*）
	            sortable: true,           //是否启用排序
	            sortName:"id",     //排序字段名称
	            sortOrder: "desc",          //排序方式
	            queryParamsType:'limit',
	            queryParams: oTableInit.querySearchInfoParams,
//	            sidePagination: "server",      //分页方式：client客户端分页，server服务端分页（*）
//	            pageNumber:1,            //初始化加载第一页，默认第一页
//	            pageSize: 10,            //每页的记录行数（*）
//	            pageList: [10, 25, 50, 100],    //可供选择的每页的行数（*）
	            strictSearch: true,
	            clickToSelect: true,        //是否启用点击选中行
	            uniqueId: "id",           //每一行的唯一标识，一般为主键列
	            detailView: true,          //是否显示父子表
	            contentType: "application/x-www-form-urlencoded",
	            columns: [
	                {field: 'customerName',title: '车主姓名',align:'center',valign:'middle'},
	                {field: 'cardNo',title: '包月卡号', align:'center',valign:'middle',sortable:false},
	                {field: 'phone',title: '联系号码', align:'center',valign:'middle',sortable:false},
	                {field: 'plateNo',title: '车牌号', align:'center',valign:'middle',sortable:false},
	                {field: 'plateColor',title: '车牌颜色', align:'center',valign:'middle',sortable:false,formatter : sys.dicts.text('PLATE_COLOR')},
	            ],
	            detailFormatter:function(index, row) {
	                return '<div style="padding:2px"><table id="detailDiv' + index + '"  class="ddv"></table></div>';
	            },
	            onExpandRow : function(index, row, detail) {
	                var ddv = detail.find('table.ddv');
	                ddv.bootstrapTable({
	                    url:basePath +'/action/monthcarreport/queryMonthlyDetail.do',     //请求后台的URL（*）
	                    method: 'post',           //请求方式（*）
	                    striped: true,           //是否显示行间隔色
	                    cache: false,            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
	                    pagination: true,          //是否显示分页（*）
	                    sortable: true,           //是否启用排序
	                    sortName:"bc.id",     //排序字段名称
	                    sortOrder: "desc",          //排序方式
	                    queryParamsType:'limit',
	                    queryParams : {
	                        monthlyId : row.id,
	                        id : row.bmdid
	                    },//传递参数（*）
	                    sidePagination: "server",      //分页方式：client客户端分页，server服务端分页（*）
	                    pageNumber:1,            //初始化加载第一页，默认第一页
	                    pageSize: 10,            //每页的记录行数（*）
	                    pageList: [10, 25, 50, 100],    //可供选择的每页的行数（*）
	                    strictSearch: true,
	                    clickToSelect: true,        //是否启用点击选中行
	                    uniqueId: "id",           //每一行的唯一标识，一般为主键列
	                    cardView: false,          //是否显示详细视图
	                    detailView: false,          //是否显示父子表
	                    contentType: "application/x-www-form-urlencoded",
	                    checkboxHeader: false,
	                    columns: [
	                        {field: 'amount',title: '包月金额',width:100,align:'center',valign:'middle',sortable:true},
	                        {field: 'startDate',title: '开始时间', align:'center',valign:'middle',sortable:true},
	                        {field: 'endDate',title: '结束时间', align:'center',valign:'middle',sortable:true},
	                        {field: 'parkName',title: '包月停车点', align:'center',valign:'middle',sortable:true}
	                    ]
	                });
	            }
	        });
		};

		
	    
	    oTableInit.queryParams = function (params) {
			var report_type = $('#reportType').val();
			if($('#startTime_'+report_type).val()=="" || $('#endTime_'+report_type).val()==""){
				swal("提示", "请选择查询时间范围");
				return false;
			}
			var report_type = $('#reportType').val();
	        var temp = {  //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
	            page : params.offset==0 ? 1:(params.offset/params.limit)+1,  //pageIndex
	            rows: params.limit, //页码
	            sort : params.sort,
	            order : params.order,
	            reportType:report_type,
	            startTime:$('#startTime_'+report_type).val(),
	            endTime:$('#endTime_'+report_type).val()
	        };
	        return temp;
	    };
	    
	    oTableInit.querySearchInfoParams = function (params) {
	        var temp = {  //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
	            page : params.offset==0 ? 1:(params.offset/params.limit)+1,  //pageIndex
	            rows: params.limit, //页码
	            sort : params.sort,
	            order : params.order,
	            reportType:$('#report_Type').val(),
	            searchTime:$('#create_Time').val(),
	            plateNo:$('#search_plateNo').val(),
	            cardNo:$('#search_cardNo').val()
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
				$('#data_list_table').bootstrapTable('refresh',{url:basePath + '/action/monthcarreport/searchForm.do',query:{page:1}});
			});
			
			$('#searchInfoBtn').click(function(){
	            $('#data_list_table_info').bootstrapTable('refresh',{url:basePath+ '/action/monthcarreport/searchInfo.do',query:{page:1}});
	        });
		};
	return oButtonInit;
};

function setDateFormat_day(){
	$('.day_type').show();
	$('.month_type').hide();
	$('.year_type').hide();
	$('.day_type').datetimepicker({
	    format: 'yyyy-mm-dd',
    	language: 'zh-CN', //汉化 
    	todayBtn: 1,
    	minView: "month",
    	icon:'fa-arrow-right',
	   	autoclose:true //选择日期后自动关闭 
	});
}
function setDateFormat_month(){
	$('.day_type').hide();
	$('.month_type').show();
	$('.year_type').hide();
	$('.month_type').datetimepicker({
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
	$('.day_type').hide();
	$('.month_type').hide();
	$('.year_type').show();
	$('.year_type').datetimepicker({
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
		setDateFormat_day();
	}else if(value == 1|| value==""){
		setDateFormat_month();
	}else if(value == 2){
		setDateFormat_year();
	}	 
}

function getMonthCars(datetime){
	$('#search_plateNo').val("");
    $('#search_cardNo').val("");
	$('#report_Type').val($('#reportType').val());
    $('#create_Time').val(datetime);
    $('#data_list_table_info').bootstrapTable('refresh',{url:basePath+ '/action/monthcarreport/searchInfo.do',query:{page:1}});
    $('#queryInfoRecords').modal('show');
    $("#queryInfoRecords").find(".fixed-table-body").height(310);
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
		title = name.replace("%", "").replace("%", "").replace("%", "").replace("%", "");
			
		var report_type = $('#reportType').val();
		if($('#startTime_'+report_type).val()=="" || $('#endTime_'+report_type).val()==""){
			swal("提示", "请选择查询时间范围");
			return false;
		}
		var report_type = $('#reportType').val();
        var startTime = $('#startTime_'+report_type).val();
        var endTime = $('#endTime_'+report_type).val();
		window.open(basePath + '/action/monthcarreport/export.do?reportType=' + report_type + "&startTime="+ startTime +"&endTime="+ endTime +"&title=" + title);
	} else {
		swal("", "当前查询条件下没有数据", "warning");
	}
};

function setSearchInfo(){
	$("#reportType").val(0);
	setDateFormat_day();
	var date = new Date();
	var day = date.getDate()==1?"01":((date.getDate()-1)<10?("0"+(date.getDate()-1)):(date.getDate()-1))
	if(date.getMonth()+1<10){
		$('#startTime_0').val(date.getFullYear()+"-"+("0"+(date.getMonth()+1))+"-01");
		$('#endTime_0').val(date.getFullYear()+"-"+("0"+(date.getMonth()+1))+"-"+day);
	}else{
		$('#startTime_0').val(date.getFullYear()+"-"+(date.getMonth()+1)+"-01");
		$('#endTime_0').val(date.getFullYear()+"-"+(date.getMonth()+1)+"-"+day);
	}
	return false;
};