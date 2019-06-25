$(function () {
	//1.初始化Table
    var oTable = new TableInit();
    oTable.Init();
    //2. 初始化表单的验证
    var oFormInit = new FormInit();
    oFormInit.Init();
});
//var isFirst = true; //是否第一次初始化Table，初始化Table只能一次
//当前点击停车记录的行
var index=-1;
//选中欠费车辆记录存储选中行信息，导出用
var selectRow = null;
var TableInit = function () {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#park_record_his').bootstrapTable({
            method: 'post',           //请求方式（*）
            striped: true,           //是否显示行间隔色
            cache: false,            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
           /* showRefresh:true,
            showToggle:true,
            showColumns:true,*/
            pagination: true,          //是否显示分页（*）
            sortable: true,           //是否启用排序
            sortName:"id",     //排序字段名称
            sortOrder: "desc",          //排序方式
            queryParamsType:'limit',
            queryParams: oTableInit.queryParktRecordParams,//传递参数（*）
            sidePagination: "server",      //分页方式：client客户端分页，server服务端分页（*）
            pageNumber:1,            //初始化加载第一页，默认第一页
            pageSize: 10,            //每页的记录行数（*）
            pageList: [10, 25, 50, 100],    //可供选择的每页的行数（*）
            strictSearch: true,
            clickToSelect: true,        //是否启用点击选中行
// 	        height: 460,            //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "id",           //每一行的唯一标识，一般为主键列
            cardView: false,          //是否显示详细视图
            showExport: false,  
            detailView: true,          //是否显示父子表
            contentType: "application/x-www-form-urlencoded",
            columns: [
                {field:'id',hidden:true,visible:false},
                {field:'parkName',title:'停车点名称',align:'center',valign:'middle',sortable:true},
                {field:'berthCode',title:'泊位编码',align:'center',valign:'middle',sortable:true},
                {field:'plateNo',title:'车牌号',align:'center',valign:'middle',sortable:true},
                {field:'feeState',title:'收费状态',align:'center',valign:'middle',sortable:true,formatter : sys.dicts.text('FEE_STATE')},
                {field:'photoNum',title:'拍照数',align:'center',valign:'middle',sortable:true,visible:true},
                {field:'arriveTime',title:'到达时间',align:'center',valign:'middle',sortable:true,visible:true},
                {field:'departureTime',title:'驶离时间',align:'center',valign:'middle',sortable:true,visible:true},
                {field:'isManual',title:'是否手动',align:'center',valign:'middle',sortable:true,visible:true,formatter : sys.dicts.text('IS_MANUAL')},
                {field:'stingDurations',title:'停车时长',align:'center',valign:'middle',sortable:true},
                {field:'parkFee',title:'停车应收费用(元)',align:'center',valign:'middle',sortable:true,formatter : function(value){
                    return value / 100;
                }},
                {field:'unpaidFee',title:'未付金额(元)',align:'center',valign:'middle',sortable:true,formatter : function(value){
                    return value / 100;
                }},
                {field:'operate',title:'操作',width:'60px',align:'center',valign:'middle',
                    formatter:function(value,rowData,rowIndex){
                        var d = new Array();
                        d[0] = rowData.unpaidFee;
                        d[1] = rowData.id;
                        if(rowData.unpaidFee > 0){

                            return '<a herf="#" type="button" onclick="toPayFee('+rowData.unpaidFee/100+','+rowData.id+')" style="cursor:pointer">补缴费</a>';
                        }else{
                            return "已补缴";
                        }
                    }},
            ],

            //
            detailFormatter:function(index, row) {
                return '<div style="padding:2px;width: 77.5%;"><table id="detailDiv'
                    + index + '"  class="ddv"></table></div>';
            },

            onExpandRow : function(index, row, detail) {
                rowIndex=index;
                var ddv = detail.find('table.ddv');
                ddv.bootstrapTable({
                    url:basePath+'/action/parkRecordHis/queryOperateDetail.do?parkRecordId='+row.id, //请求后台的URL（*）
                    method : 'post', //请求方式（*）
                    striped : true, //是否显示行间隔色
                    cache : false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                    /*   showRefresh:true,
                     showToggle:true,
                     showColumns:true,*/
                    pagination : true, //是否显示分页（*）
                    sortable : true, //是否启用排序
                    //sortName:"bc.id",     //排序字段名称
                    sortOrder : "desc", //排序方式
                    queryParamsType : 'limit',
                    queryParams : {
                        parkRecordId : row.id
                    },//传递参数（*）
                    sidePagination : "server", //分页方式：client客户端分页，server服务端分页（*）
                    pageNumber : 1, //初始化加载第一页，默认第一页
                    pageSize : 10, //每页的记录行数（*）
                    pageList : [ 10, 25, 50,100 ], //可供选择的每页的行数（*）
                    strictSearch : true,
                    clickToSelect : true, //是否启用点击选中行
                    //		 	        height: 460,            //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
                    uniqueId : "id", //每一行的唯一标识，一般为主键列
                    cardView : false, //是否显示详细视图
                    detailView : false, //是否显示父子表
                    columns : [
                        {
                            field : 'id',
                            title : '序号',
                            visible:false
                        },
                        {
                            field : 'operateType',
                            title : '操作类型',
                            align : 'center',
                            valign : 'middle',
                            sortable : true
                            ,formatter:sys.dicts.text('OPERATE_TYPE')
                        },
                        {
                            field : 'operator',
                            title : '操作人',
                            align : 'center',
                            valign : 'middle',
                            sortable : true
                        },
                        {
                            field : 'operatorType',
                            title : '操作人类型',
                            align : 'center',
                            valign : 'middle',
                            sortable : true
                            ,formatter:sys.dicts.text('OPERATOR_TYPE')
                        },
                        {
                            field : 'beforeState',
                            title : '操作前状态',
                            align : 'center',
                            valign : 'middle',
                            sortable : true
                            ,formatter:sys.dicts.text('FEE_STATE')
                        },
                        {
                            field : 'afterState',
                            title : '操作后状态',
                            align : 'center',
                            valign : 'middle',
                            sortable : true
                            ,formatter:sys.dicts.text('FEE_STATE')
                        },
                        {
                            field : 'operateTime',
                            title : '操作时间',
                            align : 'center',
                            valign : 'middle',
                            sortable : true
                        },
                        {
                            field : 'operateDesc',
                            title : '描述',
                            width : 100,
                            align : 'center',
                            valign : 'middle',
                            sortable : true
                        },
                        {
                            field : 'operate',
                            title : '操作',
                            align : 'center',
                            valign : 'middle',
                            formatter : function(value, row, index) {
                                //判断操作类型
                                if (row.operateType == '16') {
                                    var s = '<a href="#" onclick="complainForm(this)"><span style="color:red">投诉</span></a>  ';
                                    rowIndexs = index;
                                    return s;
                                }
                            }
                        } 
                        ],                        
						 //行双击事件
			            onDblClickRow: function (row,index) {
			            	 //debugger;
			            	 console.log(row.parkRecordId);
				            	if(row.operateType == 05){				            		
					            		$.ajax({
					            			url : basePath+'/photoRecord/findPhotoById.do?operateDetailId='+row.id,
					            			type : 'post',
					            			dataType : 'json',
					            			success : function(result){
					            				console.log(result.photoPath);
					            				console.log("是否有效"+result.isValid);
					            				if(result.isValid == 0){
					            					$('#photo').modal('show');
					            					$('#photoimg').attr('src',result.photoPath);
					            					$('#photoimg').attr('hidden',false);
					            					$('#yesOrNo').attr('hidden',true);
					            				}else{
					            					$('#photoimg').attr('hidden',true);
					            					$('#yesOrNo').attr('hidden',false);
					            				}			            						
					            			}
					            		});
								}else{
									$('#operateType').val(row.operateType);
									$('#operator').val(row.operator);
									$('#operatorType').val(row.operatorType);
									$('#beforeState').val(row.beforeState);
									$('#afterState').val(row.afterState);
									$('#parkDeal').modal("show");
								}
			             },
                })
            }
        });
        
        //点击行变色，将行信息存储到全局变量
        $('#data_list_table').on('click-row.bs.table', function (e, row, $element) {
        	if(selectRow == null || selectRow != row){
        		$('.success').removeClass('success');
                $($element).addClass('success');
                selectRow = row;
        	}else{
                $('.success').removeClass('success');
                selectRow = null;
        	}
        });
        
        $('#data_list_table').bootstrapTable({
            url:basePath+ '/action/owefeeRecord/dataList.do',     //请求后台的URL（*）
            method: 'post',           //请求方式（*）
            striped: true,           //是否显示行间隔色
            cache: false,            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
           /* showRefresh:true,
            showToggle:true,
            showColumns:true,*/
            pagination: true,          //是否显示分页（*）
            sortable: true,           //是否启用排序
            sortName:"id",     //排序字段名称
            sortOrder: "desc",          //排序方式
            queryParamsType:'limit',
            queryParams: oTableInit.querySearchParams,//传递参数（*）
            sidePagination: "server",      //分页方式：client客户端分页，server服务端分页（*）
            pageNumber:1,            //初始化加载第一页，默认第一页
            pageSize: 10,            //每页的记录行数（*）
            pageList: [10, 25, 50, 100],    //可供选择的每页的行数（*）
            strictSearch: true,
            clickToSelect: true,        //是否启用点击选中行
// 	        height: 460,            //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "id",           //每一行的唯一标识，一般为主键列
            contentType: "application/x-www-form-urlencoded",
            showExport: false,                     //是否显示导出
            exportDataType: "all",              //basic', 'all', 'selected'.
            columns: [
                {field: 'id',title: '序号',hidden:true, visible:false},
                {field: 'plateNo',title: '车牌号',width:100,align:'center',valign:'middle'},
                {field: 'plateColor',title: '车牌颜色', align:'center',valign:'middle',sortable:true, formatter : sys.dicts.text('PLATE_COLOR')},
                {field: 'sumOweFee',title: '欠费总金额', align:'center',valign:'middle',formatter : function(value){
                    return value / 100;
                }},
                {field: 'partOweFee',title: '已补缴金额', align:'center',valign:'middle',formatter : function(value){
                    return value / 100;
                }},
                {field: 'noOweFee',title: '未补缴金额', align:'center',valign:'middle',formatter : function(value){
                    return value / 100;
                }},
                {field: 'type',title: '欠费类型', align:'center',valign:'middle',sortable:true, visible:false, formatter : sys.dicts.text('OWEFEERECORD_TYPE')},
            ],
            onClickRow : function(row){
                index=row.parkRecordId,
                $('#park_record_his').bootstrapTable("refresh",{ url:basePath+ '/action/owefeeRecord/queryParkRecordHisByModel.do?plateNo='+row.plateNo+'&plateColor='+row.plateColor});
                $("#parkRecordHisDiv").slideDown(500);
            }
        });
    };

    oTableInit.querySearchParams = function (params) {
        var temp = {  //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            page : params.offset==0 ? 1:(params.offset/params.limit)+1,  //pageIndex
            rows: params.limit, //页码
            sort : params.sort,
            order : params.order,
            date: $("#codeType").val(),
            plateNo:$('#search_plateNo').val(),
            plateColor:$('#search_plateColor').val()
        };
        return temp;
    };
    
    oTableInit.queryParktRecordParams= function (params) {
        var temp = {  //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                page : params.offset==0 ? 1:(params.offset/params.limit)+1,  //pageIndex
                rows: params.limit, //页码
                sort : params.sort,
                order : params.order              
            };
            return temp;
    };
    
    return oTableInit;
};


