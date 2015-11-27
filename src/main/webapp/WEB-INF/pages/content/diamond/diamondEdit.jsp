<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="modal-header">
	<h4 class="modal-title" id="editDiamondModalLabel">
		<c:if test="${opt=='add'}">增加</c:if>
		<c:if test="${opt=='edit'}">修改</c:if>
		钻石
	</h4>
</div>
<div class="modal-body">
	<div class="alert alert-info fade in" style="display: none;"
		id="alertDiamondForm">
		<button type="button" class="close" id="btnCloseAlert">
			&times;</button>
		<span id="alertDiamondFormInfo"></span>
	</div>
	<input type="hidden" id="opt" value="${opt}" />
	<form role="form" class="form-horizontal " id="diamondForm">
		<input type="hidden" name="id" id="id" value="${diamond.id}" />  
			<c:if test="${opt=='add'}"><input type="hidden"
			name="status" id="status" value="1"></c:if>
		<c:if test="${opt=='edit'}"><input type="hidden"
			name="status" id="status" value="${diamond.status}"><input type="hidden"
			name="multicolour" id="multicolour" value="${diamond.multicolour}"></c:if>
		
		<div class="form-group">
			<label for="name" class="col-lg-2 control-label"> <span
				class="required">*&nbsp;</span>货号 </label>
			<div class="col-lg-4">
				<input type="text" class="form-control" id="name" name="name" 
					maxlength="25" <c:if test="${opt=='edit'}">readonly</c:if>
					value="${diamond.name}">
			</div> 
			<label for="locality" class="col-lg-2 control-label"> <span
				class="required">*&nbsp;</span>产地</label>
			<div class="col-lg-4">
				<input type="text" class="form-control" id="locality" name="locality" 
					maxlength="40"  data-provide="typeahead" data-source='${localities}' value="${diamond.locality}"> 
			</div>
		</div>

		<div class="form-group">
			<label for="shape" class="col-lg-2 control-label"> <span
				class="required">*&nbsp;</span>形状</label>
			<div class="col-lg-4">
			<input type="text" class="form-control" id="shape" name="shape" 
					maxlength="20"  data-provide="typeahead"
     data-source='${shapes}' value="${diamond.shape}">
			</div>

			<label for="color" class="col-lg-2 control-label"> <span
				class="required">*&nbsp;</span>颜色</label>
			<div class="col-lg-4">
					<input type="text" class="form-control" id="color" name="color" 
					maxlength="20"  data-provide="typeahead"
     data-source='${colors}' value="${diamond.color}">  
			</div>
		</div>

		<div class="form-group">
			<label for="clarity" class="col-lg-2 control-label"> <span
				class="required">*&nbsp;</span>净度</label>
			<div class="col-lg-4">
					<input type="text" class="form-control" id="clarity" name="clarity" 
					maxlength="10"  data-provide="typeahead"
     data-source='${claritys}' value="${diamond.clarity}">
			</div>

			<label for="cut" class="col-lg-2 control-label"> 切工</label>
			<div class="col-lg-4">
			<input type="text" class="form-control" id="cut" name="cut" 
					maxlength="20"  data-provide="typeahead"
     data-source='${cuts}' value="${diamond.cut}">
			</div>
		</div>

		<div class="form-group">
			<label for="polish" class="col-lg-2 control-label"> <span
				class="required">*&nbsp;</span>抛光</label>
			<div class="col-lg-4">
					<input type="text" class="form-control" id="polish" name="polish" 
					maxlength="20"  data-provide="typeahead"
     data-source='${polishs}' value="${diamond.polish}">
			</div>

			<label for="symm" class="col-lg-2 control-label"> <span
				class="required">*&nbsp;</span>对称</label>
			<div class="col-lg-4">
			<input type="text" class="form-control" id="symm" name="symm" 
					maxlength="20"  data-provide="typeahead"
     data-source='${symms}' value="${diamond.symm}">
			</div>
		</div>

		<div class="form-group">
			<label for="fluor" class="col-lg-2 control-label"> <span
				class="required">*&nbsp;</span>荧光</label>
			<div class="col-lg-4">
				<input type="text" class="form-control" id="fluor" name="fluor" 
					maxlength="20"  data-provide="typeahead"
     data-source='${fluors}' value="${diamond.fluor}">
			</div>

			<label for="weight" class="col-lg-2 control-label"> <span
				class="required">*&nbsp;</span>重量</label>
			<div class="col-lg-4">
				<input type="text" class="form-control" id="weight" name="weight"
					maxlength="6" value="${diamond.weight}">
			</div>
		</div>

		<div class="form-group">
			<label for="depth" class="col-lg-2 control-label">深度</label>
			<div class="col-lg-4">
				<input type="text" class="form-control" id="depth" name="depth"
					maxlength="30" value="${diamond.depth}">
			</div>

			<label for="taple" class="col-lg-2 control-label">台面</label>
			<div class="col-lg-4 ">
				<input type="text" class="form-control" id="taple" name="taple"
					maxlength="20" value="${diamond.taple}">
			</div>
		</div>
		<div class="form-group">
			<label for="size" class="col-lg-2 control-label">尺寸</label>
			<div class="col-lg-10">
				<input type="text" class="form-control" id="size" name="size"
					maxlength="30" value="${diamond.size}">
			</div> 
		</div>
		<div class="form-group">
			<label for="authenticator" class="col-lg-2 control-label"> <span
				class="required">*&nbsp;</span>证书类型</label>
			<div class="col-lg-4">
					<input type="text" class="form-control" id="authenticator" name="authenticator" 
					maxlength="20"  data-provide="typeahead"
     data-source='${authenticators}' value="${diamond.authenticator}">
			</div>

			<label for="cert" class="col-lg-2 control-label"> <span
				class="required">*&nbsp;</span>证书号</label>
			<div class="col-lg-4 ">
				<input type="text" class="form-control" id="cert" name="cert"
					maxlength="30" value="${diamond.cert}">
			</div>
		</div>

		<div class="form-group">
			<label for="supplierId" class="col-lg-2 control-label"><span
				class="required">*&nbsp;</span>供应商</label>
			<div class="col-lg-10">
				<select class="form-control" name="supplierId" id="supplierId">
					<option value=""></option>
					<c:forEach var="lc" items="${suppliers}">
						<option value="${lc.id}"
							<c:if test="${lc.id==diamond.supplierId}">selected</c:if>>${lc.name}----加成:${lc.adding}%
						</option>
					</c:forEach>
				</select>
			</div>
		</div>
		<div class="form-group">
			<label for="supplierPrice" class="col-lg-2 control-label"><span
				class="required">*&nbsp;</span> 供应商报价</label>
			<div class="col-lg-4">
				<div class="input-group">
					<input type="text" class="form-control" id="supplierPrice"
						name="supplierPrice" maxlength="10"
						value="${diamond.supplierPrice}"><span
						class="input-group-addon">美元</span>
				</div>
			</div>

			<label for="supplierDiscount" class="col-lg-2 control-label"><span
				class="required">*&nbsp;</span>报价折扣</label>
			<div class="col-lg-4">
				<div class="input-group">
					<input type="text" class="form-control"
						id="supplierDiscount" name="supplierDiscount" maxlength="5"
						value="${diamond.supplierDiscount}"> <span
						class="input-group-addon">%</span>
				</div>
			</div>
		</div>
		<div class="form-group">
			<label for="uploadImg" class="col-lg-2 control-label"> 图片 </label>
			<div class="col-lg-10">
				<div class="input-group">
					<input type="file" id="uploadImg" name="uploadImg"
						class="form-control" /> <span class="input-group-btn">
						<button type="button" class="btn btn-primary"
							onclick="ajaxImageUpload()">
							<span class="glyphicon glyphicon-upload"></span>&nbsp;上传
						</button> </span>
				</div> 
				<span class="help-block">图片格式:jpg、jpeg、bmp、gif、png。</span> <input
					type="hidden" id="image" name="image" value="${diamond.image}">
			</div>
		</div>
		<div class="form-group">
			<div class="col-md-offset-2 col-lg-10">
				<img class="img-thumbnail" id="previewImg" src="${diamond.image}" />
			</div>
		</div>


		<div class="form-group">
			<label for="remark" class="col-lg-2 control-label"> 备注 </label>
			<div class="col-lg-10">
				<textarea class="form-control" rows="3" name="remark" id="remark">${diamond.remark}</textarea>
			</div>
		</div>

		<div class="modal-footer">
			<button type="button" class="btn btn-default" data-dismiss="modal"
				id="btnCloseEditModal">
				<span class="glyphicon glyphicon-remove"></span>&nbsp;关闭
			</button>
			<button type="button" id="btnRecreateDiamond" class="btn btn-primary"
				style="display:none">
				<span class="glyphicon glyphicon-ok"></span>&nbsp;继续添加
			</button>
			<button type="submit" id="btnSaveDiamond" class="btn btn-primary">
				<span class="glyphicon glyphicon-ok"></span>&nbsp;保存
			</button>
		</div>
	</form>
