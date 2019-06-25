var globLon = "";
var globLat = "";
var globMap = "";
var globMarker = "";
var globPoint = "";
var globGeoc = "";
//默认缩放级别
var mapLeave = 16;
var locationData;
var collectors = new Array();


function hourscharge(result){
	$('#lineChart_sf').remove(); // this is my <canvas> element
	$('#lineChart_sf_pernet').append('<canvas id="lineChart_sf" style="height: 227px; width: 659px;"></canvas>');
	
	var chargedata = new Array();
	for(var i=0;i<(result.data).length;i++){
		chargedata[i] = (result.data)[i]/100;
	}
	//lineChartData_sf.datasets[0].data=chargedata;
	//lineChartData_sf.labels=result.lable;
	var lineChartData_sf = {
        labels:result.lable,
        datasets: [
        {
          label: "收费",
          fillColor : "#FF0000 ", // 背景色
          strokeColor : "#43b1d6", // 线
          pointColor : "#43b1d6", // 点
          pointStrokeColor : "#fff", // 点的包围圈
          data:chargedata//Y轴
        }
      ]
	};
	var lineChartOptions = {
		 showScale: true,
		 scaleShowGridLines: false,
		 scaleGridLineColor: "rgba(0,0,0,.05)",
		 // Y/X轴的颜色
		 //scaleLineColor : "rgba(223,223,223)",
		 // 字体
		 scaleFontFamily : "'Arial'",
		 scaleGridLineWidth: 1,
		 scaleShowHorizontalLines: true,
		 scaleShowVerticalLines: true,
		 bezierCurve: true,
		 bezierCurveTension: 0.3,
		 pointDot: true,
		 pointDotRadius: 4,
		 pointDotStrokeWidth: 1,
		 pointHitDetectionRadius: 20,
		 datasetStroke: true,
		 datasetStrokeWidth: 2,
		 datasetFill: false,
		 //legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"height:2px;width:20px;background-color:<%=datasets[i].lineColor%>\">---</span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
		 //legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><div style=\"background-color:<%=datasets[i].strokeColor%>;height:3px;width:20px;margin-top:8px;float:left;\"></div><%if(datasets[i].label){%><div style=\"float:left;margin-top: 3px;\"><%=datasets[i].label%></div><%}%><%}%></ul>",
		 maintainAspectRatio: true,
		 responsive: true
	};	
	var lineChartCanvas_sf = document.getElementById("lineChart_sf").getContext("2d");
	new Chart(lineChartCanvas_sf).Line(lineChartData_sf, lineChartOptions);	
}



function close_detail_show(){
    $(".f_detail_wrapper").hide();
}

function formatDate() {
	var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}
$(function() {
	// 地图初始化
	var map = new BMap.Map("locationMap", {enableMapClick: false});
	var longitude = cityLongitude;
	var latitude = cityLatitude;
	map.centerAndZoom(new BMap.Point(longitude, latitude), mapLeave);
	globGeoc= new BMap.Geocoder();    
	globMap = map;
	map.enableScrollWheelZoom(); // 启用滚轮放大缩小，默认禁用
	map.enableContinuousZoom();

	var bottom_left_control = new BMap.ScaleControl({anchor : BMAP_ANCHOR_BOTTOM_LEFT});// 左下角，添加比例尺
	var bottom_left_navigation = new BMap.NavigationControl({anchor : BMAP_ANCHOR_BOTTOM_LEFT}); // 左下角，添加默认缩放平移控件
	map.addControl(bottom_left_control);
	map.addControl(bottom_left_navigation);
	
	// 查询所有在线收费员信息及位置 参数为空
	queryLocation();
	
	//初始化说有收费员数据
	init();
	
	//初始化当前收入之星数据
	getTopCollector();
	
    $(".f_detail_wrapper").on("click", function(){
    	$(this).hide();
    });
    $(".f_detail_show").mouseover(function(){
    	$(".f_detail_wrapper").unbind("click");
    });
    $(".f_detail_show").on("mouseout", function(){
    	$(".f_detail_wrapper").on("click", function(){
	    	$(this).hide();
	    });
    });
});

function checkkey(keys){
	if(keys.ctrlKey && keys.keyCode == 53){
		if(confirm("是否强制刷新缓存")){
			refreshData();
		}
	}
}

