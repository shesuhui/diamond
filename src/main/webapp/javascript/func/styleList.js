$(function() {
	activeTab("menuStyle");
	LoadListTable("/style/query.do", {}, 'paging', 'tbList', 1, buildTbData);
	$("#btnQueryStyle").click(function() {
		queryStyle(1);
	});
	$("#btnRemoveStyle").click(function() {
		removeStyle();
	});
	$("#btnAddStyle").click(function() {
		// $('#editStyleModal').modal('show');
		$('#editStyleModal').modal({
			remote : "/style/add.do"
		});
	});

	$("#btnEditStyle").click(function() {
		var selectIds = getSelectIds("tbList");
		if (selectIds.length != 1) {
			bootbox.alert("请选择且仅选择一种款式！");
			return false;
		}
		$('#editStyleModal').modal({
			remote : "/style/edit.do?id=" + selectIds[0]
		});
	});

	$('#editStyleModal').on('hide.bs.modal', function(e) {
		// 隐藏编辑框时关闭提示
		$("#alertStyleForm").hide();
		$('#styleForm').data('bootstrapValidator').resetForm(true);
	});

	$("#editStyleModal").on("hidden.bs.modal", function() {
		$(this).removeData("bs.modal");
	});

});
function queryStyle(pageIndex) {
	$("#checkAll").prop("checked",false);
	// 查询 
	if (!pageIndex || pageIndex == "0") {
		pageIndex = 1;
	} 
	var queryParam = {
		name : $("#styleName").val(),
		locality : $("#styleLocality").val()
	};
	LoadListTable("/style/query.do", queryParam, 'paging', 'tbList', pageIndex,
			buildTbData);
}
function buildTbData(rowData) {
	var r = "<tr ><td><input type='checkbox' name='id' value=" + rowData.id
			+ "></td><td>";
	if (rowData.thumbnail != "") {
		r += "<img class='img-thumbnail'  src='" + ROOTPATH + "/"
				+ rowData.thumbnail + "' />";
	}
	r += "</td><td>" + rowData.name + "</td><td>" + rowData.localityName
			+ "</td><td>" + rowData.purity + "</td><td>" + rowData.remark + "</td></tr>";
	return r;
}
function removeStyle() {
	var selectIds = getSelectIds("tbList");
	if (selectIds.length < 1) {
		bootbox.alert("请选择需要删除的款式！");
		return false;
	}
	// 删除
	bootbox.confirm("确定删除所选款式吗？", function(res) {
		if (res) {
			$.post("/style/delete.do", {
				id : selectIds.toString()
			}, function(data) {
				if (data) {
					if (data.code == 0) {
						bootbox.alert("删除成功！", function() {
							if ($("#tbList tr:gt(0)").length > 1) {
								queryStyle($("#paging").pagination(
										'getCurrentPage'));
							} else {
								queryStyle(1);
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