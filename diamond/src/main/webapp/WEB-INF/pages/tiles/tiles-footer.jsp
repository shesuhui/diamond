<%@ page language="java" pageEncoding="utf-8"%>
<%--<div style="height:500px;"></div>--%>
<div class="footer">
	<div class="container-fluid">
		<p class="text-muted">
			CopyRight © 2014-2016 Jumbo Jewelry All Rights Reserved. 
		</p>
	</div>
</div>
<a class="backtop" id="backtop" href="javascript:;"><span></span></a>
<script>
	$(function() {
		$("[data-toggle='tooltip']").tooltip();
		$("[data-toggle='popover']").popover();
		$(window).scroll(
				function() {
					var scrollt = document.documentElement.scrollTop
							+ document.body.scrollTop; //获取滚动后的高度 
					if (scrollt > 200) { //判断滚动后高度超过200px,就显示  
					$("#backtop").fadeIn(400); //淡出     
					//	$("#backtop").show();
					} else {
						$("#backtop").stop().fadeOut(400); //如果返回或者没有超过,就淡入.必须加上stop()停止之前动画,否则会出现闪动   
					}
				});

		$("#backtop").click(function() { //当点击标签的时候,使用animate在200毫秒的时间内,滚到顶部
			$("html,body").animate({
				scrollTop : "0px"
			}, 200);
		});
	});
</script>
