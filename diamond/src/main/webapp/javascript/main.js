$(function(){

 $("#header").load("header.html",function(response,status,xhr){
               $("#header").html(response);
           });
           $(":header").css("color","red");
        
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