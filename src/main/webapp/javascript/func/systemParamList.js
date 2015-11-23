$(function() {
	activeTab("menuSystemParam");
	LoadListTable("/systemParam/query.do", {}, 'paging', 'tbList', 1,
			buildTbData);
	$("#btnQuerySystemParam").click(function() {
		querySystemParam(1);
	});

	$("#btnCloseEditSystemParamResult").click(function() {
		$(this).parent().hide();
		$("#alertEditSystemParamResult").hide();
	});

	var systemParamFormValidatorOptions = {
		message : '您的输入有误',
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			val : {
				validators : {
					notEmpty : {
						message : '请输入新值'
					},
					stringLength : { 
						max : 50,
						message : '最大长度为50'
					}
				}
			}
		}
	};
	$('#systemParamForm').bootstrapValidator(systemParamFormValidatorOptions)
			.on(
					'success.form.bv',
					function(e) {
						e.preventDefault();
						var valCheck=$("#valCheck").val();
					//	valCheck=/^[0-9]+([.]{1}[0-9]{1,4})?$/;
						if(valCheck&&valCheck!=""){
							valCheck=new RegExp(valCheck);
							if(!valCheck.test($("#val").val())){
								$("#editSystemParamResult").text("值格式错误");
								$("#alertEditSystemParamResult").show();
								return false;
							}
						}
						// 保存
						$.post("/systemParam/update.do", $('#systemParamForm')
								.serializeArray(), function(data) {
							if (data) {
								if (data.code == 0) {
									$("#editSystemParamResult").text("保存成功！");
									$("#alertEditSystemParamResult").show();
									querySystemParam($("#paging").pagination(
											'getCurrentPage'));
									// 修改 成功后关闭窗口
									setTimeout(function() {
										$("#btnCloseEditModal").click();
									}, 1000);

								} else if (data.msg && data.msg != "") {
									$("#editSystemParamResult").text(data.msg);
									$("#alertEditSystemParamResult").show();
								} else {
									$("#editSupplierResult").text("保存失败！");
									$("#alertEditSystemParamResult").show();
								}
							} else {
								$("#editSupplierResult").text("保存失败！");
								$("#alertEditSystemParamResult").show();
							}
						});
					});

	$('#editSystemParamModal').on('hide.bs.modal', function(e) {
		// 隐藏编辑框时关闭提示
		$("#alertEditSystemParamResult").hide();
		$('#systemParamForm').data('bootstrapValidator').resetForm(true);
	});

	$("#editSystemParamModal").on("hidden.bs.modal", function() {
		$(this).removeData("bs.modal");
	});

});
function querySystemParam(pageIndex) {
	// 查询
	var queryParam = {
		num : $("#num").val(),
		name : $("#name").val()
	};
	LoadListTable("/systemParam/query.do", queryParam, 'paging', 'tbList',
			pageIndex, buildTbData);
}
function buildTbData(rowData) {
	var r = "<tr><td>" + rowData.num + "</td>";
	r += "<td>" + rowData.name + "</td><td>" + rowData.val + "</td><td>"
			+ "<a href='javascript:;' onclick='editSystemParam(" + rowData.id
			+ ")'>修改</a></td>";
	r += "</tr>";
	return r;
}
function editSystemParam(id) {
	$.get("/systemParam/edit.do?id=" + id, {}, function(data) {
		if (data&&data.code==0) {
			$("#oldVal").text(data.result.val);
			$("#id").val(data.result.id);
			$("#valCheck").val(data.result.valCheck);
			$('#editSystemParamModal').modal("show");
		}
	}); 
}