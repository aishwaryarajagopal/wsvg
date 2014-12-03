/**
 * Javascript for displaying comparisons between genes.
 */

var cGenes;

var peptideMap = {
    A: 'Adenine',
    C: 'Cytosine',
    T: 'Thiamine',
    G: 'Guanine'
};

var colorMap = {
    "blacktipreefshark": '#636363',
    "giantgrouper": '#C994C7',
    "gianttrevally": "#756BB1",
    "harborseal": "#DD1C77",
    "wobblegong": "#99D8C9",
    "humans": "#FC9272",
    "sandbarshark": "#9EBCDA",
    "saltwatercrocodile": "#FEC44F",
    "whaleshark": "#1C9099",
    "zebrafish": "#31A354"
};

var peptideColorMap = {
    AC: '#5CBDFF',
    AG: '#99D6FF',
    AT: '#D6EFFF',
    CA: '#47D147',
    CG: '#70DB70',
    CT: '#ADEBAD',
    GA: '#FFFF4D',
    GC: '#FFFF66',
    GT: '#FFFFB2',
    TA: '#FF6262',
    TC: '#FF9696',
    TG: '#FFB9B9',
    ZA: '#0033CC',
    ZC: '#0033CC',
    ZG: '#FFCC00',
    ZT: '#CC0000'
};

var margin = {
    top: 30,
    left: 15,
    bottom: 30,
    right: 15
};

var compareTip = d3.select("body").append("div")
    .attr("class", "d3-tip")
    .style("opacity", 0);

var width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    labelWidth = width * 0.2,
    sequenceWidth = (width * 0.8),
    rowOffset = 30,
    peptideWidth = 35;

var maxLength = 0,
    zMin = 1,
    zMax = 100,
    scale0 = 1;

var xScale = d3.scale.linear()
    .domain([0, maxLength])
    .range([0, sequenceWidth]);

var zoom = d3.behavior.zoom();

var svgCompare,
    labelGroup,
    sequenceGroup;

// On document ready, process the json file
$(document).ready(function () {
    initComponents();
});


function compareGenes(genes){
    // Re initialize values for new genes
    maxLength = 0;

    cGenes = genes;
    processGeneData(genes);
    drawCompareVis(genes);
}

function initComponents(){
    var compareDiv = d3.select('#compareViz');

    width = (compareDiv.style('width') || compareDiv.attr('width')).replace('px','') - margin.left - margin.right;
    height = 250 - margin.top - margin.bottom;
    labelWidth = width * 0.2;
    sequenceWidth = (width * 0.8);

    labelGroup = d3.select("#compareViz").append('svg')
        .attr('class', 'compare-group-label')
        .style('width', labelWidth)
        .style('height', height)
        .attr('x',margin.left)
        .attr('y',margin.top);
        //.attr('transform', 'translate('+margin.left+','+margin.top+')');

    sequenceGroup = d3.select("#compareViz").append('svg')
        .attr('class', 'compare-group-sequence')
        .style('width', sequenceWidth)
        .style('height', height)
        .attr('x',margin.left+labelWidth)
        .attr('y',margin.top)
        .call(zoom)
        .on("dblclick.zoom", null);
}

function processGeneData(genes){
    var compare = [];

    genes.forEach(function(g,i){
        // Make the sequence into a char array and keep reference in compareSequence property
        // Don't want to change the original gene sequence
        g.compareSequence = g.sequence.split('');

        maxLength = g.compareSequence.length > maxLength ? g.compareSequence.length : maxLength;
    });

    // Re-loop through the sequence to now add z values
    genes.forEach(function(g){
        var extra = maxLength - g.compareSequence.length;
        g.compareSequence = g.compareSequence.concat(new Array(extra).fill('Z'));
        g.compareColor = new Array(maxLength).fill('#999');
        g.compareSequence.forEach(function(p,j){
            if(!compare[j]){
                compare[j] = p;
            } else {
                compare[j] = compare[j] + p;
            }
        });
    });

    var count = genes.length;
    var regex = new RegExp('G{'+count+'}|T{'+count+'}|C{'+count+'}|A{'+count+'}');
    compare.forEach(function(c,i){
        genes.forEach(function(g){
            if(regex.test(c)){
                g.compareColor[i] = '#EEE';
            } else {
            }
        });
    });

    // Update the scale
    xScale.domain([0, maxLength])
        .range([0, sequenceWidth]);

    zMax = Math.round(peptideWidth / (sequenceWidth/maxLength));
    console.log('zMax = '+zMax);
    zoom.x(xScale)
        .scaleExtent([zMin,zMax])
        .on("zoom", zoomCompare);

    scale0 = xScale(1) - xScale(0);
}

