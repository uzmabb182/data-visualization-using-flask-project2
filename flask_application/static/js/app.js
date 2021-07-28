
// Need to get array for leaflet 

// d3.json("us_lat_long.json", function(data) {
//     console.log(data);


//-----------------------------------------------------
/* The following is an example on how you might structure your code.
This is not the only way to complete this assignment.
Feel free to disregard and create your own code */
// let persons = {
//     a: 'Jacob',
//     b: 'Daniel'
//   };
  
//   for (let [key, name] of Object.entries(persons)) {
//     console.log(key + ': ' + name);
//   }
//   Object.entries(filterData).forEach(([key, value]) => {
//                 demographicInfoBox.append("h6").text(`${key} => ${value}`)
//             });

//             var data = [];
//             data.push(feed);
            
//             console.log(data);
//--------------------------------------------------------------------
// Define function that will run on page load
function init() {

    // Read json data
    // Add dropdown option for each sample
    // data is an object with three arrays, names, metadata, and samples
    let state_selector = d3.select("#selStateDataset");
    let county_selector = d3.select("#selCountyDataset");

    d3.json("/state-list").then(function (data) {
        // console.log(data);
        let state_data = data.state
        console.log(data.state[0]);

        // state_data is an object, so unpacking it into
        //  an array state_name, to bind it to the dropdown list

        let state_name = [];
        let i = 0; 
        for (let [key, value] of Object.entries(state_data)) {
                //  console.log(key + ': ' + value);
                 state_name[i] = value;
                 i += 1;
        };

        // Binding array state_name to the dropdown
        console.log(state_name[0]);
        let sel = document.getElementById('selStateDataset');
        for(var j = 0; j < state_name.length; j++) {
            var opt = document.createElement('option');
            opt.innerHTML = state_name[j];
            let read_state = opt.value
            read_state = state_name[j];
            sel.appendChild(opt);
        }
    
        // Call functions below using the first sample to build Demographic and initial plots
        stateDemographic(data.state[0]);
        populateCounty(state_name[0])
    });
}

//-------------------------------------------------------------------
//Now populating county
function populateCounty(sampleState) {

    console.log(sampleState)
    d3.json("/search_state/Alabama").then(function (data) {
        console.log(data);
        let county_data = data.county

        console.log(data.county[0]);

        // state_data is an object, so unpacking it into
        //  an array state_name, to bind it to the dropdown list

        let county_name = [];
        let i = 0; 
        for (let [key, value] of Object.entries(county_data)) {
                //  console.log(key + ': ' + value);
                 county_name[i] = value;
                 i += 1;
        };

        // Binding array state_name to the dropdown
        console.log(county_name);
        let sel = document.getElementById('selCountyDataset');
        for(var j = 0; j < county_name.length; j++) {
            var opt = document.createElement('option');
            opt.innerHTML = county_name[j];
            let read_county = opt.value
            read_county = county_name[j];
            sel.appendChild(opt);
        }
    
        // Call functions below using the first sample to build Demographic and initial plots
        countyDemographic(sampleState, county_data[0]);
        buildCharts(data[0]);
    });
}
//--------------------------------------------------------------   
// Define a function that will create metadata for given sample
function stateDemographic(sampleState) {
    console.log(sampleState)
 
    let demographicInfoBox = d3.select("#sample-statedata");
    demographicInfoBox.html("")
    // Read the json data
    // Parse and filter the data to get the sample's Demographic
    // Specify the location of the metadata and update it
    d3.json("/state-list").then(function (data) {
        console.log(data);
        // state_data is an object, so unpacking it into
        //  an array state_name, to bind it to the dropdown list
        // objectLength = Object.keys(data.state_abbr).length
        name_data = data.state
        abbr_data = data.state_abbr
        income_data = data.avg_per_capita_income
        age_data = data.avg_median_age
        population_data = data.avg_population
        poverty_data = data.avg_poverty_count
        degree_data = data.avg_bachelors_or_higher_2019
        console.log(abbr_data[0])
        
        demographicInfoBox.append("h6").text(`state_abbr => ${abbr_data[0]}`)
        demographicInfoBox.append("h6").text(`state_name => ${name_data[0]}`)
        demographicInfoBox.append("h6").text(`avg_per_capita_income => ${income_data[0]}`)
        demographicInfoBox.append("h6").text(`avg_median_age => ${age_data[0]}`)
        demographicInfoBox.append("h6").text(`avg_population => ${population_data[0]}`)
        demographicInfoBox.append("h6").text(`avg_poverty_count => ${poverty_data[0]}`)
        demographicInfoBox.append("h6").text(`avg_bachelors_or_higher => ${degree_data[0]}`)
    });
        
}
//-----------------------------------------------------------------------------
function countyDemographic(sampleState, sampleCounty) {
    console.log(sampleState)
    console.log(sampleCounty)
 
    let demographicInfoBox = d3.select("#sample-countydata");
    demographicInfoBox.html("")
    // Read the json data
    // Parse and filter the data to get the sample's Demographic
    // Specify the location of the metadata and update it
    d3.json("/search_state/Alabama").then(function (data) {
        console.log(data);
        // state_data is an object, so unpacking it into
        //  an array state_name, to bind it to the dropdown list
        // objectLength = Object.keys(data.state_abbr).length
        name_data = data.county
        income_data = data.per_capita_income
        age_data = data.median_age
        population_data = data.population
        poverty_data = data.poverty_count
        degree_data = data.bachelors_or_higher
        console.log(abbr_data[0])
        
        demographicInfoBox.append("h6").text(`county_name => ${name_data[0]}`)
        demographicInfoBox.append("h6").text(`per_capita_income => ${income_data[0]}`)
        demographicInfoBox.append("h6").text(`median_age => ${age_data[0]}`)
        demographicInfoBox.append("h6").text(`population => ${population_data[0]}`)
        demographicInfoBox.append("h6").text(`poverty_count => ${poverty_data[0]}`)
        demographicInfoBox.append("h6").text(`bachelors_or_higher => ${degree_data[0]}`)
    });    
}
//-----------------------------------------------------------------------------
// Define a function that will create charts for given sample
function buildCharts(sampleState) {

    let barChart = d3.select("#bar");

    // Read the json data

    d3.json("/state-list").then(function (data) {

        // console.log(Object.values(object1));
        console.log(Object.values(data.state));
        console.log(Object.values(data.avg_per_capita_income));
        let stateData = Object.values(data.state)
        let incomeData = Object.values(data.avg_per_capita_income)        
    })
}
// function optionChanged(sample) {
//     // The parameter being passed in this function is new sample id from dropdown menu
//     console.log(sample)
//     // Update metadata with newly selected sample
//     buildMetadata(sample);

//     // Update charts with newly selected sample
//     buildCharts(sample);
// }

// Initialize dashboard on page load
init();
