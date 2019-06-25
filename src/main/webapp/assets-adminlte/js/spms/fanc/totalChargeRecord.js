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
$('#chargeTimeFrom').val( GetDateStr(0)+" 00:00:00" );
$('#chargeTimeTo').val( GetDateStr(1)+" 00:00:00" );


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
    getSomeInfo();

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
            url: basePath+'/action/totalChargeRecord/dataList.do',     //请求后台的URL（*）
            method: 'post',           //请求方式（*）
            toolbar: '#toolbar',        //工具按钮用哪个容器
            striped: true,           //是否显示行间隔色
            cache: false,            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            //showRefresh:true,
            //showToggle:true,
            //showColumns:true,
            pagination: true,          //是否显示分页（*）
            sortable: true,           //是否启用排序
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

            columns : [ [ 
//            {
//                field : 'id',
//                checkbox : false
//            }, 
            {
                field : 'chargeWay',
                title : '消费方式',
                align:'center',valign:'middle',
                sortable : true,
                formatter :  sys.dicts.text('PAY_TYPE')
            }, {
                field : 'chargeType',
                title : '消费类型',
                align:'center',valign:'middle',
                sortable : true,
                formatter : sys.dicts.text('OPERATE_TYPE')
            }, {
                field : 'userName',
                title : '消费用户',
                align:'center',valign:'middle',
                sortable : true
            }, {
                field : 'chargeAccount',
                title : '消费账号',
                align:'center',valign:'middle',
                sortable : true
            },   {
                field : 'chargeUser',
                title : '用户id',
                sortable : true,
                visible:false
            },{
                field : 'operateRecId',
                title : '详细记录id',
                sortable : true,
                visible:false
            }, {
                field : 'pakrRecId',
                title : '停车记录id',
                sortable : true,
                visible:false
            }, {
                field : 'chargeAmount',
                title : '消费金额',
                align:'center',valign:'middle',
                sortable : true,
                formatter : function(value){
                    return value/100;
                }
            } ,{
                field : 'cardBalance',
                title : '卡内余额',
                align:'center',valign:'middle',
                sortable : true,
                formatter : function(value){
                    return value/100.0;
                }
            }, {
                field : 'chargeTime',
                title : '消费时间',
                align:'center',valign:'middle',
                sortable : true
            },{
                field : 'createTime',
                title : '创建时间',
                align:'center',valign:'middle',
                sortable : true
            } ,{
                field : 'leaveTime',
                title : '驶离时间',
                align:'center',valign:'middle',
                sortable : true
            } ] ],
        
        