function queryLocation(name){
	$("#searchBox").val($(".a_" + name).text());
	globMap.clearOverlays();
	queryLocationinfo(name);
}

function queryLocationinfo(name){	
	jQuery.ajax({
		url:'queryOnlineCollectorLocationByName.do',
		type:'post',
		data:{name:name},
		success:function(result){
			if(result.data){
				jQuery.each(result.data,function(index,obj){
					//7、添加自定义覆盖物  
					var myOverlay =new MyOverlay(obj, 120, 80); 
					globMap.addOverlay(myOverlay); 
					if(result.data.length==1){
						var longitude = obj.LONGITUDE;
						var latitude = obj.LATITUDE;
						globMap.setCenter(new BMap.Point(longitude, latitude), 19);
					}
					//8、 为自定义覆盖物添加点击事件  
					myOverlay.addEventListener('click',function(){
						getCollectorInfo(obj.ID);
					});  
				});				
			}
		}
	});
}

function getCollectorInfo(id){
	var bool = true;
//	if(collectors.length!=0){
//		for(var i=0;i<collectors.length;i++){
//			if(typeof collectors[i] =='object'){
//				var collector = collectors[i];
//				var collectorId = collector.id;
//				var result = collector.result;
//				if(id==collectorId){
//					setCollectorInfo(result);
//					bool = false;
//					break;
//				}
//			}
//		}
//	}	
	if(bool){
		getCollector_Info(id);
	}
}

function getCollector_Info(id){
	jQuery.ajax({
		url:'getCollectorInfo.do',
		type:'post',
		data:{"collectorId": id},
		success:function(result){
			setCollectorInfo(result);
		}
	}); 
	init();
}

function setCollectorInfo(result){
	if($(".f_detail_wrapper").css('display')=='none'){
		jQuery(".f_detail_wrapper").slideDown(200);
	}	
	if(result.name){						
		if(!result.name==""){
			jQuery("#name").text(result.name);
		}else{
			jQuery("#name").text("暂未获取到姓名");
		}
		if(!result.phone==""){
			jQuery("#phone").text(result.phone);
		}else{
			jQuery("#phone").text("暂未获取到手机号");
		}
		if(!result.photoNum==""){
			jQuery("#photoNum").text(result.photoNum);
		}else{
			jQuery("#photoNum").text("0");
		}
		if(!result.plateNum==""){
			jQuery("#plateNum").text(result.plateNum);
		}else{
			jQuery("#plateNum").text("0");
		}
		if(!result.sumAmount==""){
			jQuery("#sumAmount").text(result.sumAmount/100);
		}else{
			jQuery("#sumAmount").text("0");
		}
		if(!result.normalAcount==""){
			jQuery("#normalAcount").text(result.normalAcount);
		}else{
			jQuery("#normalAcount").text("0");
		}												
		if(!result.sheduleStartTime=="" && !result.sheduleEndTime==""){
			jQuery("#scheduleTime").text(result.sheduleStartTime+"　至　"+result.sheduleEndTime);
		}else{
			jQuery("#scheduleTime").text("暂未获取到排班信息");
		}
		if(!result.checkinTime==""){
			jQuery("#checkinTime").text(result.checkinTime);
		}else{
			jQuery("#checkinTime").text("暂未获取到签到信息");
		}
		hourscharge(result);
	}else{
		swal("", "获取收费员信息失败，请联系管理员！", "error");
	}

}

function getTopCollector(){
	var dataDate = formatDate();
	jQuery.ajax({
		url:basePath+'/action/homeStat/getOverviewJson.do',
		type:'post',
		data:{dataDate:dataDate},
		success:function(result){		
			jQuery(".my-table tbody").html("");
			if(result.length!=0){
				var rankList = result[0].topCollector;
				rankList = eval('('+rankList+')');
				var collectorsTop = rankList.collectorsTop;
				var totalChargeFee = rankList.totalChargeFee;
				var length=collectorsTop.length;
				var x=1;
				for(var i=length-1;i>=2;i--){
					var index=x;
					x++;
					if(totalChargeFee[i]>0){
						jQuery(".my-table").append("<tr class='table_tr'><td>"+index+"</td><td>"+collectorsTop[i]+"</td><td>"+totalChargeFee[i]+"</td></tr>");						
					}else{
						jQuery(".my-table").append("<tr class='table_tr'><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>");						
					}
				}
			}else{
				jQuery(".my-table").append("<tr height=\"100\"><td colspan=\"3\">暂未获取到数据</td></tr>");
			}
		}
	});  
}

