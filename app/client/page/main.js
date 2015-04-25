Template.Main.events({
  'click #sign_up': function(e){
    $('#login-dropdown-list').addClass('open')
    e.preventDefault()
    return false;
  }
})