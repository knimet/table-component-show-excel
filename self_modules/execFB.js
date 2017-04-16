var xlsx = require("node-xlsx");
exports.excelRecords = function(file,startLine,sheetIndex){
	var list = xlsx.parse(file);
	var result = [];
	var sheetData = list[sheetIndex-1].data;
	for(var i = startLine-1;i<sheetData.length;i++){	
		result.push(sheetData[i]);
	}
	return result;
}
exports.excelHeader = function(file,headerLine,sheetIndex){
	var list = xlsx.parse(file);
	var sheetData = list[sheetIndex-1].data;
	return sheetData[headerLine-1];
}