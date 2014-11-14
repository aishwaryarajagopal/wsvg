	var margin = {top: 40, right: 40, bottom: 30, left: 140},
    width = 1000 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
/*function init()
{
var filenames=["BlacktipReefShark/ATP6.fa","SwordFish/ATP6.fa","TigerShark/ND6.fa"];
geneCompare(filenames);
} */
	
function geneCompare(filenames)
{
	var geneData;
	var zVal='';
	var genes=[];
	var speciesName=[];
	var geneName=[];
	for(var p=0;p<filenames.length;p++)
	{
	var str=filenames[p];
	var res=str.split("/");
	speciesName.push(res[0]);
	geneName.push(res[1]);
	}
	d3.json('data/data.json',processData);	
	
function processData(jsondata)
{

	for(h=0;h<filenames.length;h++)
	{
		var count=0;
		console.log(jsondata);
			for(var i=0;i<jsondata.length;i++)
				{
					var geneArray=jsondata[i].genes;
						for(var j=0;j<geneArray.length;j++)
							{
								var path=geneArray[j].path;
								var res1=path.split("/");
								if((res1[1]==speciesName[h])&&(res1[2]==geneName[h]))
								{
									console.log("inside match");
									genes.push(geneArray[j].sequence);
								}
								count++;
							}
				}
				console.log(count);
	}
	for(var f=0;f<genes.length;f++)
	{
		console.log(genes[f]);
	}
	geneData = randomData(width, height,genes,speciesName,geneName);
	generateVis();
}

function generateVis()
{
	//console.log("geneData "+geneData);
	var x = d3.scale.linear()
    .domain([0, width])
    .range([0, width]);
	
	var zoom = d3.behavior.zoom()
    .x(x)
    .scaleExtent([1,25])
    .on("zoom", zoomed);  
	console.log(x(1)-x(0));
    var svgCompare = d3.select('#vis').append("svg")
                    .style("width", width)
                    .style("height", height)
                    .attr("class", "vis")
					.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
					.call(zoom);
	
    var row = svgCompare.selectAll(".row")
                  .data(geneData)
                .enter().append("svg:g")
                  .attr("class", "row");

    var col = row.selectAll(".cell")
                 .data(function (d) { return d; })
                 .enter().append("svg:rect")
                 .attr("class", "cell")
                 .attr("x", function(d) { return d.x; })
                 .attr("y", function(d) { return d.y; })
                 .attr("width", function(d) { return d.width; })
                 .attr("height", function(d) { return d.height; })
                 .style("fill",function(d){return d.color;});
				

	function zoomed()
	{
	console.log(zoom.scale());
	console.log(x(1)-x(0));
	svgCompare.selectAll('.row').remove();
	var row1 = svgCompare.selectAll(".row")
                  .data(geneData)
                .enter().append("svg:g")
				.attr("class", "row");

    var col1 = row1.selectAll(".cell")
                 .data(function (d) { return d; })
                .enter().append("svg:rect")
                 .attr("class", "cell")
                 .attr("x", function(d,index) { 
				 return x(index)+20;
				 })
                 .attr("y", function(d) { return d.y; })
                 .attr("width", function(d) { return x(1)-x(0); })
                 .attr("height", function(d) { return d.height; })
                 .style("fill",function(d){return d.color;})
				 .on("mouseover",function(d,index){
				 console.log("inside mouse hover");
				 	row1.selectAll('.cell')				
					.style("fill",function(d){
					if(d.count==index)
					{
					console.log("inside match");
					return "#CC0099";
					}
					else
					{
					return d.color;
					}
					});
					
				 });
				 
	if(zoom.scale()>9)
	{
	 var text = row1.selectAll(".label")
        .data(function(d) {return d;})
      .enter().append("svg:text")
        .attr("x", function(d,index) { return x(index)+20 +(x(1)-x(0))/2 })
        .attr("y", function(d) { return d.y + d.height/2 })
        .attr("text-anchor","middle")
        .attr("font-size", "8")
        .text(function(d) { 
		if(d.value!='Z')
			return d.value;
		else
			return zVal;});
	
	}
	}
	}
}