function init(){
	collectors = new Array();
	jQuery.ajax({
		url:'getCheckInCollectorInfoFromMemcache.do',
		type:'post',
		async:false,
		success:function(result){
			var data = result.data;
			if(data==null){
				initData();
				refreshData();
			}else if(data.length==0){
				initData();
				refreshData();
			}else{
				jQuery.each(data,function(index,obj){
					var collector = new Object();
					collector.id = obj.id;
					collector.result = obj;
					collectors[index] = collector;
				});
			}			
		}
	});
}

function refreshData(){
	jQuery.ajax({
		url:'refreshCollectorInfo_Memcache.do',
		type:'post',
		success:function(result){
			var data = result.data;			
			jQuery.each(data,function(index,obj){
				var collector = new Object();
				collector.id = obj.id;
				collector.result = obj;
				collectors[index] = collector;
			});
		}
	});
}

function initData(){
	collectors = new Array();
	jQuery.ajax({
		url:'queryOnlineCollectorLocationByName.do',
		type:'post',
		async:false,
		success:function(result){
			jQuery.each(result.data,function(index,obj){
				var collectorId = obj.ID;
				jQuery.ajax({
					url:'getCollectorInfo.do',
					type:'post',
					data:{"collectorId": collectorId},
					success:function(result){
						var collector = new Object();
						collector.id = collectorId;
						collector.result = result;
						collectors[index] = collector;
					}
				});
			});
		}
	});
}

function buildData(rows){
	var ids = "";
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		ids += row.id + ";";
	}
	
	$.ajax({
		url:'getCollectorsPositon.do',
		type:'post',
		data : {
			ids : ids
		},
		success:function(result){
			locationData = result;
		}
	});
}
var myIcon = new BMap.Icon(basePath + "/assets/images/ext_icons/user/user.png", new BMap.Size(15,15),{imageSize : new BMap.Size(15, 15)});
function createOverlay() {
	var rows = $('#collectorTree').datagrid('getChecked');
	globMap.clearOverlays();
	var centerFlag = true;
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		var id = row.id;
		if (locationData[id] != null) {
			var name = row.name;
			var phone = row.phone;
			var position = locationData[id];
			var longitude = position.long;
			var latitude = position.lat;
			var updateTime = position.createTime;
			if(position.updateTime){
				updateTime = position.updateTime;
			}
			var label = new BMap.Label(name,{offset:new BMap.Size(20,-10)});
			var marker = new BMap.Marker(new BMap.Point(longitude,latitude),{icon:myIcon});
			marker.setLabel(label);
			var point = new BMap.Point(longitude,latitude);
			
			var locationInfo = "";
			var sContent = "";
			globGeoc.getLocation(point, function(rs){
				var addComp = rs.addressComponents;
				locationInfo = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
				sContent =
					"<h5 style='margin:0 0 5px 0;padding:0.2em 0'>"+ name+"</h5>" + 
					"<p style='margin:0 0 2px 0;padding:0.1em 0' >联系号码："+ phone +"</p><br>"+
					"<p style='margin:0 0 2px 0;padding:0.1em 0'>定位时间："+ updateTime +"</p><br>"+
					"<p style='margin:0 0 2px 0;padding:0.1em 0'>当前位置："+ locationInfo +"</p>"+
					"</div>";
				addClickHandler(sContent,marker);
				globMap.addOverlay(marker);
			});
			if(centerFlag){
				globMap.centerAndZoom(new BMap.Point(longitude, latitude), 14);
				centerFlag = false;
			}
		}else{
			$.messager.show({
				titlr:'提示',
				msg:'收费员'+row.name+"没有位置信息"
			});
		}
	}	
}

var opts = {
		width : 250,     // 信息窗口宽度
		height: 140,      // 信息窗口高度
		title : " " , 	 // 信息窗口标题
		enableMessage:false//设置允许信息窗发送短息
};

function addClickHandler(content,marker){
	marker.addEventListener("click",function(e){
		globMarker = marker;
		openInfo(content,e,marker);}
	);
}

