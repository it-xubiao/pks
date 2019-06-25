 $(function () {
		    //1.初始化Table
		    var oTable = new TableInit();
		    oTable.Init();
		  
		    //2.初始化Button的点击事件
		    var oButtonInit = new ButtonInit();
		    oButtonInit.Init();
		    
		    //3.初始化表单的验证
		    var oFormInit = new FormInit();
		    oFormInit.Init();

		  
		  });
 function resetFF(){
	 $('#departmentName0').attr('disabled','disabled');
 }
	   var sex_format = function(value,row,index){  
         if(value==0){
        	 return "女";
         } 
         return "男";  
      } 
	  
	  var type_format = function(value,row,index){  
         if(value==1){
        	 return "收费员";
         }else if(value==2){
        	 return "监察员"; 
         }
      }
	  var valid_format = function(value,row,index){  
	         if(value==0){
	        	 return "有效";
	         }else{
	        	 return "无效"; 
	         }
	  } 
	  
	  var TableInit = function () {
	    var oTableInit = new Object();
	    //初始化Table
	    oTableInit.Init = function () {
	      $('#data_list_table').bootstrapTable({
	        url: basePath+ '/action/collector/dataList.do',     //请求后台的URL（*）
	        method: 'post',           //请求方式（*）
	        toolbar: '#toolbar',        //工具按钮用哪个容器
	        striped: true,           //是否显示行间隔色
	        cache: false,            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
	        showRefresh:false,    
	        showToggle:false,
	        showColumns:false,
	        pagination: true,          //是否显示分页（*）
	        sortable: true,           //是否启用排序
	        //sortName:"bc.id",     //排序字段名称
	        sortOrder: "desc",          //排序方式
	        queryParamsType:'limit',
	        queryParams: oTableInit.queryParams,
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
	        columns: [ 
                    {field: 'state', checkbox:true,align:'center',valign:'middle'},
                    {field : 'regionName',title : '区域名称',align:'center',valign:'middle',sortable:true},
                    {field: 'name',title: '姓名', align:'center',valign:'middle',sortable:true},
					{field: 'account',title: '账号', align:'center',valign:'middle',sortable:true},
					{field : 'departmentName', title : '所属部门', align:'center',valign:'middle',sortable:true}, 
					{field : 'groupName', title : '所属小组', align:'center',valign:'middle',sortable:true}, 
					{field : 'code', title : '收费员编码', align:'center',valign:'middle',sortable:true}, 
					{field : 'gender', title : '性别', align:'center',valign:'middle', formatter:sex_format}, 
					{field : 'type', title : '类型', align:'center',valign:'middle',formatter:type_format}, 
					{field: 'phone',title: '手机号', align:'center',valign:'middle',sortable:true},
					{field: 'homeAddress',title: '家庭地址', align:'center',valign:'middle'},
					{field: 'isValid',title: '是否有效',align:'center',valign:'middle',formatter:valid_format}
	             ],
	             
            //签到记录查询
            detailFormatter:function(index, row) {
             /* var html = [];
              $.each(row, function (key, value) {
                html.push('<p><b>' + key + ':</b> ' + value + '</p>');
              });
              return html.join('');*/
              return '<div style="padding:2px"><table id="detailDiv'
                      + index + '" class="ddv"></table></div>';
            },
            onExpandRow : function(index, row, detail) {
              var ddv = detail.find('table.ddv');
              ddv.bootstrapTable({
                url: basePath+ '/action/collector/queryDutyByCollectorId.do?collectorId='+row.id,     //请求后台的URL（*）
                method: 'get',           //请求方式（*）
                striped: true,           //是否显示行间隔色
                cache: false,            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）             
                pagination: true,          //是否显示分页（*）
                sortable: true,           //是否启用排序
                sortOrder: "desc",          //排序方式
                queryParamsType:'limit',
                queryParams :oTableInit.queryChildParams,
                sidePagination: "server",      //分页方式：client客户端分页，server服务端分页（*）
                pageNumber:1,            //初始化加载第一页，默认第一页
                pageSize: 10,            //每页的记录行数（*）
                pageList: [10, 25],    //可供选择的每页的行数（*）
                strictSearch: true,
                clickToSelect: true,        //是否启用点击选中行
//     	        height: 460,            //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
                uniqueId: "id",           //每一行的唯一标识，一般为主键列
                cardView: false,          //是否显示详细视图
                detailView: false,          //是否显示父子表                
                columns: [
                      /*{field: 'state', checkbox:true},*/
                      {field: 'id',title: '序号',align:'center',valign:'middle'},
                      {field: 'parkName',title: '停车点',align:'center',valign:'middle',sortable:true},
                      {field: 'status',title: '签到状态', align:'center',valign:'middle',sortable:true,formatter : sys.dicts.text('DUTY_STATUS')},
                      {field: 'checkinTime',title: '签到时间', align:'center',valign:'middle',sortable:true},
                      {field: 'checkoutTime',title: '签退时间', align:'center',valign:'middle',sortable:true}
                ],
                //行双击事件
       	        onDblClickRow: function (row,index) {
   	            	 return false;
   	            	/* swal({
   	            		 	title:"提示",
   	            		 	text: '您双击了第'+index[0].rowIndex+'行,执行事件：onDblClickRow,行内数据：  ' + JSON.stringify(row)
   	            	}) ;*/
       	        },       	          
       	        rowStyle: function (row, index) {
 	                 //这里有5个取值代表5中颜色['active', 'success', 'info', 'warning', 'danger'];
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
		        regionId : $("#region_select0").val(),
		        departmentId :$("#departmentName0").val(),
		        groupId :$("#collectorGroupId").val(),
		        date: $("#codeType").val(),
		        name: $("#collectorName").val(),
		        phone:$("#collectorPhone").val(),
		        code:$("#collectorCode").val(),

		      };
		      return temp;
		    };
		    
		    oTableInit.queryChildParams = function (params) {
			      var temp = { 
			        page : params.offset==0 ? 1:(params.offset/params.limit)+1,
			        rows: params.limit, //页码
			        sort : params.sort
			      };
			      return temp;
			    };
		    
	    return oTableInit;
	  };
	  
	  
	  
	  // 搜索事件
	  function searchSubmit(){
		  $('#data_list_table').bootstrapTable('refresh',{url:basePath+ '/action/collector/dataList.do',query:{page:1}});
	  }
	  
	  
//删除操作
function deleteData(){
			 var ids = '';
			 var names = '';
			 var nameStr='';
			 var rows=$('#data_list_table').bootstrapTable('getAllSelections');
			 var getSelections = $('#data_list_table').bootstrapTable('getSelections');
			 for(var i=0;i<getSelections.length;i++){
					ids = getSelections[i].id+ids+"";
					//names =getSelections[i].name+names+"";
					names=getSelections[i].name;
					nameStr=names+" "+nameStr;
			 }
		if(ids!=''&&getSelections.length==1){
		   swal({
			   title: "删除提醒",
			   text: "确认删除收费员"+nameStr+"数据吗？",
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
					   url:  basePath+ '/action/collector/delete.do',
					   type:"post",
					   data:{id:rows[0].id},
					   dataType:'json',
					   success:function(data){
						   if(data.success){
							   swal("成功", "删除成功");
							   if(rows.length != $('#data_list_table').bootstrapTable("getData").length){
								   $('#data_list_table').bootstrapTable("refresh");    
							   }else{
								   searchSubmit();
							   }			   
						   }else{
							   swal("失败", data.msg);
						   }
					   },
					   error:function(data){
						   swal("错误", data.responseText, "error");
					   }
				   });				   
			   }
			 });
		}else{
			swal("提示","请选择一条数据！");
		}
			
	 }

	  
	  
	  var ButtonInit=function(){
		    var oButtonInit = new Object();
		    //初始化Table
		    oButtonInit.Init = function () {
		    	
		    	 $('#reset').click(function(){
		             var ids="" ;
		             var names=[];
		             var rows=$('#data_list_table').bootstrapTable('getAllSelections');
		             if(rows.length<=0){
		                 swal("提示","请选择一条数据！");
		                 return;
		             }else{
		                 for(var i=0;i<rows.length;i++){
		                     ids+=rows[i].id+";";
		                     names.push(rows[i].name);
		                 }
		                 swal({
		                         title: "重置提醒",
		                         text: "你确定要重置收费员"+names+"的密码吗？",
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
		                                 url:basePath+'/action/collector/reset.do',
		                                 type:"post",
		                                 data:{"collector":ids},
		                                 traditional:true,
		                                 success : function(data) {
		                                	 if(data.success){
			             						swal("成功", "重置成功");
			             						$('#data_list_table').bootstrapTable("refresh");
		                                	 }else{
		                                		 swal("失败", data.msg);
		                                	 }
		             					},
		         					    error:function(data){
		        						   swal("错误", data.responseText, "error");
		        					    }
		                             });
		                         }
		                     });


		             }


		         })


		        $('#modify').click(function(){

		            var rows=$('#data_list_table').bootstrapTable('getAllSelections');
		            if(rows==null||rows.length>1 || rows.length<=0){
		            	swal("提示","请选择一条数据！");
		                return ;
		            }
		            $.ajax({
		            	url:  basePath+ '/action/collector/getId.do',
		                type:"post",
		                data:{id:rows[0].id},
		                success: function(result) {
		                    var data=result.data;
		                        $('#id').val(data.id);
		                        $('#region_select1').val(data.regionId);
		                        set_departmentName(data.regionId,1);
		                        $('#departmentName1').val(data.departmentId);
		                        $('#collectorGroupId1').val(data.groupId);
		                        $('#code').val(data.code);
		                        $('#name').val(data.name);
		                        $('#type').val(data.type);
		                        $('#gender').val(data.gender);
		                        $('#isValid').val(data.isValid);
		                        $('#phone').val(data.phone);
		                        $('#account').val(data.account);
		                        $('#homeAddress').val(data.homeAddress);
		                        $('#identityCode').val(data.identityCode);
		                        
		                        
		                        $('#edit').modal('show'); 
		                }
		            });

		        })
		        
		   function clearForm(form) {
				  $(':input', form).each(function() {
				    var type = this.type;
				    var tag = this.tagName.toLowerCase(); // normalize case
				    if (type == 'text' || type == 'password' || tag == 'textarea')
				      this.value = "";
				    else if (tag == 'select')
				      this.selectedIndex = 0;
				  });
			};
		        
			        $('#searchBtn').click(function(){
			
			            $('#data_list_table').bootstrapTable("refresh");
			
			        })
			        
			       /*$('#resetBtn').click(function() {
		               $('#defaultForm').data('bootstrapValidator').resetForm(true);
		            });*/



			        $('#edit').on('hidden.bs.modal', function () {
			            $('#defaultForm').bootstrapValidator('resetForm', true);
			           /* $('#defaultForm').updateStatus( 'NOT_VALIDATED')*/
			        })
			        
			        //　模态框关闭事件　清空from表单数据和验证
			        $('.modal').on('hide.bs.modal', function () {
			        	clearForm($(this).find("form[name=form]")[0]);
			        	$(this).find("form").data('bootstrapValidator').resetForm(true);
			        })

		    }

		    return oButtonInit;
		}

	  var FormInit=function(){
		    var oFormInit = new Object();
		    //初始化Table
		    oFormInit.Init = function () {


		        $('#defaultForm').bootstrapValidator({
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
			                    },
			                }
			            },
			            departmentId: {
			            	validators: {
			            		notEmpty: {
			            			message:"请选择所属部门"
			            		},
			            	}
			            },
			            groupId: {
			                validators: {
			        			Empty: {
			        				message:"请选择小组名称"
			                    },
			                }
			            },
			            account: {
			                validators: {
			            		notEmpty: {
			            			message:"请输入账号"
			            		},
					            stringLength: {
					                min: 1,
					                max: 10,
					                message:"输入内容长度必须介于1到10之间."
					            }
			                }
			            },
			            code: {
			                validators: {
			            		notEmpty: {
			            			message:"请输入收费员编码"
			            		},
					            stringLength: {
					                min: 1,
					                max: 10,
					                message:"输入内容长度必须介于1到10之间."
					            }
			                }
			            },
			            name: {
			                validators: {
			            		notEmpty: {
			            			message:"请输入姓名"
			            		},
					            stringLength: {
					                min: 1,
					                max: 10,
					                message:"输入内容长度必须介于1到10之间."
					            }
			                }
			            },
			            status: {
			                validators: {
			                    notEmpty: {
			            			message:"请选择状态."
			                    }
			                }
			            },
			            type: {
			                validators: {
				            	notEmpty: {
				    				message:"请输入类型"
			            		},
				            }
			            },
			            gender: {
			                validators: {
				            	notEmpty: {
				    				message:"请输入性别"
			            		},
				            }
			            },
			            isVaild: {
			                validators: {
				            	notEmpty: {
				    				message:"请输入是否有效"
			            		},
				            }
			            },
			            phone: {
			                validators: {
			        			notEmpty: {
			        				message:"请输入联系方式"
			                    },
			                    stringLength: {
			                        max: 11,
			                        message:"手机号码的长度不能超过11位."
			                    },
			            		phone: {
			            			country: 'CN',
			        				message:"请输入有效的手机号码."	
			            		}
			                }
			            },
			           homeAddress: {
			                validators: {
				            	Empty: {
				    				message:"请输入家庭住址"
			            		},
				            }
			            },
			            
			            identityCode: {
			                validators: {
				            	Empty: {
				    				message:"请输入身份证号"
			            		},
				            }
			            },
			        }


		        }).on('success.form.bv', function(e) {
		            $.ajax({
		            	url:basePath+'/action/collector/save.do',
		                data:$('#defaultForm').serialize(),
		                type:"post",
		                asyna:false,
		                dataType:'json',
		                success: function(data){
		                    if(data.success){
		                        swal("成功",data.msg);
		                        $('#edit').modal('hide');
		                        $('#data_list_table').bootstrapTable("refresh");
		                    }else{
		                    	swal("失败",data.msg);
		                    }
		                 },
		                 error:function(data){
		                	 swal("错误",data.responseText,"error");
		                 }
		            });
		            return false;
		        });
		    }
		    return oFormInit;
		}
	  
	  


		    