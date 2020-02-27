interval = 360;

//inscode = '318005355896147';
function Draw(dataa) {
	let data = [];
	for (i = 0; i < dataa.length; i++) {
		data[i] = dataa[i];
	}
	var margin = {top: 20, right: 50, bottom: 30, left: 80},
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	var parseTime = d3.timeParse('%Y-%m-%d');

	var x = d3.scaleTime().range([0, width]);
	var y = d3.scaleLinear().range([height, 0]);

	var valueline = d3
		.line()
		.x(function(d) {
			return x(d.date);
		})
		.y(function(d) {
			return y(d.pl);
		});

	var svg = d3
		.select('body')
		.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	data.forEach(function(d) {
		d.date = parseTime(d.date.slice(0, 4) + '-' + d.date.slice(4, 6) + '-' + d.date.slice(6, 8));
		d.pl = d.pl;
	});

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
		.style('font', '20px times')
		.call(d3.axisBottom(x));

	// Add the Y Axis
	svg.append('g')
		.style('font', '25px times')
		.call(d3.axisLeft(y));
	//});

	//	const volData = data.filter(d => d['vol'] !== null && d['vol'] !== 0);
	//	const yMinVolume = d3.min(volData, d => {
	//		return Math.min(d['volume']);
	//	});
	//	const yMaxVolume = d3.max(volData, d => {
	//		return Math.max(d['volume']);
	//	});
	//	const yVolumeScale = d3
	//		.scaleLinear()
	//		.domain([yMinVolume, yMaxVolume])
	//		.range([height, 0]);
	//
	//	svg.selectAll()
	//		.data(volData)
	//		.enter()
	//		.append('rect')
	//		.attr('x', d => {
	//			return xScale(d['date']);
	//		})
	//
	//		.attr('y', d => {
	//			return yVolumeScale(d['volume']);
	//		})
	//		.attr('fill', (d, i) => {
	//			if (i === 0) {
	//				return '#03a678';
	//			} else {
	//				return volData[i - 1].close > d.close ? '#c0392b' : '#03a678';
	//			}
	//		})
	//		.attr('width', 1)
	//		.attr('height', d => {
	//			return height - yVolumeScale(d['volume']);
	//		});
}

function ChangeDate(num) {
	interval = num;
	console.log('interval = ', interval);
	len = hist.length;
	console.log('hist = ', hist);
	const temp = JSON.parse(JSON.stringify(hist));
	let temp2 = temp.slice(len - interval, len - 1);
	//Draw(temp2);
}

axios.get('http://filterbourse.ir/hist/' + inscode).then(response => {
	name = response.data.name;
	fullName = response.data.fullName;
	csName = response.data.csName;

	hist = response.data.hist;
	len = response.data.hist.length;

	tmed = response.data.tmed;

	pc = response.data.pc;
	pcp = Math.round(((pc - tmed) / tmed) * 100 * 100) / 100;

	pl = response.data.pl;
	plp = Math.round(((pl - tmed) / tmed) * 100 * 100) / 100;

	tvol = response.data.tvol;

	let temp = JSON.parse(JSON.stringify(hist));

	temp = temp.slice(len - interval, len - 1);
	Draw(temp);

	$('#title').text(name + '-' + pc);
	$('#name').text(name);
	$('#full-name').text('(' + fullName +')');
	$('#cs-name').text(csName);

	$('#pc')
		.text(pc)
		.css('color', pc > tmed ? 'green' : 'red');
	$('#pcp')
		.text('(' + pcp + ')')
		.css('color', pcp > 0 ? 'green' : 'red');

	$('#pl')
		.text(pl)
		.css('color', pl > tmed ? 'green' : 'red');

	$('#plp')
		.text('(' + plp + ')')
		.css('color', plp > 0 ? 'green' : 'red');

	$('#tvol')
		.text(numeral(tvol))
		.css('color', pl > tmed ? 'black' : 'black');
});

axios.get('http://filterbourse.ir/api/names').then(response => {
	availableTags = response.data.map(v => (v ? v : 0));
	console.log('availableTags = ', availableTags);
	$('#tags').autocomplete({
		source: availableTags,
		select: function(event, ui) {
			if (ui.item) {
				$('#tags').val(ui.item.value);
				console.log('value = ', ui.item.value);
				window.location.href = 'http://filterbourse.ir/' + ui.item.value;
			}
		},
	});
});

function numeral(tvol) {
	if (tvol > 1e6) {
		return Math.round((tvol / 1e6) * 10) / 10 + 'M';
	} else if (tvol > 1000) {
		return Math.round((tvol / 1e3) * 10) / 10 + 'K';
	}
}
