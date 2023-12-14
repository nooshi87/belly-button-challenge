// create a variable for the selector and assign it to the id = selDataset
    let dropdownMenu = d3.select("#selDataset");
//Use the D3 library to read in samples.json from the URL
    const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function init() {
    d3.json(url).then(function(data) {
        let names = data.names
        for (let i = 0; i < names.length; i++) {
            dropdownMenu.append("option").text(names[i]).property(
                "value",names[i]
            )
        }
        buildcharts(names[0])
    })
}
init()
function optionChanged(newsample){
    buildcharts(newsample);
}
function buildcharts(sample_id){

    // Fetch the JSON data and console log it
    d3.json(url).then(function(data) {
// Extract  information from samples key
        let samples = data.samples;
        console.log("Original sample data:", samples);
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
        ;

