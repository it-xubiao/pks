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
	  
	  var TableInit = function () {
	    var oTableInit = new Object();
	    //初始化Table
	    oTableInit.Init = function () {
	      $('#data_list_table').bootstrapTable({
	        url: basePath+ '/action/collectorGroup/dataList.do',     //请求后台的URL（*）
	        method: 'post',           //请求方式（*）
	        toolbar: '#toolbar',        //工具按钮用哪个容器
	        striped: true,           //是否显示行间隔色
	        cache: false,            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
	        showRefresh:false,    
	        showToggle:false,
	        showColumns:false,
	        pagination: true,          //是否显示分页（*）
	        sortable: true,           //是否启用排序
	        //sortName:"",     //排序字段名称
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
	        contentType: "application/x-www-form-urlencoded",
	        columns: [ 
	                {field: 'state', checkbox:true,align:'center',valign:'middle'},
					{field: 'id',title: '序号',align:'center',valign:'middle'},
					{field: 'regionName',title: '区域名称',width:100,align:'center',valign:'middle',sortable:true},
					{field: 'departmentName',title: '部门名称', align:'center',valign:'middle',sortable:true},
					{field: 'groupCode',title: '小组编码', align:'center',valign:'middle',sortable:true},
					{field: 'groupName',title: '小组名称', align:'center',valign:'middle',sortable:true},
					{field: 'leader',title: '负责人', align:'center',valign:'middle',sortable:true},
					{field: 'phone',title: '联系电话', align:'center',valign:'middle',sortable:true},

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
	        regionId : $("#region_select0").val(),
	        departmentId: $("#departmentName0").val(),
	        date: $("#codeType").val(),
	        groupName:$("#group").val(),
	        leader:$("#leaderName").val(),
// 	        tradetype:$('input:radio[name="tradetype"]:checked').val(),
// 	        success:$('input:radio[name="success"]:checked').val(),
	      };
	      return temp;
	    };
	    return oTableInit;
	  };
	  
	  function clearTreeData() {
			$(".tree-checkbox1").removeClass("tree-checkbox1").addClass("tree-checkbox0");
			$(".tree-checkbox2").removeClass("tree-checkbox2").addClass("tree-checkbox0");
	  }
	  
	  var ButtonInit=function(){
		    var oButtonInit = new Object();
		    //初始化Table
		    oButtonInit.Init = function () {
		        $('#delete').click(function(){
		            var ids=[] ;
		            var names=[];
		            var rows=$('#data_list_table').bootstrapTable('getAllSelections');
		            if(rows.length<=0){
		                swal("提示","请选中一条记录！");
		                return;
		            }else{
		                for(var i=0;i<rows.length;i++){
		                    ids.push(rows[i].id)
		                    names.push(rows[i].groupName);
		                }
		                swal({
		                        title: "删除提醒",
		                        text: "你确定要删除收费组"+names+"吗？",
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
		                                url:basePath+'/action/collectorGroup/delete.do',
		                                type:"post",
		                                data:{"id":ids},
		                                traditional:true,
		                                success : function(result) {
		                                	if(result.success){
			             						swal("成功", result.msg);
		                                		 if(rows.length != $('#data_list_table').bootstrapTable("getData").length){
		                                			 $('#data_list_table').bootstrapTable("refresh");    
		                                		 }else{
		                                			 searchSubmit();
		                                		 }
		                                	}else{
		                                		swal("失败", result.msg);
		                                	}
		             					},
		             					error : function(result) {
		             						swal("错误",result.errorMsg,"error");
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
		            	url:  basePath+ '/action/collectorGroup/getId.do',
		                type:"post",
		                data:{id:rows[0].id},
		                success: function(result) {
		                    var data=result.data;
		                        $('#id').val(data.id);
		                        $('#region_select1').val(data.regionId);
		                        set_departmentName(data.regionId,1);
		                        $('#departmentName1').val(data.departmentId);
		                        $('#groupName').val(data.groupName);
		                        $('#phone').val(data.phone);
		                        $('#leader').val(data.leader);
		                        $('#edit').modal('show'); 
		                        
		                        
		                        clearTreeData();						
								for(var i = 0;i < result.collectors.length ;i++){
									var node = $('#menu_tree').tree("find","collectorId"+result.collectors[i].id);
									$('#menu_tree').tree('check',node.target);
								}
		                }
		            });

		        })
		        $('#searchBtn').click(function(){
					
		            $('#data_list_table').bootstrapTable("refresh");
		
		        })
		        
		        $('#resetBtn').click(function() {
	               $('#defaultForm').data('bootstrapValidator').resetForm(true);
	            });



		        $('#edit').on('hidden.bs.modal', function () {
		            $('#defaultForm').bootstrapValidator('resetForm', true);
		            clearTreeData();
		            $("#id").val("");
		           /* $('#defaultForm').updateStatus( 'NOT_VALIDATED')*/
		        })
		        
		        //　模态框关闭事件　清空from表单数据和验证
			    $('.modal').on('hide.bs.modal', function () {
			        //alert(11);
			    $(this).find("form").data('bootstrapValidator').resetForm(true);
			    })


		    }

		    return oButtonInit;
		}
	    // 搜索事件
	  function searchSubmit(){
		  $('#data_list_table').bootstrapTable('refresh',{url:basePath+ '/action/collectorGroup/dataList.do',query:{page:1}});
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
				        	departmentId: {
				                validators: {
				        			notEmpty: {
				        				message:"请选择所属部门"
				                    },
				                }
				            },
				            regionId: {
				                validators: {
				        			notEmpty: {
				        				message:"请选择所属区域"
				                    },
				                }
				            },
				            groupName: {
				                validators: {
				        			notEmpty: {
				        				message:"请输入小组名称"
				                    },
				                }
				            }
				        }


		        }).on('success.form.bv', function(e) {
		        	var nodes = $('#menu_tree').tree('getChecked');
					console.log(nodes);
					var id="";
					for(var i=0 ;i< nodes.length ;i++){
						if (nodes[i].id != null) {
							if (nodes[i].id.indexOf("collectorId") == 0) {
								id += nodes[i].id.split("collectorId")[1] + ",";
							}
						}
					}
//业务需求，不用选择收费员也能保存 2016-06-06 jx
//					if(id==""){
//						swal("","请选择收费员！","warning");
//						return false;
//					}else{
						$("#collectorIds").val(id);
						$.ajax({
			            	url:basePath+'/action/collectorGroup/save.do',
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
//					}
		            return false;
		        });
		    }
		    return oFormInit;
		}
