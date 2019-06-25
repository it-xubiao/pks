$(function(){
	//1.初始化Table
    var oTable = new TableInit();
    oTable.Init();
    
    //3.初始化表单的验证
    var oFormInit = new FormInit();
    oFormInit.Init();
    
});

var sex_format = function(value, row, index) {
	if (value == 0) {
		return "女";
	}
	return "男";
}

var reg_format = function(value, row, index) {
	if (value == "01") {
		return "开卡";
	} else if (value == "02") {
		return "包月";
	} else if (value == "03") {
		return "电子标签";
	} else if (value == "04") {
		return "支付宝";
	} else {
		return "特殊车辆";
	}
}

//是否发送验证码
var isSend=false;

	var TableInit = function () {
	    var oTableInit = new Object();
	    //初始化Table
	    oTableInit.Init = function () {
	      $('#data_list_table').bootstrapTable({
	        url: basePath+ '/action/customer/dataList.do',     //请求后台的URL（*）
	        method: 'post',           //请求方式（*）
	        toolbar: '#toolbar',        //工具按钮用哪个容器
	        striped: true,           //是否显示行间隔色
	        cache: false,            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
	        showRefresh:false,    
	        showToggle:false,
	        showColumns:false,
	        pagination: true,          //是否显示分页（*）
	        sortable: true,           //是否启用排序
	        //sortName:"bc.id",     //排序字段名称
	        sortOrder: "desc",          //排序方式
	        queryParamsType:'limit',
	        queryParams: oTableInit.queryParams,//传递参数（*）
	        sidePagination: "server",      //分页方式：client客户端分页，server服务端分页（*）
	        pageNumber:1,            //初始化加载第一页，默认第一页
	        pageSize: 10,            //每页的记录行数（*）
	        pageList: [10, 25, 50, 100],    //可供选择的每页的行数（*）
	        strictSearch: true,
	        clickToSelect: true,        //是否启用点击选中行
// 	        height: 460,            //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
	        uniqueId: "id",           //每一行的唯一标识，一般为主键列
	        cardView: false,          //是否显示详细视图
	        detailView: true,          //是否显示父子表  
	        contentType: "application/x-www-form-urlencoded",

	        columns: [ 
                    {field: 'state', checkbox:true},
                    {field: 'id',title: '序号',visible:false},
					{field: 'name',title: '姓名',align:'center',valign:'middle',sortable:true},
					{field: 'phone',title: '联系电话', align:'center',valign:'middle',sortable:true},
					{field: 'account',title: '账号', align:'center',valign:'middle',sortable:true},
					{field: 'gender',formatter:sex_format,title: '性别', align:'center',valign:'middle',sortable:true},
//					{field: 'identityCode',title: '身份证号', align:'center',valign:'middle',sortable:true},
					{field: 'regFrom',formatter:reg_format,title: '注册来源',align:'center',valign:'middle',sortable:true},
//					{field: 'drivingCode',title: '驾照',align:'center',valign:'middle',sortable:true},
					{field: 'isValid',title: '是否有效',align:'center',valign:'middle',formatter:sys.dicts.text('IS_VALID')},
					{field: 'creator',title: '创建人',align:'center',valign:'middle',sortable:true},
					{field: 'createTime',title: '创建时间',align:'center',valign:'middle',sortable:true},
					{field: 'updateTime',title: '更新时间',align:'center',valign:'middle',sortable:true},
					{field: 'virsualAccount',title: '资金账户',align:'center',valign:'middle',sortable:true,
						formatter:function (value,row,index){
							if(value==0){return "否";}return "是";}}
	             ],
	             
            //记录查询
            detailFormatter:function(index, row) {
              return '<div style="padding:2px"><table id="detailDiv'
                      + index + '" class="ddv"></table></div>';
            },
            onExpandRow : function(index, row, detail) {
              var ddv = detail.find('table.ddv');
              ddv.bootstrapTable({
                url: basePath+ '/action/customer/queryCustomerCarByCustomerId.do?customerId='+ row.id,     //请求后台的URL（*）
                method: 'get',           //请求方式（*）
                striped: true,           //是否显示行间隔色
                cache: false,            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: true,          //是否显示分页（*）
                sortable: true,           //是否启用排序
                sortName:"bc.id",     //排序字段名称
                sortOrder: "desc",          //排序方式
                queryParamsType:'limit',
                queryParams : oTableInit.queryOperateDetailParams,//传递参数（*）
                sidePagination: "server",      //分页方式：client客户端分页，server服务端分页（*）
                pageNumber:1,            //初始化加载第一页，默认第一页
                pageSize: 10,            //每页的记录行数（*）
                pageList: [10, 25, 50, 100],    //可供选择的每页的行数（*）
                strictSearch: true,
                clickToSelect: true,        //是否启用点击选中行
//     	        height: 460,            //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
                uniqueId: "id",           //每一行的唯一标识，一般为主键列
                cardView: false,          //是否显示详细视图
                detailView: false,          //是否显示父子表
                checkboxHeader: false,
                columns: [
                          {field: 'stated', checkbox:true},
                          {field: 'id',title: '序号',visible:false},
                          {field: 'customerName',title: '车主姓名',align:'center',valign:'middle',sortable:true},
                          {field: 'plateNo',title: '车牌号',align:'center',valign:'middle',sortable:true},
                          {field: 'plateColor',title: '车牌颜色', align:'center',valign:'middle',sortable:true,
                        	  formatter:function (value,row,index){
                        	  if(value==0){
                        		  return "蓝";
                        	  }else if(value==1){
                        		  return "黄";
                        	  }else if(value==2){
                        		  return "白";
                        	  }else{
                        		  return "黑";
                        	  }
                          }},
                          {field: 'travelNo',title: '行驶证号码', align:'center',valign:'middle',sortable:true},
                          {field: 'carType',title: '车类型', align:'center',valign:'middle',sortable:true,
                        	  formatter:function(value,row,index){
                        		  if(value=="00"){
                        			  return "小型车";
                        		  }else{
                        			  return "大型车";
                        		  }
                        	  }},
                          {field: 'createTime',title: '创建时间', align:'center',valign:'middle',sortable:true},
                          {field: 'updateTime',title: '更新时间', align:'center',valign:'middle',sortable:true},
                          {field: 'note',title: '备注', align:'center',valign:'middle',sortable:true}
                        ],
       	              rowStyle: function (row, index) {
	 	                 //这里有5个取值代表5中颜色['active', 'success', 'info', 'warning', 'danger'];
	 	                 var strclass = "";
	 	                 if (row.isOnline == "1") {
	 	                     strclass = 'success';//还有一个active
	 	                 }else if (row.isOnline == "0") {
	 	                     strclass = 'danger';
	 	                 }else {
	 	                     return {};
	 	                 }
	 	                 return { classes: strclass }
 	             },

                      })
                    }
	      });
	    };
	    oTableInit.queryOperateDetailParams = function (params) {
	        var temp = {  //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
	            page : params.offset==0 ? 1:(params.offset/params.limit)+1,  //pageIndex
	            rows: params.limit
	        };
	        return temp;
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
	        page : params.offset==0 ? 1:(params.offset/params.limit)+1,  //pageIndex
	        rows: params.limit, //页码
	        sort : params.sort, 
	        order : params.order,
	        account : $("#account").val(),
	        name : $("#name").val(),
	        phone : $("#phone").val(),
	        regFrom : $("#regFrom").val(),
	        gender : $("#gender").val()
	      };
	      return temp;
	    };
	    return oTableInit;
	  };

