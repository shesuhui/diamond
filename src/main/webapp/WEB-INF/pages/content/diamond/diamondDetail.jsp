<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
<title>钻石详细</title>
<meta charset=UTF-8>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport"
	content="width=device-width,user-scalable=no,minimum-scale=1.0, maximum-scale=1.0">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="diamond">
<%@include file="/common_include.jsp"%>
</head>
<body>
	<%@include file="/header.jsp"%>
	<div class="container-fluid">
		<div id="diamondInfoPanel" class="panel panel-info">
			<div class="panel-heading">钻石详细</div>

			<table id="tbList"
				class="table table-bordered table-condensed table-hover table-striped">
				<thead>
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
					<th>国际美金</th>
					<th>折扣</th>
					<th>美元/克拉</th>
					<th>RMB/粒</th>
					<th>证书类型</th>
					<th>证书号</th> 
				</thead>
				<tbody>
					<td>${diamond.name}</td>
					<td>${diamond.shapeCnName}</td>
					<td>${diamond.weight}</td>
					<td class='colortd'>${diamond.color}</td>
					<td>${diamond.clarity}</td>
					<td>${diamond.cut}</td>
					<td>${diamond.polish}</td>
					<td>${diamond.symm}</td>
					<td>${diamond.fluor}</td>
					<td>${diamond.size}</td>
					<td>${diamond.taple}</td>
					<td>${diamond.depth}</td>
					<td class='lefttd'>${diamond.locality}</td> 
					<c:choose>
					<c:when test="${diamond.multicolour=='1'}">
					<td></td>
					<td></td>
					<td class='righttd'><fmt:formatNumber value="${diamond.saleDollarPrice}" pattern="#"/></td>
					</c:when>
					<c:otherwise>
				    <td class='righttd'><fmt:formatNumber value="${diamond.price}" pattern="#"/></td>
					<td><c:if test="${diamond.discount!=''}"><fmt:formatNumber value="${diamond.discount}" pattern="#"/>%</c:if></td>
					<td class='righttd'><fmt:formatNumber value="${diamond.saleDollarPrice}" pattern="#"/></td>
					</c:otherwise>
					</c:choose>
				
					<td class='righttd'>${diamond.amount}</td>
					<td>${diamond.authenticator}</td>
					<td class='certtd'><a href="javascript:;" onclick="viewCert('${diamond.authenticator}','${diamond.cert}','${diamond.weight}')"
						data-toggle='tooltip' data-placement='bottom' title='点击查看证书'
						target='_blank'>${diamond.cert}</a></td> 
				</tbody>
			</table>
			<div class="panel-body">
				<div class="row">
					<div class="col-lg-4 col-md-4">
						<c:if test="${diamond.image!=''}">
							<img class="img-thumbnail" id="previewImg" src="${diamond.image}" />
						</c:if>
					</div>
					<c:if test="${diamond.supplier!=null}">
					<div class="col-lg-8 col-md-8">
						<p>
							<label>供应商报价：</label>
							<c:if test="${diamond.supplierPrice!=null&&diamond.supplierPrice!=''}"><fmt:formatNumber value="${diamond.supplierPrice}" pattern="#"/>美元</c:if>
						<p>
						<p>
							<label>供应商报价折扣：</label>
							<c:if test="${diamond.supplierDiscount!=null&&diamond.supplierDiscount!=''}">${diamond.supplierDiscount}%</c:if>
						<p>
						<p>
							<label>供应商编号：</label> ${diamond.supplier.num}
						<p>
						<p>
							<label>供应商名称：</label> ${diamond.supplier.name}
						<p>
						<p>
							<label>价格加成：</label> 
			<c:if test="${diamond.supplier.adding!=null&&diamond.supplier.adding!=''}">${diamond.supplier.adding}%</c:if>
 
						<p>
						<p>
							<label>联系人：</label> ${diamond.supplier.linkman}
						<p>
						<p>
							<label>电话：</label> ${diamond.supplier.phone}
						<p>
						<p>
							<label>香港电话：</label> ${diamond.supplier.hkPhone}
						<p>
						<p>
							<label>传真：</label> ${diamond.supplier.fax}
						<p>
						<p>
							<label>Email：</label> ${diamond.supplier.email}
						<p>
						<p>
							<label>Skype：</label> ${diamond.supplier.skype}
						<p>
						<p>
							<label>地址：</label> ${diamond.supplier.address}
						<p>
					</div>
					</c:if>
				</div>
			</div>
			 <div class="panel-footer">备注：${diamond.remark}</div>
		</div>
		<!-- progress -->
		<div class="modal fade" id="progressModal" tabindex="-1" role="dialog"
			aria-labelledby="progressModalLabel" aria-hidden="true"
			data-backdrop="static">
			<div class="modal-dialog modal-sm">
				<div class="modal-content">
					<img src="/images/loading.gif">正在加载，请稍候…………
				</div>
			</div>
		</div>
		<%@include file="/footer.jsp"%>
</body>
</html>

