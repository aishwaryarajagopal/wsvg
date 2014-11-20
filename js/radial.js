/**
 * Created by John on 11/2/14.
 */

var geneMap = {
    "name" : "",
    "children" : []
};

var colorMap = {
    "blacktipreefshark": "#DD1C77",
    "giantgrouper": "#C994C7",
    "gianttrevally": "#756BB1",
    "harborseal": "#636363",
    "wobblegong": "#99D8C9",
    "human": "#FC9272",
    "sandbarshark": "#9EBCDA",
    "saltwatercrocodile": "#FEC44F",
    "whaleshark": "#1C9099",
    "zebrafish": "#31A354"
};

var species = [];
var classMap = {};
var geneLinks = [];

// Values needed for the layout of the radial node-linked graph
var diameter = 640,
    radius = 940 / 2,
    innerRadius = radius - 270,
    circlew = 940;


// Cluster of each gene bars that appear in a quadrant
var geneCluster = d3.layout.cluster()
    .size([360, innerRadius])
    .sort(function(a, b) { return d3.descending(a.position, b.position);})
    .value(function(d) { return d.length; });

var geneBundle = d3.layout.bundle();

// The svg that is appended to the game-network div
// Give enough space to layout the radial graph
var radialSvg = d3.select("#radialVis").append("svg")
    .attr("width", circlew)
    .attr("height", diameter+240)
    .append("g")
    .attr("transform", "translate(" + (radius + 75) + "," + (radius - 50) + ")");

var svgDefs = radialSvg.append("svg:defs");

// Define the line type that will be used to connect genes
var line = d3.svg.line.radial()
    .interpolate("bundle")
    .tension(0.55)
    .radius(function(d) { return d.y; })
    .angle(function(d) { return d.x / 180 * Math.PI; });

// Max values to set so I can adjust the radial view
var maxGeneLength = 0,
    gradientCounter = 0;

// On document ready, process the json file
$(document).ready(function () {
    d3.json("data.json", processGenomeData);
});

/**
 * Process the mito genome data for the species
 * @param data - json formatted data
 */
function processGenomeData(data) {
    // Grab the json object and point to it
    species = data;

    // Go through each species and make a link within each gene to the species that have that same gene
    species.forEach(function(s,i,species){
        classMap[s.name.toLowerCase()] = s;
        s.className = s.name.toLowerCase();
        s.children = [];
        s.genes.forEach(function(g,ii, genes){
            g.speciesClass = s.className;
            g.connectedNodes = [];
            g.className = getGeneClassName(s.name, g.name);
            s.children.push(g);
            maxGeneLength = Math.max(g.length, maxGeneLength);
            if(!geneLinks[g.name]) {
                geneLinks[g.name] = {name: g.name, orgs:[s], genes:[g]};
            } else {
                geneLinks[g.name].orgs.push(s);
                geneLinks[g.name].genes.push(g);
            }
        });
    });

    species.forEach(function(s,i,species){
        s.links = [];
        s.genes.forEach(function(g,ii, genes){
            var gl = geneLinks[g.name];
            if(gl){
                for(var o = 0; o < gl.orgs.length; o++){
                    if(gl.orgs[o] != s){
                        var link = {type: s.name+"-"+ gl.orgs[o].name+"-link", source: g, target: gl.genes[o]};
                        g.connectedNodes.push(gl.genes[o]);
                        s.links.push(link);
                    }
                }
            }
        });
    });

    drawGeneChart();

}

