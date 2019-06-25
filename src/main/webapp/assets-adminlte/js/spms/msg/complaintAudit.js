//投诉状态为已处理的扣费折扣不能操作 勾选框禁用
function checkFormatter(value, row, index) {
	if(row.status=='4'&&row.type=='3'){
        return {
            disabled: true,
        };
    }
}
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
	        sortName:"id",     //排序字段名称
	        sortOrder: "desc",          //排序方式
	        queryParamsType:'limit',
	        queryParams: oTableInit.queryParams,//传递参数（*）
	        sidePagination: "server",      //分页方式：client客户端分页，server服务端分页（*）
	        pageNumber:1,            //初始化加载第一页，默认第一页
	        pageSize: 10,            //每页的记录行数（*）
	        pageList: [10, 25, 50, 100],    //可供选择的每页的行数（*）
	        strictSearch: true,
	        clickToSelect: true,        //是否启用点击选中行
 	        //height: 460,            //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
	        uniqueId: "id",           //每一行的唯一标识，一般为主键列
	        cardView: false,          //是否显示详细视图
	        detailView: true,          //是否显示父子表  
	        contentType: "application/x-www-form-urlencoded",
	        detailFormatter:function(index, row) {
                return "<p class=\"text-info\">受理内容："+row.handleContent+"</p>"+
                		"<p class=\"text-info\">审核内容："+row.checkContent+"</p>";
            },
	        columns: [ 
				    {field: 'check', checkbox:true},//,formatter:checkFormatter},
					{field: 'id',title: '序号', align:'center',valign:'center',formatter: function (value, row, index) {return index+1;}},
					{field: 'phoneMobile',title: '手机号码',align:'center',valign:'center',sortable:true},
					{field: 'acountMobile',title: '账号手机号码', align:'center',valign:'center',sortable:true},
					{field: 'checkTime',title: '审核时间', align:'center',valign:'center',sortable:true},
					{field: 'plateNo',title: '车牌号', align:'center',valign:'center',sortable:true},
					{field: 'returnAmount',title: '返还金额', align:'center',valign:'center',sortable:true,formatter : function(value,row,index){
						return parseFloat(value) / 100+"元";
					}},
					{field: 'status',title: '状态',align:'center',valign:'center',formatter:sys.dicts.text('COMPLAINTSTATUS')},
	             ]
	      });
	};
	
	oTableInit.queryParams = function (params) {
	   	//debugger;
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
	        timeFrom : jQuery("#s_timeFrom").val(),
	        timeTo:jQuery("#s_timeTo").val(),
	        phoneMobile:jQuery("#s_phoneMobile").val(),
	        acountMobile:jQuery("#s_acountMobile").val(),
	        plateNo:jQuery("#s_plateNo").val()
	        //date: $("#codeType").val(),
	        //tradetype:$('input:radio[name="tradetype"]:checked').val(),
	        //success:$('input:radio[name="success"]:checked').val(),
      	};
      	return temp;
    };
    return oTableInit;
};