function drawCompareVis(genes) {
    // Clear out old vis
    labelGroup.selectAll('*').remove();
    sequenceGroup.selectAll('*').remove();

    // Set up the zoom based on the scale we want for the specified space

    // Draw all of the sequences
    var labels = labelGroup.selectAll('.compare-label').data(genes, function(d){return d.className;});

    // Add new labels
    var labelsEnter = labels.enter().append('g')
        .attr('class', function (d) {return 'compare-label ' + d.className + '-label';})
        .attr('transform', function (d, i) {return 'translate(' + (labelWidth * 0.1) + ',' + (i * rowOffset) + ')';});

    labelsEnter.append('rect')
        .attr('class', 'compare-label-rect1')
        .attr('ry', 5)
        .attr('rx', 5)
        .attr('width', labelWidth * 0.8)
        .attr('height', 14)
        .style('fill', function(d){ return colorMap[d.speciesClass]})
        .style('opacity', 1);

    labelsEnter.append('text')
        .attr('class', 'compare-label-text')
        .attr('y', 11)
        .attr('x', labelWidth * 0.4)
        .attr('width', labelWidth * 0.8)
        .attr('height', 14)
        .text(function (d) {
            return d.className;
        });

    // Remove any labels that aren't used


    // Grab all peptide rows displayed
    var peptideRows = sequenceGroup.selectAll(".compare-peptide-row").data(genes, function(d){return d.className;});

    // For new peptides add them
    var peptideRowsEnter = peptideRows.enter().append('g')
        .attr('class', function (d) {return 'compare-peptide-row ' + d.className + '-peptide-row';})
        .attr('width', sequenceWidth)
        .attr('transform', function (d, i) {
            return 'translate(0,' + (i * rowOffset) + ') scale(' + scale0 + ',1)';
        });

    // Grab all peptides in each row
    peptideRows.each(function (g) {
        var peptides = peptideRows.selectAll('.compare-peptide').data(function(d){
                console.log(d.compareSequence.length);
                return d.compareSequence;},
            function (d, i) {return g.className + '-' + i;});

        var peptidesEnter = peptides.enter().append('g')
            .attr('class', function (d, i) {return 'compare-peptide ' + g.className + '-' + i + '-peptide';})
            .attr('transform', function (d, i) {return 'translate(' + (i) + ') ';})
            .on('mouseover', function(d,i){onCompareMouseOver(genes,d,i)})
            .on("click", function(d,i){geneClick(genes,d,i)})
            .on('mouseout', function(d,i){onCompareMouseOut(genes,d,i)});

        peptidesEnter.append('rect')
            .attr('class', 'compare-peptide-rect')
            .attr('width', 0.95)
            .attr('height', 15)
            .attr('stroke', function(d,i){return g.compareColor[i];})
            .attr('stroke-width', 0.05)
            .attr('fill', function(d,i){return g.compareColor[i];});

        // Add the blank text for now
        peptidesEnter.append('text')
            .attr('class', 'compare-peptide-text')
            .attr('y', 11)
            .attr('transform', 'translate(0.45)')
            .style('text-anchor', 'middle')
            .style('font-size', 8)
            .style('fill', '#000000');
    });
}

