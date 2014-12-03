function loadLightBox(gene) {
    $('#myModal').modal('show');
    console.log(gene);

    document.getElementById("myModalLabel").innerHTML = gene.className;
    var desc = gene.desc;
    document.getElementById("myModalFooter").innerHTML = desc.substring(0, desc.indexOf(","));

    var dataset = [];

    var div = d3.select(document.getElementById("myModalBody")).append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);

    for (var i=0;i<gene.sequence.length; i++){
        dataset[i] = gene.sequence.charAt(i);
    }
    
    var margin = {top: 20, right: 20, bottom: 30, left: 20},
    width = 560 - margin.left - margin.right,
    height = 80 - margin.top - margin.bottom;
    
    var x_limit = Math.min(gene.sequence.length, width)

    var x = d3.scale.linear()
            .domain([0, x_limit])
            .range([0, width]);

    // var x = d3.scale.linear()
    // .domain([0, gene.sequence.length])
    // .range([0, width]);

    var y = d3.scale.linear()
    .domain([height, 0])
    .range([height, 0]);

    var zoom = d3.behavior.zoom()
    .x(x)
    .scaleExtent([1,100])
    .on("zoom", zoomed);

    d3.selectAll('.linsvg').remove();
    var linear_svg = d3.select(".modal-body").append("svg")
                        .attr("class","linsvg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                        .call(zoom);
    var bar1 = linear_svg.selectAll('.bar').data(dataset)
                        .enter()
                        .append("g")
                        .attr("transform", function(datum, index){
                            return "translate(" + x(index) + "," + 0 + ")"
                        })
                        .attr("class","bar")
                        .style('cursor',"url(http://www.google.com/intl/en_ALL/mapfiles/closedhand.cur) 4 4, move")
                        .style('stroke',"black")
                        .each(function(datum, index){
                            var g = d3.select(this);
                            var width = (x(1) - x(0));

                            g.append("rect")
                                .attr("class","rect")
                                .attr("width",width)
                                .attr("height", "40px")
                                .style("fill",function(d){
                                    if (d == "A")
                                        return "#31a354"; //Green
                                    else if (d == "G")
                                        return "#2c7fb8"; //Blue
                                    else if (d=="T")
                                        return "#fbff06"; //Yellow
                                    else
                                        return "#f03b20"; //Red
                                })
                                .style("stroke",function(d){
                                    return "black";
                                })
                                .style("stroke-width",function(d){
                                    return width/19;
                                })
                                .on("mouseover", function(d) {
                                    var desc = "";
                                    if (d == "A")
                                        desc = "Adenine";
                                    else if (d == "G")
                                        desc = "Guanine";
                                    else if (d=="T")
                                        desc = "Thiamine";
                                    else
                                        desc = "Cytosine";

                                    div.transition()        
                                    .duration(200)      
                                    .style("opacity", .9);      

                                    div.html("<strong> "+desc+"<BR>Position : "+(gene.startIndex + index)+"</strong>")
                                    .style("left", (d3.event.pageX)-465 + "px")
                                    .style("top", (2) + "px");    
                                })
                                .on("mouseout", function(d) {
                                    div.transition()        
                                    .duration(200)      
                                    .style("opacity", 0);
                                });
                        });
    function zoomed() {
        var width = (x(1) - x(0));
        var currentZoom = d3.event.scale;
        if (width > 50){
            zoom.scaleExtent([1,currentZoom])
        }

        linear_svg.selectAll(".bar")
                .attr('transform',function(datum, index){
                    return "translate(" +  Math.min(index*width, x(index)) + "," + 0+ ")"
                });
        linear_svg.selectAll('text').remove();
        linear_svg.selectAll(".rect")
                .attr('width',width)
                .style("stroke-width",function(d){
                    return width/19;
                })
                .each(function(datum, index){
                    if(width >9){
                        var g = d3.select(this.parentNode);
                        console.log(g)
                        g.append("text")
                        .attr("text-anchor","middle")
                        .attr("y", function(d){
                            if(width/2 >10){
                                return 23 + (width * 0.5 * 0.2)
                            }
                            return 23;
                        })
                        .attr("x", width/2)
                        .style("font-size", function(d){
                            return Math.max(10, width*0.5)
                        })
                        .style("fill", "rgb(0, 0, 0)")
                        .style("font-family","helvetica neue")
                        .text(datum);
                    }
                });
    }
}