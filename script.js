$(document).ready(function() {

		function searchCallback(results) {
			console.log(results);
			var errorMessage = "<div><h3>Sorry! Your search wasn't found...</h3></div>"
			var appendMessage = "<div><h3>" + results.Title + "</h3><p>" + results.Plot + "</p></div>";

			if(results.Title === undefined){
				$('.movie-info').html(errorMessage);
			} else {
		    $('.movie-info').slideDown().html(appendMessage);
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




