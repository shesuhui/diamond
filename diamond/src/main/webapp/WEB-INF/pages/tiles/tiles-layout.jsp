<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
 
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title><tiles:insertAttribute name="title" ignore="true" /></title>
		<link rel="shortcut icon" type="images/ico" href="${pageContext.request.contextPath }/images/favicon.ico" />
		<tiles:insertAttribute name="resource" />
		<tiles:insertAttribute name="jsglobal" />
	</head>
	<body>
				<tiles:insertAttribute name="header" />
				<tiles:insertAttribute name="topnav" />
				<tiles:insertAttribute name="content" />
				<tiles:insertAttribute name="footer" />
	</body>
</html>