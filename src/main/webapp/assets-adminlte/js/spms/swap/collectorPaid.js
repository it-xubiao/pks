var date = new Date();
var day = date.getDate()==1?"02":((date.getDate()+1)<10?("0"+(date.getDate()+1)):(date.getDate()+1));
var nowDay = date.getDate()<10?("0"+(date.getDate())):(date.getDate());
if(date.getMonth()+1<10){
	$('#createTimeFrom').val(date.getFullYear()+"-"+("0"+(date.getMonth()+1))+"-01");
	$('#createTimeTo').val(date.getFullYear()+"-"+("0"+(date.getMonth()+1))+"-"+day);
	$('#payTime').val(date.getFullYear()+"-"+("0"+(date.getMonth()+1))+"-"+nowDay);
}else{
	$('#createTimeFrom').val(date.getFullYear()+"-"+(date.getMonth()+1)+"-01");
	$('#createTimeTo').val(date.getFullYear()+"-"+(date.getMonth()+1)+"-"+day);
	$('#payTime').val(date.getFullYear()+"-"+(date.getMonth()+1)+"-"+nowDay);
}
$(function(){
	var oTable = new TableInit();
    oTable.Init();
    var oFormInit = new FormInit();
    oFormInit.Init();
    $.ajax({
		url : basePath + '/action/collectorPaid/getCollectorMsg.do',
		type : "post",
		data : {
			name : $('#collectorName').val()
		},
		success : function(result) {
			var html = '<select class="bs-select" data-live-search="true" data-size="8" id="collectorName" name="collectorName">';
			html+='<option value="">&nbsp;</option>';
			var html2 = '<select class="bs-select" data-live-search="true" data-size="8" id="collectorAccount" name="collectorAccount">';
			html2+='<option value="">&nbsp;</option>';
			$.each(result, function(i, item) {
				if(result[i].collectorName){
					html+="<option value='"+result[i].collectorName+"'>"+result[i].collectorName+"</option>";
				}
				if(result[i].collectorAccount){
					html2+="<option value='"+result[i].collectorAccount+"'>"+result[i].collectorAccount+"</option>";
				}
	        });
			html+="</select>";
			html2+="</select>";
			$('#nameLabel').after(html);
			$('#accountLabel').after(html2);
			$('#collectorName').on('change',function(){				
				putMsg(result);
			});
			$('#collectorAccount').on('change',function(){				
				putMsg_account(result);
			});
			$('#collectorName').selectpicker();
			$('#collectorAccount').selectpicker();
			
			$('.dropdown-menu').css("max_width","220px");
		}
	});
   
});

$('.form_datetime').datetimepicker({
    format: 'yyyy-mm-dd',
    minView: "month",
	language: 'zh-CN', //汉化 
	todayBtn: 1,
	icon:'fa-arrow-right',
   	autoclose:true //选择日期后自动关闭 
});

