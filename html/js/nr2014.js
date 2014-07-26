// 问答式手风琴
function faqSlide(){
	var elem = $('.nr-faqlist');
	if(!elem.length) return;
	elem.each(function(){
		var self = $(this),
			handle = self.find('dt'),
			changeClass = 'active',
			dd, dl, h;
		handle.click(function(){
			var my = $(this);
			dd = my.next();
			if(dd.is(':animated')) return;
			dl = my.closest('dl');

			if (dl.hasClass(changeClass)){
				dd.animate({'height': 0},_changeClass);
			} else {
				dd.animate({'height': dd.data('h')},_changeClass);
			}
			function _changeClass(){
				dl.toggleClass(changeClass);
			};
		});
		// 获取各dd高;
		_init();
		function _init(){
			self.find('dd').each(function(i){
				var my = $(this);
				my.css('height','auto');
				my.data('h', my.height());
				my.css('height', '');				
			})
		};
	})
}




$(function(){
	faqSlide();
})