function randomData(gridWidth, gridHeight,genes,species,geneName)
{
	var genesLength=[];
	for(var j=0;j<genes.length;j++)
	{
		genesLength.push(genes[j].length);
	}
	genesLength.sort(function(a,b){return b-a});
	var maxLength=genesLength[0];
	console.log("max"+maxLength);
	var geneFirst=new Array();
	var data = new Array();
	var gridItemWidth = gridWidth / maxLength;
	var startX = gridItemWidth / 2;
	var stepX = gridItemWidth;
	var xpos = startX;
	var gridItemHeight = 20;
    var startY = gridItemHeight / 2;    
    var stepY = 2*gridItemHeight;    
    var ypos = startY;
    var newValue = '';
	var speciesName='';
    var count = 0;
	var innerCount=0;
	var genesNew=[];
	for(var d=0;d<genes.length;d++)
	{
	geneVal=genes[d];
	if(geneVal.length<maxLength)
		{
			for(var g=geneVal.length;g<maxLength;g++)
				{
					geneVal=geneVal+"Z";
				}
			console.log("geneSeq"+geneVal+geneVal.length);
		}
	genesNew.push(geneVal);
	}
	geneFirst=genesNew[0].split('');
	for (var index_a = 0; index_a < genesNew.length; index_a++)
    {
		speciesName=species[index_a];
		innerCount=0;
        data.push(new Array());
		geneSeq=genesNew[index_a];
		for (var index_b = 0; index_b < geneSeq.length; index_b++)
        {
            newValue = geneSeq[index_b];
			if(count==0)
			{
			if(newValue!="Z")
				var colorValue="#FFFFDB";
			else	
				var colorValue="#999966";
			}
			else{
			if(geneFirst[index_b]=='A'&&newValue=='C')
			{
			var colorValue="#5CBDFF";
			}
			if(geneFirst[index_b]=='A'&&newValue=='G')
			{
			var colorValue="#99D6FF";
			}
			if(geneFirst[index_b]=='A'&&newValue=='T')
			{
			var colorValue="#D6EFFF";
			}
			if(geneFirst[index_b]=='C'&&newValue=='A')
			{
			var colorValue="#47D147";
			}
			if(geneFirst[index_b]=='C'&&newValue=='G')
			{
			var colorValue="#70DB70";
			}
			if(geneFirst[index_b]=='C'&&newValue=='T')
			{
			var colorValue="#ADEBAD";
			}
			if(geneFirst[index_b]=='G'&&newValue=='A')
			{
			var colorValue="#FFFF4D";
			}
			if(geneFirst[index_b]=='G'&&newValue=='C')
			{
			var colorValue="#FFFF66";
			}
			if(geneFirst[index_b]=='G'&&newValue=='T')
			{
			var colorValue="#FFFFB2";
			}
			if(geneFirst[index_b]=='T'&&newValue=='A')
			{
			var colorValue="#FF6262";
			}
			if(geneFirst[index_b]=='T'&&newValue=='C')
			{
			var colorValue="#FF9696";
			}
			if(geneFirst[index_b]=='T'&&newValue=='G')
			{
			var colorValue="#FFB9B9";
			}
			if((geneFirst[index_b]==newValue)&&(newValue!='Z')&&(geneFirst[index_b]!='Z'))
			{
			var colorValue="#FFFFDB";
			}
			if(newValue=='Z')
			{
			var colorValue="#999966";
			}
			if(geneFirst[index_b]=='Z'&&newValue=='A')
			{
			var colorValue="#0033CC";
			}
			if(geneFirst[index_b]=='Z'&&newValue=='C')
			{
			var colorValue="#339933";
			}
			if(geneFirst[index_b]=='Z'&&newValue=='G')
			{
			var colorValue="#FFCC00";
			}
			if(geneFirst[index_b]=='Z'&&newValue=='T')
			{
			var colorValue="#CC0000";
			}
			}
            data[index_a].push({ 
                                time: index_b, 
                                value: newValue,
                                width: gridItemWidth,
                                height: gridItemHeight,
                                x: xpos,
                                y: ypos,
                                color:colorValue,
								count:innerCount,
								name:speciesName
                            });
			
            xpos += stepX;
			innerCount=innerCount+1;
            
        }
		if(index_a+1!=genes.length)
		{
		gridItemWidth = gridWidth / maxLength;
		startX = gridItemWidth / 2;
		stepX = gridItemWidth;
		}
		xpos = startX;
        ypos += stepY;
		count=count+1;
		
    }
    return data;
} 

