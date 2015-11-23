$(function() {
	
	var editSelfFormValidatorOptions = {
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
	$('#editSelfForm').bootstrapValidator(editSelfFormValidatorOptions).on(
			'success.form.bv',
			function(e) {
				e.preventDefault(); 
				// 保存
				$.post("/user/updateSelf.do", $('#editSelfForm')
						.serializeArray(), function(data) {
					if (data) {
						if (data.code == 0) { 
							 $("#editSelfResult").html("保存成功！");
							 $("#alertEditSelfResult").show();
						} else if (data.msg && data.msg != "") {
							$("#editSelfResult").text(data.msg);
							$("#alertEditSelfResult").show();
						} else {
							$("#editSelfResult").text("保存失败！");
							$("#alertEditSelfResult").show();
						}
					} else {
						$("#editSelfResult").text("保存失败！");
						$("#alertEditSelfResult").show();
					}
				});
			});
	$("#btnCloseAlert").click(function() {
		$(this).parent().hide();
	});
});
function selectUserType(v) {
	if (v == 3 || v == 4) {
		$("#addressType").html("办公");
	} else {
		$("#addressType").html("收货");
	}
}
