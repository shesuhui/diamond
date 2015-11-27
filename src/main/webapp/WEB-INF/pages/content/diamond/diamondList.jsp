<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE HTML>
<html lang="zh-CN">
<head>
<title>钻石管理</title>
<meta charset=UTF-8>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport"
	content="width=device-width,user-scalable=no,minimum-scale=1.0, maximum-scale=1.0">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="diamond">
<script type="text/javascript" src="/js/func/diamondList.js"></script>
<script src="/third-party/ajaxfileupload.js"></script>
<script src="/third-party/bootstrap3-typeahead.min.js"></script>
</head>
<body>
	<div class="container-fluid">
		<div id="divListTb" class="panel panel-info table-responsive">
			<div class="panel-heading">
				<h4 class="panel-title">
					<a data-toggle="collapse" href="#searchPanel"> 展开/隐藏搜索条件</a>
					<p class="pull-right"><strong>汇率：${usdExchangeRate}</strong></p>
				</h4>
			</div>
			<div class="panel-body search-panel" id="searchPanel">
				<form id="queryDiamondForm" name="queryDiamondForm" role="form">
				 	<div class="row">
							<div class="col-lg-8 col-md-8"
								style="border-right:1px solid #ddd;">
								<div class="row">
									<label class="col-lg-2 col-md-2 searchLabel"
										style="height: 61px;line-height: 61px;">形状</label>
								<div class="col-lg-10 col-md-10 search-shape"
										style="margin-bottom:1px;">
										<a href="javascript:;" data-toggle="tooltip" title="圆形"
											onclick="selectCheckbox('queryShapeRound')"><span
											class="shape-round"></span> </a> <a href="javascript:;"
											data-toggle="tooltip" title="公主方"
											onclick="selectCheckbox('queryShapePrincess')"><span
											class="shape-princess"></span> </a> <a href="javascript:;"
											data-toggle="tooltip" title="祖母绿"
											onclick="selectCheckbox('queryShapeEmerald')"><span
											class="shape-emerald"></span> </a> <a href="javascript:;"
											data-toggle="tooltip" title="雷迪恩"
											onclick="selectCheckbox('queryShapeRadiant')"><span
											class="shape-radiant"></span> </a> <a href="javascript:;"
											data-toggle="tooltip" title="椭圆形"
											onclick="selectCheckbox('queryShapeOval')"><span
											class="shape-oval"></span> </a> <a href="javascript:;"
											data-toggle="tooltip" title="梨形"
											onclick="selectCheckbox('queryShapePear')"><span
											class="shape-pear"></span> </a> <a href="javascript:;"
											data-toggle="tooltip" title="马眼形"
											onclick="selectCheckbox('queryShapeMarquise')"><span
											class="shape-marquise"></span> </a> <a href="javascript:;"
											data-toggle="tooltip" title="心形"
											onclick="selectCheckbox('queryShapeHeart')"><span
											class="shape-heart"></span> </a> <a href="javascript:;"
											data-toggle="tooltip" title="三角形"
											onclick="selectCheckbox('queryShapeTriangle')"><span
											class="shape-triangle"></span> </a> <a href="javascript:;"
											data-toggle="tooltip" title="垫形"
											onclick="selectCheckbox('queryShapeCushion')"><span
											class="shape-cushion"></span> </a> <a href="javascript:;"
											data-toggle="tooltip" title="其他"
											onclick="selectCheckbox('containOtherShape')"><span
											class="shape-other"></span> </a> <input type="checkbox"
											name="shape" value="round" style="display:none"
											id="queryShapeRound"> <input type="checkbox"
											name="shape" value="princess" style="display:none"
											id="queryShapePrincess"> <input type="checkbox"
											name="shape" value="emerald" style="display:none"
											id="queryShapeEmerald"> <input type="checkbox"
											name="shape" value="radiant" style="display:none"
											id="queryShapeRadiant"> <input type="checkbox"
											name="shape" value="oval" style="display:none"
											id="queryShapeOval"> <input type="checkbox"
											name="shape" value="pear" style="display:none"
											id="queryShapePear"> <input type="checkbox"
											name="shape" value="marquise" style="display:none"
											id="queryShapeMarquise"> <input type="checkbox"
											name="shape" value="heart" style="display:none"
											id="queryShapeHeart"> <input type="checkbox"
											name="shape" value="triangle" style="display:none"
											id="queryShapeTriangle"> <input type="checkbox"
											name="shape" value="cushion" style="display:none"
											id="queryShapeCushion"> <input type="checkbox"
											name="containOtherShape" value="1" style="display:none"
											id="containOtherShape">
									</div>
								</div>
								<div class="row bottom-line"></div>
								<div class="row">
									<label class="col-lg-2 col-md-2 searchLabel">颜色</label>
									<div class="col-lg-10 col-md-10">
										<a href="javascript:;" onclick="selectCheckbox('queryColorD')">D</a> 
										<a href="javascript:;" onclick="selectCheckbox('queryColorE')">E</a>
										 <a href="javascript:;" onclick="selectCheckbox('queryColorF')">F</a>
										 <a href="javascript:;" onclick="selectCheckbox('queryColorG')">G</a>
										 <a href="javascript:;" onclick="selectCheckbox('queryColorH')">H</a>
                                         <a href="javascript:;" onclick="selectCheckbox('queryColorI')">I</a>
                                        <a href="javascript:;" onclick="selectCheckbox('queryColorJ')">J</a>
                                        <a href="javascript:;" onclick="selectCheckbox('queryColorK')">K</a>
                                        <a href="javascript:;" onclick="selectCheckbox('queryColorL')">L</a>
                                         <a href="javascript:;" onclick="selectCheckbox('queryColorM')">M</a>
                                          <a href="javascript:;" onclick="selectCheckbox('queryColorOther')">彩钻</a>
									</div>
										<input type="checkbox" name="color" value="D"
										style="display:none" id="queryColorD"><input
										type="checkbox" name="color" value="E" style="display:none"
										id="queryColorE"><input type="checkbox" name="color"
										value="F" style="display:none" id="queryColorF"><input
										type="checkbox" name="color" value="G" style="display:none"
										id="queryColorG"><input type="checkbox" name="color"
										value="H" style="display:none" id="queryColorH"><input
										type="checkbox" name="color" value="I" style="display:none"
										id="queryColorI"><input type="checkbox" name="color"
										value="J" style="display:none" id="queryColorJ"><input
										type="checkbox" name="color" value="K" style="display:none"
										id="queryColorK"><input type="checkbox" name="color"
										value="L" style="display:none" id="queryColorL"><input type="checkbox" name="color"
										value="M" style="display:none" id="queryColorM"><input
										type="checkbox" name="multicolour" value="1" style="display:none"
										id="queryColorOther">
								</div>
								<div class="row bottom-line"></div>
								<div class="row">
									<label class="col-lg-2 col-md-2 searchLabel">净度</label>
									<div class="col-lg-10 col-md-10">
										<a href="javascript:;" onclick="selectCheckbox('queryClarityFL')">FL</a> 
										<a href="javascript:;" onclick="selectCheckbox('queryClarityIF')">IF</a>
										<a href="javascript:;" onclick="selectCheckbox('queryClarityVVS1')">VVS1</a>
										<a href="javascript:;" onclick="selectCheckbox('queryClarityVVS2')">VVS2</a>
										<a href="javascript:;" onclick="selectCheckbox('queryClarityVS1')">VS1</a>
										<a href="javascript:;" onclick="selectCheckbox('queryClarityVS2')">VS2</a>
										<a href="javascript:;" onclick="selectCheckbox('queryClaritySI1')">SI1</a>
										<a href="javascript:;" onclick="selectCheckbox('queryClaritySI2')">SI2</a>
										<a href="javascript:;" onclick="selectCheckbox('queryClaritySI3')">SI3</a>
										<a href="javascript:;" onclick="selectCheckbox('queryClarityI1')">I1</a>
										<a href="javascript:;" onclick="selectCheckbox('queryClarityI2')">I2</a>
										<a href="javascript:;" onclick="selectCheckbox('queryClarityI3')">I3</a>
									</div>
							        <input type="checkbox" name="clarity" value="FL" style="display:none" id="queryClarityFL">
									<input type="checkbox" name="clarity" value="IF" style="display:none" id="queryClarityIF">
									<input type="checkbox" name="clarity" value="VVS1" style="display:none" id="queryClarityVVS1">
									<input type="checkbox" name="clarity" value="VVS2" style="display:none" id="queryClarityVVS2">
									<input type="checkbox" name="clarity" value="VS1" style="display:none" id="queryClarityVS1">
									<input type="checkbox" name="clarity" value="VS2" style="display:none" id="queryClarityVS2">
									<input type="checkbox" name="clarity" value="SI1" style="display:none" id="queryClaritySI1">
									<input type="checkbox" name="clarity" value="SI2" style="display:none" id="queryClaritySI2">
									<input type="checkbox" name="clarity" value="SI3" style="display:none" id="queryClaritySI3">
									<input type="checkbox" name="clarity" value="I1" style="display:none" id="queryClarityI1">
									<input type="checkbox" name="clarity" value="I2" style="display:none" id="queryClarityI2">
									<input type="checkbox" name="clarity" value="I3" style="display:none" id="queryClarityI3">
								</div>
								<div class="row"
									style="height:1px;border-bottom:1px solid #ddd;"></div>
								<div class="row">
									<label class="col-lg-2 col-md-2 searchLabel">切工</label>
									<div class="col-lg-10 col-md-10">
										<a href="javascript:;"  onclick="selectCheckbox('queryCutIdeal')">Ideal</a>
										 <a href="javascript:;"  onclick="selectCheckbox('queryCutExc')" style="width:96px;">Excellent</a>
										<a href="javascript:;"  onclick="selectCheckbox('queryCutVG')"  style="width:96px;">VeryGood</a> 
										<a href="javascript:;"  onclick="selectCheckbox('queryCutG')">Good</a>
										<a href="javascript:;"  onclick="selectCheckbox('queryCutF')"> Fair</a>
										<a href="javascript:;"  onclick="selectCheckbox('queryCutP')">Poor</a> 
										<a href="javascript:;"  onclick="selectCheckbox('queryCutNone')">无</a> 
									</div>
								<input type="checkbox" name="cut" value="Ideal"
										style="display:none" id="queryCutIdeal"> <input
										type="checkbox" name="cut" value="Excellent" style="display:none"
										id="queryCutExc"> <input type="checkbox" name="cut"
										value="VeryGood" style="display:none" id="queryCutVG"> <input
										type="checkbox" name="cut" value="Good" style="display:none"
										id="queryCutG"> <input type="checkbox" name="cut"
										value="Fair" style="display:none" id="queryCutF"> <input
										type="checkbox" name="cut" value="Poor" style="display:none"
										id="queryCutP"><input
										type="checkbox" name="containNullCut" value="1" style="display:none"
										id="queryCutNone">
								</div>
								<div class="row bottom-line"></div>
								<div class="row">
									<label class="col-lg-2 col-md-2 searchLabel">抛光</label>
									<div class="col-lg-10 col-md-10">
										<a href="javascript:;"   onclick="selectCheckbox('queryPolishIdeal')">Ideal</a> 
										<a href="javascript:;"   onclick="selectCheckbox('queryPolishExc')" style="width:96px;">Excellent</a>
										<a href="javascript:;"   onclick="selectCheckbox('queryPolishVG')" style="width:96px;">VeryGood</a>
										 <a href="javascript:;"   onclick="selectCheckbox('queryPolishG')">Good</a>
										<a href="javascript:;"   onclick="selectCheckbox('queryPolishFl')">Fair</a>
										<a href="javascript:;"   onclick="selectCheckbox('queryPolishP')">Poor</a>
									</div>
									<input type="checkbox" name="polish" value="Ideal" style="display:none" id="queryPolishIdeal"> 
									<input type="checkbox" name="polish" value="Excellent" style="display:none" id="queryPolishExc"> 
									<input type="checkbox" name="polish" value="VeryGood" style="display:none" id="queryPolishVG"> 
									<input type="checkbox" name="polish" value="Good" style="display:none" id="queryPolishG"> 
									<input type="checkbox" name="polish" value="Fair" style="display:none" id="queryPolishFl"> 
									<input type="checkbox" name="polish" value="Poor" style="display:none" id="queryPolishP"> 
								</div>
								<div class="row bottom-line"></div>
								<div class="row">
									<label class="col-lg-2 col-md-2 searchLabel">对称</label>
									<div class="col-lg-10 col-md-10">
										<a href="javascript:;" onclick="selectCheckbox('querySymmI')">Ideal</a>
										 <a href="javascript:;" onclick="selectCheckbox('querySymmE')" style="width:96px;">Excellent</a>
										<a href="javascript:;" onclick="selectCheckbox('querySymmV')" style="width:96px;">VeryGood</a>
                                        <a href="javascript:;" onclick="selectCheckbox('querySymmG')">Good</a>
										<a href="javascript:;" onclick="selectCheckbox('querySymmF')">Fair</a>
										<a href="javascript:;" onclick="selectCheckbox('querySymmP')">Poor</a>
									</div>
									<input type="checkbox" name="symm" value="Ideal" style="display:none" id="querySymmI"> 
									<input type="checkbox" name="symm" value="Excellent" style="display:none" id="querySymmE"> 
									<input type="checkbox" name="symm" value="VeryGood" style="display:none" id="querySymmV"> 
									<input type="checkbox" name="symm" value="Good" style="display:none" id="querySymmG"> 
									<input type="checkbox" name="symm" value="Fair" style="display:none" id="querySymmF"> 
									<input type="checkbox" name="symm" value="Poor" style="display:none" id="querySymmP"> 
								</div>
								<div class="row bottom-line"></div>
								<div class="row">
									<label class="col-lg-2 col-md-2 searchLabel">荧光</label>
									<div class="col-lg-10 col-md-10">
									<a href="javascript:;" onclick="selectCheckbox('queryFluorNone')">None</a> 
										<a href="javascript:;"  onclick="selectCheckbox('querrFluorVSlight')"  style="width:96px;">VerySlight</a>
										<a href="javascript:;"  onclick="selectCheckbox('queryFluorSlight')">Slight</a>
                                        <a href="javascript:;"  onclick="selectCheckbox('queryFluorFaint')">Faint</a>
										<a href="javascript:;"  onclick="selectCheckbox('queryFluorMedium')">Medium</a>
										<a href="javascript:;"  onclick="selectCheckbox('queryFluorStrong')">Strong</a>
										<a href="javascript:;"  onclick="selectCheckbox('queryFluorVStrong')"  style="width:96px;">VeryStrong</a>
									</div>
									<input type="checkbox" name="fluor" value="None" style="display:none" id="queryFluorNone"> 
									<input type="checkbox" name="fluor" value="VerySlight" style="display:none" id="querrFluorVSlight"> 
									<input type="checkbox" name="fluor" value="FluorSlight" style="display:none" id="queryFluorSlight"> 
									<input type="checkbox" name="fluor" value="Faint" style="display:none" id="queryFluorFaint">
									<input type="checkbox" name="fluor" value="Medium" style="display:none" id="queryFluorMedium"> 
									<input type="checkbox" name="fluor" value="Strong" style="display:none" id="queryFluorStrong"> 
									<input type="checkbox" name="fluor" value="VeryStrong" style="display:none" id="queryFluorVStrong"> 
								</div>
								<div class="row bottom-line"></div>
								<div class="row">
									<label class="col-lg-2 col-md-2 searchLabel">证书</label>
									<div class="col-lg-10 col-md-10">
										<a href="javascript:;"  onclick="selectCheckbox('queryAuGIA')">GIA</a> 
										<a href="javascript:;"  onclick="selectCheckbox('queryAuHRD')">HRD</a> 
										<a href="javascript:;"  onclick="selectCheckbox('queryAuAGS')">AGS</a> 
										<a href="javascript:;"  onclick="selectCheckbox('queryAuIGI')">IGI</a>
										<a href="javascript:;"  onclick="selectCheckbox('queryAuEGL')">EGL</a>
									</div>
									<input type="checkbox" name="authenticator" value="GIA" style="display:none" id="queryAuGIA"> 
									<input type="checkbox" name="authenticator" value="HRD" style="display:none" id="queryAuHRD"> 
									<input type="checkbox" name="authenticator" value="AGS" style="display:none" id="queryAuAGS"> 
									<input type="checkbox" name="authenticator" value="IGI" style="display:none" id="queryAuIGI"> 
									<input type="checkbox" name="authenticator" value="EGL" style="display:none" id="queryAuEGL">  
								</div>
								<div class="row bottom-line"></div>

							</div>
							<div class="col-lg-4 col-md-4">
								<div class="row">
									<div class="col-lg-12">
										<div class="input-group">
											<span class="input-group-addon">重量</span> <input type="text"
												id="minQueryWeight" name="minQueryWeight" maxlength="6"
												class="form-control"> <span
												class="input-group-addon">至</span> <input type="text"
												id="maxQueryWeight" name="maxQueryWeight" maxlength="6"
												class="form-control">
										</div>
									</div>
								</div>
								<div style="height:4px;"></div>
								<div class="row">
									<div class="col-lg-12">
										<div class="input-group">
											<span class="input-group-addon">货号</span> <input type="text"
												id="name" name="name" maxlength="10" class="form-control">
										</div>
									</div> 
											<input type="hidden" id="sortByWeight" name="sortByWeight"
										value="0">
										<input type="hidden" id="sortByDiscount" name="sortByDiscount"
										value="1">
										<input type="hidden" id="sortByAmount" name="sortByAmount"
										value="1">
										<input type="hidden" id="sortFirst" name="sortFirst"
										value="amount">
								</div>
								<div style="height:4px;"></div>
								<div class="row">
									<div class="col-lg-12 col-md-12">
										<div class="input-group">
											<span class="input-group-addon">每页显示：</span> <select
												class="form-control" name="pageSize" id="pageSize">
												<option value="20">20</option>
												<option value="50" selected="selected">50</option>
												<option value="100">100</option>
											</select>
										</div>
									</div>
								</div>
								<div style="height:4px;"></div>
								<div class="row">
									<div class="col-lg-12 col-md-12 col-sm-12">
  									<button type="submit" class="btn btn-primary"
										id="btnQueryDiamond">
										<span class="glyphicon glyphicon-search"></span>&nbsp;查询
									</button>
 									<button type="button" class="btn btn-primary" id="btnReset">
										<span class="glyphicon glyphicon-ban-circle"></span>&nbsp;重置
									</button>
 									<button type="button" class="btn btn-primary"
										id="btnAddDiamond">
										<span class="glyphicon glyphicon-plus"></span>&nbsp;添加
									</button>
