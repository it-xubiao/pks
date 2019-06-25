//全局经度
var globLon = "";
// 全局纬度
var globLat = "";
// 全局地图对象
var globMap = "";
// 全局覆盖物对象
var globMarker = "";
// 全局Point对象
var globPoint = "";
// 默认缩放级别
var mapLeave = 16;
// 自动刷新的任务ID
var timeoutId = "";
// 城市中心经度
var cityCenterLon = "";
// 城市中心纬度
var cityCenterLat = "";
var sensor = 1;
var gateway = 2;
var reapter = 3;
// true:未展开；false:已展开
var sensorDetailFlag = true;
var monitor_img_url = basePath + "/assets-adminlte/images/monitor";
var dataCount = 0;
var f_len = 768;

$(function () {
    // 地图初始化
    var map = new BMap.Map("mointerMap" ,{enableMapClick:false});

    cityCenterLon = cityLongitude;
    cityCenterLat = cityLatitude;
    map.centerAndZoom(new BMap.Point(cityCenterLon, cityCenterLat), mapLeave);
    globMap = map;
    map.enableScrollWheelZoom(); // 启用滚轮放大缩小，默认禁用
    map.enableContinuousZoom();

    var bottom_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT});// 左下角，添加比例尺
    var bottom_left_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT}); // 左下角，添加默认缩放平移控件

    map.addControl(bottom_left_control);
    map.addControl(bottom_left_navigation);
    
    // 停车点初始化
    initSensor();
    
    // 加载设备数据
    initGateway(gateway);
    initReaptor(reapter);
    
	$(".f_btn_right").on("click", function(){ //点击右按钮向左移
		var f_num = $(".f_detail_li").length;
		if(click_i < (f_num-1)){
			$(".f_detail_li").animate({left:"-" + (click_i + 1) * f_len + "px"}, 600);
			click_i++;
			$(".f_detail_bottom_cont1").eq(click_i).addClass("f_detail_bottom_cont2");
			$(".f_detail_bottom_cont1").eq(click_i - 1).removeClass("f_detail_bottom_cont2");
		}
		btn_status(click_i, dataCount);
	});
	
	$(".f_btn_left").on("click", function(){ //点击左按钮向右移
		if(click_i != 0){
			$(".f_detail_li").animate({left:"-" + (click_i -1) * f_len + "px"}, 600);
			click_i--;
			$(".f_detail_bottom_cont1").eq(click_i).addClass("f_detail_bottom_cont2");
			$(".f_detail_bottom_cont1").eq(click_i + 1).removeClass("f_detail_bottom_cont2");
		}
		btn_status(click_i, dataCount);
	});
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
	/** 以上方法配合使点击空白处关闭详情下拉块 */
	
	
	
	$(".f_detail_show").bind("click",function(){
		$(".f_detail_ili").hide();
	});
	
	
//	$.ajax({ //刷新停车点及 sensor 缓存
//		url:basePath + "/action/park/reflushAllPark.do",
//		type:"post",
//		success:function(){}
//	});
	
});

function close_detail_show(){
    $(".f_detail_wrapper").hide();
}

var sensorCount = 1;
var gatewayCount = 1;
var reapterCount = 1;

