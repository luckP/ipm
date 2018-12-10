var menuBar = false;
var searchButton = false;

var start=0, end=100;

var map;
var mapLong;
var mapLati;
var mapZoom;

var checkGraphicComplaint = [true, true, true, true];
$(function(){
      
	$( window ).ready(function(){
		$('.user-photo').height($('.user-photo').width());
		loadDataProvider();

	});	

	$(window).resize(function() {
		// $('a').remove();
		uploadDataProvider(true);

	});

	$( window ).scroll(function() {
	 	// console.log($(this).scrollTop());
	 	// var scroll = $(this).scrollTop();
	 	// var topData = $('.help-us').offset().top - $('#data-complaint').offset().top;
	 });

	$('.menu-option').mouseover(function(){
		$(this).find('.arrow').css('transform','rotate(360deg)');
	}).mouseleave(function(){
		$(this).find('.arrow').css('transform','rotate(0deg)');

	});

	$('.button-option').click(function(){
		menuBar = !menuBar;
		if(menuBar){
			$('.container').animate({width: '75%'},500);
			$('.top-bar').animate({width: '75%'},500);
			$('.menu-bar').animate({width: '25%'},500);

			var div = $(this).find('div');
			$(div[0]).css('transform','rotate(45deg)');
			$(div[1]).hide();
			$(div[2]).css('transform','rotate(-45deg)');
			$(div[2]).css('margin-top', '-6px');
		}
		else{
			$('.menu-bar').animate({width: '0'},500);
			$('.container').animate({width: '100%'},500);
			$('.top-bar').animate({width: '100%'},500);


			var div = $(this).find('div');
			$(div[0]).css('transform','rotate(0deg)');
			$(div[1]).show();
			$(div[2]).css('transform','rotate(0deg)');
			$(div[2]).css('margin-top', '4px');
		}
	// $('a').remove();

	});

	$('.button-search').click(function(){
		searchButton=!searchButton;
		if(searchButton){
			$('.input-search').css('width','20%');
			$('.input-search').css('padding','0px 10px;');
			$(this).css('background-color', '#1abc9c');
			$(this).css('border-radius', '100px');

		}
		else{
			$('.input-search').css('width','0');
			$('.input-search').css('padding','0');
			$(this).css('background-color', 'rgba(0,0,0,0)');
			$(this).css('border-radius', '0px');
		}
	// $('a').remove();

	});

$( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 100,
      values: [ 0, 100 ],
      slide: function( event, ui ) {
      	start = ui.values[0];
      	end = ui.values[1];
      	uploadDataProvider(true);
        // console.log(ui.values[ 0 ] + '-' + ui.values[ 1 ]);
      }
    });


	$('.graphic-complaint-value').parent().click(function(){
		if(checkGraphicComplaint[parseInt($(this).attr('index'))]){
			$(this).css('opacity', '.3');
		}
		else{
			$(this).css('opacity', '1');
		}
		checkGraphicComplaint[parseInt($(this).attr('index'))]=!checkGraphicComplaint[parseInt($(this).attr('index'))];
		 uploadDataProvider();
	});




	$('.input-search').change(function() {
	  uploadDataProvider(true);
	});



   });







// -------------------------------------------------------------------------------------------

function loadDataProvider(){
	uploadDataProvider(true)
}

