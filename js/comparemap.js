	var margin = {top: 20, right: 60, bottom: 30, left: 20},
    width = 800- margin.left - margin.right,
    height = 500 - margin.top - margin.bottom; 
function init3()
{
var geneValues=[{speciesName:"BlacktipReefShark",geneName:"ATP6",sequence:"ATGATTATAAGCTTCTTTGATCAATTCTTAAGCCCATCACTTATTGGAATCCCCCTTATTGCCCTAGCAATTTTAATTCCATGATTAACCTTTCCAACCCCAACTAATCGATGACTAAATAACCGACTAATCACCCTCCAAGGGTGATTTATTAATCGTTTTGTTTATCAACTTATACAACCAATTAATCTTGGAGGACATAAATGAGCTATACTACTAACAGCCCTAATACTATTTCTAATTACCATTAACCTTTTAGGCCTTCTTCCGTATACATTTACTCCTACAACACAACTTTCTCTAAATATAGCATTTGCCCTCCCACTATGACTTACAACTGTATTAATTGGTATATTAAACCAACCTACAATTACATTAGGCCACCTTCTTCCAGAAGGAACACCAACTCCTTTAATTCCAATCCTTATTATTATCGAAACTATTAGCCTATTTATTCGACCATTAGCCCTAGGGGTCCGACTAACTGCCAATTTAACAGCAGGTCACCTTCTAATACAACTAATTGCCACTGCAGCATTTGTTCTCTTGACCATCATACCAACCGTAGCCTTATTAACTTCTACAATTCTATTCTTATTAACAATCCTAGAAGTAGCTGTAGCAATAATCCAAGCATATGTATTTGTTCTCCTACTAAGCTTATACCTACAAGAAAACGTATAA"}
				,{speciesName:"Human",geneName:"TN",sequence:"TAGATTGAAGCCAGTTGATTAGGGTGCTTAGCTGTTAACTAAGTGTTTGTGGGTTTAAGTCCCATTGGTCTAG"}
				,{speciesName:"TigerShark",geneName:"ND3",sequence:"ATGAACCTCATCATATCATCAGTCGTGGCTACGGCCCTGGTTTCCCTAATACTCGCTTTAATTGCATTTTGATTACCATTACTTAACCCAGATAATGAAAAATTATCTCCTTATGAGTGTGGCTTTGACCCACTAGGAAATGCTCGCCTCCCATTTTCCTTACGTTTCTTCTTAGTGGCTATCTTATTTCTTTTATTTGACTTAGAAATTGCCCTCTTATTACCACTACCTTGAGGAAATCAATCATTAACACCACTCTCCACACTTTTTTGAGCAACAATTATTTTAATCTTACTCATCTTGGGTCTTATCTATGAGTGATCCCAAGGAGGACTTGAATGAGCAGAAT"}];
geneCompare(geneValues);
} 
function init2()
{
var geneValues=[{speciesName:"BlacktipReefShark",geneName:"ATP6",sequence:"ATGATTATAAGCTTCTTTGATCAATTCTTAAGCCCATCACTTATTGGAATCCCCCTTATTGCCCTAGCAATTTTAATTCCATGATTAACCTTTCCAACCCCAACTAATCGATGACTAAATAACCGACTAATCACCCTCCAAGGGTGATTTATTAATCGTTTTGTTTATCAACTTATACAACCAATTAATCTTGGAGGACATAAATGAGCTATACTACTAACAGCCCTAATACTATTTCTAATTACCATTAACCTTTTAGGCCTTCTTCCGTATACATTTACTCCTACAACACAACTTTCTCTAAATATAGCATTTGCCCTCCCACTATGACTTACAACTGTATTAATTGGTATATTAAACCAACCTACAATTACATTAGGCCACCTTCTTCCAGAAGGAACACCAACTCCTTTAATTCCAATCCTTATTATTATCGAAACTATTAGCCTATTTATTCGACCATTAGCCCTAGGGGTCCGACTAACTGCCAATTTAACAGCAGGTCACCTTCTAATACAACTAATTGCCACTGCAGCATTTGTTCTCTTGACCATCATACCAACCGTAGCCTTATTAACTTCTACAATTCTATTCTTATTAACAATCCTAGAAGTAGCTGTAGCAATAATCCAAGCATATGTATTTGTTCTCCTACTAAGCTTATACCTACAAGAAAACGTATAA"}
				,{speciesName:"Human",geneName:"TN",sequence:"TAGATTGAAGCCAGTTGATTAGGGTGCTTAGCTGTTAACTAAGTGTTTGTGGGTTTAAGTCCCATTGGTCTAG"}];
geneCompare(geneValues);
} 
function init4()
{
var geneValues=[{speciesName:"BlacktipReefShark",geneName:"ATP6",sequence:"ATGATTATAAGCTTCTTTGATCAATTCTTAAGCCCATCACTTATTGGAATCCCCCTTATTGCCCTAGCAATTTTAATTCCATGATTAACCTTTCCAACCCCAACTAATCGATGACTAAATAACCGACTAATCACCCTCCAAGGGTGATTTATTAATCGTTTTGTTTATCAACTTATACAACCAATTAATCTTGGAGGACATAAATGAGCTATACTACTAACAGCCCTAATACTATTTCTAATTACCATTAACCTTTTAGGCCTTCTTCCGTATACATTTACTCCTACAACACAACTTTCTCTAAATATAGCATTTGCCCTCCCACTATGACTTACAACTGTATTAATTGGTATATTAAACCAACCTACAATTACATTAGGCCACCTTCTTCCAGAAGGAACACCAACTCCTTTAATTCCAATCCTTATTATTATCGAAACTATTAGCCTATTTATTCGACCATTAGCCCTAGGGGTCCGACTAACTGCCAATTTAACAGCAGGTCACCTTCTAATACAACTAATTGCCACTGCAGCATTTGTTCTCTTGACCATCATACCAACCGTAGCCTTATTAACTTCTACAATTCTATTCTTATTAACAATCCTAGAAGTAGCTGTAGCAATAATCCAAGCATATGTATTTGTTCTCCTACTAAGCTTATACCTACAAGAAAACGTATAA"}
				,{speciesName:"Human",geneName:"TN",sequence:"TAGATTGAAGCCAGTTGATTAGGGTGCTTAGCTGTTAACTAAGTGTTTGTGGGTTTAAGTCCCATTGGTCTAG"}
				,{speciesName:"Human",geneName:"TN",sequence:"TAGATTGAAGCCAGTTGATTAGGGTGCTTAGCTGTTAACTAAGTGTTTGTGGGTTTAAGTCCCATTGGTCTAG"}
				,{speciesName:"Human",geneName:"TN",sequence:"TAGATTGAAGCCAGTTGATTAGGGTGCTTAGCTGTTAACTAAGTGTTTGTGGGTTTAAGTCCCATTGGTCTAG"}];
geneCompare(geneValues);
} 
function init5()
{
var geneValues=[{speciesClass:"BlacktipReefShark",name:"ATP6",sequence:"ATGATTATAAGCTTCTTTGATCAATTCTTAAGCCCATCACTTATTGGAATCCCCCTTATTGCCCTAGCAATTTTAATTCCATGATTAACCTTTCCAACCCCAACTAATCGATGACTAAATAACCGACTAATCACCCTCCAAGGGTGATTTATTAATCGTTTTGTTTATCAACTTATACAACCAATTAATCTTGGAGGACATAAATGAGCTATACTACTAACAGCCCTAATACTATTTCTAATTACCATTAACCTTTTAGGCCTTCTTCCGTATACATTTACTCCTACAACACAACTTTCTCTAAATATAGCATTTGCCCTCCCACTATGACTTACAACTGTATTAATTGGTATATTAAACCAACCTACAATTACATTAGGCCACCTTCTTCCAGAAGGAACACCAACTCCTTTAATTCCAATCCTTATTATTATCGAAACTATTAGCCTATTTATTCGACCATTAGCCCTAGGGGTCCGACTAACTGCCAATTTAACAGCAGGTCACCTTCTAATACAACTAATTGCCACTGCAGCATTTGTTCTCTTGACCATCATACCAACCGTAGCCTTATTAACTTCTACAATTCTATTCTTATTAACAATCCTAGAAGTAGCTGTAGCAATAATCCAAGCATATGTATTTGTTCTCCTACTAAGCTTATACCTACAAGAAAACGTATAA"}
				,{speciesClass:"Human",name:"TN",sequence:"TAGATTGAAGCCAGTTGATTAGGGTGCTTAGCTGTTAACTAAGTGTTTGTGGGTTTAAGTCCCATTGGTCTAG"}
				,{speciesClass:"Human",name:"TN",sequence:"TAGATTGAAGCCAGTTGATTAGGGTGCTTAGCTGTTAACTAAGTGTTTGTGGGTTTAAGTCCCATTGGTCTAG"}
				,{speciesClass:"BlacktipReefShark",name:"ATP6",sequence:"ATGATTATAAGCTTCTTTGATCAATTCTTAAGCCCATCACTTATTGGAATCCCCCTTATTGCCCTAGCAATTTTAATTCCATGATTAACCTTTCCAACCCCAACTAATCGATGACTAAATAACCGACTAATCACCCTCCAAGGGTGATTTATTAATCGTTTTGTTTATCAACTTATACAACCAATTAATCTTGGAGGACATAAATGAGCTATACTACTAACAGCCCTAATACTATTTCTAATTACCATTAACCTTTTAGGCCTTCTTCCGTATACATTTACTCCTACAACACAACTTTCTCTAAATATAGCATTTGCCCTCCCACTATGACTTACAACTGTATTAATTGGTATATTAAACCAACCTACAATTACATTAGGCCACCTTCTTCCAGAAGGAACACCAACTCCTTTAATTCCAATCCTTATTATTATCGAAACTATTAGCCTATTTATTCGACCATTAGCCCTAGGGGTCCGACTAACTGCCAATTTAACAGCAGGTCACCTTCTAATACAACTAATTGCCACTGCAGCATTTGTTCTCTTGACCATCATACCAACCGTAGCCTTATTAACTTCTACAATTCTATTCTTATTAACAATCCTAGAAGTAGCTGTAGCAATAATCCAAGCATATGTATTTGTTCTCCTACTAAGCTTATACCTACAAGAAAACGTATAA"}];
geneCompare(geneValues);
} 
function geneCompare(geneValues)
{
	console.log(geneValues);
	var geneData;
	var zVal='';
	var genes=[];
	var speciesName=[];
	var geneName=[];
	var geneLength=[];
	for(var k=0;k<geneValues.length;k++)
	{
		speciesName.push(geneValues[k].speciesClass);
		geneName.push(geneValues[k].name);
		genes.push(geneValues[k].sequence);
	}
	for(var j=0;j<genes.length;j++)
	{
		geneLength.push(genes[j].length);

	}
	geneLength.sort(function(a,b){return b-a});
	var maxLength=geneLength[0];
	geneData = randomData(width, height,genes,speciesName,geneName);
	labelData=randomData1(speciesName,geneName);
	generateVis();
/*	for(var p=0;p<filenames.length;p++)
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
	
} */

function generateVis()
{
	var yval=10
	//console.log("main_maxlength"+maxLength);
	//console.log("geneData "+geneData);
	d3.select(".vis").remove();
	d3.select(".vislabel").remove();
	var x = d3.scale.linear()
    .domain([0, maxLength])
    .range([0, width]);
	
	var zoom = d3.behavior.zoom()
    .x(x)
    .scaleExtent([1,70])
    .on("zoom", zoomed);

	//console.log(x(1)-x(0));

	var tip =d3.select("body").append("div")   
                            .attr("class", "d3-tip")               
                            .style("opacity", 0);

    var svgLabel=d3.select("#compareViz").append("svg")
   					.style("width", 140)
                    .style("height", height + margin.top + margin.bottom)
                    .style("float","left")
					.style("background","#777777")
    				.attr("class","vislabel")
    				.append("g");

    var labelRect=svgLabel.selectAll(".labelname")
    				.data(labelData)
    				.enter();

    				labelRect.append("svg:rect")
    				.attr("class","cellLabel")
    				.attr("x", 2)
                 	.attr("y", function(d) { return d.yval; })
                 	.attr("rx", 20)	
                 	.attr("ry", 20)
                 	.attr("width", 135)	
                 	.attr("height", 20)
                 	.style("fill","#000066")
                 	.style("stroke","#000066")
                 	.style("stroke-width",3)
                 	.style("opacity",0.5);

   var textlabel=  labelRect
   					.append("svg:text")     
        			.attr("x", 60)
        			.attr("y", function(d) { return d.yval+15 })
        			.attr("text-anchor","middle")
        			.attr("font-size", "12")
        			.text(function(d) { 
        			//console.log("inside labeltext");
					return d.labelVal;
					}); 

                 	
    var svgCompare1 = d3.select('#compareViz').append("svg")
                    .style("width", width + margin.left + margin.right)
                    .style("height", height + margin.top + margin.bottom)
                    .attr("class", "vis")
					.style("background","#777777")
                    .call(zoom)
					.on("dblclick.zoom", null);	
					
	var svgCompare= svgCompare1.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
					
	
    var row = svgCompare.selectAll(".row")
                  .data(geneData)
                .enter().append("svg:g")
                  .attr("class", "row");
	
    var col = row.selectAll(".cell")
                 .data(function (d) { return d; })
                 .enter().append("svg:rect")
                 .attr("class", "cell")
                 .attr("x", function(d,index) { return x(index); })
                 .attr("y", function(d) { return d.y; })
                 .attr("width", function(d) { return x(1)-x(0); })
                 .attr("height", function(d) { return d.height; })
                 .style("fill",function(d){return d.color;})
                  .on("mouseover",function(d,index){
				 //console.log("inside mouse hover");
				 	row.selectAll('.cell')				
					/*.style("fill",function(d){
					if(d.count==index)
					{
					console.log("inside match");
					return "#CC0099";
					}
					else
					{
					return d.color;
					}
					}) */
					.attr("stroke",function(d){	
					if((d.count==index)&&(d.value!='Z'))
					{
					return "#E65C00";
					}
					})
					.attr("stroke-width",function(d){
					if((d.count==index)&&(d.value!='Z'))
					{
					return (x(1)-x(0))/9;
					}
					});
					
				 })
				 .on("click",function(d){
				 	var geneName="";
				 	var basegeneName="";
				 	if(d.value=='A')
				 		geneName="Adenine";
				 	else if(d.value=='C')
				 		geneName="Cytosine";
				 	else if(d.value=='G')
				 		geneName="Guanine";
				 	else if(d.value=='T')
				 		geneName="Thiamine";
				 	if(d.baseGene=='A')
				 		basegeneName="Adenine";
				 	else if(d.baseGene=='C')
				 		basegeneName="Cytosine";
				 	else if(d.baseGene=='G')
				 		basegeneName="Guanine";
				 	else if(d.baseGene=='T')
				 		basegeneName="Thiamine";
				 	if(d.value!='Z')
				 	{
				 	tip.transition()        
                        .duration(200)   
                        .style("opacity", .9); 
                    if(d.rowCount==0)
                    {
                    	//console.log("inside first row");
                    	tip.html("<strong>Gene:</strong> <span style='color:#008AB8'>" + d.gene + "</span><br><strong>Position:</strong> <span style='color:#008AB8'>" + d.count + "</span><br><strong>Base Species:</strong> <span style='color:#008AB8'>" + d.name + "</span><br><strong>Base Nucleotide:</strong> <span style='color:#008AB8'>" + geneName + "</span>")
                       .style("left", (d3.event.pageX+20) + "px")     
                       .style("top", (d3.event.pageY - 120) + "px");
                    }  
                    else
                    {
                    tip.html("<strong>Gene:</strong> <span style='color:#008AB8'>" + d.gene + "</span><br><strong>Position:</strong> <span style='color:#008AB8'>" + d.count + "</span><br><strong>Species:</strong> <span style='color:#008AB8'>" + d.name + "</span><br><strong>Nucleotide:</strong> <span style='color:#008AB8'>" + geneName + "</span><br><strong>Base Species:</strong> <span style='color:#008AB8'>" + d.baseSpecies + "</span><br><strong>Base Nucleotide:</strong> <span style='color:#008AB8'>" + basegeneName + "</span>")
                       .style("left", (d3.event.pageX+20) + "px")     
                       .style("top", (d3.event.pageY - 120) + "px");
                    }

                	}
                       
				 })
				 .on("mouseout", function(d){
				 	tip.transition()        
                        .duration(200)      
                        .style("opacity", 0);
				});
				

	function zoomed()
	{
	console.log(zoom.scale());
	console.log(x(2)-x(1));
	var width=x(1)-x(0);
	//latest change
	var currentZoom=d3.event.scale;
	if(width>50)
	{
		zoom.scaleExtent([1,currentZoom])
	}
	svgCompare.selectAll('.row').remove();
	var row1 = svgCompare.selectAll(".row")
                  .data(geneData)
                .enter().append("svg:g")
				.attr("class", "row");

    var col1 = row1.selectAll(".cell")
                 .data(function (d) { return d; })
                .enter()
                .append("g")
                .attr("transform",function(d,index){

                	return "translate("+x(index)+","+d.y+")";
                })
                .attr("width", width)
                .append("svg:rect")
                 .attr("class", "cell")
              /*   .attr("x", function(d,index) {
				  return x(index);
				 })
                 .attr("y", function(d) { return d.y; }) */
                 //.attr("width", function(d) { return zoom.scale(); })
                 .attr("width", width)
                 .attr("height", function(d) { return d.height; })
                 .style("fill",function(d){return d.color;})
				 .on("mouseover",function(d,index){
				 //console.log("inside mouse hover");
				 	row1.selectAll('.cell')				
					/*.style("fill",function(d){
					if(d.count==index)
					{
					console.log("inside match");
					return "#CC0099";
					}
					else
					{
					return d.color;
					}
					}) */
					.attr("stroke",function(d){	
					if((d.count==index)&&(d.value!='Z'))
					{
					return "#E65C00";
					}
					})
					.attr("stroke-width",function(d){
					if((d.count==index)&&(d.value!='Z'))
					{
					return width/9;
					}
					});
					
				 })
				 .on("click",function(d){
				 	//console.log("inside click");
				 	//console.log("row"+d.rowCount)
				 	var geneName="";
				 	var basegeneName="";
				 	if(d.value=='A')
				 		geneName="Adenine";
				 	else if(d.value=='C')
				 		geneName="Cytosine";
				 	else if(d.value=='G')
				 		geneName="Guanine";
				 	else if(d.value=='T')
				 		geneName="Thiamine";
				 	if(d.baseGene=='A')
				 		basegeneName="Adenine";
				 	else if(d.baseGene=='C')
				 		basegeneName="Cytosine";
				 	else if(d.baseGene=='G')
				 		basegeneName="Guanine";
				 	else if(d.baseGene=='T')
				 		basegeneName="Thiamine";
				 	if(d.value!='Z')
				 	{
				 	tip.transition()        
                        .duration(200)   
                        .style("opacity", .9); 
                    if(d.rowCount==0)
                    {
                    	//console.log("inside first row");
                    	tip.html("<strong>Gene:</strong> <span style='color:#008AB8'>" + d.gene + "</span><br><strong>Position:</strong> <span style='color:#008AB8'>" + d.count + "</span><br><strong>Base Species:</strong> <span style='color:#008AB8'>" + d.name + "</span><br><strong>Base Nucleotide:</strong> <span style='color:#008AB8'>" + geneName + "</span>")
                       .style("left", (d3.event.pageX+20) + "px")     
                       .style("top", (d3.event.pageY - 120) + "px");
                    }  
                    else
                    {
                    tip.html("<strong>Gene:</strong> <span style='color:#008AB8'>" + d.gene + "</span><br><strong>Position:</strong> <span style='color:#008AB8'>" + d.count + "</span><br><strong>Species:</strong> <span style='color:#008AB8'>" + d.name + "</span><br><strong>Nucleotide:</strong> <span style='color:#008AB8'>" + geneName + "</span><br><strong>Base Species:</strong> <span style='color:#008AB8'>" + d.baseSpecies + "</span><br><strong>Base Nucleotide:</strong> <span style='color:#008AB8'>" + basegeneName + "</span>")
                       .style("left", (d3.event.pageX+20) + "px")     
                       .style("top", (d3.event.pageY - 120) + "px");
                    }

                	}
                       
				 })
				 .on("mouseout", function(d){
				 	tip.transition()        
                        .duration(200)      
                        .style("opacity", 0);
				});
				 
	if(zoom.scale()>9)
	{
	 var text = row1.selectAll(".label")
        .data(function(d) {return d;})
      .enter().append("svg:text")
        .attr("x", function(d,index) { return x(index)+width/2 })
        .attr("y", function(d) { return d.y + d.height/2 })
        .attr("text-anchor","middle")
        .attr("font-size", "8")
        .text(function(d) { 
		if(d.value!='Z')
			return d.value;
		else
			return zVal;})
        .on("click",function(d){
        	//console.log("text click");
        			var geneName="";
				 	var basegeneName="";
				 	if(d.value=='A')
				 		geneName="Adenine";
				 	else if(d.value=='C')
				 		geneName="Cytosine";
				 	else if(d.value=='G')
				 		geneName="Guanine";
				 	else if(d.value=='T')
				 		geneName="Thiamine";
				 	if(d.baseGene=='A')
				 		basegeneName="Adenine";
				 	else if(d.baseGene=='C')
				 		basegeneName="Cytosine";
				 	else if(d.baseGene=='G')
				 		basegeneName="Guanine";
				 	else if(d.baseGene=='T')
				 		basegeneName="Thiamine";
				 	if(d.value!='Z')
				 	{
				 	tip.transition()        
                        .duration(200)   
                        .style("opacity", .9); 
                    if(d.rowCount==0)
                    {
                    	//console.log("inside first row");
                    	tip.html("<strong>Gene:</strong> <span style='color:#008AB8'>" + d.gene + "</span><br><strong>Position:</strong> <span style='color:#008AB8'>" + d.count + "</span><br><strong>Base Species:</strong> <span style='color:#008AB8'>" + d.name + "</span><br><strong>Base Nucleotide:</strong> <span style='color:#008AB8'>" + geneName + "</span>")
                       .style("left", (d3.event.pageX+20) + "px")     
                       .style("top", (d3.event.pageY - 120) + "px");
                    }  
                    else
                    {
                    tip.html("<strong>Gene:</strong> <span style='color:#008AB8'>" + d.gene + "</span><br><strong>Position:</strong> <span style='color:#008AB8'>" + d.count + "</span><br><strong>Species:</strong> <span style='color:#008AB8'>" + d.name + "</span><br><strong>Nucleotide:</strong> <span style='color:#008AB8'>" + geneName + "</span><br><strong>Base Species:</strong> <span style='color:#008AB8'>" + d.baseSpecies + "</span><br><strong>Base Nucleotide:</strong> <span style='color:#008AB8'>" + basegeneName + "</span>")
                       .style("left", (d3.event.pageX+20) + "px")     
                       .style("top", (d3.event.pageY - 120) + "px");
                    }

                	}
        })
		.on("mouseout", function(d){
				 		tip.transition()        
                        .duration(200)      
                        .style("opacity", 0);
				});
	
	}
	}
	}
}

