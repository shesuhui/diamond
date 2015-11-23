$(function() {
	activeTab("menuUser");
	LoadListTable("/user/query.do", {}, 'paging', 'tbList', 1, buildTbData);
	$("#btnQueryUser").click(function() {
		queryUser();
	});

	$("#btnAddBuyer").click(function() {
		$('#editUserModal').modal({
			remote : "/user/add.do?userType=5"
		});
	});
	$("#btnAddService").click(function() {
		$('#editUserModal').modal({
			remote : "/user/add.do?userType=2"
		});
	});
	$("#btnAddAdmin").click(function() {
		$('#editUserModal').modal({
			remote : "/user/add.do?userType=1"
		});
	});

	$("#btnAuditUser").click(function() {
		auditUser();
	});

	$("#btnCancelUser").click(function() {
		cancelUser();
	});

	$("#btnEditUser").click(function() {
		var selectIds = getSelectIds("tbList");
		if (selectIds.length != 1) {
			bootbox.alert("请选择且仅选择一个用户！");
			return false;
		}
		$('#editUserModal').modal({
			remote : "/user/edit.do?id=" + selectIds[0]
		});
	});

	$('#editUserModal').on('hide.bs.modal', function(e) {
		// 隐藏编辑框时关闭提示
		$("#alertEditUserResult").hide();
		$('#userForm').data('bootstrapValidator').resetForm(true);
	});

	$("#editUserModal").on("hidden.bs.modal", function() {
		$(this).removeData("bs.modal");
	});

	$('#mdpModal').on('hide.bs.modal', function(e) {
		$("#alertMdpResult").hide();
		$('#mdpForm').data('bootstrapValidator').resetForm(true);
	});

	$("#mdpModal").on("hidden.bs.modal", function() {
		$(this).removeData("bs.modal");
	});
	$("#btnCloseMdpAlert").click(function() {
		$(this).parent().hide();
	});
	var mdpValidatorOptions = {
		message : '您的输入有误',
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			password : {
				validators : {
					notEmpty : {
						message : '请输入新密码'
					},
					stringLength : {
						min : 6,
						max : 25,
						message : '密码长度为6-25'
					},
					regexp : {
						regexp : /^[a-zA-Z0-9]+$/,
						message : '密码名以数字、字母、下划线组成'
					}
				}
			},
			confirmPassword : {
				validators : {
					callback : {
						message : '密码和确认密码不一致',
						callback : function(value, validator) {
//							var pwd= validator.getFieldElements(
//							'password').val();
//							return pwd==""||value==pwd;
							return true;
						}
					}
				}
			}
		}
	};
	$('#mdpForm').bootstrapValidator(mdpValidatorOptions).on(
			'success.form.bv',
			function(e) {
				e.preventDefault(); 
				var mdPwd=$("#mdPwd").val();
				var mdConfirmPwd=$("#mdConfirmPwd").val();
				if(mdPwd!=mdConfirmPwd){
					$("#mdpResult").text("两次密码输入不一致！");
					$("#alertMdpResult").show();
					return false;
				}
				// 保存
				$.post("/user/modifyOthersPwd.do", $('#mdpForm')
						.serializeArray(), function(data) {
					if (data) {
						if (data.code == 0) { 
							$("#mdpResult").text("修改成功！");
							$("#alertMdpResult").show();
							// 修改 成功后关闭窗口
							setTimeout(function() {
								$("#btnCloseMdpModal").click();
							}, 1000);

						} else if (data.msg && data.msg != "") {
							$("#mdpResult").text(data.msg);
							$("#alertMdpResult").show();
						} else {
							$("#mdpResult").text("修改失败");
							$("#alertMdpResult").show();
						}
					} else {
						$("#mdpResult").text("修改失败");
						$("#alertMdpResult").show();
					}
				});
			});
});
function queryUser(pageIndex) {
	$("#checkAll").prop("checked",false);
	// 查询
	var queryParam = {
		name : $("#userName").val(),
		userType : $("#userType").val(),
		userStatus : $("#userStatus").val(),
	};
	LoadListTable("/user/query.do", queryParam, 'paging', 'tbList', pageIndex,
			buildTbData);
}
function buildTbData(rowData) {
	var r = "<tr ><td><input type='checkbox' name='id' value=" + rowData.id
			+ "></td>";

	r += "<td><a href='/user/view.do?id="+rowData.id+"' target='_blank' title='点击查看详细'>" + rowData.name + "</a></td><td>" + rowData.loginId + "</td><td>"
			+ rowData.userTypeName + "</td><td>" + rowData.createTime
			+ "</td><td>" + rowData.userStatusName + "</td>";
	r += "<td><a href='javascript:;' onclick='modifyPassword(" + rowData.id
			+ ")'>修改密码</a></td>";
	r += "</tr>";
	return r;
}
function removeUser() {
	var selectIds = getSelectIds("tbList");
	if (selectIds.length < 1) {
		bootbox.alert("请选择需要删除的用户！");
		return false;
	}
	// 删除
	bootbox.confirm("确定删除所选用户吗？", function(res) {
		if (res) {
			$.post("/user/delete.do", {
				id : selectIds.toString()
			}, function(data) {
				if (data) {
					if (data.code == 0) {
						bootbox.alert("删除成功！", function() {
							if($("#tbList tr:gt(0)").length>1){
								queryUser($("#paging").pagination('getCurrentPage'));
							}else{
								queryUser(1);
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
function auditUser() {
	var selectIds = getSelectIds("tbList");
	if (selectIds.length < 1) {
		bootbox.alert("请选择需要审核的用户！");
		return false;
	}
	bootbox.confirm("确定开通所选用户吗？", function(res) {
		if (res) {
			$.post("/user/audit.do", {
				id : selectIds.toString()
			}, function(data) {
				if (data) {
					if (data.code == 0) {
						bootbox.alert("审核成功！", function() {
							queryUser($("#paging").pagination('getCurrentPage'));
						});
					} else if (data.msg && data.msg != "") {
						bootbox.alert(data.msg);
						return false;
					} else {
						bootbox.alert("审核失败！");
						return false;
					}
				} else {
					bootbox.alert("审核失败！");
				}
			});
		}
	});
	return false;
}
function cancelUser() {
	var selectIds = getSelectIds("tbList");
	if (selectIds.length < 1) {
		bootbox.alert("请选择需要注销的用户！");
		return false;
	}
	bootbox.confirm("确定注销所选用户吗？", function(res) {
		if (res) {
			$.post("/user/cancel.do", {
				id : selectIds.toString()
			}, function(data) {
				if (data) {
					if (data.code == 0) {
						bootbox.alert("注销成功！", function() {
							queryUser($("#paging").pagination('getCurrentPage'));
						});
					} else if (data.msg && data.msg != "") {
						bootbox.alert(data.msg);
						return false;
					} else {
						bootbox.alert("注销失败！");
						return false;
					}
				} else {
					bootbox.alert("注销失败！");
				}
			});
		}
	});
	return false;
}
function modifyPassword(userId) {
	$("#mdpUserId").val(userId);
	$('#mdpModal').modal("show");
}