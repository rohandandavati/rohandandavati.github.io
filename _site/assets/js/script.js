 /* global d3 */
   /* global $ */
   /*global moment*/
       
   
   let binarySearch = function (arr, x) { 
   
    let start=0, end=arr.length-1; 
          
    // Iterate while start not meets end 
    while (start<=end){ 
  
        // Find the mid index 
        let mid=Math.floor((start + end)/2); 
   
        // If element is present at mid, return True 
        if ( (arr[mid].date).getTime() ===x) return mid; 
  
        // Else look in left or right half accordingly 
        else if ((arr[mid].date).getTime() < x)  
             start = mid + 1; 
        else
             end = mid - 1; 
    } 
   
    return -1; 
}
   
   
   
   $(document).ready(function(){
      $(this).scrollTop(0);
      // myFunction();
   }); 

   
   function LightenDarkenColor(col,amt) {
      var usePound = false;
      if ( col[0] == "#" ) {
         col = col.slice(1);
         usePound = true;
      }
      var num = parseInt(col,16);
      
      var r = (num >> 16) + amt;
      if ( r > 255 ) r = 255;
      else if  (r < 0) r = 0;
      
      var b = ((num >> 8) & 0x00FF) + amt;
      if ( b > 255 ) b = 255;
      else if  (b < 0) b = 0;
      
      var g = (num & 0x0000FF) + amt;
      if ( g > 255 ) g = 255;
      else if  ( g < 0 ) g = 0;
      
      return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
   }
   
   var hexColors = ["#8f8f8f", "#BA7FB7","#89D0C5", "#F9B554", "#DCC29C", "#BDB9DC", "#F47F6E", "#7FADDD", "#B3D560", "#F9C7DD", "#EACB44", "#BA3E39"] 
   
   var mapFill = ["#505050", "#743971", "#438a7f", "#b36f0e", "#967c56", "#777396", "#ae3928", "#396797", "#6d8f1a", "#b38197", "#a48500", "#740000"]

   var hexColorsLight = ["#a0a0a0", "#c08bbe","#94d4ca", "#f9bc65", "#dfc8a5", "#c3c0df", "#f58b7c", "#8bb5e0", "#bad96f", "#f9cce0", "#ecd056", "#c0514c"]

   var hexColorsLighter = ["#ababab", "#c798c5","#a0d9d0", "#fac376", "#e3ceaf", "#cac7e3", "#f6988b", "#98bde3", "#c2dd7f", "#fad2e3", "#eed569", "#c76460"]

   var hexColorsLightest = ["#b5b5b5", "#cea5cc","#acded6", "#facb87", "#e6d4b9", "#d0cee6", "#f7a599", "#a5c5e7", "#c9e18f", "#fad7e7", "#f0da7c", "#ce7774"]
   
      var personsVaccineColors = ["#8f8f8f", "#BA7FB7","#89D0C5", "#facb87", "#e6d4b9", "#d0cee6", "#f7a599", "#a5c5e7", "#c9e18f", "#fad7e7", "#f0da7c", "#ce7774"]
   

   var firstIteration = true;
   
   let allGroup = ["illinois", "covidregion_1", "covidregion_2", "covidregion_3", 
                   "covidregion_4", "covidregion_5", "covidregion_6", "covidregion_7", 
                   "covidregion_8", "covidregion_9", "covidregion_10", "covidregion_11"]

     d3.select("#selectButton")
    .selectAll('myOptions')
    .data(allGroup)
    .enter()
    .append('option')
    .text(function (d) { 
                         if(d == "illinois" ||d == "Illinois" ) {
                              return "Illinois";
                          }
                          d = "Region " + d.substring( d.indexOf('_')+1);
                          return d; 
                        })
    .attr("value", function (d) { return d; })
    .attr("class", "dropdown-item")
    
    var mapFillColor = d3.scaleOrdinal().domain(allGroup)
     .range(mapFill)
     
    var colors = d3.scaleOrdinal().domain(allGroup)
     .range(hexColors)
     
   var lightColors = d3.scaleOrdinal().domain(allGroup)
     .range(hexColorsLight)
     
   var lighterColors = d3.scaleOrdinal().domain(allGroup)
     .range(hexColorsLighter)
     
   var lightestColors = d3.scaleOrdinal().domain(allGroup)
     .range(hexColorsLightest)
  
      var darkerColor = d3.scaleOrdinal().domain(allGroup)
     .range(hexColors)
     
   
   
   var margin_rt = {top: 10, right: 75, bottom: 50, left: 35};
   var margin_cases = {top: 10, right: 20, bottom: 30, left: 50};
   var margin_deaths = {top: 10, right: 20, bottom: 30, left: 40};
   var margin_test_pos = {top: 10, right: 20, bottom: 30, left: 60};
   var margin_tests = {top: 30, right: 20, bottom: 30, left: 50};
   
   var svg_rt = d3.select("#rt_chart").append("svg")    
   .style("fill", "none")
    .style("pointer-events", "all")

   
   var x_rt = d3.scaleTime();
   var x_rtNU = d3.scaleTime();
   var x_rt_band = d3.scaleBand();
   var x_rt_axis = svg_rt.append("g");
   var y_rt = d3.scaleLinear();
   var y_rt_axis = svg_rt.append("g");
   
   var interval_rt = svg_rt
   .append("path")
   .attr("stroke", "none")
   
   var line_rt = svg_rt
      .append('g')
      .append("path")
      .style("stroke-width", 2)
      .style("fill", "none");
      
   var interval_rt2 = svg_rt
   .append("path")
      .attr("stroke", "none")
      
      
   var interval_rt3 = svg_rt.append("path")
      .attr("stroke", "none")
      
      var interval_rt4 = svg_rt.append("path")
      .attr("stroke", "none")
   
   var line_rt2 = svg_rt.append('g').append("path") 
      .style("stroke-width", 2)
      .style("fill", "none");
      
         var line_rt3 = svg_rt.append('g').append("path") 
      .style("stroke-width", 2)
      .style("fill", "none");
      
      
      var line_rt4 = svg_rt.append('g').append("path")  
      .style("stroke-width", 2)
      .style("fill", "none");
   
   var dataFilter = null; 
   
   var svg_deaths = d3.select("#deaths_chart").append("svg")
	var svg_map = d3.select("#cases_map").append("svg")
	var svg_cases = d3.select("#cases_chart").append("svg")
	var svg_test_pos = d3.select("#test_pos").append("svg")
	   .style("fill", "none")
    .style("pointer-events", "all")
    
	var svg_tests = d3.select("#tests").append("svg")
	
	var svg_vac = d3.select("#vaccine").append("svg")
	var svg_cli = d3.select("#cli").append("svg")

	 // This allows to find the closest X index of the mouse:
  var bisect = d3.bisector(function(d) { return d.date; }).left;
var bisectCDT = d3.bisector(function(d) { return d.date; }).left;

var Tooltip = d3.select("#rt_chart")
    .append("div")
    .attr("class", "tooltip")
       .attr("id", "line_tooltip")

var grid_rt = svg_rt.append("g")

var grid_cases = svg_cases.append("g")
var grid_vac = svg_vac.append("g")
var grid_cli = svg_cli.append("g")

var grid_test_pos = svg_test_pos.append("g")
var grid_tests = svg_tests.append("g")
var grid_deaths = svg_deaths.append("g")

var lineLabel1 = svg_rt.append("text")   

var lineLabel2 = svg_rt.append("text")

var lineLabel3 = svg_rt.append("text")

var lineLabel4 = svg_rt.append("text")

 var focus = svg_rt.append("g")
         .append('line')
         
 var refLine = svg_rt.append("g")
         .append('line')
         
 var circle_UC = svg_rt.append("g")
         .append('circle')
         
 var circle_NU = svg_rt.append("g")
         .append('circle')
         
var circle_UIUC = svg_rt.append("g")
         .append('circle')
         
var circle_ANL = svg_rt.append("g")
         .append('circle')
 
  var dot_UC = svg_rt.append("g")
         .append('circle')
         
 var dot_NU = svg_rt.append("g")
         .append('circle')
         
var dot_UIUC = svg_rt.append("g")
         .append('circle')
         
var dot_ANL = svg_rt.append("g")
         .append('circle')

 var focus_test_pos = d3.select("#test_pos")
    .append('g')
    .append('circle')
      .style("fill", "none")
      .attr("stroke", "black")
      .attr('r', 4.5)
      .style("opacity", 0)
      .attr("transform", "translate("+ margin_cases.left +","+ margin_cases.top  + ")"  );

var Tooltip_test_pos = d3.select("#test_pos")
    .append("div")
    .attr("class", "tooltip s")
   
var projection = d3.geoAlbers()
var path = d3.geoPath()

var selectedRegion = 'illinois';

var x_cases = d3.scaleBand()
var y_cases = d3.scaleLinear()

var x_axis = svg_cases.append("g")
var y_axis = svg_cases.append("g")

var x_deaths= d3.scaleBand()
var y_deaths = d3.scaleLinear()

var x_axis_deaths = svg_deaths.append("g")
var y_axis_deaths = svg_deaths.append("g")

var x_test_pos= d3.scaleTime()
var y_test_pos = d3.scaleLinear()

var x_axis_tests_pos = svg_test_pos.append("g")
var y_axis_tests_pos = svg_test_pos.append("g")

