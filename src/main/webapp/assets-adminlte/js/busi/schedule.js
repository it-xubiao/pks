$(function() {
	// 1.初始化Table
	var oTable = new TableInit();
	oTable.Init();

	//2.初始化Button的点击事件
	var oButtonInit = new ButtonInit(); 
	oButtonInit.Init();
	
	//3.初始化表单的验证
	//var oFormInit = new FormInit();
	//oFormInit.Init();
});
function resetFF(){
	 $('#departmentName0').attr('disabled','disabled');
	 $('#collectorId0').attr("disabled","disabled");
}
var TableInit = function() {
	var oTableInit = new Object();
	// 初始化Table
	oTableInit.Init = function() {
        $('#historyTable').bootstrapTable({
            url:basePath+ '/action/schedule/queryHistoryRecords.do',     //请求后台的URL（*）
            method: 'post',           //请求方式（*）
            striped: true,           //是否显示行间隔色
            cache: false,            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            showRefresh:false,
            showToggle:false,
            showColumns:false,
            pagination: true,          //是否显示分页（*）
            sortable: true,           //是否启用排序
//            sortName:"bc.id",     //排序字段名称
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
            contentType: "application/x-www-form-urlencoded",

            columns: [
                /*{field: 'id',title: '序号',hidden:true},*/
               {
				field : 'name',
				title : '收费员名称',
				width : 100,
				align : 'center',
				valign : 'middle',
				sortable : true
			},{
				field : 'parkName',
				title : '停车点',
				align : 'center',
				valign : 'middle',
				sortable : true
			}, {
				field : 'groupName',
				title : '收费组名称',
				align : 'center',
				valign : 'middle',
				sortable : true
			}, {
				field : 'startDate',
				title : '起始时间',
				align : 'center',
				valign : 'middle',
				sortable : true
			}, {
				field : 'endDate',
				title : '截止时间',
				align : 'center',
				valign : 'middle',
				sortable : true
			}, 
            ],

        });
        
        $("#history").find(".fixed-table-body").height(230);
        
		$('#data_list_table').bootstrapTable({
			url : basePath+ '/action/schedule/dataList.do', // 请求后台的URL（*）
			method : 'post', // 请求方式（*）
			toolbar : '#toolbar', // 工具按钮用哪个容器
			striped : true, // 是否显示行间隔色
			cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			showRefresh : false,
			showToggle : false,
			showColumns : false,
			pagination : true, // 是否显示分页（*）
			sortable : true, // 是否启用排序
//			sortName : "bc.id", // 排序字段名称
			sortOrder : "desc", // 排序方式
			queryParamsType : 'limit',
			queryParams : oTableInit.queryParams,// 传递参数（*）
			sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
			pageNumber : 1, // 初始化加载第一页，默认第一页
			pageSize : 10, // 每页的记录行数（*）
			pageList : [ 10, 25, 50, 100 ], // 可供选择的每页的行数（*）
			strictSearch : true,
			clickToSelect : true, // 是否启用点击选中行
			// height: 460, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
			uniqueId : "id", // 每一行的唯一标识，一般为主键列
			cardView : false, // 是否显示详细视图
			detailView : true, // 是否显示父子表
			contentType: "application/x-www-form-urlencoded",
			columns : [ {
				field : 'state',
				checkbox : true,
				align:'center',valign:'middle'
			},/* {
				field : 'id',
				title : '序号'
			},*/{
				field : 'name',
				title : '收费员名称',
				width : 100,
				align : 'center',
				valign : 'middle',
				sortable : true
			},  {
				field : 'parkName',
				title : '停车点',
				align : 'center',
				valign : 'middle',
				sortable : true
			}, {
				field : 'startDate',
				title : '起始时间',
				align : 'center',
				valign : 'middle',
				sortable : true
			}, {
				field : 'endDate',
				title : '截止时间',
				align : 'center',
				valign : 'middle',
				sortable : true
			}, {
				field : 'groupName',
				title : '收费组名称',
				align : 'center',
				valign : 'middle',
				sortable : true
			}],

			// 排班详情
			detailFormatter : function(index, row) {
				return '<div style="padding:2px"><table id="detailDiv' + index + '" class="ddv"></table></div>';
			},
			onExpandRow : function(index, row, detail) {
				var ddv = detail.find('table.ddv');
				ddv.bootstrapTable({
					url : basePath+ '/action/dutyRecord/getDutyRecords.do?id='+row.id, // 请求后台的URL（*）
					method : 'get', // 请求方式（*）
					striped : true, // 是否显示行间隔色
					cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
					/*
					 * showRefresh:true,
					 * showToggle:true,
					 * showColumns:true,
					 */
					pagination : true, // 是否显示分页（*）
					sortable : true, // 是否启用排序
					sortName : "bc.id", // 排序字段名称
					sortOrder : "desc", // 排序方式
					queryParamsType : 'limit',
					queryParams :oTableInit.queryQDParams,// 传递参数（*）
					sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
					pageNumber : 1, // 初始化加载第一页，默认第一页
					pageSize : 10, // 每页的记录行数（*）
					pageList : [ 10, 25, 50, 100 ], // 可供选择的每页的行数（*）
					strictSearch : true,
					clickToSelect : true, // 是否启用点击选中行
					// height: 460,
					// //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
					uniqueId : "id", // 每一行的唯一标识，一般为主键列
					cardView : false, // 是否显示详细视图
					detailView : false, // 是否显示父子表

					columns : [
							/*{
								field : 'state',
								checkbox : true
							},*/
							/*
							 * {field: 'id',title:
							 * '序号'},
							 */
							{
								field : 'name',
								title : '收费员',
								width : 100,
								align : 'center',
								valign : 'middle',
								sortable : true
							},
							{
								field : 'meid',
								title : '终端号',
								align : 'center',
								valign : 'middle',
								sortable : true
							},
							{
								field : 'parkName',
								title : '停车点',
								align : 'center',
								valign : 'middle',
								sortable : true
							},
							{
								field : 'status',
								title : '值班状态',
								align : 'center',
								valign : 'middle',
								sortable : true,
								formatter : sys.dicts.text('DUTY_STATUS')
							}, {
								field : 'checkinTime',
								title : '签到时间',
								align : 'center',
								valign : 'middle',
								sortable : true
							}, {
								field : 'checkoutTime',
								title : '签退时间',
								align : 'center',
								valign : 'middle',
								sortable : true
							} ],
									
							/* //行双击事件
		       	            onDblClickRow: function (row,index) {
		       	            	swal({
		       	            		title:"提示",
		       	            		text: '您双击了第'+index[0].rowIndex+'行,执行事件：onDblClickRow,行内数据：  ' + JSON.stringify(row)
		       	            	}) ;
		       	            },
		       	          	*/
							//这里有5个取值代表5中颜色['active', 'success', 'info', 'warning', 'danger'];
							rowStyle: function (row, index) {
				 	        	var strclass = "";
			 	            	if (row.isOnline == "1") {
			 	                	strclass = 'success';//还有一个active
			 	                }else if (row.isOnline == "0") {
			 	                	strclass = 'danger';
			 	                }else {
			 	                	return {};
			 	                }
			 	                return { classes: strclass }
				 	        }
				});
			}
		});
	};
	
//	var collectorGroup = $('#collectorGroupId').val();
//	if(collectorGroup==-1){
//		collectorGroup="";
//	}
	
	oTableInit.queryHistoryParams = function (params) {
        var temp = {  //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            page : params.offset==0 ? 1:(params.offset/params.limit)+1,  //pageIndex
            rows: params.limit, //页码
            sort : params.sort,
            order : params.order,
            date: $("#codeType").val(),
            collectorId:$('#collectorId').val(),
            groupId:$('#collectorGroupId').val(),
            createTimeFrom:$("#createTimeFromSearch").val(),
            createTimeTo:$("#createTimeToSearch").val(),
        };
        return temp;
    };

	oTableInit.queryParams = function(params) {
		$.each(params, function(key, val) {
			if ($.isPlainObject(val) || $.isArray(val)) {
				subObj(val);
			} else {
				//console.log(key + '=' + val);
			}
		});
		var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
			page : params.offset == 0 ? 1 : (params.offset / params.limit) + 1, // pageIndex
			rows : params.limit, // 页码
			sort : params.sort,
			order : params.order,
			groupId:$('#collectorGroupId0').val(),
            collectorId:$('#collectorId0').val(),            
            parkId:$('#parkId0').val(),
			createTimeFrom:$('#createTimeFrom').val(),
			createTimeTo:$("#createTimeTo").val(),
		};
		return temp;
	};
	
	oTableInit.queryQDParams = function (params) {
        var temp = {  //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            page : params.offset==0 ? 1:(params.offset/params.limit)+1,  //pageIndex
            rows: params.limit
        };
        return temp;
    };
	
	return oTableInit;
};