function queryData(dcType) {
	$("#f_dc_marker").hide();
	$(".f_detail_ili").hide();
	globMap.clearOverlays();// 重置
	if(dcType == 1){
		if(sensorCount % 2 == 0){
			initSensor(); // 传感器
			initGateway(gateway);
			initReaptor(reapter);
			$(".f_tab_child_sensor").find("a").find("img").attr("src", monitor_img_url + "/child_sensor1.png");
			$(".f_tab_child_gateway").find("a").find("img").attr("src", monitor_img_url + "/child_gateway1.png");
			$(".f_tab_child_trigger").find("a").find("img").attr("src", monitor_img_url + "/child_trigger1.png");
		} else {
			initSensor(); // 传感器
			$(".f_tab_child_sensor").find("a").find("img").attr("src", monitor_img_url + "/child_sensor2.png");
			$(".f_tab_child_gateway").find("a").find("img").attr("src", monitor_img_url + "/child_gateway1.png");
			$(".f_tab_child_trigger").find("a").find("img").attr("src", monitor_img_url + "/child_trigger1.png");
		}
		$("#searchBox").attr("oninput","searchBerth()");
		$(".f_search_btn").attr("onclick","searchBerth()");
		$(".f_search_hidden").html("");//清空上次查询列表
		$("#searchBox").val("");
		$("#searchBox").attr("placeholder","请输入停车点名称");
		gatewayCount = 1;
		reapterCount = 1;
		sensorCount++;
	} else if (dcType == 2){
		if(gatewayCount % 2 == 0){
			initSensor(); // 传感器
			initGateway(gateway);
			initReaptor(reapter);
			$(".f_tab_child_sensor").find("a").find("img").attr("src", monitor_img_url + "/child_sensor1.png");
			$(".f_tab_child_gateway").find("a").find("img").attr("src", monitor_img_url + "/child_gateway1.png");
			$(".f_tab_child_trigger").find("a").find("img").attr("src", monitor_img_url + "/child_trigger1.png");
			//设置为默认搜索方法
			$("#searchBox").attr("oninput","searchBerth()");
			$(".f_search_btn").attr("onclick","searchBerth()");
			$("#searchBox").attr("placeholder","请输入停车点名称");
		} else {
			initGateway(gateway);
			$(".f_tab_child_sensor").find("a").find("img").attr("src", monitor_img_url + "/child_sensor1.png");
			$(".f_tab_child_gateway").find("a").find("img").attr("src", monitor_img_url + "/child_gateway2.png");
			$(".f_tab_child_trigger").find("a").find("img").attr("src", monitor_img_url + "/child_trigger1.png");
			//设置为搜索 gateway 方法
			$("#searchBox").attr("oninput","getGatewayOrReapter(2)");
			$(".f_search_btn").attr("onclick","getGatewayOrReapter(2)");
		}
		$(".f_search_hidden").html("");//清空上次查询列表
		$("#searchBox").val("");
		$("#searchBox").attr("placeholder","请输入设备名称");
		reapterCount = 1;
		sensorCount = 1;
		gatewayCount++;
		
	} else if(dcType == 3){
		if(reapterCount % 2 == 0){
			initSensor(); // 传感器
			initGateway(gateway);
			initReaptor(reapter);
			//更换图标
			$(".f_tab_child_sensor").find("a").find("img").attr("src", monitor_img_url + "/child_sensor1.png");
			$(".f_tab_child_gateway").find("a").find("img").attr("src", monitor_img_url + "/child_gateway1.png");
			$(".f_tab_child_trigger").find("a").find("img").attr("src", monitor_img_url + "/child_trigger1.png");
			//设置为默认搜索方法
			$("#searchBox").attr("oninput","searchBerth()");
			$(".f_search_btn").attr("onclick","searchBerth()");
			$("#searchBox").attr("placeholder","请输入停车点名称");
		} else {
			initReaptor(reapter);
			$(".f_tab_child_sensor").find("a").find("img").attr("src", monitor_img_url + "/child_sensor1.png");
			$(".f_tab_child_gateway").find("a").find("img").attr("src", monitor_img_url + "/child_gateway1.png");
			$(".f_tab_child_trigger").find("a").find("img").attr("src", monitor_img_url + "/child_trigger2.png");
			//设置为搜索 reapter 方法
			$("#searchBox").attr("oninput","getGatewayOrReapter(3)");
			$(".f_search_btn").attr("onclick","getGatewayOrReapter(3)");
		}
		$(".f_search_hidden").html("");//清空上次查询列表
		$("#searchBox").val("");
		$("#searchBox").attr("placeholder","请输入设备名称");
		sensorCount = 1;
		gatewayCount = 1;
		reapterCount++;
	}
}

function searchInfos(){
	return;
}

//加载sensor
function initSensor(){
	$.ajax({
		url: basePath + '/action/park/getParkTree.do?type=0',
		type:"post",
		dataType:"json",
		success: function (node, data) {
			for (var i = 0; i < node.length; i++) {
                for (var j = 0; j < node[i].children.length; j++) {
                    createAllPark(node[i].children[j]);
                }
            }
		}
	});
}

// 加载gateway
function initGateway(type) {
    $.ajax({
        url: 'dataList.do',
        type: 'post',
        data:{"type":type},
        success: function (resulte) {
            createGatewayAndReapter(resulte.gatewayList, 'gateway', gateway);
        }
    });
}

