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

// 分享页面用户反馈
function clientFeedBack() {
	var elem = $('#slide-feedback');
	if(!elem.length) return;
	var pre = elem.find('.pre'),
		next = elem.find('.next'),
		moveElem = elem.find('ul'),
		lis = elem.find('li'),
		ulContent = moveElem.html(),
		count = 0,
		len = lis.length,
		interval = 3000,
		w = lis.outerWidth(true),
		defaultLeft = -len * w,
		setInterval_elem, dis;

	// 初始化设置ul内容复制等
	_init();
	setInterval_elem = setInterval(_move, 3000)

	// 绑定事件
	next.click(function(){
		if(moveElem.is(':animated')) return;
		_move();
	});
	pre.click(function(){
		if(moveElem.is(':animated')) return;
		count = count -2;
		_move();
	});
	elem.hover(function(e){
		setInterval_elem && clearInterval(setInterval_elem);
		if(e.type == 'mouseleave') {
			setInterval_elem = setInterval(_move, interval);
		}
	})

	// 事件函数
	function _move(){
		 ++count;
		if(count < 0){
			moveElem.css('margin-left', 2*defaultLeft);
			count = len - 1;
		} else if(count > len) {
			count = 1;
			moveElem.css('margin-left', defaultLeft);
		};

		dis = defaultLeft - count*w;
		moveElem.animate({marginLeft: dis});
	};
	function _init() {
		moveElem.css('margin-left', defaultLeft).html(ulContent + ulContent + ulContent);
	}
}

// 模拟select
function selectMod() {
	var elem = $('.nr-select .cell');
	if(!elem.length) return;
	elem.each(function(){
		var self = $(this),
			handle = self.find('.val'),
			handlCon = handle.find('span'),
			list = self.find('.list'),
			lis = list.find('li');
		handle.click(function(){
			list.toggle();
		});
		lis.click(function(){
			handlCon.text($(this).text());
			list.hide();
		});
	})
}




$(function(){
	faqSlide();
	selectMod();
	clientFeedBack();
})