//显示验证码输入框
$('#isVirtualCard').change(function(){
	if($('#isVirtualCard').val()==1){
		$('#codeDiv').show();
	}else{
		$('#codeDiv').hide();
	}
})

//发生验证码
function sendValidate() {

    //添加车主的时候调用
    var phone = $('#phoneNumber').val();
    if (phone == '' || phone == null) {
        //添加车主虚拟卡的时候调用
        phone=$('#mobile').val();
        if(phone == '' || phone == null){
        	swal("提示", "请输入联系电话");
            return;
        }

    }
    var customerName = $('#customerName').val();
    $.ajax({
        url: basePath+'/action/customer/sendCheckCode.do',
        type: 'post',
        dataType: 'json',
        data: {
            phone: phone,
            customerName: customerName
        },
        success: function (data) {
            isSend=true;
            if (data.success) {
                swal("提示","发送成功");
            } else {
            	swal('失败', '发送失败');
            }

        },
		error : function(data) {
			swal("错误", data.responseText, "error");
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

// 搜索事件
function searchSubmit(){
   $('#data_list_table').bootstrapTable('refresh',{url:basePath+ '/action/customer/dataList.do',query:{page:1}});
}

$('#add').click(function(){
	$('#visualAccount').css("display","block");
	$('#isVirtualCard').val(0);
})

//添加
var FormInit=function(){
    var oFormInit = new Object();
    //初始化Table
    oFormInit.Init = function () {

        $('#defaultForm').bootstrapValidator({
              message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
            	name: {validators: {notEmpty: {message:"请输入姓名"},stringLength: {
	                min: 1,max: 10,message:"输入内容长度必须介于1到10之间."
	            }}},
            	gender: {validators: {notEmpty: {message:"请选择性别"},}},
            	identityCode: {validators: {notEmpty: {message:"请输入身份证号码"},regexp: {
                    regexp: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                    message: '身份证号码格式不正确'
                },stringLength:{max:20,message:"身份证号码的长度不能超过20位."}}},
            	drivingCode: {validators: {notEmpty: {message:"请输入驾照号码"},stringLength: {
	            	max: 30,
	             	message:"驾照号码的长度不能超过30位"
             	}}},
            	phone: {validators: {notEmpty: {message:"请输入电话号码"},stringLength: {
                    max: 11, message:"手机号码的长度不能超过11位."
                },
        		phone: {
        			country: 'CN',message:"请输入有效的手机号码."	
        		}}},
            	address: {validators: {notEmpty: {message:"请输入地址"},}},
            	isVirtualCard: {validators: {notEmpty: {message:"请选择是否生成虚拟卡"}}},
            	code: {validators: {notEmpty: {message:"请输入验证码"}}},
            }


        }).on('success.form.bv', function(e) {
            $.ajax({
            	url:basePath+'/action/customer/save.do',
                data:$('#defaultForm').serialize(),
                type:"post",
                asyna:false,
                dataType:'json',
                success: function(data){
                    if(data.success){
                        swal("成功","保存成功！");
                        $("#defaultForm").data('bootstrapValidator').resetForm(true);
                        $('#edit').modal('hide');
                        defaultForm_reset();
                       $('#data_list_table').bootstrapTable("refresh");
                    }else{
                    	 swal("失败",data.msg);
                    }
                },
                 error:function(data){
                	 swal("错误",data.responseText,"error");
                 }
            });
            return false;
        });
        $('#edit').on('hide.bs.modal', function (obj) {
        	if(obj.target.id=="edit"){
        		defaultForm_reset();
        		$(this).find("form").data('bootstrapValidator').resetForm(true);
        	}
        		
        });
    }
    return oFormInit;
}

function defaultForm_reset(){
	clearForm($("#defaultForm"));
	defaultFormReset();
}

function defaultFormReset(){
	$('#id').val("");
	$('#customerName').val("");
	$('#genderInfo').val("");
	$('#identityCode').val("");
	$('#drivingCode').val("");
	$('#phoneNumber').val("");
	$('#address').val("");
	$('#isVirtualCard').val(0);
	$('#codeDiv').hide();
}

function clearForm(form) {
	  $(':input', form).each(function() {
		  var type = this.type;
		  var tag = this.tagName.toLowerCase(); // normalize case
		  if (type == 'text' || type == 'password' || tag == 'textarea')
			  this.value = "";
	//			    else if (type == 'checkbox' || type == 'radio')
	//			      this.checked = false;
		  else if (tag == 'select')
			  this.selectedIndex = 0;
	  });
}

//修改
$('#modify').click(function(){
	$('#visualAccount').css("display","none");
	$('#codeDiv').hide();
    var rows=$('#data_list_table').bootstrapTable('getAllSelections');
    if(rows==null||rows.length>1 || rows.length<=0){
    	swal("提示","请选中一条车主记录！！");
        return ;
    }
    $.ajax({
    	url:  basePath+ '/action/customer/getId.do',
        type:"post",
        data:{id:rows[0].id},
        success: function(result) {
            var data=result.data;
                $('#id').val(data.id);
                $('#customerName').val(data.name);
                $('#genderInfo').val(data.gender);
                $('#identityCode').val(data.identityCode);
                $('#drivingCode').val(data.drivingCode);
                $('#phoneNumber').val(data.phone);
                $('#address').val(data.address);
//                $('#isVirtualCard').val(data.virsualAccount);
                
                $('#edit').modal('show'); 
        }
    });

})

//删除
function deleteData(){
	var ids=[] ;
    var names=[];
    var rows=$('#data_list_table').bootstrapTable('getAllSelections');
    if(rows.length<=0){
        swal("提示","请选中一条车主记录！");
        return;
    }else{
    	 $.ajax({
    		 url:'queryCustomerCarByCustomerId.do',
             type:"post",
             data:{"customerId":rows[0].id},
             dataType:'json',
             traditional:true,
             success : function(data) {
            	 if(data.total==0){
             		for(var i=0;i<rows.length;i++){
                         ids.push(rows[i].id);
                         names.push(rows[i].name);
                     }
                     swal({
                             title: "删除提醒",
                             text: "你确定要删除车主"+names+"的信息吗？",
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
                                 $.ajax({
                                     url:basePath+'/action/customer/delete.do',
                                     type:"post",
                                     data:{"id":ids},
                                     dataType:'json',
                                     traditional:true,
                                     success : function(data) {
                                     	if(data.success){
                                     		swal("成功", "删除成功");
                                     		if($('#data_list_table').bootstrapTable("getData").length!=rows.length){
                                     			$('#data_list_table').bootstrapTable("refresh");
                                     		}else{
                                     			$('#data_list_table').bootstrapTable('refresh',{query:{page:1}});   
                                     		}
                                     	}else{
                                     		swal("失败", data.msg);
                                     	}
                 					},
                 					error : function(data) {
                 						swal("错误", data.responseText, "error");
                 					}
                                 });
                             }
                         });
             	}else{
             		swal("提示","该车主下有车辆，无法删除！");
             	}
             }
    	 });
    }
}

var flag=true;
//添加车辆
$('#addCar').click(function(){
	var rows = $('#data_list_table').bootstrapTable('getAllSelections');
	if (rows == null || rows.length > 1 || rows.length <= 0) {
		swal("提示","请选中一条车主记录！");
		return;
	}

	$('#customer_id').val(rows[0].id);
    $('#customerId').val(rows[0].name);
	$('#editCar').modal('show'); 
	
	 //addCar_defaultFormsave()
});

//　模态框关闭事件　清空from表单数据和验证
$('#editCar').on('hide.bs.modal', function (obj) {
	if(obj.target.id=="editCar"){
		modifyForm_reset();
		$(this).find("form").data('bootstrapValidator').resetForm(true);
	}	
});

function modifyForm_reset(){
	flag=true;
	clearForm($("#addCar_defaultForm"));
	addCar_defaultFormReset();
}

//修改车辆信息
$('#modifyCarMsg').click(function(){
	var table = $('table[id^=detailDiv]');
    var selectNum = 0;
    var id;
    var tableNow=-1;
    for(var i=0;i<table.length;i++){
        id = '#' + table[i].id;
        var row=$(id).bootstrapTable('getSelections');
        if(row.length>1){
        	swal("提示","请选择一条记录！");
            return;
        }else if(row.length==1){
            selectNum+=row.length;
            tableNow=i;
        }
    }
    if(selectNum!=1){
        swal("提示","请选择一条记录！");
        return;
    }
    
    id='#' +table[tableNow].id;
    var rows=$(id).bootstrapTable('getSelections');
    var row = rows[0];
    
    $('#customerId').val(rows[0].customerName);
    $.ajax({
    	url:  basePath+ '/action/customer/getCustomerCarId.do',
        type:"post",
        data:{id:rows[0].id},
        success: function(result) {
            var data=result.data;
            $('#customer_id').val(data.customerId);
            $('#customerCarId').val(data.id);
            $('#plateNo').val(data.plateNo.replace(/\s/g, ""));
            $('#plateColor').val(data.plateColor);
            $('#travelNo').val(data.travelNo);
            $('#carType').val(data.carType);
            $('#carRackNo').val(data.carRackNo);
            $('#carColor').val(data.carColor);
            $('#carModel').val(data.carModel);
            $('#buyCompany').val(data.buyCompany);
            $('#buyDate').val(data.buyDate);
            $('#note').val(data.note);                
            $('#editCar').modal('show'); 
        },
		error : function(data) {
			swal("错误", data.responseText, "error");
		}
    });
    //addCar_defaultFormsave();

});
jQuery(function(){
	$('#addCar_defaultForm').bootstrapValidator({
		message : 'This value is not valid',
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			plateNo: {
				validators: {
					notEmpty: {
						message:"请输入车牌号"
					},
                    stringLength: {
                          min: 7,
                          max: 7,
                          message: '车牌号长度填写错误'
                    },
                    regexp: {
                          regexp: /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/,
                          message: '车牌号填写错误'
                    }
				}
			},
			travelNo: {validators: {notEmpty: {message:"请输入行驶证号码",stringLength: {min:1,max:64, message:"输入内容长度必须在1和64之间"}}}},
		}
	}).on('success.form.bv', function(e) {
		e.preventDefault();
	});
    // 保存按钮事件
    jQuery('#validateBtn').click(function() {
    	var data = jQuery('#addCar_defaultForm').data('bootstrapValidator');
    	if (data) {
    	    // 修复记忆的组件不验证
	        data.validate();
	        if (!data.isValid()) {
	            return false;
	        }
	    }
		$.ajax({
			url : basePath + '/action/customer/saveCar.do',
			data : $('#addCar_defaultForm').serialize(),
			type : "post",
			async : false,
			dataType : 'json',
			success : function(data) {
				if (data.success) {
					swal("成功", data.msg);
					$('#editCar').modal('hide');	
        			$('table.ddv').bootstrapTable("refresh");
				}else{
					swal("失败", data.msg);
					flag=true;
				}
			},
			error : function(data) {
				swal("错误", data.responseText, "error");
			}
		});
	});
});
function addCar_defaultFormsave(){
	$('#addCar_defaultForm').bootstrapValidator({
		message : 'This value is not valid',
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			plateNo: {validators: {notEmpty: {message:"请输入车牌号"},stringLength: {max: 15, message:"车牌号的长度不能超过15位."}}},
			travelNo: {validators: {notEmpty: {message:"请输入行驶证号码",stringLength: {min:1,max:64, message:"输入内容长度必须在1和64之间"}}}},
		}
	}).on('success.form.bv', function(e) {
		var $form = $(e.target);
        var bv = $form.data('bootstrapValidator');
		$.ajax({
			url : basePath + '/action/customer/saveCar.do',
			data : $('#addCar_defaultForm').serialize(),
			type : "post",
			asyna : false,
			dataType : 'json',
			success : function(data) {
				if (data.success) {
					swal("成功", data.msg);
					$('#editCar').modal('hide');
				}else{
					swal("失败", data.msg);
					flag=true;
				}
			},
			error : function(data) {
				swal("错误", data.responseText, "error");
			}
		});
	});
//	$('#validateBtn').click(function() {
//		 $('#addCar_defaultForm').submit();
//
//	});
}

