
Router.configure({
  layoutTemplate: 'ApplicationLayout'
})

Router.route('/', function () {
  this.render('Main')
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
}, {except: ["Main"]})