function uploadDataProvider(checkMap){
// var string = "foo",
//     substring = "oo";
// string.indexOf(substring) !== -1;
	
	// transporte turismo servico viagens telecomunicacoes industria ensino Forne. Agua Forne. Energia Admin Publica
	var companyCategoryData = [];
	var companyCategory = [];
	var companyCategoryName = ["Transporte", "Turismo", "Serviço", "Viagens", "Telecomunicações", "Indústria", "Ensino", "Forne. Água", "Forne. Energia", "Admin Pública"];
	companyCategoryName.forEach(function(e, i) {
    	companyCategory[i] = [];
	    for(var j=0; j<4; j++) {
	        companyCategory[i][j] = 0;
	    }
	});



	var contStat = [0,0,0,0];
	var userSatisfaction = 0;
	var contTotal = 0;

	var mapDataImage = [];

	var polarData=[];
	var polarDataAux = [0,0,0,0,0,0];

	var graphicLine1 = [], 
		dateTimeAux=dataProvider[dataProvider.length/100*start].date,
		column = [0,0,0,0];
	for (var i = 0; i < column.length; i++) {
		column[i]=0;
	}

	var timeLineGraphic = [];

	var averageResponseTime =[];
	var averageResponseTimeCont = 0;
	var averageResponseTimeAux = 0;

	var mapCircleColor = ["#2980b995", "#e74c3c95", "#2ecc7195", "#f1c40f95"];


	for (var i = 0; i < contStat.length; i++) {
		contStat[i]=0;
	}
	// console.log(dataProvider.length/100*start);
	dataProvider.forEach(function(e, i){
		if(i>=(dataProvider.length/100)*start && i < dataProvider.length/100*end){
			if($('.input-search').val()=="" || e.companyName.indexOf($('.input-search').val())!==-1 || e.world.indexOf($('.input-search').val())!==-1){
						if(checkGraphicComplaint[e.state]){
							polarDataAux[0]+=e.userInfo1;
							polarDataAux[1]+=e.userInfo2;
							polarDataAux[2]+=e.userInfo3;
							polarDataAux[3]+=e.userInfo4;
							polarDataAux[4]+=e.userInfo5;
							polarDataAux[5]+=e.userInfo6;
							contTotal++;
							contStat[e.state]++;
							userSatisfaction+=e.score-1;
							companyCategory[e.companyCategory][e.state]++;
							mapDataImage.push( {"type": "circle","width": 8 ,"color": mapCircleColor[e.state], "title": e.companyName, "latitude": e.latitude, "longitude": e.longitude, "url": "complaintPageId.html", "url" : "http://www.google.com", "class" : "teste"});

							if(dateTimeAux!=e.date){
								graphicLine1.push({"date":dateTimeAux,"column-1": column[0],"column-2": column[1],"column-3": column[2],"column-4": column[3] });
								averageResponseTime.push({"date": dateTimeAux, "column-1": parseFloat(averageResponseTimeAux/averageResponseTimeCont).toFixed(2)});
								dateTimeAux=e.date;
								var cont = 0;
								for (var j = 0; j < column.length; j++)	{
									cont+=column[j];
									column[j]=0;
								}

								timeLineGraphic.push({"category": "dateTimeAux", "column-1": cont});
							}
							else{
								column[e.state]++;
								averageResponseTimeCont++;
								averageResponseTimeAux+=e.averageresponseTime;

							}
						}
					}
			}
		});

	userSatisfaction =100 - parseInt((userSatisfaction/(contTotal*4))*100);

	polarData.push({"category": "A empresa", "points": parseFloat(polarDataAux[0]/contTotal).toFixed(2)});
	polarData.push({"category": "Atendente", "points": parseFloat(polarDataAux[4]/contTotal).toFixed(2)});
	polarData.push({"category": "Atendimento", "points": parseFloat(polarDataAux[1]/contTotal).toFixed(2)});
	polarData.push({"category": "Velocidade no atendimento", "points": parseFloat(polarDataAux[2]/contTotal).toFixed(2)});
	polarData.push({"category": "Resolução do problema", "points": parseFloat(polarDataAux[3]/contTotal).toFixed(2)});
	polarData.push({"category": "Velocidade de resolução", "points": parseFloat(polarDataAux[5]/contTotal).toFixed(2)});


	if(start == 0 && end == 100)
		updateGraphicTimeLine(timeLineGraphic);
	updateGraphicLine1(graphicLine1);

	// console.log(companyCategory);

	companyCategoryName.forEach(function (value, i) {
		companyCategoryData.push({"category": value, "column-1": companyCategory[i][0], "column-2": companyCategory[i][1], "column-3": companyCategory[i][2], "column-4": companyCategory[i][3]});
	});


	// updateGraphicComplaint1(contStat[0], contTotal);
	// updateGraphicComplaint2(contStat[1], contTotal);
	// updateGraphicComplaint3(contStat[2], contTotal);
	// updateGraphicComplaint4(contStat[3], contTotal);
	$('#graphic-complaint1').find('.graphic-complaint-value').html(0);
	$('#graphic-complaint2').find('.graphic-complaint-value').html(0);
	$('#graphic-complaint3').find('.graphic-complaint-value').html(0);
	$('#graphic-complaint4').find('.graphic-complaint-value').html(0);
	updateGraphicComplaintValue(contStat);
	updateGraphicVeloc(userSatisfaction);
	updateGraphicDonutEstado(contStat, contTotal);
	upadateGraphicPolar(polarData);
	updateGraphicCompanyCategory(companyCategoryData);
	updateGraphicAreaAverageResponseTime(averageResponseTime);
	updateGraphicAreaAverageResponseTime2(averageResponseTime);
	// if(checkMap){
		updateGraphicMap(mapDataImage);
		
	// }	
	$('a').remove();

	// $('g').find('image').remove();


}

