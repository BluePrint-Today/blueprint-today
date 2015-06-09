Template.Gradebook.created = function(){
  this.studentId = new ReactiveVar(null)
}

Template.Gradebook.helpers({
  'courses': function(){
      var termId = Session.get('current_term')
      return Course.find({termId: termId}, {sort: {title: 1}})
  }
})

Template.Gradebook.events({
  'click #courses_link': function(){
    Template.dialog_box.open('#course_list_manage_dialog')
  },
  
  'click .dialog_box_save': function(event){
    var studentId = Template.instance().studentId.get()
    var titleValue = Template.instance().$('#courseTitle')[0].value.trim()
    var selectedId = Session.get('list_panel')
    var termId = Session.get('current_term')
    if(titleValue.length > 0){
      Course.save({termId: termId, title: titleValue, students: [studentId]})
      Template.dialog_box.close('#student_add_course_dialog')
    }
  }
})

Template.Gradebook.addCourse = function(studentId){
  var page = $('.gradebook-page')[0]
  var pageTI = Blaze.getView(page).templateInstance()
  pageTI.studentId.set(studentId)
  Template.dialog_box.open('#student_add_course_dialog', 'add')
}