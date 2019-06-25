/*//投诉类型：1：工作人员问题 2：充值问题  3：扣费问题
var type_format = function(value,row,index){  
 	if(value=='1'){
	 	return "工作人员问题";
 	}else if(value=='2'){
	 	return "充值问题";
 	}else{
     	return "扣费问题";  
 	}
} 
//状态：0待受理1已受理2待审核3已审核4已处理
var status_format = function(value,row,index){  
 	if(value=='0'){
	 	return "待受理";
 	}else if(value=='1'){
	 	return "已受理";
 	}if(value=='2'){
	 	return "待审核";
 	}else if(value=='3'){
	 	return "已审核";
 	}else{
     	return "已处理";  
 	}
}*/
var $table = $('#data_list_table');
var TableInit = function () {
	var oTableInit = new Object();
	//初始化Table
	oTableInit.Init = function () {
		$table.bootstrapTable({
	        url: 'dataList.do',     //请求后台的URL（*）
	        method: 'post',           //请求方式（*）
	        toolbar: '#toolbar',        //工具按钮用哪个容器
	        striped: true,           //是否显示行间隔色
	        cache: false,            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
	        showRefresh:true,    
	        showToggle:true,
	        showColumns:true,
	        pagination: true,          //是否显示分页（*）
	        sortable: true,           //是否启用排序
	        sortName:"handleTime",     //排序字段名称
	        sortOrder: "desc",          //排序方式
	        queryParamsType:'limit',
	        queryParams: oTableInit.queryParams,//传递参数（*）
	        sidePagination: "server",      //分页方式：client客户端分页，server服务端分页（*）
	        pageNumber:1,            //初始化加载第一页，默认第一页
	        pageSize: 10,            //每页的记录行数（*）
	        pageList: [10, 25, 50, 100],    //可供选择的每页的行数（*）
	        strictSearch: true,
	        clickToSelect: false,        //是否启用点击选中行
 	        //height: 460,            //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
	        uniqueId: "id",           //每一行的唯一标识，一般为主键列
	        cardView: false,          //是否显示详细视图
	        detailView: true,          //是否显示父子表  
	        detailFormatter:function(index, row) {
                return "<p class=\"text-info\">受理内容："+row.handleContent+"</p>";
            },
	        contentType: "application/x-www-form-urlencoded",
	        columns: [ 
					/*{field: 'check', checkbox:true},*/
					{field: 'Table-Number',title: '序号',align:'center',valign:'center',formatter: function (value, row, index) {return index+1;}},
					{field: 'phoneMobile',title: '手机号码',width:100,align:'center',valign:'center',sortable:true},
					{field: 'complaintor',title: '投诉者', align:'center',valign:'center',sortable:true},
					{field: 'type',formatter:sys.dicts.text('COMPLAINTTYPE'),title: '投诉类型', align:'center',valign:'center',sortable:true},
					{field: 'status',formatter:sys.dicts.text('COMPLAINTSTATUS'),title: '状态', align:'center',valign:'center',sortable:true},
					{field: 'plateNo',title: '车牌号', align:'center',valign:'center',sortable:true},
					{field: 'acountMobile',title: '账号手机号码', align:'center',valign:'center',sortable:true},
					{field: 'handleTime',title: '受理时间',align:'center',valign:'center',sortable:true}
	             ],
	        //行点击事件
			onClickRow: function (row,index) {
	        	swal({
        		 	title : "受理内容",
        		 	text : row.handleContent,
        		 	confirmButtonText: "关闭"//取消按钮文本
        		}) ;
				/*$.ajax({
					url :'<%=basePath %>/action/complaintAcceptance/queryhandleContent.do?id='+row.id,
					type : 'post',
					success : function(result){
						swal({
	            		 	title : "受理内容",
	            		 	text : result.resultList[0].handleContent,
	            		 	cancelButtonText: "关闭",//取消按钮文本
	            		 }) ;
					}
				});*/
             }
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
	        page : params.offset==0 ? 1:(params.offset/params.limit)+1,  //pageIndex
	        rows: params.limit, //页码
	        sort : params.sort, 
	        order : params.order,
	        phoneMobile:jQuery("#s_phoneMobile").val(),
	        complaintor:jQuery("#s_complaintor").val(),
	        acountMobile:jQuery("#s_acountMobile").val(),
	        parkId:jQuery("#s_parkId").val(),
	        berthId:jQuery("#s_berthId").val(),
	        type:jQuery("#s_type").val(),
	        plateNo:jQuery("#s_plateNo").val(),
	        handleContent:jQuery("#s_handleContent").val()
	        //date: $("#codeType").val(),
	        //tradetype:$('input:radio[name="tradetype"]:checked').val(),
	        //success:$('input:radio[name="success"]:checked').val(),
      	};
      	return temp;
    };
	
    return oTableInit;
};
jQuery(function () {
	//1.初始化Table
    var oTable = new TableInit();
    oTable.Init();
  
    //2.初始化Button的点击事件
    /* var oButtonInit = new ButtonInit();
    oButtonInit.Init(); */
    jQuery('#searchBtn').click(function () {  
    	$table.bootstrapTable('refresh');  
    });
 // 重置按钮
	jQuery('#resetBtn').click(function () {  
		jQuery('#searchForm')[0].reset(); 
	});
  
});