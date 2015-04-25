
Router.configure({
  layoutTemplate: 'ApplicationLayout'
})

Router.route('/', function () {
  this.render('Main');
})

Router.route('/home', function () {
  this.render('Home');
})

