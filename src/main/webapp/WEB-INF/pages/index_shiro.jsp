<?xml version="1.0" encoding="UTF-8" ?>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Role and Permissions Security Home Page</title>
</head>
<body>
	<h3>Welcome to The Role and Permissions Security Home Page</h3>
	<p>Our web site does have security and it includes security by ROLE
		and by PERMISSION, so NOT everyone who is logged in can visit all our
		pages.</p>
	<shiro:guest>
		<p>
			<%response.sendRedirect(request.getContextPath()+"/login"); %>
		</p>
	</shiro:guest>
	<shiro:authenticated>
		<%response.sendRedirect(request.getContextPath()+"/login"); %>
	</shiro:authenticated>

</body>
</html>