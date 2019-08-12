<%@page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	request.setAttribute("basePath", basePath);
%>
<html>
<head>
<script type="text/javascript" src="<%=basePath%>js/plugins/jquery.js"></script>
<script type="text/javascript" src="<%=basePath%>layui.js"></script>
<link rel="stylesheet" href="<%=basePath%>/css/layui.css">
<title>金青醇沉第二阶段</title>

</head>
<body>
	<!-- 导航栏 -->
	<div class="layui-layout layui-layout-admin">
		<div class="layui-header">
			<div class="layui-logo">康缘PKS</div>
			<!-- 头部区域（可配合layui已有的水平导航） -->
			<ul class="layui-nav layui-layout-left">
				<li class="layui-nav-item"><a href="jinQingChuenChen.jsp">数据查询</a></li>
				<!-- <li class="layui-nav-item"><a href="jinQingChuenChen.jsp">金青醇沉</a></li> -->
				<li class="layui-nav-item"><a href="JinQingChuenChenOne.jsp">金青醇沉第一阶段</a></li>
				<li class="layui-nav-item"><a href="JinQingChuenChenTwo.jsp">金青醇沉第二阶段</a></li>
				<li class="layui-nav-item"><a href="JinQingChuenChenThree.jsp">金青醇沉第三阶段</a></li>
				<li class="layui-nav-item"><a href="chuenchenNS.jsp">醇沉浓缩</a></li>
				<li class="layui-nav-item"><a href="CueiQuNongSuo.jsp">萃取浓缩</a></li>
			</ul>
		</div>
	</div>
	<!-- form表单 -->
	<div class="layui-form-item">
		<form class="layui-form">
			<div class="layui-inline">
				<label class="layui-form-label">批号</label>
				<div class="layui-input-inline" style="width: 150px;">
					<input type="batchNumber" name="batchNumber" id="batchNumber"
						placeholder="请输入批号" size="35" autocomplete="off"
						class="layui-input">
				</div>
				
				<label class="layui-form-label">罐 号</label>
				<div class="layui-input-inline" style="width: 180px;">
					<select name="deviceCode" id="deviceCode" lay-search="">
						<option value="">请选择</option>
						<option value="T3011C">T3011C</option>
						<option value="T3011D">T3011D</option>
						<option value="T3011E">T3011E</option>
						<option value="T3011F">T3011F</option>
						<option value="T3011H">T3011H</option>
						<option value="T3011J">T3011J</option>
						<option value="T3011K">T3011K</option>
						<option value="T3011L">T3011L</option>
						<option value="T3011M">T3011M</option>
						<option value="T3011N">T3011N</option>
						<option value="T3011O">T3011O</option>
						<option value="T3011P">T3011P</option>
						<option value="T3011Q">T3011Q</option>
						<option value="T3011R">T3011R</option>
						<option value="T3011S">T3011S</option>
						<option value="T3011T">T3011T</option>
						<option value="T3011U">T3011U</option>
						<option value="T3011V">T3011V</option>
						<option value="T3011W">T3011W</option>						
						<option value="T3011X">T3011X</option>
					</select>
				</div>

				<!-- <div class="layui-inline">
					<label class="layui-form-label">开始时间</label>
					<div class="layui-input-inline">
						<input type="text" class="layui-input" name="start" id="start"
							lay-verify="required" placeholder="yyyy-MM-dd HH:mm:ss">
					</div>
				</div>
				<div class="layui-inline">
					<label class="layui-form-label">结束时间</label>
					<div class="layui-input-inline">
						<input type="text" class="layui-input" name="end" id="end"
							lay-verify="required" placeholder="yyyy-MM-dd HH:mm:ss">
					</div>
				</div> -->
				<label class="layui-form-label">排序方式</label>
				<div class="layui-input-inline" style="width: 180px;">
					<select name="sort" id="sort">
						<option value="asc">升序</option>
						<option value="desc">降序 </option>
						
					</select>
				</div>

				<div class="layui-inline">
					<div class="layui-input-block">
						<button type="button" class="layui-btn" onclick="submits()"
							lay-submit lay-filter="formDemo">查询</button>
						<button type="reset" class="layui-btn layui-btn-primary">重置</button>
						<button type="button" onclick="downloadfile()" lay-submit
							lay-filter="formDemo" class="layui-btn layui-btn-danger">导出数据</button>
					</div>
				</div>
		</form>
	</div>
	<!-- 数据展示 -->
	<table id="data_list_table" lay-filter="test" lay-data="{id: 'idTest'}"></table>

	<script>
		//var table
		layui.use([ 'form', 'layedit', 'laydate', 'table', 'laypage' ],
				function() {
					table = layui.table;
					var curnum = 1;
					var nowTime = new Date().valueOf();
					var laydate = layui.laydate, laypage = layui.laypage;
					var exportData;
					//日期
					var start = laydate.render({ //开始 export
						elem : '#start',
						type : 'datetime',
						/* min : nowTime, */
						done : function(value, date) {
							endMax = end.config.max;
							end.config.min = date;
							end.config.min.month = date.month - 1;
						}
					});
					var end = laydate.render({ //结束
						elem : '#end',
						type : 'datetime',
						min : nowTime,
						done : function(value, date) {
							if ($.trim(value) == '') {
								var curDate = new Date();
								date = {
									'date' : curDate.getDate(),
									'month' : curDate.getMonth() + 1,
									'year' : curDate.getFullYear()
								};
							}
							start.config.max = date;
							start.config.max.month = date.month - 1;
						}
					});

					//初始赋值
					laydate.render({
						elem : '#start',
						value : time2,
						isInitValue : true
					});

					//初始赋值
					laydate.render({
						elem : '#end',
						value : time1,
						isInitValue : true
					});
					//第一个实例
					table.render({
						elem : '#data_list_table',
						height : 580,
						url : '/pks/JinQingChuenChen/listTow', //数据接口
						parseData : function(res) { //res 即为原始返回的数据
							return {
								"code" : res.code, //解析接口状态
								"pageCount" : res.pageCount, //解析提示文本
								"count" : res.total, //解析数据长度
								"data" : res.data
							//解析数据列表

							};
						},
						page : { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
							layout : [ 'limit', 'count', 'prev', 'page',
									'next', 'skip', 'pageCount' ] //自定义分页布局
							,
							curr : 1 //设定初始在第 5 页
							,
							groups : 5 //只显示 1 个连续页码
							,
							first : '首页' //不显示首页
							,
							last : '尾页' //不显示尾页

						},
						where : {
							batchNumber : $("#batchNumber").val(),
							stageName : $("#stageName").val(),
							deviceCode : $("#deviceCode").val()
							/* ,start : $("#start").val(),
							end : $("#end").val() */

						},
						id : 'idTest',
						totalRow : true,
                        cols : [[
                            {field: 'batchNumber', title: '批次号', width: 120,rowspan: 2,align:'center'},
                            {field: 'deviceCode', title: '罐号', width: 120,rowspan: 2,align:'center'},
                            {field: '', title: '金青醇沉第二阶段', width: 80, colspan: 4,align:'center'},
                            {field : 'curt', title : '时间', width: 180,rowspan: 2,align:'center'}
                        ], [ //表头
                            {field : 'upperTemperature', title : '罐上部温度(℃)', width : 180, align:'center'},
                            {field : 'lowerTemperature', title : '罐下部温度(℃)', width : 170, align:'center'},
                            {field : 'cumulativeAmount', title : '乙醇流量计累积量(m3)', width : 180,align:'center'},
                            {field : 'currentSpeed', title : '乙醇流量计流速(m3/h)', width : 180,align:'center'}
                        ]],
						done : function(res, curr, count) {
							exportData = res.data;
						}
					});

				});
		//导出
		function downloadfile() {
			window
					.open('http://172.31.1.20:8081/pks/JinQingChuenChen/exportTow?batchNumber='
							+ $("#batchNumber").val()							
							/* + '&start='
							+ $("#start").val() + '&end=' + $("#end").val() */
							);
		}

		function submits() {
			table.reload('idTest', {
				where : { //设定异步数据接口的额外参数，任意设
					batchNumber : $("#batchNumber").val(),
					stageName : $("#stageName").val(),
					deviceCode : $("#deviceCode").val(),
					start : $("#start").val(),
					end : $("#end").val()
				},
				page : {
					curr : 1,
					groups : 5

				//重新从第 1 页开始 layui-laypage-2
				}
			});
		}
		//查询开始时间默认当前时间-24小时
		Date.prototype.Format = function(fmt) { // author: meizz
			var o = {
				"M+" : this.getMonth() + 1, // 月份
				"d+" : this.getDate() - 1, // 日
				"h+" : this.getHours(), // 小时
				"m+" : this.getMinutes(), // 分
				"s+" : this.getSeconds(), // 秒
				"q+" : Math.floor((this.getMonth() + 3) / 3),
				"S" : this.getMilliseconds()
			// 毫秒
			};
			if (/(y+)/.test(fmt))
				fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
						.substr(4 - RegExp.$1.length));
			for ( var k in o)
				if (new RegExp("(" + k + ")").test(fmt))
					fmt = fmt.replace(RegExp.$1,
							(RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k])
									.substr(("" + o[k]).length)));
			return fmt;
		}
		Date.prototype.Format1 = function(fmt) { // author: meizz
			var o = {
				"M+" : this.getMonth() + 1, // 月份
				"d+" : this.getDate(), // 日
				"h+" : this.getHours(), // 小时
				"m+" : this.getMinutes(), // 分
				"s+" : this.getSeconds(), // 秒
				"q+" : Math.floor((this.getMonth() + 3) / 3),
				"S" : this.getMilliseconds()
			// 毫秒
			};
			if (/(y+)/.test(fmt))
				fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
						.substr(4 - RegExp.$1.length));
			for ( var k in o)
				if (new RegExp("(" + k + ")").test(fmt))
					fmt = fmt.replace(RegExp.$1,
							(RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k])
									.substr(("" + o[k]).length)));
			return fmt;
		}

		var time2 = new Date().Format("yyyy-MM-dd hh:mm:ss");
		var time1 = new Date().Format1("yyyy-MM-dd hh:mm:ss");
	</script>




</body>
</html>
