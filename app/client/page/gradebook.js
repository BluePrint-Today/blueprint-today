Template.Gradebook.events({
  'click #courses_link': function(){
    Template.dialog_box.open('#course_list_manage_dialog')
  }
})