</div>
<script
	src="<%=request.getContextPath()%>/third-party/ajaxfileupload.js"></script>
<script>
$('.typeahead').typeahead();
	var diamondFormValidatorOptions = {
		message : '您的输入有误',
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			name : {
				validators : {
					notEmpty : {
						message : '请输入货号'
					},
					remote : {
						message : '该货号已存在',
						url : '/diamond/checkNameDuplicate.do',
						data : function(validator) {
							return {
								name : validator.getFieldElements('name').val(),
								id : $("#id").val()
							};
						}
					}
				}
			},
			locality : {
				validators : {
					notEmpty : {
						message : '请输入产地'
					}
				}
			},
			shape : {
				validators : {
					notEmpty : {
						message : '请输入形状'
					}
				}
			},
			color : {
				validators : {
					notEmpty : {
						message : '请输入颜色'
					}
				}
			},
			clarity : {
				validators : {
					notEmpty : {
						message : '请输入净度'
					}
				}
			},
			polish : {
				validators : {
					notEmpty : {
						message : '请输入抛光'
					}
				}
			},
			authenticator : {
				validators : {
					notEmpty : {
						message : '请输入证书类型'
					}
				}
			},
			symm : {
				validators : {
					notEmpty : {
						message : '请输入对称'
					}
				}
			},
			fluor : {
				validators : {
					notEmpty : {
						message : '请输入荧光'
					}
				}
			},
			weight : {
				validators : {
					notEmpty : {
						message : '请输入重量（0~9999）'
					},
					between : {
						min : 0,
						max : 9999,
						message : '请输入重量（0~9999）'
					}
				}
			},
			supplierId : {
				validators : {
					notEmpty : {
						message : '请选择供应商'
					}
				}
			}, 
			supplierPrice : {
				validators : {
					notEmpty : {
						message : '请输入供应商报价(0~99999999）'
					},
					between : {
						min : 0,
						max : 99999999,
						message : '请输入供应商报价(0~99999999）'
					}
				}
			},
			supplierDiscount : {
				validators : {
					notEmpty : {
						message : '请输入折扣 (0~100）'
					},
					between : {
						min : 0,
						max : 100,
						message : '请输入折扣 (0~100）'
					}
				}
			},
			cert : {
				validators : {
					notEmpty : {
						message : '请输入证书号'
					}
				}
			},
			remark : {
				validators : {
					stringLength : {
						max : 500,
						message : '备注不超过500字'
					}
				}
			}
		}
	};
	$('#diamondForm').bootstrapValidator(diamondFormValidatorOptions).on(
			'success.form.bv',
			function(e) {
				e.preventDefault();
				// 保存
				$.post("/diamond/save.do", $('#diamondForm').serializeArray(),
						function(data) {
							if (data) {
								if (data.code == 0) {
									$("#alertDiamondFormInfo").text("保存成功！");
									$("#alertDiamondForm").show();
									if ($("#opt").val() == "add") {
										queryDiamond(1);
										//添加模式下可以继续添加
										$("#btnRecreateDiamond").show();
										$("#id").val(data.result.id);
									} else {
										queryDiamond($("#paging").pagination(
												'getCurrentPage'));
										//修改 成功后关闭窗口
										setTimeout(function() {
											$("#btnCloseEditModal").click();
										}, 1000);
									}

								} else if (data.msg && data.msg != "") {
									$("#alertDiamondFormInfo").text(data.msg);
									$("#alertDiamondForm").show();
								} else {
									$("#alertDiamondFormInfo").text("保存失败！");
									$("#alertDiamondForm").show();
								}
							} else {
								$("#alertDiamondFormInfo").text("保存失败！");
								$("#alertDiamondForm").show();
							}
						});
			});
	$("#btnCloseAlert").click(function() {
		$(this).parent().hide();
	});
	$("#btnRecreateDiamond").click(function() {
		$('#diamondForm').data('bootstrapValidator').resetForm(true);
		$("#previewImg").attr("src", "");
		$("#id").val("");
		$("#supplierId").val("");
		$("#alertDiamondForm").hide();
	});
	function ajaxImageUpload() {
		var fileName = ($("#uploadImg").val());
		if (!fileName || $.trim(fileName).length < 4) {
			$("#alertDiamondFormInfo").text("请选择上传图片！");
			$("#alertDiamondForm").show();
			return false;
		}
		var temp = fileName.toLowerCase();
		if (temp.indexOf(".jpg") < 0 && temp.indexOf(".png") < 0
				&& temp.indexOf(".gif") < 0 && temp.indexOf(".jpeg") < 0
				&& temp.indexOf(".bmp") < 0) {
			$("#alertDiamondFormInfo").text("请选择图片格式！");
			$("#alertDiamondForm").show();
			return false;
		}

		$("#previewImg").attr("src", "/images/loading.gif");

		$.ajaxFileUpload({
			url : '/imageUpload/upload.do?module=diamond', //需要链接到服务器地址  
			secureuri : false,
			fileElementId : 'uploadImg', //文件选择框的id属性  
			dataType : 'json',
			success : function(data, status) {
				if (data) {
					if (data.code == '0') {
						$("#alertDiamondFormInfo").text("上传成功！");
						$("#alertDiamondForm").show();
						$("#previewImg").attr("src", data.imgUrl);
						$("#image").val(data.imgUrl);
						$("#uploadImg").val(data.imgOriginName);
					} else if (data.msg && data.msg != '') {
						$("#alertDiamondFormInfo").text(data.msg);
						$("#alertDiamondForm").show();
						$("#previewImg").attr("src", "");
						$("#image").val("");
					} else {
						$("#alertDiamondFormInfo").text("上传失败！");
						$("#alertDiamondForm").show();
						$("#previewImg").attr("src", "");
						$("#image").val("");
					}
				}
			},
			error : function(data, status, e) {
				$("#alertDiamondFormInfo").text("上传失败！");
				$("#alertDiamondForm").show();
				$("#previewImg").attr("src", "");
				$("#image").val("");
			}
		});
	}
</script>

