/*################################################################################
##################################################################################
##########                                                             ###########
##########                                                             ###########
##########        Windows Template by                                  ###########
##########            https://html5-templates.com/                      ###########
##########                                                             ###########
##########        All rights reserved.                                 ###########
##########                                                             ###########
##################################################################################
################################################################################*/

var i = 0,
minimizedWidth = new Array,
minimizedHeight = new Array,
windowTopPos = new Array,
windowLeftPos = new Array,
panel,
id;
var myChart =null;
var myChart2 =null;


function adjustFullScreenSize() {
	$(".fullSizeWindow .wincontent").css("width", (window.innerWidth - 32));
	$(".fullSizeWindow .wincontent").css("height", (window.innerHeight - 98));
}
function makeWindowActive(thisid) {
	$(".window").each(function() {      
		$(this).css('z-index', $(this).css('z-index') - 1);
	});
	$("#window" + thisid).css('z-index',1000);
	$(".window").removeClass("activeWindow");
	$("#window" + thisid).addClass("activeWindow");
	
	$(".taskbarPanel").removeClass('activeTab');
	
	$("#minimPanel" + thisid).addClass("activeTab");
}

function minimizeWindow(id){
	windowTopPos[id] = $("#window" + id).css("top");
	windowLeftPos[id] = $("#window" + id).css("left");
	
	$("#window" + id).animate({
		top: 800,
		left: 0
	}, 200, function() {		//animation complete
		$("#window" + id).addClass('minimizedWindow');
		$("#minimPanel" + id).addClass('minimizedTab');
		$("#minimPanel" + id).removeClass('activeTab');
	});	
}

function openWindow(id) {
	if ($('#window' + id).hasClass("minimizedWindow")) {
		openMinimized(id);
	} else {	
		makeWindowActive(id);
		$("#window" + id).removeClass("closed");
		$("#minimPanel" + id).removeClass("closed");
	}
}
function closeWindwow(id) {
	$("#window" + id).addClass("closed");
	$("#minimPanel" + id).addClass("closed");
}

function openMinimized(id) {
	$('#window' + id).removeClass("minimizedWindow");
	$('#minimPanel' + id).removeClass("minimizedTab");
	makeWindowActive(id);
		
	$('#window' + id).animate({
		top: windowTopPos[id],
		left: windowLeftPos[id]
	}, 200, function() {
	});				
}

function getInterval(){
	if(document.getElementById("C1").checked){
		 document.getElementById("demo").innerHTML = "1 min";
	}
	if(document.getElementById("C5").checked){
		document.getElementById("demo").innerHTML = "5 min";
	}
	if(document.getElementById("C15").checked){
		document.getElementById("demo").innerHTML = "15 min";
	}
	if(document.getElementById("C30").checked){
		document.getElementById("demo").innerHTML = "30 min";
	}
	if(document.getElementById("C60").checked){
		document.getElementById("demo").innerHTML = "60 min";
	}
}	
	//stk = document.getElementById("stockName").value;
	//https://html-online.com/articles/get-url-parameters-javascript/
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}	
	
function getUrlParam(parameter, defaultvalue){
	var urlparameter = defaultvalue;
	if(window.location.href.indexOf(parameter) > -1){
	urlparameter = getUrlVars()[parameter];
	}
	return urlparameter;
}