function updateGraphicComplaintValue(d){
	$('#graphic-complaint1').find('.graphic-complaint-value').html(d[0]);
	$('#graphic-complaint2').find('.graphic-complaint-value').html(d[1]);
	$('#graphic-complaint3').find('.graphic-complaint-value').html(d[2]);
	$('#graphic-complaint4').find('.graphic-complaint-value').html(d[3]);

	// var c=false;
	// if($('#graphic-complaint1').find('.graphic-complaint-value').html()<d[0]){
	// 	$('#graphic-complaint1').find('.graphic-complaint-value').html(parseInt($('#graphic-complaint1').find('.graphic-complaint-value').html())+1);
	// 	c=true;
	// }

	// if($('#graphic-complaint2').find('.graphic-complaint-value').html()<d[1]){
	// 	$('#graphic-complaint2').find('.graphic-complaint-value').html(parseInt($('#graphic-complaint2').find('.graphic-complaint-value').html())+1);
	// 	c=true;
	// }

	// if($('#graphic-complaint3').find('.graphic-complaint-value').html()<d[2]){
	// 	$('#graphic-complaint3').find('.graphic-complaint-value').html(parseInt($('#graphic-complaint3').find('.graphic-complaint-value').html())+1);
	// 	c=true;
	// }

	// if($('#graphic-complaint4').find('.graphic-complaint-value').html()<d[3]){
	// 	$('#graphic-complaint4').find('.graphic-complaint-value').html(parseInt($('#graphic-complaint4').find('.graphic-complaint-value').html())+1);
	// 	c=true;
	// }

	// if(c){
	// 	setTimeout(function(){updateGraphicComplaintValue(d); }, 0);
	// 	}
	}

function updateGraphicComplaint1(d, t){
	// console.log(d);
	AmCharts.makeChart("graphic-complaint1",
				{
					"type": "pie",
					"balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
					"innerRadius": "20%",
					"labelText": "",
					"minRadius": 55,
					"pieX": "50%",
					"pieY": "50%",
					"radius": "40%",
					"colors": [
						"#2D2833",
						"#2980b9",
						"#f1c40f",
						"#34495e",
						"#23B4AE",
						"#2D2833",
						"#EDEDED"
					],
					"maxLabelWidth": 168,
					"valueField": "column-1",
					"allLabels": [],
					"balloon": {
						"adjustBorderColor": false,
						"disableMouseEvents": false
					},
					"titles": [],
					"dataProvider": [
						{
							"category": "category 1",
							"column-1": t
						},
						{
							"category": "category 2",
							"column-1": d
						}
					]
				}
			);
}

function updateGraphicComplaint2(d, t){
	// console.log(d);
	AmCharts.makeChart("graphic-complaint2",
				{
					"type": "pie",
					"balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
					"innerRadius": "20%",
					"labelText": "",
					"minRadius": 55,
					"pieX": "50%",
					"pieY": "50%",
					"radius": "40%",
					"colors": [
						"#2D2833",
						"#e74c3c",
						"#f1c40f",
						"#34495e",
						"#23B4AE",
						"#2D2833",
						"#EDEDED"
					],
					"maxLabelWidth": 168,
					"valueField": "column-1",
					"allLabels": [],
					"balloon": {
						"adjustBorderColor": false,
						"disableMouseEvents": false
					},
					"titles": [],
					"dataProvider": [
						{
							"category": "category 1",
							"column-1": t
						},
						{
							"category": "category 2",
							"column-1": d
						}
					]
				}
			);

}

