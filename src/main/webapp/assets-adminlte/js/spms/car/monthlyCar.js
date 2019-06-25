var myPath =basePath+'/action/monthlyCar';
$(function () {
    //1.初始化Table
    var oTable = new TableInit();
    oTable.Init();

    //2.初始化表单的验证
    var oFormInit = new FormInit();
    oFormInit.Init();

    //3.初始化Button的点击事件
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();

    //时间框初始化
   $('.form_datetime').datetimepicker({
        format: 'yyyy-mm-dd hh:mm:ss',
       /* minView: "month",*/
        language: 'zh-CN', //汉化
        timepicker:true,    //关闭时间选项
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
            url:myPath+'/dataList.do',     //请求后台的URL（*）
            method: 'post',           //请求方式（*）
            toolbar: '#toolbar',        //工具按钮用哪个容器
            striped: true,           //是否显示行间隔色
            cache: false,            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
//            showRefresh:true,
//            showToggle:true,
//            showColumns:true,
            pagination: true,          //是否显示分页（*）
            sortable: true,           //是否启用排序
            sortName:"id",     //排序字段名称
            sortOrder: "desc",          //排序方式
            queryParamsType:'limit',
            queryParams: oTableInit.querySearchParams,
            sidePagination: "server",      //分页方式：client客户端分页，server服务端分页（*）
            pageNumber:1,            //初始化加载第一页，默认第一页
            pageSize: 10,            //每页的记录行数（*）
            pageList: [10, 25, 50, 100],    //可供选择的每页的行数（*）
            strictSearch: true,
            clickToSelect: true,        //是否启用点击选中行
// 	        height: 460,            //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "id",           //每一行的唯一标识，一般为主键列
            detailView: true,          //是否显示父子表
            contentType: "application/x-www-form-urlencoded",
            columns: [
                {
                    field: 'checkbox',
                    checkbox: true,
                    align: 'center',
                    valign: 'middle'
                },
                {field: 'id',title: '序号',hidden:true,visible:false},
                {field: 'customerName',title: '车主姓名',align:'center',valign:'middle'},
                {field: 'cardNo',title: '包月卡号', align:'center',valign:'middle',sortable:true},
                {field: 'phone',title: '联系号码', align:'center',valign:'middle',sortable:true},
                {field: 'plateNo',title: '车牌号', align:'center',valign:'middle',sortable:true},
                {field: 'plateColor',title: '车牌颜色', align:'center',valign:'middle',sortable:true,formatter : sys.dicts.text('PLATE_COLOR')},
            ],

            //包月
            detailFormatter:function(index, row) {
                /* var html = [];
                 $.each(row, function (key, value) {
                 html.push('<p><b>' + key + ':</b> ' + value + '</p>');
                 });
                 return html.join('');*/
                return '<div style="padding:2px"><table id="detailDiv'
                    + index + '"  class="ddv"></table></div>';
            },
            onExpandRow : function(index, row, detail) {
                var ddv = detail.find('table.ddv');
                ddv.bootstrapTable({
                    url:myPath +'/queryMonthlyDetail.do?monthlyId='+row.id,     //请求后台的URL（*）
                    method: 'post',           //请求方式（*）
                    striped: true,           //是否显示行间隔色
                    cache: false,            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                    pagination: true,          //是否显示分页（*）
                    sortable: true,           //是否启用排序
                    sortName:"bc.id",     //排序字段名称
                    sortOrder: "desc",          //排序方式
                    queryParamsType:'limit',
                    queryParams : oTableInit.querySearchInfoParams,//传递参数（*）
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
                    checkboxHeader: false,
                    columns: [
						{
						    field: 'checkbox',
						    checkbox: true,
						    align: 'center',
						    valign: 'middle'
						},
                        {field: 'id',title: '序号',
                            align: 'center',
                            valign: 'middle',
                            visible:false},
                        {field: 'amount',title: '包月金额',width:100,align:'center',valign:'middle',sortable:true},
                        {field: 'startDate',title: '开始时间', align:'center',valign:'middle',sortable:true},
                        {field: 'endDate',title: '结束时间', align:'center',valign:'middle',sortable:true},
                        {field: 'parkName',title: '包月停车点', align:'center',valign:'middle',sortable:true}
                    ]

                })
            }
        });

        
        //$("#data_list_table").parent().css("height","412px");


        $('#historyTable').bootstrapTable({
            url:myPath+ '/queryHistoryRecords.do',     //请求后台的URL（*）
            method: 'post',           //请求方式（*）
            striped: true,           //是否显示行间隔色
            cache: false,            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
//            showRefresh:true,
//            showToggle:true,
//            showColumns:true,
            pagination: true,          //是否显示分页（*）
            sortable: true,           //是否启用排序
            sortName:"id",     //排序字段名称
            sortOrder: "desc",          //排序方式
            queryParamsType:'limit',
            queryParams: oTableInit.queryHistoryParams,//传递参数（*）
            sidePagination: "server",      //分页方式：client客户端分页，server服务端分页（*）
            pageNumber:1,            //初始化加载第一页，默认第一页
            pageSize: 10,            //每页的记录行数（*）
            pageList: [10, 25, 50, 100],    //可供选择的每页的行数（*）
            strictSearch: true,
            clickToSelect: true,        //是否启用点击选中行
// 	        height: 460,            //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "id",           //每一行的唯一标识，一般为主键列
            //height: 300,
            width:300,
            contentType: "application/x-www-form-urlencoded",

            columns: [
                {field: 'id',title: '序号',hidden:true,visible:false},
                {field: 'plateNo',title: '车牌号', align:'center',valign:'middle',sortable:true},
                {field: 'plateColor',title: '车牌颜色', align:'center',valign:'middle',sortable:true,formatter : sys.dicts.text('PLATE_COLOR')},
                {field: 'cardNo',title: '包月卡号', align:'center',valign:'middle',sortable:true},
                {field: 'isValid',title: '是否有效', align:'center',valign:'middle',sortable:true,	formatter : sys.dicts.text('IS_VALID')},
                {field: 'startDate',title: '开始时间', align:'center',valign:'middle',sortable:true,	formatter : formatDate},
                {field: 'endDate',title: '结束时间', align:'center',valign:'middle',sortable:true,	formatter :formatDate},
                {field: 'parkName',title: '停车点', align:'center',valign:'middle',sortable:true,visible:false	},
                {field: 'detailId',title: '包月详细ID', align:'center',valign:'middle',sortable:true,visible:false	}
            ]
        });

        $('#countTable').bootstrapTable({
            url:myPath+ '/queryHistoryCounts.do',     //请求后台的URL（*）
            method: 'post',           //请求方式（*）
            striped: true,           //是否显示行间隔色
            cache: false,            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
//            showRefresh:true,
//            showToggle:true,
//            showColumns:true,
            pagination: true,          //是否显示分页（*）
            sortable: true,           //是否启用排序
            sortName:"id",     //排序字段名称
            sortOrder: "desc",          //排序方式
            queryParamsType:'limit',
            queryParams: oTableInit.queryCountParams,//传递参数（*）
            sidePagination: "server",      //分页方式：client客户端分页，server服务端分页（*）
            pageNumber:1,            //初始化加载第一页，默认第一页
            pageSize: 10,            //每页的记录行数（*）
            pageList: [10, 25, 50, 100],    //可供选择的每页的行数（*）
            strictSearch: true,
            clickToSelect: true,        //是否启用点击选中行
	        //height: 200,            //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "id",           //每一行的唯一标识，一般为主键列
            contentType: "application/x-www-form-urlencoded",

            columns: [
                {field: 'id',title: '序号',hidden:true,visible:false},
                {field: 'plateNo',title: '车牌号', align:'center',valign:'middle',sortable:true},
                {field: 'plateColor',title: '车牌颜色', align:'center',valign:'middle',sortable:true,formatter : sys.dicts.text('PLATE_COLOR')},
                {field: 'amount',title: '包月金额', align:'center',valign:'middle',sortable:true},
                {field: 'parkName',title: '停车点', align:'center',valign:'middle',sortable:true,visible:true	},
            ],
             onLoadSuccess:function(){
            	 queryHistoryDetail();
             }

        });
    };

    oTableInit.querySearchParams = function (params) {
        var temp = {  //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            page : params.offset==0 ? 1:(params.offset/params.limit)+1,  //pageIndex
            rows: params.limit, //页码
            sort : params.sort,
            order : params.order,
            plateNo:$('#search_plateNo').val(),
            cardNo:$('#search_cardNo').val(),

        };

        return temp;
    };
    oTableInit.querySearchInfoParams = function (params) {
        var temp = {  //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            page : params.offset==0 ? 1:(params.offset/params.limit)+1,  //pageIndex
            rows: params.limit, //页码
            sort : params.sort,
            order : params.order,
        };

        return temp;
    };
    oTableInit.queryHistoryParams = function (params) {
        var temp = {  //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            page : params.offset==0 ? 1:(params.offset/params.limit)+1,  //pageIndex
            rows: params.limit, //页码
            sort : params.sort,
            order : params.order,
            date: $("#codeType").val(),
            plateNo:$('#history_plateNo').val(),
            cardNo:$('#history_cardNo').val(),
        };

        return temp;
    };
    oTableInit.queryCountParams = function (params) {
        var temp = {  //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            page : params.offset==0 ? 1:(params.offset/params.limit)+1,  //pageIndex
            rows: params.limit, //页码
            sort : params.sort,
            order : params.order,
            plateNo:$('#count_plateNo').val(),
            parkId:$('#parkId').val(),
            TimeFromD: $('#count_startDate').val(),
            TimeToD:$('#count_endDate').val(),
        };

        return temp;
    };
    return oTableInit;
};