// 加载reaptor
function initReaptor(type) {
	$.ajax({
		url: 'dataList.do',
		type: 'post',
		data:{"type":type},
		success: function (resulte) {
            createGatewayAndReapter(resulte.reapterList, 'reapter', reapter);
		}
	});
}

function createAllPark(data) {
    var nodes = data.children;
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (node.attributes.type == 1) {
            var longitude = node.attributes.longitude;
            var latitude = node.attributes.latitude;
            var myIcon = createIconForMap(node.attributes.status , "sensor");
            var marker = new BMap.Marker(new BMap.Point(longitude, latitude), {
                icon: myIcon
            });
            var labelInfo = "<input type='hidden' id='parkId' value=" + node.attributes.id + ">";
            var label = new BMap.Label(labelInfo, {
                offset: new BMap.Size(20, -10)
            });
            label.setStyle({
	        	color : "#fff",
				fontSize : "16px",
				backgroundColor : "0.05",
				border : "0",
				fontWeight : "bold"
            });
            marker.setLabel(label);

            marker.addEventListener("click", function (e) {
                showBerthDetail(this);//无缓存，从数据库拿数据
//            	fillTheParkDetail(node.attributes.sensors);//从缓存拿数据
            });
            globMap.addOverlay(marker);
        }
    }
    globMap.setCenter(new BMap.Point(cityCenterLon, cityCenterLat), mapLeave);
}

function createGatewayAndReapter(data, type, value) {
    for (var i = 0; i < data.length; i++) {
        var node = data[i];
        var longitude = node.longitude;
        var latitude = node.latitude;
        var name = node.name;
        if (name == null)
            name = node.sensorCode;
        var myIcon = createIconForMap(node.status, type);
        var marker = new BMap.Marker(new BMap.Point(longitude, latitude), {
            icon: myIcon
        });
        var labelInfo = "<input type='hidden' id='parkId' value=" + node.id + ">";
        var label = new BMap.Label(labelInfo, {
            offset: new BMap.Size(20, -10)
        });
        label.setStyle({
        	color : "#fff",
			fontSize : "16px",
			backgroundColor : "0.05",
			border : "0",
			fontWeight : "bold"
        });
        marker.setLabel(label);

        marker.addEventListener("click", function (e) {
            showDetail(this, value, e);
        });
        globMap.addOverlay(marker);
    }
    globMap.centerAndZoom(new BMap.Point(cityCenterLon, cityCenterLat),  mapLeave);
}

function showDetail(e, v, ev) {
    var label = e.getLabel().content.toString();
    var start = label.lastIndexOf("=") + 1;
    var end = label.lastIndexOf(">");
    var idValue = label.substring(start, end);
    if (v == sensor) {
    	$.ajax({
            url: 'querySensorByParkId.do',
            type: 'post',
            data: { parkId: idValue },
            success: function (result) {
                fillTheParkDetail(result);
                $('#queryParkId').val(idValue);
                if (sensorDetailFlag) {
                    $('#mainLayout').layout('expand', 'east');
                    sensorDetailFlag = false;
                }
            }
    	});
    } else {
    	$(".f_dc_mk").hide(); //点击时隐藏已经显示的设备详情
    	var pn = {"x": ev.clientX, "y": ev.clientY};//鼠标点击位置坐标
    	
        $.ajax({
            url: 'getDeviceInfoById.do',
            type: 'post',
            data: {id: idValue, type: v },
            success: function (result) {
            	var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(result.lon , result.lat ), pn);
            	globMap.addOverlay(myCompOverlay);
//            	$(".f_dc_marker1").text("暂无图片");//TODO 数据库无图片，暂未加图片展示功能
            	$(".f_dc_marker1").find("img").attr("src",monitor_img_url+"/deviceMonitor/"+result.address+".jpg");
            	$(".f_dc_name").text(result.name);
            	$(".f_dc_addr").text(result.address);
            	$(".f_dc_status").text(deviceStatusDesc(result.status, result.statusDesc));
            	$(".f_dc_status2").text(result.netStatus);
            	$(".f_dc_battery").text(result.batteryBattery);
            	$(".f_dc_elect").text(result.electricity);
            }
        });
    }
}