var TableInit = function () {
    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
      $('#data_list_table').bootstrapTable({
        url: basePath+'/action/collectorPaid/dataList.do',     //请求后台的URL（*）
        method: 'post',           //请求方式（*）
        contentType: "application/x-www-form-urlencoded",
        toolbar: '#toolbar',        //工具按钮用哪个容器
        striped: true,           //是否显示行间隔色
        cache: false,            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        showRefresh:false,    
        showToggle:false,
        showColumns:false,
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
// 	        height: 460,            //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "id",           //每一行的唯一标识，一般为主键列
        cardView: false,          //是否显示详细视图
        detailView: false,          //是否显示父子表  
        columns: [ 
                {field: 'id',title:'ID',visible:false},
				{field: 'createTime', title: '日期',align:'center',valign:'middle',sortable:true},
				{field: 'collectorName',title: '姓名',align:'center',valign:'middle',sortable:true},
				{field: 'collectorAccount',title: '账号',align:'center',valign:'middle',sortable:true},
				{field: 'payable',title: '应缴金额', align:'center',valign:'middle',sortable:true,
					formatter:function (value,row,index){
						return value/100.0;
					}
				},
				{field: 'paid',title: '实缴金额', align:'center',valign:'middle',sortable:true,
					formatter:function (value,row,index){
						return value/100.0;
					}
				},
				{field: 'captainSign',title: '中队长签字',valign:'middle',align:'center',sortable:true,
					formatter:function (value,row,index){
						if(value==0){return "<span style='font-weight: bold'>否</span>";}return "<span style='color:green'>是</span>";
					}
				},
				{field: 'collectorSign',title: '收费员签字',align:'center',valign:'middle',sortable:true,
					formatter:function (value,row,index){
						if(value==0){return "<span style='font-weight: bold'>否</span>";}return "<span style='color:green'>是</span>";
					}
				},
				{field: 'remark',title: '备注',valign:'middle',align:'center'}
             ],
      });
    };
    
   oTableInit.queryParams = function (params) {
	      var temp = {  //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
	  	        page : params.offset==0 ? 1:(params.offset/params.limit)+1,  //pageIndex
	  	        rows: params.limit, //页码
	  	        sort : params.sort, 
	  	        order : params.order,
			  	createTimeFrom: $("#createTimeFrom").val(),
			  	createTimeTo: $("#createTimeTo").val(),
			  	collectorId: $("#collectorIdSearch").val()
	  	      };
	  	      return temp;
	  };
    return oTableInit;
  };
  
  //搜索事件
  function searchSubmit(){
 	   $('#data_list_table').bootstrapTable('refresh',{query:{page:1}});
  }
// $('#handOver').click(function(){
//	 
// })
var FormInit=function(){
 var oFormInit = new Object();
 //初始化Table
 oFormInit.Init = function () {
  $('#addForm').bootstrapValidator({
      message: 'This value is not valid',
      feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',
          invalid: 'glyphicon glyphicon-remove',
          validating: 'glyphicon glyphicon-refresh'
      },
      fields: {
		  collectorName : {
        	  validators: {
                notEmpty: {message:"请输入姓名！"}
              }
          },
          collectorAccount : {
        	  validators: {
                notEmpty: {message:"请输入账号！"}
              }
          },
    	  payable : {
        	  validators: {
                notEmpty: {message:"请输入应缴金额！"}
              }
          },
          paid : {
        	  validators: {
                notEmpty: {message:"请输入实缴金额！"},
                greaterThan: {value:1, message: '实缴金额必须大于1'},
                lessThan: {value:99999, message: '实缴金额必须小于99999'},
                regexp: {regexp: /^\d+(\.\d{1,2})?$/,message: "请输入数字或不能超过两位小数"} 
              }
          },
//          payTime : {
//        	  validators: {
//                notEmpty: {message:"请输入缴费日期！"}
//              }
//          },
          remark : {
        	  validators: {
        		  notEmpty: {message:"请输入备注！"},
                  stringLength:{
                	  //min: 10,
                      max: 200, 
                      message:"不能超过一百个文字。"
                  }
              }
          }
      }
  }).on('success.form.bv', function(e) {
  		var $form = $(e.target);
     	var bv = $form.data('bootstrapValidator');
     	var collectorId = $('#collectorId').val();
     	var collectorName = $('#collectorName').val();
     	var groupId = $('#group').val();
     	var regionId = $('#region').val();
     	var collectorSign = $('#collectorSign').val();
     	var paid = $('#paid').val()!=""?($('#paid').val()*100).toFixed(0):"";
     	var collectorAccount = $('#collectorAccount').val();
     	var departmentId = $('#department').val();
     	var captainSign = $('#captainSign').val();
     	var payable = $('#payable').val()!=""?$('#payable').val()*100:"";
     	var remark = $('#remark').val();
     	var payTime = $('#payTime').val();
     	if(!collectorId){
     		swal("提示","收费员名称不能为空!");
     		return false;
     	}
     	if(!collectorAccount){
     		swal("提示","收费员账号不能为空!");
     		return false;
     	}
     	if(payable == ""){
     		swal("提示","该日期没有应缴金额!");
     		return false;
     	}
//     	if( paid < payable && ($("#remark").val()).length<10){
//     		swal("提示","备注不能少于10个汉字。");
//     		return false;
//     	}
     	var data ={"collectorId":collectorId,"collectorName":collectorName,"groupId":groupId,"regionId":regionId,
     			"collectorSign":collectorSign,"paid":paid,"collectorAccount":collectorAccount,"departmentId":departmentId,
     			"captainSign":captainSign,"payable":payable,"remark":remark,"payTime":payTime};
	    $.ajax({
	 			url:basePath+'/action/collectorPaid/save.do',
	 			type:'post',
	 			async:false,
	 			dataType:'json',
	 			data:data,
	 			success:function(result) {  
	            	if(result.success){
	                    swal("成功",result.msg);
	                    $('#handOver').modal('hide');
	                    $('#data_list_table').bootstrapTable("refresh");	 		                   
			      	}else{
			      		swal("失败",result.msg);
			      	}  
	 			},
				error : function(data) {
					swal("失败", data.responseText, "error");
					clearForm($('#addForm'));
				}  
	 	});
	    return false;
  });
 }
  return oFormInit;
}
  
  $('#handOver').on('hide.bs.modal', function (obj) {
  	if(obj.target.id=="handOver"){
  		$("[data-id='collectorName']")[0].children[0].innerHTML="";
  		$("[data-id='collectorAccount']")[0].children[0].innerHTML="";
//  	$(".selected active").removeClass("selected active");
  		addForm_reset();
  		$(this).find("form").data('bootstrapValidator').resetForm(true);
  	}
  });
  
  function addForm_reset(){
	  $('#collectorName').val("");
	  $('#groupId').val("");
	  $('#regionId').val("");
	  if($('#collectorSign').val()==0 || $('#collectorSign').val()=="off"){
		  $('#collectorSign').click();
	  }
	  $('#paid').val("");
	  $('#collectorAccount').val("");
	  $('#departmentId').val("");
	  if($('#captainSign').val()==0 || $('#captainSign').val()=="off"){
		  $('#captainSign').click();
	  }
	  $('#payable').val("");
	  $('#remark').val("");
	  if(date.getMonth()+1<10){
		  $('#payTime').val(date.getFullYear()+"-"+("0"+(date.getMonth()+1))+"-"+(nowDay));
	  }else{
		  $('#payTime').val(date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(nowDay));
	  }
  }
  