$(function () {
	
	//1.初始化Table
    var oTable = new TableInit();
    oTable.Init();
  
    //2.初始化Button的点击事件
	/* var oButtonInit = new ButtonInit();
	oButtonInit.Init(); */
	// 查询事件
	jQuery('#searchBtn').click(function () {  
		$table.bootstrapTable('refresh');  
	});
	
	// 重置按钮
	jQuery('#resetBtn').click(function () {  
		jQuery('#searchForm')[0].reset(); 
	});
	
	// 时间框
	jQuery('#searchForm .form_datetime').datetimepicker({
	    format: 'yyyy-mm-dd',
	    minView: "month",
		language: 'zh-CN', //汉化 
		todayBtn: 1,
		icon:'fa-arrow-right',
	   	autoclose:true //选择日期后自动关闭 
	});
	
	// 投诉审核弹出框
	$("#auditBtn").click(function () {  
		var selects = $table.bootstrapTable('getSelections'); 
		var rowData = selects[0];
		if (selects.length == 0) {
			swal("", "未选中要操作的记录.", "warning");
		}else if (selects.length > 1) {
			swal("", "只能选择一行记录.", "warning");
		}else if(rowData.status=='4'&&rowData.type=='3'){
			swal("", "已处理的扣费记录不能审核.", "warning");
		}else{
			jQuery("#myModal input[name=id]").val(rowData.id);
			jQuery("#phoneMobile").val(rowData.phoneMobile);
			jQuery("#complaintor").val(rowData.complaintor);
			//jQuery("#myModal option").removeAttr("selected");
			jQuery("#complaintType").val(rowData.type);
			jQuery("#complaintStatus").val(rowData.status);
			jQuery("#plateNo").val(rowData.plateNo);
			jQuery("#acountMobile").val(rowData.acountMobile);
			jQuery("#handleContent").val(rowData.handleContent);
			jQuery("#returnAmount").val(parseFloat(rowData.returnAmount) / 100);
			jQuery("#checkContent").val(rowData.checkContent);
			jQuery("#myModal").modal();
		}
	});
	// 投诉审核保存
	$('#defaultForm').bootstrapValidator({
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
	    				message:"请输入投诉手机号码."
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
	        complaintor: {
	            validators: {
	        		notEmpty: {
	        			message:"请输入投诉者."
	        		},
		            stringLength: {
		                min: 1,
		                max: 20,
		                message:"输入内容长度必须介于1到20之间."
		            }
	            }
	        },
	        type: {
	            validators: {
	                notEmpty: {
	        			message:"请选择类型."
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
	                    message: '车牌号码无效（例：浙A12350）'
	                }
	            }
	        },
	        acountMobile: {
	            validators: {
	    			notEmpty: {
	    				message:"请输入账号手机号码."
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
	        returnAmount: {
	            validators: {
	                notEmpty: {
	        			message:"请输入退款金额."
	                },
		            greaterThan: {
			            value:0,
			            message: '退款金额必须大于0'
		            }
	            }
	        },
	        checkContent: {
	            validators: {
	                notEmpty: {
	        			message:"请输入审核内容."
	                }
	            }
	        }
	    }
	}).on('success.form.bv', function(e) {
    	// Prevent form submission
    	e.preventDefault();
    	
	});
	$('#validateBtn').click(function() {
		//debugger;
    	// Get the BootstrapValidator instance
    	var data = $('#defaultForm').data('bootstrapValidator');
    	if (data) {
    	    // 修复记忆的组件不验证
	        data.validate();
	        if (!data.isValid()) {
	            return false;
	        }
	    }

    	var status=$('#complaintStatus').val();
		var type=$('#complaintType').val();

		//当扣费问题 进行审批的时候
		if(status=='4'&& type=='3'){
			$('#l_plateNo').val($('#plateNo').val());
			$('#l_returnAmount').val($('#returnAmount').val());
			//jQuery("#myModal").modal("hide");
			$('#lockModal').modal();
		}else{
        	save();
		}
	});
	//　模态框关闭事件　清空from表单数据和验证
	jQuery('#myModal').on('hide.bs.modal', function () {
		jQuery(this).find("form").data('bootstrapValidator').resetForm(true);
	})
	
	// 密码验证保存
	jQuery('#lockForm').bootstrapValidator({
		//live: 'disabled',
	    message: 'This value is not valid',
	    feedbackIcons: {
	        valid: 'glyphicon glyphicon-ok',
	        invalid: 'glyphicon glyphicon-remove',
	        validating: 'glyphicon glyphicon-refresh'
	    },
	    fields: {
	    	password: {
	            validators: {
	    			notEmpty: {
	    				message:"请输入登录密码."
	                }
	            }
	        }
	    }
	}).on('success.form.bv', function(e) {
    	// Prevent form submission
    	e.preventDefault();
    	
	});
	
	// 密码验证按钮点击事件
	jQuery('#lockValidateBtn').click(function() {
		var data = jQuery('#lockForm').data('bootstrapValidator');
    	if (data) {
    	    // 修复记忆的组件不验证
	        data.validate();
	        if (!data.isValid()) {
	            return false;
	        }
	    }
    	jQuery.ajax({
    		url: basePath+'/config/comfirmPwd.do',
    		type:'post',
    		async:false,
    		dataType:'json',
    		data:jQuery('#lockForm').serialize(),
    		success:function(res) {  
	    			//var res = $.parseJSON(result);
					if (res.success) {
						jQuery('#lockForm').data('bootstrapValidator').resetForm(true);
						jQuery('#lockModal').modal('hide');
						save();
					} else {
						swal("", res.msg, "warning");
					} 
	        	} 	
		});
	});
	
	// 删除按钮点击事件 弹出确认框
	jQuery("#delBtn").click(function () {  
		var selects = $table.bootstrapTable('getSelections'); 
		if (selects.length == 0) {
			swal("", "未选中记录.", "warning");
		}else{
			var arr = [],idKey = 'id'; //主键名称
	    	$.each(selects,function(i,record){
	    		arr.push('id='+record[idKey]);
	    	});
	    	var data = arr.join("&");
	    	deleteAudit(data);
    	}
    });
});

// 审核保存
function save(){
	$('#returnAmount').val(parseInt($('#returnAmount').val())*100);
	jQuery.ajax({
		url:'save.do',
		type:'post',
		async:false,
		dataType:'json',
		data:$('#defaultForm').serialize(),
		success:function(data) {  
					//debugger;
	    			jQuery("#myModal").modal('hide');
					swal("", data.msg, "warning");
	    			$('#searchBtn').click();
	        	} 
		});
};
// 审核删除
function deleteAudit(data) { 
	swal({
		title: "删除提醒",
    	text: "确认删除投诉信息吗？",
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
    			url:'delete.do',
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