//==========================开始复杂的自定义覆盖物================================
function ComplexCustomOverlay(point,data) {
  this._point = point;
  this._data = data;
};

ComplexCustomOverlay.prototype = new BMap.Overlay();
ComplexCustomOverlay.prototype.initialize = function(map){
	this._map = map;
	var div = this._div = document.createElement("div");
	div.id = "f_dc_marker";
	div.className = "f_dc_mk";
	div.style.display = "block";
  
	var marker_html = 
		"<div class='f_close' onclick='javascript:$(this).parent().hide();'><img src='"+ basePath +"/assets-adminlte/images/monitor/alert_close.png'></div>"
		+"<div class='f_dc_marker1'><img src='" + monitor_img_url + "/default_car.png' ></div>"
		+"<div class='f_dc_marker2'>"
			+"<div class='f_dc_marker21'>"
				+"<div>设备名称：</div>"
				+"<div>设备地址：</div>"
				+"<div>设备状态：</div>"
				+"<div>通讯状态：</div>"
				+"<div>电压：</div>"
				+"<div>电量：</div>"
			+"</div>"
			+"<div class='f_dc_marker22'>"
				+"<div class='f_dc_name'></div>"
				+"<div class='f_dc_addr'></div>"
				+"<div class='f_dc_status'></div>"
				+"<div class='f_dc_status2'></div>"
				+"<div class='f_dc_battery'></div>"
				+"<div class='f_dc_elect'></div>"
			+"</div>"
		+"</div>";
  
	div.innerHTML = marker_html;
	map.getPanes().labelPane.appendChild(div);
  
  return div;
};

ComplexCustomOverlay.prototype.draw = function(){
	var map = this._map;
	var data = this._data;
	var pixel = map.pointToOverlayPixel(this._point);
	
	if (data.x < 200 && data.y < 300) {
		this._div.style.left = pixel.x  + "px";
		this._div.style.top  = pixel.y + 10 + "px";
	} else if (data.x < 200) {
		this._div.style.left = pixel.x  + "px";
		this._div.style.top  = pixel.y - 300 + "px";
	} else if (data.y < 300) {
		this._div.style.left = pixel.x - parseInt(100) + "px";
		this._div.style.top  = pixel.y + 10 + "px";
	} else {
		this._div.style.left = pixel.x - parseInt(100) + "px";
		this._div.style.top  = pixel.y - 300 + "px";
	}
	
};
//==========================结束复杂的自定义覆盖物================================	


var baseImageLoc = "/assets-adminlte/images/monitor/";
function createIconForMap(status, type) {
    var url = "";
    if (status == '01' || status == '05') {
        url = baseImageLoc + type + "_normal.png";
    } else if (status == '07' || status == '08' || status == '09') {
        url = baseImageLoc + type + "_err.png";
    } else {
        url = baseImageLoc + type + "_alert.png";
    }
    return new BMap.Icon(basePath + url, new BMap.Size(25, 25), {
        imageSize: new BMap.Size(25, 25)
    });
}

function createIconForDetail(status, type) {
    var url = "";
    if (status == '01' || status == '05') {
        url = basePath + baseImageLoc + type + "_normal.png";
    } else if (status == '07' || status == '08' || status == '09') {
        url = basePath + baseImageLoc + type + "_err.png";
    } else {
        url = basePath + baseImageLoc + type + "_alert.png";
    }
    return url;
}

function deviceStatusDesc(stus, desc){
	var result = "";
	if (stus == "01" || stus == "05") {
		result = "正常";
	} else if (stus == "02" || stus == "03" || stus == "04" || stus == "06"){
		result = "心跳超时";
	} else {
		result = (desc == null ? "其它异常" : desc);
	}
	return result;
}


function showBerthDetail(e) {
    var label = e.getLabel().content.toString();
    var start = label.lastIndexOf("=") + 1;
    var end = label.lastIndexOf(">");
    var idValue = label.substring(start, end);
    $.ajax({
        url: 'querySensorByParkId.do',
        type: 'post',
        data: {
            parkId: idValue
        },
        success: function (result) {
            fillTheParkDetail(result);
            $('#queryParkId').val(idValue);
            if (sensorDetailFlag) {
                $('#mainLayout').layout('expand', 'east');
                sensorDetailFlag = false;
            }
        }
    });
}

