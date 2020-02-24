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