function updateGraphicComplaint3(d, t){
	// console.log(d);
	AmCharts.makeChart("graphic-complaint3",
				{
					"type": "pie",
					"balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
					"innerRadius": "20%",
					"labelText": "",
					"minRadius": 55,
					"pieX": "50%",
					"pieY": "50%",
					"radius": "40%",
					"colors": [
						"#2D2833",
						"#2ecc71",
						"#f1c40f",
						"#34495e",
						"#23B4AE",
						"#2D2833",
						"#EDEDED"
					],
					"maxLabelWidth": 168,
					"valueField": "column-1",
					"allLabels": [],
					"balloon": {
						"adjustBorderColor": false,
						"disableMouseEvents": false
					},
					"titles": [],
					"dataProvider": [
						{
							"category": "category 1",
							"column-1": t
						},
						{
							"category": "category 2",
							"column-1": d
						}
					]
				}
			);

}

function updateGraphicComplaint4(d, t){
	// console.log(d);
	AmCharts.makeChart("graphic-complaint4",
				{
					"type": "pie",
					"balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
					"innerRadius": "20%",
					"labelText": "",
					"minRadius": 55,
					"pieX": "50%",
					"pieY": "50%",
					"radius": "40%",
					"colors": [
						"#2D2833",
						"#f1c40f",
						"#34495e",
						"#23B4AE",
						"#2D2833",
						"#EDEDED"
					],
					"maxLabelWidth": 168,
					"valueField": "column-1",
					"allLabels": [],
					"balloon": {
						"adjustBorderColor": false,
						"disableMouseEvents": false
					},
					"titles": [],
					"dataProvider": [
						{
							"category": "category 1",
							"column-1": t
						},
						{
							"category": "category 2",
							"column-1": d
						}
					]
				}
			);
}

function updateGraphicTimeLine(d){
	AmCharts.makeChart("time-line-graph",
				{
					"type": "serial",
					"categoryField": "category",
					"columnSpacing": 0,
					"columnWidth": 0,
					"autoMarginOffset": 0,
					"marginBottom": -1,
					"marginLeft": 0,
					"marginRight": 0,
					"marginTop": 0,
					"plotAreaFillColors": "#000000",
					"colors": [
						"#aaa",
						"#d8854f",
						"#eea638",
						"#a7a737",
						"#86a965",
						"#8aabb0",
						"#69c8ff",
						"#cfd27e",
						"#9d9888",
						"#916b8a",
						"#724887",
						"#7256bc"
					],
					"startDuration": 0.5,
					"startEffect": "easeOutSine",
					"backgroundColor": "#000000",
					"color": "#FFFFFF00",
					"fontSize": 0,
					"handDrawScatter": 0,
					"handDrawThickness": 0,
					"hideBalloonTime": 116,
					"prefixesOfBigNumbers": [],
					"prefixesOfSmallNumbers": [],
					"processCount": 999,
					"theme": "black",
					"categoryAxis": {
						"autoRotateAngle": 0,
						"dateFormats": [],
						"gridPosition": "start",
						"axisColor": "",
						"axisThickness": 0,
						"boldPeriodBeginning": false,
						"centerLabelOnFullPeriod": false,
						"color": "#000000",
						"dashLength": 0,
						"fillColor": "#000000",
						"fontSize": 0,
						"gridAlpha": 0,
						"gridColor": "#000000",
						"gridCount": 0,
						"gridThickness": 0,
						"markPeriodChange": false,
						"minorGridAlpha": 0,
						"tickLength": 0,
						"titleFontSize": 0
					},
					"trendLines": [],
					"graphs": [
						{
							"accessibleLabel": "",
							"balloonText": "",
							"fillAlphas": 0.7,
							"id": "AmGraph-1",
							"lineAlpha": 0,
							"title": "graph 1",
							"valueField": "column-1"
						}
					],
					"guides": [],
					"valueAxes": [
						{
							"id": "ValueAxis-1",
							"type": "date",
							"axisColor": "#FFFFFF00",
							"dashLength": 0,
							"fillColor": "#FFFFFF00",
							"fontSize": 0,
							"gridColor": "#FFFFFF00",
							"gridCount": 0,
							"gridThickness": 0,
							"minorGridAlpha": 0,
							"minVerticalGap": 39,
							"title": "Axis title"
						}
					],
					"allLabels": [],
					"balloon": {
						"borderColor": "#000000",
						"borderThickness": 0,
						"fillColor": "#000000",
						"fontSize": 0,
						"horizontalPadding": 0,
						"maxWidth": 60,
						"offsetX": 0,
						"offsetY": 0,
						"pointerWidth": 0
					},
					"titles": [],
					"dataProvider": d
				}
			);
}

