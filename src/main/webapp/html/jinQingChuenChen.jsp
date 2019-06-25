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
<title>金青醇沉</title>

</head>
<body>
	<!-- 导航栏 -->
	<div class="layui-layout layui-layout-admin">
		<div class="layui-header">
			<div class="layui-logo">康缘PKS</div>
			<!-- 头部区域（可配合layui已有的水平导航） -->
			<ul class="layui-nav layui-layout-left">
				<li class="layui-nav-item"><a href="ListAll.jsp">数据查询</a></li>
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
				<label class="layui-form-label">阶段名称</label>
				<!-- <div class="layui-input-inline" style="width: 150px;">
					<input type="stageName" name="stageName" id="stageName"
						placeholder="请输入阶段名称" size="35" autocomplete="no"
						class="layui-input">
				</div> -->
				<div class="layui-input-inline" style="width: 180px;">
					<select name="stageName" id="stageName">
						<option value="">请选择</option>
						<option value="浸膏分配">浸膏分配</option>
						<option value="浸膏冷藏">浸膏冷藏</option>
						<option value="减压浓缩">减压浓缩</option>
						<option value="减压浓缩2">减压浓缩2</option>
						<option value="醇沉液单效浓缩">醇沉液单效浓缩</option>
						<option value="醇沉液单效终点浓缩">醇沉液单效终点浓缩</option>
						<option value="加醇阶段1">加醇阶段1</option>
						<option value="加醇阶段2">加醇阶段2</option>
						<option value="加醇阶段3">加醇阶段3</option>
						<option value="挥发油提取">挥发油提取</option>
						<option value="煎煮提取出液">煎煮提取出液</option>
						<option value="金银花第一次提取">金银花第一次提取</option>
						<option value="金银花第二次提取">金银花第二次提取</option>
						<option value="开机浓缩">开机浓缩</option>
						
						<option value="调酸静置阶段">调酸静置阶段</option>
						<option value="升温">升温</option>
						<option value="浸膏调酸">浸膏调酸</option>
						<option value="青蒿提取">青蒿提取</option>
						<option value="出液">出液</option>
						<option value="煎煮提取保温">煎煮提取保温</option>
						<option value="一次刮板浓缩">一次刮板浓缩</option>
						<option value="二次刮板浓缩">二次刮板浓缩</option>
						<option value="冷藏">冷藏</option>
						<option value="栀子带式干燥">栀子带式干燥</option>
						<option value="浓缩">浓缩</option>
						<option value="浸膏分配混合">浸膏分配混合</option>
						<option value="单效浓缩">单效浓缩</option>
						
						<option value="调酸出液">调酸出液</option>
						<option value="第一次回流提取">第一次回流提取</option>
						<option value="第二次回流提取">第二次回流提取</option>
						<option value="金银花第一次提取">金银花第一次提取</option>
						<option value="挥发油收集">挥发油收集</option>
						<option value="萃取">萃取</option>
						<option value="浓缩出液">浓缩出液</option>
						<option value="减压浓缩出液">减压浓缩出液</option>
						<option value="进料">进料</option>
						<option value="上清液转移">上清液转移</option>
						<option value="煎煮提取T3001P出液">煎煮提取T3001P出液</option>
						<option value="煎煮提取T3001J出液">煎煮提取T3001J出液</option>
						<option value="煎煮提取T3001Q出液">煎煮提取T3001Q出液</option>
						<option value="煎煮提取T3001N出液">煎煮提取T3001N出液</option>
						<option value="煎煮提取T3001M出液">煎煮提取T3001M出液</option>
						<option value="煎煮提取T3001R出液">煎煮提取T3001R出液</option>
						<option value="煎煮提取T3001K出液">煎煮提取T3001K出液</option>
						<option value="煎煮提取T3001L出液">煎煮提取T3001L出液</option>
						<option value="煎煮提取T3001O出液">煎煮提取T3001O出液</option>
						<option value="升温、持续回收">升温、持续回收</option>
						<option value="调碱阶段">调碱阶段</option>
						<option value="回收">回收</option>
						<option value="热处理">热处理</option>
						<option value="金青带式干燥">金青带式干燥</option>
						
						<option value="萃取液单效浓缩">萃取液单效浓缩</option>
						
						<option value="萃取液转料">萃取液转料</option>
						<option value="萃取分配">萃取分配</option>
						<option value="加酸阶段1">加酸阶段1</option>
						<option value="调酸罐进液">调酸罐进液</option>
						
						<option value="静置冷藏">静置冷藏</option>
						<option value="终点浓缩">终点浓缩</option>
						<option value="煎煮提取加水">煎煮提取加水</option>
						<option value="煎煮提取升温">煎煮提取升温</option>
						<option value="抽真空进液">抽真空进液</option>
						
						<option value="浸膏相对密度检测记录">浸膏相对密度检测记录</option>
						<option value="调碱静置阶段">加酸阶段1</option>
						<option value="逆流萃取">逆流萃取</option>
						<option value="栀子提取">栀子提取</option>
						<option value="金银花提取">金银花提取</option>
					</select>
				</div>
				<label class="layui-form-label">过程名称</label>
				<div class="layui-input-inline" style="width: 180px;">
					<select name="processName" id="processName">
						<option value="">请选择</option>
						<option value="金青醇沉">金青醇沉</option>
						<option value="青蒿碱沉、调酸">青蒿碱沉、调酸</option>
						<option value="栀子提取液回收">栀子提取液回收</option>
						<option value="栀子萃取回收浓缩">栀子萃取回收浓缩</option>
						<option value="青蒿提取">青蒿提取</option>
						<option value="青蒿醇沉上清液回收">青蒿醇沉上清液回收</option>
						<option value="栀子带式干燥">栀子带式干燥</option>
						<option value="金青醇沉上清液浓缩">金青醇沉上清液浓缩</option>
						<option value="金青萃取回收浓缩">金青萃取回收浓缩</option>
						<option value="金青醇沉上清液回收">金青醇沉上清液回收</option>
						<option value="栀子热处理冷藏">栀子热处理冷藏</option>
						<option value="金青调酸、萃取">金青调酸、萃取</option>
						<option value="金银花三效板式浓缩">金银花三效板式浓缩</option>
						<option value="金青带式干燥">金青带式干燥</option>
						<option value="金银花刮板浓缩">金银花刮板浓缩</option>
						<option value="青蒿浓缩">青蒿浓缩</option>
						<option value="金银花提取">金银花提取</option>
						<option value="栀子提取液浓缩">栀子提取液浓缩</option>
						<option value="栀子提取">栀子提取</option>
					</select>
				</div>
				
				<label class="layui-form-label">中间体名称</label>
				<div class="layui-input-inline" style="width: 150px;">
					<input type="paraName" name="paraName" id="paraName"
						placeholder="请输中间体名称" size="35" autocomplete="off"
						class="layui-input">
				</div>

				<div class="layui-inline">
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
				</div>

				<div class="layui-inline">
					<div class="layui-input-block">
						<button type="button" class="layui-btn" onclick="submits()"
							lay-submit lay-filter="formDemo">查询</button>
						<button type="reset" class="layui-btn layui-btn-primary">重置</button>
						<button type="button"  onclick="downloadfile()"
							lay-submit lay-filter="formDemo" class="layui-btn layui-btn-danger">导出数据</button>
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
						height : 480,
						url : '/pks/selectAll/listAll', //数据接口
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
							processName : $("#processName").val(),
							paraName : $("#paraName").val(),
							start : $("#start").val(),
							end : $("#end").val()

						},
						id : 'idTest',
						cols : [ [ //表头
						{
							field : 'batchNumber',
							title : '批次号',
							width : 100,
							/* sort : true, */
							fixed : 'left'
						}, {
							field : 'deviceCode',
							title : '罐号',
							width : 120
						}, {
							field : 'deviceName',
							title : '罐名',
							width : 150,
						}, {
							field : 'processName',
							title : '过程名称',
							width : 190
						}, {
							field : 'stageName',
							title : '阶段名称',
							width : 190
						}, {
							field : 'productName',
							title : '产品名称',
							width : 190,
						}, {
							field : 'paraName',
							title : '中间体名称',
							width : 150,
						}, {
							field : 'value',
							title : '实际值',
							width : 90
						}, {
							field : 'unit',
							title : '单位',
							width : 70,
						}, {
							field : 'curt',
							title : '系统时间',
							width : 190
						} ] ],
						done : function(res, curr, count) {
							exportData = res.data;
						}
					});
				});
		function downloadfile() {
			window
					.open('http://127.0.0.1:8080/pks/selectAll/export?batchNumber='
							+ $("#batchNumber").val()
							+ '&stageName='
							+ $("#stageName").val()
							+ '&processName='
							+ $("#processName").val()
							+ '&paraName='
							+ $("#paraName").val()
							+ '&start='
							+ $("#start").val() + '&end=' + $("#end").val());
		}

		function submits() {
			table.reload('idTest', {
				where : { //设定异步数据接口的额外参数，任意设
					batchNumber : $("#batchNumber").val(),
					stageName : $("#stageName").val(),
					processName : $("#processName").val(),
					paraName : $("#paraName").val(),
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