var x_tests= d3.scaleBand()
var y_tests = d3.scaleLinear()
var x_axis_tests = svg_tests.append("g")
var y_axis_tests = svg_tests.append("g")

var x_vac = d3.scaleBand()
var y_vac = d3.scaleLinear()
var x_axis_vac = svg_vac.append("g")
var y_axis_vac = svg_vac.append("g")


var x_cli = d3.scaleBand()
var y_cli = d3.scaleLinear()
var x_axis_cli = svg_cli.append("g")
var y_axis_cli = svg_cli.append("g")

// data start
var countyMap = {
    "ADAMS": {
       "covid_region": 3
    },
    "ALEXANDER": {
       "covid_region": 5
    },
    "BOND": {
       "covid_region": 4
    },
    "BOONE": {
       "covid_region": 1
    },
    "BROWN": {
       "covid_region": 3
    },
    "BUREAU": {
       "covid_region": 2
    },                   
    "CALHOUN": {
       "covid_region": 3
    },
    "CARROLL": {
       "covid_region": 1
    },
    "CASS": {
       "covid_region": 3
    },
    "CHAMPAIGN": {
       "covid_region": 6
    },
    "CHICAGO": {
       "covid_region": 11
    },
    "CHRISTIAN": {
       "covid_region": 3
    },
    "CLARK": {
       "covid_region": 6
    },
    "CLAY": {
       "covid_region": 6
    },
    "CLINTON": {
       "covid_region": 4
    },
    "COLES": {
       "covid_region": 6
    },
    "COOK": {
       "covid_region": 10
    },
    "CRAWFORD": {
       "covid_region": 6
    },
    "CUMBERLAND": {
       "covid_region": 6
    },
    "DE WITT": {
       "covid_region": 6
    },
    "DEKALB": {
       "covid_region": 1
    },
    "DOUGLAS": {
       "covid_region": 6
    },
    "DUPAGE": {
       "covid_region": 8
    },
    "EDGAR": {
       "covid_region": 6
    },
    "EDWARDS": {
       "covid_region": 5
    },
    "EFFINGHAM": {
       "covid_region": 6
    },
    "FAYETTE": {
       "covid_region": 6
    },
    "FORD": {
       "covid_region": 6
    },
    "FRANKLIN": {
       "covid_region": 5
    },
    "FULTON": {
       "covid_region": 2
    },
    "GALLATIN": {
       "covid_region": 5
    },
    "GREENE": {
       "covid_region": 3
    },
    "GRUNDY": {
       "covid_region": 2
    },
    "HAMILTON": {
       "covid_region": 5
    },
    "HANCOCK": {
       "covid_region": 3
    },
    "HARDIN": {
       "covid_region": 5
    },
    "HENDERSON": {
       "covid_region": 2
    },
    "HENRY": {
       "covid_region": 2
    },
    "IROQUOIS": {
       "covid_region": 6
    },
    "JACKSON": {
       "covid_region": 5
    },
    "JASPER": {
       "covid_region": 6
    },
    "JEFFERSON": {
       "covid_region": 5
    },
    "JERSEY": {
       "covid_region": 3
    },
    "JO DAVIESS": {
       "covid_region": 1
    },
    "JOHNSON": {
       "covid_region": 5
    },
    "KANE": {
       "covid_region": 8
    },
    "KANKAKEE": {
       "covid_region": 7
    },
    "KENDALL": {
       "covid_region": 2
    },
    "KNOX": {
       "covid_region": 2
    },
    "LAKE": {
       "covid_region": 9
    },
    "LASALLE": {
       "covid_region": 2
    },
    "LAWRENCE": {
       "covid_region": 6
    },
    "LEE": {
       "covid_region": 1
    },
    "LIVINGSTON": {
       "covid_region": 2
    },
    "LOGAN": {
       "covid_region": 3
    },
    "MACON": {
       "covid_region": 6
    },
    "MACOUPIN": {
       "covid_region": 3
    },
    "MADISON": {
       "covid_region": 4
    },
    "MARION": {
       "covid_region": 5
    },
    "MARSHALL": {
       "covid_region": 2
    },
    "MASON": {
       "covid_region": 3
    },
    "MASSAC": {
       "covid_region": 5
    },
    "MCDONOUGH": {
       "covid_region": 2
    },
    "MCHENRY": {
       "covid_region": 9
    },
    "MCLEAN": {
       "covid_region": 2
    },
    "MENARD": {
       "covid_region": 3
    },
    "MERCER": {
       "covid_region": 2
    },
    "MONROE": {
       "covid_region": 4
    },
    "MONTGOMERY": {
       "covid_region": 3
    },
    "MORGAN": {
       "covid_region": 3
    },
    "MOULTRIE": {
       "covid_region": 6
    },
    "OGLE": {
       "covid_region": 1
    },
    "PEORIA": {
       "covid_region": 2
    },
    "PERRY": {
       "covid_region": 5
    },
    "PIATT": {
       "covid_region": 6
    },
    "PIKE": {
       "covid_region": 3
    },
    "POPE": {
       "covid_region": 5
    },
    "PULASKI": {
       "covid_region": 5
    },
    "PUTNAM": {
       "covid_region": 2
    },
    "RANDOLPH": {
       "covid_region": 4
    },
    "RICHLAND": {
       "covid_region": 6
    },
    "ROCK ISLAND": {
       "covid_region": 2
    },
    "SALINE": {
       "covid_region": 5
    },
    "SANGAMON": {
       "covid_region": 3
    },
    "SCHUYLER": {
       "covid_region": 3 
    },
    "SCOTT": {
       "covid_region": 3
    },
    "SHELBY": {
       "covid_region": 6
    },
    "ST. CLAIR": {
       "covid_region": 4
    },
    "STARK": {
       "covid_region": 2
    },
    "STEPHENSON": {
       "covid_region": 1
    },
    "TAZEWELL": {
       "covid_region": 2
    },
    "UNION": {
       "covid_region": 5
    },
    "VERMILION": {
       "covid_region": 6
    },
    "WABASH": {
       "covid_region": 5
    },
    "WARREN": {
       "covid_region": 2
    },
    "WASHINGTON": {
       "covid_region": 4
    },
    "WAYNE": {
       "covid_region": 5
    },
    "WHITE": {
       "covid_region": 5
    },
    "WHITESIDE": {
       "covid_region": 1
    },
    "WILL": {
       "covid_region": 7
    },
    "WILLIAMSON": {
       "covid_region": 5
    },
    "WINNEBAGO": {
       "covid_region": 1
    },
    "WOODFORD": {
       "covid_region": 2
    },
    "ILLINOIS": {
       "covid_region": 0
    }
 }


var files = [
             'https://raw.githubusercontent.com/samhovie/sitefiles/main/il-counties.json', 
             'https://raw.githubusercontent.com/rohandandavati/rohandandavati.github.io/master/_data/rtNU.csv',
             'https://raw.githubusercontent.com/rohandandavati/rohandandavati.github.io/master/_data/rtUC.csv',
             'https://raw.githubusercontent.com/rohandandavati/rohandandavati.github.io/master/_data/rtUIUC.csv',
             'https://raw.githubusercontent.com/rohandandavati/rohandandavati.github.io/master/_data/rtANL.csv',
            'https://raw.githubusercontent.com/samhovie/proxy-api/main/CLI/GetResurgenceDataCLIAdmissions.json'
             ]
             
var idph_url = 'https://raw.githubusercontent.com/samhovie/proxy-api/main/VACCINE/'
var idph_test = 'https://raw.githubusercontent.com/samhovie/proxy-api/main/CDT/'
   
   
   Object.entries(countyMap).forEach(county => {
      files.push(idph_url + county[0] + '.json')
      files.push(idph_test + county[0] + '.json')
   })

var promises = [];
let today = new Date();

files.forEach(function(url) {
    if (url.slice(-1) === 'v'){
       promises.push(d3.csv(url))
    }else{
       promises.push(d3.json(url))
    }
});

