// create a variable for the selector and assign it to the id = selDataset
    let dropdownMenu = d3.select("#selDataset");
//Use the D3 library to read in samples.json from the URL
    const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
//Create function to call metadata
function mData(sample){

    // Fetch the JSON data and console log it
    d3.json(url).then((data) => {
        let m_individ = data.metadata;
        console.log("Metadata Sample id:", m_individ);
        let resultArray = m_individ.filter(sampleObj => sampleObj.id == sample);
        let result = resultArray[0];
        // Use d3 to select the panel with id of #sample-metadata``
        let PANEL = d3.select("#sample-metadata");
        // Use .html("") to clear any existing metadata`PANEL.html("");
        // Hint (from TA!): Inside the loop, you will need to use d3 to append new
        // tags for each key-value in the metadata.
        PANEL.html("");
        for (key in result){
            PANEL.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
        };
    })}

//Setting up function for page setup/initial laoding (first ID in names list)
function init() {
    d3.json(url).then(function(data) {
        let names = data.names
        for (let i = 0; i < names.length; i++) {
            dropdownMenu.append("option").text(names[i]).property(
                "value",names[i]
            )
        }
        buildcharts(names[0])
        mData(names[0]);
    })
}
// Setting up functions to change and use option selected in drop down as "new" filter
init()
function optionChanged(newsample){
    buildcharts(newsample);
    mData(newsample);
}
// defining what bar and bubble plots should look like when drop down ID is selected
function buildcharts(sample_id){

    // Fetch the JSON data and console log it
    d3.json(url).then(function(data) {
// Extract  information from samples key
        let samples = data.samples;
        let sample=samples.filter(element=>element.id==sample_id)[0]
        var sample_values=sample.sample_values;
        var otu_ids = sample.otu_ids;
        var otu_labels = sample.otu_labels;
        
// Create interative bar chart
        let trace1 = {
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).map(otu_id => "OTU "+ otu_id).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            name: "Top ten OTUs per Individual",
            type: "bar",
            orientation: "h"
          };
        let data1 = [trace1];
        let layout = {
            title: "Bar chart: Top Ten OTUs per Individual"
            };
            Plotly.newPlot("bar", data1, layout);

  // Create interative bubble chart
        let trace2 = {
                x: otu_ids,
                y: sample_values,
                type: "scatter",
                mode: "markers",
                text: otu_labels,
                marker: {
                    size:sample_values,
                    color:otu_ids,
                    // various colorscales can be found : https://plotly.com/javascript/colorscales/#bluered-colorscale
                    colorscale: 'Bluered'
                },
                };
        let data2 = [trace2]
        let layout2 = {
                title: "Bubble Plot: Frequency of all OTUs per individual", 
                xaxis: {
                    title:"OTU ID"
                }
                };
                Plotly.newPlot("bubble", data2, layout2);        
})}