//自动垂直居中
function autoHeight(className , wrapperHeight){
	className = "." + className;
	var height = $(className).css("height");
	height = height.substring(0, height.length - 2);
	$(className).css({"margin-top": (wrapperHeight - height) / 2});
}

function fillTheParkDetail(result) {
    //点击事件
	$(".f_dc_mk").hide();//关闭转发器及网关详情
    $(".f_detail_wrapper").slideDown(200);//显示地感详情
    click_i = 0;

    $(".f_dc_word1").text("停车点：" + result.park.parkName);
    $(".f_dc_word2").text("正常状态/总传感器：" + result.normalSensorNumber + "/" + result.totalSensorNumber);
    $(".f_dc_word3").text("异常状态：" + result.errSensorNumber);
    
    autoHeight("f_dc_word1", 60);
    autoHeight("f_dc_word2", 60);
    autoHeight("f_dc_word3", 60);

    data = result.dataList;
    dataCount = data.length;
    
    if (data.length > 0) {
        var html = "\n<li class='f_detail_li'>\n";
        var temp_width = 1;
    	$(".f_detail_bottom_cont").html("");//清空
    	$(".f_detail_bottom_cont").append("<div class='f_detail_bottom_cont1 f_detail_bottom_cont2' onclick='fn_slide("+ temp_width +")'></div>");
    	
        for (var i = 0; i < data.length; i++) {
            //获取图标
            iconFile = createIconForDetail(data[i].status, "sensor");
            html += "<div class='f_detail_item'><div class='f_detail_item3'>"
                + "<img src='" + iconFile + "'>"
                + "<div>" + deviceStatusDesc(data[i].status, data[i].statusDesc) + "</div>"
                + "<div>" + data[i].idleDesc + "</div></div>"
                + "<div class='f_detail_item4'>"
                + "<div>设备名称:</div>"
                + "<div>泊位号:</div>"
                + "<div>电压:</div>"
                + "<div>电量:</div></div>"
                + "<div class='f_detail_item5'>"
                + "<div>" + data[i].sensorCode + "</div>"
                + "<div>" + data[i].berthCode + "</div>"
                + "<div>" + data[i].battery + "</div>"
                + "<div>" + data[i].electricity + "</div></div></div>";

            if ((i % 8 == 7) && ((data.length - 1) != i)) {
                html += "\n</li>\n<li class='f_detail_li'>\n";
                temp_width++;
                $(".f_detail_ul").css("width", (temp_width * f_len) + "px");//设置包裹宽度
                $(".f_detail_bottom_cont").append("<div class='f_detail_bottom_cont1' onclick='fn_slide("+ temp_width +")'></div>");
            }
        }
        html += "</li>";
        $(".f_detail_ul").html(html);
        btn_status(click_i, dataCount);
    } else {
    	$(".f_detail_ul").html("<li class='f_detail_li'></li>");
    	$(".f_detail_bottom_cont").html("");//清空
    	btn_status(0, 0);
    }
};

