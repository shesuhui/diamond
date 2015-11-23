$(function() {
	activeTab("menuSupplier");
	LoadListTable("/supplier/query.do", {}, 'paging', 'tbList', 1, buildTbData);
	$("#btnQuerySupplier").click(function() {
		querySupplier(1);
	});
	$("#btnRemoveSupplier").click(function() {
		removeSupplier();
	});

	$("#btnAddSupplier").click(function() {
		$('#editSupplierModal').modal({
			remote : "/supplier/add.do"
		});
	});
	$("#btnImpSupplier").click(function() {
		$('#impSupplierModal').modal("show");
	});
	$("#btnCloseImpAlert").click(function() {
		$(this).parent().hide();
		$("#alertImpSupplierResult").hide();
	});

	$('#impSupplierModal').on('hide.bs.modal', function(e) {
		// 隐藏导入框时关闭提示
		$("#alertImpSupplierResult").hide();
		$("#impProgress").hide();
	});

	$("#impSupplierModal").on("hidden.bs.modal", function() {
		$(this).removeData("bs.modal");
	});

	$("#btnEditSupplier").click(function() {
		var selectIds = getSelectIds("tbList");
		if (selectIds.length != 1) {
			bootbox.alert("请选择且仅选择一个供应商！");
			return false;
		}
		$('#editSupplierModal').modal({
			remote : "/supplier/edit.do?id=" + selectIds[0]
		});
	});

	$('#editSupplierModal').on('hide.bs.modal', function(e) {
		// 隐藏编辑框时关闭提示
		$("#alertEditSupplierResult").hide();
		$('#supplierForm').data('bootstrapValidator').resetForm(true);
	});

	$("#editSupplierModal").on("hidden.bs.modal", function() {
		$(this).removeData("bs.modal");
	});

	$("#btnEditAdding").click(function() {
		editAdding();
	});
	$("#btnCloseEditAddingResult").click(function() {
		$(this).parent().hide();
		$("#alertEditAddingResult").hide();
	});

	$('#editAddingModal').on('hide.bs.modal', function(e) {
		$("#alertEditAddingResult").hide();
	});

	$("#editAddingModal").on("hidden.bs.modal", function() {
		$(this).removeData("bs.modal");
	});

	var editAddingFormValidatorOptions = {
		message : '您的输入有误',
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			batchAdding : {
				validators : {
					between : {
						min : 0,
						max : 100,
						message : '加成范围 (0~100）'
					}
				}
			}
		}
	};
	$('#editAddingForm').bootstrapValidator(editAddingFormValidatorOptions).on(
			'success.form.bv',
			function(e) {
				e.preventDefault();
				// 保存
				$.post("/supplier/batchEditAdding.do", $('#editAddingForm')
						.serializeArray(), function(data) {
					if (data) {
						if (data.code == 0) {
							$("#editAddingResult").text("提交成功！");
							$("#alertEditAddingResult").show();
							querySupplier($("#paging").pagination(
									'getCurrentPage'));
							// 修改 成功后关闭窗口
							setTimeout(function() {
								$("#btnCloseEditAddingModal").click();
							}, 1000);
						} else if (data.msg && data.msg != "") {
							$("#editAddingResult").text(data.msg);
							$("#alertEditAddingResult").show();
						} else {
							$("#editAddingResult").text("提交失败！");
							$("#alertEditAddingResult").show();
						}
					} else {
						$("#editAddingResult").text("提交失败！");
						$("#alertEditAddingResult").show();
					}
				});
			});

});
function querySupplier(pageIndex) {
	// 查询
	$("#checkAll").prop("checked", false);
	var queryParam = {
		num : $("#num").val(),
		name : $("#name").val()
	};
	LoadListTable("/supplier/query.do", queryParam, 'paging', 'tbList',
			pageIndex, buildTbData);
}
function buildTbData(rowData) {
	var r = "<tr ><td><input type='checkbox' name='id' value=" + rowData.id
			+ "></td>";

	r += "<td>" + rowData.num + "</td><td class='longtexttd'>" + rowData.name + "</td><td class='lefttd'>"
			+ rowData.linkman + "</td><td  class='lefttd'>" + rowData.phone + "</td><td  class='lefttd'>"+rowData.hkPhone+"</td><td>"
			+ rowData.fax + "</td><td  class='lefttd'>" + rowData.email + "</td><td  class='lefttd'>"+rowData.skype+"</td><td style='width:100px;'>";
	
	if (rowData.adding != '') {
		r += rowData.adding + "%";
	}
	r += "</td><td class='longtexttd'>" + rowData.address + "</td>";
	r += "</tr>";
	return r;
}
function removeSupplier() {
	var selectIds = getSelectIds("tbList");
	if (selectIds.length < 1) {
		bootbox.alert("请选择需要删除的供应商！");
		return false;
	}
	// 删除
	bootbox.confirm("确定删除所选供应商吗？", function(res) {
		if (res) {
			$.post("/supplier/delete.do", {
				id : selectIds.toString()
			}, function(data) {
				if (data) {
					if (data.code == 0) {
						bootbox.alert("删除成功！", function() {
							if ($("#tbList tr:gt(0)").length > 1) {
								querySupplier($("#paging").pagination(
										'getCurrentPage'));
							} else {
								querySupplier(1);
							}
						});
					} else if (data.msg && data.msg != "") {
						bootbox.alert(data.msg);
						return false;
					} else {
						bootbox.alert("删除失败！");
						return false;
					}
				} else {
					bootbox.alert("删除失败！");
				}
			});
		}
	});
	return false;
}
function ajaxUploadSupplier() {
	$("#alertImpSupplierResult").hide();
	var fileName = ($("#supplierFile").val());
	if (!fileName || $.trim(fileName).length < 4) {
		$("#impSupplierResult").text("请选择excel文件上传(.csv/.xls/.xlsx)！");
		$("#alertImpSupplierResult").show();
		return false;
	}
	var temp = fileName.toLowerCase();
	if (temp.indexOf(".csv") < 0 && temp.indexOf(".xls") < 0
			&& temp.indexOf(".xlsx") < 0) {
		$("#impSupplierResult").text("请选择excel文件上传(.csv/.xls/.xlsx)！");
		$("#alertImpSupplierResult").show();
		return false;
	}
	$("#impProgress").modal("show");
	$.ajaxFileUpload({
		url : '/supplier/imp.do',
		secureuri : false,
		fileElementId : 'supplierFile',
		dataType : 'json',
		success : function(data, status) {
			$("#impProgress").modal("hide");
			if (data) {
				if (data.code == '0') {
					$("#impSupplierResult").text("导入成功！");
					$("#alertImpSupplierResult").show();
					querySupplier(1);
					setTimeout(function() {
						$("#btnCloseImpModal").click();
					}, 1000);
				} else if (data.msg && data.msg != '') {
					$("#impSupplierResult").text(data.msg);
					$("#alertImpSupplierResult").show();
				} else {
					$("#impSupplierResult").text("导入失败！");
					$("#alertImpSupplierResult").show();
				}
			}
		},
		error : function(data, status, e) {
			$("#impProgress").modal("hide");
			$("#impSupplierResult").text("导入失败！");
			$("#alertImpSupplierResult").show();
		}
	});
}
function editAdding() {
	var selectIds = getSelectIds("tbList");
	if (selectIds.length < 1) {
		bootbox.alert("请选择需要修改加成的供应商！");
		return false;
	}
	$("#ids").val(selectIds.toString());
	$('#editAddingModal').modal("show");
}