$(document).ready(function(){
	$(".window").each(function() {      		// window template
		$(this).css('z-index',1000)
		$(this).attr('data-id', i);
		minimizedWidth[i] = $(this).width();
		minimizedHeight[i] = $(this).height();
		windowTopPos[i] = $(this).css("top");
		windowLeftPos[i] = $(this).css("left");
		$("#taskbar").append('<div class="taskbarPanel" id="minimPanel' + i + '" data-id="' + i + '">' + $(this).attr("data-title") + '</div>');
		if ($(this).hasClass("closed")) {	$("#minimPanel" + i).addClass('closed');	}		
		$(this).attr('id', 'window' + (i++));
		$(this).wrapInner('<div class="wincontent"></div>');
		$(this).prepend('<div class="windowHeader"><strong>' + $(this).attr("data-title") + '</strong><span title="Minimize" class="winminimize"><span></span></span><span title="Maximize" class="winmaximize"><span></span><span></span></span><span title="Close" class="winclose">x</span></div>');
	});
	
	$("#minimPanel" + (i-1)).addClass('activeTab');
	$("#window" + (i-1)).addClass('activeWindow');
	
	$( ".wincontent" ).resizable();			// resizable
	$( ".window" ).draggable({ cancel: ".wincontent" });	// draggable
	

    $(".window").mousedown(function(){		// active window on top (z-index 1000)
		makeWindowActive($(this).attr("data-id"));
    });
	
    $(".winclose").click(function(){		// close window
		closeWindwow($(this).parent().parent().attr("data-id"));
    });	

    $(".winminimize").click(function(){		// minimize window
		minimizeWindow($(this).parent().parent().attr("data-id"));
    });	
	
    $(".taskbarPanel").click(function(){		// taskbar click
		id = $(this).attr("data-id");
		if ($(this).hasClass("activeTab")) {	// minimize if active
			minimizeWindow($(this).attr("data-id"));
		} else {
			if ($(this).hasClass("minimizedTab")) {	// open if minimized
				openMinimized(id);
			} else {								// activate if inactive
				makeWindowActive(id);
			}
		}
    });	
	
    $(".openWindow").click(function(){		// open closed window
		openWindow($(this).attr("data-id"));
    });
	
    $(".winmaximize").click(function(){
		if ($(this).parent().parent().hasClass('fullSizeWindow')) {			// minimize
			
			$(this).parent().parent().removeClass('fullSizeWindow');
			$(this).parent().parent().children(".wincontent").height(minimizedHeight[$(this).parent().parent().attr("data-id")]);	
			$(this).parent().parent().children(".wincontent").width(minimizedWidth[$(this).parent().parent().attr("data-id")]);
		} else {															// maximize
			$(this).parent().parent().addClass('fullSizeWindow');
			
			minimizedHeight[$(this).parent().parent().attr('data-id')] = $(this).parent().parent().children(".wincontent").height();
			minimizedWidth[$(this).parent().parent().attr('data-id')] = $(this).parent().parent().children(".wincontent").width();
			
			adjustFullScreenSize();
		}
    });		
	adjustFullScreenSize();	
});

$(document).ready(function () {
	            $("ul li").click(function () {
	                getStockPBV($(this).text());
	            });
	        });

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    console.log( 'LIST CLICKED', ev.target );
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
  $(document).ready(function () {
	            $("ul li").click(function () {
	                getStockPBV($(this).text());
	            });
	        });
}

function newElementCurr() {
  var li = document.createElement("li");
  var inputValue1 = document.getElementById("myInput2").value;
  var inputValue2 = document.getElementById("myInput3").value;
  console.log( 'inputValue2', inputValue1 );
  console.log( 'inputValue3', inputValue2 );
  var t = document.createTextNode(inputValue1+" " + inputValue2);
  li.appendChild(t);
  if (inputValue1 === '' || inputValue2 === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL2").appendChild(li);
  }
  document.getElementById("myInput2").value = "";
  document.getElementById("myInput3").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
  $(document).ready(function () {
	    $("ul li").click(function () {
	        getCurrencyFromList($(this).text());
	    });
	});
}


