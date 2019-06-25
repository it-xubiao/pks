jQuery(function () {
		//1.初始化Table
	    var oTable = new TableInit();
	    oTable.Init();
	  
	    //2.初始化Button的点击事件
	    /* var oButtonInit = new ButtonInit();
	    oButtonInit.Init(); */
	  
	});
	
	//状态
	var status_format = function(value,row,index){  
     	if(value=='0'){
    	 	return "未回复";
     	}else if(value=='1'){
    	 	return "已回复";
     	}
  	} 
	var $table = jQuery('#data_list_table');
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
		        sortName:"createTime",     //排序字段名称
		        sortOrder: "desc",          //排序方式
		        queryParamsType:'limit',
		        queryParams: oTableInit.queryParams,//传递参数（*）
		        sidePagination: "server",      //分页方式：client客户端分页，server服务端分页（*）
		        pageNumber:1,            //初始化加载第一页，默认第一页
		        pageSize: 10,            //每页的记录行数（*）
		        pageList: [10, 25, 50, 100],    //可供选择的每页的行数（*）
		        strictSearch: true,
		        clickToSelect: true,        //是否启用点击选中行
		        //singleSelect: true,//只能单选
	 	        //height: 460,            //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
		        uniqueId: "id",           //每一行的唯一标识，一般为主键列
		        cardView: false,          //是否显示详细视图
		        detailView: false,          //是否显示父子表  
		        contentType: "application/x-www-form-urlencoded",
		        columns: [ 
						{field: 'check', checkbox:true},
						{field: 'id',title: '序号', align:'center',formatter: function (value, row, index) {
                              return index+1;
                        }},
						{field: 'phoneMobile',title: '手机号码',width:100,align:'center',valign:'center',sortable:true},
						{field: 'adviseor',title: '咨询人', align:'center',valign:'center',sortable:true},
						{field: 'status',title: '状态',align:'center',valign:'center',formatter:status_format},
						{field: 'plateNo',title: '车牌号', align:'center',valign:'center',sortable:true},
						{field: 'acceptName',title: '受理人', align:'center',valign:'center',sortable:true},
						{field: 'content',title: '内容',align:'center',valign:'left'},
						{field: 'createTime',title: '创建时间', align:'center',valign:'center',sortable:true},
						{field: 'id',title: '操作', align:'center',valign:'center',formatter: function (value, row, index) {
                              return "<i class=\"glyphicon glyphicon-remove\" onclick=\"deleteAdvice('"+value+"');\" title=\"删除\"></i>";
                        }}
		             ]
	      });
    };
    
   	oTableInit.queryParams = function (params) {
		jQuery.each(params,function(key,val){
			if(jQuery.isPlainObject(val) || jQuery.isArray(val)){
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
	        createTimeFrom:jQuery("#createTimeFrom").val(),
	        createTimeTo:jQuery("#createTimeTo").val()
	        //date: jQuery("#codeType").val(),
 	        //tradetype:jQuery('input:radio[name="tradetype"]:checked').val(),
 	        //success:jQuery('input:radio[name="success"]:checked').val(),
      	};
      	return temp;
    };
    return oTableInit;
};

// 验证
jQuery(function() {
	
	jQuery('#searchForm .form_datetime').datetimepicker({
	    format: 'yyyy-mm-dd',
	    minView: "month",
    	language: 'zh-CN', //汉化 
    	todayBtn: 1,
    	icon:'fa-arrow-right',
	   	autoclose:true //选择日期后自动关闭 
	});
    jQuery('#defaultForm').bootstrapValidator({
		//live: 'disabled',
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
        	phoneMobile: {
                validators: {
        			notEmpty: {
        				message:"请输入咨询手机号码."
                    },
                    stringLength: {
                        max: 11,
                        message:"手机号码的长度不能超过11位."
                    },
            		phone: {
            			country: 'CN',
        				message:"请输入有效的手机号码."	
            		}
                }
            },
            adviseor: {
                validators: {
            		notEmpty: {
            			message:"请输入咨询人."
            		},
		            stringLength: {
		                min: 1,
		                max: 20,
		                message:"输入内容长度必须介于1到20之间."
		            }
                }
            },
            status: {
                validators: {
                    notEmpty: {
            			message:"请选择状态."
                    }
                }
            },
            plateNo: {
                validators: {
            		notEmpty: {
	    				message:"请输入车牌号."
	        		},
		            stringLength: {
		            	min: 1,
		            	max: 15,
		            	message:"输入内容长度必须介于1到15之间."
		            },
		            regexp: {
	                    regexp: /^^[\u4e00-\u9fa5]{1}[a-zA-Z]{1}[a-zA-Z_0-9]{4}[a-zA-Z_0-9_\u4e00-\u9fa5]$|^[a-zA-Z]{2}\d{7}$ $/,
	                    message: '车牌号码无效（例：浙A12350）.'
	                }
	            }
            },
            content: {
                validators: {
                    notEmpty: {
            			message:"请输入咨询内容."
                    }
                }
            }
        }
    }).on('success.form.bv', function(e) {
    	// Prevent form submission
    	e.preventDefault();
    	
	});
    // 保存按钮事件
    jQuery('#validateBtn').click(function() {
		//debugger;
    	// Get the BootstrapValidator instance
    	var data = jQuery('#defaultForm').data('bootstrapValidator');
    	if (data) {
    	    // 修复记忆的组件不验证
	        data.validate();
	        if (!data.isValid()) {
	            return false;
	        }
	    }
    	// Use Ajax to submit form data
    	jQuery.ajax({
    		url:'save.action',
    		type:'post',
    		async:false,
    		dataType:'json',
    		data:jQuery('#defaultForm').serialize(),
    		success:function(data) {  
		        		if(data.success){
		        			jQuery("#closeBtn").click();
		        			//layer.alert(data.msg);  
		        			swal("", data.msg, "success");
							jQuery('#searchBtn').click();
		        		}  
		        	} 
    	});
    });
    //　模态框关闭事件　清空from表单数据和验证
	jQuery('.modal').on('hide.bs.modal', function () {
		//alert(11);
    	jQuery(this).find("form").data('bootstrapValidator').resetForm(true);
	})
	// 查询按钮
    jQuery('#searchBtn').click(function () {  
    	$table.bootstrapTable('refresh');  
    });
	// 重置按钮
	jQuery('#resetBtn').click(function () {  
		jQuery('#searchForm')[0].reset(); 
	});
    
	// 添加按钮
    jQuery("#addBtn").click(function () {  
    	jQuery("#myModal").modal();
    });
    
    // 删除按钮
    jQuery("#delBtn").click(function () {  
    	var selects = $table.bootstrapTable('getSelections'); 
    	if (selects.length == 0) {
//    		var dialogRef = BootstrapDialog.show({
//				title:'提示（3秒自动关闭）',
//	            size:BootstrapDialog.SIZE_SMALL,
//	            message: "<i class=\"glyphicon glyphicon-warning-sign\" />&nbsp;&nbsp;未选中记录."
//	        });
//			setTimeout(function(){
//                dialogRef.close();
//            }, 3000);
    		swal("", "未选中记录.", "warning");
    	}else{
    		var ids = "";var idKey = "id";
	    	jQuery.each(selects,function(i,record){
	    		ids+=record[idKey]+",";
	    	});
	    	ids = ids.substring(0,ids.length-1);
	    	deleteAdvice(ids);
    	}
    });
    
    // 修改按钮
    jQuery("#editBtn").click(function () {  
    	var selects = $table.bootstrapTable('getSelections');
    	var rowData = selects[0];
    	if (selects.length == 0) {
    		swal("", "未选中要操作的记录.", "warning");
    	}else if (selects.length > 1) {
    		swal("", "只能选择一行记录.", "warning");
    	}else{
    		jQuery("#myModal .modal-title").html("编辑咨询信息");
    		jQuery("#myModal input[name=id]").val(rowData.id);
    		jQuery("#myModal input[name=phoneMobile]").val(rowData.phoneMobile);
    		jQuery("#myModal input[name=adviseor]").val(rowData.adviseor);
    		jQuery("#adviceStatus").val(rowData.status);
    		jQuery("#myModal input[name=plateNo]").val(rowData.plateNo);
    		jQuery("#myModal textarea[name=content]").val(rowData.content);
    		jQuery("#myModal").modal();
    	}
    });
    
});