function openInfo(content,e,merker){
	var p = e.target;
	var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
	var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
	merker.openInfoWindow(infoWindow,point); //开启信息窗口
}

// 测距
function calcDis() {
	var myDis = new BMapLib.DistanceTool(globMap);
	myDis.open();
}
// 重置地图
function refreshMap() {
	globMap.reset();
}
//轨迹显示
function showTrace(){
	//dataList.getSelectRow()-->rows
	//rows.length == ! ?
	//row[0].id --> collectorId
	//$.ajax :url,param return:list<positon>
	//for(list):Point[]
	var rows = $("#collectorTree").datagrid('getChecked');
	var createTimeFrom=$("#createTimeFrom").datetimebox('getValue');
	var createTimeTo=$("#createTimeTo").datetimebox('getValue');
	if(rows.length == 1){
		var collecctorId = rows[0].id;
		$('#locationMap').panel({
			title:rows[0].id+":"+rows[0].name+"的轨迹"
		});
		$.ajax({
			url:'getCollectorsPositonAll.do',
			type:'post',
			data : {
				collectorId : collecctorId,
				createTimeFrom : createTimeFrom,
				createTimeTo : createTimeTo
			},


			success:function(result){
				drawLine(result.points);
			}
		});
	}else{
		
		$.messager.show({
			titlr:'提示',
			msg:"请选择一个收费员进行查看"
		});
	}
	
	
}


function drawLine(points){
	var length = points.length;
	var pointsArray = new Array();
	for(var i = 0;i < length ; i++){
		var point = points[i];
		pointsArray[i] = new BMap.Point(point.long,point.lat);
	}
	var polyline = new BMap.Polyline(pointsArray, {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5}); 
	//var marker = new BMap.Marker(new BMap.Point(point.long,point.lat));
	//globMap.addOverlay(marker);
	globMap.addOverlay(polyline);
}

//收费员搜索
/*function searchCollector(){
	var regionId = $('#regionId_query').combobox('getValue');
	var departmentId = $('#departmentId_query').combobox('getValue');
	var name = $('#name_query').val();
	var param = {
		regionId : regionId,
		departmentId : departmentId,
		name : name
	};
	$('#collectorTree').datagrid('reload',param);
}*/

function searchBerth() {
	$(".f_search_hidden").html("");
    var value = $('#searchBox').val();
    if ($.trim(value) != ""){
    	$.ajax({
    		url:basePath + "/action/location/queryOnlineCollectorLocationByName.do",
    		type:"post",
    		data:{"name": value},
    		dataType:"json",
    		success: function(result){
    			if (result.success){
	    			result = result.data;
	    			if(result){
	    				var s_temp = "";
	    				for(var i = 0; i < 10; i++){
	    					if(result.length >= (i+1)){
	    						s_temp += "<div class='f_search_item'>" 
	    							+ "<a class='a_"+ result[i].NAME + "' onclick='queryLocation(\""+ result[i].NAME +"\")' href='javascript:void(0)'>"+ result[i].NAME + "</a></div>";
	    					}
	    				}
	    				$(".f_search_hidden").html(s_temp);
	    				$(".f_search_hidden").show();	    				
	    			}
    			} else {
    				swal("", result.msg, "warning");
    			}
    		}
    	});
    } else {
    	queryLocation();
    }
}

function searchInfos(){
	$(".f_search_hidden").html("");
    var value = $('#searchBox').val();
    if ($.trim(value) != ""){
    	$.ajax({
    		url:basePath + "/action/location/queryOnlineCollectorLocationByName.do",
    		type:"post",
    		data:{"name": value},
    		dataType:"json",
    		success: function(result){
    			if (result.success){
    				var data = result.data;
    				if(data){    					
    					if(data.length == 0){
    						swal("", "未找到相关收费员", "info");
    					} else if (data.length > 0){
    						$('#searchBox').val(value);
    						globMap.clearOverlays();
    						for(var i = 0; i < data.length; i++){
    							if(data.length >= (i+1)){
    								queryLocationinfo(data[i].NAME);
    							}
    						}
    					}
    				}else{
    					swal("", "未找到相关收费员", "info");
    				}
    			} else {
    				swal("", result.msg, "warning");
    			}
    		}
    	});
    } else {
    	queryLocation();
    }
}
