/*
Code for displaying the radial vis.
 */

var geneMap = {
    "name" : "",
    "children" : []
};

var colorMap = {
    "blacktipreefshark": '#636363',
    "giantgrouper": '#C994C7',
    "gianttrevally": "#756BB1",
    "harborseal": "#DD1C77",
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
var selectValues = ["undefined","undefined","undefined","undefined"];

// Values needed for the layout of the radial node-linked graph
var diameter = 640,
    radius = 940 / 2,
    innerRadius = radius - 270,
    circlew = 940,
    availDegrees = 360,
    startDegrees = 0,
    radialSections = 4;

// Cluster of each gene bars that appear in a quadrant
var geneCluster = d3.layout.cluster()
    .size([availDegrees, innerRadius])
    .sort(function(a, b) { return d3.descending(a.startIndex, b.startIndex);})
    .value(function(d) { return d.length; });

var geneBundle = d3.layout.bundle();

// The svg that is appended to the game-network div
// Give enough space to layout the radial graph
var radialSvg = d3.select("#radialVis").append("svg")
    .attr("width", circlew)
    .attr("height", diameter+240)
    .append("g")
    .attr("transform", "translate(" + (radius + 75) + "," + (radius - 150) + ")");

var svgDefs = radialSvg.append("svg:defs");

// Define the line type that will be used to connect genes
var line = d3.svg.line.radial()
    .interpolate("bundle")
    .tension(0.55)
    .radius(function(d) { return d.y; })
    .angle(function(d) { return (d.x + 90 - startDegrees) / 180 * Math.PI; });

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

    // TODO need to re-order the genes by startposition

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

    updateRadialVis();
}

function updateRadialVis() {
    initializeRadialVis();
    //addNodeToVis("whaleshark");
    drawEmptyVis();
    drawRadialVis();
}

