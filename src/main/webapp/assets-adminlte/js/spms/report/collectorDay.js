$(function () {
	//初始化时间
	var longTime = (new Date().getTime()) - (60*60*1000);
	var rsTime = new Date(longTime);
	$("#startDate").val(rsTime.getUTCFullYear() + "-"  + ((rsTime.getMonth()+1) < 10 ? "0" : "")+ (rsTime.getMonth()+1) + "-01");
	$("#endDate").val(rsTime.getUTCFullYear() + "-"  + ((rsTime.getMonth()+1) < 10 ? "0" : "")+ (rsTime.getMonth()+1) + "-" +((rsTime.getDate()) < 10 ? "0" : "")+ (rsTime.getDate()-1));
	//1.初始化Table
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
		        url: basePath + '/action/collectorDay/searchForm.do',     //请求后台的URL（*）
		        method: 'post',           //请求方式（*）
		        toolbar: '#toolbar',        //工具按钮用哪个容器
		        striped: true,           //是否显示行间隔色
		        cache: false,            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		        /*showRefresh:true,    
		        showToggle:true,
		        showColumns:true,*/
		        pagination: true,          //是否显示分页（*）
		        sortable: true,           //是否启用排序
		        //sortName:"",     //排序字段名称
		        sortOrder: "desc",          //排序方式
		        queryParamsType:'limit',
		        queryParams: oTableInit.queryParams,//传递参数（*）
		        strictSearch: true,
		        clickToSelect: true,        //是否启用点击选中行
	// 	        height: 460,            //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
		        uniqueId: "id",           //每一行的唯一标识，一般为主键列
		        cardView: false,          //是否显示详细视图
		        detailView: false,          //是否显示父子表 
		        contentType: "application/x-www-form-urlencoded",
		        
		        columns: [
	                  /*{field: 'checkbox',  checkbox: true,  align: 'center', valign: 'middle' },*/
	                 /* {field: 'id', title: '序号', },*/
	                  {field: 'name', title: '收费员', align:'center', valign:'middle', sortable:true },
	                  {field: 'stringStatDate', title: '日期', align:'center', valign:'middle', sortable:true },
	                  {field: 'parkFee',title: '应收金额（元）', align:'center',valign:'middle',sortable:true,formatter : function(value){
					    	 return value / 100;
					     }},
					  {field: 'paidFee',title: '已付金额（元）', align:'center',valign:'middle',sortable:true,formatter : function(value){
					    	 return value / 100;
					   }},
	                  {field: 'paidRatio',title: '实收率%', align:'center',valign:'middle',sortable:true},
	                  {field: 'sellPaymentCardCount',title: '售缴费卡张数', align:'center',valign:'middle'},
	                  {field: 'sellRefillCardCount',title: '售充值卡张数', align:'center',valign:'middle' },
	                  {field: 'sellPaymentCardFee',title: '售缴费卡金额', align:'center',valign:'middle',sortable:true,formatter : function(value){
					    	 return value / 100;
					     }},
	                  {field: 'sellRefillCardFee',title: '售充值卡金额', align:'center',valign:'middle',sortable:true,formatter : function(value){
					    	 return value / 100;
					     }},
	                  {field: 'photoCount',title: '拍照次数', align:'center',valign:'middle',sortable:true},
	                  {field: 'plateCount',title: '录入车牌次数', align:'center',valign:'middle',sortable:true}
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
			startDate: $("#startDate").val(),
			endDate:$("#endDate").val(),
			collectorId:$("#collectorId").val(),
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
				if(($('#collectorId')).val()==null||($('#collectorId')).val()==''){
					$('#data_list_table').bootstrapTable('hideColumn', 'stringStatDate');
					$('#data_list_table').bootstrapTable("refresh");
				}else{
					$('#data_list_table').bootstrapTable('showColumn', 'stringStatDate');
					$('#data_list_table').bootstrapTable("refresh");
					
				}
			});
		};
	return oButtonInit;
};
//验证
jQuery(function() {
	$('.form_datetime').datetimepicker({
	    format: 'yyyy-mm-dd',
    	language: 'zh-CN', //汉化 
    	todayBtn: 1,
    	minView: "month",
    	icon:'fa-arrow-right',
	   	autoclose:true //选择日期后自动关闭 
	});
});

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
		var param = $('#searchForm').serializeObject();
		window.open(basePath + '/collectorDay/export.do?startDate='
				+ param.startDate + '&endDate=' + param.endDate
				+ '&collectorId=' + param.collectorId);
	} else {
		swal("", "当前查询条件下没有数据", "warning");
	}
}


/*function exports(){
	      $('<table>').append(
	            $("#data_list_table").DataTable().$('tr').clone()
	      )
	      .table2excel({
	            exclude: ".excludeThisClass",
	            name: "Worksheet Name",
	            filename: "SomeFile"
	       });
	      $("#data_list_table").dataTable();
}*/
