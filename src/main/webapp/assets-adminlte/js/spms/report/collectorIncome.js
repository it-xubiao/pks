$(function () {
    //初始化时间
	setInit();
    //1.初始化Table
    var oTable = new TableInit();
    oTable.Init();

    //2.初始化Button的点击事件
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();
});

function setInit(){
	var longTime = (new Date().getTime()) - (60*60*1000);
    var rsTime = new Date(longTime);
    $("#startDate").val(rsTime.getUTCFullYear() + "-"  + ((rsTime.getMonth()+1) < 10 ? "0" : "")+ (rsTime.getMonth()+1) + "-01");
    $("#endDate").val(rsTime.getUTCFullYear() + "-"  + ((rsTime.getMonth()+1) < 10 ? "0" : "")+ (rsTime.getMonth()+1) + "-" +((rsTime.getDate()) < 10 ? "0" : "")+ (rsTime.getDate()-1));
    
}

var TableInit = function () {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#data_list_table').bootstrapTable({
            url: basePath + '/action/collectorIncome/searchForm.do',     //请求后台的URL（*）
            method: 'post',           //请求方式（*）
            toolbar: '#toolbar',        //工具按钮用哪个容器
            striped: true,           //是否显示行间隔色
            cache: false,            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            showRefresh:false,
            showFooter:true,
            showToggle:false,
            showColumns:false,
            pagination: true,          //是否显示分页（*）
            sortable: true,           //是否启用排序
            sortName:"id",     //排序字段名称
            sortOrder: "desc",          //排序方式
            queryParamsType:'limit',
            queryParams: oTableInit.queryParams,//传递参数（*）
            sidePagination: "client",      //分页方式：client客户端分页，server服务端分页（*）
            pageNumber:1,            //初始化加载第一页，默认第一页
            pageSize: 10,            //每页的记录行数（*）
            pageList: [10, 25, 50, 100],    //可供选择的每页的行数（*）
            strictSearch: true,
            clickToSelect: true,        //是否启用点击选中
            uniqueId: "id",           //每一行的唯一标识，一般为主键列
            cardView: false,          //是否显示详细视图
            contentType: "application/x-www-form-urlencoded",
            columns: [
                /*{field: 'checkbox',  checkbox: true,  align: 'center', valign: 'middle' },*/
                /* {field: 'id', title: '序号', },*/
                {field: 'statDate', title: '日期', align:'center', valign:'middle', sortable:true, formatter:function(value){
                    /*var date = new Date(value);
                    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();*/
                    var sDate = $("#startDate").val();
                    var eDate = $("#endDate").val();
                    if(sDate == '' && eDate == ''){
                        return '有数据至今';
                    }else{
                        return sDate + '至' + eDate;
                    }
                },footerFormatter: function(){
                    return '合计';
                }},
                {field: 'collectorName', title: '姓名', align:'center', valign:'middle', sortable:true,footerFormatter: totalFormatter
                    /*, formatter:function(value){
                        var collectorName = getCollectorName(value);
                       return getCollectorName(value).text;
                        // return collectorName(value);
                    }*/
                },
                {field: 'account',title: '账号', align:'center',valign:'middle',sortable:true,footerFormatter: totalFormatter},
                {field: 'paidAmount',title: '实收金额', align:'center',valign:'middle',sortable:true,formatter : function(value){
                    return value / 100;
                },footerFormatter: sumFormatter},
                {field: 'paymentPayable',title: '代缴卡', align:'center',valign:'middle',sortable:true,formatter : function(value){
                    return value / 100;
                },footerFormatter: sumFormatter},
                {field: 'customerCard',title: '车主卡', align:'center',valign:'middle',formatter : function(value){
                    return value / 100;
                },footerFormatter: sumFormatter},
                {field: 'virtualCard',title: '虚拟卡', align:'center',valign:'middle' ,formatter : function(value){
                    return value / 100;
                },footerFormatter: sumFormatter},
                {field: 'cartag',title: '车载标签', align:'center',valign:'middle',sortable:true,formatter : function(value){
                    return value / 100;
                },footerFormatter: sumFormatter},
                {field: 'scanPay',title: '扫码支付', align:'center',valign:'middle',sortable:true,formatter : function(value){
                    return value / 100;
                },footerFormatter: sumFormatter},
                {field: 'alipay',title: '支付宝扫码付', align:'center',valign:'middle',sortable:true,formatter : function(value){
                    return value / 100;
                },footerFormatter: sumFormatter,visible:false},
                {field: 'wechat',title: '微信扫码付', align:'center',valign:'middle',sortable:true,formatter : function(value){
                    return value / 100;
                },footerFormatter: sumFormatter,visible:false},
                {field: 'unionpay',title: '银联卡', align:'center',valign:'middle',sortable:true,formatter : function(value){
                    return value / 100;
                },footerFormatter: sumFormatter},
                /*{field: 'paymentPayable',title: '应收金额（元）', align:'center',valign:'middle',sortable:true,formatter : function(value){
                    return value / 100;
                }},*/
                {field: 'app',title: 'APP', align:'center',valign:'middle',sortable:true,formatter : function(value){
                    return value / 100;
                },footerFormatter: sumFormatter},
                {field: 'refund',title: '当日退款', align:'center',valign:'middle',sortable:true,formatter : function(value){
                    return value / 100;
                },footerFormatter: sumFormatter},
                {field: 'appAlipay',title: 'APP支付宝', align:'center',valign:'middle',sortable:true,formatter : function(value){
                    return value / 100;
                },visible:false,footerFormatter: sumFormatter},
                {field: 'appWechat',title: 'APP微信', align:'center',valign:'middle',sortable:true,formatter : function(value){
                    return value / 100;
                },visible:false,footerFormatter: sumFormatter}
                /*{field: 'appRefund',title: 'APP订单退款', align:'center',valign:'middle',sortable:true,formatter : function(value){
                    return value / 100;
                }},
                {field: 'cashRefund',title: '现金退款', align:'center',valign:'middle',sortable:true,formatter : function(value){
                    return value / 100;
                }},*/
                /*{field: 'createTime',title: '创建时间', align:'center',valign:'middle',sortable:true},
                {field: 'updateTime',title: '更新时间', align:'center',valign:'middle',sortable:true},
                {field: 'describe',title: '描述', align:'center',valign:'middle',sortable:true}*/

            ]
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
        var temp = {  //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            page : params.offset==0 ? 1:(params.offset/params.limit)+1,  //pageIndex
            rows: params.limit, //页码
            sort : params.sort,
            order : params.order,
            startDate: $("#startDate").val(),
            endDate:$("#endDate").val(),
            collectorId:$("#collectorId").val(),
        };
        return temp;
    };
    return oTableInit;
};

