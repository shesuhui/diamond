$(function() {
	
	var userFormValidatorOptions = {
		message : '您的输入有误',
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : { 
			name : {
				validators : {
					notEmpty : {
						message : '请输入别名'
					},
					stringLength : {
						min : 3,
						max : 20,
						message : '别名长度为3-20'
					}
				}
			},
			loginId : {
				validators : {
					notEmpty : {
						message : '请输入登录名'
					},
					stringLength : {
						min : 6,
						max : 20,
						message : '登录名长度为6-20'
					},
					regexp : {
						regexp : /^[a-zA-Z_]+[a-zA-Z0-9]+$/,
						message : '登录名以数字、字母、下划线组成，且不能以数字开头'
					},
					remote : {
						message : '该登录名已存在',
						url : '/system/checkRegisterLoginIdDuplicate.do',
						data : function(validator) {
							return {
								loginId : validator.getFieldElements('loginId')
										.val()
							};
						}
					}
				}
			},
			password : {
				validators : {
					notEmpty : {
						message : '请输入密码'
					},
					stringLength : {
						min : 6,
						max : 25,
						message : '密码长度为6-25'
					},
					different : {
						field : 'loginId',
						message : '密码不能和登录名称相同'
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
							return value == $("#password").val();
						}
					}
				}
			},
			businessLicense : {
				validators : {
					notEmpty : {
						message : '请输入公司名称'
					},
					stringLength : {
						min : 6,
						max : 50,
						message : '公司名称长度为6-50'
					},
				}
			},
			email : {
				validators : {
					notEmpty : {
						message : '请输入邮箱'
					},
					emailAddress : {
						message : '邮箱输入错误'
					}
				}
			},
			address : {
				validators : {
					notEmpty : {
						message : '请输入地址'
					},
					stringLength : {
						min : 10,
						max : 100,
						message : '地址长度为10-100'
					}
				}
			},
			fax : {
				validators : {
					notEmpty : {
						message : '请输入传真'
					},
					stringLength : {
						min : 6,
						max : 20,
						message : '传真长度为6-20'
					}
				}
			},
			mobile : {
				validators : {
					notEmpty : {
						message : '请输入手机号码'
					},
					stringLength : {
						min : 11,
						max : 11,
						message : '手机号码长度为11'
					},
					regexp : {
						regexp : /^1[34578]\d{9}$/,
						message : '手机号码错误'
					}
				}
			}
		}
	};
	$('#registerForm').bootstrapValidator(userFormValidatorOptions).on(
			'success.form.bv',
			function(e) {
				e.preventDefault();
				var pwd = $("#password").val();
				var confirmPwd = $("#confirmPassword").val();
				if (pwd != confirmPwd) {
					$("#registerResult").text("两次密码输入不一致！");
					$("#alertRegisterResult").show();
					return false;
				}
				// 保存
				$.post("/system/register.do", $('#registerForm')
						.serializeArray(), function(data) {
					if (data) {
						if (data.code == 0) {
							 $('#registerForm')[0].reset();
							 $("#registerResult").html("注册成功！请及时与客服联系开通此帐号。现在你可以 <a href='/index.jsp' class='alert-link'>登录</a>了");
							 $("#alertRegisterResult").show();
//							bootbox.alert({
//								closeButton : false,
//								message : "恭喜你 注册成功！现在你可以登录了",
//								buttons : {
//									ok : {
//										label : "好的",
//										className : "btn-primary btn-block",
//										callback : function() { 
//										}
//									}
//								}
//							});
						} else if (data.msg && data.msg != "") {
							$("#registerResult").text(data.msg);
							$("#alertRegisterResult").show();
						} else {
							$("#registerResult").text("注册失败！");
							$("#alertRegisterResult").show();
						}
					} else {
						$("#registerResult").text("注册失败！");
						$("#alertRegisterResult").show();
					}
				});
			});
	$("#btnCloseAlert").click(function() {
		$(this).parent().hide();
	});
});
