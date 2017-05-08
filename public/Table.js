var Table = React.createClass({
  	getInitialState: function() {
		var targetURL= this.props.targetURL;
		return {
			targetURL:targetURL,
			header:[],
      		records:[]
			};
			
	},
	componentDidMount:function(){
		var url = this.props.datafrom; 
		var xmlhttp;
		if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
  			xmlhttp=new XMLHttpRequest();
  		}else{// code for IE6, IE5
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.open("GET",url,false);//sync
		xmlhttp.send(null);
		if(xmlhttp.status >=200 && xmlhttp.status<300 || xmlhttp.status == 304){
			var data = eval('(' + xmlhttp.responseText + ')');
			var header = data.header;
			var records = data.records;
			this.setState( {
      			header:header,
      			records:records
			});
		}else{
			console.log("error during ajax");
			var header = ["error"];
			var records = [{"error":"error during ajax"}];
			this.setState( {
      			header:header,
      			records:records
			});
		}
	
	},
	submitTable:function(){
		var url = this.state.targetURL;
		var xmlhttp;
		if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
  			xmlhttp=new XMLHttpRequest();
  		}else{// code for IE6, IE5
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.open("POST",url,false);//sync
		xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		xmlhttp.send("records="+ JSON.stringify(this.state.records));
		if(xmlhttp.status >=200 && xmlhttp.status<300 || xmlhttp.status == 304){
			alert(xmlhttp.responseText);	
		}
	},
    addRecord:function(){
        var header = this.state.header;
        var record = [];
        for(var i = 0;i<header.length;i++){
            record[record.length] = "";
        }
        var records = this.state.records;
        records[records.length] = record;
        this.setState({records:records});
    },
 
	render: function() {
		var rows = [];
		var records = this.state.records;
		for (var i=0; i < records.length; i++) {
    		rows.push(<TableRow record={this.state.records[i]} header={this.state.header} rowIndex={i} handler={this.setTable}/>);
		}
		return (
			<div>
				<button onClick={this.submitTable} className="submit-button">submit table</button>
                <button onClick={this.addRecord} className="submit-button">add Record</button>
                <button onClick={this.submitTable} className="submit-button">delete Record</button>
				<table>
					<TableHeader header={this.state.header}/>
					{
						rows
					}
				</table>
			</div>
		);
	},
	setTable:function(rowIndex,record){
		var records = this.state.records;
		records[rowIndex] = record;
		this.setState({records:records});
	}
});
 
 
var TableRow = React.createClass({
	render:function(){
		var record = this.props.record;
		var header = this.props.header;
		var index = this.props.rowIndex;
		var handler = this.props.handler;
		var tds = [];
		for (var i=0; i < header.length; i++) {
    		tds.push(<TableData index={i} value={record[i]} handler={this.setRecord}/>);
		}
		return <tr>{tds}</tr>;
    	},
	setRecord:function(i,data){
		var r = this.props.record;
		r[i] = data;
		this.props.handler(this.props.rowIndex,r);
	}
});

//TableHeader is stateless

var TableHeader = React.createClass({
	render:function(){
		var header = this.props.header;
		return <tr>{
			header.map(function(item){
				return <th>{item}</th>;
        			})
        		}</tr>;
	}
})

//TableData is stateless

var TableData = React.createClass({
	render:function(){
		var index = this.props.index;
		var value = this.props.value;
		return <td data-index={index}><input type="text" value={value} onChange={this.handleChange} className="td-input-style"/></td>;
   	},
	handleChange:function(event){ 
		var newValue = event.target.value;
		this.props.handler(this.props.index,newValue);
	}
});
