$(function() {
	    $("#iptLoginId").focus();
		$('#btnLogin').on('click', function() {
			var loginId = $("#iptLoginId").val();
			var password = $("#iptPassword").val();
			if ($.trim(loginId).length < 1) {
				bootbox.alert("请输入用户名!");
				$("#iptLoginId")[0].focus();
				return false;
			}
			if ($.trim(password).length < 1) {
				bootbox.alert("请输入密码!");
				$("#iptPassword")[0].focus();
				return false;
			}
		
			var $btn = $(this).button('loading');
			$.post(ROOTPATH + "/login/login.html", {
				loginId : loginId,
				password : password
			}, function(data, status) {
				if (data.code == 0) {
					if (data.result&&data.result.goUrl && data.result.goUrl != '') {
						window.location.href = ROOTPATH+data.result.goUrl;
					} else {
						window.location.href = ROOTPATH + "/main.jsp";
					}
				} else if (data.msg && data.msg != '') {
					bootbox.alert(data.msg);
				} else {
					bootbox.alert("登录出错!");
				}
				if(status!="success"){
					bootbox.alert("登录出错!");
				}
				$btn.button('reset');
				return false;
			});

			return false;
		});
		
	});



