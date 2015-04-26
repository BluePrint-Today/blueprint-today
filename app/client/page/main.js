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