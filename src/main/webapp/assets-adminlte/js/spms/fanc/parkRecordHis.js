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
$('#timeFrom').val( GetDateStr(0)+" 00:00:00" );
$('#timeTo').val( GetDateStr(1)+" 00:00:00" );

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
    	format: 'yyyy-mm-dd hh:ii:00',
    	language: 'zh-CN', //汉化 
    	todayBtn: 1,
    	icon:'fa-arrow-right',
    	todayHighlight : true, // 今天高亮
    	pickerPosition:'bottom-left', // 选择框左边显示
	   	autoclose:true //选择日期后自动关闭 
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
            pageSize: 10,            //每页的记录行数（*）
            pageList: [10, 25, 50, 100],    //可供选择的每页的行数（*）
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
                {field:'parkMode',title:'停车点模型',align:'center',valign:'middle',sortable:true,formatter : sys.dicts.text('PARK_LOT_MODE')},
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
                {field:'isManual',title:'是否手动',align:'center',valign:'middle',sortable:true,formatter : sys.dicts.text('IS_MANUAL'),visible:true},
                {field:'photoNum',title:'拍照数',align:'center',valign:'middle',sortable:true},
                {field:'plateColor',title:'车牌颜色',align:'center',valign:'middle',sortable:true,formatter : sys.dicts.text('PLATE_COLOR'),visible:true}
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
								}else{
									$('#operateType').val(row.operateType);
									$('#operator').val(row.operator);
									$('#operatorType').val(row.operatorType);
									$('#beforeState').val(row.beforeState);
									$('#afterState').val(row.afterState);
									$('#parkDeal').modal("show");
								}
			             },
			             
//			             
//			             onDblClickRow:function(rowIndex,rowData){
//				            	console.log(rowData.parkRecordId);
//				            	if(rowData.operateType == 05){
//				            		$('#photo').dialog('open');
//					            		$.ajax({
//					            			url : basePath+'/photoRecord/findPhotoById.do?operateDetailId='+rowData.id,
//					            			type : 'post',
//					            			dataType : 'json',
//					            			success : function(result){
//					            				console.log(result.photoPath);
//					            				console.log("是否有效"+result.isValid);
//					            				if(result.isValid == 0){
//					            					$('#photoimg').attr('src',result.photoPath);
//					            					$('#photoimg').attr('hidden',false);
//					            					$('#yesOrNo').attr('hidden',true);
//					            				}else{
//					            					$('#photoimg').attr('hidden',true);
//					            					$('#yesOrNo').attr('hidden',false);
//					            				}
//			            						
//					            			}
//					            		});
//								}else{
//									$('#detail').dialog('open');
//					            	$('#detailForm').form('load',rowData);
//								}
//				            }
//			             
			             
			             
			             
			             
                        

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
            date : $("#codeType").val(),
            plateNo : $('#plateNo').val(),
            berthCode : $('#berthCode').val(),
            regionId : $("#region_select0").val(),
            streetId : $('#street_select0').val(),
            parkId : $('#park_select0').val(),
            parkMode : $('#parkMode').val(),
            plateColor : $('#plateColor').val(),
            feeState : $('#feeState').val(),
            isManual : $('#isManual').val(),
            timeFrom : $('#timeFrom').val(),
            timeTo : $('#timeTo').val(),
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
            //1.初始化Table
            var oTable = new TableInit();
            oTable.Init();
            $('#data_list_table').bootstrapTable('refresh',{url:basePath+ '/action/parkRecordHis/dataList.do',query:{page:1}});
        });
    }
    return oButtonInit;
};

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


function complainForm(){
    $('#complain').modal("show");
}


function complain() {
   var param = getParam();
    $.ajax({
        url: basePath + "/complaintAcceptance/insert.do",
        type: "post",
        data: param,
        success: function (data) {
         /*   /!*data=eval('('+data+')');*!/*/

            if (data.success) {
                $('#complain').modal("hide");
                swal("成功",data.msg);
            } else {
                swal("错误",data.msg,"error");
            }
        }

    })
}


function getParam(){

    var row=$('#data_list_table').bootstrapTable('getData')[rowIndex];
    var rowNow=$('table.ddv').bootstrapTable('getData')[rowIndexs];
    var param=$('#complainForm').serializeObject();
    param.returnAmount = parseInt(param.returnAmount * 100);
    param.berthId=row.berthId
    param.plateNo=row.plateNo;
    param.parkId=row.parkId;
    param.plateNo=row.plateNo;
    param.operateId=rowNow.id;
    param.plateColor=row.plateColor;
    param.parkRecordId=rowNow.parkRecordId;
    param.operateType=rowNow.operateType;
    return param;
}