function getStockData(stock){
	//document.getElementById("canvas").innerHTML = "";
	// var oldchar = document.getElementById("chart");
	// oldchar.remove();

	// var x = document.createElement("CANVAS");
	// x.id = "chart";
	
	var dataPoints = [];

	var intv;

	intv = '1min';

	//stk = getUrlParam('stockname');
	stk = stock;
	console.log( 'name', stk ); 

	url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol='+stk+'&interval='+intv+'&apikey=VGUS824DRQOZDD3F'; // <-- *ALPHAVANTAGE API KEY*

	requestFile( url );

	function requestFile( url ) {

	const xhr = new XMLHttpRequest();
	xhr.open( 'GET', url, true );
	xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
	xhr.onprogress = function( xhr ) { console.log( 'bytes loaded:', xhr.loaded  ); }; /// or something
	xhr.onload = callback;
	xhr.send( null );

	function callback( xhr ) {

	let response, json, lines;

	response = xhr.target.response;

	stkData = JSON.parse( response );

	console.log( 'stkData', stkData );
	console.log( 'hi1', stkData );

	var options = {
		maintainAspectRatio: false,
		responsive: true,
		animationEnabled: true,
		theme: "light2",
		title: {
			text: "Daily "+stk+" Data",
			display: true
		},
		scales: {
			axisY: [{
				title: "Value",
				titleFontSize: 24,
				includeZero: true,
				valueFormatString: "#,### Units",
			}],
			xAxes: [{
				type: 'time'
			}]
		}
	};
	var x, y;

	var dataPointsx = [];
	var dataPointsy = [];
	for (var i = 0; i < (Object.keys(stkData['Time Series ('+intv+')']).length); i++) {
		dataPointsx.push({
			x:  new Date (Date.parse(Object.keys(stkData['Time Series ('+intv+')'])[i])),
		});
		dataPointsy.push({
			y: parseFloat(stkData['Time Series ('+intv+')'][(Object.keys(stkData['Time Series ('+intv+')'])[i])]['1. open'])
		});
	}
	for (var i = 0; i < (Object.keys(stkData['Time Series ('+intv+')']).length); i++) {
		dataPoints.push({
			x: new Date (Date.parse(Object.keys(stkData['Time Series ('+intv+')'])[i])),
			y: parseFloat(stkData['Time Series ('+intv+')'][(Object.keys(stkData['Time Series ('+intv+')'])[i])]['1. open'])
		});
	}
	var data = {
		labels: dataPointsx,
		datasets: [{
			fill: false,
			label: stk,
			backgroundColor: "rgba(255,99,132,0.2)",
			borderColor: "rgba(255,99,132,1)",
			borderWidth: 2,
			data: dataPoints,
			lineTension: 0,
		}]
	};
	//console.log( 'hi2', dataPointsx );

	var ctx = document.getElementById('chart');

	chartPls(ctx,options,data);

	/*var myChart = new Chart.Line('chart', {
		options: options,
		data: data
	});*/


	}

	}
}


function getDailyStockData(stock){
	//document.getElementById("canvas").innerHTML = "";
	// var oldchar = document.getElementById("chart");
	// oldchar.remove();

	// var x = document.createElement("CANVAS");
	// x.id = "chart";
	
	var dataPoints = [];

	var intv;

	intv = '1min';

	//stk = getUrlParam('stockname');
	stk = stock;
	console.log( 'name', stk ); 

	url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+stk+'&interval='+intv+'&apikey=VGUS824DRQOZDD3F'; // <-- *ALPHAVANTAGE API KEY*

	requestFile( url );

	function requestFile( url ) {

	const xhr = new XMLHttpRequest();
	xhr.open( 'GET', url, true );
	xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
	xhr.onprogress = function( xhr ) { console.log( 'bytes loaded:', xhr.loaded  ); }; /// or something
	xhr.onload = callback;
	xhr.send( null );

	function callback( xhr ) {

	let response, json, lines;

	response = xhr.target.response;

	stkData = JSON.parse( response );

	console.log( 'stkData', stkData );
	console.log( 'hi1', stkData );

	var options = {
		maintainAspectRatio: false,
		responsive: true,
		animationEnabled: true,
		theme: "light2",
		title: {
			text: "Long-term "+stk+" Data",
			display: true
		},
		scales: {
			axisY: [{
				title: "Value",
				titleFontSize: 24,
				includeZero: true,
				valueFormatString: "#,### Units",
			}],
			xAxes: [{
				type: 'time'
			}]
		}
	};
	var x, y;

	var dataPointsx = [];
	var dataPointsy = [];
	for (var i = 0; i < (Object.keys(stkData['Time Series (Daily)']).length); i++) {
		dataPointsx.push({
			x:  new Date (Date.parse(Object.keys(stkData['Time Series (Daily)'])[i])),
		});
		dataPointsy.push({
			y: parseFloat(stkData['Time Series (Daily)'][(Object.keys(stkData['Time Series (Daily)'])[i])]['1. open'])
		});
	}
	for (var i = 0; i < (Object.keys(stkData['Time Series (Daily)']).length); i++) {
		dataPoints.push({
			x: new Date (Date.parse(Object.keys(stkData['Time Series (Daily)'])[i])),
			y: parseFloat(stkData['Time Series (Daily)'][(Object.keys(stkData['Time Series (Daily)'])[i])]['1. open'])
		});
	}
	var data = {
		labels: dataPointsx,
		datasets: [{
			fill: false,
			label: stk,
			backgroundColor: "rgba(255,99,132,0.2)",
			borderColor: "rgba(255,99,132,1)",
			borderWidth: 2,
			data: dataPoints,
			lineTension: 0,
		}]
	};
	//console.log( 'hi2', dataPointsx );

	var ctx = document.getElementById('chart');

	chartPls(ctx,options,data);

	/*var myChart = new Chart.Line(ctx, {
		options: options,
		data: data
	});*/


	}

	}
}

