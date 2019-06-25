  $(function () {
		    //1.初始化Table
		    var oTable = new TableInit();
		    oTable.Init();
		  
		   /* //2.初始化Button的点击事件
		    var oButtonInit = new ButtonInit();
		    oButtonInit.Init(); */
		  
		  });
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
	        url:  basePath+ '/action/CollectorBack/dataList.do',     //请求后台的URL（*）
	        method: 'get',           //请求方式（*）
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
                    {field: 'state', checkbox:true},
					{field: 'id',title: '序号',align:'center',valign:'middle'},
					{field: 'parkName',title: '停车点名称',align:'center',valign:'middle',sortable:true},
					//{field: 'code',title: '个人编号'},
					{field: 'Name',title: '收费员', align:'center',valign:'middle',sortable:true},
					{field: 'deviceCode',title: '设备账号', align:'center',valign:'middle',sortable:true},
					{field: 'isOnline',title: '是否在线',align:'center',formatter:function (value,row,index){
						  if(value==0){ return "离线"; }  return "<font style='font-weight:bold;color:green;'>在线</font>";   
					}},
					{field: 'createTime',title: '登录时间', align:'center',valign:'middle',sortable:true}
					
					//{field: 'creator',title: '创建人'},
					
					//{field: 'creator',title: '创建人'},
					//{field: 'createTime',title: '创建时间'}
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
		   
		  var sort = "";
		  if(params.sort){
			  sort = (params.sort).toLowerCase();
		  }else{
			  sort = params.sort;
		  }
	      var temp = {  //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
	        page : params.offset==0 ? 1:(params.offset/params.limit)+1,  //pageIndex
	        rows: params.limit, //页码
	        sort : sort,
	        order : params.order,
	        date: $("#codeType").val(),
	        id:$("#collectorId").val(),
	        collectorParkId:$("#parkId").val(),
	      };
	      return temp;
	    };
	    return oTableInit;
	  };
	  
	  // 搜索事件
	  function searchSubmit(){
		  $('#data_list_table').bootstrapTable('refresh',{url:basePath+ '/action/CollectorBack/dataList.do',query:{page:1}});
	  }
	  
	  
	//签退操作
	  function updateDate() {
	  	var ids = '';
	  	var names = '';
	  	var nameStr = '';
	  	var param = '';
	  	var rows = $('#data_list_table').bootstrapTable('getAllSelections');
	  	var getSelections = $('#data_list_table').bootstrapTable('getSelections');
	  	for (var i = 0; i < getSelections.length; i++) {
	  		ids = getSelections[i].id + ids + "";
	  		names = getSelections[i].name;
	  		nameStr = names + " " + nameStr;
	  		param+=getSelections[i].parkid+'@';
	  	}
	  	if (ids != '') {
	  		swal({
	  			title : "签退提醒",
	  			text : "你确定要签退收费员？",
	  			type : "warning",
	  			showCancelButton : true,
	  			confirmButtonColor : "#DD6B55",
	  			cancelButtonText : "取消",
	  			confirmButtonText : "确定签退",
	  			closeOnConfirm : false,
	  			closeOnCancel : true
	  		}, function(isConfirm) {
	  			if (isConfirm) {	  				
	  				$.ajax({
	  					url : basePath + '/action/CollectorBack/updateDate.do',
	  					type : "post",
	  					data : {
	  						p:param
	  					},	 
	  					dataType : 'json',
	  					success : function(data) {
	  						if(data.success){
		                        swal("成功",data.msg);
		                        $('#data_list_table').bootstrapTable("refresh");
	  						}else{
	  							swal("失败",data.msg);
	  						}
	  					},
	  					error : function(data) {
	  						swal("错误", data.responseText, "error");
	  					}
	  				});
	  			}
	  		});
	  	} else {
	  		swal("提示", "请选择一条记录");
	  	}
	  }
	  
	  
	  