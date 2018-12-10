// // set the dimensions and margins of the graph
// var marginLine = {top: 2, right: 5, bottom: 2, left: 5},
//     widthLine = $(window).width() - marginLine.left - marginLine.right,
//     heightLine = 40 - marginLine.top - marginLine.bottom;

// // parse the date / time
// var parseTimeLine = d3.timeParse("%d-%b-%y");

// // set the ranges
// var xLine = d3.scaleTime().range([0, widthLine]);
// var yLine = d3.scaleLinear().range([heightLine, 0]);

// // define the line
// var valueline = d3.line()
//     .x(function(d) { return x(d.date); })
//     .y(function(d) { return y(d.close); });

// // append the svg obgect to the body of the page
// // appends a 'group' element to 'svg'
// // moves the 'group' element to the top left margin
// var svgLine = d3.select(".time-line").append("svg")
//     .attr('class', 'time-line-graphic')
//     .attr("width", widthLine + marginLine.left + marginLine.right)
//     .attr("height", heightLine + marginLine.top + marginLine.bottom)
//   .append("g")
//     .attr("transform",
//           "translate(" + marginLine.left + "," + marginLine.top + ")");

// // Get the data
// d3.csv("js/data.csv", function(error, data) {
//   if (error) throw error;

//   // format the data
//   data.forEach(function(d) {
//       d.date = parseTimeLine(d.date);
//       d.close = +d.close;
//   });

//   // Scale the range of the data
//   xLine.domain(d3.extent(data, function(d) { return d.date; }));
//   yLine.domain([0, d3.max(data, function(d) { return d.close; })]);

//   // Add the valueline path.
//   svgLine.append("path")
//       .data([data])
//       .attr("class", "line")
//       .attr("d", valueline);

//   // Add the X Axis
//   // svg.append("g")
//   //     .attr("transform", "translate(0," + height + ")")
//   //     .call(d3.axisBottom(x));

//   // // Add the Y Axis
//   // svg.append("g")
//   //     .call(d3.axisLeft(y));

// });