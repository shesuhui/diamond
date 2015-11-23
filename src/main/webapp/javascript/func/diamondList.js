$(function() {
	activeTab("menuDiamond");
	LoadListTable("/diamond/query.do", {pageSize : 50}, 'paging', 'tbList', 1, buildTbData);

	$("#btnReset").click(function() {
		$("#searchPanel a").each(function(i) {
			if ($(this).hasClass("on")) {
				$(this).removeClass("on");
			}
		});
		$('#queryDiamondForm')[0].reset();
		$('#queryDiamondForm').data('bootstrapValidator').resetForm(true);
	});

	$("#searchPanel a").hover(function() {
		$(this).addClass('hvr');
	}, function() {
		$(this).removeClass('hvr');
	});
	$("#searchPanel a").click(function() {
		if ($(this).hasClass("on")) {
			$(this).removeClass("on");
		} else {
			$(this).addClass('on');
		}
	});

	var queryDiamondFormValidatorOptions = {
		message : '您的输入有误',
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			minQueryWeight : {
				validators : {
					between : {
						min : 0,
						max : 9999,
						message : '请输入0~9999'
					}
				}
			},
			maxQueryWeight : {
				validators : {
					between : {
						min : 0,
						max : 9999,
						message : '请输入0~9999'
					},
					callback : {
						message : '不能小于最小查询重量',
						callback : function(value, validator) {
							return !value
									|| value == ""
									|| value >= validator.getFieldElements(
											'minQueryWeight').val();
						}
					}
				}
			}
		}
	};
	$('#queryDiamondForm').bootstrapValidator(queryDiamondFormValidatorOptions)
			.on('success.form.bv', function(e) {
				e.preventDefault();
				// 查询
//				$("#sortByWeight").val("0"); // 取消排序
//				$("#sortByWeightIcon").removeClass();
//				$("#sortByWeightIcon").addClass("glyphicon glyphicon-sort");
				$("#btnQueryDiamond").removeAttr("disabled");
				queryDiamond(1);
			});

	$("#btnRemoveDiamond").click(function() {
		removeDiamond();
	});
	$("#btnAddDiamond").click(function() {
		$('#editDiamondModal').modal({
			remote : "/diamond/add.do"
		});
	});
	$("#btnSetBuyable").click(function() {
		setBuyable();
	});

	$("#btnEditDiamond").click(function() {
		var selectIds = getSelectIds("tbList");
		if (selectIds.length != 1) {
			bootbox.alert("请选择且仅选择一种钻石！");
			return false;
		}
		$('#editDiamondModal').modal({
			remote : "/diamond/edit.do?id=" + selectIds[0]
		});
	});

	$('#editDiamondModal').on('hide.bs.modal', function(e) {
		// 隐藏编辑框时关闭提示
		$("#alertDiamondForm").hide();
		$('#diamondForm').data('bootstrapValidator').resetForm(true);
	});

	$("#editDiamondModal").on("hidden.bs.modal", function() {
		$(this).removeData("bs.modal");
	});

	$("#btnImpDiamond").click(function() {
		$('#impDiamondModal').modal("show");
	});
	$("#btnCloseImpAlert").click(function() {
		$(this).parent().hide();
		$("#alertImpDiamondResult").hide();
	});

	$('#impDiamondModal').on('hide.bs.modal', function(e) {
		// 隐藏导入框时关闭提示
		$("#alertImpDiamondResult").hide();
		$("#impProgress").hide();
	});

	$("#impDiamondModal").on("hidden.bs.modal", function() {
		$(this).removeData("bs.modal");
	});

});
function queryDiamond(pageIndex) {
	$("#checkAll").prop("checked", false);
	// 查询
	if (!pageIndex || pageIndex == "0") {
		pageIndex = 1;
	}
	var queryParam = formSerialToJson("queryDiamondForm");
	LoadListTable("/diamond/query.do", queryParam, 'paging', 'tbList',
			pageIndex, buildTbData);
}
//href='javascript:;'  onclick='viewRemark(\""+rowData.id+"\")'
function buildTbData(rowData) {
	var r = "<tr id='tbRow" + rowData.id
			+ "'><td><input type='checkbox' name='id' value=" + rowData.id
			+ "></td>";
	r += "<td><a data-toggle='tooltip' data-placement='bottom' title='点击查看详细' href='/diamond/view.do?id="
			+ rowData.id
			+ "' target='_blank'>"
			+ rowData.name
			+ "</a><a class='btn btn-xs' title='点击查看备注' href='javascript:;'  onclick='viewRemark(\""+rowData.id+"\")''><span class='glyphicon glyphicon glyphicon-list-alt'></span></a></td><td onmouseout='hiddenImg();' onmousemove='showImg(\""
			+ rowData.image
			+ "\")'><a href='javascript:;'  style='cursor:default'>"
			+ rowData.shapeCnName
			+ "</a></td><td>"
			+ rowData.weight
			+ "</td><td class='colortd'>"
			+ rowData.color
			+ "</td><td>"
			+ rowData.clarity
			+ "</td><td>"
			+ rowData.cut
			+ "</td><td>"
			+ rowData.polish
			+ "</td><td>"
			+ rowData.symm
			+ "</td><td>"
			+ rowData.fluor
			+ "</td><td>"+ rowData.size
			+ "</td><td>"+ rowData.taple
			+ "</td><td>"+ rowData.depth
			+ "</td><td class='lefttd'>"
			+ rowData.locality
			+ "</td>";
	if(rowData.multicolour==1){
		r+= "<td></td><td></td><td class='righttd'>"+rowData.saleDollarPrice+"</td>";
	}else{
		r+="<td style='text-align:right'>"+rowData.price + "</td><td>";
		if (rowData.discount != "") {
			r += rowData.discount + "%";
		}
		r+="</td><td class='righttd'>"+rowData.saleDollarPrice+"</td>";
	}

	r+="<td class='righttd'>"+rowData.amount;
	r += "</td><td>" + rowData.authenticator + "</td>";

	var certUrl = getCertUrl(rowData.authenticator, rowData.cert,
			rowData.weight);
	r += " <td class='certtd'><a href='"
			+ certUrl
			+ "' data-toggle='tooltip' data-placement='bottom' title='点击查看证书' target='_blank'>"
			+ rowData.cert + "</a></td>";
	r += "<td>" + rowData.statusName + "</td></tr>"; 
	r+="<tr id='remark"+rowData.id+"' class='hide'><td colspan='2'>备注:</td><td colspan='19' class='lefttd'>"+rowData.remark+"</td></tr>";
	return r;
}

