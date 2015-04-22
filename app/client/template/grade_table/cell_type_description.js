// Handsontable cell renderer and editor for description type

function descriptionRenderer(instance, td, row, col, prop, courseValue, cellProperties) {
  var escaped =  ""
  if(courseValue && courseValue.description){
    escaped = Handsontable.helper.stringify(courseValue.description)
    if(courseValue.gradeType && courseValue.gradeType.trim() != '')
      escaped = "<b>" + courseValue.gradeType + "</b> " + escaped
  }
  
  td.innerHTML = escaped
  return td
}

var descriptionEditor = Handsontable.editors.TextEditor.prototype.extend()

descriptionEditor.prototype.createElements = function () {

    //Call the original createElements method
    Handsontable.editors.TextEditor.prototype.createElements.apply(this, arguments)

    //Create password input and update relevant properties
    this.SELECT = document.createElement('select')
    this.SELECT.className = 'handsontableInput'
    this.SELECT.style.position = 'absolute'
    this.SELECT.style.top = '-16px'
    
    this.SELECT.add(new Option('Default', ''))
    this.SELECT.add(new Option('Quiz', 'Q'))
    this.SELECT.add(new Option('Test', 'T'))

    this.TEXTAREA_PARENT.insertBefore(this.SELECT,this.TEXTAREA)
}

descriptionEditor.prototype.setValue = function(value){
  var text = ""
  // Get the original object
  if(this.originalValue && this.originalValue.description){
    text = this.originalValue.description
    this.SELECT.value = this.originalValue.gradeType
  }else{
    this.SELECT.value = ""
  }
  Handsontable.editors.TextEditor.prototype.setValue.apply(this, [text])
}

descriptionEditor.prototype.getValue = function(){
  var textValue = Handsontable.editors.TextEditor.prototype.getValue.apply(this, [])
  var gType = this.SELECT.value
  return {description: textValue, gradeType: gType}
}

Handsontable.editors.registerEditor('descriptionEditor', descriptionEditor)

var descriptionCellType = {
  editor: descriptionEditor,
  renderer: descriptionRenderer,
  dataType: 'description'
};

Handsontable.cellTypes.description= descriptionCellType