function drawRadialVis(){

    // Need to protect a draw from an empty children array
    if(geneMap.children.length == 0){
        return;
    }
    // Transition timing
    var moveTime = 750,
        exitTime = 500,
        enterTime = 500;

    var mergedLinks = [];

    var geneBarScale = d3.scale.linear()
        .domain([0,maxGeneLength])
        .range([0,50]);

    var nodes = geneCluster.nodes(geneMap);

    // Looks into all of the selected species - and finds the ones that are now nodes
    // Only want links from the first to the next, then from the second to the third, then from the third to fourth
    for(var s = 0; s < geneMap.children.length; s++){
        // Get an array of all the other indices
        var other = Array.apply(null, {length: geneMap.children.length}).map(Number.call, Number);

        // Go through each link in the current species
        for(var l = 0; l < geneMap.children[s].links.length; l++){
            // For this link make sure the target is a selected species
            other.forEach(function(o){
                var parent = geneMap.children[s].links[l].target["parent"]
                if(parent == geneMap.children[o]) {
                    // Push only links that have a parent that is in the current tree.
                    mergedLinks.push(geneMap.children[s].links[l]);
                }
            })
        }
    }

    var icons = radialSvg.selectAll('.icon')
        .data(nodes.filter(function(n) { return n.depth == 1; }), function(d){return d.className;});

    // Transition the genes to their position
    icons.transition().duration(moveTime)
        //.attr("transform", function(d) {
        //    return "rotate(" + (d.x - startDegrees) + ") translate(300)";
        //});
        .attr('y', function(d){
            var y = 325 * Math.sin((d.x - startDegrees) * Math.PI /180);
            return y - 25;
        })
        .attr('x', function(d){
            var x = 325 * Math.cos((d.x - startDegrees) * Math.PI /180);
            return x - 50;
        });

    // Add new genes - transition fade in
    icons.enter().append("image")
        .attr('class', function(d){ return 'icon ' + 'icon-'+ d.className; })
        .attr('height', 100)
        .attr('width', 100)
        .attr('y', function(d){
            var y = 325 * Math.sin((d.x - startDegrees) * Math.PI / 180);
            return y - 25;
        })
        .attr('x', function(d){
            var x = 325 * Math.cos((d.x - startDegrees) * Math.PI / 180);
            return x - 50;
        })
        .attr('xlink:href', function(d) { return 'icons/' + d.className + ".png"; })
        .style("opacity", 0)
        .transition().duration(enterTime)
        .style("opacity", 1);

    // Remove genes that have been removed - fade out
    icons.exit().transition().duration(exitTime)
        .style("opacity",0)
        .remove();


    // Grab all of the links, need to be displayed first to appear on bottom of svg
    var links = radialSvg.selectAll(".links")
        .data(geneBundle(mergedLinks), function(d){ return d[0]['className'] + "-" +d[4]['className'];});

    // Old links transition to new position
    links.transition().duration(moveTime)
        .attr("d",line);

    links.style("stroke", function(d){
        return 'url(#' + getGeneGradient(d[0]["x"] - startDegrees, d[4]["x"] - startDegrees, d[0]["speciesClass"], d[4]["speciesClass"], d[0]["className"], d[4]["className"]) +')'
    });

    // Add new links - transition fade in
    links.enter().append("path")
        .attr("class", function(d){
            var linkClass = 'links link-' + d[0]['className'] + ' link-' + d[4]['className'];
            return linkClass
        })
        .attr("id", function(d){
            return 'link-' + d[0]['className'] + '-' + d[4]['className']
        })
        .attr("d", line)
        .style("stroke-width", 2)
        .style("opacity", 0)
        .style("stroke", function(d){
            return 'url(#' + getGeneGradient(d[0]["x"] - startDegrees, d[4]["x"] - startDegrees, d[0]["speciesClass"], d[4]["speciesClass"], d[0]["className"], d[4]["className"]) +')'
        })
        .transition().duration(enterTime * 4)
        .style("opacity",1);

    // Remove old links - transition fade out
    links.exit().transition().duration(exitTime)
        .style("opacity", 0)
        .remove();

    // Grab all of the gene bars
    var bars = radialSvg.selectAll(".radnode-dot")
        .data(nodes.filter(function(n) { return n.depth == 2; }), function(d){return d.className;});

    // Transition the genes to their position
    bars.transition().duration(moveTime)
        .attr("transform", function(d) {
            return "translate(-200) rotate(" + (d.x - startDegrees - d.x0) + ") translate(200)";
        });

    bars.attr("angle", function(d) { return d.x - startDegrees; });

    // Add new genes - transition fade in
    bars.enter().append("g")
        .attr("transform", function(d) {
            d.x0 = d.x - startDegrees;
            return "rotate(" + (d.x - startDegrees) + ")translate(" + d.y + ")"; })
        .append("rect")
        .attr("class", function(d){return 'radnode-dot ' + 'nodedot-' + d.className;})
        .attr('y', -6)
        .attr('x', -2)
        .attr("angle", function(d) {return d.x0;})
        .attr('height', 12)
        .attr('width', function(d){
            return geneBarScale(d.length);
        })
        .style('fill', function(d){
            return getGeneColor(d.speciesClass, d.length)
        })
        .style("opacity", 0)
        .on("mouseover", showGeneConnections)
        .on("mouseout", hideGeneConnections)
        .on("click", showGeneComparison)
        .on("dblclick", function(d){loadLightBox(d)})
        .transition().duration(enterTime)
        .style("opacity", 1);

    // Remove genes that have been removed - fade out
    bars.exit().transition().duration(exitTime)
        .style("opacity",0)
        .remove();

    // Grab all gene text fields
    var text = radialSvg.selectAll(".radnode")
        .data(nodes.filter(function(n) { return n.depth == 2; }), function(d){ return d.className;});

    // Move all texts with transition
    text.transition().duration(moveTime)
        .attr("transform", function(d) {
            var translatevalue = d.y + 5;
            translatevalue += geneBarScale(d.length);
            return "rotate(" + (d.x - startDegrees) + ") translate(" + translatevalue + ")";
        });

    //
    text.select("text")
        .transition().duration(moveTime)
        .attr("dx", function(d) { return d.x < 180 ? 0 : 0; })
        .attr("angle", function(d) { return d.x - startDegrees; })
        .attr("text-anchor", function(d) { return (d.x + 90 - startDegrees) < 180 ? "start" : "end"; })
        .attr("transform", function(d) { return (d.x + 90 - startDegrees) < 180 ? null : "rotate(180)"; });

    text.enter().append("g")
        .attr("class", 'radnode')
        .attr("transform", function(d) {
            d.x0 = d.x - startDegrees;
            var translateValue = d.y + 5;
            translateValue += geneBarScale(d.length);
            return "rotate(" + (d.x - startDegrees) + ")translate(" + translateValue + ")";
        })
        .append("text")
        .attr("dx", function(d) { return d.x < 180 ? 0 : 0; })
        .attr("dy", 5)
        .attr("angle", function(d) { return d.x - startDegrees; })
        .attr("text-anchor", function(d) { return (d.x + 90 - startDegrees) < 180 ? "start" : "end"; })
        .attr("transform", function(d) { return (d.x + 90 - startDegrees) < 180 ? null : "rotate(180)"; })
        .text(function(d) { return d.name; })
        .attr("id", function(d){
            return 'nodetext-' + d.className
        })
        .attr("class", function(d){
            return 'circle-text ' + 'b-text'+d.className;
        })
        .style('fill', '#394B9F')
        .style("opacity", 0)
        .on("mouseover", showGeneConnections)
        .on("mouseout", hideGeneConnections)
        .on("click", showGeneComparison)
        .on("dblclick", function(d){loadLightBox(d)})
        .transition().duration(enterTime)
        .style("opacity", 1);

    text.exit().transition().duration(exitTime)
        .style("opacity", 0)
        .remove();

    $(".radnode").mousemove(setGenePopupPosition);
    $(".radnode-dot").mousemove(setGenePopupPosition);
}