//搜索事件
function searchSubmit(){
	$('#data_list_table').bootstrapTable('refresh',{url:basePath+ '/action/schedule/dataList.do',query:{page:1}});
}

//搜索事件（历史排班记录）
function searchHistory(){
	$("#history").find(".fixed-table-body").height(230);
	$('#historyTable').bootstrapTable('refresh',{url:basePath+ '/action/schedule/queryHistoryRecords.do',query:{page:1}});
}

$('#history').on('hide.bs.modal', function (obj) {
	if(obj.target.id=="history"){
		$('#collectorGroupId').val("-1");
		$('#collectorId').val("");
		$('#createTimeFromSearch').val("");
		$('#createTimeToSearch').val("");	
		$('#collectorGroupId').removeAttr('disabled');
		$('#collectorId').removeAttr('disabled');
		searchHistory();
	}	
});

var ButtonInit=function(){
    var oButtonInit = new Object();
    //初始化Table
    oButtonInit.Init = function () {
    	 $('#deleteData').click(function(){
             var ids=[] ;
             var names=[];
             var rows=$('#data_list_table').bootstrapTable('getAllSelections');
             if(rows.length<=0){
                 swal("提示","请选中一条记录！");
                 return;
             }else{
                 for(var i=0;i<rows.length;i++){
                     ids.push(rows[i].id);
                     names.push(rows[i].name);
                 }
                 swal({
                         title: "删除提醒",
                         text: "你确定要删除收费员"+names+"的排班吗？",
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
                                 url:basePath+'/action/schedule/delete.do',
                                 type:"post",
                                 data:{"id":ids},
                                 dataType:'json',
                                 traditional:true,
                                 success : function(data) {
                                	 if(data.success){
                                		 swal("成功",data.msg);
                                		 if(rows.length != $('#data_list_table').bootstrapTable("getData").length){
                                			 $('#data_list_table').bootstrapTable("refresh");    
                                		 }else{
                                			 searchSubmit();
                                		 }
                                	 }else{
                                		 swal("失败", data.msg);
                                	 }
             					},
             					error : function(data) {
             						swal("错误", data.responseText,"error");
             					}
                             });
                         }
                     });
             }
         })


        $('#modify').click(function(){
        	resetForm();
            var rows=$('#data_list_table').bootstrapTable('getAllSelections');
            if(rows==null||rows.length>1 || rows.length<=0){
            	swal("提示","请选中一条记录！");
                return ;
            }
            var row = rows[0];
            var d = new Date();
            var str = d.getFullYear() + "-" + (d.getMonth() + 1)
            + "-" + d.getDate() + " " + d.getHours() + ":"
            + d.getMinutes() + ":" + d.getSeconds();
            var d1 = new Date(str.replace(/\-/g, "\/"));
            var d2 = new Date(row.endDate.replace(/\-/g, "\/"));
            if(d1>d2){
            	 swal("提示","过期数据不能修改");
            	 return;
            }
            $("#modify_park").show();
            $("#modify_parks").hide(); 
            $("#modify_department").hide();
            $("#modify_regino").hide();
            $.ajax({
            	url:  basePath+ '/action/schedule/getId.do',
                type:"post",
                data:{id:rows[0].id},
                success: function(result) {
                    var data=result.data;
                        $('#id').val(data.id);
                        $('#regionId').val(data.regionId);
                        $('#departmentId').val(data.departmentId);
                        $('#collectorGroupId1').val(data.groupId);
                        $('#collectorId1').val(data.collectorId);
                        $('#parkId1').val(data.parkId);
                        $('#startDate').val(data.startDate);
                        $('#endDate').val(data.endDate);                    
                        $('#edit').modal('show'); 
                        if($('#collectorGroupId1').val()!=-1){
                        	$("#collectorId1").val("");
                    		$("#collectorId1").attr("disabled","disable");
                        }else if($("#collectorId1").val()!=""){
                        	$("#collectorGroupId1").val(-1);
                    		$("#collectorGroupId1").attr("disabled","disable");
                        }
//                        changeCollectorGroup($('#collectorGroupId1')[0]);
//                        changeCollector($('#collectorId1')[0]);
                }
            });

        })
