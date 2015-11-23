<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<a href="${pageContext.request.contextPath }/welcome/index.html">
	<div id="fdc-logo"></div>
</a>

<div class="fdc-header-menu">
	<div class="fdc-header-menu-content">
		<div class="menu-item notice">
			<a href="${pageContext.request.contextPath }">租售管理 </a>
		</div>
		<div class="menu-item notice">
			<a href="${pageContext.request.contextPath }/housingestate/index.html">小区管理 </a>
		</div>
		<div class="menu-item fault">
			<a href="${pageContext.request.contextPath }">餐饮信息</a>
		</div>
		<div class="menu-item personalinfo">
			<a href="${pageContext.request.contextPath }/personalinfo/index.html">个人信息</a>
		</div>
	</div>
</div>

<div class="fdc-user-nav">
	<div class="fdc-user-nav-content">
		<c:choose>
			<c:when test="${sessionScope.fdc_login_user == null }">
				Login
			</c:when>
			<c:otherwise>
				<div class="fdc-userinfo">
					<a href="${pageContext.request.contextPath }/personalinfo/index.html">${sessionScope.fdc_login_user.userName }</a>
				</div>
				<div class="fdc-logout">
					<a href="${pageContext.request.contextPath }/login/logout.html">注销</a>
				</div>
			</c:otherwise>
		</c:choose>
	</div>
</div>
<div style="clear: both;"></div>
