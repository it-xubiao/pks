function tendParkTimesIdleBerthFun(tendParkTimesJson, tendIdleBerthJson) {
	//停车次数
	var hours_park_lj = tendParkTimesJson.hours;
	var parkTimes_lj = tendParkTimesJson.parkTimes;

	//空余泊位
	var hours_berth_lj = tendIdleBerthJson.hours;
	var idleBerthNum_lj = tendIdleBerthJson.idleBerthNum;

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
	//停车次数		  
	var lineChartData_tccs = {
		labels : hours_park_lj,
		datasets : [ {
			label : "累计停车次数",
			fillColor : "#FF0000", // 背景色
			strokeColor : "#FF0000", // 线
			pointColor : "#FF0000", // 点
			pointStrokeColor : "#fff", // 点的包围圈
			data : parkTimes_lj
		//Y轴
		} ]
	};
	var lineChartCanvas_tccs = $("#tccsDiv").get(0).getContext("2d");
	var lineChart_tccs = new Chart(lineChartCanvas_tccs);
	lineChartOptions.datasetFill = false;
	lineChart_tccs.Line(lineChartData_tccs, lineChartOptions);

	//空余泊位趋势
	var lineChartData_kybw = {
		labels : hours_berth_lj,
		datasets : [ {
			label : "空余泊位趋势",
			fillColor : "#FF0000", // 背景色
			strokeColor : "#FF0000", // 线
			pointColor : "#FF0000", // 点
			pointStrokeColor : "#fff", // 点的包围圈
			data : idleBerthNum_lj
		//Y轴
		} ]
	};
	var lineChartCanvas_kybw = $("#sybwDiv").get(0).getContext("2d");
	var lineChart_kybw = new Chart(lineChartCanvas_kybw);
	lineChartOptions.datasetFill = false;
	lineChart_kybw.Line(lineChartData_kybw, lineChartOptions);

}
