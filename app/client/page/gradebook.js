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
  
  'change #student_add_course_dialog #courseStudents': function(event){
    var val = $('#student_add_course_dialog #courseStudents').val()
    if(val && val != ''){
      $('#student_add_course_dialog #courseTitle').attr('disabled','disabled');
    }else{
      $('#student_add_course_dialog #courseTitle').removeAttr('disabled');
    }
  },
  
  'click #student_add_course_dialog .dialog_box_save': function(event){
    var courseId = $('#student_add_course_dialog #courseStudents').val()
    var studentId = Template.instance().studentId.get()
    var titleValue = Template.instance().$('#student_add_course_dialog #courseTitle')[0].value.trim()
    var selectedId = Session.get('list_panel')
    var termId = Session.get('current_term')
    if(titleValue.length > 0){
      Course.save({termId: termId, title: titleValue, students: [studentId]})
      Template.dialog_box.close('#student_add_course_dialog')
    }else if(courseId && courseId != ''){
      var course = Course.findOne({_id: courseId})
      course.students.push(studentId)
      Course.save({_id: courseId, termId: course.termId, title: course.title, students: course.students})
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