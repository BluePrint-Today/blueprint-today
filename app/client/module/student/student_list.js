Template.student_list.helpers({
  
  'items' : function () {
    return Student.find({}, {sort: {name: 1}})
  }, 
  
  'selectedItem': function () {
      var selectedId = Session.get('list_panel')
      if(selectedId){
        return Student.findOne({_id: selectedId})
      }else
        return {}
    }
    
})

Template.student_list.events({
  
  'click .add_item': function(){
    Session.set('list_panel', null)
    Template.dialog_box.open('#student_list_dialog', 'add')
  },
  
  'click .edit_item': function(){
    Template.dialog_box.open('#student_list_dialog', 'edit')
  },
  
  'click .dialog_box_save': function(event){
    var nameTextBox = Template.instance().$('#studentName')[0]
    var nameValue = nameTextBox.value.trim()
    var selectedId = Session.get('list_panel')
    if(nameValue.length > 0){
      Meteor.call('saveStudent', {_id: selectedId, name: nameValue}, function(err, id){
        if(!err)
      	Session.set('list_panel', id)
      })
      Template.dialog_box.close('#student_list_dialog')
    }
  },
  
  'click .dialog_box_delete': function(event){
    var selectedId = Session.get('list_panel')
    Meteor.call('deleteStudent', {_id: selectedId})
    Template.dialog_box.close('#student_list_dialog')
  }
  
})

