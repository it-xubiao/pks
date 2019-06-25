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
var internalShwoTime = 30000;
$(function() {
	// 地图初始化
	var map = new BMap.Map("parkMap");
	cityCenterLon = cityLongitude;
	cityCenterLat = cityLatitude;
	map.centerAndZoom(new BMap.Point(cityCenterLon, cityCenterLat), mapLeave);
	globMap = map;
	map.enableScrollWheelZoom(); // 启用滚轮放大缩小，默认禁用
	map.enableContinuousZoom();

	var top_left_control = new BMap.ScaleControl({
		anchor : BMAP_ANCHOR_TOP_LEFT
	});// 左上角，添加比例尺
	var top_left_navigation = new BMap.NavigationControl(); // 左上角，添加默认缩放平移控件

	map.addControl(top_left_control);
	map.addControl(top_left_navigation);

	// 停车点初始化
	$('#parkTree').tree(
			{
				title : '停车点列表',
				width : 200,
				height : 600,
				// 默认显示停车点和停车场
				url : basePath + '/action/park/getParkTree.do?type=' + 0,
				checkbox : true,
				multiple : true,
				cascadeCheck : true,
				onCheck : function(node, checked) {
					createOverlay(node, checked);
				},
				onSelect : function(node, checked) {
					var longitude = node.attributes.longitude;
					var latitude = node.attributes.latitude;
					var myIcon = createIconForPark(
							node.attributes.freeBerthNumber,
							node.attributes.totalBerthNumber,
							node.attributes.parkMode);
					var marker = new BMap.Marker(new BMap.Point(longitude,
							latitude), {
						icon : myIcon
					});
					var labelInfo = "<input type='hidden' id='parkId' value="
							+ node.attributes.id + ">" + node.text;
					var label = new BMap.Label(labelInfo, {
						offset : new BMap.Size(20, -10)
					});
					globMap.clearOverlays();
					marker.setLabel(label);
					globMap.addOverlay(marker);
					if (node.attributes.type == 0) {
						$('#parkTree').tree('check', node.target);
						createOverlay(node, checked);
					}
					if (node.attributes.type == 1) {
						showBerthDetail(marker);
					}
					globMap.centerAndZoom(new BMap.Point(longitude, latitude),
							mapLeave);
					// createOverlay(node, checked);
				},
				onLoadSuccess : function(node, data) {
					for (var i = 0; i < data.length; i++) {
						for (var j = 0; j < data[i].children.length; j++) {
							createAllPark(data[i].children[j]);
						}
					}
				}
			});

	getShowParkLot();
	 timeoutId = setInterval('timerInterval()', internalShwoTime);
	// timeoutId = setInterval('timer()', internalTime);

});

function checkAll() {
	$('#parkTree').tree.attr("checked", true);
}
function releaseRAM() {
	document.getElementById("berthDetail").innerHTML = null;
}

var regionIds = "108;88"
function getShowParkLot() {

	$.ajax({
		url : "getShowParkLotData.do",
		type : "post",
		data : {
			regionIds : regionIds
		},
		success : function(result) {

			showViewParkLot(result.dateSource);
			
		}
	})

}

function timerInterval() {
	getShowParkLot();
}
// 分页标识
var pageIndex = 0;
// 总页数
var pageCount = 0;

var titleDes = "城市停车场预览";
var innerHtml = "<table>";
/**
 * 组装停车场显示表格
 * 
 * @param dateSource
 *            List<ParkLotData> ParkLotData:parkName;remainBerthNum。
 */