//小圆点实现左右移动
function fn_slide(idx){
	$(".f_detail_li").animate({left:"-" + (idx -1) * f_len + "px"}, 600);
	click_i = idx -1;
	$(".f_detail_bottom_cont1").eq(click_i).addClass("f_detail_bottom_cont2").siblings("div").removeClass("f_detail_bottom_cont2");
	btn_status(click_i, dataCount);
}
//按钮切换效果
function btn_status(count , total){
	if (total <= 8){
		$(".f_btn_left").css({"cursor":"default","background":"url(" + monitor_img_url + "/btn_left_disable.png) no-repeat center"});
	  	$(".f_btn_right").css({"cursor":"default","background":"url(" + monitor_img_url + "/btn_right_disable.png) no-repeat center"});
	  	$(".f_btn_right").unbind("mouseout").unbind("mouseover");
	  	$(".f_btn_left").unbind("mouseout").unbind("mouseover");
	} else if (total > 8 && count == 0){
		$(".f_btn_left").css({"cursor":"default","background":"url(" + monitor_img_url + "/btn_left_disable.png) no-repeat center"});
	  	$(".f_btn_right").css({"cursor":"pointer","background":"url(" + monitor_img_url + "/btn_right_mouseout.png) no-repeat center"});
	  	$(".f_btn_right").bind("mouseover", function(){
	  		$(this).css({"background":"url(" + monitor_img_url + "/btn_right_mouseover.png) no-repeat center"});
	  	}).bind("mouseout", function(){
	  		$(this).css({"background":"url(" + monitor_img_url + "/btn_right_mouseout.png) no-repeat center"});
	  	});
	  	$(".f_btn_left").unbind("mouseout").unbind("mouseover");
	} else if (count > 0 && count < (Math.ceil(total / 8) -1)){
		$(".f_btn_left").css({"cursor":"pointer","background":"url(" + monitor_img_url + "/btn_left_mouseout.png) no-repeat center"});
		$(".f_btn_left").bind("mouseover", function(){
			$(this).css({"background":"url(" + monitor_img_url + "/btn_left_mouseover.png) no-repeat center"});
		}).bind("mouseout", function(){
			$(this).css({"background":"url(" + monitor_img_url + "/btn_left_mouseout.png) no-repeat center"});
		});
	  	$(".f_btn_right").css({"cursor":"pointer","background":"url(" + monitor_img_url + "/btn_right_mouseout.png) no-repeat center"});
	  	$(".f_btn_right").bind("mouseover", function(){
	  		$(this).css({"background":"url(" + monitor_img_url + "/btn_right_mouseover.png) no-repeat center"});
	  	}).bind("mouseout", function(){
	  		$(this).css({"background":"url(" + monitor_img_url + "/btn_right_mouseout.png) no-repeat center"});
	  	});
	} else if (count > 0 && count == (Math.ceil(total / 8) -1)){
		$(".f_btn_left").css({"cursor":"pointer","background":"url(" + monitor_img_url + "/btn_left_mouseout.png) no-repeat center"});
		$(".f_btn_left").bind("mouseover", function(){
			$(this).css({"background":"url(" + monitor_img_url + "/btn_left_mouseover.png) no-repeat center"});
		}).bind("mouseout", function(){
			$(this).css({"background":"url(" + monitor_img_url + "/btn_left_mouseout.png) no-repeat center"});
		});
		$(".f_btn_right").css({"cursor":"default","background":"url(" + monitor_img_url + "/btn_right_disable.png) no-repeat center"});
		$(".f_btn_right").unbind("mouseout").unbind("mouseover");
	}
}

function showInfo(id, event) {
    $.ajax({
        url: 'getSensorInfoById.do',
        type: 'post',
        data: {
            id: id
        },
        success: function (result) {
        	$(".f_detail_ili").show().css({left: event.pageX, top: event.pageY});
            if (result.success) {
            	$(".f_li_name").text(result.sensorCode);
            	$(".f_li_berthCode").text(result.berthCode);
            	$(".f_li_berthStatus").text(result.statusDesc);
            	$(".f_li_status").text(result.idleDesc);
            	$(".f_li_battery").text(result.battery);
            	$(".f_li_elect").text(result.electricity);
            } else {
            	$(".f_detail_ili").html(result.msg);
            }
        }
    });
}

function calcDis() {
    var myDis = new BMapLib.DistanceTool(globMap);
    myDis.open();
}
// 重置地图
function refreshMap() {
    globMap.reset();
}

//根据停车点名称搜索
function searchBerth() {
	$(".f_search_hidden").html("");
    var value = $('#searchBox').val();
    if ($.trim(value) != ""){
    	$.ajax({
    		url:basePath + "/action/parkMap/queryByParkNameAndBerthCode.do",
    		type:"post",
    		data:{"parkName": value},
    		dataType:"json",
    		success: function(result){
    			if (result.success){
	    			var data = result.dataList;
	    			var s_temp = "";
	    			if(data.length == 0){
	    				s_temp = "<div class='f_search_item f_search_hidden'>" 
	    					+ "<a href='javascript:void(0)'>没有相关信息</a></div>";
	    			} else if (data.length > 0){
	    				for(var i = 0; i < 10; i++){
	    					if(data.length >= (i+1)){
	    						s_temp += "<div class='f_search_item' onclick='addParkMarker("+ data[i].id +")'>" 
	    						+ "<a class='a_"+ data[i].id +"' href='javascript:void(0)'>"+ data[i].parkName +"</a></div>";
	    					}
	    				}
	    			}
	    			$(".f_search_hidden").html(s_temp);
	    			$(".f_search_hidden").show();
    				
    			} else {
    				swal("", result.msg, "warning");
    			}
    		}
    	});
    } else {
    	// 停车点初始化
        initSensor();
        
        // 加载设备数据
        initGateway(gateway);
        initReaptor(reapter);
    	/*swal("", "请输入停车点名称", "warning");*/
    	//return false;
    }
}

