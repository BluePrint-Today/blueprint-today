Template.Home.rendered = function(){
	$('#homeTab').addClass('active')
}

Template.Home.destroyed = function(){
	$('#homeTab').removeClass('active')
}
