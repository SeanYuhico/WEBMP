var dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];
let text = localStorage.getItem("krustykrab.json");
let obj = JSON.parse(text);
var stuff = []

// $.getJSON("krustykrab.json", )

    // console.log($(stuff.attr("#burger_sales")))
    // var JSONArray jsonArray = new JSONArray(readlocationFeed); 
    // var JSONObject jsnobject = new JSONObject(readlocationFeed);
    // var JSONArray jsonArray = jsnobject.getJSONArray("locations");
    // for (int i = 0; i < jsonArray.length(); i++) {
    //   JSONObject explrObject = jsonArray.getJSONObject(i);
    // }

    var svgWidth = 500, svgHeight = 300, barPadding = 5;
    var barWidth = (svgWidth/dataset.length);

    var svg = d3.select('svg')
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    var barChart = svg.selectAll("rect")
        .data(dataset)
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