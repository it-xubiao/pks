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
var internalTime = 60000;
var monitor_img_url = basePath + "/assets-adminlte/images/monitor";
var dataCount = 0;
var f_len = 768; //默认详情列数据谋求宽度

$(function () {
//	timeoutId = setInterval('timer()', internalTime);
    initMap();
    
	$(".f_btn_right").on("click", function(){ //点击右按钮往左移
		var f_num = $(".f_detail_li").length;
		if(click_i < (f_num-1)){
			$(".f_detail_li").animate({left:"-" + (click_i + 1) * f_len + "px"}, 600);
			click_i++;
			$(".f_detail_bottom_cont1").eq(click_i).addClass("f_detail_bottom_cont2");
			$(".f_detail_bottom_cont1").eq(click_i - 1).removeClass("f_detail_bottom_cont2");
		}
		btn_status(click_i, dataCount);
	});
	
	$(".f_btn_left").on("click", function(){ //点击左按钮往右移
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
    
    
    //====================停车场显示配置开始=====================
    $(".f_park_wrapper").on("click", function(){
    	$(this).hide();
    });
    $(".f_park_detail").mouseover(function(){
    	$(".f_park_wrapper").unbind("click");
    });
    $(".f_park_detail").on("mouseout", function(){
    	$(".f_park_wrapper").on("click", function(){
    		$(this).hide();
    	});
    });
    //====================停车场显示配置结束=====================
    
    
    
});

function close_detail_show(){
    $(".f_detail_wrapper").hide();
}

function initMap(){
    // 地图初始化
    var map = new BMap.Map("parkMap", {enableMapClick:false});
    cityCenterLon = cityLongitude;
    cityCenterLat = cityLatitude;
    map.centerAndZoom(new BMap.Point(cityCenterLon, cityCenterLat), mapLeave);
    globMap = map;
    map.enableScrollWheelZoom(); // 启用滚轮放大缩小，默认禁用
    map.enableContinuousZoom();
	var bottom_left_control = new BMap.ScaleControl({anchor : BMAP_ANCHOR_BOTTOM_LEFT});// 左下角，添加比例尺
	var bottom_left_navigation = new BMap.NavigationControl({anchor : BMAP_ANCHOR_BOTTOM_LEFT}); // 左下角，添加默认缩放平移控件
	map.addControl(bottom_left_control);
	map.addControl(bottom_left_navigation);
	
	initInfo();
	
}

function initInfo(){
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

function createAllPark(data) {
    var nodes = data.children;
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (node.attributes.type == 1) {
            var longitude = node.attributes.longitude;
            var latitude = node.attributes.latitude;

            var myIcon = createIconForPark(node.attributes.freeBerthNumber, node.attributes.totalBerthNumber, node.attributes.parkMode);
            var marker = new BMap.Marker(new BMap.Point(longitude, latitude), {
                icon: myIcon
            });

            var labelInfo = "<input type='hidden' id='parkId' value=" + node.attributes.id + ">";
            var label = new BMap.Label(labelInfo, {
                offset: new BMap.Size(0, 0)
            });
            label.setStyle({ //给label设置样式，任意的CSS都是可以的
            	color : "#fff",
				fontSize : "16px",
				backgroundColor : "0.05",
				border : "0",
				fontWeight : "bold"
			});
            marker.setLabel(label);
            if(node.attributes.parkMode == 1){ //停车点点击事件
            	marker.addEventListener("click", function (e) {
            		showBerthDetail(this); //无缓存，从数据库拿数据
//            		fillTheParkDetail(node.attributes.berths); //从缓存拿数据
            	});
            } else { //停车场点击事件
            	marker.addEventListener("click", function (e) {
            		showParklotDetail(this);
            	});
            }
            globMap.addOverlay(marker);
        }
    }
    globMap.setCenter(new BMap.Point(cityCenterLon, cityCenterLat), mapLeave);
}

//停车点
function showBerthDetail(e) {
    var label = e.getLabel().content.toString();
    var start = label.lastIndexOf("=") + 1;
    var end = label.lastIndexOf(">");
    var idValue = label.substring(start, end);
    //获取内容
    $.ajax({
        url: 'queryBerthDetailByParkId.do',
        type: 'post',
        data: { parkId: idValue },
        success: function (result) {
            fillTheParkDetail(result);

            $('#queryParkId').val(idValue);
            $('#queryBerthId').val("");
        }
    });
}

//停车场
function showParklotDetail(e) {
	var label = e.getLabel().content.toString();
	var start = label.lastIndexOf("=") + 1;
	var end = label.lastIndexOf(">");
	var idValue = label.substring(start, end);
	//获取内容
	$.ajax({
		url: 'getParklotByParkId.do',
		type: 'post',
		data: { parkId: idValue },
		success: function (result) {
			fillTheParklotDetail(result);
			
			$('#queryParkId').val(idValue);
			$('#queryBerthId').val("");
		}
	});
}

//停车场详情
function fillTheParklotDetail(data){
	$(".f_detail_wrapper").hide();
	$(".f_park_wrapper").slideDown(200);
	$(".f_park_detail_icon2").css({"background":"url(" + createParklotIcon(data.parklot.berthNumRemain,data.parklot.berthNumTotal) + ") no-repeat center"});
	$(".f_park_parkName").text("停车点：" + (data.park.parkName == null ? "":data.park.parkName));
	$(".f_park_num").text("空余泊位/总泊位：" + data.parklot.berthNumRemain + "/" + data.parklot.berthNumTotal);
	if(data.dayRate==data.nightRate){
		$(".f_park_detail_desc1").html("费率：" + data.dayRate);
	}else{
		$(".f_park_detail_desc1").html("日费率：" + data.dayRate + "<br/>夜费率：" + data.nightRate + "");
	}	
	$(".f_park_location").text("位置：" + (data.park.address == null ? data.park.parkName:data.park.address));
	
	//--------------------自动高度，动态垂直居中------------------------开始
	var height1 = $(".f_park_parkName").css("height");
	height1 = height1.substring(0, height1.length - 2);
	$(".f_park_parkName").css({"margin-top": (60 - height1) / 2});
	
	var height2 = $(".f_park_location").css("height");
	height2 = height2.substring(0, height2.length - 2);
	$(".f_park_location").css({"margin-top": (60 - height2) / 2});
	
	var height3 = $(".f_park_detail_desc1").css("height");
	height3 = height3.substring(0, height3.length - 2);
	$(".f_park_detail_desc1").css({"margin-top": (60 - height3) / 2});
	
	var height4 = $(".f_park_num").css("height");
	height4 = height4.substring(0, height4.length - 2);
	$(".f_park_num").css({"margin-top": (60 - height4) / 2});
	//--------------------自动高度，动态垂直居中------------------------结束
	
	//为停车场加照片
	$(".f_park_detail_2").find("img").attr("src", monitor_img_url + "/park/" + data.park.parkCode + ".JPG"); 
}

function close_park_detail(){
	$(".f_park_wrapper").hide();
}

//获取停车场图标
function createParklotIcon(berthNumRemain, berthNumTotal){
	var parklotIcon = "";
	var num = (berthNumRemain/berthNumTotal) * 100;
	if(num <= 10){
		parklotIcon = monitor_img_url + "/parklot1.png";
	}else if(num <= 20){
		parklotIcon = monitor_img_url + "/parklot2.png";
	}else if(num > 20){
		parklotIcon = monitor_img_url + "/parklot3.png";
	}
	return parklotIcon;
}

function createParkStatusImg(freeBerthNumber){
	var img_url = "";
	if (freeBerthNumber < 2) {
        img_url = monitor_img_url + "/park_red.png";
    } else if (freeBerthNumber < 4) {
    	img_url = monitor_img_url + "/park_blue.png";
    } else if (freeBerthNumber >= 4) {
    	img_url = monitor_img_url + "/park_green.png";
    }
	return img_url;
}

function createIconForPark(freeBerthNumber, totalBerthNumber, parkMode) {
    var myIcon = "";
    var berthRate = parseInt(freeBerthNumber * 100 / totalBerthNumber);
    if (totalBerthNumber == 0) {
        berthRate = 0;
    }
    if (parkMode == 1) {
        //停车点
        if (freeBerthNumber < 2) {
            myIcon = new BMap.Icon(basePath + "/assets/images/berthNum/red/park_red.png",
                new BMap.Size(25, 25), {
                    imageSize: new BMap.Size(25, 25)
                });
        } else if (freeBerthNumber < 4) {
            myIcon = new BMap.Icon(basePath + "/assets/images/berthNum/blue/park_blue.png",
                new BMap.Size(25, 25), {
                    imageSize: new BMap.Size(25, 25)
                });
        } else if (freeBerthNumber >= 4) {
            myIcon = new BMap.Icon(basePath + "/assets/images/berthNum/green/park_green.png",
                new BMap.Size(25, 25), {
                    imageSize: new BMap.Size(25, 25)
                });
        }
    } else if (parkMode == 2) {
        //停车场
        if (berthRate <= 10) {
            myIcon = new BMap.Icon(basePath + "/assets/images/berthNum/red/parklot_red.png",
                new BMap.Size(25, 25), {
                    imageSize: new BMap.Size(25, 25)
                });
        } else if (berthRate > 10 && berthRate <= 20) {
            myIcon = new BMap.Icon(basePath + "/assets/images/berthNum/blue/parklot_blue.png",
                new BMap.Size(25, 25), {
                    imageSize: new BMap.Size(25, 25)
                });
        } else if (berthRate > 20) {
            myIcon = new BMap.Icon(basePath + "/assets/images/berthNum/green/parklot_green.png",
                new BMap.Size(25, 25), {
                    imageSize: new BMap.Size(25, 25)
                });
        }
    } else if (parkMode == 4) {
        //预约停车场
        if (berthRate <= 10) {
            myIcon = new BMap.Icon(basePath + "/assets/images/berthNum/red/park_cribe_red.png",
                new BMap.Size(25, 25), {
                    imageSize: new BMap.Size(25, 25)
                });
        } else if (berthRate > 10 && berthRate <= 20) {
            myIcon = new BMap.Icon(basePath + "/assets/images/berthNum/blue/park_cribe_blue.png",
                new BMap.Size(25, 25), {
                    imageSize: new BMap.Size(25, 25)
                });
        } else if (berthRate > 20) {
            myIcon = new BMap.Icon(basePath + "/assets/images/berthNum/green/park_cribe_green.png",
                new BMap.Size(25, 25), {
                    imageSize: new BMap.Size(25, 25)
                });
        }
    }

    return myIcon;
}

function searchBerth() {
	$(".f_search_hidden").html("");
    var value = $('#searchBox').val();
    if ($.trim(value) != ""){
    	$.ajax({
    		url:"queryByParkNameAndBerthCode.do",
    		type:"post",
    		data:{"parkName": value},
    		dataType:"json",
    		success: function(result){
    			if (result.success){
	    			var data = result.dataList;
	    			if(data){
	    				var s_temp = "";
	    				if(data.length == 0){
	    					s_temp = "<div class='f_search_item'>" 
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
	    			}    				
    			} else {
    				swal("", result.msg, "warning");
    			}
    		}
    	});
    } else {
    	initInfo();
    	/*swal("", "请输入停车点名称", "warning");*/
    	//return false;
    }
}

function addParkMarker(idValue){
	var parkName = $(".a_" + idValue).text();
	$("#searchBox").val(parkName);
	$.ajax({
		url:"queryBerthDetailByParkId.do",
		data:{"parkId": idValue},
		type:"post",
		success: function(result){
			globMap.clearOverlays();
	    	var longitude = result.park.longitude;
	        var latitude = result.park.latitude;
	        globMap.setCenter(new BMap.Point(longitude, latitude), mapLeave);
	
	        var myIcon = createIconForPark(result.freeBerthNumber, result.totalBerthNumber, 1);
	        var marker = new BMap.Marker(new BMap.Point(longitude, latitude), {
	            icon: myIcon
	        });
	
	        var labelInfo = "<input type='hidden' id='parkId' value=" + result.park.id + ">";
	        var label = new BMap.Label(labelInfo, {
	            offset: new BMap.Size(0, 0)
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

function searchInfos(){
	$(".f_search_hidden").html("");
    var value = $('#searchBox').val();
    if ($.trim(value) != ""){
    	$.ajax({
    		url:"queryByParkNameAndBerthCode.do",
    		type:"post",
    		data:{"parkName": value},
    		dataType:"json",
    		success: function(result){
    			if (result.success){
	    			var data = result.dataList;
	    			if(data){
	    				if(data.length == 0){
	    					swal("", "未找到相关停车点", "info");
	    				} else if (data.length > 0){
	    					globMap.clearOverlays();
	    					for(var i = 0; i < data.length; i++){
	    						if(data.length >= (i+1)){
	    							searchParkMarker(data[i].id);
	    						}
	    					}
	    				}	    				
	    			}
    			} else {
    				swal("", result.msg, "warning");
    			}
    		}
    	});
    }
}

function searchParkMarker(idValue){
	$.ajax({
		url:"queryBerthDetailByParkId.do",
		data:{"parkId": idValue},
		type:"post",
		success: function(result){			
	    	var longitude = result.park.longitude;
	        var latitude = result.park.latitude;
	        globMap.setCenter(new BMap.Point(longitude, latitude), mapLeave);
	
	        var myIcon = createIconForPark(result.freeBerthNumber, result.totalBerthNumber, 1);
	        var marker = new BMap.Marker(new BMap.Point(longitude, latitude), {
	            icon: myIcon
	        });
	
	        var labelInfo = "<input type='hidden' id='parkId' value=" + result.park.id + ">";
	        var label = new BMap.Label(labelInfo, {
	            offset: new BMap.Size(0, 0)
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

var parkingText;
var data;
var showText;
var status;
var iconFile;
var operate;
var temp;
var myIcon;
//result数据结构:
//计费标准：rateDesc
//停车点类型：parkType
//停车点名称：parkName
//总泊位数：totalBerthNumber
//空闲泊位数：freeBerthNumber
//占用泊位数：workingBerthNumber
//泊位列表：dataList
function fillTheParkDetail(result) {
	$(".f_detail_alert2").hide(); //隐藏泊位详情框
	$(".f_park_wrapper").hide(); //隐藏停车场详情框
	$(".f_detail_wrapper").slideDown(200); //展开停车点详情框
	
	var img_url = createParkStatusImg(result.freeBerthNumber); //泊位状态图标
	$(".f_head_img2").css("background", "url("+ img_url + ") no-repeat center");
	click_i = 0;
	$(".f_head_word1").text("停车点：" +  result.parkName);
	$(".f_head_word2").text("空泊位数/总泊位数：" + result.freeBerthNumber + "/"  + result.totalBerthNumber);
	$(".f_head_word3").text("计费标准：" + result.rateDesc);
	
	autoHeight("f_head_word1", 60);
	autoHeight("f_head_word2", 60);
	autoHeight("f_head_word3", 60);
	
    createDetailShow(result);

}

//自动垂直居中
function autoHeight(className , wrapperHeight){
	className = "." + className;
	var height = $(className).css("height");
	height = height.substring(0, height.length - 2);
	$(className).css({"margin-top": (wrapperHeight - height) / 2});
}

//创建泊位列表
//result.dateList获取到泊位列表data
//data数据结构(Map)：
//属性：对应的Key
//车牌：plateNo
//收费状态（用来获取图片）：feeStatus
//收费状态文字：feeStatusDes
//泊位编号：berthCode
//停车费用：parkFee
//berthStatus 0:空闲   1：有车
function createDetailShow(result){
	var temp_width = 1;
	$(".f_detail_bottom_cont").html("");//清空
	$(".f_detail_bottom_cont").append("<div class='f_detail_bottom_cont1 f_detail_bottom_cont2' onclick='fn_slide("+ temp_width +")'></div>");
	var html = "\n<li class='f_detail_li'>\n";
    data = result.dataList;
    dataCount = data.length;
    
    for (var i = 0; i < data.length; i++) {
        status = data[i].berthStatus;
        if (data[i].berthStatus == 0) {
        	//获取图标
            iconFile = showIconForPark("empty");
            html += "<div class='f_detail_item'><div class='f_detail_item1'><img src='" + iconFile
		            + "'><div class='f_detail_item1_desc'>空泊位</div></div>"
		            + "<div class='f_detail_item2'>"
		            + data[i].berthCode + "<div></div><div></div><div></div><div></div></div></div>";
        } else {
            iconFile = showIconForPark(data[i].feeStatus);
            operate = "onclick='showRecord(" + data[i].recordId + ","+ data[i].feeStatus +")'";
            html += "<div class='f_detail_item f_detail_item_"+ data[i].recordId +"'" + operate + " style='cursor:pointer;'><div class='f_detail_item1'><img style='cursor:pointer;' src='" + iconFile
		            + "'><div class='f_detail_item1_desc'>" + (feeStatusDes(data[i].feeStatus) == "免费" ? data[i].feeStatusDes : feeStatusDes(data[i].feeStatus)) + "</div></div>"
		            + "<div class='f_detail_item2'><div>"
		            + data[i].berthCode + "</div><div>" + (data[i].plateNo == null ? "未录入车牌": data[i].plateNo) + "</div><div> <font color='red'>"
		            + (feeStatusDes(data[i].feeStatus) == "收费计时中"?data[i].parkFee / 100: "0") + "</font> 元</div><div><img src='"+ monitor_img_url + "/camera.png'>"+ data[i].photoNum +"</div></div></div>";
        }
        
        if((i % 8 == 7) && ((data.length-1) != i)){
    		html += "\n</li>\n<li class='f_detail_li'>\n";
    		temp_width++;
    		$(".f_detail_ul").css("width",(temp_width * f_len) + "px");//设置包裹宽度
    		$(".f_detail_bottom_cont").append("<div class='f_detail_bottom_cont1' onclick='fn_slide("+ temp_width +")'></div>");
    	}
    }
    html += "</li>";
    $(".f_detail_ul").html(html);
    btn_status(click_i, dataCount);
}

//免费停车、免费计时、收费计时
function feeStatusDes(feeStatus){
	if(feeStatus == "04" || feeStatus == "05" || feeStatus == "11" || feeStatus == "12"){
		return "免费";
	} else if (feeStatus == "00"){
		return "免费计时中";
	} else {
		return "收费计时中";
	}
}

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
	$(".f_detail_alert2").hide();
	$(".f_detail_item").css({"border":"1px solid #fff","background":"#fff"});
}

//详情列表点击显示遮罩层
function showRecord(recordId, status){
	$(".f_detail_item_" + recordId).css({"border":"1px solid #00BFFF","background": "url("+ monitor_img_url + "/f_detail_item_checked.png) no-repeat bottom right","background-color":"#fff"});
	$(".f_detail_item_" + recordId).siblings(".f_detail_item").css({"border":"1px solid #fff","background":"#fff"});
	$(".f_detail_item_" + recordId).parent("li").siblings("li").find(".f_detail_item").css({"border":"1px solid #fff","background":"#fff"});
	$.ajax({
		url:"getRecord.do",
		data:{"id":recordId},
		dataType:"json",
		success:function(result){
			$(".f_detail_alert2").hide();
			$(".f_detail_alert2").slideDown(200);
			var html_temp = "";
			var pt = result.photos;
			if(!pt){
				pt = new Array(0);
			}
			if(pt.length == 0){ //有一张照片时
				html_temp = "<img src=''><img src=''><img src=''>";
			}
			if(pt.length == 1){ //有一张照片时
				html_temp = "<a href='#' data-reveal-id='myModal'><img src='"+ pt[0] +"' style='background:none;' alt='0' class='car_photo'></a><img src=''><img src=''>";
			}
			if(pt.length == 2){ //有两张时
				html_temp = "<a href='#' data-reveal-id='myModal'><img src='"+ pt[0] +"' style='background:none;' alt='0' class='car_photo'></a><a href='#' data-reveal-id='myModal'><img src='"+ pt[1] +"' style='background:none;' alt='1' class='car_photo'></a><img src=''>";
			}
			if(pt.length >= 3){ //三张或更多
				html_temp = "<a href='#' data-reveal-id='myModal'><img src='"+ pt[0] +"' style='background:none;' alt='0' class='car_photo'></a><a href='#' data-reveal-id='myModal'><img src='"+ pt[1] +"' style='background:none;' alt='1' class='car_photo'></a><a href='#' data-reveal-id='myModal'><img src='"+ pt[2] +"' style='background:none;' alt='2' class='car_photo'></a>";
			}
			$(".f_detail_alert21").html(html_temp); //重新设置照片
			
			var html = "<div>泊位号： "+ result.data.berthCode + "</div>"
					+ "<div>车牌号： "+ (result.data.plateNo == null ? "未录入车牌号":result.data.plateNo)  + "</div>"
					+ "<div>车辆类型： "+ result.feeStateDes + "</div>"
					+ "<div>预付费： "+ result.prepay + " 元</div>"
					+ "<div>停车费： <font color='red'>"+ (feeStatusDes(status) == "收费计时中" ? result.parkFee : "0") + "</font> 元</div>"
					+ "<div>驶入时间： "+ result.data.arriveTime + "</div>";
			
			$(".f_detail_alert22").html(html);
		}
	});
}


function showIconForPark(status) {
    var iconFile = "";
    if ("empty" == status) {
        iconFile = monitor_img_url + "/car_empty.png";
    } else if ('00' == status) {
        iconFile = monitor_img_url + "/car_blue.png";
    } else if ('04' == status || '05' == status || '08' == status || '11' == status || '12' == status) {
        iconFile = monitor_img_url + "/car_green.png";
    } else {
        iconFile = monitor_img_url + "/car_red.png";
    }
    return iconFile;
}

function checkkey(keys){
	if(keys.ctrlKey && keys.keyCode == 53){
		if(confirm("是否强制刷新缓存")){
			refreshData();
		}
	}
}
function refreshData(){
	jQuery.ajax({
		url:basePath + "/action/park/reflushAllPark.do",
		type:'post',
		success:function(result){
			swal("", result.msg, "info");
		}
	});
}
function aheadPhoto(){
	if(photo_num == 0){
		alert("当前已经是第一张了。");
		return false;
	}
	var img_info = car_photos[photo_num-1];
	$("#photo").attr("src",img_info.src);
	photo_num--;
}

function behandPhoto(){
	if(photo_num == car_photos.length-1){
		alert("当前已经是最后一张了。");
		return false;
	}
	var img_info = car_photos[photo_num+1];
	$("#photo").attr("src",img_info.src);
	photo_num++;
}