<%-- 									<button type="button" class="btn btn-primary"--%>
<%--										id="btnImpDiamond">--%>
<%--										<span class="glyphicon glyphicon-import"></span>&nbsp;导入--%>
<%--									</button> --%>

 									<button type="button" class="btn btn-primary"
										id="btnEditDiamond">
										<span class="glyphicon glyphicon-edit"></span>&nbsp;修改
									</button>
 									<button type="button" class="btn btn-primary"
										id="btnSetBuyable">
										<span class="glyphicon glyphicon-check"></span>&nbsp;上架
									</button>
 									<button type="button" class="btn btn-primary"
										id="btnRemoveDiamond">
										<span class="glyphicon glyphicon-trash"></span>&nbsp;删除
									</button> 
								</div>
							</div>
							 
						</div> 
						</div>
				</form>
			</div>

			<!-- 表格 -->
			<table id="tbList"
				class="table table-bordered table-condensed table-hover table-striped" style="font-size:12px;">
				<thead>
					<tr>
						<th><input data-toggle="tooltip" title="全选/取消全选"
							type="checkbox" id="checkAll" onclick="selectAll('id',this)">
						</th>
						<th>货号</th>
						<th>形状</th>
						<th><a href="javascript:;" data-toggle="tooltip"
							data-placement="top" title="点击按重量排序" onclick="sortByWeight()">重量<span
								class="glyphicon glyphicon-sort" id='sortByWeightIcon'></span> </a>
						</th>
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
						<th><a href="javascript:;" data-toggle="tooltip" class='tbheadLink'
							data-placement="top" title="点击排序" onclick="sortByDiscount()">折扣<span
								class="glyphicon glyphicon-arrow-up" id='sortByDiscountIcon'></span></a></th>
						<th>美元/克拉</th>
						<th><a href="javascript:;" data-toggle="tooltip" class='tbheadLink'
							data-placement="top" title="点击排序" onclick="sortByAmount()">RMB/粒<span
								class="glyphicon glyphicon-arrow-up" id='sortByAmountIcon'></span></a></th>
						<th>证书类型</th>
						<th>证书号</th>
						<th>状态</th> 
					</tr>
				</thead>
			</table>
		</div>
		<div id="paging"></div>
	</div>
	<!-- editModal -->
	<div class="modal fade" id="editDiamondModal" tabindex="-1"
		role="dialog" aria-labelledby="editDiamondModalLabel"
		aria-hidden="true" data-backdrop="static">
		<div class="modal-dialog modal-lg">
			<div class="modal-content"></div>
		</div>
	</div>
	<!-- img -->
	<div id="hoverImgViewer"
		style="display:none;position:absolute;z-index:1;">
		<img id="hoverImg" class='img-thumbnail'>
	</div>
      <%--	imp--%>
	<div class="modal fade" id="impDiamondModal" tabindex="-1"
		role="dialog" aria-labelledby="impDiamondModalLabel"
		aria-hidden="true" data-backdrop="static">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
					<h4 class="modal-title" id="impDiamondModalLabel">导入钻石</h4>
				</div>
				<div class="modal-body">
					<div class="alert alert-info fade in" style="display: none;"
						id="alertImpDiamondResult">
						<button type="button" class="close" id="btnCloseImpAlert">
							&times;</button>
						<span id="impDiamondResult"></span>
					</div>
					<div class="alert alert-info" id="impProgress"  style="display: none;">
						<img src="/images/loading.gif">请稍候…………
					</div>
					<div class="input-group">
						<input type="file" id="diamondFile" name="diamondFile"
							class="form-control " /> <span class="input-group-btn">
							<button type="button" class="btn btn-primary"
								onclick="ajaxUploadDiamond()">
								<span class="glyphicon glyphicon-upload"></span>&nbsp;上传
							</button> </span>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal"
						id="btnCloseImpModal">
						<span class="glyphicon glyphicon-remove"></span>&nbsp;关闭
					</button>
				</div>
			</div>
		</div>
	</div>
	
	<!-- progress -->
	<div class="modal fade" id="progressModal" tabindex="-1" role="dialog"
		aria-labelledby="progressModalLabel" aria-hidden="true"
		data-backdrop="static">
		<div class="modal-dialog modal-sm">
			<div class="modal-content">
				<img src="/images/loading.gif">正在搜索，请稍候…………
			</div>
		</div>
	</div>
</body>
</html>