$('#searchBtn').click(function(){
		
    selectRow = null;
    $('#data_list_table').bootstrapTable('refresh',{url:basePath+ '/action/owefeeRecord/dataList.do',query:{page:1}});
    $('#parkRecordHisDiv').css("display","none");
});

function exports() {
	if(selectRow != null){
		var plateno = encodeURIComponent(selectRow.plateNo);
		window.open(basePath + '/owefeeRecord/export.do?plateNo=' + plateno );
	}else{
		swal("提示","请请选择欠费车辆！");
	}
}

function exportsOwefee() {
	if($('#data_list_table').bootstrapTable("getData").length>0){
	    var param = $('#searchForm').serializeObject();
	    if(param.plateNo == undefined){
			param.plateNo = ""; 
		}
	    window.open(basePath + '/action/owefeeRecord/exportOwefee.do?plateNo=' + param.plateNo + '&plateColor=' + param.plateColor);
	}else{
		swal("提示", "当前查询条件下没有数据");
	}
}

function clearForm(form) {
	  $(':input', form).each(function() {
		  var type = this.type;
		  var tag = this.tagName.toLowerCase(); // normalize case
		  if (type == 'text' || type == 'password' || tag == 'textarea')
			  this.value = "";
		  else if (tag == 'select')
			  this.selectedIndex = 0;
	  });
}

