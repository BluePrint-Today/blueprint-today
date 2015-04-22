// Handsontable cell renderer and editor for grade type

function gradeRenderer(instance, td, row, col, prop, gradeValue, cellProperties) {
  var escaped =  ""
  if(gradeValue && gradeValue.value){
    escaped = Handsontable.helper.stringify(gradeValue.value)
  }
  td.innerHTML = escaped
  return td
}

var gradeEditor = Handsontable.editors.TextEditor.prototype.extend()

gradeEditor.prototype.setValue = function(value){
  var text = ""
  // Get what they originally typed in not the calculated value
  if(this.originalValue && this.originalValue.text){
    text = this.originalValue.text
  }
  Handsontable.editors.TextEditor.prototype.setValue.apply(this, [text])
}

gradeEditor.prototype.getValue = function(){
  var textValue = Handsontable.editors.TextEditor.prototype.getValue.apply(this, [])
  return Course.calculateGradeData(textValue)
}

Handsontable.editors.registerEditor('gradeEditor', gradeEditor)

var gradeCellType = {
  editor: gradeEditor,
  renderer: gradeRenderer,
  dataType: 'grade'
};

Handsontable.cellTypes.grade= gradeCellType