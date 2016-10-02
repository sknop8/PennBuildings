var search = 'https://api.pennlabs.org/buildings/search?q=';
var building = 'hill';


$('#search').submit(function(event){
	event.preventDefault();
	building = $('#search input').val();

	$.getJSON(search + building, function(data){
		var $results = $('#results');
		var info = data['result_data'];

		$results.html('');
		$.each(info, function(i, val){
			var title = val['title']
			var $gmaps = get_gmaps(val);
			var $entry= $('<div class="row"></div>');
			add_image($entry, val);
			var $title = $('<div class="col-md-9 building-name">'+title+'</div>');
			var address = val['address'];
			if (address.length > 0) {
				$title.append('<div class="little-info">Address: '+address+'</div>');
			}
			
			$title.append($gmaps);
			$entry.append($title);
			$results.append($entry);
			$entry.css('opacity');
			$entry.addClass('in');
		});

		if (info.length === 0){
			$results.append('<div>Sorry, no results were found for "' + building + '".</div>');
		}
	});
});

var add_image = function($el, info) {
	var img_thumb = info['campus_item_images'][0]['thumbnail_url'];
	var $img = $('<img>');
	$img.attr('src',img_thumb);
	var $col = $('<div class="col-md-3"></div>')
	$col.append($img);
	$el.append($col);
};

var get_gmaps = function(info) {
	var lat = info['latitude'], long = info['longitude'];
	var $el = $('<div >Find on Google Maps</div>');
	$el.addClass('find-on-gmap');
	var $map = $('<div class="gmap"></div>');
	$map.attr('id', info['id']);
	
	$el.click(function(){
		$map.css({'width': '500px', 'height': '400px'});
		$map.locationpicker({location:{latitude:lat, longitude:long}, radius:200});		
	});

	$el.append($map);
	return $el;
};

