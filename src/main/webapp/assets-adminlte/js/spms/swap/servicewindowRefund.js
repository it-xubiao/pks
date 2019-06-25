var rowIndex;
var rowIndexs;

function GetDateStr(AddDayCount) {
	var dd = new Date(); 
	dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
	var y = dd.getFullYear(); 
	var m = dd.getMonth()+1;//获取当前月份的日期 
	if(m<10){
		m = "0"+m;
	}
	var d = dd.getDate(); 
	if(d<10){
		d = "0"+d;
	}
	return y+"-"+m+"-"+d; 
} 
$('#createTimeFrom').val( GetDateStr(0));
$('#createTimeTo').val( GetDateStr(1));

var date = new Date();
$(function () {
	
	   //1.初始化Table
       var oTable = new TableInit();
       oTable.Init();

        //2.初始化Button的点击事件
        var oButtonInit = new ButtonInit();
        oButtonInit.Init();


    //时间框初始化
        $('.form_datetime').datetimepicker({
            format: 'yyyy-mm-dd',
            minView: "month",
        	language: 'zh-CN', //汉化 
        	todayBtn: 1,
        	icon:'fa-arrow-right',
           	autoclose:true //选择日期后自动关闭 
        });
});



var TableInit = function () {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#data_list_table').bootstrapTable({
            url: basePath+'/action/servicewindowRefund/dataList.do',     //请求后台的URL（*）
            method: 'post',           //请求方式（*）
            toolbar: '#toolbar',        //工具按钮用哪个容器
            striped: true,           //是否显示行间隔色
            cache: false,            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            //showRefresh:true,
            //showToggle:true,
            //showColumns:true,
            pagination: true,          //是否显示分页（*）
            sortable: true,           //是否启用排序
            // sortName:"bc.id",     //排序字段名称
            sortOrder: "desc",          //排序方式
            queryParamsType:'limit',
            queryParams: oTableInit.queryOperateDetailParams,//传递参数（*）
            sidePagination: "server",      //分页方式：client客户端分页，server服务端分页（*）
            pageNumber:1,            //初始化加载第一页，默认第一页
            pageSize: 10,            //每页的记录行数（*）
            pageList: [10, 25, 50, 100],    //可供选择的每页的行数（*）
            strictSearch: true,
            clickToSelect: true,        //是否启用点击选中行
// 	        height: 460,            //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "id",           //每一行的唯一标识，一般为主键列
            cardView: false,          //是否显示详细视图
            detailView: false,          //是否显示父子表
            contentType: "application/x-www-form-urlencoded",
            //showExport: true,                     //是否显示导出
            exportDataType: "all",              //basic', 'all', 'selected'.

            columns:[[
                //{field: 'checkbox', checkbox: false, align: 'center', valign: 'middle'},  
                {field:'id',title: '序号',visible:false},
                {field:'parkRecordId',title: '停车记录id',visible:false},
                {field:'operateDetailId',title: '详情id',visible:false},
                {field:'carOwner',title:'车主名称',align:'center',valign:'middle',sortable:true},
                {field:'telphone',title:'联系电话',align:'center',valign:'middle',sortable:true},
                {field:'plateNo',title:'车牌号码',align:'center',valign:'middle',sortable:true},
                {field:'plateColor',title:'车牌颜色',align:'center',valign:'middle',sortable:true,formatter : sys.dicts.text('PLATE_COLOR')},
                {field:'refundFee',title:'退费金额',align:'center',valign:'middle',sortable:true,sortable:true,formatter : function(value){return value / 100;}},
                {field:'refundTime',title:'退费日期',align:'center',valign:'middle',sortable:true},
                {field:'collectName',title:'收费员',align:'center',valign:'middle',sortable:true},
                {field:'createtime',title:'创建时间',align:'center',valign:'middle',sortable:true},
                {field:'creator',title:'创建人',align:'center',valign:'middle',sortable:true},
                {
                    field : 'operate', title : '详情', align : 'center', valign : 'middle',
                    formatter : function(value, row, index) {
                        var s = '<a href="javascript:void(0);" onclick="refundRegisterDetail('+row.parkRecordId+','+row.id+')"><span style="color:red">查看</span></a>  ';
                        return s;
                    }
                }
            ]]
        });
    };
    
	oTableInit.queryOperateDetailParams = function (params) {
        var temp = {  //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            page : params.offset==0 ? 1:(params.offset/params.limit)+1,  //pageIndex
            rows: params.limit,
            sort : params.sort, 
  	        order : params.order,
		  	createTimeFrom: $("#createTimeFrom").val(),
		  	createTimeTo: $("#createTimeTo").val(),
		  	plateNo: $("#plateNo").val()
        };
        return temp;
    };
    
    oTableInit.queryParams = function(params) {
        $.each(params, function(key, val) {
            if ($.isPlainObject(val) || $.isArray(val)) {
                subObj(val);
            } else {
                console.log(key + '=' + val);
            }
        });
        var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            page : params.offset == 0 ? 1 : (params.offset / params.limit) + 1, //pageIndex
            rows : params.limit, //页码
            sort : params.sort,
            order : params.order,
            refundTime : $("#refundTime").val(),
            refundFee : $('#refundFee').val(),
            carOwner : $('#carOwner').val(),
            telphone : $('#telphone').val(),
            createtime : $('#createtime').val(),
            creator : $('#creator').val(),
            plateNo : $('#plateNo').val(),
            plateColor : $('#plateColor').val(),
        };
        return temp;
    };
    return oTableInit;
};