var ButtonInit=function(){
    var oButtonInit = new Object();
    //初始化Table
    oButtonInit.Init = function () {

        $('#delete').click(function(){
            var ids=[] ;
            var names=[];
            var rows=$('#data_list_table').bootstrapTable('getAllSelections');
            if(rows.length==0){
                swal("提示","请选中一条包月记录！");
                return;
            }else{
            	$.ajax({
           		    url:myPath +'/queryMonthlyDetail.do',
                    type:"post",
                    data:{"monthlyId":rows[0].id},
                    dataType:'json',
                    traditional:true,
                    success : function(data) {
                   	     if(data.total==0){
                   	    	for(var i=0;i<rows.length;i++){
                                ids.push(rows[i].id)
                                names.push(rows[i].plateNo);
                            }
                            swal({
                                    title: "删除提醒",
                                    text: "你确定要删除车牌分别为："+names+"的数据吗？",
                                    type: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#DD6B55",
                                    confirmButtonText: "确定",
                                    cancelButtonText: "取消",
                                    closeOnConfirm: true,
                                    closeOnCancel: true
                            },
                            function(isConfirm){
                                if (isConfirm) {
                                    $.ajax({
                                        url:myPath+'/delete.do',
                                        type:"post",
                                        data:{"id":ids},
                                        traditional:true,
                                        success: function(result) {
                                            if(result.success){
                                                swal("成功", result.msg);
                                                if(rows.length != $('#data_list_table').bootstrapTable("getData").length){
                                                    $('#data_list_table').bootstrapTable("refresh");    
                                                }else{
                                                    $('#data_list_table').bootstrapTable('refresh',{url:myPath+ '/dataList.do',query:{page:1}});
                                                }
                                            }else{
                                                swal("失败", "删除失败");
                                            }
                                        },
                                	    error: function(result){
                                	    	swal("错误",result.errorMsg,"error");
                                	    }
                                    });
                                }
                            });
                   		 }else {
                   			swal("提示","该车主下存在包月车辆，无法删除！");
                   		 }
                   	 }
            	})
                
            }
        })
        $('#modify').click(function(){
            var rows=$('#data_list_table').bootstrapTable('getAllSelections');
            if(rows==null||rows.length>1 || rows.length<=0){
                swal("提示","请选择一条记录");
                return ;
            }
            $.ajax({
                url:myPath+'/getId.do',
                type:"post",
                data:{id:rows[0].id},
                success: function(result) {
                    /* $('#editForm').form('reset')*/
                    var data=result.data;
                    $('#plateNo').val(data.plateNo),
                    $('#id').val(data.id),
                    $('#plateColor').val(data.plateColor),
                    $('#phone').val(data.phone),
                    $('#cardNo').val(data.cardNo),
                    $('#customerName').val(data.customerName),
                    $('#edit').modal('show');
                },
        	    error: function(result){
        	    	swal("错误",result.errorMsg,"error");
        	    }
            });
        });


        $('#searchBtn').click(function(){
        	$('#data_list_table').bootstrapTable('refresh',{url:myPath+ '/dataList.do',query:{page:1}});
        });
        $('#historyBtn').click(function(){
            $('#historyTable').bootstrapTable('refresh',{url:myPath+ '/queryHistoryRecords.do',query:{page:1}});
        });
        $('#countBtn').click(function(){
        	$('#countTable').bootstrapTable('refresh',{url:myPath+ '/queryHistoryCounts.do',query:{page:1}});
            //$('#countTable').bootstrapTable("refresh");
        	queryHistoryDetail();
        });

        $('#edit').on('hide.bs.modal', function () {
            document.getElementById('editForm').reset();
            $(this).find("form").data('bootstrapValidator').resetForm(true);
        });
    }

    return oButtonInit;
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

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');

            // Use Ajax to submit form data
            $.post(myPath+"/save.do", $form.serialize(), function(result) {
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
	            amount:{
	            	validators: {
	            		notEmpty: {
	            			message:"请输入包月资格"
	            		},
	            		regexp: {
                            regexp: /^[0-9]*[1-9][0-9]*$/,
                            message: '包月金额必须为正整数'
                        }
	            	}
	           }            	
//            	name: {validators: {notEmpty: {message:"请输入姓名"},stringLength: {
//	                min: 1,max: 10,message:"输入内容长度必须介于1到10之间."
//	            }}},
//            	gender: {validators: {notEmpty: {message:"请选择性别"},}},
//            	identityCode: {validators: {notEmpty: {message:"请输入身份证号码"},}},
//            	drivingCode: {validators: {notEmpty: {message:"请输入驾照"},}},
//            	phone: {validators: {notEmpty: {message:"请输入电话号码"},stringLength: {
//                    max: 11, message:"手机号码的长度不能超过11位."
//                },
//        		phone: {
//        			country: 'CN',message:"请输入有效的手机号码."	
//        		}}},
//            	address: {validators: {notEmpty: {message:"请输入地址"},}},
//            	isVirtualCard: {validators: {notEmpty: {message:"请选择是否生成虚拟卡"}}},
            }
        })
    }
    return oFormInit;
}