function updateGraphicLine1(d){
	AmCharts.makeChart("graphic-line",
				{
					"type": "serial",
					"categoryField": "date",
					"dataDateFormat": "YYYY-MM-DD",
					"colors": [
						"#2980b9",
						"#e74c3c",
						"#2ecc71",
						"#f1c40f",
						"#34495e",
						"#23B4AE",
						"#2D2833",
						"#EDEDED"
					],
					"theme": "dark",
					"categoryAxis": {
						"parseDates": true
					},
					"chartCursor": {
						"enabled": true
					},
					"chartScrollbar": {
						"enabled": true
					},
					"trendLines": [],
					"graphs": [
						{
							"bullet": "round",
							"bulletHitAreaSize": 2,
							"id": "Line-Blue",
							"markerType": "circle",
							"maxBulletSize": 47,
							"title": "graph 11",
							"valueField": "column-1"
						},
						{
							"bullet": "round",
							"id": "Line-Red",
							"markerType": "circle",
							"title": "graph 12",
							"valueField": "column-2"
						},
						{
							"bullet": "round",
							"id": "Line-Green",
							"markerType": "circle",
							"title": "graph 13",
							"valueField": "column-3"
						},
						{
							"bullet": "round",
							"id": "Line-Yellow",
							"markerType": "circle",
							"title": "graph 14",
							"valueField": "column-4"
						}
					],
					"guides": [],
					"valueAxes": [
						{
							"id": "ValueAxis-1",
							"title": "Axis title"
						}
					],
					"allLabels": [],
					"balloon": {},
					"legend": {
						"enabled": false,
						"useGraphSettings": true
					},
					"titles": [
						{
							"id": "Title-1",
							"size": 15,
							"text": "Reclamações Recebidas"
						}
					],
					"dataProvider": d
				}
			);
}

function upadateGraphicPolar(d){
	AmCharts.makeChart("graphic-user-polar",
				{
					"type": "radar",
					"categoryField": "category",
					"startDuration": 2,
					"theme": "dark",
					"colors": [
						"#1abc9c"
					],
					"graphs": [
						{
							"balloonText": "[[category]]: [[value]] pontos",
							"bullet": "round",
							"id": "AmGraph-1",
							"valueField": "points"
						}
					],
					"guides": [],
					"valueAxes": [
						{
							"axisTitleOffset": 20,
							"gridType": "circles",
							"id": "ValueAxis-1",
							"minimum": 0,
							"axisAlpha": 0.15
						}
					],
					"allLabels": [],
					"balloon": {},
					"titles": [],
					"dataProvider": d
				}
			);
}