function chartPls(ctx, options, data){
	if (myChart!=null){
		myChart.destroy();
	}
	myChart = new Chart.Line(ctx, {
	options: options,
	data: data
	});
}

function chartPls2(ctx, options, data){
	if (myChart2!=null){
		myChart2.destroy();
	}
	myChart2 = new Chart.Scatter(ctx, {
	options: options,
	data: data
	});
}

function getStock(){
	var stock = document.getElementById("stockName").value;
	document.getElementById('chart').innerHTML = '&nbsp;';
	document.getElementById('chart').innerHTML = '<canvas id="chart"></canvas>';
	if(document.getElementById("Daily").checked){
		getStockData(stock);
	}else{
		getDailyStockData(stock);
	}
	console.log("Getting News");
	getNewsStock(stock);
}

function getStockPBV(stock){
	var str = stock;

	str = str.substring(0, str.length - 1);
	console.log(str);
	getStockData(str);
	console.log("Getting News");
	getNewsStock(str);
}

function getNewsStock(stock){
	console.log("Getting News");
	//var stk22 = document.getElementById("stockName").value;
//var stk2 = getUrlParam('stockname','TSLA');

	//Get proper company Name
	const ul = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' + stock + '&apikey=VGUS824DRQOZDD3F&datatype=json';
	var compName = getCompName(ul);
	console.log('COMPANY NAME', companyName);
	
	const url2 = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q='+stock+'&api-key=h7ZNc0v2Dkh5Fs92Wy0A6MxzhOvG0Gs7'; // <-- *NYT API KEY*
	requestNewsFile(url2);
}

function getCurrencyData(currName, currname2) {

	const url3 ='https://api.exchangeratesapi.io/history?start_at=2018-01-01&end_at=2018-09-01&base='+currname2 
	const xhr = new XMLHttpRequest();
	xhr.open( 'GET', url3, true );
	xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
	xhr.onprogress = function( xhr ) { console.log( 'bytes loaded:', xhr.loaded  ); }; /// or something
	xhr.onload = callback;
	xhr.send( null );

	function callback( xhr ) {

	let response, json, lines;

	response = xhr.target.response;

	currData = JSON.parse( response );


	console.log('currency',currData);

	var options = {
		maintainAspectRatio: false,
		responsive: true,
		animationEnabled: true,
		theme: "light2",
		title: {
			text: "Long-term "+currName+" to " +currname2+ " Data",
			display: true
		},
		scales: {
			axisY: [{
				title: "Value",
				titleFontSize: 24,
				includeZero: true,
				valueFormatString: "#,### Units",
			}],
			xAxes: [{
				type: 'time'
			}]
		}
	};
	var x, y;

	var dataPoints = [];
	var dataPointsx = [];
	var dataPointsy = [];
	for (var i = 0; i < (Object.keys(currData['rates']).length); i++) {
		dataPointsx.push({
			x: new Date (Date.parse(Object.keys(currData['rates'])[i])),
		});
		dataPointsy.push({
			y: parseFloat(currData['rates'][(Object.keys(currData['rates'])[i])])
		});
	}
	for (var i = 0; i < (Object.keys(currData['rates']).length); i++) {
		dataPoints.push({
			x: new Date (Date.parse(Object.keys(currData['rates'])[i])),
			y: parseFloat(currData.rates[(Object.keys(currData['rates'])[i])][currName])
		});
	}
	var data = {
		labels: dataPointsx,
		datasets: [{
			fill: false,
			label: currName,
			backgroundColor: "rgba(255,99,132,0.2)",
			borderColor: "rgba(255,99,132,1)",
			borderWidth: 2,
			data: dataPoints,
			lineTension: 0,
		}]
	};



	console.log('currency',dataPointsx);

	var ctx = document.getElementById('chart2');

	chartPls2(ctx,options,data);

	}
}
function getCurrencyFromList(bothcurr){
	var str = bothcurr;
	str = str.substring(0, str.length - 1);
	console.log("BOTH CURR:", str);
	var stringArray = str.split(/(\s+)/);
	console.log(stringArray);
	document.getElementById('currName').value = stringArray[0].toString();
	document.getElementById('currName2').value = stringArray[2].toString();
	getCurrency();
}


