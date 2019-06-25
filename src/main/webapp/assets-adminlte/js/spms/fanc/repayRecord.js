var date = new Date();

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
$('#createTimeFrom').val( GetDateStr(0)+" 00:00:00" );
$('#createTimeTo').val( GetDateStr(1)+" 00:00:00" );


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
            /* minView: "month",*/
            language: 'zh-CN', //汉化
            timepicker:true,    //关闭时间选项
            todayBtn: 1,
            icon:'fa-arrow-right',
            autoclose:true //选择日期后自动关闭
        });
    });
    
    function resetFF(){
    	$('#streetId').attr('disabled','disabled');
    	$('#parkId').attr('disabled','disabled');
    }
    
var TableInit = function () {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#data_list_table').bootstrapTable({
            url: basePath+'/action/repayRecord/dataList.do',     //请求后台的URL（*）
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

            columns : [ [ {
                field : 'id',
                title : '序号',
                sortable : true,
                visible:false
            }, {
                field : 'userAccount',
                title : '用户账号',align:'center',valign:'middle',
                sortable : true
            }, {
                field : 'operatorType',
                title : '操作人类型',align:'center',valign:'middle',
                sortable : true,
                formatter : sys.dicts.text('OPERATOR_TYPE')
            }, {
                field : 'oweFee',
                title : '欠费金额',align:'center',valign:'middle',
                sortable : true,
                formatter : function(value) {
                    return value / 100.00;
                }
            }, {
                field : 'repayFee',
                title : '补缴金额',align:'center',valign:'middle',
                sortable : true,
                formatter : function(value) {
                    return value / 100.00;
                }
            }, {
                field : 'paymentId',
                title : '支付方式id',align:'center',valign:'middle',
                sortable : true,
                visible:false
            }, {
                field : 'discount',
                title : '折扣比例',align:'center',valign:'middle',
                sortable : true
            }, {
                field : 'discountFee',
                title : '折扣后金额',align:'center',valign:'middle',
                sortable : true
            }, {
                field : 'payAccount',
                title : '支付账号',align:'center',valign:'middle',
                sortable : true
            }, {
                field : 'createTime',
                title : '补缴时间',align:'center',valign:'middle',
                sortable : true
            } ] ],

            detailFormatter:function(index, row) {
                return '<div style="padding:2px"><table id="detailDiv' + index + '" class="ddv"></table></div>';
            },

            onExpandRow : function(index, row, detail) {
                var ddv = detail.find('table.ddv');
                ddv.bootstrapTable({
                    url:basePath+'/action/repayRecord/queryRecordDetail.do',     //请求后台的URL（*）
                    method: 'post',           //请求方式（*）
                    striped: true,           //是否显示行间隔色
                    cache: false,            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                      /* showRefresh:true,*/
                     //showToggle:true,
                     //showColumns:true,
                    pagination: true,          //是否显示分页（*）
                    sortable: true,           //是否启用排序
                    //sortName:"bc.id",     //排序字段名称
                    sortOrder: "desc",          //排序方式
                    queryParamsType:'limit',
                    queryParams : {
                        repayId : row.id
                    },//传递参数（*）
                    sidePagination: "server",      //分页方式：client客户端分页，server服务端分页（*）
                    pageNumber:1,            //初始化加载第一页，默认第一页
                    pageSize: 10,            //每页的记录行数（*）
                    pageList: [10, 25, 50, 100],    //可供选择的每页的行数（*）
                    strictSearch: true,
                    clickToSelect: true,        //是否启用点击选中行
//		 	        height: 460,            //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
                    uniqueId: "id",           //每一行的唯一标识，一般为主键列
                    cardView: false,          //是否显示详细视图
                    contentType: "application/x-www-form-urlencoded",
                    columns : [ [ {
                        field : 'id',
                        title : 'id',
                        visible:false
                    }, {
                        field : 'operateId',
                        title : '操作ID',align:'center',valign:'middle',
                        visible:false
                    }, {
                        field : 'parkName',
                        title : '停车点名称',align:'center',valign:'middle',
                    }, {
                        field : 'repayId',
                        title : '补缴记录ID',align:'center',valign:'middle',
                        visible:false
                    }, {
                        field : 'parkRecordId',
                        title : '停车记录ID',align:'center',valign:'middle',
                        visible:true
                    }, {
                        field : 'repayFee',
                        title : '补缴金额',align:'center',valign:'middle',
                        formatter : function(value) {
                            return value / 100.00;
                        }
                    }, {
                        field : 'collectorId',
                        title : '收费员ID',align:'center',valign:'middle',
                        visible:false
                    }, {
                        field : 'parkFee',
                        title : '停车应收费用',align:'center',valign:'middle',
                        formatter : function(value) {
                            return value / 100.00;
                        }

                    }, {
                        field : 'paymentId',
                        title : '支付方式id',align:'center',valign:'middle',
                        visible:false
                    }, {
                        field : 'discount',
                        title : '折扣比例',align:'center',valign:'middle',
                    }, {
                        field : 'discountFee',
                        title : '折扣后金额',align:'center',valign:'middle',
                        formatter : function(value) {
                            return value / 100.00;
                        }
                    }, {
                        field : 'payAccount',
                        title : '支付账号',align:'center',valign:'middle',
                    }, {
                        field : 'userAccount',
                        title : '用户账号',align:'center',valign:'middle',
                        visible:false
                    }, {
                        field : 'createTime',
                        title : '创建时间',align:'center',valign:'middle',

//                    }, {
//                        field : 'oweFee',
//                        title : '欠费金额',align:'center',valign:'middle',
//                        formatter : function(value) {
//                            return value / 100.00;
//                        }
                    }, {
                        field : 'payName',
                        title : '支付方式',align:'center',valign:'middle',
                        visible:true
                    } ] ],
                    onDblClickRow: function (row,index){
		            		$.ajax({
		            			url :'getRepayRecordByHisId.do',
		            			type : 'post',
		            			dataType : 'json',
		            			data: {id:row.parkRecordId},
		            			success : function(result){
		            				$('#parkName').val(result.rows[0].parkName);
		            				$('#parkMode').val(result.rows[0].parkMode);
		            				$('#berthCode1').val(result.rows[0].berthCode);
		            				$('#plateNo1').val(result.rows[0].plateNo);
		            				$('#feeState').val(result.rows[0].feeState);
		            				$('#parkFee').val(result.rows[0].parkFee/100.00);
		            				$('#unpaidFee').val(result.rows[0].unpaidFee/100.00);
		            				$('#beyondFee1').val(result.rows[0].beyondFee);
		            				$('#stingDurations').val(result.rows[0].stingDurations);
		            				$('#arriveTime').val(result.rows[0].arriveTime);
		            				$('#departureTime').val(result.rows[0].departureTime);
		            				$('#isManual').val(result.rows[0].isManual);
		            				$('#photoNum').val(result.rows[0].photoNum);
		            				$('#plateColor').val(result.rows[0].plateColor);
		            				$('#parkMode').attr("disabled","disabled");
		            				$('#feeState').attr("disabled","disabled");
		            				$('#isManual').attr("disabled","disabled");
		            				$('#plateColor').attr("disabled","disabled");
		            				$('#parkRecord').modal("show");
		            			},
		            			error : function(data) {
		            				swal("错误",data.responseText,"error");
		            			}
		            		});
      	             },

                })
            }
        });
    };





    oTableInit.queryParams = function (params) {

        var temp = {  //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            page : params.offset==0 ? 1:(params.offset/params.limit)+1,  //pageIndex
            rows: params.limit, //页码
            sort : params.sort,
            order : params.order,
            operatorType: $("#operatorType").val(),
            createTimeFrom: $("#createTimeFrom").val(),
            createTimeTo: $("#createTimeTo").val(),
            regionId: $("#region_select0").val(),
            streetId: $("#street_select0").val(),
            parkId: $("#park_select0").val(),
            berthCode: $("#berthCode").val(),
            plateNo: $("#plateNo").val(),
// 	        tradetype:$('input:radio[name="tradetype"]:checked').val(),
// 	        success:$('input:radio[name="success"]:checked').val(),
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
            $('#data_list_table').bootstrapTable('refresh',{url:basePath+ '/action/repayRecord/dataList.do',query:{page:1}});
        });
    }
    return oButtonInit;
};



function exports() {
	if($('#data_list_table').bootstrapTable("getData").length>0){
	    var param = $('#searchForm').serializeObject();
	    param.berthCode = $('#berthCode').val();
	    param.regionId = $('#region_select0').val();
	    param.streetId = $('#street_select0').val();
	    param.parkId = $('#park_select0').val();
	    window.open(basePath + '/action/repayRecord/export.do?createTimeFrom='
				+ param.createTimeFrom + '&createTimeTo=' + param.createTimeTo
				+ '&berthCode=' + param.berthCode + '&plateNo=' + param.plateNo
				+ '&operatorType=' + param.operatorType+"&regionId="+param.regionId+
	    		"&streetId="+param.streetId+"&parkId="+param.parkId);
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
