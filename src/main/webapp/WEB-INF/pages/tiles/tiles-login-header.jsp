<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page language="java"
	import="com.shesuhui.diamond.model.*,java.util.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/javascript/func/login.js"></script>

<div class="container" id="top">
	<nav class="navbar  navbar-inverse navbar-fixed-top" role="navigation">
		<div class="container-fluid navbar-inner">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed"
					data-toggle="collapse" data-target="#navbar">
					<span class="sr-only">Toggle navigation</span> <span
						class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a class="navbar-brand navbar-brand-active" href="#"> <img
					alt="钻石商城"
					src="${pageContext.request.contextPath }/images/favicon.png">
				</a> <a class="navbar-brand  navbar-brand-active" href="/">钻石商城</a>
			</div>
			<div class="collapse navbar-collapse" id="navbar">
				<div class="error">${sessionScope.msg}</div>
				<form class="navbar-form navbar-right" role="search" id="loginForm"
					>
					<div class="form-group">
						<input type="text" class="form-control focus" placeholder="用户名"
							data-toggle="tooltip" data-placement="bottom" title="请输入用户名"
							id="iptLoginId" maxLength="20" name="loginId"> <input
							type="password" class="form-control" placeholder="密码"
							data-toggle="tooltip" data-placement="bottom" title="请输入密码"
							id="iptPassword" maxLength="20" name="password">
					</div>

					<button class="btn btn-primary" id="btnLogin"
						data-loading-text="登录中…………" autocomplete="off">
						<span class="glyphicon glyphicon-log-in"></span>&nbsp;登录
					</button>
					&nbsp;&nbsp;<a href="/system/toRegister.do"
						class="navbar-link active" id="regLink">注册</a>

				</form>
				<a href="/system/toRegister.do" class="hide" id="regLink"></a>
			</div>
		</div>
		<!--fluid-->
	</nav>
</div>


<%--	<div style="height: 2px;"></div>--%>