if($('#captainSign').val()=="on"){
	$('#captainSign').val(1);
}else{
	$('#captainSign').val(0);
}

if($('#collectorSign').val()=="on"){
	$('#collectorSign').val(1);
}else{
	$('#collectorSign').val(0);
}

//中队长签字的switch按钮值的变换
$('input[name="captainSign"]').on('switchChange.bootstrapSwitch', function(event, state) {
//	  console.log(this); // DOM element
//	  console.log(event); // jQuery event
//	  console.log(state); // true | false
	if(state==false){
		$('#captainSign').val(0);
		console.log("captainSign="+$('#captainSign').val());
	}else{
		$('#captainSign').val(1);
		console.log("captainSign="+$('#captainSign').val());
	}
});

//收费员签字的switch按钮值的变换
$('input[name="collectorSign"]').on('switchChange.bootstrapSwitch', function(event, state) {
	if(state==false){
		$('#collectorSign').val(0);
		console.log("collectorSign="+$('#collectorSign').val());
	}else{
		$('#collectorSign').val(1);
		console.log("collectorSign="+$('#collectorSign').val());
	}
});

//选中日期后清空其他输入框
$('#payTime').change(function(){
	$('#collectorId').val("");
	$('#group').val("");
	$('#region').val("");
	$('#department').val("");
	$('#collectorAccount').val("");
//	$('#collectorAccount').selectpicker(result[i].collectorAccount);
	$('#collectorAccount').selectpicker("refresh");
	$('#collectorName').val("");
//	$('#collectorName').selectpicker(result[i].collectorName);
	$('#collectorName').selectpicker("refresh");
	$('#groupId').val("");
	$('#regionId').val("");
	$('#departmentId').val("");
	$('#payable').val("");
	$('#paid').val("");
	if($('#collectorSign').val()==0 || $('#collectorSign').val()=="off"){
		$('#collectorSign').click();
	}
	if($('#captainSign').val()==0 || $('#captainSign').val()=="off"){
		$('#captainSign').click();
	}
})

