$(function() {
	activeTab("menuSearchGoods");
	LoadListTable("/buyer/search.do", {
		pageSize : 50
	}, 'paging', 'tbList', 1, buildTbData);
	$("#btnReset").click(function() {
		$("#searchPanel a").each(function(i) {
			if ($(this).hasClass("on")) {
				$(this).removeClass("on");
			}
		});
		$('#queryGoodsForm')[0].reset();
		$('#queryGoodsForm').data('bootstrapValidator').resetForm(true);
	});

	var queryGoodsFormValidatorOptions = {
		message : '您的输入有误',
		feedbackIcons : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			minQueryWeight : {
				validators : {
					between : {
						min : 0,
						max : 9999,
						message : '请输入0~9999'
					}
				}
			},
			maxQueryWeight : {
				validators : {
					between : {
						min : 0,
						max : 9999,
						message : '请输入0~9999'
					},
					callback : {
						message : '不能小于最小查询重量',
						callback : function(value, validator) {
							return !value
									|| value == ""
									|| value >= validator.getFieldElements(
											'minQueryWeight').val();
						}
					}
				}
			}
		}
	};
	$('#queryGoodsForm').bootstrapValidator(queryGoodsFormValidatorOptions).on(
			'success.form.bv', function(e) {
				e.preventDefault();
				// 查询
				//$("#sortByWeight").val("0"); // 取消排序
				//$("#sortByWeightIcon").removeClass();
				//$("#sortByWeightIcon").addClass("glyphicon glyphicon-sort");
				$("#btnQueryDiamond").removeAttr("disabled");
				queryDiamond();
			});
	$("#searchPanel a").hover(function() {
		$(this).addClass('hvr');
	}, function() {
		$(this).removeClass('hvr');
	});
	$("#searchPanel a").click(function() {
		if ($(this).hasClass("on")) {
			$(this).removeClass("on");
		} else {
			$(this).addClass('on');
		}
	});
});

function sortByWeight() {
	//先取消其他两种排序  
//	$("#sortByDiscount").val(0);
//	document.getElementById("sortByDiscountIcon").className="glyphicon glyphicon-sort";
	
//	$("#sortByAmount").val(0);
//	document.getElementById("sortByAmountIcon").className="glyphicon glyphicon-sort";
	$("#sortFirst").val("weight");
	var sortByWeight = $("#sortByWeight");
	if (sortByWeight.val() == '0' || sortByWeight.val() == "2") {
		sortByWeight.val("1");// 升序
//		$("#sortByWeightIcon").removeClass("glyphicon-arrow-down glyphicon-sort");
//		$("#sortByWeightIcon").addClass("glyphicon-arrow-up");
		document.getElementById("sortByWeightIcon").className="glyphicon glyphicon-arrow-up";
	} else if (sortByWeight.val() == "1") {
		sortByWeight.val("2");// 降序
//		$("#sortByWeightIcon").removeClass("glyphicon-arrow-up glyphicon-sort");
//		$("#sortByWeightIcon").addClass("glyphicon-arrow-down");
		document.getElementById("sortByWeightIcon").className="glyphicon glyphicon-arrow-down";
	}
	queryDiamond();
}
function sortByDiscount() {
	//先取消其他两种排序  
	//$("#sortByWeight").val(0);
	//document.getElementById("sortByWeightIcon").className="glyphicon glyphicon-sort";
	
	//$("#sortByAmount").val(0);
	//document.getElementById("sortByAmountIcon").className="glyphicon glyphicon-sort";
	$("#sortFirst").val("discount");
	var sortByDiscount = $("#sortByDiscount");
	if (sortByDiscount.val() == '0' || sortByDiscount.val() == "2") {
		sortByDiscount.val("1");// 升序
		document.getElementById("sortByDiscountIcon").className="glyphicon glyphicon-arrow-up";
	} else if (sortByDiscount.val() == "1") {
		sortByDiscount.val("2");// 降序
		document.getElementById("sortByDiscountIcon").className="glyphicon glyphicon-arrow-down";
	}
	queryDiamond();
}
function sortByAmount() {
	//先取消其他两种排序  
//	$("#sortByDiscount").val(0);
//	document.getElementById("sortByDiscountIcon").className="glyphicon glyphicon-sort";
	
//	$("#sortByWeight").val(0);
//	document.getElementById("sortByWeightIcon").className="glyphicon glyphicon-sort";
	$("#sortFirst").val("amount");
	var sortByAmount = $("#sortByAmount");
	if (sortByAmount.val() == '0' || sortByAmount.val() == "2") {
		sortByAmount.val("1");// 升序
		document.getElementById("sortByAmountIcon").className="glyphicon glyphicon-arrow-up";
	} else if (sortByAmount.val() == "1") {
		sortByAmount.val("2");// 降序
		document.getElementById("sortByAmountIcon").className="glyphicon glyphicon-arrow-down";
	}
	queryDiamond();
}

