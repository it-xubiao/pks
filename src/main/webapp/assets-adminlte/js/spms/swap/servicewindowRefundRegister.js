var rowIndex;
var rowIndexs;
var parkRecordIdNow;
var editFormParkRecordId = null; //退费修改编辑框用
var isneedRefundFee = true;


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
$('#timeFrom').val( GetDateStr(0)+" 00:00:00" );
$('#timeTo').val( GetDateStr(1)+" 00:00:00" );

var date = new Date();
$(function () {

	getServicewindowRefundParam();//初始化退费修改框
	$('#timeFrom').val('');//初始日期为空
	$('#timeTo').val('');//初始日期为空
	
	if(editFormParkRecordId != null){
		$("#searInfoDiv").hide();
		isneedRefundFee = false;
		//1.初始化Table
        var oTable = new TableInit();
        oTable.Init();
        editFormParkRecordId = null;//初始化搜索框后，parkRecordId
        
	}else{
		$('#refundRegisterDiv').hide();
	}
	
	//2.初始化Button的点击事件
	var oButtonInit = new ButtonInit();
	oButtonInit.Init();

//    //时间框初始化
//	$('.form_datetime').datetimepicker({
//	    format: 'yyyy-mm-dd',
//	    minView: "month",
//		language: 'zh-CN', //汉化 
//		todayBtn: 1,
//		icon:'fa-arrow-right',
//	   	autoclose:true //选择日期后自动关闭 
//	});
	
    //时间框初始化
    $('.data_datatime').datetimepicker({
    	format: 'yyyy-mm-dd hh:ii:00',
    	language: 'zh-CN', //汉化 
    	todayBtn: 1,
    	icon:'fa-arrow-right',
    	todayHighlight : true, // 今天高亮
    	pickerPosition:'bottom-left', // 选择框左边显示
	   	autoclose:true //选择日期后自动关闭 
    });
    
    $('.data_day').datetimepicker({
    	format: 'yyyy-mm-dd',
     	language: 'zh-CN', //汉化 
     	todayBtn: 1,
     	minView: "month",
     	icon:'fa-arrow-right',
 	   	autoclose:true //选择日期后自动关闭 
    });
    
    $('#feeState').val("07");

    $('#refundTime').change(function(){
    	var bootstrapValidator = $('#refundRegisterForm').data('bootstrapValidator'); 
    	if(bootstrapValidator){
    		bootstrapValidator.revalidateField($("#refundTime")); 
    	}
    	
    });
    
});

function resetFF(){
	$('#street_select0').attr('disabled','disabled');
	$('#park_select0').attr('disabled','disabled');
}

