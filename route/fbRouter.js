var execFB = require("../self_modules/execFB"); 

module.exports = function(app){
	app.get('/initFB',function(req,res){
		res.redirect('TableShowExcel.html');
	
	})

	app.get('/initRecords',function(req,res){
		var arrayData = execFB.excelRecords("./test.xls",7,1);
		var header = execFB.excelHeader("./test.xls",6,1);
		res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
		var o = {"header":header,"records":arrayData};
  		res.write(JSON.stringify(o));
  		res.end();
	})

}



