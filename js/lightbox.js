var lightBox,
    linearSvg,
    labelText,
    footerText,
    linearTip,
    xScale;

var zoom = d3.behavior.zoom()
    .x(xScale)
    .scaleExtent([1,100])
    .on("zoom", zoomed);

var peptideMap = {
    A: 'Adenine',
    C: 'Cytosine',
    T: 'Thiamine',
    G: 'Guanine'
};

var peptideColorMap = {
    A: '#0000FF',
    C: '#FF0000',
    T: '#FFFF00',
    G: '#00FF00'
};

function initComponents(){
    lightBox = $('#myModal');
    labelText = $('#myModalLabel');
    footerText = $('#myModalFooter');

    linearTip = lightBox.append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    linearSvg = d3.select(".modal-body").append("svg")
        .attr("class","linsvg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(zoom);
}

function loadLightBox(gene) {
    lightBox.modal('show');
    // Fix to use a proper p element etc.
    labelText.innerHTML = gene.className;
    footerText.innerHTML = gene.desc;

    var dataset = [];

    for (var i = 0; i < gene.sequence.length; i++) {
        dataset[i] = gene.sequence.charAt(i);
    }

    var margin = {top: 20, right: 20, bottom: 30, left: 20},
        width = 560 - margin.left - margin.right,
        height = 80 - margin.top - margin.bottom;

    var xScale = d3.scale.linear()
        .domain([0, gene.sequence.length])
        .range([0, width]);

    d3.selectAll('.linsvg').remove();

    var bar1 = linearSvg.selectAll('.bar').data(dataset);

    bar1.enter()
        .append("g")
        .attr("transform", function (datum, index) {
            return "translate(" + x(index) + "," + 20 + ")"
        })
        .attr("class", "bar")
        .style('cursor', "url(http://www.google.com/intl/en_ALL/mapfiles/closedhand.cur) 4 4, move")
        .each(function (datum, index) {
            var g = d3.select(this);
            var width = (x(1) - x(0));

            g.append("rect")
                .attr("width", width)
                .attr("height", "20px")
                .style("fill", function (d) {return peptideColorMap[d]})
                .style("stroke", 'black')
                .style("stroke-width", width / 19)
                .on("mouseover", onMouseOver)
                .on("mouseout", onMouseOut);
            if (width > 9) {
                g.append("text")
                    .attr("text-anchor", "middle")
                    .attr("y", "13")
                    .attr("x", width / 2)
                    .attr("font-size", "10")
                    .attr("fill", "black")
                    .text(datum);
            }
        });
}

function zoomed(dataset) {
    var width = (x(1) - x(0));
    var currentZoom = d3.event.scale;
    if (width > 50){
        zoom.scaleExtent([1,currentZoom])
    }

    var bar1 = linearSvg.selectAll('.bar').data(dataset)
        .enter()
        .append("g")
        .attr("transform", function(datum, index){
            return "translate(" +  Math.min(index*width, x(index)) + "," + 20 + ")"
        })
        .attr("width", width)
        .attr("class","bar")
        .style('cursor',"url(http://www.google.com/intl/en_ALL/mapfiles/closedhand.cur) 4 4, move")
        .each(function(datum, i){
            var g = d3.select(this);
            g.append("rect")
                .attr("width",width)
                .attr("height", "20px")
                .style("fill",function(d){return peptideColorMap[d]})
                .style("stroke",function(d){"black"})
                .style("stroke-width",width/19)
                .on("mouseover", onMouseOver)
                .on("mouseout", onMouseOut);

            if(width > 9){
                g.append("text")
                    .attr("text-anchor","middle")
                    .attr("y", "13")
                    .attr("x", width/2)
                    .attr("font-size", "10")
                    .attr("fill", "black")
                    .text(datum);
            }
        });
}


function onMouseOver(d, gene, i) {
    var desc = peptideMap[d];
    linearTip.transition()
        .duration(200)
        .style("opacity", .9);
    linearTip.html("<strong> " + desc + "<BR>Position : " + (gene.startIndex + i) + "</strong>")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (100) + "px");
}

