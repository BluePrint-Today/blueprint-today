Meteor.startup(function () {
  //IronRouterAutoscroll.animationDuration = 800
  
    // close moble nav bar when item click
    $(document).on('click', '.navbar-collapse.collapse.in a:not(.dropdown-toggle)', function() {
        $(this).closest(".navbar-collapse").collapse('hide');
    })
    $(document).on('click', '.navbar-collapse.collapse.in button:not(.navbar-toggle)', function() {
        $(this).closest(".navbar-collapse").collapse('hide');
    })
    
    var signingIn = false;
    
    Tracker.autorun(function(){
      if(Meteor.loggingIn()){
        signingIn = true;
      }
      
      var isRootPath = window.location.pathname == "/" && window.location.hash == ""
      if(Meteor.userId()){
        // if signing in or we are already signed in and hitting the root path
        if(signingIn || isRootPath){
          $('.navbar-collapse').collapse('hide')
          Router.go("/home")
        }
      }
    })
})