function showViewParkLot(dateSource) {

	$('#berthDetail').panel({
		title : '城市停车场预览'
	})
	var iconFileCar = basePath + "/assets/images/park/car_blue.png";
	var iconFilePark = basePath
			+ "/assets/images/berthNum/green/parklot_green.png";
	var innerHtml = "<table><tr align='left'><td colspan='2' align='left'><B>更新时间："
			+ getNowDayNow() + "</B></td></tr>";

	var tableTile = "<tr><td align='center'><img  src='" + iconFilePark
			+ "' width='30px' height='30px'/></td><td align='center'><img  src='" + iconFileCar
			+ "'/></td></tr>";
	innerHtml += tableTile;
	for (var i = 0; i < dateSource.length; i++) {
		var item = dateSource[i];

		operate = "onclick= showPlaceOfParkLot(" + item.LONGITUDE + ","
				+ item.LATITUDE + ",'" + item.PARKNAME + "')";
		var row = "<tr " + operate + " height=30px bgcolor='#F0F0F0'>"
		var colum = "<td align='center'>";
		// 显示停车场的名字
		colum += item.PARKNAME;
		colum += "</td><td align='center'>";
		colum += item.REMAINBERTHNUM+"("+ item.TOTALNUM +")";
		colum += "</td>";
		row += colum;
		row += "</tr>";

		innerHtml += row;
	}
	innerHtml += "</table>";
	document.getElementById("berthDetail").innerHTML = innerHtml
}
var Q = "";
function showPlaceOfParkLot(longitude, latitude, parkName) {

	var point = new BMap.Point(longitude, latitude);
	var opts = {
		position : point, // 指定文本标注所在的地理位置
		offset : new BMap.Size(30, -30)
	// 设置文本偏移量
	}

	var allOverlay = globMap.getOverlays();
	for (var i = 0; i < allOverlay.length; i++) {

		if (allOverlay[i].Q == Q) {

			globMap.removeOverlay(allOverlay[i]);
		}
	}
	nowShowLabelQ = parkName + "停车场在这里，欢迎停车！";
	var label = new BMap.Label(nowShowLabelQ, opts); // 创建文本标注对象
	Q = label.Q;
	label.setStyle({
		color : "black",
		fontSize : "12px",
		height : "20px",
		lineHeight : "20px",
		fontFamily : "微软雅黑",
		borderColor : "black"
	});
	globMap.addOverlay(label);

	globMap.setCenter(new BMap.Point(longitude, latitude), mapLeave);
}

var centerFlag = false;
function createAllPark(data) {
	var nodes = data.children;
	for (var i = 0; i < nodes.length; i++) {
		var node = nodes[i];
		if (node.attributes.type == 1) {
			var longitude = node.attributes.longitude;
			var latitude = node.attributes.latitude;
			if (centerFlag) {
				globMap
						.setCenter(new BMap.Point(longitude, latitude),
								mapLeave);
				centerFlag = false;
			}

			var myIcon = createIconForPark(node.attributes.freeBerthNumber,
					node.attributes.totalBerthNumber, node.attributes.parkMode);
			var marker = new BMap.Marker(new BMap.Point(longitude, latitude), {
				icon : myIcon
			});
			var labelInfo = "<input type='hidden' id='parkId' value="
					+ node.attributes.id + ">";
			var label = new BMap.Label(labelInfo, {
				offset : new BMap.Size(0, 0)
			});
			label.setStyle({
				color : "#fff",
				fontSize : "16px",
				backgroundColor : "0.05",
				border : "0",
				fontWeight : "bold"
			});
			marker.setLabel(label);

			marker.addEventListener("click", function(e) {
				showBerthDetail(this);
			});
			marker.setTitle(node.text);
			globMap.addOverlay(marker);
		}
	}
}

