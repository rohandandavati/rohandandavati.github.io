
// set dimensions margins of graph
var margin_conf = {top: 10, right: 10, bottom: 30, left: 60},
    width = 660 - margin_conf.left - margin_conf.right,
    height = 400 - margin_conf.top - margin_conf.bottom;

// append svg object to body
var svg_conf = d3.select("#conf-interval")
  .append("svg")
    .attr("width", width + margin_conf.left + margin_conf.right)
    .attr("height", height + margin_conf.top + margin_conf.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin_conf.left + "," + margin_conf.top + ")");

//Read data
//need to spin up server to read locally 
// d3.csv("file.csv",function(data) {
d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_IC.csv",function(data) {


    // Add X axis
    var x = d3.scaleLinear()
      .domain([1,100])
      .range([ 0, width ]);
    svg_conf.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, 13])
      .range([ height, 0 ]);
    svg_conf.append("g")
      .call(d3.axisLeft(y));

    // Show confidence interval
    svg_conf.append("path")
      .datum(data)
      .attr("fill", "#cce5df")
      .attr("stroke", "none")
      .attr("d", d3.area()
        .x(function(d) { return x(d.x) })
        .y0(function(d) { return y(d.CI_right) })
        .y1(function(d) { return y(d.CI_left) })
        )

    // Add the line
    svg_conf
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.x) })
        .y(function(d) { return y(d.y) })
        )

})

// set the dimensions and margins of the graph
var margin_cases = {top: 10, right: 30, bottom: 30, left: 40},
    width = 460 - margin_cases.left - margin_cases.right,
    height = 400 - margin_cases.top - margin_cases.bottom;

// append the svg object to the body of the page
var svg_cases = d3.select("#cases")
  .append("svg")
    .attr("width", width + margin_cases.left + margin_cases.right)
    .attr("height", height + margin_cases.top + margin_cases.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin_cases.left + "," + margin_cases.top + ")");

// get the data
d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/1_OneNum.csv", function(data) {

  // X axis: scale and draw:
  var x = d3.scaleLinear()
      .domain([0, 1000])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
      .range([0, width]);
  svg_cases.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // set the parameters for the histogram
  var histogram = d3.histogram()
      .value(function(d) { return d.price; })   // I need to give the vector of value
      .domain(x.domain())  // then the domain of the graphic
      .thresholds(x.ticks(70)); // then the numbers of bins

  // And apply this function to data to get the bins
  var bins = histogram(data);

  // Y axis: scale and draw:
  var y = d3.scaleLinear()
      .range([height, 0]);
      y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
  svg_cases.append("g")
      .call(d3.axisLeft(y));

  // append the bar rectangles to the svg element
  svg_cases.selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
        .attr("height", function(d) { return height - y(d.length); })
        .style("fill", "#69b3a2")

});









// set the dimensions and margins of the graph
var margin_deaths = {top: 10, right: 30, bottom: 30, left: 40},
    width = 460 - margin_deaths.left - margin_deaths.right,
    height = 400 - margin_deaths.top - margin_deaths.bottom;

// append the svg object to the body of the page
var svg_deaths = d3.select("#deaths")
  .append("svg")
    .attr("width", width + margin_deaths.left + margin_deaths.right)
    .attr("height", height + margin_deaths.top + margin_deaths.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin_deaths.left + "," + margin_deaths.top + ")");

// get the data
d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/1_OneNum.csv", function(data) {

  // X axis: scale and draw:
  var x = d3.scaleLinear()
      .domain([0, 1000])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
      .range([0, width]);
  svg_deaths.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // set the parameters for the histogram
  var histogram = d3.histogram()
      .value(function(d) { return d.price; })   // I need to give the vector of value
      .domain(x.domain())  // then the domain of the graphic
      .thresholds(x.ticks(70)); // then the numbers of bins

  // And apply this function to data to get the bins
  var bins = histogram(data);

  // Y axis: scale and draw:
  var y = d3.scaleLinear()
      .range([height, 0]);
      y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
  svg_deaths.append("g")
      .call(d3.axisLeft(y));

  // append the bar rectangles to the svg element
  svg_deaths.selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
        .attr("height", function(d) { return height - y(d.length); })
        .style("fill", "#69b3a2")

});