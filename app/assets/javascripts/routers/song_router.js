var SongsRouter = Backbone.Router.extend({
	routes : {
		'' : 'home'
	},

	home : function() {
		var searchView = new Enque.Views.SearchView();
		searchView.render();
		$('#search-view').html(searchView.el);
	}
});