function chooseDate() {
    $('#monthCount').val('');
    $('#endDate').val('');
}

function chooseMonth() {
    var num = $('#monthCount').val();
    if (num == '') {
        $('#endDate').val('');
        return;
    }
    num = parseInt(num);
    var flag = $('#startDate').val();
    var endDate = '';
    if (flag == '1') {
        endDate = getEndDate(num - 1);
        $('#endDate').val(endDate);
    } else if (flag == '0') {
        endDate = getEndDate(num);
        $('#endDate').val(endDate);
    }
}

function getEndDate(num) {
    var nowDate = new Date();
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth();
    month += num;
    if (month > 11) {
        month -= 12;
        year += 1;
    }
    var day = getMonthDays(year, month);
    if ((month + 1) >= 10) {
        return year + '-' + (month + 1) + '-' + day;
    } else {
        return year + '-0' + (month + 1) + '-' + day;
    }
}


/* 获取当前月份的天数 */
function getMonthDays(nowYear, myMonth) {
    var monthStartDate = new Date(nowYear, myMonth, 1);
    var monthEndDate = new Date(nowYear, myMonth + 1, 1);
    var days = (monthEndDate.getTime() - monthStartDate.getTime())
        / (1000 * 60 * 60 * 24);
    return days;
}




function openMonthlyDetail(){
    var rows=$('#data_list_table').bootstrapTable('getAllSelections');
    if(rows==null||rows.length>1 || rows.length<=0){
        swal("提示","请选择一条记录开通包月资格");
        return ;
    }
    var row=rows[0]
    /*$(this).find("form").data('bootstrapValidator').resetForm(true);*/
    $('#startDate').val(1);
    $('#monthlyId').val(row.id);
    $('#detailTitle').html(row.plateNo);
    $('#monthlyDetail').modal("show").on('hide.bs.modal', function () {
        $(this).find("form").data('bootstrapValidator').resetForm(true);
    });
}