function drawGeneChart(){

    geneMap = {
        "name" : "",
        "children" : []
    };

    geneBundle = d3.layout.bundle();
    gradientCounter = 0;

    radialSvg.selectAll("*").remove();
    svgDefs = radialSvg.append("svg:defs");

    geneCluster = d3.layout.cluster()
        .size([360, innerRadius])
        .sort(function(a, b) { return d3.descending(a.position, b.position);})
        .value(function(d) { return d.length; });

    var selectedSpecies = [];

    for(var o = 1; o < 5; o++){
        var select = $("#organism"+o)[0];
        var c = select.options[select.selectedIndex].value;
        if(c != "undefined"){
            selectedSpecies.push(classMap[c]);
        }
    }

    if(selectedSpecies.length < 2){
        return;
    }

    var mergedLinks = [];

    for(var s = 0; s < selectedSpecies.length; s++){
        geneMap.children.push(selectedSpecies[s]);
    }

    var geneBarScale = d3.scale.linear()
        .domain([0,maxGeneLength])
        .range([0,50]);

    var geneStrokeScale = d3.scale.linear()
        .domain([0,maxGeneLength])
        .range([0,5]);

    var nodes = geneCluster.nodes(geneMap);

    // Looks into all of the selected species - and finds the ones that are now nodes
    // Only want links from the first to the next, then from the second to the third, then from the third to fourth
    for(var s = 0; s < selectedSpecies.length; s++){
        var other = [];
        if(selectedSpecies.length == 2){
            other = s == 0 ? [1] : [0];
        }
        if(selectedSpecies.length == 3){
            other = s == 0 ? [1,2] : (s == 1 ? [0,2] : [0,1]);
        }
        if(selectedSpecies.length == 4){
            other = s == 0 ? [1,2,3] : (s == 1 ? [0,2,3] : (s == 2 ? [0,1,3] : [0,1,2]));
        }
        for(var l = 0; l < selectedSpecies[s].links.length; l++){
            // For this link make sure the target is a selected species
            other.forEach(function(o){
                var parent = selectedSpecies[s].links[l].target["parent"]
                if(parent && parent == selectedSpecies[o]) {
                    mergedLinks.push(selectedSpecies[s].links[l]);
                }
            })
        }
    }

    radialSvg.selectAll(".links")
        .data(geneBundle(mergedLinks))
        .enter().append("path")
        .attr("class", function(d){
            var linkClass = 'links link-' + d[0]['className'] + ' link-' + d[4]['className'];
            return linkClass
        })
        .attr("id", function(d){
            return 'link-' + d[0]['className'] + '-' + d[4]['className']
        })
        .attr("d", line)
        .style("stroke-width", function(d){
            return geneStrokeScale(d[0].length);
        })
        .style("stroke", function(d){
            return 'url(#' + getGeneGradient(d[0]["x"] - 90, d[4]["x"] - 90, d[0]["speciesClass"], d[4]["speciesClass"]) +')'
        });

    radialSvg.selectAll(".radnode-dot")
        .data(nodes.filter(function(n) { return n.depth == 2; }))
        .enter().append("g")
        .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
        .append("rect")
        .attr("class", function(d){
            return 'radnode-dot ' + 'nodedot-' + d.className
        })
        .attr('y', -6)
        .attr('x', -2)
        .attr("angle", function(d) { return d.x - 90; })
        .attr('height', 12)
        .attr('width', function(d){
            return geneBarScale(d.length);
        })
        .style('fill', function(d){
            return getGeneColor(d.speciesClass, d.length)
        })
        .on("mouseover", showGeneConnections)
        .on("mouseout", hideGeneConnections)
        .on("click", showGeneComparison);

    radialSvg.selectAll(".radnode")
        .data(nodes.filter(function(n) { return n.depth == 2; }))
        .enter().append("g")
        .attr("class", 'radnode')
        .attr("transform", function(d) {
            var translatevalue = d.y + 5;
            translatevalue += geneBarScale(d.length);
            return "rotate(" + (d.x - 90) + ")translate(" + translatevalue + ")";
        })
        .append("text")
        .attr("dx", function(d) { return d.x < 180 ? 0 : 0; })
        .attr("dy", "5")
        .attr("angle", function(d) { return d.x - 90; })
        .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
        .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
        .text(function(d) { return d.name; })
        .attr("id", function(d){
            return 'nodetext-' + d.className
        })
        .attr("class", function(d){
            return 'circle-text ' + 'b-text'+d.className;
        })
        .style('fill', '#394B9F')
        .on("mouseover", showGeneConnections)
        .on("mouseout", hideGeneConnections)
        .on("click", showGeneComparison);

    $(".radnode").mousemove(setGenePopupPosition);
    $(".radnode-dot").mousemove(setGenePopupPosition);
}



