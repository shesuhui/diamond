function removeCartItem(id, price) {
	// 从购物车移除
	$.post("/buyer/removeCartItem.do?id=" + id, null, function(data, status) {
		// 后台移除
		if (data && data.code == 0) {
			$("#s_cartItem" + id).remove();
			var cartItem = $("#cartItem" + id);
			if (cartItem) {
				cartItem.remove();
			}
			var putCart=$("#putCart"+id);
			if(putCart){
				putCart.show();
			}
            var cartOk = $("#cartOk" + id);
            if(cartOk){
            	   cartOk.hide();
            }
         
			$("#cartCount").html(parseInt($("#cartCount").html()) - 1);

			if ($("#s_cartItemTable tbody tr").length == 0) {
				// 隐藏表格
				cartIsEmpty();
			} else {
				// 更新数量和价格
				$("[name=spanCartGoodsCount]").each(function(i) { 
					$(this).html(
							data.result.cartGoodsCount);
				});
				$("[name=spanCartAmount]").each(function(i) { 
					$(this).html(
							data.result.cartAmount);
				});
			}
		} else {
			bootbox.alert("删除出错");
			return false;
		}
	});
}
function clearCart() {
	// 清空购物车
	$.post("/buyer/clearCart.do", null, function(data, status) {
		// 后台移除
		if (data && data.code == 0) {
			$("#s_cartItemTable tbody tr").each(function(i) {
				$(this).remove();
			});
			$("#cartItemTable tbody tr").each(function(i) {
				$(this).remove();
			});
			cartIsEmpty();
		} else {
			bootbox.alert("删除出错");
			return false;
		}
	});
}
function cartIsEmpty() {
	$("#cartCount").html(0);
	// 隐藏表格
	$("[name='cartItemTable']").each(function(i) {
		$(this).addClass("hide");
	});
	$("[name='spanCartGoodsCount']").each(function(i) {
		$(this).html("0");
	});
	$("[name='spanCartAmount']").each(function(i) {
		$(this).html("0.00");
	});
	$("[name='cartOptDiv']").each(function(i) {
		$(this).addClass("hide");
	});
	$("[name='cartEmptyTxt']").each(function(i) {
		$(this).removeClass("hide");
	});
	$("[name='cartOk']").each(function(i){
		$(this).hide();
	});
	$("[name='putCart']").each(function(i){
		$(this).show();
	});
}

function submitOrder() {
	// 提交订单
	$("#progressModal").modal("show");
	var url = "/buyer/submitOrder.do";
	$.get(url, {}, function(data, status) {
		$("#progressModal").modal("hide");
		if (data) {
			if (data.code == 0) {
				window.location.href = "/buyer/myOrder.do";
			} else if (data.msg && data.msg != "") {
				bootbox.alert(data.msg);
				return false;
			} else {
				bootbox.alert("提交订单失败");
				return false;
			}
		} else {
			bootbox.alert("提交订单失败");
			return false;
		}
	});
}