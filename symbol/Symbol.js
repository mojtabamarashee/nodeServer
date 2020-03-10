interval = 360;

//inscode = '318005355896147';

function DrawHist(dataa, id, timeFormat) {
	let data = [];
	for (i = 0; i < dataa.length; i++) {
		data[i] = dataa[i];
	}
	var margin = {top: 20, right: 50, bottom: 30, left: 80},
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

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
		.select(id)
		.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

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
		.style('font', '30px times')
		.call(
			d3
				.axisBottom(x)
				.ticks(5)
				.tickFormat(d =>
					new Date(d)
						.toLocaleTimeString('fa-IR', {year: '2-digit', month: '2-digit'})
						.replace('،‏ ۰:۰۰:۰۰', ''),
				),
		);

	// Add the Y Axis
	svg.append('g')
		.style('font', '25px times')
		.call(d3.axisLeft(y).ticks(5));
	//});

	//vol data

	const volData = data;
	const yMinVolume = d3.min(volData, d => {
		return Math.min(d['vol']);
	});
	const yMaxVolume = d3.max(volData, d => {
		return Math.max(d['vol']);
	});
	console.log('yMaxVolume = ', yMaxVolume);

	const yVolumeScale = d3
		.scaleLinear()
		.domain([yMinVolume, yMaxVolume])
		.range([height, 0]);

	svg.selectAll()
		.data(volData)
		.enter()
		.append('rect')
		.attr('x', d => {
			return x(d['date']);
		})
		.attr('y', d => {
			return yVolumeScale(d['vol']);
		})
		.attr('fill', (d, i) => {
			if (i === 0) {
				return '#03a678';
			} else {
				return volData[i - 1].pl > d.pl ? '#c0392b' : '#03a678';
			}
		})
		.attr('width', 1)
		.attr('height', d => {
			return height - yVolumeScale(d['vol']);
		});
}

function Draw(dataa, id, timeFormat, tmin, tmax) {
	console.log('tmed = ', tmed);
	let data = [];
	for (i = 0; i < dataa.length; i++) {
		data[i] = dataa[i];
	}
	var margin = {top: 20, right: 50, bottom: 30, left: 80},
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	//var parseTime = d3.timeParse(timeFormat);

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
		.select(id)
		.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	x.domain(
		d3.extent(data, function(d) {
			return d.date;
		}),
	);
	y.domain([
		Math.min(
			d3.min(data, function(d) {
				return d.pl;
			}),
			tmed - 0.1 * tmed,
		),
		Math.max(
			d3.max(data, function(d) {
				return d.pl;
			}),
			tmed + 0.1 * tmed,
		),
	]);

	// Add the valueline path.
	svg.append('path')
		.data([data])
		.attr('class', 'line')
		.attr('d', valueline);

	svg.append('line')
		.style('stroke', 'red')
		.style('stroke-width', 10)
		.attr('x1', x(data[0].date))
		.attr('y1', y(tmin)) //start of the line
		.attr('x2', x(data[data.length - 1].date))
		.attr('y2', y(tmin));

	svg.append('line')
		.style('stroke', 'green')
		.style('stroke-width', 10)
		.attr('x1', x(data[0].date))
		.attr('y1', y(tmax)) //start of the line
		.attr('x2', x(data[data.length - 1].date))
		.attr('y2', y(tmax));

	// Add the X Axis
	svg.append('g')
		.attr('transform', 'translate(0,' + height + ')')
		.style('font', '30px times')
		.call(
			d3
				.axisBottom(x)
				.ticks(5)
				.tickFormat(d =>
					new Date(d).toLocaleTimeString('fa-IR', {
						hour: '2-digit',
						minute: '2-digit',
					}),
				),
		);

	// Add the Y Axis
	svg.append('g')
		.style('font', '25px times')
		.call(d3.axisLeft(y).ticks(5));
}