//选中缴费日期之后才会出现应缴金额
//如果该日期之后无数据则不允许上缴
//$('#payTime').change(function(){
function changeNameOrAccount(collectorId){
	setFormRefush();
//	var collectorId = $('#collectorId').val();
//	if(!collectorId){
// 		swal("提示","收费员名称不能为空!");
// 		return false;
// 	}
//	var collectorAccount = $('#collectorAccount').val();
// 	if(!collectorAccount){
// 		swal("提示","收费员账号不能为空!");
// 		return false;
// 	}
	var statDate = $('#payTime').val();
	if(!statDate){
		swal("提示","缴费日期不能为空!");
		return false;
	}
	$.ajax({
		url : basePath + '/action/collectorPaid/getPayable.do',
		type : "post",
		data : {
			collectorId : collectorId,
			statDate : statDate
		},
		success : function(result) {
			if(result.success){
				$('#payable').val(result.payable/100.0);
			}else{
				$('#payable').val("");
				swal("提示",result.msg);
			}
		},
		error:function(data){
       	    swal("错误",data.responseText,"error");
        }
	});
}
  
  
function putMsg(result){
	$.each(result, function(i, item) {
		if($('#collectorName').val()==result[i].collectorName){
			$('#collectorId').val(result[i].collectorId);
			$('#group').val(result[i].groupId);
			$('#region').val(result[i].regionId);
			$('#department').val(result[i].departmentId);
			$('#collectorAccount').val(result[i].collectorAccount);
			$('#collectorAccount').selectpicker(result[i].collectorAccount);
			$('#collectorAccount').selectpicker("refresh");
			$('#groupId').val(result[i].groupName);
			$('#regionId').val(result[i].regionName);
			$('#departmentId').val(result[i].departmentName);
//			$('#payTime').val("");
			$('#payable').val("");
			$('#paid').val("");
			changeNameOrAccount(result[i].collectorId);
		}
	});
		
}
function putMsg_account(result){
	$.each(result, function(i, item) {
		if($('#collectorAccount').val()==result[i].collectorAccount){
			$('#collectorId').val(result[i].collectorId);
			$('#group').val(result[i].groupId);
			$('#region').val(result[i].regionId);
			$('#department').val(result[i].departmentId);
			$('#collectorName').val(result[i].collectorName);
			$('#collectorName').selectpicker(result[i].collectorName);
			$('#collectorName').selectpicker("refresh");
			$('#groupId').val(result[i].groupName);
			$('#regionId').val(result[i].regionName);
			$('#departmentId').val(result[i].departmentName);
//			$('#payTime').val("");
			$('#payable').val("");
			$('#paid').val("");
			changeNameOrAccount(result[i].collectorId);
		}
	});
}
function setFormRefush(){
	var bootstrapValidator = $('#addForm').data('bootstrapValidator'); 
//	bootstrapValidator.revalidateField($("#payTime")); 
	bootstrapValidator.revalidateField($("#payable")); 
}

//导出数据
function exports() {
	if ($('#data_list_table').bootstrapTable("getData").length > 0) {
		var createTimeFrom = $('#createTimeFrom').val();
		var createTimeTo = $('#createTimeTo').val();
		var collectorId = $("#collectorIdSearch").val();
		var startDate = formatDate(createTimeFrom);
		var endDate = formatDate(createTimeTo);
		if (startDate > endDate) {
			swal("警告", "起始时间大于结束时间！", "warning");
		} else {
			window.open('../collectorPaid/exportCollectorPaid.do?collectorId='
					+ collectorId + "&createTimeFrom=" + createTimeFrom
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

  
  




