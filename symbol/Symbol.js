function Draw(data) {
	var margin = {top: 20, right: 20, bottom: 30, left: 50},
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	var parseTime = d3.timeParse('%Y-%m-%d');

	var x = d3.scaleTime().range([0, width]);
	var y = d3.scaleLinear().range([height, 0]);

	// define the line
	var valueline = d3
		.line()
		.x(function(d) {
			return x(d.date);
		})
		.y(function(d) {
			return y(d.pl);
		});

	// append the svg obgect to the body of the page
	// appends a 'group' element to 'svg'
	// moves the 'group' element to the top left margin
	var svg = d3
		.select('body')
		.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	// Get the data
	//		d3.csv('data.csv', function(error, data) {
	//	if (error) throw error;

	// format the data
	data.forEach(function(d) {
		d.date = parseTime(d.date.slice(0, 4) + '-' + d.date.slice(4, 6) + '-' + d.date.slice(6, 8));
		d.pl = d.pl;
	});

	// Scale the range of the data
	x.domain(
		d3.extent(data, function(d) {
			return d.date;
		}),
	);
	y.domain([
		0,
		d3.max(data, function(d) {
			return d.pl;
		}),
	]);

	// Add the valueline path.
	svg.append('path')
		.data([data])
		.attr('class', 'line')
		.attr('d', valueline);

	// Add the X Axis
	svg.append('g')
		.attr('transform', 'translate(0,' + height + ')')
		.call(d3.axisBottom(x));

	// Add the Y Axis
	svg.append('g').call(d3.axisLeft(y));
	//});

	const volData = data.filter(d => d['vol'] !== null && d['vol'] !== 0);
	const yMinVolume = d3.min(volData, d => {
		return Math.min(d['volume']);
	});
	const yMaxVolume = d3.max(volData, d => {
		return Math.max(d['volume']);
	});
	const yVolumeScale = d3
		.scaleLinear()
		.domain([yMinVolume, yMaxVolume])
		.range([height, 0]);

	svg.selectAll()
		.data(volData)
		.enter()
		.append('rect')
		.attr('x', d => {
			return xScale(d['date']);
		})

		.attr('y', d => {
			return yVolumeScale(d['volume']);
		})
		.attr('fill', (d, i) => {
			if (i === 0) {
				return '#03a678';
			} else {
				return volData[i - 1].close > d.close ? '#c0392b' : '#03a678';
			}
		})
		.attr('width', 1)
		.attr('height', d => {
			return height - yVolumeScale(d['volume']);
		});
}

axios.get('http://filterbourse.ir/hist/' + inscode).then(response => {
	//console.log('response = ', response.data[0].hist.reverse());
	this.Draw(response.data.hist);
});
