//Plotly map, uncomment

Plotly.d3.csv("/data/station_data.csv",
	
	function(err, rows) {
		function unpack(rows, key) {
			return rows.map(function(row) {
				return row[key];
			});
		}
        map = document.getElementById('map-example-container');
		var data = [
			{
		type: "densitymapbox",
		lon: unpack(rows, "Longitude"),
                lat: unpack(rows, "Latitude"),
                z: unpack(rows, "State"),
		coloraxis: 'coloraxis',
		radius:5
			}
		];

		var layout = {
			dragmode: "zoom",
			mapbox: { style: "open-street-map", center: { lat: 38, lon: -95 }, zoom: 3 },
			title:{text: "Electric Charging Stations Density"},
		    	coloraxis: {colorscale: "Viridis"},
			margin: { r: 0, t: 30, b: 0, l: 0 }
		};

		Plotly.newPlot(map, data, layout);
})

d3.json("/data/station_data.json", function(data) {
  
  
  //console.log(tableData)
  // get table references
  var tbody = d3.select("tbody");

  function buildTable(data) {
  // First, clear out any existing data
    tbody.html("");
  }
  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
    // Append a row to the table body
      var row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
      Object.values(dataRow).forEach((val) => {
        var cell = row.append("td");
        cell.text(val);
    });
  });
  
})


