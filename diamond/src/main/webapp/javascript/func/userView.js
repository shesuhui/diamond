function auditUser(userId) {
	bootbox.confirm("确定开通该用户吗？", function(res) {
		if (res) {
			$.post("/user/audit.do", {
				id :userId
			}, function(data) {
				if (data) {
					if (data.code == 0) {
						bootbox.alert("审核成功！", function() {
							window.location.reload(true);
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
function cancelUser(userId) { 
	bootbox.confirm("确定注销该用户吗？", function(res) {
		if (res) {
			$.post("/user/cancel.do", {
				id : userId
			}, function(data) {
				if (data) {
					if (data.code == 0) {
						bootbox.alert("注销成功！", function() {
							window.location.reload(true);
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