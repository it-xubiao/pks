<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
%>
<script type="text/javascript">
	var basePath = '<%=basePath%>';//js中存放当前页面的root路径方便调用

</script>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>智能停车收费系统</title>
<!-- Tell the browser to be responsive to screen width -->
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<!-- Bootstrap 3.3.5 -->
<link rel="stylesheet" href="<%=basePath %>/assets-adminlte/bootstrap/css/bootstrap.min.css" />
<!-- Font Awesome -->
<link rel="stylesheet" href="<%=basePath %>/assets-adminlte/bootstrap/css/font-awesome.min.css" />
<!-- Ionicons -->
<link rel="stylesheet" href="<%=basePath %>/assets-adminlte/bootstrap/css/ionicons.min.css" />

<!-- Theme style -->
<link rel="stylesheet" href="<%=basePath %>/assets-adminlte/dist/css/AdminLTE.min.css" />
<!-- AdminLTE Skins. Choose a skin from the css/skins
folder instead of downloading all of them to reduce the load. -->
<link rel="stylesheet" href="<%=basePath %>/assets-adminlte/dist/css/skins/_all-skins.min.css" />

<!-- sweetalert -->
<link rel="stylesheet" href="<%=basePath %>/assets-adminlte/plugins/sweetalert/sweetalert.css" />
<!-- DataTables -->
<link rel="stylesheet" href="<%=basePath %>/assets-adminlte/plugins/bootstrap-table/bootstrap-table.css" />


<link rel="stylesheet" href="<%=basePath %>/assets-adminlte/plugins/datetimepicker/css/bootstrap-datetimepicker.min.css"/>
<link rel="stylesheet" href="<%=basePath %>/assets-adminlte/plugins/bootstrap-validator/css/bootstrapValidator.css"/>
<link rel="stylesheet" href="<%=basePath %>/assets-adminlte/plugins/bootstrap-dialog/css/bootstrap-dialog.min.css"/>

<%-- <link rel="stylesheet" href="<%=basePath %>/assets-adminlte/plugins/ztree/demo.css"/>
<link rel="stylesheet" href="<%=basePath %>/assets-adminlte/plugins/ztree/zTreeStyle.css"/> --%>


<%--<script src="<%=basePath %>/assets-adminlte/plugins/common/form_check.js"></script>--%>

<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
<script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->

<!-- jQuery 2.1.4 -->
<script src="<%=basePath %>/assets-adminlte/plugins/jQuery/jQuery-2.1.4.min.js"></script>
<script type="text/javascript" src="<%=basePath%>/assets-adminlte/plugins/ztree/jquery.ztree.all.js"></script>
<!-- Bootstrap 3.3.5 -->
<script src="<%=basePath %>/assets-adminlte/bootstrap/js/bootstrap.min.js"></script>
<!-- SlimScroll -->
<script src="<%=basePath %>/assets-adminlte/plugins/slimScroll/jquery.slimscroll.min.js"></script>
<!-- bootstarp-table -->
<script src="<%=basePath %>/assets-adminlte/plugins/sweetalert/sweetalert-dev.js"></script>
<script src="<%=basePath %>/assets-adminlte/plugins/bootstrap-table/bootstrap-table.js"></script>
<script src="<%=basePath %>/assets-adminlte/plugins/bootstrap-table/bootstrap-table-export.js"></script>
<script src="<%=basePath %>/assets-adminlte/plugins/bootstrap-table/tableExport.js"></script>
<script src="<%=basePath %>/assets-adminlte/plugins/bootstrap-table/bootstrap-table-zh-CN.js"></script>

<!-- bootstarp-validator -->
<script type="text/javascript" src="<%=basePath %>/assets-adminlte/plugins/bootstrap-validator/js/bootstrapValidator.min.js"></script>
<script type="text/javascript" src="<%=basePath %>/assets-adminlte/plugins/bootstrap-validator/js/language/zh_CN.js"></script>
<script type="text/javascript" src="<%=basePath %>/assets-adminlte/plugins/bootstrap-dialog/js/bootstrap-dialog.min.js"></script>
<script type="text/javascript" src="<%=basePath %>/assets-adminlte/plugins/daterangepicker/moment.min.js"></script>
<script type="text/javascript" src="<%=basePath %>/assets-adminlte/plugins/datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
<script type="text/javascript" src="<%=basePath %>/assets-adminlte/plugins/datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js"></script>
<script type="text/javascript" src="<%=basePath%>/assets-adminlte/js/commons/jquery-form.js"></script>
<script type="text/javascript" src="<%=basePath%>/assets-adminlte/js/commons/package.js"></script>
<script type="text/javascript" src="<%=basePath%>/assets-adminlte/js/commons/base.js?v=11"></script>
<style>
<!--
#toolbar{
	display:none;
}
-->
</style>
<script type="text/javascript">
	sys.dicts = sys.paserJson('${DICTIONARY_JSON_CACHE}');
	sys.dicts = $.extend(sys.dicts, {
		text: function(codeType, codeValue) {
			if(codeValue != undefined && codeValue != null) {
				codeValue = codeValue + '';
				if(codeValue.indexOf(',') != -1) {
					var arr = codeValue.split(',');
					var str = '';
					for(var i = 0; i < arr.length; i++) {
						str += sys.dicts.text(codeType, arr[i]) + '、';
					}
					return str.length > 0 ? str.substring(0, str.length -1) : str;
				} else {
					return sys.dicts[codeType + codeValue];
				}
			} else {
				return function(value) {
					return sys.dicts[codeType + value];
				}
			}
		}
	});
</script>
