$( document ).ready(function() {

	$('#version-selector').on("change", function(event) {
		  if(this.value === 'instructor'){
		  	$('#42links').addClass('hidden');
		  	$('#instructorlinks').removeClass('hidden');
		  } else if(this.value === "4.2"){
		  	$('#instructorlinks').addClass('hidden');
		  	$('#42links').removeClass('hidden');
		  }
	});
});