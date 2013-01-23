selectedFolder = Folder.selectDialog( "Please select input folder");
var fileList = selectedFolder.getFiles();
var strtRulerUnits = app.preferences.rulerUnits;
var strtTypeUnits = app.preferences.typeUnits;
app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;
for(var a = 0; a<fileList.length;a++)
{
	var file = fileList[a];
	if(file instanceof File && file.name.match(/\.(jpg|tif|gif|png)$/i)){
		open(file);
		var Width = activeDocument.width.value;
		var Height = activeDocument.height.value;
		if(documents.length > 1){
			activeDocument.selection.selectAll();
			activeDocument.selection.copy();
			activeDocument.close(SaveOptions.DONOTSAVECHANGES);
			activeDocument = documents[0];
			app.activeDocument.resizeCanvas(app.activeDocument.width+Width,Height, AnchorPosition.MIDDLELEFT );
			activeDocument.paste();
			activeDocument.selection.selectAll();
			align("AdRg");
			app.activeDocument.selection.deselect();
		}
	}else{
		continue;
	}
	app.preferences.rulerUnits = strtRulerUnits;
	app.preferences.typeUnits = strtTypeUnits;
}
function align(method)
{
	var desc = new ActionDescriptor();
	var ref = new ActionReference();
	ref.putEnumerated( charIDToTypeID( "Lyr " ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Trgt" ) );
	desc.putReference( charIDToTypeID( "null" ), ref );
	desc.putEnumerated( charIDToTypeID( "Usng" ), charIDToTypeID( "ADSt" ), charIDToTypeID( method ) );
	executeAction( charIDToTypeID( "Algn" ), desc, DialogModes.NO );
};