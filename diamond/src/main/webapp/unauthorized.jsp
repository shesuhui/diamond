<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Unauthorized Page</title>
</head>
<body>
	<p>你没有权限访问</p>
	<br clear="left" />
	<p>
		<a href='index.jsp'>Home</a> | <a href="<c:url value="/login.jsp" />">Login</a>
	</p>
</body>
</html>