function createOverlay() {
	var nodes = $('#parkTree').tree('getChecked');
	globMap.clearOverlays();
	var number = 0;
	var centerFlag = true;
	var berthNumber = 0;
	var totalBerthNumber = 0;
	var workingBerthNumber = 0;
	var totalWorkingBerthNumber = 0;
	var freeBerthNumber = 0;
	var parkingText = "";
	var showText;
	if (nodes.length == 0) {
		parkingText = "<p>已选中停车点总数：<font color=red>";
		parkingText += number + "</font><br>";
		parkingText += "泊位总数：<font color=red>" + totalBerthNumber + "</font>";
		parkingText += "<br>空泊位数:<font color=red>" + freeBerthNumber
				+ "</font>";
		parkingText += "<br>使用中：<font color=red>" + totalWorkingBerthNumber;
		parkingText += "</font></p>";
		document.getElementById("berthDetail").innerHTML = parkingText;
		return;
	}
	for (var i = 0; i < nodes.length; i++) {
		var node = nodes[i];
		if (node.attributes.type == 1) {
			number += 1;
			var longitude = node.attributes.longitude;
			var latitude = node.attributes.latitude;
			if (centerFlag) {
				globMap.centerAndZoom(new BMap.Point(longitude, latitude),
						mapLeave + 4);
				centerFlag = false;
			}
			var myIcon = createIconForPark(node.attributes.freeBerthNumber,
					node.attributes.totalBerthNumber, node.attributes.parkMode);
			var marker = new BMap.Marker(new BMap.Point(longitude, latitude), {
				icon : myIcon
			});
			var labelInfo = "<input type='hidden' id='parkId' value="
					+ node.attributes.id + ">" + node.text;
			var label = new BMap.Label(labelInfo, {
				offset : new BMap.Size(20, -10)
			});
			marker.setLabel(label);
			marker.addEventListener("click", function(e) {
				showBerthDetail(this);
			});
			globMap.addOverlay(marker);

			var label = marker.getLabel().content.toString();
			var start = label.lastIndexOf("=") + 1;
			var end = label.lastIndexOf(">");
			var idValue = label.substring(start, end);
			var parkName = label.substring(end + 1, label.length);
			$
					.ajax({
						url : 'queryBerthDetailByParkId.do',
						type : 'post',
						data : {
							parkId : idValue
						},
						success : function(result) {
							$('#queryParkId').val(idValue);
							$('#queryBerthId').val("");

							berthNumber = result.totalBerthNumber;
							totalBerthNumber = parseInt(berthNumber)
									+ parseInt(totalBerthNumber);
							workingBerthNumber = result.workingBerthNumber;
							totalWorkingBerthNumber = parseInt(workingBerthNumber)
									+ parseInt(totalWorkingBerthNumber);
							freeBerthNumber = parseInt(totalBerthNumber)
									- parseInt(totalWorkingBerthNumber);

							parkingText = "<p>已选中停车点总数：<font color=red>";
							parkingText += number + "</font><br>";
							parkingText += "泊位总数：<font color=red>"
									+ totalBerthNumber + "</font>";
							parkingText += "<br>空泊位数:<font color=red>"
									+ freeBerthNumber + "</font>";
							parkingText += "<br>使用中：<font color=red>"
									+ totalWorkingBerthNumber;
							parkingText += "</font></p><br>";
							data = result.dataList;
							showText = "<table>";
							showText = showText + "<tr><td colspan='2'>"
									+ parkingText + "</td></tr>";
							showText += "</table>";
							document.getElementById("berthDetail").innerHTML = showText;
						}
					});
		}

	}
	if (centerFlag)
		globMap.centerAndZoom(new BMap.Point(cityCenterLon, cityCenterLat),
				mapLeave);
}

function showBerthDetail(e) {
	var label = e.getLabel().content.toString();
	var start = label.lastIndexOf("=") + 1;
	var end = label.lastIndexOf(">");
	var idValue = label.substring(start, end);
	var parkName = label.substring(end + 1, label.length);
	$.ajax({
		url : 'queryBerthDetailByParkId.do',
		type : 'post',
		data : {
			parkId : idValue
		},
		success : function(result) {
			fillTheParkDetail(result);
			$('#queryParkId').val(idValue);
			$('#queryBerthId').val("");
		}
	});
}

