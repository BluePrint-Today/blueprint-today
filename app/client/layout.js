Meteor.startup(function () {
  IronRouterAutoscroll.animationDuration = 800
  
    // close moble nav bar when item click
    $(document).on('click', '.navbar-collapse.collapse.in a:not(.dropdown-toggle)', function() {
        $(this).closest(".navbar-collapse").collapse('hide');
    })
    $(document).on('click', '.navbar-collapse.collapse.in button:not(.navbar-toggle)', function() {
        $(this).closest(".navbar-collapse").collapse('hide');
    })
    
    Tracker.autorun(function(){
      if(Meteor.userId()){
        Router.go("/home")
      }
    })
})