$('#payFee').on('hide.bs.modal', function (obj) {
	if(obj.target.id=="payFee"){
		clearForm($("#payFeeForm"));
		jQuery(this).find("form").data('bootstrapValidator').resetForm(true);
		 $('#Fee').val('');
	}	
});

function toPayFee(unpaidFee,hisId) {
    $('#payFee').modal('show');
    $('#unpaidFee').val(unpaidFee);
    $('#hisId').val(hisId);
}

var $form;
var FormInit=function(){
    var oFormInit = new Object();
    //初始化Table
    oFormInit.Init = function () {
        $('#payFeeForm').bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                Fee: {
                    validators: {
                        greaterThan:{
            				value:0,
            				inclusive:false
                        },
            			notEmpty: {
            				message:"请填写补缴金额"
	                    }
                    }
                }
            }
        }).on('success.form.bv', function(e) {
            e.preventDefault();
            $form = $(e.target);
            var bv = $form.data('bootstrapValidator');
            if(parseInt($('#unpaidFee').val())<parseInt($('#Fee').val())){
            	swal("提示", "实缴金额大于应缴金额");
            }else{
            	$('#lockModal').modal('show');
            }

        });
    }
    return oFormInit;
}

//密码验证保存
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

//密码验证按钮点击事件
jQuery('#lockValidateBtn').click(function() {
	var data = jQuery('#lockForm').data('bootstrapValidator');
	if (data) {
	    // 修复记忆的组件不验证
        data.validate();
        if (!data.isValid()) {
            return false;
        }
    }

    $('#progressbar').modal('show');
    $("div[role='progressbar']").css({width: "0%"});
    $("div[role='progressbar']").animate({width: "100%"}, 300,function(){

        jQuery.ajax({
            url: basePath+'/config/comfirmPwd.do',
            type:'post',
            async:false,
            dataType:'json',
            data:jQuery('#lockForm').serialize(),
            success:function(res) {
                //var res = $.parseJSON(result);
                if (res.success) {
                    $.post(basePath+"/action/owefeeRecord/toPayFee.do", $form.serialize(), function(result) {
                        $('#progressbar').modal('hide');
                        if(result.success){
                            jQuery('#lockForm').data('bootstrapValidator').resetForm(true);
                            jQuery('#lockModal').modal('hide');
                            swal("成功",result.msg);
                            $("#payFeeForm").data('bootstrapValidator').resetForm(true);
                            $('#payFee').modal('hide');
                            $('#data_list_table').bootstrapTable("refresh");
                            $('#park_record_his').bootstrapTable("refresh");
                        }else{
                            swal("错误",result.msg,"error");
                        }
                    }, 'json');
                } else {
                    $('#progressbar').modal('hide');
                    swal("提示",res.msg);
                }
            }
        });

    });


}); 