function createIconForPark(freeBerthNumber, totalBerthNumber, parkMode) {
	var myIcon = "";
	var berthRate = parseInt(freeBerthNumber * 100 / totalBerthNumber);
	if (totalBerthNumber == 0) {
		berthRate = 0;
	}
	if (parkMode == 1) {
		// 停车点
		if (freeBerthNumber < 2) {
			myIcon = new BMap.Icon(basePath
					+ "/assets/images/berthNum/red/park_red.png",
					new BMap.Size(25, 25), {
						imageSize : new BMap.Size(25, 25)
					});
		} else if (freeBerthNumber < 4) {
			myIcon = new BMap.Icon(basePath
					+ "/assets/images/berthNum/blue/park_blue.png",
					new BMap.Size(25, 25), {
						imageSize : new BMap.Size(25, 25)
					});
		} else if (freeBerthNumber >= 4) {
			myIcon = new BMap.Icon(basePath
					+ "/assets/images/berthNum/green/park_green.png",
					new BMap.Size(25, 25), {
						imageSize : new BMap.Size(25, 25)
					});
		}
	} else if (parkMode == 2) {
		// 停车场
		if (berthRate <= 10) {
			myIcon = new BMap.Icon(basePath
					+ "/assets/images/berthNum/red/parklot_red.png",
					new BMap.Size(25, 25), {
						imageSize : new BMap.Size(25, 25)
					});
		} else if (berthRate > 10 && berthRate <= 20) {
			myIcon = new BMap.Icon(basePath
					+ "/assets/images/berthNum/blue/parklot_blue.png",
					new BMap.Size(25, 25), {
						imageSize : new BMap.Size(25, 25)
					});
		} else if (berthRate > 20) {
			myIcon = new BMap.Icon(basePath
					+ "/assets/images/berthNum/green/parklot_green.png",
					new BMap.Size(25, 25), {
						imageSize : new BMap.Size(25, 25)
					});
		}
	} else if (parkMode == 4) {
		// 预约停车场
		if (berthRate <= 10) {
			myIcon = new BMap.Icon(basePath
					+ "/assets/images/berthNum/red/park_cribe_red.png",
					new BMap.Size(25, 25), {
						imageSize : new BMap.Size(25, 25)
					});
		} else if (berthRate > 10 && berthRate <= 20) {
			console.log(freeBerthNumber);
			console.log(totalBerthNumber);
			myIcon = new BMap.Icon(basePath
					+ "/assets/images/berthNum/blue/park_cribe_blue.png",
					new BMap.Size(25, 25), {
						imageSize : new BMap.Size(25, 25)
					});
		} else if (berthRate > 20) {
			myIcon = new BMap.Icon(basePath
					+ "/assets/images/berthNum/green/park_cribe_green.png",
					new BMap.Size(25, 25), {
						imageSize : new BMap.Size(25, 25)
					});
		}
	}

	return myIcon;
}
function calcDis() {
	var myDis = new BMapLib.DistanceTool(globMap);
	myDis.open();
}
// 重置地图
function refreshMap() {
	globMap.reset();
}
function searchBerth() {
	var value = $('#searchBox').val();
	if (value) {
		$('#queryBerthId').val(value);
		$('#queryParkId').val("");
		fillTheBerthDetail(value);
		// clearInterval(timeoutId);
		// timeoutId = setInterval('timer()', internalTime);
	} else {
		globMap.clearOverlays();
		// clearInterval(timeoutId);
		// timeoutId = setInterval('timer()', internalTime);
		$('#parkTree').tree('reload');
	}
}
var onclickAhead = "aheadPhoto()";
var onclickBehand = "behandPhoto()";
var photos = [];
var index = 0;
function showRecord(id) {
	$.ajax({
		url : 'getRecord.do',
		type : 'post',
		data : {
			id : id
		},
		success : function(result) {
			if (result.success) {
				$('#recordForm').form('load', result.data);
				$('#plateColor').val(
						sys.dicts.text('PLATE_COLOR', result.data.plateColor));
				$('#feeState').val(
						sys.dicts.text('FEE_STATE', result.data.feeState));
				$('#isManual').val(
						sys.dicts.text('IS_MANUAL', result.data.isManual));
				$('#parkFee').val(result.parkFee);
				$('#prepayFee').val(result.prepay);
				if (result.data.photoNum == 0) {
					photos = [];
					$('#photo').attr('src', photos);
					$('#ahead').removeAttr('onclick');
					$('#behand').removeAttr('onclick');
				} else {
					photos = result.photos;
					index = 0;
					$('#photo').attr('src', photos[0]);
					$('#ahead').attr('onclick', onclickAhead);
					$('#behand').attr('onclick', onclickBehand);
				}
				$('#showRecord').dialog('open');
			} else {
				$.messager.show({
					title : '提示',
					msg : result.msg
				});
			}
		}
	});

}