function queryDiamond() {
	// 查询
	var queryParam = formSerialToJson("queryGoodsForm"); 
	LoadListTable("/buyer/search.do", queryParam, 'paging', 'tbList', 1,
			buildTbData);
}
function buildTbData(rowData) {
	var r = "<tr id='tbRow" + rowData.id
			+ "'><td><input type='checkbox' name='id' value=" + rowData.id
			+ "></td>";
	r += "<td><a href='/diamond/viewForBuyer.do?id=" + rowData.id
			+ "' target='_blank' title='点击查看详情'>" + rowData.name
			+ "</a><a href='javascript:;' class='btn btn-xs' title='点击查看备注' onclick='viewRemark("+rowData.id+")'><span class='glyphicon glyphicon glyphicon-list-alt'></span></a></td><td onmouseout='hiddenImg();' onmousemove='showImg(\""
			+ rowData.image
			+ "\")'><a href='javascript:;' style='cursor:default'>"
			+ rowData.shapeCnName + "</a></td><td>" + rowData.weight
			+ "</td><td  class='colortd'>" + rowData.color + "</td><td>"
			+ rowData.clarity+ "</td><td>" + rowData.cut+ "</td><td>"
			+ rowData.polish + "</td><td>" + rowData.symm + "</td><td>"
			+ rowData.fluor + "</td><td>" + rowData.size + "</td><td>"
			+ rowData.taple + "</td><td>" + rowData.depth + "</td><td class='lefttd'>"
			+ rowData.locality + "</td>";
	if(rowData.multicolour==1){
		r+= "<td></td><td></td><td class='righttd'>"+rowData.saleDollarPrice+"</td>";
	}else{
		r+="<td class='righttd'>"+rowData.price + "</td><td>";
		if (rowData.discount != "") {
			r += rowData.discount + "%";
		}
		r+="</td><td class='righttd'>"+rowData.saleDollarPrice+"</td>";
	}

	r += "<td class='righttd'>" + rowData.amount;
	r += "</td><td>" + rowData.authenticator + "</td>";

	var certUrl = getCertUrl(rowData.authenticator, rowData.cert,
			rowData.weight);

	r += " <td  class='certtd'><a href='"
			+ certUrl
			+ "' data-toggle='tooltip' data-placement='bottom' title='点击查看证书' target='_blank'>"
			+ rowData.cert + "</a></td>";  
	r += "<td><div id='putCart"
			+ rowData.id
			+ "' name='putCart' "
			+ (rowData.inCart != 1 ? "" : "class='hide'")
			+ "><a href='javascript:;' class='btn btn-primary btn-xs' onclick=\"buy('"
			+ rowData.id + "','" + rowData.price + "')\">加入购物车</a></div>";
	r += "<span class='glyphicon glyphicon-ok"
			+ (rowData.inCart != 1 ? " hide" : "") + "' name='cartOk' id='cartOk"
			+ rowData.id + "'></span></td></tr>";
	r+="<tr id='remark"+rowData.id+"' class='hide'><td colspan='2'>备注:</td><td colspan='19' class='lefttd'>"+rowData.remark+"</td></tr>";
	return r;
}
function buy(id, price) {
	// 加入购物车
	var url = "/buyer/putCart.do";
	var params = {
		diamondId : id
	};
	$
			.post(
					url,
					params,
					function(data, status) {
						if (data) {
							if (data.code == 0) {
								bootbox.alert("添加成功！");
								$("#putCart" + id).hide();
								$("#cartOk" + id).removeClass("hide");
								// 更新购物车后面数字
								$("#cartCount")
										.html(data.result.cartGoodsCount);
								var cartItemTable = $('#s_cartItemTable');

								// 放入购物车 构造购物车表格内容
								var selectedTr = $("#tbRow" + id);
								var newTr = $("<tr id='s_cartItem" + id
										+ "' name='cardItem" + id + "'></tr>");
								var tdindex = 1;
								var $td, $reallytd;
								for (; tdindex < 14; tdindex++) {
									$td = $("<td></td>");
									$reallytd = selectedTr.children().eq(
											tdindex);
									$td.text($reallytd.text());
									newTr.append($td);
								}
//								$td = $("<td></td>");// 折扣
//								$td.text(selectedTr.children().eq(15).text());
//								newTr.append($td);

								$td = $("<td></td>");// 人民币总价
								$td.text(selectedTr.children().eq(17).text());
								newTr.append($td);

								var optTd = $("<td></td>");
								optTd
										.html("<a role='button' class='btn btn-warning btn-xs'"
												+ " href='javascript:;' onclick=\"removeCartItem('"
												+ id
												+ "','"
												+ price
												+ "')\">"
												+ "<span class='glyphicon glyphicon-remove'></span></a>");
								newTr.append(optTd);

								cartItemTable.append(newTr);

								if (cartItemTable.hasClass("hide")) {
									cartItemTable.removeClass("hide");
								}

								$("#s_spanCartGoodsCount").html(
										data.result.cartGoodsCount);
								$("#s_spanCartAmount").html(
										data.result.cartAmount);
								if ($("#s_cartOptDiv").hasClass("hide")) {
									$("#s_cartOptDiv").removeClass("hide");
								}

								// 隐藏选购提示
								if (!$("#s_cartEmptyTxt").hasClass("hide")) {
									$("#s_cartEmptyTxt").addClass("hide");
								}

								return false;
							} else if (data.msg && data.msg != "") {
								bootbox.alert(data.msg);
								return false;
							} else {
								bootbox.alert("添加失败！");
								return false;
							}
						} else {
							bootbox.alert("添加失败！");
							return false;
						}

					});
}
