var Playlist = Backbone.Collection.extend({
	model : Song,

	initialize : function(models, options){
		this.id = options.playlist_id
	},

	url : function() {
		return 'api/playlists/' + this.id + '/songs';
	}

});