//删除车辆信息
function deleteCarData(){
	var ids=[] ;
    var names=[];
    var table = $('table[id^=detailDiv]');
    var id;
    for(var i=0;i<table.length;i++){
        id = '#' + table[i].id;
        var rows=$(id).bootstrapTable('getSelections');
        for(var x=0;x<rows.length;x++){
            ids.push(rows[x].id);
            names.push(rows[x].plateNo);
        }
    }
    if(ids.lenght==0){
        swal("提示","请选择一条记录！");
        return;
    }else{
        swal({
                title: "删除提醒",
                text: "你确定要删除车牌为"+names+"的信息吗？",
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
                    $.ajax({
                        url:basePath+'/action/customer/deleteCar.do',
                        type:"post",
                        data:{"id":ids},
                        dataType:'json',
                        traditional:true,
                        success : function(data) {
                        	if(data.success){
                        		swal("成功", data.msg);
                        		if($('table.ddv').bootstrapTable("getData").length!=rows.length){
                        			$('table.ddv').bootstrapTable("refresh");
                        		}else{
                        			$('table.ddv').bootstrapTable('refresh',{query:{page:1}});   
                        		}
                        		                        		
                        	}else{
                        		swal("失败", data.msg);
                        	}
    					},
    					error : function(data) {
    						swal("错误", data.responseText, "error");
    					}
                    });
                }
            });
    }
}

