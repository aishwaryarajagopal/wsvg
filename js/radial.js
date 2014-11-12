/**
 * Created by John on 11/2/14.
 */

var geneMap = {
    "name" : "",
    "children" : []
};

var colorMap = {
    "blacktipreefshark": "#DD1C77",
    "bluewhale": "#3182BD",
    "giantgrouper": "#C994C7",
    "gianttrevally": "#756BB1",
    "greatwhiteshark": "#636363",
    "hammerhead": "#99D8C9",
    "human": "#FC9272",
    "sandbarshark": "#FC9272",
    "swordfish": "#9EBCDA",
    "tigershark": "#FEC44F",
    "whaleshark": "#1C9099",
    "zebrafish": "#31A354"
}

var species = [];
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
    .tension(.60)
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

    var selectSpecies = [species[9], species[6], species[2], species[3]];
    drawGeneChart(selectSpecies);

}

function drawGeneChart(selectedSpecies){
    var mergedLinks = [];

    for(var s = 0; s < 4; s++){
        geneMap.children.push(selectedSpecies[s]);
    }

    var geneBarScale = d3.scale.linear()
        .domain([0,maxGeneLength])
        .range([0,50]);

    var nodes = geneCluster.nodes(geneMap)

    radialSvg.selectAll(".node-dot")
        .data(nodes.filter(function(n) { return n.depth == 2; }))
        .enter().append("g")
        .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
        .append("rect")
        .attr("class", function(d){
            return 'node-dot ' + 'nodedot-' + d.className
        })
        .attr('y', -5)
        .attr('height', 12)
        .attr('width', function(d){
            return geneBarScale(d.length);
        })
        .style('fill', function(d){
            return getGeneColor(d.speciesClass, d.length)
        })
        .on("mouseover", showGeneConnections)
        .on("mouseout", hideGeneConnections)

    radialSvg.selectAll(".node")
        .data(nodes.filter(function(n) { return n.depth == 2; }))
        .enter().append("g")
        .attr("class", 'node')
        .attr("transform", function(d) {
            var translatevalue = d.y + 5;
            translatevalue += geneBarScale(d.length);
            return "rotate(" + (d.x - 90) + ")translate(" + translatevalue + ")";
        })
        .append("text")
        .attr("dx", function(d) { return d.x < 180 ? 0 : 0; })
        .attr("dy", "5")
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
        .on("mouseout", hideGeneConnections);

    //$(".node").mousemove(setGenePopupPosition);
    //$(".node-dot").mousemove(setGenePopupPosition);

    // Looks into all of the selected species - and finds the ones that are now nodes
    // TODO this needs to be changed to only have targets that are in the selecteSpecies array
    for(var s = 0; s < 4; s++){
        geneMap.children.push(selectedSpecies[s]);
        for(var l = 0; l < selectedSpecies[s].links.length; l++){
            if(selectedSpecies[s].links[l].target["parent"]) {
                mergedLinks.push(selectedSpecies[s].links[l]);
            }
        }
    }

    radialSvg.selectAll(".links")
        .data(geneBundle(mergedLinks))
        .enter().append("path")
        .attr("class", function(d){
            var linkClass = 'links link-' + d[0]['className'] + ' link-' + d[0]['className'];
            return linkClass
        })
        .attr("id", function(d){
            return 'link-' + d[0]['className'] + '-' + d[4]['className']
        })
        .attr("d", line)
        .style("stroke", function(d){
            return 'url(#' + getGeneGradient(d[0]["length"], d[4]["length"], d[0]["speciesClass"], d[4]["speciesClass"]) +')'
        });
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
    console.log(species);

    // TODO change color intensity based on connection?
    return colorMap[species];
}

function showGeneConnections(d) {

    radialSvg.selectAll('.circle-text')
        .classed('circle-text-dim', true);

    radialSvg.select('#nodetext-' + d.className)
        .classed('highlight', true)
        .classed('circle-text-dim', false);

    radialSvg.selectAll('.node-dot')
        .style("opacity", .05)

    radialSvg.selectAll('path.links')
        .style("stroke-opacity", .01)

    radialSvg.selectAll('path.link-' + d.className)
        .style("stroke-opacity",1)

    radialSvg.selectAll('.nodedot-' + d.className)
        .style("opacity",1)

    d.connectedNodes.forEach(function(n){
        radialSvg.select('#nodetext-' + n.className)
            .classed('highlight', true)
            .classed('circle-text-dim', false);

        radialSvg.selectAll('.nodedot-' + n.className)
            .style("opacity", 1)
    });

    //$("#node-info").empty()
    //
    //if(d.nodeType == 'game'){
    //    $("#gameTemplate").tmpl( {
    //        name: d.name,
    //        sales: roundSales(d.size),
    //        rating: getRating(d.gameRating),
    //        color: getColor(d.nodeType, d.size),
    //        weaponCount: d.weapons.length,
    //        topicCount: d.topics.length
    //    }).appendTo( "#node-info" );
    //
    //    var weapons = (d.weapons.length > 0)? d.weapons: ['none'];
    //    $.each(weapons, function(i, w){
    //        $("#listTemplate").tmpl( {item: w}).appendTo( "#node-weapon-references .node-data" );
    //    })
    //
    //    var topics = (d.topics.length > 0)? d.topics: ['none'];
    //    $.each(topics, function(i, t){
    //        $("#listTemplate").tmpl( {item: t}).appendTo( "#node-topic-references .node-data" );
    //    })
    //} else if(d.nodeType == 'weapon' ){
    //    $("#weaponTemplate").tmpl( {
    //        name: (d.name == 'axe') ? 'an ' + d.name: 'a ' + d.name,
    //        color: getColor(d.nodeType, d.size),
    //        count: addCommas(d.numGames)
    //    }).appendTo( "#node-info" );
    //} else if( d.nodeType == 'topic'){
    //    $("#weaponTopicTemplate").tmpl( {
    //        name: (d.name.toLowerCase().search('use') >= 0)? 'the ' + d.name.toLowerCase() : d.name.toLowerCase(),
    //        color: getColor(d.nodeType, d.size),
    //        count: (d.numGames > 1) ? addCommas(d.numGames)	+ ' games have': addCommas(d.numGames)	+ ' game has'
    //    }).appendTo( "#node-info" );
    //}
    //$("#node-info").show()

}

function hideGeneConnections(d) {
    //$("#node-info").hide();
    radialSvg.selectAll('path.links')
        .style("stroke-opacity", 1);

    radialSvg.selectAll('.circle-text')
        .classed('circle-text-dim', false)
        .classed('highlight', false);

    radialSvg.selectAll('.node-dot')
        .style("opacity", 1);
}

function getGeneGradient(startValue, endValue, species1, species2){

    var gradientId = "gradient" + gradientCounter;

    var gradient = svgDefs.append("svg:linearGradient")
        .attr("id", gradientId);

    gradient.append("svg:stop")
        .attr("offset", "10%")
        .attr("stop-color", getGeneColor(species1, startValue));

    gradient.append("svg:stop")
        .attr("offset", "90%")
        .attr("stop-color", getGeneColor(species2, endValue));

    gradientCounter++;
    return gradientId;
}

