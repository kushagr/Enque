var PlaylistRouter = Backbone.Router.extend({
	routes : {
		'playlists/new' : 'new'
	},

	new : function() {
		var searchView = new Enque.Views.SearchView();
		searchView.render();
		$('#search-view').html(searchView.el);
	}
});