Promise.all(promises).then(function(data) {

   

   var cdtRegions = []
   var vaccineRegions = []
   var rtArrs = []
   var cliArr = []


for (var i = 0; i < 12; ++i) {
   cdtRegions.push([])
   vaccineRegions.push([])
}   
   
   data.forEach((datum, i) => {
       
      if (datum.VaccineAdministration) {
         
         var len = (datum.VaccineAdministration).length
         for (var i = 1; i < len; ++i) {
            
            
            var region = countyMap[((datum.VaccineAdministration)[i].CountyName).toUpperCase()].covid_region
            var date = moment((datum.VaccineAdministration)[i].Report_Date).toDate()
            var AdministeredCount = (datum.VaccineAdministration)[i].AdministeredCount
            var AdministeredCountChange = (datum.VaccineAdministration)[i].AdministeredCount - (datum.VaccineAdministration)[i-1].AdministeredCount
            var PersonsFullyVaccinated = (datum.VaccineAdministration)[i].PersonsFullyVaccinated
            var PersonsFullyVaccinatedChange = (datum.VaccineAdministration)[i].PersonsFullyVaccinated - (datum.VaccineAdministration)[i-1].PersonsFullyVaccinated
            
            if(AdministeredCountChange < 0) {
               AdministeredCountChange = 0
            }
            if (PersonsFullyVaccinatedChange < 0) {
               PersonsFullyVaccinatedChange = 0
            }
            
            var dateTime = date.getTime()
            if (vaccineRegions[region].length > 0 && dateTime <= (vaccineRegions[region][vaccineRegions[region].length-1].date).getTime() ) {
               var find = binarySearch(vaccineRegions[region], dateTime)
               
                if (find !== -1){
                  AdministeredCount += vaccineRegions[region][find].AdministeredCount
                  AdministeredCountChange += vaccineRegions[region][find].AdministeredCountChange
                  PersonsFullyVaccinated += vaccineRegions[region][find].PersonsFullyVaccinated
                  PersonsFullyVaccinatedChange += vaccineRegions[region][find].PersonsFullyVaccinatedChange
                  
                  vaccineRegions[region][find].AdministeredCount = AdministeredCount
                  vaccineRegions[region][find].AdministeredCountChange = AdministeredCountChange
                  vaccineRegions[region][find].PersonsFullyVaccinated = PersonsFullyVaccinated
                  vaccineRegions[region][find].PersonsFullyVaccinatedChange = PersonsFullyVaccinatedChange
                  
               }
               
            } 
            else {
               vaccineRegions[region].push({
                  date: date,
                  AdministeredCount:  AdministeredCount,
                  AdministeredCountChange: AdministeredCountChange,
                  PersonsFullyVaccinated: PersonsFullyVaccinated,
                  PersonsFullyVaccinatedChange: PersonsFullyVaccinatedChange
               });
               
            }
         }
      }
      
      else if (typeof datum.values  === 'object'){


         
         var len = (datum.values).length
         for (var i = 1; i < len; ++i) {
            
           
            var date = moment((datum.values)[i].ReportDate).toDate();

            var dateTime = date.getTime()
            
            var region = countyMap[((datum.values)[i].CountyName).toUpperCase()].covid_region
            var cases_change = (datum.values)[i].CumulativeCases - (datum.values)[i-1].CumulativeCases
            var deaths_change =  (datum.values)[i].Deaths - (datum.values)[i-1].Deaths
            var tested_change =  (datum.values)[i].TotalTested - (datum.values)[i-1].TotalTested
            var test_positivity = cases_change / tested_change


            
            //check for invalids 
            if(cases_change < 0) {
               cases_change = 0
            }
            if(deaths_change < 0) {
               deaths_change = 0
            }
            if(tested_change <= 0) {
               tested_change = 0
               test_positivity = 0
            }
            if (test_positivity < 0) {
               test_positivity = 0;
            }
            if (tested_change > 200000 || dateTime === moment('2020-05-04', 'YYYY-MM-DD').valueOf()) {
               tested_change = 0
            }
            
            //if date is less than last date in array -- date is likely in array
            // var dateTime = date.getTime()
            if (cdtRegions[region].length > 0 && dateTime < (cdtRegions[region][cdtRegions[region].length-1].date).getTime() ) {
               
               
               //search for date
               var find = binarySearch(cdtRegions[region], dateTime)
            //    if found
            // console.log(date)
               if (find !== -1  ){
                  cases_change += cdtRegions[region][find].confirmed_cases_change
                  deaths_change += cdtRegions[region][find].deaths_change
                  tested_change += cdtRegions[region][find].tested_change
                  test_positivity = cases_change / tested_change
                        
                  //check for invalids 
                  if(cases_change < 0) {
                     cases_change = 0
                  }
                  if(deaths_change < 0) {
                     deaths_change = 0
                  }
                  if(tested_change <= 0) {
                     tested_change = 0
                     test_positivity = 0
                  }
            
                  cdtRegions[region][find].confirmed_cases_change = cases_change
                  cdtRegions[region][find].deaths_change = deaths_change
                  cdtRegions[region][find].tested_change = tested_change
                  cdtRegions[region][find].test_positivity = test_positivity
                  
               }
               
            } else {
               
               cdtRegions[region].push({
                  date: date,
                  confirmed_cases_change:  cases_change,
                  deaths_change: deaths_change,
                  tested_change: tested_change,
                  test_positivity: test_positivity
               });
            }
         }
      }
      else if ((typeof(datum.values)).localeCompare('function') === 0){
        
         var title = files[i].slice(files[i].lastIndexOf('/') + 1 )
         if ((title).localeCompare('rtUIUC.csv') === 0 ) {
            datum = datum.filter(function(d) { return (d.scenario_name).localeCompare('baseline') === 0 })
         }
         if ((title).localeCompare("GetResurgenceDataCLIAdmissions.json") === 0 ) {
            cliArr = datum
            
         } else {
         rtArrs.push({title: title, data: datum })
         }
      } else {
         return;
      }
   })

      
const POINTS_AVERAGE = 6;
   cdtRegions.forEach(region => {
      
      
      var len = region.length
      for (var i = 0; i < len; ++i ){
         
         
         
         var cases_r = 0
         var deaths_r = 0
         var tests_r = 0
         var test_pos_r = 0
         var cases_avg = 0
         var deaths_avg = 0
         var test_pos_avg = 0
         var tests_avg = 0;
         
         for (let j = 0; j <= POINTS_AVERAGE; j++) {
         
         if (i - j >= 0 ){
            cases_avg += region[i - j].confirmed_cases_change;
            deaths_avg += region[i - j].deaths_change;
            tests_avg += region[i - j].tested_change;
            test_pos_avg += region[i - j].test_positivity;
            cases_r = Math.floor(cases_avg / (j + 1));
            deaths_r = Math.floor(deaths_avg / (j + 1));
            tests_r = Math.floor(tests_avg / (j + 1));
            test_pos_r = test_pos_avg / (j + 1);
          } else {
             cases_r = Math.floor(cases_avg / j);
             deaths_r = Math.floor(deaths_avg / j);
             tests_r = Math.floor(tests_avg / j);
             test_pos_r = test_pos_avg / j;
             j = POINTS_AVERAGE + 1;
          }
         }
         region[i].cases_avg = cases_r;
         region[i].deaths_avg = deaths_r;
         region[i].test_pos_avg = test_pos_r;
         region[i].tests_avg = tests_r;
      }
   })
   
   
   vaccineRegions.forEach(region => {
      
      
      var len = region.length
      for (var i = 0; i < len; ++i ){
         
         
         
         var persons_fully_r = 0
         var doses_admin_r = 0
         var persons_fully_avg = 0
         var doses_admin_avg = 0
         
         for (let j = 0; j <= POINTS_AVERAGE; j++) {
        
         if (i - j >= 0 ){
            persons_fully_avg += region[i - j].PersonsFullyVaccinatedChange;
            doses_admin_avg += region[i - j].AdministeredCountChange;
            persons_fully_r = Math.floor(persons_fully_avg / (j + 1));
            doses_admin_r = Math.floor(doses_admin_avg / (j + 1));
          } else {
             persons_fully_r = Math.floor(persons_fully_avg / j);
             doses_admin_r = Math.floor(doses_admin_avg / j);
             j = POINTS_AVERAGE + 1;
          }
         }
         region[i].persons_fully_avg = persons_fully_r;
         region[i].doses_admin_avg = doses_admin_r;
      }
   })
   

   
   let parseDate3 = d3.timeParse("%m/%d/%Y");
    let parseDate2 = d3.timeParse("%Y-%m-%d");
   
   
   var prev_day = moment(cliArr[0].reportDate).valueOf()
   var dayTotal = 0;
   
   //if date is new, push prev day, add current day to sum
   cliArr.forEach(datum => {
      //init datum date
      datum.reportDate = moment(datum.reportDate).toDate()
      //if current day is diff from prev day
      if ((datum.reportDate).getTime() != prev_day) {
         cliArr.push({
            CLIAdmissionsRA: dayTotal,
            regionDescription: 'Illinois',
            regionID: 0,
            reportDate: new Date(prev_day)
         })
         dayTotal = 0;
         prev_day = (datum.reportDate).getTime()
      }
      //add datum cli to sum
      dayTotal += datum.CLIAdmissionsRA
   })


moment.suppressDeprecationWarnings = true;

//parse rtArrs
rtArrs.forEach(obj => {
   (obj.data).forEach(datum => {
      for (var [key, value]  of Object.entries(datum)) {
         if (!isNaN(datum[key]) && !isNaN(parseFloat(datum[key]))) {
            datum[key] = +datum[key]
         } else if ( moment(datum[key] ).isValid() ) {
            datum[key] = moment(datum[key], ['YYYY-MM-DD', 'MM/DD/YYYY']).toDate()
            if (key[0] === 'D') {
               datum['date'] = datum['Date']
               delete datum['Date']
            }
         }
      }
   })
})

var rtStart  =  moment('2020-4-1', 'YYYY-MM-DD').valueOf()
var indx = 0;
rtArrs.forEach(obj => {
   
   indx = (obj.data).length-1
   
   
   var mod_date;
   if ((obj.data)[indx].model_date !== undefined) {
      mod_date = ((obj.data)[indx].model_date).getTime();
   } else {
      
      mod_date = today.getTime();
    
   }
   
   
   while(indx >= 0 ){
      var time = ((obj.data)[indx].date).getTime()
      
      if( time < rtStart || time > mod_date) {
         (obj.data).splice(indx, 1)
      }
      --indx;
   }
})

      document.getElementById("loader").style.display = "none";
      document.getElementById("loader_container").style.display = "none";
      
    //   document.getElementById("loader_container").style.display = "none";
      window.onload = function() {

        document.getElementById("main_nav").style.display = "block";
      }
      var content_divs = document.getElementsByClassName( 'content' );
      [].slice.call( content_divs ).forEach(function ( div ) {
         div.style.display = 'block'
      });

function drawChart() {
   
   let selectToRegion = {};
      selectToRegion["illinois"] = 0
      selectToRegion["covidregion_1"] = 1
      selectToRegion["covidregion_2"] = 2
      selectToRegion["covidregion_3"] = 3
      selectToRegion["covidregion_4"] = 4
      selectToRegion["covidregion_5"] = 5
      selectToRegion["covidregion_6"] = 6
      selectToRegion["covidregion_7"] = 7
      selectToRegion["covidregion_8"] = 8
      selectToRegion["covidregion_9"] = 9
      selectToRegion["covidregion_10"] = 10
      selectToRegion["covidregion_11"] = 11

      var currentWidth = document.getElementById("rt_chart").offsetWidth;
      
      const width_rt = currentWidth - margin_rt.left - margin_rt.right;
      let height_rt = parseInt(currentWidth * 0.35 ) - margin_rt.top - margin_rt.bottom;

      if (parseInt(currentWidth) < 600) {
         height_rt = parseInt(currentWidth * .58) - margin_rt.top - margin_rt.bottom;
      }
      else if (parseInt(currentWidth) < 900) {
         height_rt = parseInt(currentWidth * .42) - margin_rt.top - margin_rt.bottom;
      }

      currentWidth = document.getElementById("cases_chart").offsetWidth;
      const width_cases = currentWidth- margin_cases.left - margin_cases.right;
      let height_cases = parseInt(currentWidth * 0.35 ) - margin_cases.top - margin_cases.bottom;
      
      if (parseInt(currentWidth) < 600) {
         height_cases = parseInt(currentWidth * .60) - margin_cases.top - margin_cases.bottom;
      }
      else if (parseInt(currentWidth) < 900) {
         height_cases = parseInt(currentWidth * .42) - margin_cases.top - margin_cases.bottom;
      }
      
      
   var map_wid = document.getElementById("cases_map").offsetWidth;
   var map_hid = map_wid *2;

   var tip_map = d3.tip()
                   .attr('class', 'd3-tip')
                   .offset([-10, 0])
                   .html(function(d) {
                     return "County: <span style='color:red'>" + d.properties.COUNTY_NAM + "</span> <br></br>" + 
                     "Region:<span style='color:red'> " + countyMap[d.properties.COUNTY_NAM].covid_region + "</span> " ;
                  })
  
   Array.prototype.forEach.call(document.querySelectorAll('.d3-tip'), (t) => t.parentNode.removeChild(t));
      
   svg_map.attr("width", map_wid )
	       .attr("height", map_hid)
	       
	 svg_map.call(tip_map)
	       
   projection.rotate([89.5,0]).fitWidth(map_wid, data[0]);
   
   path.projection(projection);
  
   svg_map.append("g")
   
       var map = svg_map.selectAll("path")
       .data(data[0].features)
       
       map.enter()
       .append("path")
       .merge(map)
       .attr( "d", path )
       .attr("fill", function(d){ 
         if (selectedRegion.localeCompare("illinois") === 0) {
            return colors(allGroup[countyMap[d.properties.COUNTY_NAM].covid_region])
         } else {
             if (countyMap[d.properties.COUNTY_NAM].covid_region === parseInt(selectedRegion.split('_')[1])) {
                   return colors(allGroup[countyMap[d.properties.COUNTY_NAM].covid_region]) 
            } else {
                     return "#7E7E7E" 
            }
         }
      })
      .attr("stroke", function(d){ 
           if (selectedRegion.localeCompare("illinois") === 0) {
               return mapFillColor(allGroup[countyMap[d.properties.COUNTY_NAM].covid_region])
            } else {
           if (
             countyMap[d.properties.COUNTY_NAM].covid_region ===
             parseInt(selectedRegion.split('_')[1])) {
            } else {
               return "#AAAAAA" 
            }
         }
      }) 
      .on('mouseover', tip_map.show)
      .on('mouseout', tip_map.hide)
      .on('click', function(d) {
         // tip_map.hide
         if (selectedRegion.localeCompare(allGroup[countyMap[d.properties.COUNTY_NAM].covid_region]) === 0 ) {
            selectedRegion = 'illinois'
         } else {
            selectedRegion = allGroup[countyMap[d.properties.COUNTY_NAM].covid_region]
         }
         d3.select('#selectButton').property('value', selectedRegion);
         drawChart()
    })
      
   map
   .exit()
   .remove()
   
   var dataNU = (rtArrs.filter(function(d) { return (d.title).localeCompare('rtNU.csv') === 0})[0].data)
               .filter(function(d){return d.geography_modeled==selectedRegion}) 
               
   var dataUC = (rtArrs.filter(function(d) { return (d.title).localeCompare('rtUC.csv') === 0})[0].data)
               .filter(function(d){return d.geography_modeled==selectedRegion}) 
               
   var dataUIUC = (rtArrs.filter(function(d) { return (d.title).localeCompare('rtUIUC.csv') === 0})[0].data)
               .filter(function(d){return d.geography_modeled==selectedRegion}) 
               
   var dataANL = (rtArrs.filter(function(d) { return (d.title).localeCompare('rtANL.csv') === 0})[0].data)

    var data_map = cdtRegions[selectToRegion[selectedRegion]]
    console.log(data_map)
       
   var vaccineData = vaccineRegions[selectToRegion[selectedRegion]]
   
   
   var cliData = cliArr.filter(function(d){return d.regionID===selectToRegion[selectedRegion]})
   var formatDate = d3.timeFormat("%b %d")

 
var mousemove = function(d) {
   
   var formatTime = d3.timeFormat("%b %d");
   var x0 = x_rt.invert(d3.mouse(this)[0]);
   
   var i = bisect(dataUC, x0, 1);
   var j = bisect(dataNU, x0, 1);
   var k = bisect(dataUIUC, x0, 1);
   var l = bisect(dataANL, x0, 1);
   
   var selectedDataUC = dataUC[i];
   var selectedDataNU = dataNU[j];
   var selectedDataUIUC = dataUIUC[k];
   var selectedDataANL = dataANL[l];
    
   focus
      .attr("x1", x_rt(x0)) 
      .attr("y1", 0)
      .attr("x2", x_rt(x0)) 
      .attr("y2", height_rt)
      
   var strHTML = formatDate(x0) + '<br>';
      
   if (typeof selectedDataUC !== 'undefined') {
      circle_UC
         .attr("cx", x_rt(x0))
         .attr("cy", y_rt(selectedDataUC.rt_median))
         
      strHTML = strHTML + "UC: "+"<span style='color:red'>" + parseFloat((selectedDataUC.rt_median)).toFixed(2) + "</span>" + "<br>"
   } 
   
   if (typeof selectedDataNU !== 'undefined') {
      circle_NU
         .attr("cx", x_rt(x0))
         .attr("cy", y_rt(selectedDataNU.rt_median))
         
      strHTML = strHTML + "NU: "+"<span style='color:red'>" + parseFloat((selectedDataNU.rt_median)).toFixed(2) + "</span>" + "<br>"
   }
   
   if (typeof selectedDataUIUC !== 'undefined') {
      circle_UIUC
         .attr("cx", x_rt(x0))
         .attr("cy", y_rt(selectedDataUIUC.rt_median))
         
      strHTML = strHTML + "UIUC: "+"<span style='color:red'>" + parseFloat((selectedDataUIUC.rt_median)).toFixed(2) + "</span>" + "<br>"
   }
   
   if (typeof selectedDataANL !== 'undefined') {
      circle_ANL
         .attr("cx", x_rt(x0))
         .attr("cy", y_rt(selectedDataANL.rt_median))
     
   }
      
   
   



   if ((selectedRegion).localeCompare('covidregion_11') === 0) {
       
      strHTML = strHTML + "ANL: "+"<span style='color:red'>" + parseFloat((selectedDataANL.rt_median)).toFixed(2) + "</span>"+ "<br>"
       
      Tooltip
         .html(strHTML)
         .style("left", (margin_rt.left +24) + "px")
         .style("top",  (margin_rt.top +24) + "px")
         
   } 
   else {
      Tooltip
         .html(strHTML)
         .style("left", (margin_rt.left +24) + "px")
         .style("top",  (margin_rt.top +24) + "px")
   }
  }
  
   var mousemove_test_pos = function(d) {
      var formatTime = d3.timeFormat("%b %d")
      var x0 = x_test_pos.invert(d3.mouse(this)[0]);
       
      var i = bisectCDT(data_map, x0, 1);
       
      var selectedData = data_map[i]
      Tooltip_test_pos
         .html( formatTime(selectedData.date) +"<br></br><strong>Rate:</strong> <span style='color:red'> "+  
         parseFloat((selectedData.test_pos_avg)).toFixed(2) + "</span>")
         .style("left", (x_test_pos(selectedData.date) + 11) + "px")
         .style("top",  (y_test_pos(selectedData.test_pos_avg)-45) + "px")
      }
   
      svg_rt
      .attr("width", width_rt + margin_rt.left + margin_rt.right)
      .attr("height", height_rt + margin_rt.top + margin_rt.bottom)
   .append("g")
      .attr("transform", "translate(" + margin_rt.left + "," + margin_rt.top + ")");
   
    x_rt
      .domain([ parseDate2('2020-4-1'), today])
      .range([ 0, width_rt]);
   
   x_rtNU
      .domain(d3.extent(dataNU, function(d) { return d.date}))
      .range([ 0, width_rt]);
      
   y_rt
   .domain([0.6, 1.4])
   .range([ height_rt, 0 ])
   

      
   const formatTime = d3.timeFormat("%b %Y");
      
   let ticks = 0
   if (currentWidth < 600) {
      ticks = 5
   }else {
      ticks = 6
   }
   
   x_rt_band
      .domain(dataNU.map(function(d) { return d.date; }))
      .range([0,width_rt])
      .padding(0);
   
   var tickValsRT = x_rt_band.domain().filter(function(d,i){ 
      return ((dataNU[i].date).getDate() === 1)
   })
   

   if (currentWidth < 500) {
      var index = tickValsRT.length -1
      
      while (index >= 0) {
         if(index % 2 == 0  ){
            tickValsRT.splice(index, 1);
         }
         index -= 1;
      }
   }
   

   
    x_rt_axis
   .attr("transform", "translate(" + margin_rt.left + "," + (height_rt + margin_rt.top) + ")")
   .call(d3.axisBottom(x_rt).tickSizeOuter(0)
   .tickFormat(d3.timeFormat("%b %Y"))
   );

   // y_rt
   y_rt_axis
      .attr("transform", "translate("+ margin_rt.left +","+ margin_rt.top + ")"  )
      .call(d3.axisLeft(y_rt))
      
      
          // Gridline
 var gridlines_rt = d3.axisLeft()
                   .tickFormat("")
                   .tickSize(-width_rt)
                   .scale(y_rt);

  grid_rt
     .attr("class", "grid")
    .attr("transform", "translate("+ margin_rt.left +","+ margin_rt.top + ")"  )
     .call(gridlines_rt);

   
   svg_rt
      .select(".yLabel")
      .remove()
   
   //rt y label 
   svg_rt
   .append('text')
      .attr("class", "yLabel")
       .attr("text-anchor", "end") 
       .attr("y", 5)
       .attr("dy", ".40em")
       .style("fill", "#242526")
       .attr("transform", "rotate(-90)")
     .html('Reproductive Number - R')
     .style('font-size', function() {
        if (currentWidth < 600) {
           return ".6rem"
        } else {
           return ".8rem"
        }
     })
    .append('tspan')
       .text('t')
       .style('font-size', function() {
        if (currentWidth < 600) {
           return ".4rem"
        } else {
           return ".6rem"
        }
       })
       .attr('dx', '.1em')
       .attr('dy', '.3em')


   interval_rt.attr("transform", "translate("+ margin_rt.left +","+ margin_rt.top + ")"  )
   interval_rt2.attr("transform", "translate("+ margin_rt.left +","+ margin_rt.top + ")"  )
   interval_rt3.attr("transform", "translate("+ margin_rt.left +","+ margin_rt.top + ")"  )
   interval_rt4.attr("transform", "translate("+ margin_rt.left +","+ margin_rt.top + ")"  )
   
   interval_rt
      .datum(dataNU)
      .attr("fill", function(d){ return lightestColors(selectedRegion) })
      .attr('opacity', '0.5')
      .transition()
      .duration(1000)
      .attr("d", d3.area()
      .x(function(d) { return x_rt(d.date) })
      .y0(function(d) { return y_rt(d.rt_lower) })
      .y1(function(d) { return y_rt(d.rt_upper) }))
      
      
   interval_rt2
      .datum(dataUC)
      .attr("fill", function(d){ return lightestColors(selectedRegion) })
      .attr('opacity', '0.5')
      .transition()
      .duration(1000)
      .attr("d", d3.area()
      .x(function(d) { return x_rt(d.date) })
      .y0(function(d) { return y_rt(d.rt_lower) })
      .y1(function(d) { return y_rt(d.rt_upper) }))
      
      interval_rt3
      .datum(dataUIUC)
      .attr("fill", function(d){ return lightestColors(selectedRegion) })
      .attr('opacity', '0.5')
      .transition()
      .duration(1000)
      .attr("d", d3.area()
      .x(function(d) { return x_rt(d.date) })
      .y0(function(d) { return y_rt(d.rt_lower) })
      .y1(function(d) { return y_rt(d.rt_upper) }))
      
   if((selectedRegion).localeCompare('covidregion_11') === 0){
      interval_rt4.attr('opacity', '0.5')
            .transition()
      .duration(1000)
   } else {
      interval_rt4.attr('opacity', '0')
   }
   
   interval_rt4
      .datum(dataANL)
      .attr("fill", function(d){ return lightestColors(selectedRegion) })
      .attr("d", d3.area()
      .x(function(d) { return x_rt(d.date) })
      .y0(function(d) { return y_rt(d.rt_lower) })
      .y1(function(d) { return y_rt(d.rt_upper) }))
      
      
   line_rt.attr("transform", "translate("+ margin_rt.left +","+ margin_rt.top + ")"  )
   line_rt2.attr("transform", "translate("+ margin_rt.left +","+ margin_rt.top + ")"  )
   line_rt3.attr("transform", "translate("+ margin_rt.left +","+ margin_rt.top + ")"  )
   line_rt4.attr("transform", "translate("+ margin_rt.left +","+ margin_rt.top + ")"  )
   
   line_rt
      .datum(dataNU)
      .attr("stroke", function(d){ return colors(selectedRegion) })
      .transition()
      .duration(1000)
      .attr("d", d3.line()
      .x(function(d) { return x_rt(d.date) })
      .y(function(d) { return y_rt(d.rt_median) })
      )
   
      line_rt2
      .datum(dataUC)
      .attr("stroke", function(d){ return colors(selectedRegion) })
      .transition()
      .duration(1000)
      .attr("d", d3.line()
      .x(function(d) { return x_rt(d.date) })
      .y(function(d) { return y_rt(d.rt_median) })
      )
      
   line_rt3
      .datum(dataUIUC)
      .attr("stroke", function(d){ return colors(selectedRegion) })
      .transition()
      .duration(1000)
      .attr("d", d3.line()
      .x(function(d) { return x_rt(d.date) })
      .y(function(d) { return y_rt(d.rt_median) })
      )
      
   if((selectedRegion).localeCompare('covidregion_11') === 0){
      line_rt4.attr('opacity', '1')
   } else {
      line_rt4.attr('opacity', '0')
   }
      
      
   line_rt4
      .datum(dataANL)
      .attr("stroke", function(d){ return colors(selectedRegion) })
      .transition()
      .duration(1000)
      .attr("d", d3.line()
      .x(function(d) { return x_rt(d.date) })
      .y(function(d) { return y_rt(d.rt_median) })
      )
   
   
   

var labelArr = [
   {'unv' : 'UC', 'Y' : y_rt(dataUC[dataUC.length - 1].rt_median) + margin_rt.top, 'm_d': dataUC[dataUC.length - 1].model_date },
   {'unv' : 'UIUC', 'Y' : y_rt(dataUIUC[dataUIUC.length - 1].rt_median) + margin_rt.top, 'm_d': dataUIUC[dataUIUC.length - 1].model_date },
   {'unv' : 'NU', 'Y' : y_rt(dataNU[dataNU.length - 1].rt_median) + margin_rt.top, 'm_d': dataNU[dataNU.length - 1].model_date }
  
   ]
   
   
   if((selectedRegion).localeCompare('covidregion_11') === 0) {
      labelArr.push({'unv' : 'ANL', 'Y' : y_rt(dataANL[dataANL.length - 1].rt_median) + margin_rt.top, 'm_d': dataANL[dataANL.length - 1].model_date })
   }
   

   
labelArr.sort((a, b) => (a.Y > b.Y) ? 1 : (a.Y === b.Y) ? ((a.Y > b.Y) ? 1 : -1) : -1 )

labelArr.forEach((label, i, obj) => {
   
   if (i > 0 ) {
      if (obj[i].Y - obj[i-1].Y < 10) {
         obj[i].Y += 10 - (obj[i].Y - obj[i-1].Y)
      }
   }
})
   
   labelArr.forEach(label => {
      
      if(label.m_d == undefined) {
         label.m_d = today
      }
   });
   
var formatModelDate = d3.timeFormat("%m/%d")
lineLabel1
      .attr("transform", "translate("+(width_rt+margin_rt.left+10)+","+ labelArr[0].Y+")")
      .attr("dy", ".35em")
      .attr("text-anchor", "start")
            .style("fill", "black")
             .style('font-size', function() {
       if (currentWidth < 600) {
          return ".6rem"
       } else {
          return ".7rem"
       }
             })
      .text(labelArr[0].unv + '('+ formatModelDate(labelArr[0].m_d) +')')
      
lineLabel2
     .attr("transform", "translate("+(width_rt+margin_rt.left+10)+","+ labelArr[1].Y+")")
      .attr("dy", ".35em")
      .attr("text-anchor", "start")
      .style("fill", "black")
             .style('font-size', function() {
       if (currentWidth < 600) {
          return ".6rem"
       } else {
          return ".7rem"
       }
             })
      .text(labelArr[1].unv + '('+ formatModelDate(labelArr[1].m_d) +')')

lineLabel3
      .attr("transform", "translate("+(width_rt+margin_rt.left+10)+","+ labelArr[2].Y+")")
      .attr("dy", ".35em")
      .attr("text-anchor", "start")
      .style("fill", "black")
             .style('font-size', function() {
       if (currentWidth < 600) {
          return ".6rem"
       } else {
          return ".7rem"
       }
      })
      .text(labelArr[2].unv + '('+ formatModelDate(labelArr[2].m_d) +')')
      
lineLabel4
      .attr("dy", ".35em")
      .attr("text-anchor", "start")
      .style("fill", "black")
             .style('font-size', function() {
       if (currentWidth < 600) {
          return ".6rem"
       } else {
          return ".7rem"
       }
      })
   
if(labelArr.length > 3) {
   lineLabel4
   .attr("transform", "translate("+(width_rt+margin_rt.left+10)+","+ labelArr[3].Y+")")
    .text(labelArr[3].unv +'('+ formatModelDate(labelArr[3].m_d) +')')
}else {
    lineLabel4
    .text("")
}

focus
      .attr("transform", "translate("+ margin_rt.left +","+ margin_rt.top + ")"  )
      .style("fill", "none")
      .attr("stroke", "#ddd")
      .style("opacity", 0)
      .style("stroke-width", 1.5)
      
refLine
       .attr("transform", "translate("+ margin_rt.left +","+ margin_rt.top + ")"  )
       .attr("x1", 0) 
      .attr("y1",  y_rt(1.0))
      .attr("x2", width_rt) 
      .attr("y2", y_rt(1.0))
         .attr("stroke", "black")
      .style("stroke-width", 1)
      .style("stroke-dasharray", ("3, 3"))
      .style("fill", "none")
   


circle_NU
.attr("transform", "translate("+ margin_rt.left +","+ margin_rt.top + ")"  )
      .style("fill", "none")
      .attr('stroke', '#4E2A84')
      .style("stroke-width", 2)
      .attr('r', 4.5)
      .style("opacity", 0)

circle_UC
.attr("transform", "translate("+ margin_rt.left +","+ margin_rt.top + ")"  )
      .style("fill", "none")
      .attr('stroke', '#AC1E2D')
      .style("stroke-width", 2)
      .attr('r', 4.5)
      .style("opacity", 0)
      
circle_UIUC
.attr("transform", "translate("+ margin_rt.left +","+ margin_rt.top + ")"  )
      .style("fill", "none")
      .attr('stroke', '#E84A27')                  
      .style("stroke-width", 2)
      .attr('r', 4.5)
      .style("opacity", 0)


circle_ANL
.attr("transform", "translate("+ margin_rt.left +","+ margin_rt.top + ")"  )
      .style("fill", "none")
      .attr('stroke', '#228C22')                  
      .style("stroke-width", 2)
      .attr('r', 4.5)
      .style("opacity", 0)

dot_NU
      .attr("transform", "translate("+(width_rt+margin_rt.left+5)+","+ (labelArr.filter(obj => {return (obj.unv).localeCompare('NU') === 0}))[0].Y+")")
      .style("fill", "#4E2A84")
      .attr('stroke', '#4E2A84')
      .style("stroke-width", 2)
      .attr('r', 3)
      .style("opacity", 1)

dot_UC
      .attr("transform", "translate("+(width_rt+margin_rt.left+5)+","+ (labelArr.filter(obj => {return (obj.unv).localeCompare('UC') === 0}))[0].Y+")")
      .style("fill", "#AC1E2D")
      .attr('stroke', '#AC1E2D')
      .style("stroke-width", 2)
      .attr('r', 3)
      .style("opacity", 1)
      
dot_UIUC
      .attr("transform", "translate("+(width_rt+margin_rt.left+5)+","+ (labelArr.filter(obj => {return (obj.unv).localeCompare('UIUC') === 0}))[0].Y+")")
      .style("fill", "#E84A27")
      .attr('stroke', '#E84A27')                  
      .style("stroke-width", 2)
      .attr('r', 3)
      .style("opacity", 1)
      
dot_ANL
      .style("fill", "#228C22")
      .attr('stroke', '#228C22')                  
      .style("stroke-width", 2)
      .attr('r', 3)
      .style("opacity", 0)

if(labelArr.length > 3 ){
   dot_ANL
   .attr("transform", "translate("+(width_rt+margin_rt.left+5)+","+ (labelArr.filter(obj => {return (obj.unv).localeCompare('ANL') === 0}))[0].Y+")")
   .style("opacity", 1)
}

   svg_rt
      .append('rect')
      .attr('width', width_rt)
      .attr('height', height_rt)
      .attr("transform", "translate("+ margin_rt.left +","+ margin_rt.top + ")"  )
      .on("mouseover", function(d) {
     
     focus
     .style("opacity", 1)
     circle_NU
     .style("opacity", 1)
     circle_UC
     .style("opacity", 1)
     circle_UIUC
     .style("opacity", 1)
     
    Tooltip
      .style("opacity", 1)
      if((selectedRegion).localeCompare('covidregion_11') === 0 ) {
          circle_ANL
            .style("opacity", 1)
      }
  })
      .on("mousemove", mousemove)
      .on("mouseout", function(event) {
         if (event){
      var e = event.toElement || event.relatedTarget;
        if (e.parentNode == this || e == this) {
           return;
        }
         }
   focus
     .style("opacity", 0)
     circle_NU
     .style("opacity", 0)
     circle_UC
     .style("opacity", 0)
     circle_UIUC
     .style("opacity", 0)
   circle_ANL
     .style("opacity", 0)
    Tooltip
      .style("opacity", 0)
  })
   
    var tickTimeFormat = d3.timeFormat("%b %d")
   var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
     return tickTimeFormat(d.date) + "<br></br>Cases: <span style='color:red'>" + d.confirmed_cases_change + "</span><br></br>" +
     "7-Day Average: <span style='color:red'>" + d.cases_avg;
  })

  
     var tip_deaths = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
     return tickTimeFormat(d.date) + "<br></br>Deaths: <span style='color:red'>" + d.deaths_change + "</span><br></br>" +
     "7-Day Average: <span style='color:red'>" + d.deaths_avg;
  })
  
       var tip_tests = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
     return tickTimeFormat(d.date) + "<br></br>Tests: <span style='color:red'>" + d.tested_change + "</span><br></br>" +
     "7-Day Average: <span style='color:red'>" + d.tests_avg;
  })
  
         var tip_vaccine = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
     return tickTimeFormat(d.date) + "<br></br>Administered Doses: <span style='color:red'>" + d.AdministeredCountChange + "</span><br></br>" +
     "Fully Vaccinated: <span style='color:red'>" + d.PersonsFullyVaccinatedChange;
  })
  
         var tip_cli = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
     return tickTimeFormat(d.reportDate) + "<br></br>CLI Admissions: <span style='color:red'>" + d.CLIAdmissionsRA
  })
   
   svg_cases
    .attr("width", width_cases + margin_cases.left + margin_cases.right)
    .attr("height", height_cases + margin_cases.top + margin_cases.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin_cases.left + "," + margin_cases.top + ")");
   
   svg_deaths
      .attr("width", width_cases + margin_cases.left + margin_cases.right)
      .attr("height", height_cases + margin_cases.top + margin_cases.bottom)
   .append("g")
      .attr("transform", "translate(" + margin_cases.left + "," + margin_cases.top + ")");
      
   svg_deaths.call(tip_deaths)
   
      svg_test_pos
    .attr("width", width_cases + margin_cases.left + margin_cases.right)
    .attr("height", height_cases + margin_cases.top + margin_cases.bottom)
 .append("g")
    .attr("transform",
          "translate(" + margin_cases.left + "," + margin_cases.top + ")");
          
   svg_tests
    .attr("width", width_cases + margin_tests.left + margin_tests.right)
    .attr("height", height_cases + margin_tests.top + margin_tests.bottom)
 .append("g")
    .attr("transform",
          "translate(" + margin_tests.left + "," + margin_tests.top + ")");
          
          svg_tests.call(tip_tests)
          
      svg_vac
    .attr("width", width_cases + margin_cases.left + margin_cases.right)
    .attr("height", height_cases + margin_cases.top + margin_cases.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin_cases.left + "," + margin_cases.top + ")");
          
          
          svg_vac.call(tip_vaccine)
          
          
         svg_cli
    .attr("width", width_cases + margin_cases.left + margin_cases.right)
    .attr("height", height_cases + margin_cases.top + margin_cases.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin_cases.left + "," + margin_cases.top + ")");       
   
   svg_cli.call(tip_cli)
   
   

   x_cases
      .domain(data_map.map(function(d) { return d.date; }))
      .range([0,width_cases])
      .padding(0);

      
   x_cli
      .domain(cliData.map(function(d) { return d.reportDate; }))
      .range([0,width_cases])
      .padding(0);
   
   x_test_pos
         .domain(d3.extent(data_map , function(d) { return d.date}))
      .range([ 0, width_cases]);
   
   x_tests
      .domain(data_map.map(function(d) { return d.date; }))
      .range([0,width_cases])
      .padding(0);
   
      x_vac
      .domain(vaccineData.map(function(d) { return d.date; }))
      .range([0,width_cases])
      .padding(0);
   
   
   var tickVals = x_cases.domain().filter(function(d,i){ 
            return ((data_map[i].date).getDate() === 1)
   })
   
   var tickValsVac = x_vac.domain().filter(function(d,i){ 
      return ((vaccineData[i].date).getDate() === 1)
   })
   
      var tickValsCLI = x_cli.domain().filter(function(d,i){ 
      return ((cliData[i].reportDate).getDate() === 1)
   })

   if (currentWidth < 500) {
      var index = tickVals.length -1
      
      while (index >= 0) {
         if(index % 2 == 0  ){
            tickVals.splice(index, 1);
         }
         index -= 1;
      }
   }
 
 x_axis