function drawEmptyVis(){
    if(availDegrees != 360) {
        radialSvg.append("path")
            .attr("id", "empty-section")
            .attr("d", function() {

                //return "M0 0 L"+x1+" "+y1+" A";
            })
            .style("stroke-width", 2)
            .style("stroke", "#333333");
    }
}

function getGeneClassName(species, gene){
    return species.toLowerCase() + "_" + gene.toLowerCase();;
}

function getGeneColor(species, length){
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
    var genes = [d];
    d.connectedNodes.forEach(function(n){
        // TODO HACK need a better way to check if they're in the vis
        geneMap.children.forEach(function(s){
            if(n.parent == s) {
                genes.push(n);
            }
        })
    });
    geneCompare(genes);
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

function getGeneGradient(startValue, endValue, species1, species2, className1, className2){

    // Create a gradient id so it can be referenced by the path-style-stroke
    var gradientId = "gradient-" + className1 + '-' + className2;

    // Used to create the angle for the gradient
    var x1 = Math.cos(startValue * Math.PI / 180) / 2 + 0.5,
        y1 = Math.sin(startValue * Math.PI / 180) / 2 + 0.5,
        x2 = Math.cos(endValue * Math.PI / 180) / 2 + 0.5,
        y2 = Math.sin(endValue * Math.PI / 180) / 2 + 0.5;

    // Set the x-y coordinates that represent the angle of this linear gradient
    var gradient = document.getElementById('#' + gradientId);

    if(!gradient) {
        gradient = svgDefs.append("svg:linearGradient")
            .attr("id", gradientId);
    }

    gradient.attr("x1", x1).attr("y1", y1)
        .attr("x2", x2).attr("y2", y2);

    // Define a stop color - the first one is the source node
    gradient.append("svg:stop")
        .attr("offset", "15%")
        .attr("stop-color", getGeneColor(species1, startValue));

    // Define a stop color - the second one is the target node
    gradient.append("svg:stop")
        .attr("offset", "85%")
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
    var cY = $("#radialVis").offset().top + radius - 150;
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

function selectChange(index, value){
    //No change was made so return
    if(value == selectValues[index]){
        return;
    }
    // If the old select value was something than remove it from the vis
    if(selectValues[index] != "undefined") {
        removeNodeFromVis(selectValues[index]);
    }
    // If the new select value is soemthing then add it to the vis
    if(value != "undefined"){
        addNodeToVis(value);
    }
    // Update the new select value
    selectValues[index] = value;

    drawRadialVis();
}

/**
 * Updates the selectedSpecies array that contains the nodes of the species to display in the radial vis.
 * @param added - classname of the species recently added
 */
function addNodeToVis(added){
    geneMap.children.push(classMap[added]);

    // Get the number of empty quadrants and update the cluster's available degrees to represent that.
    availDegrees = 90 * geneMap.children.length;
    startDegrees = 45 * (geneMap.children.length - 2);

    // Update the geneCluster so that we have a radial vis with quadrants missing.
    geneCluster.size([availDegrees, innerRadius]);
}

function removeNodeFromVis(remove) {
    geneMap.children = geneMap.children
        .filter(function (n) {
            return n.className != remove;
        });
    // Get the number of empty quadrants and update the cluster's available degrees to represent that.
    availDegrees = 90 * geneMap.children.length;
    startDegrees = 45 * (geneMap.children.length - 2);

    // Update the geneCluster so that we have a radial vis with quadrants missing.
    geneCluster.size([availDegrees, innerRadius]);
}
/**
 * Initialize the Radial Vis by clearing the geneMap that contains the tree layout for the species
 * and their interconnected genes.
 */
function initializeRadialVis() {
    geneBundle = d3.layout.bundle();
    gradientCounter = 0;

    radialSvg.selectAll("*").remove();
    svgDefs = radialSvg.append("svg:defs");
}