function zoomCompare() {
    // Get the current scales to be used
    // Need the inverted scale to have the text look normal
    var newScale= scale0 * d3.event.scale,
        iNewScale = 1/newScale;

    var xMax = sequenceWidth - newScale * maxLength + 1;

    var tx = Math.min(d3.event.translate[0],0);
    tx = Math.max(tx, xMax);

    console.log('translate = ' + d3.event.translate[0]);

    if(tx == xMax) {
        zoom.translate([xMax, 0]);
    }

    console.log('xMax = '+ xMax);

    console.log('tx = '+ tx);

    // Grab the peptide rows - don't need to do anything with them
    var peptideRows = sequenceGroup.selectAll(".compare-peptide-row").data(cGenes, function(d){return d.className});

    peptideRows.attr('transform', function(d,i){return 'translate('+ tx +','+ (i * rowOffset) + ') scale('+ newScale + ',1)';});

    // Grab all peptides in each row
    peptideRows.each(function(g){
        var peptides = peptideRows.selectAll('.compare-peptide').data(function(d){return d.compareSequence;}, function(d,i){return g.className + '-' + i;});
        var peptidesText = peptides.select('text');

        if(newScale > 10){
            peptidesText.text(function(d){return (d != 'Z' ? d : '')})
                .attr('transform','translate(0.5) scale('+ iNewScale + ',1)');
        } else {
            // Remove the text from the element
            peptidesText.text('');
        }
    });
}

function geneClick(genes,d,i){

    var peptide = peptideMap[d.value];
    var basePeptide = peptideMap[d.baseGene];

    genes.forEach(function(g){
        var column = d3.selectAll('.' + g.className + '-'+ i + '-peptide');
        column.select('rect')
            .attr('stroke', '#000')
            .attr('stroke-width', 0.05);
    });

    if(d.value!='Z')
    {
        compareTip.transition().duration(200)
            .style("opacity", .9);
        if(d.rowCount==0)
        {
            compareTip.html("<strong>Gene:</strong> <span style='color:#008AB8'>" + d.gene + "</span><br><strong>Position:</strong> <span style='color:#008AB8'>" + d.count + "</span><br><strong>Base Species:</strong> <span style='color:#008AB8'>" + d.name + "</span><br><strong>Base Nucleotide:</strong> <span style='color:#008AB8'>" + geneName + "</span>")
                .style("left", (d3.event.pageX+20) + "px")
                .style("top", (d3.event.pageY - 120) + "px");
        }
        else
        {
            compareTip.html("<strong>Gene:</strong> <span style='color:#008AB8'>" + d.gene + "</span><br><strong>Position:</strong> <span style='color:#008AB8'>" + d.count + "</span><br><strong>Species:</strong> <span style='color:#008AB8'>" + d.name + "</span><br><strong>Nucleotide:</strong> <span style='color:#008AB8'>" + geneName + "</span><br><strong>Base Species:</strong> <span style='color:#008AB8'>" + d.baseSpecies + "</span><br><strong>Base Nucleotide:</strong> <span style='color:#008AB8'>" + basegeneName + "</span>")
                .style("left", (d3.event.pageX+20) + "px")
                .style("top", (d3.event.pageY - 120) + "px");
        }

    }

}

function hideCompareTip(){
    compareTip.transition()
        .duration(200)
        .style("opacity", 0);
}

function onCompareMouseOut(genes,d,i){
    genes.forEach(function(g){
        var column = d3.selectAll('.' + g.className + '-'+ i + '-peptide');
        column.select('rect').classed('peptide-highlight', false);
    });
}

function onCompareMouseOver(genes,d,i){
    genes.forEach(function(g){
        var column = d3.selectAll('.' + g.className + '-'+ i + '-peptide');
        column.select('rect').classed('peptide-highlight', true);
    });
}

Array.prototype.fill = function(val){
    for (var i = 0; i < this.length; i++){
        this[i] = val;
    }
    return this;
};