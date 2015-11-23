$(function() {
	var modifyPwdFormValidatorOptions = {
		message : '您的输入有误',
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			originPwd : {
				validators : {
					notEmpty : {
						message : '请输入原密码'
					},
					remote : {
						message : '原密码错误',
						url : '/user/checkPassword.do',
						data : function(validator) {
							return {
								password : validator.getFieldElements(
										'originPwd').val()
							};
						}
					}
				}
			},
			newPassword : {
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
						message : '新密码名以数字、字母、下划线组成'
					},
					callback : {
						message : '新密码不能和登录名相同',
						callback : function(value, validator) {
							return value != $("#loginId").val();
						}
					}
				}
			},
			confirmNewPwd : {
				validators : {
					callback : {
						message : '密码和确认密码不一致',
						callback : function(value, validator) {
							return value == $("#newPassword").val();
						}
					}
				}
			}
		}
	};
	$('#modifyMyPwdForm').bootstrapValidator(modifyPwdFormValidatorOptions).on(
			'success.form.bv', function(e) {
				e.preventDefault();
				var pwd = $("#newPassword").val();
				var confirmPwd = $("#confirmNewPwd").val();
				if (pwd != confirmPwd) {
					$("#mdMyPwdResult").text("两次密码输入不一致！");
					$("#alertMdMyPwdResult").show();
					return false;
				}
				// 保存
				$.post("/user/modifyMyPwd.do", {
					password : pwd
				}, function(data) {
					if (data) {
						if (data.code == 0) {
							$('#modifyMyPwdForm')[0].reset();
							$("#mdMyPwdResult").text("修改成功！");
							$("#alertMdMyPwdResult").show();
						} else if (data.msg && data.msg != "") {
							$("#mdMyPwdResult").text(data.msg);
							$("#alertMdMyPwdResult").show();
						} else {
							$("#mdMyPwdResult").text("修改失败！");
							$("#alertMdMyPwdResult").show();
						}
					} else {
						$("#mdMyPwdResult").text("修改失败！");
						$("#alertMdMyPwdResult").show();
					}
				});
			});
	$("#btnCloseAlert").click(function() {
		$(this).parent().hide();
	});
});
