$(function() {
	activeTab("menuOrder");
	LoadListTable("/order/queryOrder.do", {}, 'paging', 'tbList', 1,
			buildTbData);
	var datepickoption = {
		format : 'yyyy-mm-dd',
		autoclose : true,
		todayBtn : true,
		pickerPosition : "bottom-left",
		language : 'zh-CN',
		minView : 'month',
		endDate : new Date()
	};

	$("#startDate").datetimepicker(datepickoption).on('changeDate',
			function(ev) {
				var startDate = ev.date.toYYYY_MM_DD();
				var endDate = $("#endDate").val();
				if (endDate && endDate != "" && startDate > endDate) {
					bootbox.alert("起始日期不能大于结束日期！");
					$("#startDate").val("");
					return false;
				}
			});
	$("#endDate").datetimepicker(datepickoption).on('changeDate', function(ev) {
		var endDate = ev.date.toYYYY_MM_DD();
		var startDate = $("#startDate").val();
		if (startDate && startDate != "" && endDate < startDate) {
			bootbox.alert("结束日期不能小于结束日期！");
			$("#endDate").val("");
			return false;
		}
	});
	$("#updateOrderStatusTime").datetimepicker({
		format : 'yyyy-mm-dd hh:ii',
		autoclose : true,
		todayBtn : true,
		language : 'zh-CN',
		minView : 'hour',
		endDate : new Date()
	});
	$("#btnQueryOrder").click(function() {
		queryOrder(1);
	});
	$("#btnCreatePurchaseOrder").click(function() {
		createPurchaseOrder();
	});

	$("#btnCloseCancelOrderAlert").click(function() {
		$(this).parent().hide();
	});
	$('#cancelOrderModal').on('hide.bs.modal', function(e) {
		// 隐藏编辑框时关闭提示
		$("#alertCancelOrderResult").hide();
		$('#cancelOrderForm').data('bootstrapValidator').resetForm(true);
	});

	$("#cancelOrderModal").on("hidden.bs.modal", function() {
		$(this).removeData("bs.modal");
	});
	var cancelOrderValidatorOptions = {
		message : '您的输入有误',
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			remark : {
				validators : {
					stringLength : {
						max : 100,
						message : '取消原因不超过200字'
					}
				}
			}
		}
	};
	$('#cancelOrderForm').bootstrapValidator(cancelOrderValidatorOptions).on(
			'success.form.bv',
			function(e) {
				e.preventDefault();
				// 保存
				$.post("/order/cancel.do", $('#cancelOrderForm')
						.serializeArray(),
						function(data) {
							var orid = $("#cancelOrderId").val();
							if (data) {
								if (data.code == 0) {
									queryOrder($("#paging").pagination(
											'getCurrentPage'));
									$("#cancelOrderResult").text(
											"订单" + orid + "取消成功！");
									$("#alertCancelOrderResult").show();
									// 取消 成功后关闭窗口
									setTimeout(function() {
										$("#btnCloseCancelOrderModal").click();
									}, 1000);
								} else if (data.msg && data.msg != "") {
									$("#cancelOrderResult").text(data.msg);
									$("#alertCancelOrderResult").show();
								} else {
									$("#cancelOrderResult").text(
											"订单" + orid + "取消失败！");
									$("#alertCancelOrderResult").show();
								}
							} else {
								$("#cancelOrderResult").text(
										"订单" + orid + "取消失败！");
								$("#alertCancelOrderResult").show();
							}
						});
			});

	$("#btnCloseUpdateOrderStatusAlert").click(function() {
		$(this).parent().hide();
	});
	$('#updateOrderStatusModal').on('hide.bs.modal', function(e) {
		// 隐藏编辑框时关闭提示
		$("#alertUpdateOrderStatusResult").hide();
		$('#updateOrdetStatusForm').data('bootstrapValidator').resetForm(true);
	});

	$("#updateOrderStatusModal").on("hidden.bs.modal", function() {
		$(this).removeData("bs.modal");
	});
	var updateOrderStatusValidatorOptions = {
		message : '您的输入有误',
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			remark : {
				validators : {
					stringLength : {
						max : 100,
						message : '备注不超过200字'
					}
				}
			}
		}
	};
	$('#updateOrdetStatusForm').bootstrapValidator(
			updateOrderStatusValidatorOptions).on(
			'success.form.bv',
			function(e) {
				e.preventDefault();
				if ($("#updateOrderStatusTime").val() == "") {
					$("#updateOrderStatusResult").text("请输入更改时间！");
					$("#alertUpdateOrderStatusResult").show();
					return false;
				}
				var orid = $("#updateOrderStatusId").val();
				// 提交
				$.post("/order/updateOrderStatus.do", $(
						'#updateOrdetStatusForm').serializeArray(), function(
						data) {
					if (data) {
						if (data.code == 0) {
							queryOrder($("#paging")
									.pagination('getCurrentPage'));
							$("#updateOrderStatusResult").text(
									"订单" + orid + "更改状态成功！");
							$("#alertUpdateOrderStatusResult").show();
							// 取消 成功后关闭窗口
							setTimeout(function() {
								$("#btnCloseUpdateOrderStatusModal").click();
							}, 1000);
						} else if (data.msg && data.msg != "") {
							$("#updateOrderStatusResult").text(data.msg);
							$("#alertUpdateOrderStatusResult").show();
						} else {
							$("#updateOrderStatusResult").text(
									"订单" + orid + "更改状态失败！");
							$("#alertUpdateOrderStatusResult").show();
						}
					} else {
						$("#updateOrderStatusResult").text(
								"订单" + orid + "更改状态失败！");
						$("#alertUpdateOrderStatusResult").show();
					}
				});
			});
});
function queryOrder(pageIndex) {
	$("#checkAll").prop("checked", false);
	// 查询
	var queryParam = {
		diamondName : $("#diamondName").val(),
		orderStatus : $("#orderStatus").val(),
		orderId : $("#orderId").val(),
		queryStartDate : $("#startDate").val(),
		queryEndDate : $("#endDate").val(),
	};
	LoadListTable("/order/queryOrder.do", queryParam, 'paging', 'tbList',
			pageIndex, buildTbData);
}
function buildTbData(rowData) {
	var r = "<tr id='tbRow" + rowData.id
			+ "'><td><input type='checkbox' name='id' value=" + rowData.id
			+ "></td>";
	r += "<td><a href='/order/viewOrder.do?id=" + rowData.id
			+ "'  target='_blank'>" + rowData.id + "</a></td>";
	r += "<td>" + rowData.amount + "</td><td>" + rowData.buyerLoginId
			+ "</td><td>" + rowData.createTime + "</td><td>"
			+ rowData.orderStatusName + "</td><td>";
	r += "&nbsp;<a  role='button' class='btn btn-primary btn-xs' href='/order/viewOrder.do?id="
			+ rowData.id + "' target='_blank'>查看</a>";
	if (rowData.orderStatus == 1) {
		r += "&nbsp;<a  role='button' class='btn btn-primary btn-xs' href='javascript:;' onclick='auditOrder("
				+ rowData.id + ")'>确认</a>";
	} else if (rowData.orderStatus < 6) {
		r += "&nbsp;<a  role='button' class='btn btn-primary btn-xs' href='javascript:;' onclick='updateOrderStatus("
				+ rowData.id + ")'>更改状态</a>";
	} else if (rowData.orderStatus == 6) {
		r += "&nbsp;<a  role='button' class='btn btn-primary btn-xs' href='javascript:;' onclick='finishOrder("
				+ rowData.id + ")'>完成</a>";
	}

	if (rowData.orderStatus < 7) {
		r += "&nbsp;<a  role='button' class='btn btn-primary btn-xs' href='javascript:;' onclick='cancelOrder("
				+ rowData.id + ")'>取消</a>";
	} else if (rowData.orderStatus == 8) {
		r += "&nbsp;<a  role='button' class='btn btn-primary btn-xs' href='javascript:;' onclick='removeOrder("
				+ rowData.id + ")'>删除</a>";
	}

	r += "</td></tr>";
	return r;
}
function cancelOrder(id) {
	bootbox.confirm(("确定要取消订单" + id + "吗？"), function(res) {
		if (res) {
			$("#cancelOrderId").val(id);
			$('#cancelOrderModal').modal('show');
		}
	});
	return false;
}
function removeOrder(id) {
	bootbox.confirm(("确定要删除订单" + id + "吗？"), function(res) {
		if (res) {
			$.post("/order/delete.do", {
				orderId : id
			}, function(data) {
				if (data) {
					if (data.code == 0) {
						bootbox.alert(("订单" + id + "已删除！"), function() {
							if ($("#tbList tr:gt(0)").length > 1) {
								queryOrder($("#paging").pagination(
										'getCurrentPage'));
							} else {
								queryOrder(1);
							}

						});
					} else if (data.msg && data.msg != "") {
						bootbox.alert(data.msg);
						return false;
					} else {
						bootbox.alert("订单" + id + "删除失败");
						return false;
					}
				} else {
					bootbox.alert("订单" + id + "删除失败");
					return false;
				}
			});
		}
	});
	return false;
}
function finishOrder(id) {
	$.post("/order/finish.do", {
		orderId : id
	}, function(data) {
		if (data) {
			if (data.code == 0) {
				bootbox.alert(("订单" + id + "已完成！"), function() {
					queryOrder($("#paging").pagination('getCurrentPage'));
				});
			} else if (data.msg && data.msg != "") {
				bootbox.alert(data.msg);
				return false;
			} else {
				bootbox.alert("订单" + id + "完成失败");
				return false;
			}
		} else {
			bootbox.alert("订单" + id + "完成失败");
		}
	});
	return false;
}
function auditOrder(id) {
	bootbox.confirm(("是否要确认订单" + id + "？"), function(res) {
		if (res) {
			$.post("/order/audit.do", {
				orderId : id
			}, function(data) {
				if (data) {
					if (data.code == 0) {
						bootbox.alert(("订单" + id + "确认成功！"), function() {
							queryOrder($("#paging")
									.pagination('getCurrentPage'));
						});
					} else if (data.msg && data.msg != "") {
						bootbox.alert(data.msg);
						return false;
					} else {
						bootbox.alert("确认订单" + id + "失败");
						return false;
					}
				} else {
					bootbox.alert("确认订单" + id + "失败！");
					return false;
				}
			});
		}
	});
	return false;
}

