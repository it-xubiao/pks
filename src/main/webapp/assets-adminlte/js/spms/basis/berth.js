// 默认缩放级别
var mapLeave = 16; 
var map;
$(function () {
    //初始化地图
    map = new BMap.Map("allMap", {enableMapClick:false}); 
});
function moveswitch() {
	var rows=$('#data_list_table').bootstrapTable('getAllSelections');
	var berthIds = "";
	var state = -1;
    if(rows==null || rows.length<=0){
    	swal("提示","请选择一条记录");
        return ;
    }else {			
		$.each(rows,function(i, row) {
			if(state == -1){
				state = row.moveFlag;
			}else if(state != row.moveFlag){
				state=-2;
				return;
			} 
			berthIds += row.id + ";";
		});
		if(state==-2){
			swal("提示","只能选择一种状态开启或关闭");
			return;
		}
		var confirmMessage = '';
		if(state == 0){
			confirmMessage ='确认关闭move事件处理';
		}else{
			confirmMessage ='确认开启move事件处理';
		}
		swal({
            title: "move事件处理提醒",
            text: confirmMessage+"吗？",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            cancelButtonText: "取消",
		   confirmButtonText: "确定",
		   closeOnConfirm: false,
		   closeOnCancel: true
        },
        function(isConfirm){
            if (isConfirm) {
                $.ajax({
                	url : 'moveswitch.do',
					type:'post',
					dataType : 'json',
					async:false,
					data:{
						berthIds:berthIds,
					},
                    traditional:true,
                    success: function(data) {
                        if(data.success){
                        	swal("成功", data.msg);
                            $('#data_list_table').bootstrapTable("refresh");
                        }else{
                            swal("失败", data.msg);
                        }
                    },
            	    error: function(result){
            	    	swal("错误",result.errorMsg,"error");
            	    }
                });
            }
        });			
	}		
}