function aheadPhoto() {
	if (index != 0) {
		index -= 1;
		$('#photo').attr('src', photos[index]);
	}
}
function behandPhoto() {
	if (index != photos.length - 1) {
		index += 1;
		$('#photo').attr('src', photos[index]);
	}
}

function timer() {

	var parkId = $('#queryParkId').val();
	var berthId = $('#queryBerthId').val();
	if (parkId != "") {
		$('#parkTree').tree('reload');
		$.ajax({
			url : 'queryBerthDetailByParkId.do',
			type : 'post',
			data : {
				parkId : parkId
			},
			success : function(result) {
				fillTheParkDetail(result);
			},
			complete : function(XHR, TS) {
				XHR = null;
			}
		});
	} else if (berthId != "") {
		fillTheBerthDetail(berthId);
	}
}

var parkingText;
var data;
var showText;
var status;
var iconFile;
var operate;
var temp;
var myIcon;
function fillTheParkDetail(result) {

	parkingText = "<p>";
	if (result.parkType == 1) {
		parkingText += "停车点:<font color=red>" + result.parkName;
	} else {
		parkingText += "停车场:<font color=red>" + result.parkName;
	}
	parkingText += "</font><br>总泊位数:<font color=red>" + result.totalBerthNumber;
	parkingText += "</font><br>";
	parkingText += "空泊位数:<font color=red>" + result.freeBerthNumber
			+ "</font><br>";
	parkingText += "使用中：<font color=red>" + result.workingBerthNumber;
	parkingText += "</font></p><br>";
	showText = "<table>";
	showText = showText + "<tr><td colspan='2'>" + parkingText + "</td></tr>";
	if (result.parkType == 1) {
		data = result.dataList;
		for (var i = 0; i < data.length; i = i + 2) {
			status = data[i].berthStatus;
			iconFile = '';
			operate = '';
			if (status == 0) {
				iconFile = showIconForPark("empty");
			} else {
				iconFile = showIconForPark(data[i].feeStatus);
				operate = 'onclick=showRecord(' + data[i].recordId + ')';
			}
			temp = "<tr style='height:80px'><td style='height:80px;width:140px' align='center'><img "
					+ operate + " src='" + iconFile + "'/><br>";
			temp += data[i].berthCode + "<br>";
			// 如果泊位不是空闲状态，则显示车辆驶入时间
			if (0 != status) {
				if (data[i].plateNo != null)
					temp += "<font color=grey>车牌:" + data[i].plateNo
							+ "</font><br>";
				if (data[i].arriveTime != null) {
					temp += "<font color=grey>" + data[i].arriveTime
							+ "</font>";
				}
				temp += "</td>";
			} else {
				temp += "</td>";
			}

			showText += temp;

			if ((i + 1) < data.length) {
				temp = "";
				status = data[i + 1].berthStatus;
				iconFile = '';
				operate = '';
				if (status == 0) {
					iconFile = showIconForPark("empty");
				} else {
					iconFile = showIconForPark(data[i + 1].feeStatus);
					operate = 'onclick=showRecord(' + data[i + 1].recordId
							+ ')';
				}

				temp = "<td style='height:80px;width:140px' align='center'><img "
						+ operate + " src='" + iconFile + "'/><br>";
				temp += data[i + 1].berthCode + "<br>";

				// 如果泊位不是空闲状态，则显示车辆驶入时间
				if (0 != status) {
					if (data[i + 1].plateNo != null)
						temp += "<font color=grey>车牌:" + data[i + 1].plateNo
								+ "</font><br>";
					if (data[i + 1].arriveTime != null) {
						temp += "<font color=grey>" + data[i + 1].arriveTime
								+ "</font>";
					}
					temp += "</td></tr>";
				}
				showText += temp;
			} else {
				showText += "</tr>";
			}
		}
	}
	showText += "</table>";
	document.getElementById("berthDetail").innerHTML = showText;
}

