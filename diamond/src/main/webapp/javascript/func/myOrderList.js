$(function() {
	activeTab("menuMyOrder");

	LoadListTable("/buyer/queryMyOrder.do", {}, 'paging', 'tbList', 1,
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
	$("#btnQueryMyOrder").click(function() {
		queryMyOrder(1);
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
				var ordid=$("#cancelOrderId").val();
				$.post("/order/cancel.do", $('#cancelOrderForm')
						.serializeArray(), function(data) {
					if (data) {
						if (data.code == 0) { 
							queryMyOrder($("#paging").pagination('getCurrentPage'));
							$("#cancelOrderResult").text("订单"+ordid+"取消成功！");
							$("#alertCancelOrderResult").show();
							// 取消 成功后关闭窗口
							setTimeout(function() {
								$("#btnCloseCancelOrderModal").click();
							}, 1000);
						} else if (data.msg && data.msg != "") {
							$("#cancelOrderResult").text(data.msg);
							$("#alertCancelOrderResult").show();
						} else {
							$("#cancelOrderResult").text("订单"+ordid+"取消失败！");
							$("#alertCancelOrderResult").show();
						}
					} else {
						$("#cancelOrderResult").text("订单"+ordid+"取消失败！");
						$("#alertCancelOrderResult").show();
					}
				});
			});

});
function queryMyOrder(pageIndex) {
	// 查询
	var queryParam = {
		diamondName : $("#diamondName").val(),
		orderStatus : $("#orderStatus").val(),
		orderId : $("#orderId").val(),
		queryStartDate : $("#startDate").val(),
		queryEndDate : $("#endDate").val(),
	};
	LoadListTable("/buyer/queryMyOrder.do", queryParam, 'paging', 'tbList', pageIndex,
			buildTbData);
}
function buildTbData(rowData) {
	var r = "<tr ><td><a href='/buyer/viewMyOrder.do?id=" + rowData.id
			+ "'  data-toggle='tooltip' data-placement='top' title='点击查看详情' target='_blank'>" + rowData.id + "</a></td>";
	r += "<td>" + rowData.amount + "</td><td>" + rowData.createTime
			+ "</td><td>" + rowData.orderStatusName + "</td><td>";
	r += "&nbsp;<a  role='button' class='btn btn-primary btn-xs' href='/buyer/viewMyOrder.do?id="
			+ rowData.id + "' target='_blank'>查看</a>";
	if (rowData.orderStatus == 1) {
		r += "&nbsp;<a  role='button' class='btn btn-primary btn-xs' href='javascript:;' onclick='cancelOrder("
				+ rowData.id + ")'>取消</a>";
	} else if (rowData.orderStatus == 6) {
		r += "&nbsp;<a  role='button' class='btn btn-primary btn-xs' href='javascript:;' onclick='finishOrder("
				+ rowData.id + ")'>完成</a>";
	} else if (rowData.orderStatus == 8) {
		r += "&nbsp;<a  role='button' class='btn btn-primary btn-xs' href='javascript:;' onclick='removeOrder("
				+ rowData.id + ")'>删除</a>";
	}

	r += "</td></tr>";
	return r;
}
function cancelOrder(id) {
	bootbox.confirm(("确定要取消订单"+id+"吗？"), function(res) {
		if (res) {
			$("#cancelOrderId").val(id);
			$('#cancelOrderModal').modal('show');
		}
	});
	return false;
}
function removeOrder(id) {
	bootbox.confirm(("确定要删除订单"+id+"吗？"), function(res) {
		if (res) {
			$.post("/order/delete.do", {
				orderId : id
			}, function(data) {
				if (data) {
					if (data.code == 0) {
						bootbox.alert(("订单"+id+"已删除！"), function() {
							if($("#tbList tr:gt(0)").length>1){
								queryMyOrder($("#paging").pagination('getCurrentPage'));
							}else{
								queryMyOrder(1);
							}
						});
					} else if (data.msg && data.msg != "") {
						bootbox.alert(data.msg);
						return false;
					} else {
						bootbox.alert("订单"+id+"删除失败");
						return false;
					}
				} else {
					bootbox.alert("订单"+id+"删除失败");
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
				bootbox.alert(("订单"+id+"已完成！"), function() {
					queryMyOrder($("#paging").pagination('getCurrentPage'));
				});
			} else if (data.msg && data.msg != "") {
				bootbox.alert(data.msg);
				return false;
			} else {
				bootbox.alert("订单"+id+"完成失败");
				return false;
			}
		} else {
			bootbox.alert("订单"+id+"完成失败");
		}
	});
	return false;
}
 