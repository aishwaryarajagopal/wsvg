function drawScatter(){

			d3.select("svg")
			  .remove();

			var w = document.getElementById("viz").offsetWidth;
			console.log(w);
			var h = 500;
			var padding = 30;

			//Dynamic, random dataset
			var dataset = [];											//Initialize empty array
			var numDataPoints = 50;										//Number of dummy data points to create
			var maxRange = Math.random() * 1000;						//Max range of new values
			for (var i = 0; i < numDataPoints; i++) {					//Loop numDataPoints times
				var newNumber1 = Math.floor(Math.random() * maxRange);	//New random integer
				var newNumber2 = Math.floor(Math.random() * maxRange);	//New random integer
				dataset.push([newNumber1, newNumber2]);					//Add new number to array
			}

			//Create scale functions
			var xScale = d3.scale.linear()
								 .domain([0, d3.max(dataset, function(d) { return d[0]; })])
								 .range([padding, w - padding * 2]);

			var yScale = d3.scale.linear()
								 .domain([0, d3.max(dataset, function(d) { return d[1]; })])
								 .range([h - padding, padding]);

			//Define X axis
			var xAxis = d3.svg.axis()
							  .scale(xScale)
							  .orient("bottom")
							  .ticks(5);

			//Define Y axis
			var yAxis = d3.svg.axis()
							  .scale(yScale)
							  .orient("left")
							  .ticks(5);

			//Create SVG element
			var svg = d3.select("#viz")
						.append("svg")
						.attr("width", w)
						.attr("height", h);


			//Create circles
			svg.selectAll("circle")
			   .data(dataset)
			   .enter()
			   .append("circle")
			   .attr("cx", function(d) {
			   		return xScale(d[0]);
			   })
			   .attr("cy", function(d) {
			   		return yScale(d[1]);
			   })
			   .attr("r", 2);

			//Create X axis
			svg.append("g")
				.attr("class", "x_axis")
				.attr("transform", "translate(0," + (h - padding) + ")")
				.call(xAxis);

			//Create Y axis
			svg.append("g")
				.attr("class", "y_axis")
				.attr("transform", "translate(" + padding + ",0)")
				.call(yAxis);



			//On click, update with new data			
			d3.select("#scatterLink")
				.on("click", function() {

					//New values for dataset
					var numValues = dataset.length;						 		//Count original length of dataset
					var maxRange = Math.random() * 1000;						//Max range of new values
					dataset = [];  						 				 		//Initialize empty array
					for (var i = 0; i < numValues; i++) {				 		//Loop numValues times
						var newNumber1 = Math.floor(Math.random() * maxRange);	//New random integer
						var newNumber2 = Math.floor(Math.random() * maxRange);	//New random integer
						dataset.push([newNumber1, newNumber2]);					//Add new number to array
					}

					//Update scale domains
					xScale.domain([0, d3.max(dataset, function(d) { return d[0]; })]);
					yScale.domain([0, d3.max(dataset, function(d) { return d[1]; })]);

//Update x-axis
svg.select(".x_axis")
.transition()
.duration(1000)
.call(xAxis);

//Update y-axis
svg.select(".y_axis")
.transition()
.duration(1000)
.call(yAxis);


					//Update all circles
					svg.selectAll("circle")
					   .data(dataset)
					   .transition()
   					   .duration(1000)
   					   .each("start", function() { // color change at start of transition
d3.select(this)
.attr("fill", "magenta")
.attr("r", 3);
})

					   .attr("cx", function(d) {
					   		return xScale(d[0]);
					   })
					   .attr("cy", function(d) {
					   		return yScale(d[1]);
					   })
					   .each("end", function() { // back to original color at the end of transition
d3.select(this)
.attr("fill", "black")
.attr("r", 2);
});
				});
}