function sortByWeight() {
	//先取消其他两种排序  
//	$("#sortByDiscount").val(0);
//	document.getElementById("sortByDiscountIcon").className="glyphicon glyphicon-sort";
	
//	$("#sortByAmount").val(0);
//	document.getElementById("sortByAmountIcon").className="glyphicon glyphicon-sort";
	
	$("#sortFirst").val("weight");
	
	var sortByWeight = $("#sortByWeight");
	if (sortByWeight.val() == '0' || sortByWeight.val() == "2") {
		sortByWeight.val("1");// 升序
//		$("#sortByWeightIcon").removeClass("glyphicon-arrow-down glyphicon-sort");
//		$("#sortByWeightIcon").addClass("glyphicon-arrow-up");
		document.getElementById("sortByWeightIcon").className="glyphicon glyphicon-arrow-up";
	} else if (sortByWeight.val() == "1") {
		sortByWeight.val("2");// 降序
//		$("#sortByWeightIcon").removeClass("glyphicon-arrow-up glyphicon-sort");
//		$("#sortByWeightIcon").addClass("glyphicon-arrow-down");
		document.getElementById("sortByWeightIcon").className="glyphicon glyphicon-arrow-down";
	}
	queryDiamond(1);
}
function sortByDiscount() {
	//先取消其他两种排序  
	//$("#sortByWeight").val(0);
	//document.getElementById("sortByWeightIcon").className="glyphicon glyphicon-sort";
	
	//$("#sortByAmount").val(0);
	//document.getElementById("sortByAmountIcon").className="glyphicon glyphicon-sort";
	$("#sortFirst").val("discount");
	var sortByDiscount = $("#sortByDiscount");
	if (sortByDiscount.val() == '0' || sortByDiscount.val() == "2") {
		sortByDiscount.val("1");// 升序
		document.getElementById("sortByDiscountIcon").className="glyphicon glyphicon-arrow-up";
	} else if (sortByDiscount.val() == "1") {
		sortByDiscount.val("2");// 降序
		document.getElementById("sortByDiscountIcon").className="glyphicon glyphicon-arrow-down";
	}
	queryDiamond(1);
}
function sortByAmount() {
	//先取消其他两种排序  
	//$("#sortByDiscount").val(0);
//	document.getElementById("sortByDiscountIcon").className="glyphicon glyphicon-sort";
	
	//$("#sortByWeight").val(0);
	//document.getElementById("sortByWeightIcon").className="glyphicon glyphicon-sort";
	$("#sortFirst").val("amount");
	var sortByAmount = $("#sortByAmount");
	if (sortByAmount.val() == '0' || sortByAmount.val() == "2") {
		sortByAmount.val("1");// 升序
		document.getElementById("sortByAmountIcon").className="glyphicon glyphicon-arrow-up";
	} else if (sortByAmount.val() == "1") {
		sortByAmount.val("2");// 降序
		document.getElementById("sortByAmountIcon").className="glyphicon glyphicon-arrow-down";
	}
	queryDiamond(1);
}
function removeDiamond() {
	var selectIds = getSelectIds("tbList");
	if (selectIds.length < 1) {
		bootbox.alert("请选择需要删除的钻石！");
		return false;
	}
	// 删除
	bootbox.confirm("确定删除所选钻石吗？", function(res) {
		if (res) {
			$.post("/diamond/delete.do", {
				id : selectIds.toString()
			}, function(data) {
				if (data) {
					if (data.code == 0) {
						bootbox.alert("删除成功！", function() {
							if ($("#tbList tr:gt(0)").length > 1) {
								queryDiamond($("#paging").pagination(
										'getCurrentPage'));
							} else {
								queryDiamond(1);
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

function setBuyable() {
	var selectIds = getSelectIds("tbList");
	if (selectIds.length < 1) {
		bootbox.alert("请选择需要上架的钻石！");
		return false;
	}
	// 上架
	bootbox.confirm("确定上架所选钻石吗？", function(res) {
		if (res) {
			$.post("/diamond/setBuyable.do", {
				id : selectIds.toString()
			}, function(data) {
				if (data) {
					if (data.code == 0) {
						bootbox.alert("上架成功！", function() {
							queryDiamond($("#paging").pagination(
									'getCurrentPage'));
						});
					} else if (data.msg && data.msg != "") {
						bootbox.alert(data.msg);
						return false;
					} else {
						bootbox.alert("上架成功！");
						return false;
					}
				} else {
					bootbox.alert("上架成功！");
				}
			});
		}
	});
	return false;
}

function ajaxUploadDiamond() {
	$("#alertImpDiamondResult").hide();
	var fileName = ($("#diamondFile").val());
	if (!fileName || $.trim(fileName).length < 4) {
		$("#impDiamondResult").text("请选择csv文件上传(csv)！");
		$("#alertImpDiamondResult").show();
		return false;
	}
	var temp = fileName.toLowerCase();
	if (temp.indexOf(".csv") < 0 && temp.indexOf(".xls") < 0
			&& temp.indexOf(".xlsx") < 0) {
		$("#impDiamondResult").text("请选择csv文件上传(.csv)！");
		$("#alertImpDiamondResult").show();
		return false;
	}
	$("#impProgress").modal("show");
	$("#btnCloseImpModal").attr('disabled',"true");
	$.ajaxFileUpload({
		url : '/diamond/imp.do',
		secureuri : false,
		fileElementId : 'diamondFile',
		dataType : 'json',
		success : function(data, status) {
			$("#impProgress").modal("hide");
			$("#btnCloseImpModal").removeAttr('disabled');
			if (data) {
				if (data.code == '0') {
					$("#impDiamondResult").text("导入成功！");
					$("#alertImpDiamondResult").show();
					querySupplier(1);
					setTimeout(function() {
						$("#btnCloseImpModal").click();
					}, 1000);
				} else if (data.msg && data.msg != '') {
					$("#impDiamondResult").text(data.msg);
					$("#alertImpDiamondResult").show();
				} else {
					$("#impDiamondResult").text("导入失败！");
					$("#alertImpDiamondResult").show();
				}
			}
		},
		error : function(data, status, e) {
			$("#impProgress").modal("hide");
			$("#impDiamondResult").text("导入失败！");
			$("#alertImpDiamondResult").show();
		}
	});
}