//根据设备名称搜索
function getGatewayOrReapter(type) {
	$(".f_search_hidden").html("");
	var value = $('#searchBox').val();
	if ($.trim(value) != ""){
		$.ajax({
			url: "getGatewayOrReapter.do",
			type:"post",
			data:{"name": value, "type": type},
			dataType:"json",
			success: function(result){
				var data = result.dataList;
				var s_temp = "";
				if(data.length == 0){
					s_temp = "<div class='f_search_item f_search_hidden'>" 
						+ "<a href='javascript:void(0)'>没有相关信息</a></div>";
				} else if (data.length > 0){
					for(var i = 0; i < 10; i++){
						if(data.length >= (i+1)){
							s_temp += "<div class='f_search_item' onclick='addGRMarker("+ data[i].id +","+ data[i].longitude +","+ data[i].latitude +","+ data[i].status +","+ type + ")'>" 
							+ "<a class='a_"+ data[i].id +"' href='javascript:void(0)'>"+ data[i].name +"</a></div>";
						}
					}
				}
				$(".f_search_hidden").html(s_temp);
				$(".f_search_hidden").show();
					
			}
		});
	} else {
		/*swal("", "请输入停车点名称", "warning");*/
		return false;
	}
}

//添加地感marker
function addParkMarker(idValue){
	var parkName = $(".a_" + idValue).text();
	$("#searchBox").val(parkName);
	$.ajax({
		url:"querySensorByParkId.do",
		data:{"parkId": idValue},
		type:"post",
		success: function(result){
			globMap.clearOverlays();
	    	var longitude = result.park.longitude;
	        var latitude = result.park.latitude;
	        globMap.setCenter(new BMap.Point(longitude, latitude), mapLeave);
	
	        var myIcon = createIconForMap(result.statusWrap, "sensor");
            var marker = new BMap.Marker(new BMap.Point(longitude, latitude), {
                icon: myIcon
            });
            var labelInfo = "<input type='hidden' id='parkId' value=" + result.park.id + ">";
            var label = new BMap.Label(labelInfo, {
                offset: new BMap.Size(20, -10)
            });
            label.setStyle({
	        	color : "#fff",
				fontSize : "16px",
				backgroundColor : "0.05",
				border : "0",
				fontWeight : "bold"
            });
	        marker.setLabel(label);
	        marker.addEventListener("click", function (e) {
	            showBerthDetail(this);
	        });
	        globMap.addOverlay(marker);
		}
	});
}

//添加 gateway 或  reapter marker
function addGRMarker(id ,longitude, latitude ,status, typeValue){
	globMap.clearOverlays();
	var name = $(".a_" + id).text();
	$("#searchBox").val(name);
	
	var type = "";
	if(typeValue == 2){
		type = "gateway";
	} else if(typeValue == 3){
		type = "reapter";
	}
	
    var myIcon = createIconForMap(status, type);
    var marker = new BMap.Marker(new BMap.Point(longitude, latitude), {
        icon: myIcon
    });
    var labelInfo = "<input type='hidden' id='parkId' value=" + id + ">";
    var label = new BMap.Label(labelInfo, {
        offset: new BMap.Size(20, -10)
    });
    label.setStyle({
    	color : "#fff",
		fontSize : "16px",
		backgroundColor : "0.05",
		border : "0",
		fontWeight : "bold"
    });
    marker.setLabel(label);

    marker.addEventListener("click", function (e) {
        showDetail(this, typeValue, e);
    });
    globMap.addOverlay(marker);
    globMap.centerAndZoom(new BMap.Point(longitude, latitude),  mapLeave);
}