.attr("transform", "translate(" + margin_cases.left + "," + (height_cases + margin_cases.top) + ")")
   .call(d3.axisBottom(x_cases)
   .tickValues(tickVals)
   .tickFormat(d3.timeFormat("%b %Y"))
   );
   
   svg_cases.call(tip)

      
   //test pos chart x axis    
   x_axis_tests_pos
      .attr("transform", "translate(" +  margin_cases.left + "," + (height_cases + margin_cases.top) + ")")
      .call(d3.axisBottom(x_test_pos)
      .tickValues(tickVals)
      .tickFormat(d3.timeFormat("%b %Y")));

   //tests chart x axis
   x_axis_tests
      .attr("transform", "translate(" + margin_tests.left + "," + (height_cases + margin_tests.top) + ")")
      .call(d3.axisBottom(x_tests)
      .tickValues(tickVals)
      .tickFormat(d3.timeFormat("%b %Y")));

   x_axis_vac
      .attr("transform", "translate(" + margin_cases.left + "," + (height_cases + margin_cases.top) + ")")
      .call(d3.axisBottom(x_vac).tickSizeOuter(0)
      .tickValues(tickValsVac)
      .tickFormat(d3.timeFormat("%b %Y")));
      
         x_axis_vac
      .call(x_axis_vac => x_axis_vac.select(".domain").remove());
      
         x_axis_cli
      .attr("transform", "translate(" + margin_cases.left + "," + (height_cases + margin_cases.top) + ")")
      .call(d3.axisBottom(x_cli).tickSizeOuter(0)
      .tickValues(tickValsCLI)
      .tickFormat(d3.timeFormat("%b %Y")));
      
               x_axis_cli
      .call(x_axis_cli => x_axis_cli.select(".domain").remove());

   y_cases
      .domain([0, d3.max(data_map, function(d) { return d.confirmed_cases_change; })])
      .range([height_cases, 0]);
   
      y_vac
      .domain([0, d3.max(vaccineData, function(d) { return d.AdministeredCountChange; })])
      .range([height_cases, 0]);
      
      
   y_cli
      .domain([0, d3.max(cliData, function(d) { return d.CLIAdmissionsRA; })])
      .range([height_cases, 0]);
      
 // Gridline
 var gridlines_cases = d3.axisLeft()
                   .tickFormat("")
                   .tickSize(-width_cases)
                   .scale(y_cases);
                   