function DrawMoneyFlow(dataa, id) {
	let data = [];
	for (i = 0; i < dataa.length; i++) {
		data[i] = dataa[i];
	}
	var margin = {top: 20, right: 50, bottom: 30, left: 80},
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	var svg = d3
		.select(id)
		.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	//vol data
	const volData = data.reverse();

	const yMinVolume = d3.min(volData, d => {
		return d[9] - d[11];
	});
	const yMaxVolume = d3.max(volData, d => {
		return d[9] - d[11];
	});
	console.log('yMaxVolume = ', yMaxVolume);
	console.log('yMinVolume = ', yMinVolume);

	const yVolumeScale = d3
		.scaleLinear()
		.domain([yMinVolume, yMaxVolume])
		.range([height, 0]);

	var x = d3.scaleTime().range([0, width]);
	var y = d3.scaleLinear().range([height, 0]);

	x.domain(
		d3.extent(data, function(d) {
			return d[0];
		}),
	);

	y.domain([
		d3.min(data, function(d) {
			return d[9] - d[11];
		}),
		d3.max(data, function(d) {
			return d[9] - d[11];
		}),
	]);
	// Add the X Axis
	svg.append('g')
		.attr('transform', 'translate(0,' + height + ')')
		.style('font', '25px times')
		.call(
			d3
				.axisBottom(x)
				.ticks(5)
				.tickFormat(d =>
					new Date(d)
						.toLocaleTimeString('fa-IR', {year: '2-digit', month: '2-digit', day: '2-digit'})
						.replace('،‏ ۰:۰۰:۰۰', ''),
				),
		);

	// Add the Y Axis
	svg.append('g')
		.style('font', '25px times')
		.call(
			d3
				.axisLeft(y)
				.ticks(5)

				.tickFormat(d => Math.round((d / 1e9) * 10) / 10 + 'B'),
		);

	svg.selectAll()
		.data(volData)
		.enter()
		.append('rect')
		.attr('x', d => {
			return x(d[0]);
		})
		.attr('y', d => {
			if (d[9] - d[11] < 0) return yVolumeScale(0);
			else return yVolumeScale(d[9] - d[11]);
		})
		.attr('fill', (d, i) => {
			return d[9] - d[11] > 0 ? '#03a678' : '#c0392b';
		})
		.attr('width', 10)
		.attr('height', d => {
			if (d[9] - d[11] < 0) return yVolumeScale(d[9] - d[11]) - yVolumeScale(0);
			else return height - yVolumeScale(d[9] - d[11]) - (yVolumeScale(yMinVolume) - yVolumeScale(0));
		});

	console.log('volData = ', volData[29][9] - volData[29][11]);
	svg.append('line')
		.style('stroke', 'black')
		.style('stroke-width', 5)
		.attr('x1', x(volData[0][0]))
		.attr('y1', yVolumeScale(0)) //start of the line
		.attr('x2', x(volData[volData.length - 1][0]))
		.attr('y2', yVolumeScale(0));
}

function ChangeDate(num) {
	interval = num;
	console.log('interval = ', interval);
	len = hist.length;
	console.log('hist = ', hist);
	const temp = JSON.parse(JSON.stringify(hist));
	let temp2 = temp.slice(len - interval, len - 1);
}

axios.get('http://filterbourse.ir/hist/' + inscode).then(response => {
	name = response.data.name;
	fullName = response.data.fullName;
	csName = response.data.csName;

	hist = response.data.hist;
	if (hist) len = response.data.hist.length;

	tmed = Number(response.data.tmed);
	tmin = Number(response.data.tmin);
	tmax = Number(response.data.tmax);

	pe = response.data.pe;
	sectorPE = response.data.sectorPE;

	pc = response.data.pc;
	pcp = Math.round(((pc - tmed) / tmed) * 100 * 100) / 100;

	pl = response.data.pl;
	plp = Math.round(((pl - tmed) / tmed) * 100 * 100) / 100;

	tvol = response.data.tvol;
	console.log('tvol = ', tvol);
	tvolp = response.data.QTotTran5JAvg;

	$('#title').text(name + '-' + pc);
	$('#name').text(name);
	$('#full-name').text('(' + fullName + ')');
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
	$('#Mtvol')
		.text(Math.round((tvol / tvolp) * 10) / 10)
		.css('color', Number(tvol) > Number(tvolp) ? 'green' : 'red');

	$('#pe').text(pe);
	$('#sec-pe').text(sectorPE);


	if (hist) {
		let temp = JSON.parse(JSON.stringify(hist));
		temp = temp.slice(len - interval, len - 1);

		var parseTime = d3.timeParse('%Y-%m-%d');
		temp.forEach(function(d) {
			d.date = parseTime(d.date.slice(0, 4) + '-' + d.date.slice(4, 6) + '-' + d.date.slice(6, 8));
			d.pl = d.pl;
		});

		DrawHist(temp, '#hist', '%Y-%m-%d');
	}

	intraDayPrice = response.data.intraDayPrice;
	if (intraDayPrice) {
		len = response.data.intraDayPrice.length;
		temp = JSON.parse(JSON.stringify(intraDayPrice));
		temp = temp.slice(len - interval, len - 1);

		var parseTime = d3.timeParse('%H:%M');
		temp.forEach(function(d) {
			d.date = parseTime(d.date);
			//d.pl = d.pl;
		});
		Draw(temp, '#one-day', '%H:%M', tmin, tmax);
	}

	temp = JSON.parse(JSON.stringify(response.data.ctHist));
	var parseTime = d3.timeParse('%Y-%m-%d');
	temp.forEach(function(d, i) {
		temp[i][0] = parseTime(
			d[0].toString().slice(0, 4) + '-' + d[0].toString().slice(4, 6) + '-' + d[0].toString().slice(6, 8),
		);
	});
	console.log('temp = ', temp);
	DrawMoneyFlow(temp, '#money-flow');
});

axios.get('http://filterbourse.ir/api/names').then(response => {
	availableTags = response.data.map(v => (v ? v : 0));
	$('#tags').autocomplete({
		source: availableTags,
		select: function(event, ui) {
			if (ui.item) {
				$('#tags').val(ui.item.value);
				window.location.href = 'http://filterbourse.ir/' + ui.item.value;
			}
		},
	});

	$('a').css('font-size', '30px');
});

function numeral(tvol) {
	if (tvol > 1e6) {
		return Math.round((tvol / 1e6) * 10) / 10 + 'M';
	} else if (tvol > 1000) {
		return Math.round((tvol / 1e3) * 10) / 10 + 'K';
	}
}

function PlotReal() {}
