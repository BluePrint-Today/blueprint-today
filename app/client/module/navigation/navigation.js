
Router.configure({
  layoutTemplate: 'ApplicationLayout'
})

Router.route('/', function () {
  this.render('Main')
})

Router.route('/faqs', function () {
  this.render('Faqs')
})

Router.route('/terms', function () {
  this.render('Terms')
})

Router.route('/privacy', function () {
  this.render('Privacy')
})

Router.route('/home', function () {
  this.render('Home')
})

Router.route('/gradebook', function () {
  this.render('Gradebook')
})

Router.onBeforeAction(function () {
  if (!Meteor.userId()) {
    this.render("Main")
  } else {
    this.next()
  }
}, {except: ["Main", "faqs", "terms", "privacy"]})


Template.mainNavigation.events({
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
