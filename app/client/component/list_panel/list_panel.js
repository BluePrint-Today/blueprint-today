Template.list_panel.created = function(){
  Template.defaultProperty(this, 'heading', 'Item List')
  Template.defaultProperty(this, 'key', 'list_panel')
  Template.defaultProperty(this, 'items', [])
}

Template.list_panel_row.helpers({
  
  'command': function() {
    return Template.parentData(1).command
  },
  
  'selected': function () {
    return Session.equals(Template.parentData(1).key, this._id) ? "selected" : ''
  }
  
})

Template.list_panel_row.events({
  
  'click .description': function () {
    Session.set(Template.parentData(1).key, this._id)
  }
  
})