var TableInit = function () {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#data_list_table').bootstrapTable({
            url: basePath+'/action/parkRecordHis/dataList.do',     //请求后台的URL（*）
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
            queryParams: oTableInit.queryParams,//传递参数（*）
            sidePagination: "server",      //分页方式：client客户端分页，server服务端分页（*）
            pageNumber:1,            //初始化加载第一页，默认第一页
            pageSize: 5,            //每页的记录行数（*）
            pageList: [5],    //可供选择的每页的行数（*）
            strictSearch: true,
            clickToSelect: true,        //是否启用点击选中行
// 	        height: 460,            //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "id",           //每一行的唯一标识，一般为主键列
            cardView: false,          //是否显示详细视图
            detailView: true,          //是否显示父子表
            contentType: "application/x-www-form-urlencoded",
            //showExport: true,                     //是否显示导出
            exportDataType: "all",              //basic', 'all', 'selected'.

            columns:[[
                {field:'id',title: '序号',visible:false},
                {field:'parkName',title:'停车点名称',align:'center',valign:'middle',sortable:true},
                {field:'berthCode',title:'泊位编码',align:'center',valign:'middle',sortable:true},
                {field:'plateNo',title:'车牌号',align:'center',valign:'middle',sortable:true},
                {field:'feeState',title:'收费状态',align:'center',valign:'middle',sortable:true,formatter : sys.dicts.text('FEE_STATE')},
                {field:'parkFee',title:'应收费用',align:'center',valign:'middle',sortable:true,formatter : function(value){
                    return value / 100;
                }},
                {field:'unpaidFee',title:'未付金额',align:'center',valign:'middle',sortable:true,formatter : function(value){
                    return value / 100;
                }},
                {field:'beyondFee',title:'超出金额',align:'center',valign:'middle',sortable:true,formatter : function(value){
                    return value / 100;
                }},
                {field:'stingDurations',title:'停车时长',align:'center',valign:'middle'},
                {field:'arriveTime',title:'到达时间',align:'center',valign:'middle',sortable:true},
                {field:'departureTime',title:'驶离时间',align:'center',valign:'middle',sortable:true},
                {field:'photoNum',title:'拍照数',align:'center',valign:'middle',sortable:true},
                {field:'plateColor',title:'车牌颜色',align:'center',valign:'middle',sortable:true,formatter : sys.dicts.text('PLATE_COLOR'),visible:true},
                {
                    field : 'operate', title : '操作', align : 'center', valign : 'middle',
                    formatter : function(value, row, index) {
                    	if(isneedRefundFee){
                    		if(row.feeState=='06' || row.feeState== '07'|| row.feeState== '08'){
                    			//退费
                    			var ufee = 0;
                    			if(row.unpaidFee){
                    				ufee = row.unpaidFee;
                    			}
                    			var s = '<a href="javascript:void(0);" onclick="refundRegisterForm('+row.id+','+row.parkFee+','+ufee+',this)"><span style="color:red"  class="tuifei">退费</span></a>  ';
                    			return s;
                    		}
                    	}else{
                    		return '';
                    	}
                    }
                }
            ]],
            detailFormatter:function(index, row) {
                return '<div style="padding:2px;width: 77.5%;"><table id="detailDiv'
                    + index + '" class="ddv"></table></div>';
            },


            onExpandRow : function(index, row, detail) {
                rowIndex=index;
                var ddv = detail.find('table.ddv');
                ddv.bootstrapTable({
                    url:basePath+'/action/parkRecordHis/queryOperateDetail.do?parkRecordId='+row.id, //请求后台的URL（*）
                    method : 'get', //请求方式（*）
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
                    queryParams : oTableInit.queryOperateDetailParams,
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
                            sortable : false
                            ,formatter:sys.dicts.text('OPERATE_TYPE')
                        },
                        {
                            field : 'operator',
                            title : '操作人',
                            align : 'center',
                            valign : 'middle',
                            sortable : false
                        },
                        {
                            field : 'operatorType',
                            title : '操作人类型',
                            align : 'center',
                            valign : 'middle',
                            sortable : false
                            ,formatter:sys.dicts.text('OPERATOR_TYPE')
                        },
                        {
                            field : 'beforeState',
                            title : '操作前状态',
                            align : 'center',
                            valign : 'middle',
                            sortable : false
                            ,formatter:sys.dicts.text('FEE_STATE')
                        },
                        {
                            field : 'afterState',
                            title : '操作后状态',
                            align : 'center',
                            valign : 'middle',
                            sortable : false
                            ,formatter:sys.dicts.text('FEE_STATE')
                        },
                        {
                            field : 'operateTime',
                            title : '操作时间',
                            align : 'center',
                            valign : 'middle',
                            sortable : false
                        },
                        {
                            field : 'operateDesc',
                            title : '描述',
                            width : 100,
                            align : 'center',
                            valign : 'middle',
                            sortable : false
                        },
                        {
                            field : 'operate',
                            title : '操作',
                            align : 'center',
                            valign : 'middle',
                            formatter : function(value, row, index) {
                                //判断操作类型  
                            	//投诉功能没有，先把投诉按钮注释掉 2016-06-12 jx
//                                if (row.operateType == '16') {
//                                    var s = '<a href="#" onclick="complainForm(this)"><span style="color:red">投诉</span></a>  ';
//                                    rowIndexs = index;
//                                    return s;
//                                }
                            }
                        } ],
                        
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
					            					$('#photo').modal('show');
					            					$('#photoimg').attr('hidden',true);
					            					$('#yesOrNo').attr('hidden',false);
					            				}
					            			}
					            		});
			            		 
								}
				            	//退费修改窗