function resetFF(){
	$('#street_select0').attr('disabled','disabled');
	$('#park_select0').attr('disabled','disabled');
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

function exports() {
	if ($('#data_list_table').bootstrapTable("getData").length > 0) {
		var param = $('#searchForm').serializeObject();
		if (param.parkId == undefined) {
			param.parkId = "";
		}
		if (param.streetId == undefined) {
			param.streetId = "";
		}
		/* console.log(param); */
		window.open(basePath + '/action/berth/export.do?berthCode='
				+ param.berthCode + '&isValid=' + param.isValid + '&parkId='
				+ param.parkId + '&regionId=' + param.regionId + '&roadCode='
				+ param.roadCode + '&streetId=' + param.streetId);
	} else {
		swal("提示", "当前查询条件下没有数据");
	}
}

function downloadTemplate() {
	window.open( basePath + '/action/berth/downloadTemplate.do');
}

function uploadFile(){
//    var options = {
//        success: function(result){
//            if(result.success){
//                swal("",result.msg,"success");
//                $('#data_list_table').bootstrapTable("refresh");
//                $('#importberth').modal("hide");
//            }else{
//                swal("",result.msg,"error");
//            }
//        },
//        error: function(result){	            
//            swal("",result.msg,"error");
//        },
//        resetForm: true,
//    };
//    $("#uploadForm").ajaxSubmit(options);
    
    
    $("#uploadForm").form("submit", {
		success : function(result) {
			var result = eval('(' + result + ')');
			if (result.success) {
				swal("成功",result.msg);
				$('#data_list_table').bootstrapTable("refresh");
				$('#importberth').modal("hide");
			} else {
				var msg = result.errorMsg;
				if(!msg){
					msg = result.msg;
				}
				swal("失败",msg);
			}
		},
	    error: function(result){
	    	swal("错误",result.errorMsg,"error");
	    }
	});
}
	
$(function () {
	 //1.初始化Table
    var oTable = new TableInit();
    oTable.Init();  
    //2.初始化Button的点击事件
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();   
});
	   
var TableInit = function () {
	var oTableInit = new Object();
	//初始化Table
	oTableInit.Init = function () {
	$('#data_list_table').bootstrapTable({
		url: basePath + '/action/berth/dataList.do', //请求后台的URL（*）
		method : 'get', //请求方式（*）
		toolbar : '#toolbar', //工具按钮用哪个容器
		striped : true, //是否显示行间隔色
		cache : false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		showRefresh : false,
		showToggle : false,
		showColumns : false,
		pagination : true, //是否显示分页（*）
		sortable : true, //是否启用排序
		sortName : "", //排序字段名称
		sortOrder : "desc", //排序方式
		queryParamsType : 'limit',
		queryParams : oTableInit.queryParams,//传递参数（*）
		sidePagination : "server", //分页方式：client客户端分页，server服务端分页（*）
		pageNumber : 1, //初始化加载第一页，默认第一页
		pageSize : 10, //每页的记录行数（*）
		pageList : [ 10, 25, 50, 100 ], //可供选择的每页的行数（*）
		strictSearch : true,
		clickToSelect : true, //是否启用点击选中行
		// 	        height: 460,            //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
		uniqueId : "id", //每一行的唯一标识，一般为主键列
		cardView : false, //是否显示详细视图
		detailView : false, //是否显示父子表  
		contentType: "application/x-www-form-urlencoded",
		columns : [
				{
					field : 'state',
					align: 'center',
	                valign: 'middle',
					checkbox : true
				},
				{
					field : 'id',
					align : 'center',
					valign : 'middle',
					visible:false,
					title : '序号'
				},
				{
					field : 'parkName',
					title : '停车点名称',
					width : 100,
					align : 'center',
					valign : 'middle',
					sortable : true
				},
				{
					field : 'berthCode',
					title : '泊位编码',
					align : 'center',
					valign : 'middle',
					sortable : true
				},
				{
					field : 'roadCode',
					title : '路面编码',
					align : 'center',
					valign : 'middle',
					sortable : true
				},
				{
					field : 'isValid',
					title : '是否有效',
					align : 'center',
					valign : 'middle',
					formatter:function (value,row,index){
						  if(value==1){ return "无效"; }  return "<font style='font-weight:bold;color:green;'>有效</font>";   
					},
					sortable : true
				}, {
					field : 'status',
					title : '泊位状态',
					align : 'center',
					valign : 'middle',
					formatter : sys.dicts.text('STATUS'),
					sortable : true
				},{
					field : 'feeType',
					title : '是否收费',
					align : 'center',
					valign : 'middle',
					sortable : true,
					visible:false,
					formatter : sys.dicts.text('FEE_TYPE'),
					styler:function(value,row,index){
						if(value == '2'){
							  return 'color:red;';  
							}
						}
				},{
					field : 'roadLocation',
					title : '道路位置',
					align : 'center',
					valign : 'middle',
					formatter : sys.dicts.text('ROADLOCATION'),
					sortable : true
				}, {
					field : 'position',
					title : '方位',
					align : 'center',
					valign : 'middle',
					formatter : sys.dicts.text('POSITION'),
					sortable : true
				}, {
					field : 'parkMode',
					title : '停车方式',
					align : 'center',
					valign : 'middle',
					formatter : sys.dicts.text('PARK_MODE'),
					sortable : true
				}, {
					field : 'parkModeConfirm',
					title : '是否一致',
					align : 'center',
					valign : 'middle',
					formatter : sys.dicts.text('PARK_MODE_CONFIRM'),
					sortable : true
				}, {
					field : 'moveFlag',
					title : 'move开关',
					align : 'center',
					valign : 'middle',
					formatter : sys.dicts.text('MOVE_FLAG'),
					sortable : true
				}, {
					field : 'longitude',
					title : '经度',
					align : 'center',
					valign : 'middle',
					sortable : true
				}, {
					field : 'latitude',
					title : '纬度',
					align : 'center',
					valign : 'middle',
					sortable : true
				}, {
					field : 'creator',
					title : '创建人',
					align : 'center',
					valign : 'middle',
					sortable : true
				}, {
					field : 'createTime',
					title : '创建时间',
					align : 'center',
					valign : 'middle',
					sortable : true
				}, {
					field : 'updateTime',
					title : '更新时间',
					align : 'center',
					valign : 'middle',
					sortable : true
				},{field: 'streetId',title: '街道',visible:false},
				{field: 'regionId',title: '区域',visible:false}
			]
		});
	}

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
			date : $("#codeType").val(),
			berthCode : $("#berthCode").val(),
			roadCode : $("#roadCode").val(),
			regionId : $("#region_select0").val(),
			streetId : $("#street_select0").val(),
			parkId : $("#park_select0").val(),
			isValid : $("#isValid").val(),
			parkMode : $("#parkMode").val(),
			parkModeConfirm : $("#parkModeConfirm").val(),
			moveFlag : $("#moveFlag").val()
		};
		return temp;
	}
	return oTableInit;
};
		