function updateGraphicVeloc(d){
			AmCharts.makeChart("graphic-veloc",
				{
					"type": "gauge",
					"faceColor": "#FAFAFA00",
					"marginBottom": 5,
					"marginLeft": 5,
					"marginRight": 5,
					"marginTop": 5,
					"color": "#E7E7E7",
					"fontSize": 0,
					"handDrawScatter": 0,
					"percentPrecision": 0,
					"precision": 0,
					"prefixesOfBigNumbers": [],
					"prefixesOfSmallNumbers": [],
					"theme": "black",
					"arrows": [
						{
							"id": "GaugeArrow-1",
							"innerRadius": "32%",
							"nailBorderThickness": 0,
							"value": d
						}
					],
					"axes": [
						{
							"axisThickness": 1,
							"bandAlpha": 1,
							"bottomText": "0 km/h",
							"bottomTextYOffset": -20,
							"endAngle": 100,
							"endValue": 100,
							"id": "GaugeAxis-1",
							"startAngle": -100,
							"tickAlpha": 0,
							"valueInterval": 10,
							"bands": [
								{
									"color": "rgb(46, 204, 113)",
									"endValue": 30,
									"id": "GaugeBand-1",
									"innerRadius": 70,
									"startValue": 0
								},
								{
									"color": "rgb(241, 196, 15)",
									"endValue": 70,
									"id": "GaugeBand-2",
									"innerRadius": 70,
									"startValue": 30
								},
								{
									"color": "rgb(231, 76, 60)",
									"endValue": 100,
									"id": "GaugeBand-3",
									"innerRadius": 70,
									"startValue": 70
								}
							]
						}
					],
					"allLabels": [],
					"balloon": {
						"borderAlpha": 0,
						"offsetX": 0,
						"offsetY": 0
					},
					"titles": [
						{
							"id": "Title-1",
							"size": 15,
							"text": "Satisfação do Utilizador"
						}
					]
				}
			);
}

function updateGraphicDonutEstado(d, t){
	AmCharts.makeChart("graphic-donut-estado",
				{
					"type": "pie",
					"balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
					"innerRadius": "40%",
					"minRadius": 0,
					"colors": [
						"#2980b9",
						"#e74c3c",
						"#2ecc71",
						"#f1c40f",
						"#34495e",
						"#23B4AE",
						"#2D2833",
						"#EDEDED"
					],
					"gradientRatio": [],
					"marginBottom": 0,
					"marginTop": 0,
					"outlineThickness": 0,
					"titleField": "category",
					"valueField": "column-1",
					"fontSize": 12,
					"theme": "dark",
					
					"balloon": {},
					"titles": [
						{
							"id": "Estado",
							"text": "Porcentagem das queixas em cada estado"
						}
					],
					"dataProvider": [
						{
							"category": "Estado 1",
							"column-1": d[0]
						},
						{
							"category": "Estado2",
							"column-1": d[1]
						},
						{
							"category": "Estado3",
							"column-1": d[2]
						},
						{
							"category": "Estado4",
							"column-1": d[3]
						}
					]
				});
}
// alterar
function updateGraphicCompanyCategory(d){
	AmCharts.makeChart("graphic-compani-category",
				{
					"type": "serial",
					"categoryField": "category",
					"colors": [
						"#2980b9",
						"#e74c3c",
						"#2ecc71",
						"#f1c40f",
						"#34495e",
						"#23B4AE",
						"#2D2833",
						"#EDEDED"
					],
					"startDuration": 1,
					"theme": "dark",
					"categoryAxis": {
						"gridPosition": "start"
					},
					"chartScrollbar": {
						"enabled": true
					},
					"trendLines": [],
					"graphs": [
						{
							"balloonText": "[[title]] of [[category]]:[[value]]",
							"fillAlphas": 1,
							"id": "AmGraph-1",
							"title": "Resposta",
							"type": "column",
							"valueField": "column-1"
						},
						{
							"balloonText": "[[title]] of [[category]]:[[value]]",
							"fillAlphas": 1,
							"id": "AmGraph-2",
							"title": "Não R.",
							"type": "column",
							"valueField": "column-2"
						},
						{
							"balloonText": "[[title]] of [[category]]:[[value]]",
							"fillAlphas": 1,
							"id": "AmGraph-3",
							"title": "Resolvidas",
							"type": "column",
							"valueField": "column-3"
						},
						{
							"balloonText": "[[title]] of [[category]]:[[value]]",
							"fillAlphas": 1,
							"id": "AmGraph-4",
							"title": "Aguarda",
							"type": "column",
							"valueField": "column-4"
						}
					],
					"guides": [],
					"valueAxes": [
						{
							"axisFrequency": 4,
							"id": "ValueAxis-2",
							"stackType": "regular",
							"titleFontSize": 4
						}
					],
					"allLabels": [],
					"balloon": {},
					"titles": [
						{
							"id": "Title-1",
							"size": 15,
							"text": "Categorias"
						}
					],
					"dataProvider": d
				}
			);
}

