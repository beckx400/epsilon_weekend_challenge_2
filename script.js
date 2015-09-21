$(document).ready(function() {


	function searchCallback(results) {
		console.log(results);
		var errorMessage = "<div><h3>Sorry! Your search wasn't found...</h3></div>"
		var metaScore = "";

		if(parseInt(results.Metascore)>= 60){
			metaScore = "<p class='watch blue'>You should watch this movie!</p>";
		} else if(results.Metascore == "N/A") {
			metaScore = "<p class='watch'>No rating available, so give it a shot!</p>"

		} else {
			metaScore = "<p class='watch red' >This movie isn't worth your time...</p>";
		}

		var appendMessage = "<div><h3>" + results.Title + "</h3><p>" + results.Plot + "</p><br>" + metaScore + "</div>";

		if(results.Title === undefined){
			$('.movie-info').html(errorMessage);
		} else {
	    	$('.movie-info').html(appendMessage);
		}
	}

	$("form").on("submit", function(event){
		event.preventDefault();

		var $inputs = $(".myInputs input");
		var values = {};

		$inputs.each(function(){
			values[this.name] = $(this).val();
		});

		search(values.movie);

		$(".myInputs input[type=text]").val('');
		});

	function search(query){

		$.ajax ({
		    type: 'GET',
		    dataType: 'json',
		    crossDomain: true,
		    jsonp: 'json_callback',
		    url: 'http://www.omdbapi.com/?t='+ encodeURI(query),
		}).done(function(data){
			searchCallback(data);
		});
	}
});