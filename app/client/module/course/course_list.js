
Template.course_list.helpers({
  
  'items' : function () {
    var termId = Session.get('current_term')
    return Course.find({termId: termId}, {sort: {title: 1}})
  }, 
  
  'students': function(){
    var students = Student.find({}, {sort: {name: 1}}).fetch()
    for(var j = 0; j < students.length; j++){
      students[j].selected = ''
    }
    var selectedId = Session.get('list_panel')
    if(selectedId){
      var course = Course.findOne({_id: selectedId})
      if(course){
        var selectedStudents = course.students
        if(selectedStudents){
          for(var i = 0; i < selectedStudents.length; i++){
            for(var j = 0; j < students.length; j++){
              if(students[j]._id == selectedStudents[i]){
                students[j].selected = 'selected'
              }
            }
          }
        }
      }
    } 
    return students
  },
  
  'selectedItem': function () {
      var selectedId = Session.get('list_panel')
      if(selectedId){
        return Course.findOne({_id: selectedId})
      }else
        return {}
    }
    
})

Template.course_list.events({
  
  'click .add_item': function(){
    Session.set('list_panel', null)
    Template.dialog_box.open('#course_list_dialog', 'add')
  },
  
  'click .edit_item': function(){
    Template.dialog_box.open('#course_list_dialog', 'edit')
  },
  
  'click .dialog_box_save': function(event){
    var titleValue = Template.instance().$('#courseTitle')[0].value.trim()
    var selectedStudents = Template.instance().$('#courseStudents').val()
    var selectedId = Session.get('list_panel')
    var termId = Session.get('current_term')
    if(titleValue.length > 0){
      Meteor.call('saveCourse', {_id: selectedId, termId: termId, title: titleValue, students: selectedStudents})
      Template.dialog_box.close('#course_list_dialog')
    }
  },
  
  'click .dialog_box_delete': function(event){
    var selectedId = Session.get('list_panel')
    Meteor.call('deleteCourse', {_id: selectedId})
    Template.dialog_box.close('#course_list_dialog')
  }
  
})