//        $('#historyBtn').click(function(){
//        	$('#historyTable').bootstrapTable('refresh',{url:basePath+ '/action/schedule/queryHistoryRecords.do',query:{page:1}});
//        });
		        
//	       $('#resetBtn').click(function() {
//               $('#defaultForm').data('bootstrapValidator').resetForm(true);
//            });

	       /*//　模态框关闭事件　清空from表单数据和验证
			$('.modal').on('hide.bs.modal', function () {
				var id=$(this).attr('id');
				if(!(id==='history')){
			    	$(this).find("form").data('bootstrapValidator').resetForm(true);
			    }
			})*/
    }
    return oButtonInit;
}


//验证
jQuery(function() {
	// 初始化所有时间框 点击选择
	$('.form_datetime').datetimepicker({
	    format: 'yyyy-mm-dd',
    	language: 'zh-CN', //汉化 
    	todayBtn: 1,
    	minView: "month",
    	icon:'fa-arrow-right',
    	todayHighlight : true, // 今天高亮
    	pickerPosition:'bottom-left', // 选择框左边显示
	   	autoclose:true //选择日期后自动关闭 
	});
	
	$('#startDate').datetimepicker({
	    format: 'yyyy-mm-dd hh:ii:00',
    	language: 'zh-CN', //汉化 
//    	todayBtn: 1,
//    	minView: "month",
    	icon:'fa-arrow-right',
    	todayHighlight : true, // 今天高亮
    	pickerPosition:'top-left', // 选择框左边显示
	   	autoclose:true //选择日期后自动关闭 
	});
	$('#endDate').datetimepicker({
	    format: 'yyyy-mm-dd hh:ii:00',
    	language: 'zh-CN', //汉化 
//    	todayBtn: 1,
//    	minView: "month",
    	icon:'fa-arrow-right',
    	todayHighlight : true, // 今天高亮
    	pickerPosition:'top-left', // 选择框左边显示
	   	autoclose:true //选择日期后自动关闭 
	});
	
	jQuery('#defaultForm').bootstrapValidator({
    	message: 'This value is not valid',
		feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
//        	departmentId: {
//                validators: {
//        			notEmpty: {
//        				message:"请选择所属部门"
//                    },
//                }
//            },
//            regionId: {
//                validators: {
//        			notEmpty: {
//        				message:"请选择所属区域"
//                    },
//                }
//            },
//            parkId: {
//                validators: {
//        			notEmpty: {
//        				message:"请选择停车点"
//                    },
//                }
//            },
//            groupId: {
//                validators: {
//            		notEmpty: {
//            			message:"请选择值班小组"
//            		},
//                }
//            },
//            collectorId: {
//                validators: {
//            		notEmpty: {
//            			message:"请选择收费员"
//            		},
//                }
//            },
            startDate: {
                validators: {
            		notEmpty: {
            			message:"请选择起始时间"
            		}
                }
            },
            endDate: {
                validators: {
                    notEmpty: {
            			message:"请选择截止时间"
                    }
                }
            }
        }
    }).on('success.form.bv', function(e) {
    	e.preventDefault();
	});
	jQuery('#defaultForm .form_datetime')
	    .on('dp.change dp.show', function(e) {
	        // Revalidate the date when user change it
	        $('#defaultForm').bootstrapValidator('revalidateField', 'startDate');
	        $('#menu_tree').tree("reload");
	});
	// 保存按钮事件
    jQuery('#validateBtn').click(function() {
    	// Get the BootstrapValidator instance
    	var data = jQuery('#defaultForm').data('bootstrapValidator');
    	if (data) {
    	    // 修复记忆的组件不验证
	        data.validate();
	        if (!data.isValid()) {
	            return false;
	        }
	    }
    	var nodes = $('#menu_tree').tree('getChecked');
		console.log(nodes);
		var id="";
		for(var i=0 ;i< nodes.length ;i++){
			if (nodes[i].id != null) {
				if (nodes[i].id.indexOf("park_") == 0) {
					id += nodes[i].dataId + ";";
				}
			}
		}
		var schedule_id = $("#id").val();
		var startDate = $('#startDate').val();
		var endDate = $('#endDate').val();
		if(id=="" && schedule_id==""){
			swal("提示","停车点不能为空！");
			return false;
		}else if(startDate>endDate){
			swal("提示","起始时间大于截止时间！");
			return false;
		}else{
			if($("#collectorGroupId1").val()==-1 && $("#collectorId1").val()==""){
				swal("提示","值班小组或者收费员必须选择一项！");
				return false;
			}else{
				$("#parkIdArray").val(id);
				$.ajax({
	            	url:basePath+'/action/schedule/save.do',
	                data:$('#defaultForm').serialize(),
	                type:"post",
	                asyna:false,
	                dataType:'json',
	                success: function(data){
	                    if(data.success){
	                    	resetForm();
	                        swal("成功",data.msg);
	                        $('#edit').modal('hide');
	                        //$('#data_list_table').bootstrapTable("refresh");
	                        searchSubmit();
	                    }else{
	                    	swal("失败",data.msg);
	                    }
	                },
	                 error:function(data){
	                	 swal("错误",data.responseText,"error");	                	
	                 }	                
	            });
			}
		}
    });
    
    //　模态框关闭事件 清空from表单数据和验证
    $('#edit').on('hide.bs.modal', function (obj) {
    	if(obj.target.id=='edit'){
    		resetForm();
    	}else{
    		if($("#startDate").val()){
    			$('#defaultForm').bootstrapValidator('revalidateField', 'startDate');
    		}
    		if($("#endDate").val()){
    			$('#defaultForm').bootstrapValidator('revalidateField', 'endDate');
    		}
    	}    	
    });
});