function onMouseOut(d) {
    linearTip.transition()
        .duration(200)
        .style("opacity", 0);
}
var lightBox,
    linearSvg,
    labelText,
    footerText,
    linearTip,
    xScale;

var zoom = d3.behavior.zoom()
    .x(xScale)
    .scaleExtent([1,100])
    .on("zoom", zoomed);

var peptideMap = {
    A: 'Adenine',
    C: 'Cytosine',
    T: 'Thiamine',
    G: 'Guanine'
};

var peptideColorMap = {
    A: '#0000FF',
    C: '#FF0000',
    T: '#FFFF00',
    G: '#00FF00'
};

function initComponents(){
    lightBox = $('#myModal');
    labelText = $('#myModalLabel');
    footerText = $('#myModalFooter');

    linearTip = lightBox.append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    linearSvg = d3.select(".modal-body").append("svg")
        .attr("class","linsvg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(zoom);
}

function loadLightBox(gene) {
    lightBox.modal('show');
    // Fix to use a proper p element etc.
    labelText.innerHTML = gene.className;
    footerText.innerHTML = gene.desc;

    var dataset = [];

    for (var i = 0; i < gene.sequence.length; i++) {
        dataset[i] = gene.sequence.charAt(i);
    }

    var margin = {top: 20, right: 20, bottom: 30, left: 20},
        width = 560 - margin.left - margin.right,
        height = 80 - margin.top - margin.bottom;

    var xScale = d3.scale.linear()
        .domain([0, gene.sequence.length])
        .range([0, width]);

    d3.selectAll('.linsvg').remove();


    bar1.enter()
        .append("g")
        .attr("transform", function (datum, index) {
            return "translate(" + x(index) + "," + 20 + ")"
        })
        .attr("class", "bar")
        .style('cursor', "url(http://www.google.com/intl/en_ALL/mapfiles/closedhand.cur) 4 4, move")
        .each(function (datum, index) {
            var g = d3.select(this);
            var width = (x(1) - x(0));

            g.append("rect")
                .attr("width", width)
                .attr("height", "20px")
                .style("fill", function (d) {return peptideColorMap[d]})
                .style("stroke", 'black')
                .style("stroke-width", width / 19)
                .on("mouseover", onMouseOver)
                .on("mouseout", onMouseOut);
            if (width > 9) {
                g.append("text")
                    .attr("text-anchor", "middle")
                    .attr("y", "13")
                    .attr("x", width / 2)
                    .attr("font-size", "10")
                    .attr("fill", "black")
                    .text(datum);
            }
        });
}

function zoomed(dataset) {
    var width = (x(1) - x(0));
    var currentZoom = d3.event.scale;
    if (width > 50){
        zoom.scaleExtent([1,currentZoom])
    }

    var bar1 = linearSvg.selectAll('.bar').data(dataset)
        .enter()
        .append("g")
        .attr("transform", function(datum, index){
            return "translate(" +  Math.min(index*width, x(index)) + "," + 20 + ")"
        })
        .attr("width", width)
        .attr("class","bar")
        .style('cursor',"url(http://www.google.com/intl/en_ALL/mapfiles/closedhand.cur) 4 4, move")
        .each(function(datum, i){
            var g = d3.select(this);
            g.append("rect")
                .attr("width",width)
                .attr("height", "20px")
                .style("fill",function(d){return peptideColorMap[d]})
                .style("stroke",function(d){"black"})
                .style("stroke-width",width/19)
                .on("mouseover", onMouseOver)
                .on("mouseout", onMouseOut);

            if(width > 9){
                g.append("text")
                    .attr("text-anchor","middle")
                    .attr("y", "13")
                    .attr("x", width/2)
                    .attr("font-size", "10")
                    .attr("fill", "black")
                    .text(datum);
            }
        });
}


function onMouseOver(d, gene, i) {
    var desc = peptideMap[d];
    linearTip.transition()
        .duration(200)
        .style("opacity", .9);
    linearTip.html("<strong> " + desc + "<BR>Position : " + (gene.startIndex + i) + "</strong>")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (100) + "px");
}

function onMouseOut(d) {
    linearTip.transition()
        .duration(200)
        .style("opacity", 0);
}