//添加车主 虚拟卡
$('#addVirtualCard').click(function(){
    var rows=$('#data_list_table').bootstrapTable('getAllSelections');
    if(rows==null||rows.length>1 || rows.length<=0){
    	swal("提示","请选中一条车主信息！");
        return ;
    }
    if(rows[0].virsualAccount==0){
    	$('#addId').val(rows[0].id);
    	$('#mobile').val(rows[0].phone);
    	$("#code").val("");
    	$('#editVirtualCard').modal('show').on('hide.bs.modal', function () {
    		$(this).find("form").data('bootstrapValidator').resetForm(true);
        }); 
    	
    	$('#addVirtualCard_defaultForm').bootstrapValidator({
    		message : 'This value is not valid',
    		feedbackIcons : {
    			valid : 'glyphicon glyphicon-ok',
    			invalid : 'glyphicon glyphicon-remove',
    			validating : 'glyphicon glyphicon-refresh'
    		},
    		fields : {
    			phone: {validators: {notEmpty: {message:"请输入电话号码"},stringLength: {
                    max: 11, message:"手机号码的长度不能超过11位."}}
                }
    		}
    	}).on('success.form.bv', function(e) {
    		if(isSend){
    			$.ajax({
        			url : basePath + '/action/customer/addVirCard.do',
        			data : $('#addVirtualCard_defaultForm').serialize(),
        			type : "post",
        			asyna : false,
        			dataType : 'json',
        			success : function(data) {
        				isSend=false;
        				if (data.success) {
        					swal("成功", data.msg);
        					$("#addVirtualCard_defaultForm").data('bootstrapValidator').resetForm(true);
        					$('#editVirtualCard').modal('hide');
        					$('#data_list_table').bootstrapTable("refresh");
        				}else{
        					swal("失败", data.msg);
        				}
        			},
        			error : function(data) {
        				swal("错误", data.responseText);
        			}
        		});
    		}else{
    			swal('提示', '请发送验证码');
    		}
    		return false;
    	});
    }else{
    	swal('提示', '已经生成了车主虚拟卡.');
    }
    
});

function addCar_defaultFormReset(){
	$('#customer_id').val("");
	$('#customerCarId').val("");
    $('#plateNo').val("");
    $('#travelNo').val("");
    $('#carRackNo').val("");
    $('#carColor').val("");
    $('#carModel').val("");
    $('#buyCompany').val("");
    $('#buyDate').val("");
    $('#note').val("");
}







