
Router.configure({
  layoutTemplate: 'ApplicationLayout'
})

function sendPageView(page){
  if(typeof ga != 'undefined'){
    ga('set', 'page', page)
    ga('send', 'pageview')
  }
}

Router.route('/', function () {
  this.render('Main')
})

Router.route('/faqs', function () {
  sendPageView('/faqs')
  this.render('Faqs')
})

Router.route('/terms', function () {
  sendPageView('/terms')
  this.render('Terms')
})

Router.route('/privacy', function () {
  sendPageView('/privacy')
  this.render('Privacy')
})

Router.route('/home', function () {
  sendPageView('/home')
  this.render('Home')
})

Router.route('/gradebook', function () {
  sendPageView('/gradebook')
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
