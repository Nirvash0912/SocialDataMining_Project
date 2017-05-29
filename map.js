function tooltipHtml(n, d){	/* function to create html content string in tooltip div. */
	return "<h4>"+n+"</h4><table>"+
		"<tr><td>count</td><td>"+(d.count)+"</td></tr>"+
		"</table>";
}

function getQueryVariable(variable) {
    var query = decodeURIComponent(window.location.search.substring(1));
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){
            var replaced = pair[1].split('+').join(' ');
            return replaced;
        }
    }
    return undefined;
}

function drawMap(datafile){
	var sampleData ={};
	var states = [];
	var counts = [];
	var max = 0;
	d3.csv(datafile, function(data) {
		data.forEach(function(d){
  			states.push(d.state)
			counts.push(parseInt(d.count));
		});
  		max = d3.max(counts)

  		var i = 0
  		sampleData["DC"] = {count:0, color:d3.interpolate("#36e275", "#e23636")(0 / max)}
		states.forEach(function(d){
			sampleData[d] = {count:counts[i], color : d3.interpolate("#36e275", "#e23636")(counts[i] / max)};
			i++;
		});

		// console.log(sampleData)

		/* draw states on id #statesvg */	
		uStates.draw("#statesvg", sampleData, tooltipHtml);
	
		d3.select(self.frameElement).style("height", "600px"); 
	});
}

$(document).ready(function() {
	var mapType = getQueryVariable("type");
	var month = getQueryVariable("month");

	if(mapType.localeCompare("overall") == 0){
		var datafile = "./data/location_stat_overall.csv";
		document.getElementById("map-type").innerHTML = "<h4>Overall</h4>";
		drawMap(datafile);
	} else {
		var datafile = "./data/location_stat_months" + month + ".csv"
		var month_string = "";
		switch(parseInt(month)) {
			case 1: month_string = "January";break;
			case 2: month_string = "February";break;
			case 3: month_string = "March";break;
			case 4: month_string = "April";break;
			case 5: month_string = "May";break;
			case 6: month_string = "June";break;
			case 7: month_string = "July";break;
			case 8: month_string = "August";break;
			case 9: month_string = "September";break;
			case 10: month_string = "October";break;
			case 11: month_string = "November";break;
			case 12: month_string = "December";break;
		}
		document.getElementById("map-type").innerHTML = "<h4>" + month_string + "</h4>";
		drawMap(datafile);
	}
});





	// console.log(sampleData)

	// sampleData ={};
	// // /* Sample random data. */	
	// ["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
	// "ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH", 
	// "MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT", 
	// "CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN", 
	// "WI", "MO", "AR", "OK", "KS", "LS", "VA"]
	// 	.forEach(function(d){ 
	// 		var count=Math.round(100*Math.random());
	// 		sampleData[d]={count, color:d3.interpolate("#36e275", "#e23636")(count / 100)}; 
	// 	});
	

	