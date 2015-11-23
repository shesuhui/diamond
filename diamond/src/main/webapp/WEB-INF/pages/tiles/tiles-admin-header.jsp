<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<a href="${pageContext.request.contextPath }/welcome/index.html">
	<div id="fdc-logo"></div>
</a>

<div class="fdc-header-menu">
	<div class="fdc-header-menu-content">
		<div class="menu-item notice">
			<a href="${pageContext.request.contextPath }/notice/toPublishedNotices.html">公告通知</a>
		</div>
		<div class="menu-item fault">
			<a href="${pageContext.request.contextPath }/fault/tolist.html">维修管理</a>
		</div>
		<div class="menu-item complaint">
			<a href="${pageContext.request.contextPath }/complaint/index.html">投诉建议</a>
		</div>
		<div class="menu-item building">
			<a href="${pageContext.request.contextPath }/building/index.html">房屋信息</a>
		</div>
		<div class="menu-item fee">
			<a href="${pageContext.request.contextPath }/fee/index.html">费用管理</a>
		</div>
		<div class="menu-item user">
			<a href="${pageContext.request.contextPath }/user/index.html">住户管理</a>
		</div>
		<div class="menu-item rental">
			<a href="${pageContext.request.contextPath }/owner-renter/index.html">房屋租售</a>
		</div>
		<div class="menu-item diet">
			<a href="${pageContext.request.contextPath }/diet/index.html">商家管理</a>
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
