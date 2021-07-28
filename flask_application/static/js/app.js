
// Need to get array for leaflet 

// d3.json("us_lat_long.json", function(data) {
//     console.log(data);


//-----------------------------------------------------
// d3.json("/income-list").then(response => {

//     console.log(response);

//     let x = response;

//     var trace = {
//         x: x,
//         type: 'histogram',
//     };

//     var data = [trace];
//     Plotly.newPlot('myDiv', data);

// })




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
        // console.log(state_name);
        let sel = document.getElementById('selStateDataset');
        for(var j = 0; j < state_name.length; j++) {
            var opt = document.createElement('option');
            opt.innerHTML = state_name[j];
            let read_state = opt.value
            read_state = state_name[j];
            sel.appendChild(opt);
        }
    
        // Call functions below using the first sample to build Demographic and initial plots
        stateDemographic(state_name[0]);
    });


    //--------------------------------------------------------------

    d3.json("/county-list").then(function (data) {
        // console.log(data);
        let county_data = data.county
        // console.log(data.county[0]);

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
        // console.log(county_name);
        let sel = document.getElementById('selCountyDataset');
        for(var j = 0; j < county_name.length; j++) {
            var opt = document.createElement('option');
            opt.innerHTML = county_name[j];
            let read_county = opt.value
            read_county = county_name[j];
            sel.appendChild(opt);
        }
    
        // Call functions below using the first sample to build Demographic and initial plots
        // countyDemographic(county_name[0]);
    });


 
        
        // buildCharts(data[0]);
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
        stateData = data.state

        // state_data is an object, so unpacking it into
        //  an array state_name, to bind it to the dropdown list
        // let st_abbr = [];
        // let st_name = [];
        // let st_avg_per_capita_income = [];
        // let st_avg_median_age = [];
        // let st_avg_population = [];
        // let st_avg_poverty_count = [];
        // let st_avg_bachelors_or_higher_2019 = [];

       
    
   

    //     switch (data) {
    //         case (data.state_abbr):
    //             let i = 0; 
    //             for (let [key, value] of Object.entries(data.state_abbr)) {
    //                 //  console.log(key + ': ' + value);
    //                 st_abbr[i] = value;
    //                  i += 1;
    //         };
    //         case (data.state):
    //             let i = 0; 
    //             for (let [key, value] of Object.entries(data.state)) {
    //                 //  console.log(key + ': ' + value);
    //                 st_name[i] = value;
    //                  i += 1;
    //         };
    //         case (data.avg_per_capita_income):
    //             let i = 0; 
    //             for (let [key, value] of Object.entries(data.avg_per_capita_income)) {
    //                 //  console.log(key + ': ' + value);
    //                 st_avg_per_capita_income[i] = value;
    //                  i += 1;
    //         };

    //         case (data.avg_median_age):
    //             let i = 0; 
    //             for (let [key, value] of Object.entries(data.avg_median_age)) {
    //                 //  console.log(key + ': ' + value);
    //                 st_avg_median_age[i] = value;
    //                  i += 1;
    //         };

    //         case (data.avg_median_age):
    //             let i = 0; 
    //             for (let [key, value] of Object.entries(data.avg_median_age)) {
    //                 //  console.log(key + ': ' + value);
    //                 st_avg_median_age[i] = value;
    //                  i += 1;
    //         };
            
    
        
        
    });
}

//-----------------------------------------------------------------------------
// // Define a function that will create charts for given sample
// function buildCharts(sample) {

//     let bubbleChart = d3.select("#bubble");

//     // Read the json data

//     d3.json("/income-list").then(function (data) {

//         let metaData = data.metadata;
//         //console.log(data.metadata[1]);
//         console.log(metaData);

//         // fitering first matching item from' metadata' which is again an object 
//         filtermetaData = metaData.filter(firstItem => firstItem.id == sample)
//         console.log(filtermetaData)
//         // assigning the first item in the object to a variable
//         filtermetaData = filtermetaData[0]
//         console.log(filtermetaData.wfreq)

//         // Parse and filter the data to get the sample's OTU data
//         // Pay attention to what data is required for each chart
//         let samplesData = data.samples;
//         console.log(samplesData);
//         // fitering first matching item from' metadata' which is again an object 
//         filterData = samplesData.filter(firstItem => firstItem.id == sample)
//         console.log(filterData)
//         // assigning the first item in the object to a variable
//         filterData = filterData[0]
//         console.log(filterData.id)
//         Id = filterData.id
//         otuIds = filterData.otu_ids
//         sampleValues = filterData.sample_values
//         otuLabels = filterData.otu_labels
//         console.log(Id)
//         console.log(otuIds)
//         console.log(sampleValues)
//         console.log(otuLabels)

//         // Create bubble chart in correct location
//         var trace1 = {
//             x: otuIds,
//             y: sampleValues,
//             mode: 'markers',
//             marker: {
//                 color: otuIds,
//                 opacity: [1, 0.8, 0.6, 0.4],
//                 size: sampleValues
//             }
//         };

//         var data = [trace1];

//         var layout = {

//             title: 'OTU_IDs Vs. Sample_Values',
//             showlegend: false,
//             height: 500,
//             width: 1300,

//             xaxis: {
//                 title: {
//                 text: 'OTU_IDs',
//                 font: {
//                 family: 'Courier New, monospace',
//                 size: 18,
//                 color: '#7f7f7f'
//                 }
//                 }
//                 },

//                 yaxis: {
//                 title: {
//                 text: 'Sample_Values',
//                 font: {
//                 family: 'Courier New, monospace',
//                 size: 18,
//                 color: '#7f7f7f'
//                 }
//                 }
//                 }

//         };

//         Plotly.newPlot('bubble', data, layout);

//         // Create bar chart in correct location
//          // Plotly Stacked Bar Chart: /bar-list1  /state-list

//          d3.json("/bar-list").then(response => {


//             console.log(response)
        
//             var trace1 = {
//                 x: response.state,
//                 y: response.below_hs_diploma_2019,
//                 name: 'SF Zoo',
//                 type: 'bar'
//             };
            
//             var trace2 = {
//                 x: response.state,
//                 y: response.hs_diploma_2019,
//                 name: 'LA Zoo',
//                 type: 'bar'
//             };
        
//             var data = [trace1, trace2];
            
//             var layout = {barmode: 'stack'};
            
//             Plotly.newPlot('myDiv', data, layout);
        

//         // gauge chart


//         const config = {
//             type: 'bubble',
//             data: data,
//             options: {
//               responsive: true,
//               plugins: {
//                 legend: {
//                   position: 'top',
//                 },
//                 title: {
//                   display: true,
//                   text: 'Chart.js Bubble Chart'
//                 }
//               }
//             },
//           };
        
// })

//     });
// }

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
