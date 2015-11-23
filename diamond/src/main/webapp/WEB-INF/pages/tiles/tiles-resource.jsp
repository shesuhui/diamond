<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path;
%>

<link rel="shortcut icon" type="image/x-icon" href="<%=basePath%>/favicon.ico" />
<!-- Bootstrap -->
<link href="<%=basePath%>/css/bootstrap.min.css" rel="stylesheet"
	media="screen" />
<link
	href="<%=basePath%>/javascript/thirdparty/bootstrapValid/bootstrapValidator.min.css"
	rel="stylesheet" media="screen" />
<link rel="StyleSheet" href="<%=basePath%>/css/diamond-template.css" type="text/css"
	media="screen" />
<script>
	var ROOTPATH ="<%=basePath%>";
</script>
<script src="<%=basePath%>/javascript/thirdparty/jquery/jquery-2.1.1.min.js"></script>
 <script src="<%=basePath%>/javascript/thirdparty/bootstrap.min.js"></script>
<script src="<%=basePath%>/javascript/thirdparty/bootbox/bootbox.js"></script>
<script
	src="<%=basePath%>/javascript/thirdparty/bootstrapValid/bootstrapValidator.min.js"></script>
<script src="<%=basePath%>/javascript/thirdparty/bootstrapValid/zh_CN.js"></script>
<script src="<%=basePath%>/javascript/thirdparty/simplePg/jquery.simplePagination.js"></script>
<script src="<%=basePath%>/javascript/common.js"></script>