var ButtonInit=function(){
    var oButtonInit = new Object();
    //初始化Table
    oButtonInit.Init = function () {
    	$('#modify').click(function(){
            var rows=$('#data_list_table').bootstrapTable('getAllSelections');
            if(rows==null||rows.length>1 || rows.length<=0){
                swal("提示","请选择一条记录");
                return ;
            }
            $.ajax({
                url:basePath+'/action/berth/getId.do',
                type:"post",
                data:{id:rows[0].id},
                success: function(result) {
                    var data=result.data;
                    $('#id').val(data.id);
//                    $('#region_select1').val();
//                    set_street(data.regionId,1);
                    $('#street_select1').val(rows[0].parkName);
//                    set_park(data.regionId,data.streetId,1);
                    $('#park_select1').val(data.parkId);
                    $('#berthCode1').val(data.berthCode);
                    $('#berthCode1').attr("readonly","readonly");
                    $('#roadCode1').val(data.roadCode);
                    $('#editFormLongitude').val(data.longitude);
                    $('#editFormlatitude').val(data.latitude);
                    $('#isValid1').val(data.isValid);
                    $('#feeType').val(data.feeType);
                    $('#roadLocation').val(data.roadLocation);
                    $('#position').val(data.position);
                    $('#parkMode1').val(data.parkMode);
                    $('#street_select1').attr("disabled","disabled");
                    $('#park_select1').attr("disabled","disabled");
                    $('#edit').modal('show');
                }
            });
        });
     
    	$('#modifyPark').click(function(){
            var rows=$('#data_list_table').bootstrapTable('getAllSelections');
            if(rows==null|| rows.length<=0){
                swal("提示","请选择一条记录");
                return ;
            }
            $.ajax({
                url:basePath+'/action/berth/getId.do',
                type:"post",
                data:{id:rows[0].id},
                success: function(result) {
                    var data=result.data;
                    $('#id2').val(data.id);
                    $('#region_select2').val(data.regionId);
//                    set_street(data.regionId,2);
//                    $('#street_select2').val(data.streetId);
//                    set_park(data.regionId,data.streetId,2)
                    $('#park_select2').val("");
                    
                    var berthcodes = "";
                    for(var i=0;i<rows.length;i++){
                    	berthcodes = berthcodes + rows[i].berthCode + ",";
                    }
                    $('#berthCode2').val(berthcodes);
                    $('#effectiveDate').val("");
                    $('#editPark').modal('show');
                    $('#street_select2').attr("disabled","disabled");
                    $('#park_select2').attr("disabled","disabled");
                },
        	    error: function(result){
        	    	swal("错误",result.errorMsg,"error");
        	    }
            });
        });
        $('#searchBtn').click(function(){
        	$('#data_list_table').bootstrapTable('refresh',{url:basePath+ '/action/berth/dataList.do',query:{page:1}});
        });
    }
    return oButtonInit;
};
function clearForm(form) {
	  $(':input', form).each(function() {
		  var type = this.type;
		  var tag = this.tagName.toLowerCase(); // normalize case
		  if (type == 'text' || type == 'password' || tag == 'textarea')
			  this.value = "";
	//			    else if (type == 'checkbox' || type == 'radio')
	//			      this.checked = false;
		  else if (tag == 'select')
			  this.selectedIndex = 0;
	  });
}