function updateGraphicAreaAverageResponseTime(d){
	AmCharts.makeChart("average-response-time",
				{
					"type": "serial",
					"categoryField": "date",
					"columnSpacing": 3,
					"dataDateFormat": "YYYY-MM-DD",
					"autoMarginOffset": 15,
					"marginBottom": 5,
					"marginLeft": 5,
					"marginTop": 5,
					"zoomOutButtonPadding": 4,
					"colors": [
						"#23B4AE",
						"#2D2833",
						"#EDEDED"
					],
					"sequencedAnimation": false,
					"fontSize": 9,
					"theme": "dark",
					"usePrefixes": true,
					"categoryAxis": {
						"parseDates": true
					},
					"chartCursor": {
						"enabled": true,
						"animationDuration": 0.1,
						"bulletSize": 4,
						"categoryBalloonAlpha": 0.85,
						"tabIndex": 0,
						"valueLineAlpha": 0.58,
						"valueLineBalloonEnabled": true
					},
					"chartScrollbar": {
						"enabled": true,
						"dragIcon": "dragIconRoundSmall",
						"dragIconHeight": 30,
						"dragIconWidth": 40
					},
					"trendLines": [],
					"graphs": [
						{
							"fillAlphas": 0.7,
							"id": "AmGraph-1",
							"lineAlpha": 0,
							"title": "graph 1",
							"valueField": "column-1"
						}
					],
					"guides": [],
					"valueAxes": [],
					"allLabels": [],
					"balloon": {},
					"titles": [
						{
							"id": "Title-1",
							"size": 15,
							"text": "Tempo Médio de Resposta / Minutos"
						}
					],
					"dataProvider": d
				}
			);
}

function updateGraphicAreaAverageResponseTime2(d){
	AmCharts.makeChart("average-response-time2",
				{
					"type": "serial",
					"categoryField": "date",
					"columnSpacing": 3,
					"dataDateFormat": "YYYY-MM-DD",
					"autoMarginOffset": 15,
					"marginBottom": 5,
					"marginLeft": 5,
					"marginTop": 5,
					"zoomOutButtonPadding": 4,
					"colors": [
						"#23B4AE",
						"#2D2833",
						"#EDEDED"
					],
					"sequencedAnimation": false,
					"fontSize": 9,
					"theme": "dark",
					"usePrefixes": true,
					"categoryAxis": {
						"parseDates": true
					},
					"chartCursor": {
						"enabled": true,
						"animationDuration": 0.1,
						"bulletSize": 4,
						"categoryBalloonAlpha": 0.85,
						"tabIndex": 0,
						"valueLineAlpha": 0.58,
						"valueLineBalloonEnabled": true
					},
					"chartScrollbar": {
						"enabled": true,
						"dragIcon": "dragIconRoundSmall",
						"dragIconHeight": 30,
						"dragIconWidth": 40
					},
					"trendLines": [],
					"graphs": [
						{
							"fillAlphas": 0.7,
							"id": "AmGraph-1",
							"lineAlpha": 0,
							"title": "graph 1",
							"valueField": "column-1"
						}
					],
					"guides": [],
					"valueAxes": [],
					"allLabels": [],
					"balloon": {},
					"titles": [
						{
							"id": "Title-1",
							"size": 15,
							"text": "Tempo Médio de Resposta / Minutos"
						}
					],
					"dataProvider": d
				}
			);
}




//map