function updateOrderStatus(id) {
	$.post("/order/getOrderUpdatableStatus.do", {
		orderId : id
	}, function(data) {
		if (data) {
			if (data.code == 0) {
				$("#updateOrderStatusTime").val(
						new Date().Format("yyyy-MM-dd hh:mm"));
				if (data.result && data.result.length > 0) {
					$("#orderNewStatus option").each(function(i) {
						$(this).remove();
					});
					for ( var i in data.result) {
						$("#orderNewStatus").append(
								"<option value=" + data.result[i].value + ">"
										+ data.result[i].name + "</option>");
					}
					$("#updateOrderStatusId").val(id);
					$('#updateOrderStatusModal').modal('show');
				} else {
					bootbox.alert("订单" + id + "更改状态失败");
					return false;
				}
			} else if (data.msg && data.msg != "") {
				bootbox.alert(data.msg);
				return false;
			} else {
				bootbox.alert("订单" + id + "更改状态失败");
				return false;
			}
		} else {
			bootbox.alert("订单" + id + "更改状态失败！");
			return false;
		}
	});
}
function createPurchaseOrder() {
	var selectIds = getSelectIds("tbList");
	if (selectIds.length < 1) {
		bootbox.alert("请选择已确认的订单！");
		return false;
	}
	$.post("/order/checkCreatePurchase.do", {
		orderId : selectIds.toString()
	}, function(data) {
		if (data) {
			if (data.code == 0) {
				window.location.href = "/order/exportPurchaseOrder.do?orderId="
						+ selectIds.toString();
			} else if (data.msg && data.msg != "") {
				bootbox.alert(data.msg);
				return false;
			} else {
				bootbox.alert("生成采购单失败");
				return false;
			}
		} else {
			bootbox.alert("生成采购单失败");
			return false;
		}
	});

	// window
	// .open("/order/exportPurchaseOrder.do?orderId="
	// + selectIds.toString());
}
