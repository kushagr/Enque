$(document).ready(function(){												
	Handlebars.registerHelper('trimString', function(passedString) {
	    var theString = passedString.substring(0,50);
	    return new Handlebars.SafeString(theString)
	});
});