var ButtonInit = function() {
    var oButtonInit = new Object();
    //初始化Table
    oButtonInit.Init = function() {
        $('#searchBtn').click(function() {
            $('#data_list_table').bootstrapTable('refresh',{url:basePath+ '/action/servicewindowRefund/dataList.do',query:{page:1}});
        });
        
        
//        $('#modify').click(function(){
//            var rows=$('#data_list_table').bootstrapTable('getAllSelections');
//            if(rows==null||rows.length>1 || rows.length<=0){
//                swal("提示","请选择一条记录");
//                return ;
//            }
//            $('#id').val(rows[0].id);
//            $('#operateDetailId').val(rows[0].operateDetailId);
//            $('#parkRecordId').val(rows[0].parkRecordId);
//		    $('#refundTime').val(rows[0].refundTime);
//		    $('#refundFee').val(rows[0].refundFee);
//		    $('#carOwner').val(rows[0].carOwner);
//		    $('#telphone').val(rows[0].telphone);
//		    $('#explain').val(rows[0].explain);
//		    $('#refundRegister').modal("show");
//            
//        });
        
        $('#add').click(function() {
        	window.open(basePath+ '/view/adminlte/spms/swap/servicewindowRefundRegister.jsp');
        });
    }
    return oButtonInit;
};



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


function refundRegisterDetail(parkRecordId, servicewindowRefundId){
	window.open(basePath+ '/view/adminlte/spms/swap/servicewindowRefundRegister.jsp?parkRecordId='
			+parkRecordId+'&servicewindowRefundId='+servicewindowRefundId);
}
function close_refresh(){
	$('#data_list_table').bootstrapTable('refresh',{url:basePath+ '/action/servicewindowRefund/dataList.do',query:{page:1}});
}
function refundRegisterForm(park_record_id){
	var parkRecordId;
	//查询操作员姓名和id
    $.ajax({
        url:basePath+'/action/servicewindowRefund/queryOperatorByParkRecordId.do', //请求后台的URL（*）
        type:"post",
        data:{parkRecordId:park_record_id},
        success: function(result) {
            var data=result.data;
            $('#collectId').val(data.operatorId),
            $('#operator').val(data.operator)
        },
	    error: function(result){
	    	swal("错误",result.errorMsg,"error");
	    }
    });
	
    $('#refundRegister').modal("show");
}


function refundRegister() {
   var param = getParam();
    $.ajax({
        url: basePath + "/action/servicewindowRefund/save.do",
        type: "post",
        data: param,
        success: function (data) {
            if (data.success) {
                $('#refundRegister').modal("hide");
                swal("成功",data.msg);
            } else {
                swal("错误",data.msg,"error");
            }
        }

    })
}


function getParam(){
    var param=$('#refundRegisterForm').serializeObject();
    return param;
}

var FormInit=function(){
    var oFormInit = new Object();
    //初始化Table
    oFormInit.Init = function () {
        $('#editForm').bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                plateNo: {
                    validators: {
                        regexp: {
                            regexp: /^^[\u4e00-\u9fa5]{1}[a-zA-Z]{1}[a-zA-Z_0-9]{4}[a-zA-Z_0-9_\u4e00-\u9fa5]$|^[a-zA-Z]{2}\d{7}$ $/,
                            message: '车牌号码无效（例：浙A12350）'
                        }
                    }
                }
            }
        }).on('success.form.bv', function(e) {
            e.preventDefault();
            var $form = $(e.target);
            var bv = $form.data('bootstrapValidator');
            $.post(basePath+ '/action/servicewindowRefund/save.do', $form.serialize(), function(result) {
                if(result.success){
                    swal("成功",result.msg);
                    $('#edit').modal('hide');
                    $('#data_list_table').bootstrapTable("refresh");
                }else{
                    swal("失败",result.msg);
                }
            }, 'json');
        });
        $('#detailForm').bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
            	stringEndDate:{validators: {notEmpty: {message:"请输入日期"},stringLength: {
	                min: 1,max: 10,message:"输入内容长度必须介于1到10之间."
	            }}},
	            amount:{validators: {notEmpty: {message:"请输入包月资格"},stringLength: {
	                min: 1,max: 10,message:"输入内容长度必须介于1到10之间."
	            }}}
            	
            }
        })
    }
    return oFormInit;
};

//导出数据
function exports() {
	if ($('#data_list_table').bootstrapTable("getData").length > 0) {
		var createTimeFrom = $('#createTimeFrom').val();
		var createTimeTo = $('#createTimeTo').val();
		var plateNo = $("#plateNo").val();
		var startDate = formatDate(createTimeFrom);
		var endDate = formatDate(createTimeTo);
		if (startDate > endDate) {
			swal("警告", "起始时间大于结束时间！", "warning");
		} else {
			window.open(basePath+'/action/servicewindowRefund/exportServicewindowRefund.do?plateNo='
					+ plateNo + "&createTimeFrom=" + createTimeFrom
					+ "&createTimeTo=" + createTimeTo);
		}
	} else {
		swal("", "当前查询条件下没有数据", "warning");
	}
}

function formatDate(strDate){
	 var  str=strDate.toString();
    var date = new Date(str.replace(/-/g,"/"));
    return date.getTime()/(1000*60*60*24);
}



