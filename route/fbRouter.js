var execFB = require("../self_modules/execFB"); 
var bodyParser = require('body-parser');
 
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

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
	app.post('/postTable',urlencodedParser,function(req,res){
		console.log(req.body.records.toString());
		res.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
		res.write("success");
  		res.end();
	})

}