function updateGraphicMap(d){
// map.dataProvider.zoomLevel = map.zoomLevel();
 //  	map.dataProvider.zoomLatitude  = map.zoomLatitude();
 //  	map.dataProvider.zoomLongitude  = map.zoomLongitude();
  	// console.log(map.dataProvider);


	map = AmCharts.makeChart("graphic-map",{
					// "initialZoomLevel": mapZoom,
					// "initialZoomLongitude": mapLong,
					// "initialZoomLatitude": mapLati,
					"type": "map",
					"theme": "dark",
					// "pathToImages": "http://www.amcharts.com/lib/3/images/",
					"addClassNames": true,
					"fontSize": 15,
					// "colorSteps": 10,
					"color": "#FFFFFF",
					"projection": "mercator",
					"backgroundColor": "rgba(69,69,69,1)",
					"dataProvider": {
						"map": "portugalHegh",
						"getAreasFromMap": true,
						
					},
					"balloon": {
						"horizontalPadding": 15,
						"borderAlpha": 0,
						"borderThickness": 1,
						"verticalPadding": 15
					},
					"areasSettings": {
						"color": "rgba(175,175,175,1)",
						"outlineColor": "rgba(69,69,69,1)",
						"rollOverOutlineColor": "rgba(69,69,69,1)",
						"rollOverBrightness": 20,
						"selectedBrightness": 20,
						"selectable": true,
						"unlistedAreasAlpha": 0,
						"unlistedAreasOutlineAlpha": 0
					},
					"imagesSettings": {
						"alpha": 1,
						"color": "rgba(175,175,175,1)",
						"outlineAlpha": 0,
						"rollOverOutlineAlpha": 0,
						"outlineColor": "rgba(69,69,69,1)",
						"rollOverBrightness": 20,
						"selectedBrightness": 20,
						"selectable": true
					},
					"linesSettings": {
						"color": "rgba(175,175,175,1)",
						"selectable": true,
						"rollOverBrightness": 20,
						"selectedBrightness": 20
					},
					"zoomControl": {
						"zoomControlEnabled": true,
						"homeButtonEnabled": true,
						"panControlEnabled": false,
						"left": 30,
						"bottom": 30,
						"minZoomLevel": 0.25,
						"gridHeight": 100,
						"gridAlpha": 0.1,
						"gridBackgroundAlpha": 0,
						"gridColor": "#FFFFFF",
						"draggerAlpha": 1,
						"buttonCornerRadius": 2
					}, 
					"dataProvider": {
					    "map": "portugalHigh",
					    "getAreasFromMap": true,
					    "images": d,
					    "getAreasFromMap": true
			    // "linkToObject": "PT"
			  },
			  "areasSettings": {
			    "autoZoom": true,
			    "selectedColor": "#e74c3c"
			  }
			  // "smallMap": {}
			}
			);
		// map.zoomDuration=0.3;
		// map.initialZoomLevel = 20;
		// map.initialZoomLongitude=-7;
		// map.initialZoomLatitude = 38;
		// console.log({"map.initialZoomLevel": map.initialZoomLevel, "map.initialZoomLongitude":map.initialZoomLongitude,"map.initialZoomLatitude":map.initialZoomLatitude});

		


	// 	map.zoomToLongLat(map.initialZoomLevel, map.initialZoomLongitude, map.initialZoomLatitude);

	// 	map.addListener("click", function(event) {
	// 	  // find out the coordinates of under mouse cursor
	// 	  var info = event.chart.getDevInfo();
	// 	  console.log({
	// 	    "latitude": info.latitude,
	// 	    "longitude": info.longitude,
	// 	    "zoom": info.zoomLevel
	// 	  });
	// 	  // atitude":38.9702,"longitude":-7.8716}
	  
		// });


	map.clickedObject = false;
	map.clickedObjectTimeout = false;
	map.addListener("clickMapObject", function(event) {
  if (false !== map.clickedObject && map.clickedObject === event.mapObject) {
    // doubleckick
    map.clickedObject = false;

	mapLong = map.zLongTemp;
	mapLati = map.zLatTemp;
 	mapZoom = map.zLevelTemp;

 	uploadDataProvider(false);

    // alert('doubleclick');
  } else {
    clearTimeout(map.clickedObjectTimeout);
    map.clickedObject = event.mapObject;
    map.clickedObjectTimeout = setTimeout(function() {
      map.clickedObject = false;
    }, 500);
  }
});
}



