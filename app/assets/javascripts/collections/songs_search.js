var SongSearch = Backbone.Collection.extend({

	initialize : function(models, options){
	    this.query = options.query;
	},

    url: function(){
        return 'api/songs/search?q='+ this.query;
    },

    parse : function(response) {
    	return response.videos;
    },

});