Template.Gradebook.events({
  'click #courses_link': function(){
    Template.dialog_box.open('#course_list_manage_dialog')
  }
})

Template.Gradebook.addCourse = function(studentId){
  // TODO: create dialog
  //Template.dialog_box.open('#student_add_course_dialog')
}