function defaultFormReset(){
	$('#id').val("");
    $('#region_select1').val("");
    $('#street_select1').val("");
    $('#park_select1').val("");
    $('#berthCode1').val("");
    $('#berthCode1').removeAttr("readonly");
    $('#roadCode1').val("");
    $('#editFormLongitude').val("");
    $('#editFormlatitude').val("");
    $('#isValid1').val("");
    $('#feeType').val("");
    $('#roadLocation').val("");
    $('#position').val("");
    $('#parkMode1').val("");
    $('#park_select1').removeAttr("disabled");
}
function defaultForm_reset(){
	clearForm($("#defaultForm"));	
	defaultFormReset();
}
//　模态框关闭事件　清空from表单数据和验证
$('#edit').on('hide.bs.modal', function (obj) {
	if(obj.target.id=="edit"){
		defaultForm_reset();
		jQuery(this).find("form").data('bootstrapValidator').resetForm(true);
	}	
});

function formPark_reset(){
	clearForm($("#formPark"));
	formParkReset();
}

function formParkReset(){
	 $('#id2').val("");
     $('#region_select2').val("");
     $('#street_select2').val("");
     $('#park_select2').val("");
     $('#berthCode2').val("");
     $('#effectiveDate').val("");
     $('#editPark').val("");
}
$('#editPark').on('hide.bs.modal', function (obj) {
	if(obj.target.id == "editPark"){
		formPark_reset();
		jQuery(this).find("form").data('bootstrapValidator').resetForm(true);
	}
	if(obj.target.id == "effectiveDate"){
		var bootstrapValidator = $('#formPark').data('bootstrapValidator'); 
		bootstrapValidator.revalidateField($("#effectiveDate"));
	}
});


		
		// 验证
		 jQuery(function() {
		     $('#defaultForm').bootstrapValidator({
		 		//live: 'disabled',
		         message: 'This value is not valid',
		         feedbackIcons: {
		             valid: 'glyphicon glyphicon-ok',
		             invalid: 'glyphicon glyphicon-remove',
		             validating: 'glyphicon glyphicon-refresh'
		         },
		         fields: {
		        	 parkId: {
		                 validators: {
		         			notEmpty: {
		         				message:"请选择所属停车点"
		                     }
		                 }
		             },
		             berthCode: {
		                 validators: {
		                     notEmpty: {
		                    	 message:"请填写泊位编号"
		                     }
		                 }
		             },
		             roadCode: {
		                 validators: {
		             		notEmpty: {
		             			message:"请填写路面编号"
		                     }
		                 }
		             },
		             isValid1: {
		                 validators: {
		                     notEmpty: {
		                    	 message:"请选择是否有效"
		                     }
		                 }
		             },
		             feeType: {
		                 validators: {
		             		notEmpty: {
		             			message:"请选择是否收费"
		                     }
		                 }
		             },
		             roadLocation: {
		                 validators: {
		                     notEmpty: {
		                    	 message:"请选择道路位置"
		                     }
		                 }
		             },
		             position: {
		                 validators: {
		                     notEmpty: {
		                    	 message:"请选择方位"
		                     }
		                 }
		             },
		             parkMode1: {
		                 validators: {
		                     notEmpty: {
		                    	 message:"请选择停车方式"
		                     }
		                 }
		             },
		             longitude: {
		                 validators: {
		                     notEmpty: {
		                    	 message:"请输入经度"
		                     }
		                 }
		             },
		             latitude: {
		                 validators: {
		                     notEmpty: {
		                    	 message:"请输入纬度"
		                     }
		                 }
		             }
		         }
		     }).on('success.form.bv', function(e) {
		         var $form = $(e.target);
	        	 var bv = $form.data('bootstrapValidator');
	        	 var data_form = $('#defaultForm').serialize();
	        	 if($('#defaultForm').serialize().indexOf("parkId")==-1){
	        		 data_form = $('#defaultForm').serialize()+"&parkId="+$("#park_select1").val();
	        	 }
		         jQuery.ajax({
		 			url:'save.do',
		 			type:'post',
		 			async:false,
		 			dataType:'json',
		 			data:data_form,
		 			success:function(data) {  
		 		            	if(data.success){
		 			            	swal("成功",data.msg);
		         					$('#searchBtn').click();
		         					$("#defaultForm").data('bootstrapValidator').resetForm(true);
		 		            		jQuery("#edit").modal('hide');
		 		            		defaultForm_reset();
		 				      	}else{
		 				      		swal("失败",data.msg);
		 				      	}  
		 					},  
		 			error : function(data) {  
		 						swal("错误",data.responseText, "error");  
		 					}  
		 		});
		         return false;
		     });

		 });
		 
		 

		 $("#deleteBerth").click(function() { 
			 var rows=$('#data_list_table').bootstrapTable('getAllSelections');
	            if(rows==null || rows.length<=0){
	                swal("提示","请选择一条记录");
	                return ;
	            }
			 var ids = [];
			 var names = [];
			 for(var i=0;i<rows.length;i++){
					ids.push(rows[i].id);
					names.push(rows[i].berthCode);
			 }
			 swal({
                 title: "删除提醒",
                 text: "你确定要删除车牌分别为："+names+"的数据吗？",
                 type: "warning",
                 showCancelButton: true,
                 confirmButtonColor: "#DD6B55",
                 cancelButtonText: "取消",
  			   confirmButtonText: "确定",
  			   closeOnConfirm: false,
  			   closeOnCancel: true
             },
             function(isConfirm){
                 if (isConfirm) {
                     $.ajax({
                    	 url:'delete.do',
		         		 type:'post',
		         		 async:false,
                         data:{"id":ids},
                         traditional:true,
                         success: function(result) {
                             if(result.success){
                                 swal("成功", "删除成功");
                                 if(rows.length != $('#data_list_table').bootstrapTable("getData").length){
                                     $('#data_list_table').bootstrapTable("refresh");    
                                 }else{
                                     $('#data_list_table').bootstrapTable('refresh',{url:basePath+ '/action/berth/dataList.do',query:{page:1}});
                                 }
                             }else{
                                 swal("失败", "删除失败");
                             }
                         },
                         error : function(data) {  
	 						swal("错误",data.responseText, "error");  
	 					 }  
                     });
                 }
             });			 
		 });
		 
		 
		// 更改停车点验证
		 jQuery(function() {
			 jQuery('#formPark .form_datetime').datetimepicker({
				    format: 'yyyy-mm-dd',
				    minView: "month",
				    minDate: 0,
			    	language: 'zh-CN', //汉化 
			    	todayBtn: 1,
			    	icon:'fa-arrow-right',
				   	autoclose:true //选择日期后自动关闭 
				});
		     $('#formPark').bootstrapValidator({
		 		//live: 'disabled',
		         message: 'This value is not valid',
		         feedbackIcons: {
		             valid: 'glyphicon glyphicon-ok',
		             invalid: 'glyphicon glyphicon-remove',
		             validating: 'glyphicon glyphicon-refresh'
		         },
		         fields: {
		        	 regionId: {
		                 validators: {
		         			notEmpty: {
		         				message:"请选择所属区域"
		                     }
		                 }
		             },
		             streetId: {
		                 validators: {
		         			notEmpty: {
		         				message:"请选择街道"
		                     }
		                 }
		             },
		             newparkId: {
		                 validators: {
		         			notEmpty: {
		         				message:"请选停车点"
		                     }
		                 }
		             },
		             berthCode: {
		                 validators: {
			         			notEmpty: {
			         				message:"泊位编码不能为空"
			                     }
			                 }
			             },
			         effectiveDate: {
		                 validators: {
		                     notEmpty: {
		                    	 message:"请选择生效时间"
		                     }
		                 }
		             }
		         }
		     }).on('success.form.bv', function(e) {
		         var $form = $(e.target);
		        	var bv = $form.data('bootstrapValidator');
		        	var data_formPark = $('#formPark').serialize();
		        	if($('#formPark').serialize().indexOf("newparkId")==-1){
		        		data_formPark = $('#formPark').serialize()+"&newparkId="+$("#park_select2").val();
		        	}
		         jQuery.ajax({
		 			url:'updateNewPark.do',
		 			type:'post',
		 			async:false,
		 			dataType:'json',
		 			data:data_formPark,
		 			success:function(data) {  
		 		            	if(data.success){
		 			            	swal("成功",data.msg);
		         					$('#searchBtn').click();
		         					$("#formPark").data('bootstrapValidator').resetForm(true);
		 		            		jQuery("#editPark").modal('hide');
		 		            		formPark_reset();
		 				      	}else{
		 				      		swal("失败",data.msg);
		 				      	} 
		 					},  
		 			error : function(data) {  
		 				         swal("错误",data.responseText, "error"); 
		 					}  
		 		});
		         return false;
		     });
		     

//		     $('#resetBtn').click(function() {
//		         $('#formPark').data('bootstrapValidator').resetForm(true);
//		     });

//		     $('#searchBtn').click(function () {  
//		 		$('#data_list_table').bootstrapTable('refresh', {url:  'dataList.action'});  
//		     });
		 });
		 