function showIconForPark(status) {
	var iconFile = "";
	if ("empty" == status) {
		iconFile = basePath + "/assets/images/park/empty.png";
	} else if ('00' == status) {
		iconFile = basePath + "/assets/images/park/car_blue.png";
	} else if ('01' == status) {
		iconFile = basePath + "/assets/images/park/car_green.png";
	} else if ('02' == status) {
		iconFile = basePath + "/assets/images/park/car_red.png";
	} else if ('03' == status) {
		iconFile = basePath + "/assets/images/park/car_red.png";
	} else if ('04' == status) {
		iconFile = basePath + "/assets/images/park/car_green.png";
	} else if ('05' == status) {
		iconFile = basePath + "/assets/images/park/car_green.png";
	} else if ('06' == status) {
		iconFile = basePath + "/assets/images/park/car_red.png";
	} else if ('07' == status) {
		iconFile = basePath + "/assets/images/park/car_green.png";
	} else if ('08' == status) {
		iconFile = basePath + "/assets/images/park/car_green.png";
	} else if ('09' == status || '13' == status) {
		iconFile = basePath + "/assets/images/park/car_green.png";
	} else {
		iconFile = basePath + "/assets/images/park/car_green.png";
	}
	return iconFile;
}

function fillTheBerthDetail(value) {
	$
			.ajax({
				url : 'queryBerth.do?berthCode=' + value,
				type : 'post',
				success : function(result) {
					if (result.success) {
						parkingText = "<p><font color=red>";
						parkingText += result.berthCode
								+ "</font>泊位,属于<font color=red>"
								+ result.parkName + "</font>停车点</p>";
						var showText = "<table>";
						showText = showText + "<tr><td>" + parkingText
								+ "</td></tr>";

						status = result.berthStatus;
						iconFile = '';
						myIcon = '';
						operate = '';
						if (status == 0) {
							iconFile = showIconForPark("empty");
							myIcon = new BMap.Icon(iconFile, new BMap.Size(25,
									25), {
								imageSize : new BMap.Size(27, 25)
							});
						} else {
							iconFile = showIconForPark(result.feeStatus);
							myIcon = new BMap.Icon(iconFile, new BMap.Size(27,
									15), {
								imageSize : new BMap.Size(27, 15)
							});
							operate = 'onclick=showRecord(' + result.recordId
									+ ')';
						}
						temp = "<tr style='height:80px' ><td style='heigth:250px;width:220px' align='center' ><img "
								+ operate + " src='" + iconFile + "'/><br>";
						temp += result.berthCode + "<br>";
						myIcon = createIconForPark(result.freeBerthNum,
								result.totalBerthNum);
						// 如果泊位不是空闲状态，则显示车辆驶入时间
						if (0 != status) {
							if (result.plateN != null)
								temp += "<font color=grey>车牌:" + result.plateNo
										+ "</font><br>";
							if (result.arriveTime != null) {
								temp += "<font color=grey>" + result.arriveTime
										+ "</font>";
							}
							temp += "</td></tr>";
						}

						showText += temp;

						showText += "</table>";
						document.getElementById("berthDetail").innerHTML = showText;

						lon = result.lont;
						lat = result.lat;
						if (lon != '' && lat != '') {
							globMap.centerAndZoom(new BMap.Point(lon, lat),
									mapLeave);
							globMap.clearOverlays();

							var marker = new BMap.Marker(new BMap.Point(lon,
									lat), {
								icon : myIcon
							});
							globMap.addOverlay(marker);
						}
						$('#mainLayout').layout('expand', 'east');
					} else {
						$.messager.show({
							title : '提示',
							msg : '未查到相关泊位信息'
						});
					}
				},
				complete : function(XHR, TS) {
					XHR = null;
				}
			});
}

function showInstruction() {
	$('#instructionDialog').dialog('open');
}