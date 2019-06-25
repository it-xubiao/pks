var globMap = "";
// 城市中心经度
var cityCenterLon = "";
// 城市中心纬度
var cityCenterLat = "";
// 默认缩放级别
var mapLeave = 16; 
var map;  
var parkMap;
$(function () {
    //1.初始化Table
    var oTable = new TableInit();
    oTable.Init();
  
    //2.初始化Button的点击事件
    var oButtonInit = new ButtonInit();
    oButtonInit.Init();
    
    park_tree_init();
    
    //初始化地图
    map = new BMap.Map("allMap", {enableMapClick:false}); 
    globMap = new BMap.Map("parkMap", {enableMapClick:false});
	  
});

function resetFF(){
	$('#street_select0').attr('disabled','disabled');
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
	}
	
	function exports() {
		if($('#data_list_table').bootstrapTable("getData").length>0){
			var param = $('#searchForm').serializeObject();
			if(param.parkId == undefined){
				param.parkId = ""; 
			}
			if(param.streetId == undefined){
				param.streetId = "";
			}
			/*console.log(param); */
			window.open(basePath + '/action/park/export.do?berthCode='  + param.departmentId
					+ '&isValid=' + param.isValid + '&parkCode=' + param.parkCode
					+ '&parkName=' + param.parkName + '&parkType=' + param.parkType + '&regionId=' + param.regionId
					+ '&streetId=' + param.streetId+'&parkMode=' + param.parkMode);			
		}else{
			swal("提示", "当前查询条件下没有数据");
		}
	}
	
	function downloadTemplate() {
		window.open(basePath + '/action/park/downloadTemplate.do');
	};
	function uploadFile(){
//	    var options = {
//	        success: function(result){
//	            if(result.success){
//	                swal("",result.msg,"success");
//	                $('#data_list_table').bootstrapTable("refresh");
//	                $('#exportpark').modal("hide");
//	            }else{
//	                swal("",result.msg,"error");
//	            }
//
//	        },  //处理完成
//	        error: function(result){	            
//	            swal("",result.errorMsg,"error");
//	        },
//	        resetForm: true,
//	    };
//	    $("#uploadForm").ajaxSubmit(options);
		$("#uploadForm").form("submit", {
			success : function(result) {
				var result = eval('(' + result + ')');
				if (result.success) {					
					$('#data_list_table').bootstrapTable("refresh");
					$('#exportpark').modal("hide");
					swal("成功",result.msg);
				} else {
					var msg = result.errorMsg;
					if(!msg){
						msg = result.msg;
					}
					swal("错误",msg,"error");
				}
			},
		    error: function(result){
		    	swal("错误",result.errorMsg,"error");
		    }
		});
	}
   	
	  var TableInit = function () {
	    var oTableInit = new Object();
	    //初始化Table
	    oTableInit.Init = function () {
	      $('#data_list_table').bootstrapTable({
	        url: basePath + '/action/park/dataList.do', //请求后台的URL（*）
									method : 'post', //请求方式（*）
									toolbar : '#toolbar', //工具按钮用哪个容器
									striped : true, //是否显示行间隔色
									cache : false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
									showRefresh : false,
									showToggle : false,
									showColumns : false,
									pagination : true, //是否显示分页（*）
									sortable : true, //是否启用排序
									sortName : "createTime", //排序字段名称
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
//												width : 100,
												align : 'center',
												valign : 'middle',
												sortable : true
											},
											{
												field : 'parkCode',
												title : '停车点编号',
												align : 'center',
												valign : 'middle',
												sortable : true
											},
											{
												field : 'regionName',
												title : '所属区域',
												align : 'center',
												valign : 'middle',
												sortable : true
											},
											{
												field : 'streetName',
												title : '所属街道',
												align : 'center',
												valign : 'middle',
												//visible:false,
												sortable : true
											},
											{
												field : 'departmentName',
												title : '所属部门',
												align : 'center',
												valign : 'middle',
												//visible:false,
												sortable : true
											},
											{
												field : 'berthNum',
												title : '泊位数',
												align : 'center',
												valign : 'middle',
												sortable : true
											},
											{
												field : 'areaType',
												title : '区域类型',
												align : 'center',
												valign : 'middle',
												formatter : sys.dicts.text('AREA_TYPE'),
												sortable : true
											},
											{
												field : 'parkType',
												title : '停车点类型',
												align : 'center',
												valign : 'middle',
												formatter : sys.dicts.text('PARK_TYPE'),
												sortable : true
											},
											{
												field : 'parkMode',
												title : '停车点模型',
												align : 'center',
												valign : 'middle',
												formatter : sys.dicts.text('PARK_LOT_MODE'),
												sortable : true
											},
											{
												field : 'isValid',
												title : '是否有效',
												align : 'center',
												valign : 'middle',
//												formatter : sys.dicts.text('IS_VALID'),
												formatter:function (value,row,index){
													  if(value==1){ return "无效"; }  return "<font style='font-weight:bold;color:green;'>有效</font>";   
												},
												sortable : true
											}, {
												field : 'address',
												title : '地址',
												align : 'center',
												valign : 'middle',
//												visible:false,
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
											} ],
											 //行双击事件
//								             onDblClickRow: function (row,index) {
//								            	 swal({
//								            		 	title:"提示",
//								            		 	text: '您双击了第'+index[0].rowIndex+'行,执行事件：onDblClickRow,行内数据：  ' + JSON.stringify(row)
//								            		 }) ;
//								             },
								             
								});
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
					parkCode : $("#parkCode").val(),
					parkName : $("#parkName").val(),
					isValid : $("#isValid").val(),
					regionId : $("#region_select0").val(),
					streetId : $("#street_select0").val(),
					departmentId : $("#departmentName0").val(),
					parkType : $("#parkType").val(),
					parkMode : $("#parkMode").val()
					
				// 	        tradetype:$('input:radio[name="tradetype"]:checked').val(),
				// 	        success:$('input:radio[name="success"]:checked').val(),
				};
				return temp;
			};
			return oTableInit;
		};
		
		var ButtonInit=function(){
		    var oButtonInit = new Object();
		    //初始化Table
		    oButtonInit.Init = function () {


		        $('#modify').click(function(){
		            var rows=$('#data_list_table').bootstrapTable('getAllSelections');
		            if(rows==null||rows.length>1 || rows.length<=0){
		                swal("提示", "请选择一条记录");
		                return ;
		            }
		            $.ajax({
		                url:basePath+'/action/park/getId.do',
		                type:"post",
		                data:{id:rows[0].id},
		                success: function(result) {
		                    var data=result.data;
		                    $('#id').val(data.id);
		                    $('#region_select1').val(data.regionId);
		                    set_street(data.regionId,1);
	                        $('#street_select1').val(data.streetId),
	                        set_departmentName(data.regionId,1);
	                        $('#departmentName1').val(data.departmentId);
	                        $('#parkName1').val(data.parkName);
	                        $('#parkCodeText').val(data.parkCode);
	                        $('#areaType').val(data.areaType);
	                        $('#parkType1').val(data.parkType);
	                        $('#parkMode1').val(data.parkMode);
	                        $('#isValid1').val(data.isValid);
	                        $('#address').val(data.address);
	                        $('#editFormLongitude').val(data.longitude);
	                        $('#editFormlatitude').val(data.latitude);
	                        $('#edit').modal('show');
		                }
		            });

		        })

		        $('#searchBtn').click(function(){
		        	$('#data_list_table').bootstrapTable('refresh',{url:basePath+ '/action/park/dataList.do',query:{page:1}});
		        })
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
			};
	    //　模态框关闭事件　清空from表单数据和验证
		$('#edit').on('hide.bs.modal', function (obj) {
			if(obj.target.id=="edit"){
				closeDisable();
				editFormReset();
				clearForm($("#defaultForm"));
				jQuery(this).find("form").data('bootstrapValidator').resetForm(true);
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
		         				message:"请选择所属街道"
		                     }
		                 }
		             },
		             departmentId: {
		                 validators: {
		                     notEmpty: {
		                    	 message:"请选择所属部门"
		                     }
		                 }
		             },
		             areaType: {
		                 validators: {
		                     notEmpty: {
		                    	 message:"请选择区域类型"
		                     }
		                 }
		             },
		             parkName: {
		                 validators: {
		             		notEmpty: {
		             			message:"请选择停车点名称"
		                     }
		                 }
		             },
		             parkType: {
		                 validators: {
		             		notEmpty: {
		             			message:"请选择停车点类型"
		                     }
		                 }
		             },
		             parkMode: {
		                 validators: {
		                     notEmpty: {
		                    	 message:"请选择停车点模型"
		                     }
		                 }
		             },
		             isValid: {
		                 validators: {
		                     notEmpty: {
		                    	 message:"请选择是否有效"
		                     }
		                 }
		             },
		             longitude: {
		                 validators: {
		                     notEmpty: {
		                    	 message:"经度不能为空"
		                     }
		                 }
		             },
		             latitude: {
		                 validators: {
		                     notEmpty: {
		                    	 message:"　  　纬度不能为空"
		                     }
		                 }
		             }
		         }
		     }).on('success.form.bv', function(e) {
		         var $form = $(e.target);
		         var bv = $form.data('bootstrapValidator');
		         var saveFormInfo = $('#defaultForm').serialize();
		         if((("&"+saveFormInfo).indexOf("&id=")==-1) && ($("#id").val()!="")){
		        	 saveFormInfo = saveFormInfo + "&id="+$("#id").val();
		         }
		         $.ajax({
		 			url:'save.do',
		 			type:'post',
		 			async:false,
		 			dataType:'json',
		 			data:saveFormInfo,
		 			success:function(data) {  
 		            	if(data.success){
 			            	swal("成功",data.msg);
//         					$('#searchBtn').click();
 		            		$("#edit").modal('hide');
 		            		$(".modal-backdrop").css("display","none");
 		            		$('#data_list_table').bootstrapTable("refresh");
 				      	}  
 					},  
		 			error : function(data) {  
 						swal("错误",data.responseText,"error");
 					}  
		 		});
		         return false;
		     });

		 });
		 
		 
		 $("#deletePark").click(function() { 
			 var rows=$('#data_list_table').bootstrapTable('getAllSelections');
	            if(rows==null || rows.length<=0){
	            	swal("提示", "请选择一条记录");
	                return ;
	            }
			 var ids = [];
			 for(var i=0;i<rows.length;i++){
					ids.push(rows[i].id);
			 }
			 swal({
                 title: "删除提醒",
                 text: "你确定要删除吗？",
                 type: "warning",
                 showCancelButton: true,
                 confirmButtonColor: "#DD6B55",
                 cancelButtonText: "取消",
  			   	 confirmButtonText: "确定",
  			     closeOnConfirm: false,
  			     closeOnCancel: true
             },
             function(isConfirm){
            	 if(isConfirm){
	                 $.ajax({
	                	 url:'delete.do',
		         		 type:'post',
		         		 async:false,
	                     data:{"id":ids},
	                     traditional:true,
	                     success: function(result) {
	                         if(result.success){
	                             swal("成功",result.msg);
	                             if(rows.length != $('#data_list_table').bootstrapTable("getData").length){
	                                 $('#data_list_table').bootstrapTable("refresh");    
	                             }else{
	                                 $('#data_list_table').bootstrapTable('refresh',{url:basePath+ '/action/park/dataList.do',query:{page:1}});
	                             }
	                         }else{
	                             swal("失败",result.msg);
	                         }
	                     },
	                     error:function(result){
	                    	 swal("错误",result.responseText,"error");
	                    	 return false;
	                     }
	                 });
            	 }
             });
			 return false;
		 });

		//地图
		function openMap(longitudeCity, latitudeCity) {
			$('#map').modal('show');
			//map = new BMap.Map("allMap");
			globLon = $('#editFormLongitude').val();
			globLat = $('#editFormlatitude').val();
			if (globLon == '' || globLat == '') {
				globLon = longitudeCity;
				globLat = latitudeCity;
			}
			var point = new BMap.Point(globLon, globLat);
			try{ 
				// 第一次点击时 会报错 未知原因
				map.centerAndZoom(point,mapLeave);
			} catch (e) { 
				map.centerAndZoom(point,mapLeave);
			} 
			
			map.clearOverlays();
			map.addOverlay(new BMap.Marker(point));
			
			map.enableScrollWheelZoom(); // 启用滚轮放大缩小，默认禁用
			map.enableContinuousZoom();

			var top_left_control = new BMap.ScaleControl({
				anchor : BMAP_ANCHOR_TOP_LEFT
			});// 左上角，添加比例尺
			var top_left_navigation = new BMap.NavigationControl(); // 左上角，添加默认缩放平移控件

			map.addControl(top_left_control);
			map.addControl(top_left_navigation);
			// 点击事件
			map.addEventListener("click", function(e) {
				map.clearOverlays();
				globLon = e.point.lng;
				globLat = e.point.lat;
				var marker = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat));
				map.addOverlay(marker);
			});
			
			// 地图居中
			var cp = point;//cp为临时point
			map.addEventListener("tilesloaded",function(){//加载完成时,触发 
				map.setCenter(cp); 
			});
			map.addEventListener("dragend", function showInfo(){ //监听中心点位置
				cp = map.getCenter();
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
			
		//地图操作
		function showMap(cityLongitude,cityLatitude) {
//			$('#menu_tree').tree('reload');
			$('#mapOpption').modal('show');
			
			cityCenterLon = cityLongitude;
			cityCenterLat = cityLatitude;
			//var map = new BMap.Map("parkMap");
			var point = new BMap.Point(cityCenterLon, cityCenterLat);
			try{ 
				// 第一次点击时 会报错 未知原因
				globMap.centerAndZoom(point,mapLeave);
			} catch (e) { 
				globMap.centerAndZoom(point,mapLeave);
			} 
			globMap.enableScrollWheelZoom(); // 启用滚轮放大缩小，默认禁用
			globMap.enableContinuousZoom();
			//globMap = map;
			
			var top_left_control = new BMap.ScaleControl({
				anchor : BMAP_ANCHOR_TOP_LEFT
			});// 左上角，添加比例尺
			var top_left_navigation = new BMap.NavigationControl(); // 左上角，添加默认缩放平移控件
			
			globMap.addControl(top_left_control);
			globMap.addControl(top_left_navigation);
			
//			// 地图居中
//			var cp = point;//cp为临时point
//			globMap.addEventListener("tilesloaded",function(){//加载完成时,触发 
//				//debugger;
//				globMap.setCenter(cp); 
//			});
//			globMap.addEventListener("dragend", function showInfo(){ //监听中心点位置
//				cp = globMap.getCenter();
//			});
		};
		// 重置地图
		function refreshMap() {
			globMap.reset();
		};
		// 测距
		function calcDis() {
			var obj = document.getElementById("mapOperMenu");
			var myDis = new BMapLib.DistanceTool(globMap);
			if (obj.value == "测距"){
				myDis.open();
			}
		};
			
			function editFormReset(){
				$('#id').val("");
                $('#region_select1').val("");
                $('#street_select1').val("");
                $('#departmentName1').val("");
                $('#parkName1').val("");
                $('#parkCodeText').val("");
                $('#areaType').val("");
                $('#parkType1').val("");
                $('#parkMode1').val("");
                $('#isValid1').val("");
                $('#address').val("");
                $('#editFormLongitude').val("");
                $('#editFormlatitude').val("");
                $('#edit').modal('show');
			}
			
			
			
			function park_tree_init(){
				$('#menu_tree').tree(
					{
						title : '停车点列表',
						width : 200,
						height : 600,
						url : basePath + '/park/getParkTree.do?type='+2,
						checkbox : true,
						multiple : true,
						cascadeCheck : true,
						onCheck : function(node, checked) {
							createOverlay(node, checked);
							return false;
						},
						onSelect : function(node) {
							var longitude = node.attributes.longitude;
							var latitude = node.attributes.latitude;
							globMap.centerAndZoom(new BMap.Point(longitude, latitude), mapLeave);
						}
					});
			}
			
			function createOverlay() {
				var nodes = $('#menu_tree').tree('getChecked');
				globMap.clearOverlays();
				var number = 0;
				var centerFlag = true;
				for (var i = 0; i < nodes.length; i++) {
					var node = nodes[i];
					if (node.attributes.type == 1) {
						number += 1;
						var longitude = node.attributes.longitude;
						var latitude = node.attributes.latitude;
						if (centerFlag) {
							globMap.centerAndZoom(new BMap.Point(longitude, latitude), mapLeave);
							centerFlag = false;
						}
						var labelInfo = "<input type='hidden' id='parkId' value=" + node.attributes.id + ">" + node.text;
						var labellength = (node.text).length*12.3;
						var label = new BMap.Label(labelInfo, {
							offset : new BMap.Size(20, -10),							
						});
						label.setStyle({ //给label设置样式，任意的CSS都是可以的
							width:labellength+"px", //宽
						});
						var marker = new BMap.Marker(new BMap.Point(longitude, latitude));
						marker.setLabel(label);

						var sContent = "<h5 style='margin:0 0 5px 0;padding:0.2em 0'>" + node.text + "</h5>"
								+ "<a href='#'  style='margin-left:15px;margin-top:15px;' onclick='modifyLocation()'>修改位置</a>"
								+ "<a href='#' style='margin-left:15px;margin-top:15px;' onclick='detailInfo()'>查看详细</a>"
								+ "</div>";
						addClickHandler(sContent, marker);
						
						globMap.addOverlay(marker);
					}
				}
				if (centerFlag){
					globMap.centerAndZoom(new BMap.Point(cityCenterLon, cityCenterLat), mapLeave);
				}
			}
			
			var opts = {
				width : 250, // 信息窗口宽度
				height : 80, // 信息窗口高度
				title : " ", // 信息窗口标题
				enableMessage : false
			// 设置允许信息窗发送短息
			};
			
			function addClickHandler(content, marker) {
				marker.addEventListener("click", function(e) {
					globMarker = marker;
					openInfo(content, e, marker)
				});
			}
			function openInfo(content, e, merker) {
				var p = e.target;
				var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
				var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象
				merker.openInfoWindow(infoWindow, point); // 开启信息窗口
			}
			
			function modifyLocation(e) {
				$.messager.confirm(
								'修改停车点位置',
								'点击确认后可拖动停车点标识',
								function(r) {
									if (r) {
										globMarker.enableDragging();
										globPoint = globMarker.getPosition();
										globMarker.closeInfoWindow();
										globMarker
												.addEventListener(
														'dragend',
														function(type, target, pixel, point) {
															var p = type.target;
															globLon = p.getPosition().lng;
															globLat = p.getPosition().lat;
															var point = new BMap.Point(
																	globLon, globLat);
															var content = "<h5 style='margin:0 0 5px 0;padding:0.2em 0'>确认新停车点的位置</h5>"
																	+ "<a href='#' style='margin-left:15px;margin-top:15px;'   onclick='confirmLocation()'>确定</a>"
																	+ "<a href='#' style='margin-left:15px;margin-top:15px;'  onclick='returnOriginal()'>取消</a>"
																	+ "</div>";
															var infoWindow = new BMap.InfoWindow(
																	content, opts);
															globMarker
																	.openInfoWindow(infoWindow);
														});
									}
								});
			}
			
			function confirmLocation() {
				var label = globMarker.getLabel().content.toString();
				var start = label.lastIndexOf("=") + 1;
				var end = label.lastIndexOf(">");
				var idValue = label.substring(start, end);
				var point = globMarker.getPosition();
				var longitude = point.lng;
				var latitude = point.lat;
				$.ajax({
					url : 'updateParkAdddress.do',
					type : 'post',
					data : {
						id : idValue,
						newLon : longitude,
						newLat : latitude
					},
					success : function(result) {
						$.messager.show({
							title : '提示',
							msg : result.msg
						})
						if (result.success) {
							globMarker.disableDragging();
							globMarker.closeInfoWindow();
						}
					}
				})
			}
			
			function detailInfo() {
				var label = globMarker.getLabel().content.toString();
				var start = label.lastIndexOf("=") + 1;
				var end = label.lastIndexOf(">");
				var idValue = label.substring(start, end);
				$.ajax({
	                url:basePath+'/action/park/getId.do',
	                type:"post",
	                data:{id:idValue},
	                success: function(result) {
	                    var data=result.data;
	                    $('#id').val(data.id);
	                    $('#region_select1').val(data.regionId);
	                    set_street(data.regionId,1);
                        $('#street_select1').val(data.streetId);
                        set_departmentName(data.regionId,1);
                        $('#departmentName1').val(data.departmentId);
                        $('#parkName1').val(data.parkName);
                        $('#parkCodeText').val(data.parkCode);
                        $('#areaType').val(data.areaType);
                        $('#parkType1').val(data.parkType);
                        $('#parkMode1').val(data.parkMode);
                        $('#isValid1').val(data.isValid);
                        $('#address').val(data.address);
                        $('#editFormLongitude').val(data.longitude);
                        $('#editFormlatitude').val(data.latitude);
                        
                        $('#id').attr("disabled","disabled");
	                    $('#region_select1').attr("disabled","disabled");
                        $('#street_select1').attr("disabled","disabled");
                        $('#departmentName1').attr("disabled","disabled");
                        $('#parkName1').attr("disabled","disabled");
                        $('#parkCodeText').attr("disabled","disabled");
                        $('#areaType').attr("disabled","disabled");
                        $('#parkType1').attr("disabled","disabled");
                        $('#parkMode1').attr("disabled","disabled");
                        $('#isValid1').attr("disabled","disabled");
                        $('#address').attr("disabled","disabled");
                        $('#editFormLongitude').attr("disabled","disabled");
                        $('#editFormlatitude').attr("disabled","disabled");
                        $("#edit_modif_save").hide();
                        $("#longitude_latitude_map").hide();
                        $('#edit').modal('show');
	                }
	            });
			}
			
			function returnOriginal() {
				globMarker.closeInfoWindow();
				globMarker.setPosition(globPoint);
			}
			
			function closeDisable(){
				$('#id').attr("disabled","disabled");
                $('#region_select1').removeAttr("disabled");
                $('#street_select1').removeAttr("disabled");
                $('#departmentName1').removeAttr("disabled");
                $('#parkName1').removeAttr("disabled");
                $('#parkCodeText').removeAttr("disabled");
                $('#areaType').removeAttr("disabled");
                $('#parkType1').removeAttr("disabled");
                $('#parkMode1').removeAttr("disabled");
                $('#isValid1').removeAttr("disabled");
                $('#address').removeAttr("disabled");
                $('#editFormLongitude').removeAttr("disabled");
                $('#editFormlatitude').removeAttr("disabled");
                $('#longitude_latitude_map').show();
                $('#edit_modif_save').show();
			}
