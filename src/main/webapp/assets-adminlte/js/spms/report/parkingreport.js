$(function () {
	//初始化时间
	var longTime = (new Date().getTime()) - (60*60*1000);
	var rsTime = new Date(longTime);
	$("#createTimeFrom").val(rsTime.getUTCFullYear() + "-"  + ((rsTime.getMonth()+1) < 10 ? "0" : "")+ (rsTime.getMonth()+1) + "-01");
	$("#createTimeTo").val(rsTime.getUTCFullYear() + "-"  + ((rsTime.getMonth()+1) < 10 ? "0" : "")+ (rsTime.getMonth()+1) + "-" +((rsTime.getDate()) < 10 ? "0" : "")+ (rsTime.getDate()==1?1:(rsTime.getDate()-1)));
	
	//1.初始化Table
    var oTable = new TableInit();
    oTable.Init();	  
    //2.初始化Button的点击事件
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();
    getRegion();
});	
  
var TableInit = function () {
	var oTableInit = new Object();
	//初始化Table
	oTableInit.Init = function () {
		$('#data_list_table').bootstrapTable({
  			contentType: "application/x-www-form-urlencoded",
	        url: basePath + '/action/parktargetday/dataList.do',
	        method: 'post',           //请求方式（*）
	        striped: true,            //是否显示行间隔色
	        cache: false,             //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
	       /* showRefresh:true,         //是否显示刷新按钮
	        showToggle:true,		  //显示模式调整
	        showColumns:true,*/         //设置显示字段
	        pagination: true,         //是否显示分页（*）
	        sortable: true,           //是否启用排序
	        sortName:"statDate",    //排序字段名称
	      /*  sortOrder: "asc",         //排序方式，升序*/
	        queryParamsType:'limit',
	        queryParams: oTableInit.queryParams,//传递参数（*）
			sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
	        pageNumber:1,             //初始化加载第一页，默认第一页
	        pageSize: 10,             //每页的记录行数（*）
	        pageList: [10, 25, 50, 100], //可供选择的每页的行数（*）
	        strictSearch: true,
	        clickToSelect: true,        //是否启用点击选中行
 	      /*  height: 35,            //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度*/
	        uniqueId: "id",           //每一行的唯一标识，一般为主键列
	        cardView: false,          //是否显示详细视图
	        detailView: false,          //是否显示父子表 
	        contentType: "application/x-www-form-urlencoded",
	        /*showExport: true,                     //是否显示导出
            exportDataType: "all",              //basic', 'all', 'selected'.
*/

	        columns: [ 						
					{field: 'id',title: '序号', align:'center',formatter: function (value, row, index) {
                          return index+1;
                    }},
					{field: 'statDate',title: '日期',align:'center',valign:'center',sortable:true,formatter:function(value,row,index){
						  return formatDate(value,"YYYY-mm-dd");
					}},
					{field: 'parkingCount',title: '停车总次数', align:'center',valign:'center',sortable:true},
					{field: 'parkcount_0_15',title: '停车总时长<15分钟',align:'center',valign:'center',sortable:true},
					{field: 'parkcount_15_30',title: '15分钟<停车总时长<30分钟', align:'center',valign:'center',sortable:true},
					{field: 'parkcount_30_45',title: '30分钟<=停车总时长<45分钟', align:'center',valign:'center',sortable:true},
					{field: 'parkcount_45_60',title: '45分钟<=停车总时长<60分钟', align:'center',valign:'center',sortable:true},
					{field: 'parkcount_60_90',title: '1小时<=停车总时长<1.5小时', align:'center',valign:'center',sortable:true,visible:false},
					{field: 'parkcount_90_120',title: '1.5小时<=停车总时长<2小时', align:'center',valign:'center',sortable:true,visible:false},
					{field: 'parkcount_120_150',title: '2小时<=停车总时长<2.5小时', align:'center',valign:'center',sortable:true,visible:false},
					{field: 'parkcount_150_180',title: '2.5小时<=停车总时长<3小时', align:'center',valign:'center',sortable:true,visible:false},
					{field: 'parkcount_180_240',title: '3小时<=停车总时长<4小时', align:'center',valign:'center',sortable:true,visible:false},
					{field: 'parkcount_240',title: '停车总时长>=4小时',align:'center',valign:'center',sortable:true,visible:false}
	             ]
		});
    };
    
   	oTableInit.queryParams = function (params) {

      	var temp = {  //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
	        page :params.offset==0 ? 1:(params.offset/params.limit)+1, //pageIndex
	        rows: params.limit, //页码
	       /* sort : params.sort, */
	      /*  order : params.order,*/
	        createTimeFrom:$("#createTimeFrom").val(),
	        createTimeTo:$("#createTimeTo").val(),
	        regionId:$("input[name='regionId']") .val()
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
    }
    return oButtonInit;
}

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
		window.open(basePath
				+ '/action/parktargetday/export.do?createTimeFrom='
				+ param.createTimeFrom + '&createTimeTo=' + param.createTimeTo
				+ '&regionId=' + param.regionId);
	} else {
		swal("", "当前查询条件下没有数据", "warning");
	}
}

//获取区域默认值
function getRegion(){
	$.ajax({
		type : "get",
        async : false, //同步执行  
        url : basePath+'/action/park/getStreetTree.do',
        data : {},
        dataType : "json", //返回数据形式为json
        success : function(result) {
        	result = eval(result);
        	$('#regionTree').combotree("setValue",result[0].id);
        }
	});
}

	