function addFormPara(nodes) {
    $.each(nodes,function(i, note) {
        var id = note.attributes.id;
        var type = note.attributes.type;
        if (type == 1) {
            var $id = $("<input type='hidden' name='parkId' class='c_menus'>");
            $('#monthlyForm').append($id);
        }
    });
}



function addMonthlyDetail(){
	
	    var startDate = $('#startDate').val();
	    if(startDate==''){
	        swal("提示",'请输入开始时间！');
	        return;
	
	    }
	    var endDate = $('#endDate').val();
	    if(endDate==''){
	        swal("提示",'请选择包月时长！');
	        return;

	    }
	    var amount = $('#amount').val();
	    if(amount==''){
	        swal("提示",'请输入包月金额！');
	        return;
	    }else{
	    	var type = /^[0-9]*[1-9][0-9]*$/;
            var re = new RegExp(type);
            if (amount.match(re) == null) {
            	swal("提示",'包月金额必须为正整数！');
    	        return;
            }
	    }
	    var nodes = $('#menu_tree').tree('getChecked');
		if (nodes == "") {
			swal("提示",'请选择包月地点！');
			return;
		}
	
    var rows = $('#data_list_table').bootstrapTable('getAllSelections');
    var row = rows[0];
    var nodes = $('#menu_tree').tree('getChecked');
    addFormPara(nodes);
    var id = $("#monthlyId").val();
    var parkIds = [];
    var parkNames = '';
    $.each(nodes, function(i, note) {
        var id = note.attributes.id;
        var type = note.attributes.type;
        if (type == 1) {
            parkIds.push(id);
            parkNames += note.text + ',';
        }
    });
    $('#parkIds').val(parkIds);
    $('#endDateConfirm').val( $('#endDate').val());
    $('#plateNoConfirm').val(row.plateNo);
    $('#amountConfirm').val($('#amount').val());
    $('#countConfirm').val($("#monthCount").val() + '个月');
    $('#cardNoConfirm').val(row.cardNo);
    $('#parkNameConfirm').val(parkNames);
    $('#confirmInfo').modal('show');
}

