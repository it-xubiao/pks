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
<title>康缘PKS</title>
</head>
<body class="layui-layout-body">
	<div class="layui-layout layui-layout-admin">
		<div class="layui-header">
			<div class="layui-logo">康缘PKS</div>
			<!-- 头部区域（可配合layui已有的水平导航） -->
			<ul class="layui-nav layui-layout-left">
				<li class="layui-nav-item"><a href="jinQingChuenChen.jsp">金青醇沉</a></li>
				<li class="layui-nav-item"><a href="chuenchenNS.jsp">醇沉浓缩</a></li>
				<li class="layui-nav-item"><a href="">萃取浓缩</a></li>
			</ul>
		</div>
	</div>

	<div id="mes_layout">
		<div>
		</div>
		<!--生产进度看板-->
		<div v-if="countPage=='1'">
			<div style="display: flex;">
				<div style="width: 40%;"><h2 class="title">金青醇沉</h2></div>
			</div>
			<div class="content">
				<table class="table">
					<thead>
					<tr class="thead_1">
						<th class="first">序号</th>
						<!-- <th>工单号</th>-->
						<th>产品</th>
						<th>生产批号</th>
						<th>工序</th>
						<th>当前状态</th>
						<th>最后更新时间</th>
					</tr>
					</thead>
					<tbody>
					<tr v-for="(el,index) in content" v-bind:class="{green:index%2==0}">
						<td class="index first">{{index+1}}</td>
						<!--<td>{{el.wo}}</td>-->
						<td>{{el.cpmc}}</td>
						<td>{{el.lot}}</td>
						<td>{{el.gx}}</td>
						<td>{{el.cstatus}}</td>
						<td>{{el.startTime}}</td>
					</tr>
					</tbody>
				</table>
			</div>

		</div>

	</div>



	<script type="text/javascript" src="<%=basePath%>/js/jquery.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/bootstrap.js"></script>
	<script type="text/javascript" src="<%=basePath%>/js/vue.js"></script>
	<script type="text/javascript">
        var vue;

        //正式环境
        var way1 = "http://172.31.1.20:8081/pks/selectAll/listAll";
        //本地
        //var way1 = "http://localhost:8080/lft-kb/kanban/kanban1";

        vue = new Vue({
            el: '#mes_layout',
            data: {
                // content: [],
                content: [
                ],
                total: 3,
                pageSize: 10,
                pageNum: 1,
                index: 1,
                time: 10,
                suntime: 15,
                page: 1,
                allPage: 6,
                countPage: 1,
                user: '',
                way: '',
                myDate:""
            },
            methods: {

            }
        })
       /* $(function () {
            getAjax(way1);
            var ways = way1;
            const move = setInterval(function(){
                if(vue.total <= (vue.pageNum * vue.pageSize)){
                    vue.pageNum = 1;
                    getAjax(ways);
                }else{
                    vue.pageNum++;
                    getAjax(ways);
                }

            }, vue.time * 1000000);
        });*/


        function getAjax(way) {
            console.log(vue.pageNum)
            $.ajax({
                type: 'POST',
                url: way,
                dataType: "jsonp",  //指定服务器返回的数据类型
                crossDomain: true,
                data: {
                    pageSize: vue.pageSize,
                    page: vue.pageNum,

                },
                jsonp: 'callback',
                timeout: 1000,
                success: function (ret) {
                    console.log(ret)
                    ret = ret[0];
                    vue.content = ret.rows;
                    // vue.pageNum = ret.pageNum;
                    vue.total = ret.total;
                    // vue.countPage = ret.kanbanPage;
                    vue.time = ret.time;
                },
                error: function (xhr, types, errorThrown) {
                    console.log(JSON.stringify(xhr));
                    console.log(errorThrown);
                }
            });
        }


        function timeNew(){
            setInterval("document.getElementById('datetime').innerHTML=new Date().toLocaleString();", 1000)
        }

	</script>

	<script type="text/javascript" src="<%=basePath%>js/plugins/jquery.js"></script>
	<script>
		//JavaScript代码区域
		layui.use('element', function() {
			var element = layui.element;

		});
	</script>
</body>
</html>
