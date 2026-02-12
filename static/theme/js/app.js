$(document).ready(function(){
	var affixElement = '.header';
	$(affixElement).affix({
		offset: {
			top: function () {
				return (this.top = $(affixElement).offset().top)
			},
			bottom: function () { 
				return (this.bottom = $('.footer').outerHeight(true))
			}
		}
	});

	$('[data-target="#modal-main"]').click(function(){
		$('.modal_custom').
		removeClass('modal_bg-extra').
		removeClass('modal_custom-policy').
		removeClass('modal_lg').
		addClass('modal_md');
	});
	
	$('.modal-extra').click(function(){
		$('.modal_custom').
		removeClass('modal_custom-policy').
		removeClass('modal_lg').
		addClass('modal_bg-extra').
		addClass('modal_md');
	});
	
	$('.modal-policy').click(function(e){
		e.preventDefault();
		$('.modal_custom').
		removeClass('modal_bg-extra').
		removeClass('modal_md').
		addClass('modal_custom-policy').
		addClass('modal_lg');
	});

	/* go to */
	$('[data-toggle="scroll"]').each(function(){
		$(this).click(function(e){
			e.preventDefault();
			var target = $(this).attr('data-value');
			$('html,body').animate({ scrollTop: $(target).offset().top - 250 }, 800);
			return false;
		});
    });
	
	/* main form */
	$('#main__form').submit(function(e) {
		e.preventDefault();
		var form = $(this);
		var formElement = form[0];
		var formData = new FormData(formElement);
		var captchaContainer = $('#captcha-container', this);
		var captchaError = $('.captcha-error', this);
		var captchaToken = formData.get('smart-token') ? String(formData.get('smart-token')).trim() : '';

		captchaContainer.removeClass('error');
		captchaContainer.css('outline', '');
		captchaError.hide();

		if (!captchaToken) {
			captchaContainer.addClass('error');
			captchaContainer.css('outline', '2px solid #f44336');
			captchaError.text('Подтвердите, что вы не робот').show();
			return false;
		}

		
			$.ajax({
				url: 'post.php',
				type: 'post',
				dataType: 'json',
				data: formData,
				processData: false,
				contentType: false,
				success: function(data){
					if (!data || !data.result) {
						captchaError.text('Произошла ошибка, попробуйте ещё раз').show();
						return false;
					}
					console.log(data.result);
					if (data.result == 'success') {
						$(form)[0].reset();
						$(form).find('.form__item').removeClass('active');
						$(form).find('.required').parent().removeClass('form__item_error');

					$(form).find('.show-message').trigger('click');
					$('#modal-success').removeClass('modal_error').addClass('modal_success');
                    var zakaz = yaCounter56452630.reachGoal('ZAKAZ');
                   console.log("Форма отправлена", zakaz)
				}
				if (data.result == 'error') {
					if (data.message && data.message.toLowerCase().indexOf('captcha') !== -1) {
						captchaContainer.addClass('error');
						captchaContainer.css('outline', '2px solid #f44336');
						captchaError.text('Капча не пройдена, попробуйте ещё раз').show();
						return false;
					}
					$(form).find('.required').each(function() {
						var input__required = $(this);
						
						if ($(input__required).val() == '') {
							$(input__required).parent().addClass('form__item_error');
						} else {
							$(input__required).parent().removeClass('form__item_error');
						}
						});
						return false;
					}
				},
				error: function(xhr){
					var message = '';
					if (xhr.responseJSON && xhr.responseJSON.message) {
						message = xhr.responseJSON.message;
					} else if (xhr.responseText) {
						try {
							var parsed = JSON.parse(xhr.responseText);
							message = parsed && parsed.message ? parsed.message : '';
						} catch (e) {
							message = '';
						}
					}

					if (xhr.status === 403 || (message && message.toLowerCase().indexOf('captcha') !== -1)) {
						captchaContainer.addClass('error');
						captchaContainer.css('outline', '2px solid #f44336');
						captchaError.text('Капча не пройдена, попробуйте ещё раз').show();
						return false;
					}

					captchaError.text('Произошла ошибка, попробуйте ещё раз').show();
					return false;
				}
			});
		});
	
	/* labels */
	[].slice.call( document.querySelectorAll('.form__item-field')).forEach(function(inputEl) {
		if( inputEl.value.trim() !== '' ) {
			classie.add( inputEl.parentNode, 'active');
		}

		inputEl.addEventListener('focus',onInputFocus);
		inputEl.addEventListener('blur',onInputBlur);
	});

	function onInputFocus(ev) {
		classie.add(ev.target.parentNode, 'active');
	}

	function onInputBlur( ev ) {
		if( ev.target.value.trim() === '' ) {
			classie.remove(ev.target.parentNode,'active');
		}
	};

	/* form */
	$('[data-toggle="modal"]').each(function(){
		$(this).click(function(){
			var target = $(this).attr('data-target');
			var block = $(this).attr('data-block');
			var btn = $(this).attr('data-btn');
			
			$(target).find('.form-block').val(block);
			$(target).find('.form-btn').val(btn);
		});
	});

	/* show-block */
	$('.show-block').each(function(){
		$(this).click(function(e){
			e.preventDefault()
			var target = $(this).attr('data-value');
			$('.'+ target).parent().addClass('active');
		});
	});

	$('.hide-block').each(function(){
		$(this).click(function(){
			$(this).parent().removeClass('active');
		});
	});

	/* card */
	$('.card').each(function(){
		$(this).click(function(){
			$(this).toggleClass('active');
			$(this).parent().siblings().find('.card').removeClass('active');
		});
	});

	/* feature */
	$('.feature').each(function(){
		$(this).click(function(){
			$(this).toggleClass('active');
			$(this).parent().siblings().find('.feature').removeClass('active');
		});
	});

	/* projects__item */
	$('.projects__item').each(function(){
		$(this).click(function(){
			$(this).toggleClass('active');
			$(this).siblings().removeClass('active');
		});
	});

	$('.projects__item-picture').each(function(){
		var picture = $(this).find('img')[0].src;
		$(this).css('background-image','url(' + picture + ')');
	});

	/* select */
	$('.form__item-select').each(function(){
		$(this).dropdown();
	});
	
	/* mask */
	$('[data-value="x00-input"]').each(function(){
		// $(this).mask('9?99');
	});
	
	/* calculate */
	$('.form__item_var').each(function() {
		$(this).keyup(function() {
			this.value = this.value.replace(/[^0-9\.,]/g, '');
			this.value = this.value.replace(/[,]/, '.');
		});

		$(this).keyup(function() {
			calculate();
		});
	});

	function calculate() {
		$('#main__form').each(function(key, val){
			calcInputs = {};
			$(this).find('input').each(function(key, val){
				name = $(this).attr('name');
				val = $(this).val();
				if (!$.isNumeric(val)) {
					switch (name) {
						case 'main__form_width':
							val = '';
							break;
						case 'main__form_length':
							val = '';
							break;
						case 'main__form_square':
							val = '';
							break;
						default:
							break;
					}
					$(this).val(val);
				}
				calcInputs[name] = val;
			});

			total = 0;
			total = calcInputs.main__form_width * calcInputs.main__form_length;
			
			$(this).find('.form__item_result').val(total);
			$(this).find('.form__item_result').next('.form__item-title').hide();
		});
	}

	/* viewportchecker */
	$('.section__title_magic').viewportChecker({
		classToAdd: 'bounceInLeft',
		classToAddForFullView: 'opacity-1',
		classToRemove: 'opacity-0',
		offset: 50,
		invertBottomOffset: true
	});

	$('.example__item_magic').viewportChecker({
		classToAdd: 'bounceInDown',
		classToAddForFullView: 'opacity-1',
		classToRemove: 'opacity-0',
		offset: 15,
		invertBottomOffset: true
	});

	$('.content__list_magic .content__list-item').viewportChecker({
		classToAdd: 'bounceInRight',
		classToAddForFullView: 'opacity-1',
		classToRemove: 'opacity-0',
		offset: 0
	});
	
	/* close tab */
	function getCookie(name) {
		var matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}
	// проверяем, есть ли у нас cookie, с которой мы не показываем окно и если нет, запускаем показ
	var alertwin = getCookie("alertwin");
	if (alertwin != "no") { 
		$(document).mouseleave(function(e){
			if (e.clientY < 0) {
				$('.modal-extra').trigger('click');    
				// записываем cookie на 1 день, с которой мы не показываем окно
				var date = new Date;
				date.setDate(date.getDate() + 1);    
				document.cookie = "alertwin=no; path=/; expires=" + date.toUTCString();       
			}    
		});
	}
});
