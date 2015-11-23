$.ajaxSetup({
	// cache:false, TODO modal缓存
	contentType : "application/x-www-form-urlencoded;charset=utf-8",
	complete : function(XMLHttpRequest, textStatus) {
		if (!XMLHttpRequest.getResponseHeader) {
			return;
		}
		var sessionstatus = XMLHttpRequest.getResponseHeader("sessionstatus");
		// 通过XMLHttpRequest取得响应头，sessionstatus
		if (sessionstatus == "sessionOut") {
			bootbox.alert("您的登录已过期，请重新登录！");
			window.location.replace("/index.jsp");
			return;
		} else if (sessionstatus == "invalidRequest") {
			bootbox.alert("非法请求！");
			return;
		}
	}
});
Date.prototype.toYYYY_MM_DD = function() {
	var month = (parseInt(this.getMonth()) + 1) < 10 ? ("0" + (parseInt(this
			.getMonth()) + 1)) : (parseInt(this.getMonth()) + 1);
	var day = this.getDate() < 10 ? ("0" + this.getDate()) : this.getDate();
	return this.getFullYear() + "-" + month + "-" + day;
};
Date.prototype.Format = function(fmt) {
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()
	// 毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
};
function resetLogin() {
	$("#loginId").val("");
	$("#password").val("");
}
var LoadListTable = function(url, params, pagingId, tableId, page_index,
		buildTableFunc) {
	var progressModal = $("#progressModal");
	if (progressModal) {
		progressModal.modal("show");
	}

	var pagingObj = $('#' + pagingId);

	// could fix
	pagingObj.pagination('destroy');

	var currentPage = page_index < 1 ? 1 : page_index;
	var pageSize = 20;
	if (!params) {
		params = {};
	}
	params.currentPage = currentPage;
	if(!params.pageSize){
		params.pageSize = pageSize;
	}
	
	$.post(
					url,
					params,
					function(data, status) {
						if (progressModal) {
							progressModal.modal("hide");
						}
						if (!data) {
							return false;
						}
						if (data.code == 0) {
							$("#" + tableId + " tr:not(:first)").remove();
							if (data.result && data.result.dataList) {
								var dataList = data.result.dataList;
								if (dataList.length > 0) {
									for ( var i = 0; i < dataList.length; i++) {
										$('#' + tableId).append(
												buildTableFunc(dataList[i]));
									}
									var page = data.result.pageBean;
									pagingObj
											.pagination({
												items : page.totalCount,
												itemsOnPage : page.pageSize,
												currentPage : page.currentPage,
												onInit : function() {
												},
												onPageClick : function() {
													LoadListTable(
															url,
															params,
															pagingId,
															tableId,
															pagingObj
																	.pagination('getCurrentPage'),
															buildTableFunc);
												}
											});
								} else {// 没有记录
									var colspan = $("#" + tableId + " tr:first")
											.children().length;
									var emptyTr = "<tr class=warning><td  align='center' colspan="
											+ colspan + ">没有记录</td></tr>";
									$('#' + tableId).append(emptyTr);
								}
							} else {
								// 没有记录
								var colspan = $("#" + tableId + " tr:first")
										.children().length;
								var emptyTr = "<tr  class=warning><td align='center' colspan="
										+ colspan + ">没有记录</td></tr>";
								$('#' + tableId).append(emptyTr);
							}
						} else if (data.msg && data.msg != '') {
							bootbox.alert(data.msg);
						}
					});
};
function activeTab(currentTabId) {
	var items = $("ul#menuUl >li");
	if (items) {
		items.each(function(i) {
			var t = $(this);
			if (t.attr("id") == currentTabId) {
				t.toggleClass("active");
			} else {
				t.removeClass("active");
			}
		});
	}
}
function selectAll(chkName, checkbox) {
	$("input[name='" + chkName + "']").each(function() {
		this.checked = checkbox.checked;
	});
}
function selectCurrentTr(tr) {
	var obj = $(tr).find("input[type='checkbox']").prop("checked", true);
}
function getSelectIds(tbId) {
	var selectIds = [];
	$("#" + tbId + " tr:gt(0)").each(function(i) {
		var chk = $(this).find("input[type='checkbox']");
		if (chk.prop("checked")) {
			selectIds.push(chk.val());
		}
	});
	return selectIds;
}
function logout() {
	$.post("/system/checkBeforeLogout.do", {}, function(data, status) {
		if (data && data.code == 0 && data.result && data.result == 1) {
			bootbox.confirm(("您的购物车中有订单未提交，是否确定退出？"), function(res) {
				if (res) {
					window.location.href = "/system/logout.do";
				}
			});
		} else {
			window.location.href = "/system/logout.do";
		}
	});

}
function clearVal(id) {
	$("#" + id).val("");
}
function register() {
	$('#regLink').click();
}
function showImg(sUrl) {
	if (!sUrl) {
		return false;
	} 
	if(sUrl=='null'||sUrl==""){
		return false;
	}
	$("#hoverImg").attr("src", sUrl);
	var x, y;
	x = event.clientX;
	y = event.clientY;
	var imgDiv = $("#hoverImgViewer");
	imgDiv.css({
		left : x,
		top : y
	});
	imgDiv.show();
}
function hiddenImg() {
	var imgDiv = $("#hoverImgViewer");
	imgDiv.hide();
}
function formSerialToJson(formId) {
	var o = {};
	var a = $("#" + formId).serializeArray();
	$.each(a, function() {
		if (o[this.name] !== undefined) {
//			if (!o[this.name].push) {
//				o[this.name] = [ o[this.name] ];
//			}
//			o[this.name].push(this.value || '');
			o[this.name]=o[this.name]+","+this.value;
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
}
function getCertUrl(lab, cert, weight) {
	var certUrl = "javascript:;";
	if (cert != '') {
		if (lab == 'GIA') {
			// GIA
			certUrl = "http://www.eegem.com/gia?no=" + cert;
		} else if (lab == 'HRD') {
			// HRD
			certUrl = "http://www.eegem.com/hrd/?no=" + cert + "&weight="
					+ weight;
		} else if (lab == 'AGS') {
			// AGS
			certUrl = "http://www.eegem.com/ags/?no=" + cert + "&weight="
					+ weight;
		} else if (lab == 'IGI') {
			// IGI
			certUrl = "http://www.eegem.com/igi/?no=" + cert;
		} else {
			certUrl = "http://www.eegem.com/";
		}
	}
	return certUrl;
}
function viewCert(lab, cert, weight) {
	window.open(getCertUrl(lab, cert, weight));
}
function selectCheckbox(id){
	var con = $("#"+id);
	if(con.prop("checked")==false){
		con.prop("checked", true);
	}else{
		con.prop("checked", false);
	} 
}
function viewRemark(id){
	var remarkTr=$("#remark" + id); 
//	if(remarkTr.css('display')=='none'){
//		remarkTr.css("display","table-row");
//	}else{
//		remarkTr.css("display","none");
//	} 
	if (remarkTr.hasClass("hide")) {
			remarkTr.removeClass("hide");
	}else{
			remarkTr.addClass("hide");
	}
//	var remarkTr = document.getElementById("remark"+id);
//	if(remarkTr.style.display=='none'){
//		remarkTr.style.display='table-row';
//		remarkTr.hidden=false;
//	}else{
//		remarkTr.style.display="none";
//		remarkTr.hidden=true;
//	} 
}