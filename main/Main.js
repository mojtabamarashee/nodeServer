
axios.get('http://filterbourse.ir/api/names').then(response => {
	availableTags = response.data.map(v => (v ? v : 0));
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

dataset = [];
axios.get('http://filterbourse.ir/api/allRows').then(response => {
	dataset = response.data.map((v, i) => {
		return {
			Count: Math.round((v.tvol / v.QTotTran5JAvg) * 10) / 10,
			Name: v.name,
		};
	});

	dataset = dataset
		.filter(v => v.Count)
		.filter(v => v.Count > 1)
		.filter(v => v.Count != Infinity);
	Draw(dataset);

	PlotRealMoneyEntry();
});

function Draw(dataset) {
	var diameter = 500;
	var color = d3.scaleOrdinal(d3.schemeCategory20);

	var bubble = d3
		.pack(dataset)
		.size([diameter, diameter])
		.padding(0.1);
	//.padding(1.5);

	var svg = d3
		.select('#volume')
		.append('svg')
		.attr('width', diameter)
		.attr('height', diameter)
		.attr('class', 'bubble');

	var nodes = d3.hierarchy(dataset).sum(function(d) {
		return d.Count;
	});

	var node = svg
		.selectAll('.node')
		.data(bubble(nodes).descendants())
		.enter()
		.filter(function(d) {
			return !d;
		})
		.append('g')
		.attr('class', 'node')
		.attr('transform', function(d) {
			return 'translate(' + d.x + ',' + d.y + ')';
		});

	node.append('title').text(function(d) {
		return d.Name + ': ' + d.Count;
	});

	node.append('circle')
		.attr('r', function(d) {
			return d.r;
		})
		.style('fill', function(d, i) {
			return color(i);
		});

	node.append('text')
		.attr('dy', '.2em')
		.style('text-anchor', 'middle')
		.text(function(d) {
			return d.data.Name;
			//return d.data.Name.substring(0, d.r / 3);
		})
		.attr('font-family', 'sans-serif')
		.attr('font-size', function(d) {
			return d.r / 2;
			//return d.r / 5;
		})
		.attr('fill', 'white');

	node.append('text')
		.attr('dy', '1.3em')
		.style('text-anchor', 'middle')
		.text(function(d) {
			return d.data.Count;
		})
		.attr('font-family', 'Gill Sans', 'Gill Sans MT')
		.attr('font-size', function(d) {
			return d.r / 2;
			//return d.r / 5;
		})
		.attr('fill', 'white');

	d3.select(self.frameElement).style('height', diameter + 'px');
}

function PlotRealMoneyEntry() {}
