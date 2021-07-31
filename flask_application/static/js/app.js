//--------------------------------------------------------------------
// Define function that will run on page load

function init() {

    // Read json data
    // Add dropdown option for each sample
    // data is an object with three arrays, names, metadata, and samples
    let state_selector = d3.select("#selStateDataset");
    // let county_selector = d3.select("#selCountyDataset");
  
    d3.json("/state-list").then(function (data) {
        console.log(data);
        let state_data = Object.values(data.state)
        
        // To read the values into an array
        console.log(state_data[0]);

        //Binding state array to the dropdown menu
        let sel = document.getElementById('selStateDataset');
        for(var i = 0; i < state_data.length; i++) {
            var opt = document.createElement('option');
            opt.innerHTML = state_data[i];
            opt.value = state_data[i];
            sel.appendChild(opt);
         }
    
        // Call functions below using the first sample to build Demographic and initial plots
        stateDemographic(state_data[0]);
        buildCharts(state_data[0])
    });
}

//-------------------------------------------------------------------

// Define a function that will create metadata for given sample
function stateDemographic(sample) {
  console.log(sample)
  let state_selector = d3.select("#selStateDataset");  
  let demographicInfoBox = d3.select("#sample-statedata");
  demographicInfoBox.html("")
  // Read the json data
  // Specify the location of the state data and returning specific state with it's demographics
  d3.json(`/search_state/${sample}`).then(function (data) {
    console.log(data);
    console.log(sample)
    let state_data = Object.values(data.state)
    console.log(state_data); 
    
    // state_data is an object, so unpacking it into
    //  an array state_name, to bind it to the dropdown list
    
      name_data = Object.values(data.state)
      abbr_data = Object.values(data.state_abbr)
      income_data = Object.values(data.avg_per_capita_income)
      age_data = Object.values(data.avg_median_age)
      population_data = Object.values(data.avg_population)
      poverty_data = Object.values(data.avg_poverty_count)
      degree_data = Object.values(data.avg_bachelors_or_higher_2019)
      console.log(abbr_data)
      
      demographicInfoBox.append("h6").text(`state_abbr => ${abbr_data}`)
      demographicInfoBox.append("h6").text(`state_name => ${name_data}`)
      demographicInfoBox.append("h6").text(`avg_per_capita_income => ${income_data}`)
      demographicInfoBox.append("h6").text(`avg_median_age => ${age_data}`)
      demographicInfoBox.append("h6").text(`avg_population => ${population_data}`)
      demographicInfoBox.append("h6").text(`avg_poverty_count => ${poverty_data}`)
      demographicInfoBox.append("h6").text(`avg_bachelors_or_higher => ${degree_data}`)
      populateCounty(sample)
     
  });   
}
//---------------------------------------------------------------------
//Now populating county
function populateCounty(sample) {

  // let state_selector = d3.select("#selStateDataset");
  let county_selector = d3.select("#selCountyDataset");
  
    console.log(sample)
    
      d3.json(`/search_counties/${sample}`).then(function (data) {
        console.log(data);
        console.log(sample);
        let county_data = Object.values(data.county)
        console.log(county_data);
        county_idx = county_data[0]
        console.log(county_idx)
        // to refresh the html
        d3.select("#selCountyDataset").html("")

        // Binding array county_name to the dropdown
        let sel = document.getElementById('selCountyDataset');
        for(var j = 0; j < county_data.length; j++) {
            // console.log(county_data[j]);
            var opt = document.createElement('option');
            opt.innerHTML = county_data[j];
            opt.value = county_data[j];
            sel.appendChild(opt);
        }    
        // Call functions below using the first sample to build Demographic and initial plots
        init_countyDemographic(sample, county_idx)
      });
}
//-----------------------------------------------------------------------------
function init_countyDemographic(sample, county_idx) {

        console.log(sample)
        console.log(county_idx)
        let demographicInfoBox = d3.select("#sample-countydata");
        demographicInfoBox.html("")
    // Read the json data
    // Parse and filter the data to get the sample's Demographic
    d3.json(`/search_state_county/${sample}/${county_idx}`).then(function (data) {
        console.log(data);
        let county_data = Object.values(data.county)
        console.log(county_data); 
        console.log(sample)
        sampleState = sample
        console.log(county_data)
        // state_data is an object, so unpacking it into
        //  an array state_name, to bind it to the dropdown list
        // objectLength = Object.keys(data.state_abbr).length
        name_data = Object.values(data.county)
        console.log(name_data)
        income_data = Object.values(data.per_capita_income)
        age_data = Object.values(data.median_age)
        unemployment_data = Object.values(data.unemployment_rate)
        population_data = Object.values(data.population)
        poverty_data = Object.values(data.poverty_rate)
        degree_data = Object.values(data.bachelors_or_higher_2019)
        
        demographicInfoBox.append("h6").text(`county_name => ${name_data}`)
        demographicInfoBox.append("h6").text(`per_capita_income => ${income_data}`)
        demographicInfoBox.append("h6").text(`median_age => ${age_data}`)
        demographicInfoBox.append("h6").text(`unemployment_data => ${unemployment_data}`)
        demographicInfoBox.append("h6").text(`population => ${population_data}`)
        demographicInfoBox.append("h6").text(`poverty_count => ${poverty_data}`)
        demographicInfoBox.append("h6").text(`bachelors_or_higher => ${degree_data}`)
    });    
}
//--------------------------------------------------------------------------------------
function countyDemographicUpdate(sample1, sample2) {

        console.log(sample1)
        console.log(sample2)
        let demographicInfoBox = d3.select("#sample-countydata");
        demographicInfoBox.html("")
    // Read the json data
    // Parse and filter the data to get the sample's Demographic
    d3.json(`/search_state_county/${sample1}/${sample2}`).then(function (data) {
        console.log(data);
        let county_data = Object.values(data.county)
        console.log(county_data); 
        console.log(data.county)
        // state_data is an object, so unpacking it into
        //  an array state_name, to bind it to the dropdown list
        // objectLength = Object.keys(data.state_abbr).length
        name_data = Object.values(data.county)
        income_data = Object.values(data.per_capita_income)
        age_data = Object.values(data.median_age)
        unemployment_data = Object.values(data.unemployment_rate)
        population_data = Object.values(data.population)
        poverty_data = Object.values(data.poverty_rate)
        degree_data = Object.values(data.bachelors_or_higher_2019)
        
        demographicInfoBox.append("h6").text(`county_name => ${name_data}`)
        demographicInfoBox.append("h6").text(`per_capita_income => ${income_data}`)
        demographicInfoBox.append("h6").text(`median_age => ${age_data}`)
        demographicInfoBox.append("h6").text(`unemployment_data => ${unemployment_data}`)
        demographicInfoBox.append("h6").text(`population => ${population_data}`)
        demographicInfoBox.append("h6").text(`poverty_count => ${poverty_data}`)
        demographicInfoBox.append("h6").text(`bachelors_or_higher => ${degree_data}`)
    });    
}
//--------------------------------------------------------------------------------------
// Define a function that will create charts for given sample
function buildCharts(sample) {

    console.log(sample)

    // Plotly Bar Chart:
    let barChart = d3.select("#bar");

    // Read the json data

    d3.json("/bar-list").then(function (data) {

        // console.log(Object.values(object1));
        console.log(Object.values(data.state));
        console.log(Object.values(data.below_hs_diploma_2019));
        let stateData = Object.values(data.state)
        let degree1Data = Object.values(data.below_hs_diploma_2019)
        let degree2Data = Object.values(data.hs_diploma_2019) 
        let degree3Data = Object.values(data.college_or_associate_2019) 
        let degree4Data = Object.values(data.bachelors_or_higher_2019)  

        var trace1 = {
            x: stateData,
            y: degree1Data,
            name: 'below_hs_diploma_2019',
            type: 'bar'
            };
          
        var trace2 = {
            x: stateData,
            y: degree2Data,
            name: 'hs_diploma_2019',
            type: 'bar'
            };
        
        var trace3 = {
            x: stateData,
            y: degree3Data,
            name: 'college_or_associate_2019',
            type: 'bar'
            };
          
        var trace4 = {
            x: stateData,
            y: degree4Data,
            name: 'bachelors_or_higher_2019',
            type: 'bar'
            };
        var data = [trace1, trace2, trace3, trace4];
          
        var layout = {barmode: 'stack'};
          
        Plotly.newPlot('bar', data, layout);      
    })
    //--------------------------------------------------------
    // Chart.js Donut Chart
    d3.json("/income-list").then(function (data) {

        // To read the values into an array
        // console.log(Object.values(object1));
        console.log(Object.values(data.state));
        console.log(Object.values(data.avg_per_capita_income));
        let stateData = Object.values(data.state)
        let incomeData = Object.values(data.avg_per_capita_income)
        let donutChart = new Chart(document.getElementById("doughnut-chart"), {
         
            type: 'doughnut',
            data: {
              labels: stateData,
              datasets: [
                {
                  label: "Avg_per_Capita_Income",
                  backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                  data: incomeData
                }
              ]
            },
            options: {
              title: {
                display: true,
                text: 'Custom Chart Title'
                },
                animation: {
                  animateScale: true
                },
              title: {
                display: true,
                text: 'Average_per_Capita_Income Vs. States'
              }
            }
        });
        Plotly.newPlot('bar', data, layout);      
    })
//--------------------------------------------------------------
    //Chart.js Line Chart
    d3.json("/census-list").then(function (data) {

        // console.log(Object.values(object1));
        console.log(Object.values(data.state));
        console.log(Object.values(data.avg_per_capita_income));
        let stateData = Object.values(data.state)
        let incomeData = Object.values(data.avg_per_capita_income)
        let ageData = Object.values(data.avg_median_age)
        let populationData = Object.values(data.avg_population)
        let povertyData = Object.values(data.avg_poverty_count)
        let unemploymentData = Object.values(data.avg_unemployment_rate)
        let degreeData = Object.values(data.avg_bachelors_or_higher_2019)
        let lineChart = new Chart(document.getElementById("line-chart"), {
            type: 'line',
            data: {
              labels: stateData,
              datasets: [{ 
                  data: incomeData,
                  label: "avg_per_capita_income",
                  borderColor: "#3e95cd",
                  fill: false
                }, { 
                  data: ageData,
                  label: "avg_median_age",
                  borderColor: "#8e5ea2",
                  fill: false
                }, { 
                  data: populationData,
                  label: "avg_population",
                  borderColor: "#3cba9f",
                  fill: false
                }, { 
                  data: povertyData,
                  label: "avg_poverty_count",
                  borderColor: "#e8c3b9",
                  fill: false
                }, { 
                  data: unemploymentData,
                  label: "avg_unemployment_rate",
                  borderColor: "#c45850",
                  fill: false
                }, { 
                  data: degreeData,
                  label: "avg_bachelors_or_higher_2019",
                  borderColor: "#c45850",
                  fill: false
                }
              ]
            },
            options: {
              title: {
                display: true,
                text: 'US Census Analysis'
              }
            }
          });
    }) //D3

    // -----------------------------------------------------------------------------------
    // Plotly Choropleth Mapbox Chart:
    d3.json("/census-list").then(function (data) {

      console.log(Object.values(data.state));
      console.log(Object.values(data.avg_unemployment_rate));
      let stateData = Object.values(data.state)
      let unemploymentData = Object.values(data.avg_unemployment_rate)

      var data = [{
        type: "choroplethmapbox", name: "US states", geojson: "https://raw.githubusercontent.com/python-visualization/folium/master/examples/data/us-states.json", locations: stateData, z: unemploymentData,
       zmin: 25, zmax: 280, colorbar: {y: 0, yanchor: "bottom", title: {text: "US states", side: "right"}}}
        ];
       
       var layout = {mapbox: {style: "dark", center: {lon: -110, lat: 50}, zoom: 0.8}, width: 600, height: 400, margin: {t: 0, b: 0}};
       
       var config = {mapboxAccessToken: "API_KEY"};
       
       Plotly.newPlot('myDiv', data, layout, config);

    }) //D3
} //fuction buildCharts ends
//-----------------------------------------------------------------------------------------
function stateChanged(sample) {
    // The parameter being passed in this function is new sample id from dropdown menu
    console.log(sample)
     // Calling the select() function
    //  var a = d3.select("div").text();

    let state_selector = document.getElementById('selStateDataset');
    console.log(state_selector.options[state_selector.selectedIndex].value)
    state_value = state_selector.options[state_selector.selectedIndex].value
    console.log(state_value)
  
    
    stateDemographic(sample);
    init_countyDemographic(sample, county_idx)
    buildCharts(sample);
   

 
   
} 

//----------------------------------------------------------------------------------
function countyChanged(sample) {
  // The parameter being passed in this function is new sample id from dropdown menu
  console.log(sample)
   // Calling the select() function
  //  var a = d3.select("div").text();

  console.log(state_value)
  
  // stateDemographic(sample);
  // init_countyDemographic(sample, county_idx)

  let county_selector = document.getElementById('selCountyDataset');
  console.log(county_selector.options[county_selector.selectedIndex].value)
  county_value = county_selector.options[county_selector.selectedIndex].value
  console.log(county_value)

  countyDemographicUpdate(state_value, sample)


  

  // buildCharts(sample);
  // countyDemographicUpdate(sample1, sample2)


 
} 

// Initialize dashboard on page load
init();
// if (sample in state_data) {