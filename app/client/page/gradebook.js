Template.Gradebook.created = function(){
  Template.defaultProperty(this, 'data', {})
  this.studentId = new ReactiveVar(null)
}

Template.Gradebook.helpers({
  'studentCourse': function(){
    var studentId = Template.instance().studentId.get()
    if(studentId){
      var student = Student.findOne({_id: studentId})
      return {'studentName': student.name}
    }else{
      return {}
    }
  }
})

Template.Gradebook.events({
  'click #courses_link': function(){
    Template.dialog_box.open('#course_list_manage_dialog')
  }
})

Template.Gradebook.addCourse = function(studentId){
  var page = $('.gradebook-page')[0]
  var pageTI = Blaze.getView(page).templateInstance()
  pageTI.studentId.set(studentId)
  Template.dialog_box.open('#student_add_course_dialog')
}