function randomData(gridWidth, gridHeight,genes,species,gene)
{
	var genesLength=[];
	var baseSpecies=species[0];
	for(var j=0;j<genes.length;j++)
	{
		genesLength.push(genes[j].length);
	}
	genesLength.sort(function(a,b){return b-a});
	var maxLength=genesLength[0];
	//console.log("max"+maxLength);
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
	var geneName='';
    var rowcount = 0;
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
			//console.log("geneSeq"+geneVal+geneVal.length);
		}
	genesNew.push(geneVal);
	}
	geneFirst=genesNew[0].split('');
	for (var index_a = 0; index_a < genesNew.length; index_a++)
    {
		speciesName=species[index_a];
		geneName=gene[index_a];
		innerCount=0;
        data.push(new Array());
		geneSeq=genesNew[index_a];
		for (var index_b = 0; index_b < geneSeq.length; index_b++)
        {
            newValue = geneSeq[index_b];
			if(rowcount==0)
			{
			if(newValue!="Z")
				var colorValue="#FFFFEB";
			else	
				var colorValue="#C5C5C5";
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
			var colorValue="#FFFFEB";
			}
			if(newValue=='Z')
			{
			var colorValue="#C5C5C5";
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
								name:speciesName,
								gene:geneName,
								baseSpecies:baseSpecies,
								rowCount:rowcount,
								baseGene:geneFirst[index_b]								
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
		rowcount=rowcount+1;
		
    }
    return data;
} 
function randomData1(speciesName,geneName)
{
	var datalabel=new Array();
	var ypos=30;
	for(var index_c=0;index_c<speciesName.length;index_c++)
	{
		datalabel.push({
			labelVal:speciesName[index_c]+"_"+geneName[index_c],
			yval:ypos
		});
		ypos=ypos+40;
	}
	return datalabel;
}	