//检测停车方式
		 function checkParkMode(){			 
			 $.ajax({
				 url:'queryParkMode.do',
				type:'post',
      			success:function(data) {  
					if(data.success){ 
						swal("成功",data.msg);
						$('#data_list_table').bootstrapTable("refresh");
			      	}else{
			      		swal("失败",data.msg);
			      	}  
				},  
      			error : function(data) {  
      				swal("错误",data.responseText,"error");  
      			}  
      		});
			};
			
			//地图
			function openMap(longitudeCity, latitudeCity) {
				$('#map').modal('show');
				//var map = new BMap.Map("allMap");
				debugger;
				globLon = $('#editFormLongitude').val();
				globLat = $('#editFormlatitude').val();
				var point; 
				if (globLon != '' || globLat != '') {
					longitudeCity = globLon;
					latitudeCity = globLat;
					point = new BMap.Point(globLon, globLat);
					// 初始化地图,设置中心点坐标和地图级别
					try{ 
						// 第一次点击时 会报错 未知原因
						map.centerAndZoom(point,14);
					} catch (e) { 
						map.centerAndZoom(point,14);
					}
					map.clearOverlays();
					var marker = new BMap.Marker(point);
					map.addOverlay(marker);
				}else{
					point = new BMap.Point(longitudeCity, latitudeCity);
					try{ 
						// 第一次点击时 会报错 未知原因
						map.centerAndZoom(point,14);
					} catch (e) { 
						map.centerAndZoom(point,14);
					}
				}
				map.enableScrollWheelZoom(); // 启用滚轮放大缩小，默认禁用
				map.enableContinuousZoom();

				var top_left_control = new BMap.ScaleControl({
					anchor : BMAP_ANCHOR_TOP_LEFT
				});// 左上角，添加比例尺
				var top_left_navigation = new BMap.NavigationControl(); // 左上角，添加默认缩放平移控件

				map.addControl(top_left_control);
				map.addControl(top_left_navigation);
				
				// 地图居中
				var cp = point;//cp为临时point
				map.addEventListener("tilesloaded",function(){//加载完成时,触发 
					map.setCenter(cp); 
				});
				map.addEventListener("dragend", function showInfo(){ //监听中心点位置
					cp = map.getCenter();
				});
				
				// 点击事件
				map.addEventListener("click", function(e) {
					map.clearOverlays();
					globLon = e.point.lng;
					globLat = e.point.lat;
					var marker = new BMap.Marker(new BMap.Point(globLon, globLat));
					map.addOverlay(marker);
				});

			};
				function saveHandler(){
					var bootstrapValidator = $('#defaultForm').data('bootstrapValidator'); 
					$('#editFormLongitude').val(globLon);
					bootstrapValidator.revalidateField($("#editFormLongitude"));
					$('#editFormlatitude').val(globLat);
					bootstrapValidator.revalidateField($("#editFormlatitude"));
					$('#map').modal('hide');
				};
				function closeHandler(){
					$('#map').modal('hide');
				};