//				            	else if(row.operateType == 10){
//									//查询操作员姓名和id
//								    $.ajax({
//								        url:basePath+'/action/servicewindowRefund/queryOperatorByParkRecordId.do', //请求后台的URL（*）
//								        type:"post",
//								        data:{parkRecordId:row.parkRecordId},
//								        success: function(result) {
//								            var data=result.data;
//								            $('#collectId').val(data.operatorId),
//								            $('#operator').val(data.operator)
//								        },
//									    error: function(result){
//									    	swal("错误",result.errorMsg,"error");
//									    }
//								    });
//								    
//								    $('#refundTime').val(row.refundTime),
//								    $('#refundFee').val(row.refundFee),
//								    $('#carOwner').val(row.carOwner),
//								    $('#telphone').val(row.telphone),
//								    $('#explain').val(row.explain),
//									
//								    $('#refundRegister').modal("show");
//								}
				            	
				            	else{
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
    };
	oTableInit.queryOperateDetailParams = function (params) {
        var temp = {  //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            page : params.offset==0 ? 1:(params.offset/params.limit)+1,  //pageIndex
            rows: params.limit
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
            page : params.offset == 0 ? 1
                : (params.offset / params.limit) + 1, //pageIndex
            rows : params.limit, //页码
            sort : params.sort,
            order : params.order,
            id : $("#parkRecordId").val(),
            date : $("#codeType").val(),
            plateNo : $('#plateNo').val(),
            berthCode : $('#berthCode').val(),
            regionId : $("#region_select0").val(),
            streetId : $('#street_select0').val(),
            parkId : $('#park_select0').val(),
            parkMode : $('#parkMode').val(),
            plateColor : $('#plateColor').val(),
            //feeState : '07',
            isManual : $('#isManual').val(),
            timeFrom : $('#timeFrom').val(),
            timeTo : $('#timeTo').val(),
        };
        return temp;
    };
    $('#feeState').val("07");
    return oTableInit;
};



var ButtonInit = function() {
    var oButtonInit = new Object();
    //初始化Table
    oButtonInit.Init = function() {
        $('#searchBtn').click(function() {
        	

        	//1.初始化Table
            var oTable = new TableInit();
            oTable.Init();
            $('#data_list_table').bootstrapTable('refresh',{url:basePath+ '/action/parkRecordHis/dataList.do',query:{page:1}});
        });
    }
    return oButtonInit;
};

//获取退费记录页面传来的参数
function getServicewindowRefundParam(){
	var query = location.search.substring(1);
	var values= query.split("&"); 
	for(var i = 0; i < values.length; i++) {
		var pos = values[i].indexOf('='); 
		if (pos == -1) continue; 
		var paramname = values[i].substring(0,pos);
		var value = values[i].substring(pos+1);
		if(paramname == 'parkRecordId'){
			$('#parkRecordId').val(value);
			editFormParkRecordId = value;
		}
		if(paramname == 'servicewindowRefundId'){
			$('#id').val(value);
			//根据退费记录id查询退费记录，初始化赋值退费修改框
			$.ajax({
		        url:basePath+'/action/servicewindowRefund/queryServicewindowRefundByParkRecordId.do', //请求后台的URL（*）
		        type:"post",
		        data:{id:value},
		        success: function(result) {
		            var data=result.data;
		            $('#collectId').val(data.collectId);
		            $('#parkRecord_Id').val(data.parkRecordId);
		            $('#operator1').val(data.collectName);
		            $('#refundFee').val(data.refundFee/100);
		            $('#telphone').val(data.telphone);
		            $('#refundTime').val(data.refundTime);
		            $('#carOwner').val(data.carOwner);
		            $('#explain').val(data.explain);
		            $('#operateDetailId').val(data.operateDetailId);
		            $('#refundTime').attr('disabled',true);
		            $('#carOwner').attr('disabled',true);
		            $('#telphone').attr('disabled',true);
		           // $('#explain').attr('disabled',true);
		        },
			    error: function(result){
			    	swal("错误",result.errorMsg,"error");
			    }
		    });
			
//			$.ajax({
//		        url:basePath+'/action/servicewindowRefund/queryOperatorByParkRecordId.do', //请求后台的URL（*）
//		        type:"post",
//		        data:{parkRecordId:editFormParkRecordId},
//		        success: function(result) {
//		            var data=result.data;
//		            $('#collectId1').val(data.operatorId);
//		            $('#operator').val(data.operator);
//		        },
//			    error: function(result){
//			    	swal("错误",result.errorMsg,"error");
//			    }
//		    });
//			
			
			
		}
	}
}