//		onLoadSuccess : function() {
//			var param = $('#searchForm').serializeObject();
//			$.ajax({	
//				url : "../totalChargeRecord/getSumFeeByChargeWay.do",
//				type : 'post',
//				dataType : 'json',
//				data :param,
//				success : function(result){
//					$("#data-list").datagrid("getPanel").panel("setTitle",'消费记录列表  &nbsp;&nbsp;&nbsp;(代缴卡总额：'+result.data.paymentFee/100.0
//							+'元；&nbsp;&nbsp;&nbsp; 车主卡总额：'+result.data.carOwnerCardFee/100.0
//							+'元；&nbsp;&nbsp;&nbsp; 车载标签总额：'+result.data.carTagFee/100.0
//						   +'元；&nbsp;&nbsp;&nbsp; 车主虚拟卡总额：'+result.data.virtualCardFee/100.0+'元');
//				}
//			});
//			
//		}

            /*
             onClickRow : function(rowIndex,rowData){

             if(rowData.chargeType!=14){
             $('#parkDg').datagrid({
             url : 'getParkRecord.do?id='+rowData.pakrRecId
             })
             $('#bodyLayout').layout('expand','south');
             }else{
             $('#parkDg').datagrid('loadData', { total: 0, rows: [] });
             $('#bodyLayout').layout('expand','south');
             }
             },


             onLoadSuccess : function() {
             var param = $('#searchForm').serializeObject();
             $.ajax({
             url : "../totalChargeRecord/getSumFeeByChargeWay.do",
             type : 'post',
             dataType : 'json',
             data :param,
             success : function(result){
             $("#data-list").datagrid("getPanel").panel("setTitle",'消费记录列表  &nbsp;&nbsp;&nbsp;(代缴卡总额：'+result.data.paymentFee/100.0
             +'元；&nbsp;&nbsp;&nbsp; 车主卡总额：'+result.data.carOwnerCardFee/100.0
             +'元；&nbsp;&nbsp;&nbsp; 车载标签总额：'+result.data.carTagFee/100.0
             +'元；&nbsp;&nbsp;&nbsp; 车主虚拟卡总额：'+result.data.virtualCardFee/100.0+'元');
             }
             });

             },
             */

            detailFormatter:function(index, row) {
                return '<div style="padding:2px"><table id="detailDiv'
                    + index + '" class="ddv"></table></div>';
            },
            onExpandRow : function(index, row, detail) {
                var ddv = detail.find('table.ddv');
                ddv.bootstrapTable({
                    url:basePath+'/action/totalChargeRecord/getParkRecord.do',     //请求后台的URL（*）
                    method: 'post',           //请求方式（*）
                    striped: true,           //是否显示行间隔色
                    cache: false,            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                    /*   showRefresh:true,
                     showToggle:true,
                     showColumns:true,*/
                    pagination: true,          //是否显示分页（*）
                    sortable: true,           //是否启用排序
                    //sortName:"bc.id",     //排序字段名称
                    sortOrder: "desc",          //排序方式
                    queryParamsType:'limit',
                    queryParams : {

                        id : row.pakrRecId
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
                    detailView: false,          //是否显示父子表
                    contentType: "application/x-www-form-urlencoded",
                    columns:[[
                        //{field:'id',checkbox:true},
                        {field:'parkName',title:'停车点名称',align:'center',valign:'middle',sortable:false},
                        {field:'parkMode',title:'停车点模型',align:'center',valign:'middle',sortable:false,formatter : sys.dicts.text('PARK_LOT_MODE')},
                        {field:'berthCode',title:'泊位编码',align:'center',valign:'middle',sortable:false},
                        {field:'plateNo',title:'车牌号',align:'center',valign:'middle',sortable:false},
                        {field:'feeState',title:'收费状态',align:'center',valign:'middle',sortable:false,formatter : sys.dicts.text('FEE_STATE')},
                        {field:'parkFee',title:'应收费用',align:'center',valign:'middle',sortable:false,formatter : function(value){
                            return value / 100;
                        }},
                        {field:'unpaidFee',title:'未付金额',align:'center',valign:'middle',sortable:false,formatter : function(value){
                            return value / 100;
                        }},
                        {field:'beyondFee',title:'超出金额',align:'center',valign:'middle',sortable:false,formatter : function(value){
                            return value / 100;
                        }},
                        {field:'stingDurations',title:'停车时长',align:'center',valign:'middle'},
                        {field:'arriveTime',title:'到达时间',align:'center',valign:'middle',sortable:false},
                        {field:'departureTime',title:'驶离时间',align:'center',valign:'middle',sortable:false},
                        {field:'isManual',title:'是否手动',align:'center',valign:'middle',sortable:false,formatter : sys.dicts.text('IS_MANUAL')},
                        {field:'photoNum',title:'拍照数',align:'center',valign:'middle',sortable:false},
                        {field:'plateColor',title:'车牌颜色',align:'center',valign:'middle',sortable:false,formatter : sys.dicts.text('PLATE_COLOR')}
                    ]]




                })
            }





        });
    };





    oTableInit.queryParams = function (params) {
        $.each(params,function(key,val){
            if($.isPlainObject(val) || $.isArray(val)){
                subObj(val);
            }else{
                console.log(key+'='+val);
            }
        });
        
        //查询条件消费金额临时变量，消费金额查询条件输入时单位是元，后台查询时换算成分查，乘以100  2016-06-01 jx
        var tempChargeAmount = "";
        if($("#chargeAmount").val() != ""){
        	tempChargeAmount = $("#chargeAmount").val()*100;
        }
        var temp = {  //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            page : params.offset==0 ? 1:(params.offset/params.limit)+1,  //pageIndex
            rows: params.limit, //页码
            sort : params.sort,
            order : params.order,
            date: $("#codeType").val(),
            regionId: $("#region_select0").val(),
            streetId: $("#street_select0").val(),
            parkId: $("#park_select0").val(),
            chargeWay: $("#chargeWay").val(),
            chargeType: $("#chargeType").val(),
            chargeTimeFrom: $("#chargeTimeFrom").val(),
            chargeTimeTo: $("#chargeTimeTo").val(),
            chargeAccount: $("#chargeAccount").val(),
            userName: $("#userName").val(),
            chargeAmount: tempChargeAmount,
            leaveTimeFrom: $("#leaveTimeFrom").val(),
            leaveTimeTo: $("#leaveTimeTo").val(),
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
            $('#data_list_table').bootstrapTable('refresh',{url:basePath+ '/action/totalChargeRecord/dataList.do',query:{page:1}});
            getSomeInfo();
        });
    }
    return oButtonInit;
};

function getSomeInfo(){
	 $.ajax({
         url:basePath+ '/action/totalChargeRecord/getSumFeeByChargeWay.do',
         data:$('#searchForm').serialize(),
         type : 'post',
         dataType : 'json',
         success:function(result){
         	$('#paymentFee').text(result.data.paymentFee/100.0 + '元');
         	$('#carOwnerCardFee').text(result.data.carOwnerCardFee/100.0+ '元');
         	$('#carTagFee').text(result.data.carTagFee/100.0+ '元');
         	$('#virtualCardFee').text(result.data.virtualCardFee/100.0+ '元');
         }
     });
}





function exports(){
    
    if($('#data_list_table').bootstrapTable("getData").length>0){
    	var param = $('#searchForm').serializeObject();
	    if(param.parkId == undefined){
			param.parkId = ""; 
		}
	    if(param.streetId== undefined){
	    	param.streetId ="";
	    }
	    window.open(basePath + '/action/totalChargeRecord/export.do?chargeWay='+param.chargeWay+
	            "&chargeType="+param.chargeType+"&chargeAccount="+param.chargeAccount+
	            "&userName="+param.userName+"&chargeTimeFrom="+param.chargeTimeFrom+
	            "&chargeTimeTo="+param.chargeTimeTo+
	            "&leaveTimeFrom="+param.leaveTimeFrom+
	            "&leaveTimeTo="+param.leaveTimeTo+
	            "&regionId="+param.regionId+
	            "&streetId="+param.streetId+"&parkId="+param.parkId);
	}else{
		swal("提示", "当前查询条件下没有数据");
	}
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


