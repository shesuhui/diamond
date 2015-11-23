$(function() {
	var orderId = $("#orderId").val();
	LoadListTable("/buyer/queryMyOrderDetail.do", {
		orderId : orderId
	}, 'paging', 'orderDetailTable', 1, buildTbData);
	$("#updateOrderStatusTime").datetimepicker({
		format : 'yyyy-mm-dd hh:ii',
		autoclose : true,
		todayBtn : true,
		language : 'zh-CN',
		minView : 'hour',
		endDate : new Date()
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
				var ordid = $("#cancelOrderId").val();
				$.post("/order/cancel.do", $('#cancelOrderForm')
						.serializeArray(), function(data) {

					if (data) {
						if (data.code == 0) {
							window.location.reload(true);
							$("#cancelOrderResult")
									.text("订单" + ordid + "取消成功！");
							$("#alertCancelOrderResult").show();
							// 取消 成功后关闭窗口
							setTimeout(function() {
								$("#btnCloseCancelOrderModal").click();
							}, 1000);
						} else if (data.msg && data.msg != "") {
							$("#cancelOrderResult").text(data.msg);
							$("#alertCancelOrderResult").show();
						} else {
							$("#cancelOrderResult")
									.text("订单" + ordid + "取消失败！");
							$("#alertCancelOrderResult").show();
						}
					} else {
						$("#cancelOrderResult").text("订单" + ordid + "取消失败！");
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
				// 提交
				var ordid = $("#updateOrderStatusId").val();
				$.post("/order/updateOrderStatus.do", $(
						'#updateOrdetStatusForm').serializeArray(), function(
						data) {
					if (data) {
						if (data.code == 0) {
							window.location.reload(true);
							$("#updateOrderStatusResult").text(
									"订单" + ordid + "更改状态成功！");
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
									"订单" + ordid + "更改状态失败！");
							$("#alertUpdateOrderStatusResult").show();
						}
					} else {
						$("#updateOrderStatusResult").text(
								"订单" + ordid + "更改状态失败！");
						$("#alertUpdateOrderStatusResult").show();
					}
				});
			});
});

function buildTbData(rowData) {
	var r = "<tr>";
	r += "<td><a href='/diamond/view.do?id=" + rowData.diamond.id
			+ "' target='_blank' title='点击查看详情'>" + rowData.diamond.name
			+ "</a><a href='javascript:;' class='btn btn-xs' title='点击查看备注' onclick='viewRemark("+rowData.id+")'><span class='glyphicon glyphicon glyphicon-list-alt'></span></a></td><td  onmouseout='hiddenImg();' onmousemove='showImg(\""
			+ rowData.diamond.image
			+ "\")'><a href='javascript:;'  style='cursor:default'>"
			+ rowData.diamond.shapeCnName + "</a></td><td>"
			+ rowData.diamond.weight + "</td><td class='colortd'>" + rowData.diamond.color
			+ "</td><td>" + rowData.diamond.clarity + "</td><td>"
			+ rowData.diamond.cut + "</td><td>"
			+ rowData.diamond.polish + "</td><td>"
			+ rowData.diamond.symm + "</td><td>"
			+ rowData.diamond.fluor+ "</td><td>"
			+ rowData.diamond.size + "</td><td>"
			+ rowData.diamond.taple + "</td><td>"
			+ rowData.diamond.depth + "</td><td class='lefttd'>"
			+ rowData.diamond.locality
			+ "</td>";

	if(rowData.diamond.multicolour==1){
		r+= "<td></td><td></td><td class='righttd'>"+rowData.diamond.saleDollarPrice+"</td>";
	}else{
		r+="<td class='righttd'>"+rowData.diamond.price + "</td><td>";
		if (rowData.diamond.discount != "") {
			r += rowData.diamond.discount + "%";
		}
		r+="</td><td class='righttd'>"+rowData.diamond.saleDollarPrice+"</td>";
	}
	
	r+="<td class='righttd'>"+rowData.price;
	r += "</td><td>" + rowData.diamond.authenticator+"</td>";
	var certUrl = getCertUrl(rowData.diamond.authenticator, rowData.diamond.cert,
			rowData.diamond.weight);
	r += " <td class='certtd'><a href='"
			+ certUrl
			+ "' data-toggle='tooltip' data-placement='bottom' title='点击查看证书' target='_blank'>"
			+ rowData.diamond.cert + "</a></td></tr>";
	r+="<tr id='remark"+rowData.id+"' class='hide'><td>备注:</td><td colspan='18' class='lefttd'>"+rowData.diamond.remark+"</td></tr>";

	return r;
}

function cancelOrder(id) {
	bootbox.confirm(("确定要取消订单" + id + "吗？"), function(res) {
		if (res) {
			$('#cancelOrderModal').modal('show');
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
					window.location.reload(true);
				});
			} else if (data.msg && data.msg != "") {
				bootbox.alert(data.msg);
				return false;
			} else {
				bootbox.alert("订单" + id + "完成失败");
				return false;
			}
		} else {
			bootbox.alert("订单" + id + "完成失败！");
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
							window.location.reload(true);
						});
					} else if (data.msg && data.msg != "") {
						bootbox.alert(data.msg);
						return false;
					} else {
						bootbox.alert(("订单" + id + "确认失败！"));
						return false;
					}
				} else {
					bootbox.alert(("订单" + id + "确认失败！"));
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
			bootbox.alert("订单" + id + "更改状态失败");
			return false;
		}
	});

}