function getGeneClassName(species, gene){
    var name = species.toString() + "_" + gene.toString();
    name = name.replace(/ /g,'')
    name = name.replace(/\'/g,'')
    name = name.replace(/\//g,'')
    name = name.replace(/&/g,'')
    name = name.replace(/\./g,'')
    name = name.replace(/-/,'')
    name = name.replace(/!/g,'')
    name = name.replace(/:/g,'').toLowerCase()
    return name;
}

function getGeneColor(species, length){

    // TODO change color intensity based on connection?
    return colorMap[species];
}

function showGeneConnections(d) {

    radialSvg.selectAll('.circle-text')
        .classed('circle-text-dim', true);

    radialSvg.select('#nodetext-' + d.className)
        .classed('highlight', true)
        .classed('circle-text-dim', false);

    radialSvg.selectAll('.radnode-dot')
        .style("opacity", .05);

    radialSvg.selectAll('path.links')
        .style("opacity", .01);

    radialSvg.selectAll('path.link-' + d.className)
        .style("opacity",1);

    radialSvg.selectAll('.nodedot-' + d.className)
        .style("opacity",1);

    d.connectedNodes.forEach(function(n){
        radialSvg.select('#nodetext-' + n.className)
            .classed('highlight', true)
            .classed('circle-text-dim', false);

        radialSvg.selectAll('.nodedot-' + n.className)
            .style("opacity", 1)
    });

    $("#node-info").empty()

    $("#geneTemplate").tmpl( {
        speciesName: d.speciesClass,
        length: d.length,
        geneName: d.name,
        color: getGeneColor(d.speciesClass, d.length)
    }).appendTo( "#node-info" );

    $("#node-info").show()

}

function showGeneComparison(d) {
    var genesToCompare = [];
    var g = 0;
    d.connectedNodes.forEach(function(n){
        if(n.parent) {
            genesToCompare[g] = {speciesName: n.speciesClass, geneName: n.name, sequence: n.sequence};
            g++;
        }
    });
}

function hideGeneConnections(d) {
    $("#node-info").hide();

    radialSvg.selectAll('path.links')
        .style("opacity", 1);

    radialSvg.selectAll('.circle-text')
        .classed('circle-text-dim', false)
        .classed('highlight', false);

    radialSvg.selectAll('.radnode-dot')
        .style("opacity", 1);
}

function getGeneGradient(startValue, endValue, species1, species2){

    // Create a gradient id so it can be referenced by the path-style-stroke
    var gradientId = "gradient" + gradientCounter;

    // Used to create the angle for the gradient
    var x1 = Math.cos(startValue * Math.PI / 180) / 2 + 0.5,
        y1 = Math.sin(startValue * Math.PI / 180) / 2 + 0.5,
        x2 = Math.cos(endValue * Math.PI / 180) / 2 + 0.5,
        y2 = Math.sin(endValue * Math.PI / 180) / 2 + 0.5;

    // Set the x-y coordinates that represent the angle of this linear gradient
    var gradient = svgDefs.append("svg:linearGradient")
        .attr("id", gradientId)
        .attr("x1", x1).attr("y1", y1)
        .attr("x2", x2).attr("y2", y2);

    // Define a stop color - the first one is the source node
    gradient.append("svg:stop")
        .attr("offset", "10%")
        .attr("stop-color", getGeneColor(species1, startValue));

    // Define a stop color - the second one is the target node
    gradient.append("svg:stop")
        .attr("offset", "90%")
        .attr("stop-color", getGeneColor(species2, endValue));

    // Increment the counter so we have unique names
    gradientCounter++;

    // Return the id for the path to reference
    return gradientId;
}

function setGenePopupPosition(e){
    e = jQuery.event.fix(e);

    var a = e.target.attributes["angle"].value;

    var a = a * Math.PI / 180;

    // Center position of the radial vis
    var cY = $("#radialVis").offset().top + radius - 50;
    var cX = $("#radialVis").offset().left + radius + 75;

    // Subtract midpoints, so that midpoint is translated to origin
    // and add it in the end again
    var xr = (radius - 100) * Math.cos(a) + cX,
        yr = (radius - 100) * Math.sin(a) + cY;

    var nTop    = yr - $("#node-info").outerHeight()/2;
    var nLeft   = xr - $("#node-info").outerWidth()/2;

    $('.radial-popup').css({
        top: nTop,
        left: nLeft
    });

}

