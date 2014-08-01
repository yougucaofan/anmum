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
				h = dd.data('height') || _getHeight(dd);
				dd.animate({'height': h},_changeClass);
			}
			function _changeClass(){
				dl.toggleClass(changeClass);
			};
		});
		function _getHeight(elem){
			var h;
			elem.css('height','auto');
			h = elem.height();
			elem.css('height','');
			elem.data('height', h);
			return h;
		}
	})
}

// 分享页面用户反馈
function clientFeedBack() {
	var elem = $('.slide-feedback');
	if(!elem.length) return;
	elem.each(function(){
		var self = $(this),
			pre = self.find('.pre'),
			next = self.find('.next'),
			moveElem = self.find('ul'),
			lis = self.find('li'),
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
		self.hover(function(e){
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
	});
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
			lis = list.find('li'),
			place = handlCon.attr('placeholder'),
			txt;
		handle.click(function(){
			list.toggle();
		});
		lis.click(function(){
			txt = $(this).text();
			handlCon.text(txt);
			if(place) {
				if(place == txt){
					handle.addClass('default');
				} else {
					handle.removeClass('default');
				};
				handle.removeClass('error');
			}
			list.hide();
		});
	})
}

// tab切换
function tabChange() {
	var elem = $('.TabNav');
	if(!elem.length) return;
	elem.each(function(){
		var self = $(this),
			tab = self.closest('.Tab'),
			wrap = tab.size() ? tab : $('body'),
			navs = self.find('li'),
			panels = wrap.find('.TabPanel');

		// 去掉click时a的跳转事件
		navs.click(function(){
			var my = $(this), count;
			if(!my.hasClass('active')){
				count = my.index();
				my.addClass('active').siblings().removeClass('active');
				panels.hide().eq(count).show();
			};
			return false;
		});
	})
}

// 验证表单
function formValidate() {
	var elem = $('#formValidate');
	if(!elem.length) return;
	var inputs = elem.find(':input'),
		feignSelects = elem.find('.sex .val'),
		btn = elem.find('.btn input'),
		all = elem.find('[placeholder]'),
		tel = elem.find('.tel input'),
		reg = /^(13[\d]{9}|15[\d]{9}|18[\d]{9})$/,
		txt;

	// 点提交时
	btn.click(function(){
		var state = true;
		all.each(function(){
			var self = $(this),
				txt = self.val() || self.text(),
				placeVale = self.attr('placeholder');

			if(!txt || txt == placeVale) {
				if(self[0].nodeName == 'SPAN') {
					self.parent().addClass('error');
					self.text('选择内容');
				} else {
					self.addClass('error');
					self.val('请填写内容');
				};
				state = false;
			};
			if(self[0] == tel[0] && !reg.test(txt)) {
				state = false;
				self.val('请正确填写手机号');
				self.addClass('error');
			}
		});
		// 这里如果state为true则说明全都通过验证，可以提交
	});

	// 为支持placeholder 添加click时删除.error 和清空内容
	if('placeholder' in document.createElement('input')) {
		inputs.click(function(){
			var self = $(this);
			if(self.hasClass('error')) {
				self.removeClass('error');
				self.val('');
			};
		});

	// 不支持的用js实现全部
	} else {
		inputs.each(function(){
			var self = $(this),
				placeholder = self.attr('placeholder');

			if(placeholder) {
				self.val(placeholder).addClass('empty');
			};
			self.click(function(){
				var worth = self.val();
				if(worth == placeholder || self.hasClass('error')) {
					self.val('').removeClass('empty error');
				}
			}).blur(function(){
				var worth = self.val();
				if(self.val() == placeholder || !worth) {
					self.val(placeholder).addClass('empty');
				}
			})
		});
	}
}


$(function(){
	tabChange();
	faqSlide();
	selectMod();
	clientFeedBack();
	formValidate();
})