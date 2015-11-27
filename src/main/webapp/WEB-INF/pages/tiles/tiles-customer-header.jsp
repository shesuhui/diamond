<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page language="java" import="com.shesuhui.diamond.model.*,java.util.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script type="text/javascript" src="${pageContext.request.contextPath}/javascript/func/login.js"></script>

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
					alt="钻石商城" src="${pageContext.request.contextPath }/images/favicon.png">
				</a> <a class="navbar-brand  navbar-brand-active" href="/">钻石商城</a>
			</div>
				<div class="collapse navbar-collapse" id="navbar">
				<ul class="nav navbar-nav " role="tablist" id="menuUl">
				<c:if test="${login_user.userType==5}">
				<c:if test="${login_user.userStatus==2}">
					<li role="presentation" id="menuSearchGoods"><a
						href="<%=request.getContextPath()%>/buyer/index.do" target="_self">钻石选购</a>
					</li>
										<li  role="presentation" id="menuMyOrder"><a id="btnMyOrder" href="/buyer/myOrder.do">我的订单 </a></li>
					</c:if>
				</c:if> 
                  
                  <c:if test="${login_user.userType==2||login_user.userType==3||login_user.userType==4||login_user.userType==1}">
					<li role="presentation" id="menuDiamond"><a
						href="<%=request.getContextPath()%>/diamond/index.do"
						target="_self">钻石管理</a>
					</li>
				</c:if>
				
				 <c:if test="${login_user.userType==2||login_user.userType==1}"> 
					<li role="presentation" id="menuOrder"><a
						href="<%=request.getContextPath()%>/order/index.do" target="_self">订单管理</a>
					</li> 
					<li role="presentation" id="menuSupplier"><a
						href="<%=request.getContextPath()%>/supplier/index.do" target="_self">供应商管理</a>
					</li> 
					<li role="presentation" id="menuSystemParam"><a
						href="<%=request.getContextPath()%>/systemParam/index.do" target="_self">系统参数管理</a>
					</li> 
				</c:if>
				<c:if test="${login_user.userType==1}"> 
					<li role="presentation" id="menuUser"><a
						href="<%=request.getContextPath()%>/user/index.do" target="_self">用户管理</a>
					</li>
				</c:if>
					
					<li role="presentation" id="menuAccount"  class="dropdown"><a href="javascript:;">个人账户管理<span class="caret"></span></a>
					 <ul class="dropdown-menu" role="menu">
					  <li><a href="<%=request.getContextPath()%>/user/editSelf.do">个人资料维护</a></li>
					  <li><a href="<%=request.getContextPath()%>/user/toModifyMyPwd.do"> 修改密码</a></li>
                       </ul>
					</li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<li>
						<p class="navbar-text" style="color:#fff;">
							<strong>欢迎您 ${login_user.name}</strong>
						</p>
					</li>
					 <c:if test="${login_user.userType==5}"> 
					
					<li class="dropdown">
						<%
							Collection<Diamond> diamondList = null;
								Cart cart = (Cart) session.getAttribute("cart");
								boolean isEmpty = cart == null;
								if (cart != null) {
									diamondList = cart.getItemMap().values();
									isEmpty = diamondList == null || diamondList.isEmpty();
								}
						%>
						<button onclick="window.location.href='/buyer/showCart.do';"
							class="btn btn-primary  navbar-btn" type="button"
							data-toggle="dropdown" data-trigger="hover">
							<span class="glyphicon glyphicon-shopping-cart"></span>&nbsp;购物车<span
								class="badge" id="cartCount"><%=isEmpty?0:cart.getGoodsCount()%></span>
						</button>
						<div class="dropdown-menu container cart" role="menu">
							<table id="s_cartItemTable" name="cartItemTable"
								class="table  table-condensed table-hover table-striped<%=isEmpty ? " hide" : ""%>">
								<thead>
									<tr>
										<th>货号</th> 
										<th>形状</th>
										<th>重量</th>
										<th>颜色</th>
										<th>净度</th>
										<th>切工</th>
										<th>抛光</th>
										<th>对称</th>
										<th>荧光</th>
										<th>尺寸</th>
										<th>台面</th>
										<th>深度</th>
										<th>产地</th>
										<th>折扣</th> 
										<th>RMB/粒</th> 
										<th>删</th>
									</tr>
								</thead>
								<tbody>
									<%
										if (!isEmpty) { 
												for (Diamond diamond : diamondList) { 
									%>
									<tr id="s_cartItem<%=diamond.getId()%>"
										name="cartItem<%=diamond.getId()%>">
										<td><%=diamond.getName()%></td>
										<td><%=diamond.getShapeCnName()%></td>
									    <td><%=diamond.getWeight()%></td> 
										<td><%=diamond.getColor()%></td>
										<td><%=diamond.getClarity()%></td>
										<td><%=diamond.getCut()%></td>
										<td><%=diamond.getPolish()%></td>
										<td><%=diamond.getSymm()%></td>
										<td><%=diamond.getFluor()%></td> 
										<td><%=diamond.getSize()%></td> 
										<td><%=diamond.getTaple()%></td> 
										<td><%=diamond.getDepth()%></td> 
										<td><%=diamond.getLocality()%></td>
<%--										<td><%=diamond.getPrice()%></td>--%>
										<td><%=diamond.getDiscount() == null ? "" : (diamond
								.getDiscount() + "%")%></td>
								<td><%=diamond.getAmount()%></td>
 										<td><a role='button' class='btn btn-warning btn-xs'
											href='javascript:;'
											onclick="removeCartItem('<%=diamond.getId()%>','<%=diamond.getPrice()%>')"><span
												class='glyphicon glyphicon-remove'></span> </a></td>
									</tr>
									<%
										}
											}
									%>
								</tbody>
							</table>
							<div style="margin-left:10px;"
								class="row<%=isEmpty ? " hide" : ""%>" id="s_cartOptDiv"
								name="cartOptDiv">
								<hr>
								<div class="col-md-4">
									<a href='javascript:;' role="button"
										class='btn btn-warning btn-xs pull-left' onclick='clearCart()'>清空</a>
								</div>
								<div class="col-md-6">
									<p class="text-info" id="cartInfo">
										共<span  class='red'  id="s_spanCartGoodsCount"
											name="spanCartGoodsCount"><%=cart == null ? 0 : cart.getGoodsCount()%></span>件
										共计 <span  class='red'  id="s_spanCartAmount"
											name="spanCartAmount"><%=cart == null ? 0 : cart.getAmount()%></span>元
									</p>
								</div>
								<div class="col-md-2">
									<div class="col-md-4">
										<a href='javascript:;' onclick="submitOrder()"
											class='btn btn-primary btn-xs pull-right'>提交订单</a>
									</div>
								</div>
							</div>
							<p class="text-info text-center<%=isEmpty ? "" : " hide"%>"
								id="s_cartEmptyTxt" name="cartEmptyTxt">
								啊哦 购物车空空如也，<a href="/buyer/index.do">赶快去选购吧</a>
							</p>
						</div></li>
						</c:if>
					<li>&nbsp;</li>
					<li>
						<button type="button" id="btnLogout" onclick="logout()"
							class="btn btn-primary navbar-btn">
							<span class="glyphicon glyphicon-log-out"></span>&nbsp;退出
						</button></li>
					<li>&nbsp;</li>
				</ul>
			</div>
		</div>
		<!--fluid-->
	</nav>
</div>


<%--	<div style="height: 2px;"></div>--%>