function edit(id){
	var selects = $table.bootstrapTable('getSelections');
	var rowData = selects[0];
	if (selects.length == 0) {
		swal("", "未选中要操作的记录.", "warning");
	}else if (selects.length > 1) {
		swal("", "只能选择一行记录.", "warning");
	}else{
		jQuery("#myModal .modal-title").html("编辑咨询信息");
		jQuery("#myModal input[name=id]").val(rowData.id);
		jQuery("#myModal input[name=phoneMobile]").val(rowData.phoneMobile);
		jQuery("#myModal input[name=adviseor]").val(rowData.adviseor);
		jQuery("#myModal option").removeAttr("selected");
		jQuery("#adviceStatus").find("option[value='"+rowData.status+"']").attr("selected",true);
		jQuery("#myModal input[name=plateNo]").val(rowData.plateNo);
		jQuery("#myModal textarea[name=content]").val(rowData.content);
		jQuery("#myModal").modal();
	}
}

function deleteAdvice(ids) { 
	var arr = [];
	jQuery.each(ids.split(","),function(i,record){
		arr.push('id='+record);
	});
	var msg = "该";
	if(arr.length>1){
		msg = "多条";
	}
	var data = arr.join("&");
	swal({
    		title: "删除提醒",
        	text: "确认删除"+msg+"咨询信息吗？",
        	type: "warning",
        	showCancelButton: true,
        	confirmButtonColor: "#DD6B55",
        	confirmButtonText: "确定",
        	cancelButtonText: "取消",
        	closeOnConfirm: false,
        	closeOnCancel: true
	},
	function(isConfirm){
		if (isConfirm) {
        	jQuery.ajax({
    			url:'delete.action',
    			type:'post',
    			async:false,
    			dataType:'json',
    			data:data,
    			success:function(data) {  
    						if(data.success){  
    							swal("", data.msg, "success");
								jQuery('#searchBtn').click();
    				      	}  
    					}
    		});
		}else{
			swal("", "取消操作", "warning");
		}
	});
}