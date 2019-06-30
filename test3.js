let burgSales={}, specSales={}, burgSpec={}; //kPattie, kDeLuxe;
    
$(document).ready(function(){
    $.ajax({
        url: "krustykrab.json",
        dataType: "json",
        type: "get",
        cache: false,
        success: function(data){
            $(data).each(function(index, value){ //$(data.species_sales) is the specific object
                // console.log(data)
                // console.log(burgSales)
                burgSales = data.burger_sales
                specSales = data.species_sales
                burgSpec = data.burger_by_species
                // kPattie = data.burger_sales
                console.log(burgSales);
                // console.log(specSales);
                // console.log(burgSpec);
                createGraph(burgSales);
            });
            
        } 
    });
});

function createGraph(data){
    let sample = $(data).each(function(index, value){
        
    })
    // console.log(sample)
    console.log(sample);
    console.log(val.size)
    var svgWidth = 500, svgHeight = 300, barPadding = 5;
    var barWidth = (svgWidth/val.value);
    
    var svg = d3.select('svg')
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    var barChart = svg.selectAll("rect")
        .data(value)
        .enter()
        .append("rect")
        .attr("y", function(d){
            return svgHeight - d;
        })
        .attr("height", function(d){
            return d;
        })
        .attr("width", barWidth - barPadding)
        .attr("transform", function(d, i){
            var translate = [barWidth*i, 0];
            return "translate("+ translate +")";
        })

    
}