function saveMonthlyDetail(){
$.ajax({
        url : myPath+'/saveMonthlydetailAndsavePark.do',
        type : 'post',
        data:    $("#detailForm").serialize(),
        success : function(result) {
            if (result.success) {
               /* busi.monthly.clearTreeData();*/
            	clearTreeData();
                $('#monthlyDetail').modal('hide');
                $('#confirmInfo').modal('hide');
                $('#data_list_table').bootstrapTable('refresh');
                swal("成功",result.msg);
            }else{
                swal("失败",result.msg);
            }
        },
	    error: function(result){
	    	swal("错误",result.errorMsg,"error");
	    }
    });
}

//包月信息统计导出
function exports(){
	var param = $("#countForm").serializeObject();
	window.open(myPath + '/exports.do?plateNo=' + param.plateNo +'&parkId=' + param.parkId + '&TimeFromD=' + param.TimeFromD+ '&TimeToD=' + param.TimeToD);
}

function cancleMonthly(){
    var plateNo;
    var parkName;
    var datalistIndex = -1;
    var table = $('table[id^=detailDiv]');
    var idLength="detailDiv".length;
    var selectNum = 0;
    //当前的记录
    var tableNow=-1;
    var id;
    //
    for(var i=0;i<table.length;i++){
        id = '#' + table[i].id;
        var row=$(id).bootstrapTable('getSelections');
        if(row.length>1){
        	swal("提示","请选择一条记录！");
            return;
        }else if(row.length==1){
            selectNum+=row.length
            tableNow=i;
        }
    }
    if(selectNum!=1){
        swal("提示","请选择一条记录！");
        return;
    }else{
        id='#' +table[tableNow].id;
        var rows=$(id).bootstrapTable('getSelections');
        var row = rows[0];
        datalistIndex = id.substr(idLength+1)
        $('#data_list_table').bootstrapTable('uncheckAll');
        var index = $('#data_list_table').bootstrapTable('getData');
        plateNo=index[datalistIndex].plateNo;
        parkName=row.parkName;
        swal({
                title: "删除提醒",
                text: "确认取消车辆："+plateNo+",\n在停车点：{"+parkName+"}的包月资格吗？",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                closeOnConfirm: true,
                closeOnCancel: true
            },
            function(isConfirm){
                if (isConfirm) {
                    $.ajax({
                        url:myPath+'/cancleMonthly.do',
                        type:"post",
                        data:{"id":row.id},
                        traditional:true,
                        success: function(result) {
                            if(result.success){
                                swal("成功", result.msg);
                                $('#data_list_table').bootstrapTable("refresh");

                            }else{
                                swal("失败", result.msg);
                            }
                        },
                	    error: function(result){
                	    	swal("错误",result.errorMsg,"error");
                	    }
                    });
                }
            });}





} ;

