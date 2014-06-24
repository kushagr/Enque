Enque.Views.SearchView = Backbone.View.extend({
	tagName : 'div',
	className : 'search',
	template : HandlebarsTemplates["songs/songs_search"],

	events : {
		'submit' : 'search'
	},

	render: function() {
		this.$el.html(this.template());
		return this;
	},

	search : function(event) {
		event.preventDefault();
		this.getPlaylist();
		var query = this.$('[name=q]').val();
		var searchResults = new SongSearch([],{query : query});
		searchResults.fetch({ success : this.renderResults });
	},

	renderResults : function(results,response) {
   		var resultsView = new Enque.Views.ResultsView({collection : results});
   		resultsView.render();
   		$('#results-list').html(resultsView.el);
	},

	getPlaylist : function() {
		var playlist = new Playlist([],{playlist_id : $('#playlist').attr('data-id')});
		playlist.fetch({success : this.renderPlaylist});
	},

	renderPlaylist : function(playlist,response) {
		var playlistView = new Enque.Views.PlaylistView({collection : playlist});
		playlistView.render();
		$('#playlist').html(playlistView.el);
	}
});