function resetForm(){
	$('#defaultForm').bootstrapValidator('resetForm', true);
	$("#id").val("");
	clearTreeData();
	$("#collectorId1").val("");
	$("#collectorGroupId1").val(-1);
	$("#modify_park").hide();
    $("#modify_parks").show();
    $("#modify_department").show();
    $("#modify_regino").show();
    $("#collectorId1").removeAttr("disabled");
    $("#collectorGroupId1").removeAttr("disabled");
}

function clearTreeData() {
	 $('#menu_tree').tree("reload");
	$(".tree-checkbox1").removeClass("tree-checkbox1").addClass("tree-checkbox0");
	$(".tree-checkbox2").removeClass("tree-checkbox2").addClass("tree-checkbox0");
}

function changeCollectorGroup(obj){
	if(obj.value!="-1"){
		$("#collectorId1").val("");
		$("#collectorId1").attr("disabled","disable");
	}else{
		$("#collectorId1").val("");
		$("#collectorId1").removeAttr("disabled");
	}
}

function changeCollectorGroup2(obj){
	if(obj.value!="-1"){
		$("#collectorId").val("");
		$("#collectorId").attr("disabled","disable");
	}else{
		$("#collectorId").val("");
		$("#collectorId").removeAttr("disabled");
	}
}

function changeCollector(obj){
	if(obj.value){
		$("#collectorGroupId1").val(-1);
		$("#collectorGroupId1").attr("disabled","disable");
	}else{
		$("#collectorGroupId1").val(-1);
		$("#collectorGroupId1").removeAttr("disabled");
	}
}	

$('#departmentName0').change(function(){
	if($('#departmentName0').val()!=""){
		$('#collectorId0').removeAttr("disabled");
		$("#collectorId0").empty();
		getCollectorByDepartmentName(0,"收费员","collectorId0",basePath);
	}else{
		$('#collectorId0').val("");
		$('#collectorId0').attr("disabled","disabled");
	}
})


