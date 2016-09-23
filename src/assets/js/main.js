$(function() {
	setTwins();
	setUnifiedCheckbox();
	setUnifiedRadio();
	setUnifiedSelect();
	setUploader();
	setTeaser();
	setTopBar();
	setTouchMenu();
	setBigBannerCarousel();
	setAccordion();
	setTarzan();

	$('#haha').on({
		click : function (event) {
			event.preventDefault();
			$(this).remove();
			$(document).trigger('tipi.UPDATE');
		}
	})

});