function exports() {
	if($('#data_list_table').bootstrapTable("getData").length>0){
	    var param = $('#searchForm').serializeObject();
	    if(param.parkId == undefined){
			param.parkId = ""; 
		}
	    window.open(basePath + '/action/parkRecordHis/export.do?parkId=' + param.parkId
	        + '&plateNo=' + param.plateNo + '&feeState=' + param.feeState + '&timeFrom=' + param.timeFrom
	        + '&timeTo=' + param.timeTo + '&isManual=' + param.isManual + '&berthCode=' + param.berthCode
	        + '&parkMode=' + param.parkMode);
	}else{
		swal("提示", "当前查询条件下没有数据");
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


function refundRegisterForm(id,parkFee,unpaidFee,obj){
    $(".tuifei").css("color","red");
	obj.children[0].style.color="#8B8B7A";
	//clearForm();
	var parkRecordId = id;
	parkRecordIdNow = id;
	//查询操作员姓名和id
    $.ajax({
        url:basePath+'/action/servicewindowRefund/queryOperatorByParkRecordId.do', //请求后台的URL（*）
        type:"post",
        data:{parkRecordId:parkRecordId},
        success: function(result) {
            var data=result.data;
            $('#collectId').val(data.operatorId);
            $('#operator1').val(data.operator);
        },
	    error: function(result){
	    	swal("错误",result.errorMsg,"error");
	    }
    });
    $('#parkRecord_Id').val(parkRecordId);
    $('#parkFee').val(parkFee);
    $('#unpaidFee').val(unpaidFee);
    $('#refundRegisterDiv').show();
    
    
}


function refundRegister() {
	$('#refundRegisterForm').bootstrapValidator({
		message : 'This value is not valid',
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			refundFee : {
				validators : {
					notEmpty : {
						message : "请输入退款金额！"
					},
//					regexp: {regexp: /^\d*(\.(5|0))?$/,message: '必须为0.5的倍数'}
					regexp: {regexp: /^\d+(\.\d{1,2})?$/,message: "请输入数字或不能超过两位小数"}
				}
			},
			
			
			carOwner : {
				validators : {
					notEmpty : {
						message : "请输入车主姓名！"
					},
					regexp: {
                        regexp: /^\S{1,20}$/,
                        message: '车主姓名过长'
                    }
				}
			},
			refundTime : {
				validators : {
					notEmpty : {
						message : "请输入退款日期！"
					}
				}
			},
			telphone : {
				validators : {
					notEmpty : {
						message : "请输入联系电话！"
					},
					regexp: {
                        regexp: /^\d{1,20}$/,
                        message: '手机号格式错误'
                    }
				}
			},
			explain : {
				validators : {
					regexp: {
						regexp: /^\S{1,500}$/,
                        message: '备注过长'
                    }
				}
			},
		}
	}).on('success.form.bv', function(e) {
		var $form = $(e.target);
     	var bv = $form.data('bootstrapValidator');
		var parkFee = $('#parkFee').val();
		var unpaidFee = $('#unpaidFee').val();
		if(!parkFee){
			parkFee = $('#data_list_table').bootstrapTable("getData")[0].parkFee;
		}
		if(!unpaidFee){
			unpaidFee = $('#data_list_table').bootstrapTable("getData")[0].unpaidFee;
		}
		var refundFee = ($('#refundFee').val()!=""?$('#refundFee').val()*100:"").toFixed(0);
		if (refundFee > ( parkFee - unpaidFee)) {
			swal("提示", "退款金额大于实收金额!");
			return false;
		}
		var param = getParam();
		$.ajax({
			url : basePath + "/action/servicewindowRefund/save.do",
			type : "post",
			data : param,
			success : function(data) {
				if (data.success) {
					$('#refundRegisterDiv').hide();
					window.close();
					swal("成功", data.msg);
				} else {
					swal("错误", data.msg, "error");
				}
			}

		})
		clearForm();
		return false;
	});
}

function clearForm(){
	$('#operator1').val("");
	$('#refundFee').val("");
	$('#telphone').val("");
	$('#refundTime').val("");
	$('#carOwner').val("");
	$('#explain').val("");
	$(this).find("form").data('bootstrapValidator').resetForm(true);
}



function getParam(){
    var param=$('#refundRegisterForm').serializeObject();
    //param.parkRecordId = parkRecordIdNow;
    param.refundFee = (param.refundFee * 100).toFixed(0); //退费金额转化为分
    return param;
}