var gridlines_vac = d3.axisLeft()
                   .tickFormat("")
                   .tickSize(-width_cases)
                   .scale(y_vac);
                   
var gridlines_cli = d3.axisLeft()
                   .tickFormat("")
                   .tickSize(-width_cases)
                   .scale(y_cli);

  grid_cases
     .attr("class", "grid")
     .attr("transform", "translate("+ margin_cases.left +","+ margin_cases.top + ")"  )
     .call(gridlines_cases);
   
   grid_vac
     .attr("class", "grid")
     .attr("transform", "translate("+ margin_cases.left +","+ margin_cases.top + ")"  )
     .call(gridlines_vac);
     
       grid_cli
     .attr("class", "grid")
     .attr("transform", "translate("+ margin_cases.left +","+ margin_cases.top + ")"  )
     .call(gridlines_cli);
   
   y_test_pos
      .domain([0, .30])
      .range([height_cases, 0]);
   
   y_tests
      .domain([0, d3.max(data_map, function(d) { return d.tested_change; })])
      .range([height_cases, 0]);
      
      
 // Gridline
 var gridlines_test = d3.axisLeft()
                   .tickFormat("")
                   .tickSize(-width_cases)
                   .scale(y_tests);

  grid_tests
     .attr("class", "grid")
     .attr("transform", "translate("+ margin_tests.left +","+ margin_tests.top + ")"  )
     .call(gridlines_test);   
     
     
 // Gridline
 var gridlines_test_pos = d3.axisLeft()
                   .tickFormat("")
                   .tickSize(-width_cases)
                   .scale(y_test_pos);
                

  grid_test_pos
     .attr("class", "grid")
     .attr("transform", "translate("+ margin_cases.left +","+ margin_cases.top + ")"  )
     .call(gridlines_test_pos);   
     
   y_axis
      .attr("transform", "translate("+ margin_cases.left +","+ margin_cases.top  + ")"  )
      .call(d3.axisLeft(y_cases));
      
      y_axis_vac
      .attr("transform", "translate("+ margin_cases.left +","+ margin_cases.top  + ")"  )
      .call(d3.axisLeft(y_vac).tickSizeOuter(0))
      
      y_axis_vac
      .call(y_axis_vac => y_axis_vac.select(".domain").remove());
      
      
      
            y_axis_cli
      .attr("transform", "translate("+ margin_cases.left +","+ margin_cases.top  + ")"  )
      .call(d3.axisLeft(y_cli).tickSizeOuter(0))
      
      y_axis_cli
      .call(y_axis_cli => y_axis_cli.select(".domain").remove());

   var formatPercent = d3.format(".0%");
   
   y_axis_tests_pos
      .attr("transform", "translate("+ margin_cases.left +","+ margin_cases.top  + ")"  )
      .call(d3.axisLeft(y_test_pos).tickFormat(formatPercent))
   
   y_axis_tests
      .attr("transform", "translate("+ margin_tests.left +","+ margin_tests.top  + ")"  )
      .call(d3.axisLeft(y_tests));
   
   var v = svg_vac.selectAll(".bar1")
                    .data(vaccineData)
                    
   var v2 = svg_vac.selectAll(".bar2")
                    .data(vaccineData)

   v
      .enter()
      .append("rect").merge(v)
      .attr("class", "bar1")
      .attr("x", function(d) { return x_vac(d.date)})
      .attr("y", function(d) { return y_vac(d.AdministeredCountChange); })
      .attr("width",  x_vac.bandwidth())
      .attr("height", function(d) { return height_cases - y_vac(d.AdministeredCountChange); })
                  .on('mouseover', tip_vaccine.show)
      .on('mouseout', tip_vaccine.hide)
      .attr("fill", function(d){ return lightestColors(selectedRegion) })
      .attr("transform", "translate("+ margin_cases.left +","+margin_cases.top + ")"  );
   
   
      v2
      .enter()
      .append("rect").merge(v2)
      .attr("class", "bar2")
      .attr("x", function(d) { return x_vac(d.date)})
      .attr("y", function(d) { return y_vac(d.PersonsFullyVaccinatedChange); })
      .attr("width",  x_vac.bandwidth())
      .attr("height", function(d) { return height_cases - y_vac(d.PersonsFullyVaccinatedChange); })
      .attr("fill", function(d){ return darkerColor(selectedRegion) })
      .attr("transform", "translate("+ margin_cases.left +","+margin_cases.top + ")"  );
   
   v
      .exit()
      .remove()
      
   v2
      .exit()
      .remove()
      
      
   svg_vac.selectAll('path').remove();
     
   svg_vac
      .append('path')
      .datum(vaccineData)
      .attr('fill', 'none')
      .attr("stroke", function(d){ return colors(selectedRegion) })
      .attr('stroke-width', 2.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr("d", d3.line()
      .x(function(d) { return x_vac(d.date) })
      .y(function(d) { return y_vac(d.doses_admin_avg) })
      )
      .attr("transform", "translate("+ margin_cases.left +","+ margin_cases.top  + ")"  );   
      
      
       svg_vac
      .append('path')
      .datum(vaccineData)
      .attr('fill', 'none')
      .attr("stroke", function(d){ return mapFillColor(selectedRegion) })
      .attr('stroke-width', 2.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr("d", d3.line()
      .x(function(d) { return x_vac(d.date) })
      .y(function(d) { return y_vac(d.persons_fully_avg) })
      )
      .attr("transform", "translate("+ margin_cases.left +","+ margin_cases.top  + ")"  );   
      
      
       
      
      
      
   var c = svg_cli.selectAll(".bar1")
                  .data(cliData)   
                  
                  
           c
      .enter()
      .append("rect").merge(c)
      .attr("class", "bar1")
      .attr("x", function(d) { return x_cli(d.reportDate)})
      .attr("y", function(d) { return y_cli(d.CLIAdmissionsRA); })
      .attr("width",  x_cli.bandwidth())
      .attr("height", function(d) { return height_cases - y_cli(d.CLIAdmissionsRA); })
      .on('mouseover', tip_cli.show)
      .on('mouseout', tip_cli.hide)
      .attr("fill", function(d){ return lightestColors(selectedRegion) })
      .attr("transform", "translate("+ margin_cases.left +","+margin_cases.top + ")"  );   
      
      
   c
   .exit()
   .remove()
      
   
   var s = svg_tests.selectAll(".bar1")
                    .data(data_map)

   s
      .enter()
      .append("rect").merge(s)
      .attr("class", "bar1")
      .attr("x", function(d) { return x_tests(d.date)})
      .attr("y", function(d) { return y_tests(d.tested_change); })
      .attr("width",  x_tests.bandwidth())
      .attr("height", function(d) { return height_cases - y_tests(d.tested_change); })
      .attr("fill", function(d){ return lightestColors(selectedRegion) })
            .on('mouseover', tip_tests.show)
      .on('mouseout', tip_tests.hide)
      .attr("transform", "translate("+ margin_tests.left +","+margin_tests.top + ")"  );
   s
      .exit()
      .remove()

   svg_tests
      .selectAll('path').remove();
   
   svg_tests
      .append('path')
      .datum(data_map)
      .attr('fill', 'none')
      .attr("stroke", function(d){ return colors(selectedRegion) })
      .attr('stroke-width', 2.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr("d", d3.line()
      .x(function(d) { return x_tests(d.date) })
      .y(function(d) { return y_tests(d.tests_avg) })
      )
      .attr("transform", "translate("+ margin_tests.left +","+ margin_tests.top + ")"  );
   
   svg_test_pos
      .selectAll("rect")
      .attr("transform", "translate("+ margin_cases.left +","+margin_cases.top + ")"  );

   svg_test_pos.selectAll('path').remove();
     
   svg_test_pos
      .append('path')
      .datum(data_map)
      .attr('fill', 'none')
      .attr("stroke", function(d){ return colors(selectedRegion) })
      .attr('stroke-width', 2.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr("d", d3.line()
      .x(function(d) { return x_test_pos(d.date) })
      .y(function(d) { return y_test_pos(d.test_pos_avg) })
      )
      .attr("transform", "translate("+ margin_cases.left +","+ margin_cases.top  + ")"  );
      
   svg_test_pos
      .append('rect')
      .attr('width', width_cases)
      .attr('height', height_cases)
      .attr("transform", "translate("+ margin_cases.left +","+ margin_cases.top + ")"  )
      .on("mouseover", function(d) {
    focus_test_pos.style("opacity", 1)
    Tooltip_test_pos
      .style("opacity", 1)
 })
      .on("mousemove", mousemove_test_pos)
      .on("mouseleave", function(d) {
    focus_test_pos.style("opacity", 0)
    Tooltip_test_pos
      .style("opacity", 0)
 })

  // Create the u variable
  var u = svg_cases.selectAll("rect").data(data_map)

  u
    .enter()
    .append("rect") // Add a new rect for each new elements
    .merge(u) // get the already existing elements as well
      .attr("x", function(d) { return x_cases(d.date); })
      .attr("y", function(d) { return y_cases(d.confirmed_cases_change); })
      .attr("width", x_cases.bandwidth())
      .attr("height", function(d) { return height_cases - y_cases(d.confirmed_cases_change); })
      .attr("fill", function(d){ return lightestColors(selectedRegion) })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .attr("transform", "translate("+ margin_cases.left +","+ margin_cases.top + ")")
      // .attr("transform", "translate("+ 0 +","+ margin_cases.top + ")")

  u
    .exit()
    .remove()
    
   // u
   svg_cases
   .selectAll("rect")

   svg_cases.selectAll('path').remove();
  
   svg_cases
      .append('path')
      .datum(data_map)
      .attr('fill', 'none')
      .attr("stroke", function(d){ return colors(selectedRegion) })
      .attr('stroke-width', 2.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr("d", d3.line()
      .x(function(d) { return x_cases(d.date) })
      .y(function(d) { return y_cases(d.cases_avg) })
      )
      .attr("transform", "translate("+ margin_cases.left +","+ margin_cases.top  + ")"  );

   x_deaths
     .domain(data_map.map(function(d) { return d.date; }))
     .range([0,width_cases])
     .padding(0);


   x_axis_deaths
      .attr("transform", "translate(" + margin_cases.left + "," + (height_cases + margin_cases.top) + ")")
      .call(d3.axisBottom(x_deaths)
      .tickValues(tickVals)
      .tickFormat(d3.timeFormat("%b %Y")));

   y_deaths
      .domain([0, d3.max(data_map, function(d) { return d.deaths_change; })])
      .range([height_cases, 0]);
      
      
   // Gridline
 var gridlines_deaths = d3.axisLeft()
                   .tickFormat("")
                   .tickSize(-width_cases)
                   .scale(y_deaths);

  grid_deaths
     .attr("class", "grid")
     .attr("transform", "translate("+ margin_cases.left +","+ margin_cases.top + ")"  )
     .call(gridlines_deaths);   

   y_axis_deaths
      .attr("transform", "translate("+ margin_cases.left +","+ margin_cases.top + ")"  )
      .call(d3.axisLeft(y_deaths));

  // Create the u variable
  var i = svg_deaths.selectAll("rect").data(data_map)

  i
    .enter()
    .append("rect") // Add a new rect for each new elements
    .merge(i) // get the already existing elements as well
      .attr("x", function(d) { return x_deaths(d.date); })
      .attr("y", function(d) { return y_deaths(d.deaths_change); })
      .attr("width", x_deaths.bandwidth())
      .attr("height", function(d) { return height_cases - y_deaths(d.deaths_change); })
      .attr("fill", function(d){ return lightestColors(selectedRegion) })
      .on('mouseover', tip_deaths.show)
      .on('mouseout', tip_deaths.hide)

  i
    .exit()
    .remove()
    
   // u
   svg_deaths
   .selectAll("rect")
   .attr("transform", "translate("+ margin_cases.left +","+ margin_cases.top  + ")"  )

   svg_deaths.selectAll('path').remove();
   
   svg_deaths
      .append('path')
      .datum(data_map)
      .attr('fill', 'none')
      .attr("stroke", function(d){ return colors(selectedRegion) })
      .attr('stroke-width', 2.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      // .attr('d', lineA)
      .attr("d", d3.line()
      .x(function(d) { return x_deaths(d.date) })
      .y(function(d) { return y_deaths(d.deaths_avg) })
      )
      .attr("transform", "translate("+ margin_cases.left +","+ margin_cases.top  + ")"  )
      
      
   d3.select('#rt_download').on('click', function() {
      var fileName = 'rtData.json';

// Create a blob of the data
var fileToSave = new Blob([JSON.stringify(rtArrs, undefined, 2)], {
    type: 'application/json',
    name: fileName
});

// Save the file
saveAs(fileToSave, fileName);
   })   
   
   var regionPopulation = {
   
   'illinois': 12671821,
'covidregion_1': 660965,
'covidregion_2': 1243906,
'covidregion_3': 556776,
'covidregion_4': 656946,
'covidregion_5': 403659,
'covidregion_6': 739098,
'covidregion_7': 800605,
'covidregion_8': 1455324,
'covidregion_9': 1004309,
'covidregion_10': 2693959,
'covidregion_11': 2456274
}
      
      
      var rt = [
         dataNU[dataNU.length - 1 ].rt_median,
         dataUC[dataUC.length - 1 ].rt_median,
         dataUIUC[dataUIUC.length - 1 ].rt_median
         ]
      
      if ((selectedRegion).localeCompare('covidregion_11') === 0) {
         rt.push(dataANL[dataANL.length - 1 ].rt_median)
      }
      
            var rt_lower = Math.min(...rt)
            var rt_upper = Math.max(...rt)
      
   document.getElementById('rt_text_lower').innerHTML = rt_lower.toFixed(2);
    document.getElementById('rt_text_upper').innerHTML = rt_upper.toFixed(2);
   
    document.getElementById('avg_cases').innerHTML = data_map[data_map.length - 1 ].cases_avg
    document.getElementById('avg_deaths').innerHTML = data_map[data_map.length - 1 ].deaths_avg
    document.getElementById('avg_test').innerHTML = data_map[data_map.length - 1 ].tests_avg
        document.getElementById('avg_case_pos').innerHTML = (data_map[data_map.length - 1 ].test_pos_avg).toFixed(2);
       
       document.getElementById('percent_vaccinated').innerHTML = ((vaccineData[vaccineData.length-1].PersonsFullyVaccinated / regionPopulation[selectedRegion]) *100).toFixed(0);
       
       document.getElementById('doses_total').innerHTML = (vaccineData[vaccineData.length-1].AdministeredCount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
       document.getElementById('fully_total').innerHTML = (vaccineData[vaccineData.length-1].PersonsFullyVaccinated).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
       

    var region = ""
    if(selectedRegion == "illinois" ||selectedRegion == "Illinois" ) {

        region = "the state";
     } else {
        region = "Region " + selectedRegion.substring( selectedRegion.indexOf('_')+1);
     }
     
   var date_divs = document.getElementsByClassName( 'last_update_date' );
   var formatHTMLDate = d3.timeFormat("%B %d");
   
   [].slice.call( date_divs ).forEach(function ( div ) {
      div.innerHTML = formatHTMLDate(data_map[data_map.length - 1 ].date)
   });
   
   var reg_divs = document.getElementsByClassName( 'region_text' );
   
   [].slice.call( reg_divs ).forEach(function ( div ) {
      div.innerHTML = region
   });

}


   //  read_data();
    // Initialize the chart
    drawChart();
    // Add an event listener that run the function when dimension change
    window.addEventListener('resize', drawChart ); 
          // When the button is changed, run the updateChart funso ction
    d3.select("#selectButton").on("change", function(d) {
      // recover the option that has been chosen
      // var selectedOption = d3.select(this).property("value")
       selectedRegion = d3.select(this).property("value")
      // run the updateChart function with this selected option
      drawChart()
    })
})