function getCurrency() {
	var currName = document.getElementById('currName').value;
	var currName2 = document.getElementById('currName2').value;
	getCurrencyData(currName,currName2);
	console.log("Getting News");
	var namee = currName +" "+currName2;
	getNewsCurr(namee);
}

var currencyName = "";
function getNewsCurr(curr){
	var name = getCurrName(curr);
	const url2 = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q='+curr+'&api-key=h7ZNc0v2Dkh5Fs92Wy0A6MxzhOvG0Gs7'; // <-- *NYT API KEY*
	requestNewsFile(url2);
}

function getCurrName(curr){
	const url = 'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=CAD&to_currency=USD&apikey=VGUS824DRQOZDD3F';
	
	const xhr = new XMLHttpRequest();
	xhr.open( 'GET', url, true );
	xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
	xhr.onprogress = function( xhr ) { console.log( 'bytes loaded:', xhr.loaded  ); }; /// or something
	xhr.onload = callback;
	xhr.send( null );


	function callback( xhr ) {

		let response, json, lines;

		response = xhr.target.response;


		newData = JSON.parse( response );
		console.log( 'new Data',newData );

		var compName = "";
	    compName = newData['Realtime Currency Exchange Rate']['2. From_Currency Name'];
		console.log('Currency Name inside',compName);
		
		currencyName = compName;
		
	}
	console.log('this', currencyName);
}

var companyName;
function getCompName(url2) {
	
	const xhr = new XMLHttpRequest();
	xhr.open( 'GET', url2, true );
	xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
	xhr.onprogress = function( xhr ) { console.log( 'bytes loaded:', xhr.loaded  ); }; /// or something
	xhr.onload = callback;
	xhr.send( null );

	
	function callback( xhr ) {

		let response, json, lines;

		response = xhr.target.response;


		newData = JSON.parse( response );
		console.log( 'new Data',newData );

		var compName = "";
		var i;
		for(i=0; i<2; i++){
			compName = newData.bestMatches[0]['2. name'];
		}
		console.log('Company Name inside',compName);

		return compName;
		
		companyName = compName;
		
	}
	console.log('COMPANY NAME BRUH', companyName);
	return companyName;

}

function requestNewsFile(url2) {
	
	const xhr = new XMLHttpRequest();
	xhr.open( 'GET', url2, true );
	xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
	xhr.onprogress = function( xhr ) { console.log( 'bytes loaded:', xhr.loaded  ); }; /// or something
	xhr.onload = callback;
	xhr.send( null );

	function callback( xhr ) {

		let response, json, lines;

		response = xhr.target.response;


		newsData = JSON.parse( response );
		console.log( 'newsData',newsData );

		var articleListSize = newsData.response.docs.length;
		var text = "";
		var i;
		for(i=0; i<articleListSize; i++){														//Working on Scrolling for more articles
			text += "<h1>" + newsData.response.docs[i].headline.main + "</h1>";
			text+= "<p>" + newsData.response.docs[i].snippet + "</p>";
			text += "<a href= \"" + newsData.response.docs[i].web_url + "\" target=\"_blank\">Read more</a><hr />";
		}
		document.getElementById("articles").innerHTML = text;
		
	}
}

function initialPageLoad(){
	getCurrency();
	getStock();
}