var ButtonInit=function(){
    var oButtonInit = new Object();
    //初始化Table
    oButtonInit.Init = function () {
        $('#searchBtn').click(function(){
            if(($('#collectorId')).val()==null||($('#collectorId')).val()==''){
                $('#data_list_table').bootstrapTable('hideColumn', 'stringStatDate');
                $('#data_list_table').bootstrapTable('refresh',{url:basePath + '/action/collectorIncome/searchForm.do',query:{page:1}});
            }else{
                $('#data_list_table').bootstrapTable('showColumn', 'stringStatDate');
                $('#data_list_table').bootstrapTable('refresh',{url:basePath + '/action/collectorIncome/searchForm.do',query:{page:1}});

            }
        });
    };
    return oButtonInit;
};
//验证
jQuery(function() {
    $('.form_datetime').datetimepicker({
        format: 'yyyy-mm-dd',
        language: 'zh-CN', //汉化
        todayBtn: 1,
        minView: "month",
        icon:'fa-arrow-right',
        autoclose:true //选择日期后自动关闭
    });
});

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
//function exports() {
//    if ($('#data_list_table').bootstrapTable("getData").length > 0) {
//        var param = $('#searchForm').serializeObject();
//        window.open(basePath + '/action/collectorIncome/export.do?startDate='
//            + param.startDate + '&endDate=' + param.endDate
//            + '&collectorId=' + param.collectorId);
//    } else {
//        swal("", "当前查询条件下没有数据", "warning");
//    }
//}

function exports() {
    if ($('#data_list_table').bootstrapTable("getData").length > 0) {
    	var columns = $('#data_list_table').bootstrapTable('getOptions').columns;
		column = columns[0];
		var name = '';
		var title = '';
		for (var i = 0; i < column.length - 1; i++) {
			if (column[i].visible == true) {
				name += column[i].title + ",";
			}
		}

		title = name.replace("%", "").replace("%", "").replace("%", "")
				.replace("%", "");
        var param = $('#searchForm').serializeObject();
        window.open(basePath + '/action/collectorIncome/export.do?startDate='
            + param.startDate + '&endDate=' + param.endDate
            + '&collectorId=' + param.collectorId +'&title=' + title);
    } else {
        swal("", "当前查询条件下没有数据", "warning");
    }
}


/*function exports(){
 $('<table>').append(
 $("#data_list_table").DataTable().$('tr').clone()
 )
 .table2excel({
 exclude: ".excludeThisClass",
 name: "Worksheet Name",
 filename: "SomeFile"
 });
 $("#data_list_table").dataTable();
 }*/
function getCollectorName(value){
    var result = new Object();
    $.ajax(
        {
            url : basePath + '/collector/getCollectorById.do',
            type : 'post',
            async : false,
            dataType : 'json',
            data : {
                'collector_id': value
            },
        traditional : true,
        success: function  (data) {
            if(!data.success){
                result = data[0];
                //return data[0];
            }else{
                result.text = 'bucunzai';
                //return result;
            }

        },
        error: function  (XMLHttpRequest, textStatus, errorThrown) {
            alert('error');
        }
    });
   return result;
}

function sumFormatter(data){
    var field =  this.field;
    var result =data.reduce(function(sum, row) {
        return sum + (+row[field]);
    }, 0);
    if(result != 0){
        return result/100;
    }else{
        return '0';
    }
}
function totalFormatter(data){
    return '＼';
}