function continueMonthly() {

    var datalistIndex = -1;
    var table = $('table[id^=detailDiv]');
    var idLength="detailDiv".length;
    var selectNum = 0;
    //当前的记录
    var tableNow=-1;
    var id;

    for(var i=0;i<table.length;i++){
        id = '#' + table[i].id;
        var row=$(id).bootstrapTable('getSelections');
        if(row.length>1){
        	swal("提示","请选择一条记录！");
            return;
        }else if(row.length==1){
            selectNum+=row.length
            tableNow=i;
        }
    }
    if(selectNum!=1){
        swal("提示","请选择一条记录！");
        return;
    }else{
        id='#' +table[tableNow].id;
        var rows=$(id).bootstrapTable('getSelections');
        var row = rows[0];
        datalistIndex = id.substr(idLength+1)
        $('#data_list_table').bootstrapTable('uncheckAll');
        var index = $('#data_list_table').bootstrapTable('getData')[datalistIndex];

        //设置续费信息

        $('#monthlyCarId').val(index.id);
        $('#monthlyDetailId').val(row.id);
        $('#continue_plateNo').val(index.plateNo);
        $('#continue_cardNo').val(index.cardNo);
        $('#continue_plateColor').val(index.plateColor);
        $('#parkName').val(row.parkName);
        $('#oldEndDate').val(row.endDate);
        $('#continue-win').modal("show").on('hide.bs.modal', function () {
            $("#continueForm").form("reset");
        });

    }
};

function continueBtn(){

    var id = $('#monthlyCarId').val();
    var count = $('#continueCount').val();
    var amount = $('#continue_amont').val();
    var detailId = $('#monthlyDetailId').val();
    if(amount==''){
        swal("提示",'请输入包月金额！');
        return;
    }else{
    	var type = /^[0-9]*[1-9][0-9]*$/;
        var re = new RegExp(type);
        if (amount.match(re) == null) {
        	swal("提示",'包月金额必须为正整数！');
	        return;
        }
    }
    if(count==''){
        swal("提示",'请选择续费时长！')
        return;
    }

    $.ajax({
        url :myPath+'/continueMonthly.do',
        type : 'post',
        async: false,
        data : {
            id : id,
            count : count,
            amount : amount,
            detailId : detailId
        },
        success : function(result) {
            if (result.success) {
            	swal("成功", result.msg)
                $('#continue-win').modal('hide');
                $('#data_list_table').bootstrapTable('refresh');
            }else{
            	 swal("失败", result.msg)
            }
        },
	    error: function(result){
	    	swal("错误",result.errorMsg,"error");
	    }
    });

};

//清空停车点树数据
function clearTreeData() {
	$(".tree-checkbox1").removeClass("tree-checkbox1").addClass("tree-checkbox0");
	$(".tree-checkbox2").removeClass("tree-checkbox2").addClass("tree-checkbox0");
}

/**包月统计和历史包月弹出框高度调整*/
function openModal(id){
	$("#"+id).find(".fixed-table-body").height(230);
	$("#"+id).modal("show");
	if(id=="queryHistoryCounts"){
		$('#countForm').form('reset')
		$("#count_startDate").val(GetDateStr(-1)+" 00:00:00");
		$("#count_endDate").val((new Date()).format("yyyy-MM-dd hh:mm:ss"));
		$("#countBtn").click();
	}
}

function queryHistoryDetail(){
	$.ajax({
		url:myPath+ '/queryHistoryDetail.do',
		data:$('#countForm').serialize(),
		type : 'post',
		dataType : 'json',
		success:function(data){
			$('#total').html(data.length);
			var amount=0;
			for(var i=0;i<data.length;i++){
				amount+=data[i].amount
			}
			$('#allMoney').html(amount);
		}
	});
}
