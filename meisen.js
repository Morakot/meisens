function debug(msg){
	$("#debug").text(msg);
}

$(function($) {
	// 轮播
	setTimeout(function() {
		var widthPercent = Math.floor($("#progress").width() / $(document.body).width() * 100);
		$("#progress").css("width", Math.round(widthPercent + 1.5) % 100 + "%");
		setTimeout(arguments.callee, 100);
	},
	100);

	// 文档滚动
	$(window).scroll(function() {
		var docTop = $(document).scrollTop();
		
		// 固定导航条
		if (docTop > $("#header").height()) {
			$("#nav").css("position", "fixed");
			$("#nav").css("top", "0");
		} else {
			$("#nav").css("position", "static");
		}
		
		// 高亮链接
		var nearest = null;
		$(".topic").each(function(index, element) {
			$("#nav a[scrollto='#" + $(element).attr("id") + "']").css("background", "");
			if (docTop >= $(element).offset().top - $("#nav").height()) {
				// debug(docTop + "#" + ($(element).offset().top - $("#nav").height()));
				if (!nearest || $(element).offset().top >= nearest.offset().top) {
					nearest = $(element);
				}
			}
		});

		if (nearest) {
			$("#nav a[scrollto='#" + nearest.attr("id") + "']").css("background", "#6b6b6b");
		}
	});

});

// 锚点跳转
function scrollTo(anchor) {
	var targetScrollTop = $($(anchor).attr("scrollto")).offset().top - $("#nav").height();
	if ($("#nav").css("position") != "fixed") {
		targetScrollTop -= $("#nav").height();
	}
	$("html,body").animate({
		scrollTop: targetScrollTop + 1
	},
	"slow");
}