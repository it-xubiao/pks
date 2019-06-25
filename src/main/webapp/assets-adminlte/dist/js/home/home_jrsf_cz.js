function tendChrageRefillFun(tendChrageJson, tendRefillJson) {
	//首发累计趋势图
	var hours_ljsf = tendChrageJson.hours;
	var totalChargeFee_ljsf = tendChrageJson.totalChargeFee;
	var paymentCard_ljsf = tendChrageJson.paymentCard;
	var alipay_ljsf = tendChrageJson.alipay;
	var otherCardPay_ljsf = tendChrageJson.otherCardPay;
	var wecha_ljsf = tendChrageJson.wecha;

	//充值累计趋势图
	var hours_ljcz = tendRefillJson.hours;
	var totalRefillFee_ljcz = tendRefillJson.totalRefillFee;
	var paymentCard_ljcz = tendRefillJson.paymentCard;
	var driverCard_ljcz = tendRefillJson.driverCard;
	var versualCard_ljcz = tendRefillJson.versualCard;
	var cartag_ljcz = tendRefillJson.cartag;

	//今日累计收费		  
	var lineChartData_sf = {
		labels : hours_ljsf,
		datasets : [ {
			label : "合计",
			fillColor : "#FF0000", // 背景色
			strokeColor : "#FF0000", // 线
			pointColor : "#FF0000", // 点
			pointStrokeColor : "#fff", // 点的包围圈
			data : totalChargeFee_ljsf
		//Y轴
				}, {
					label : "代缴卡",
					fillColor : "#0000FF", // 背景色
					strokeColor : "#0000FF", // 线
					pointColor : "#0000FF", // 点
					pointStrokeColor : "#fff", // 点的包围圈
					data : paymentCard_ljsf
				},{
					label : "支付宝",
					fillColor : "#FF8800", // 背景色
					strokeColor : "#FF8800", // 线
					pointColor : "#FF8800", // 点
					pointStrokeColor : "#fff", // 点的包围圈
					data : alipay_ljsf
				}, {
					label : "微信",
					fillColor : "#00AA00", // 背景色
					strokeColor : "#00AA00", // 线
					pointColor : "#00AA00", // 点
					pointStrokeColor : "#fff", // 点的包围圈
					data : wecha_ljsf
				},{
					label : "其它",
					fillColor : "#FF00FF", // 背景色
					strokeColor : "#FF00FF", // 线
					pointColor : "#FF00FF", // 点
					pointStrokeColor : "#fff", // 点的包围圈
					data : otherCardPay_ljsf
				}]
	};
	//今日累计充值
	var lineChartData_cz = {
		labels : hours_ljcz,
		datasets : [ {
			label : "合计",
			fillColor : "#FF0000", // 背景色
			strokeColor : "#FF0000", // 线
			pointColor : "#FF0000", // 点
			pointStrokeColor : "#fff", // 点的包围圈
			data : totalRefillFee_ljcz
		}, {
			label : "代缴卡",
			fillColor : "#0000FF", // 背景色
			strokeColor : "#0000FF", // 线
			pointColor : "#0000FF", // 点
			pointStrokeColor : "#fff", // 点的包围圈
			data : paymentCard_ljcz
		}, {
			label : "车主卡",
			fillColor : "#FF00FF", // 背景色
			strokeColor : "#FF00FF", // 线
			pointColor : "#FF00FF", // 点
			pointStrokeColor : "#fff", // 点的包围圈
			data : driverCard_ljcz
		}, {
			label : "个人账户",
			fillColor : "#00AA00", // 背景色
			strokeColor : "#00AA00", // 线
			pointColor : "#00AA00", // 点
			pointStrokeColor : "#fff", // 点的包围圈
			data : versualCard_ljcz
		}, {
			label : "车载标签",
			fillColor : "#FF8204", // 背景色
			strokeColor : "#FF8204", // 线
			pointColor : "#FF8204", // 点
			pointStrokeColor : "#fff", // 点的包围圈
			data : cartag_ljcz
		}]
	};
	var lineChartOptions = {
		showScale : true,
		scaleShowGridLines : false,
		scaleGridLineColor : "rgba(0,0,0,.05)",
		// Y/X轴的颜色
		//scaleLineColor : "rgba(223,223,223)",
		// 字体
		scaleFontFamily : "'Arial'",
		scaleGridLineWidth : 1,
		scaleShowHorizontalLines : true,
		scaleShowVerticalLines : true,
		bezierCurve : false,
		bezierCurveTension : 0,
		pointDot : true,
		pointDotRadius : 4,
		pointDotStrokeWidth : 1,
		pointHitDetectionRadius : 20,
		datasetStroke : true,
		datasetStrokeWidth : 2,
		datasetFill : true,
		legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
		maintainAspectRatio : true,
		responsive : true
	};
	//收费趋势
	var lineChartCanvas_sf = $("#lineChart_sf").get(0).getContext("2d");
	var lineChart_sf = new Chart(lineChartCanvas_sf);
	lineChartOptions.datasetFill = false;
	lineChart_sf.Line(lineChartData_sf, lineChartOptions);
	//充值趋势
	var lineChartCanvas_cz = $("#lineChart_cz").get(0).getContext("2d");
	var lineChart_cz = new Chart(lineChartCanvas_cz);
	lineChartOptions.datasetFill = false;
	lineChart_cz.Line(lineChartData_cz, lineChartOptions);
}
