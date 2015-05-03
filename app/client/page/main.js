Template.Main.rendered = function(){
   var sections =  $("[data-nav]")
   var tabs = {}
   this.sections = sections
   this.navtabs = tabs
   sections.each(function(){
     var tab = $('#' + this.dataset['nav'])
     tabs[this.id] = tab
   })
	$(window).bind("scroll.nav", function(){
     sections.each(function(){
       var position = window.scrollY + 200
       if(this.offsetTop < position && (this.offsetTop + this.offsetHeight) > position){
         tabs[this.id].addClass('active')
       }else{
         tabs[this.id].removeClass('active')
       }
     })
   })  
}

Template.Main.destroyed = function(){
	$(window).unbind("scroll.nav")
   var tabs = this.navtabs
   this.sections.each(function(){
      tabs[this.id].removeClass('active')
   })
}

Template.Main.events({
  'click #sign_up': function(e){
    $('#login-dropdown-list').addClass('open')
    e.preventDefault()
    return false;
  },
  
  'click a[href*=#]': function(e){
    var link = e.currentTarget
    if (location.pathname.replace(/^\//,'') == link.pathname.replace(/^\//,'') && location.hostname == link.hostname) {
      var target = $(link.hash);
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  }
})