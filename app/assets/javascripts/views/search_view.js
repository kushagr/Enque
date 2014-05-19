Enque.Views.SearchView = Backbone.View.extend({
	tagName : 'div',
	className : 'search',
	template : HandlebarsTemplates["songs/songs_search"],

	events : {
		'enter #search' : 'search'
	},


	render: function() {
		this.$el.html(this.template());
		return this;
	},

	search : function(event) {
		event.preventDefault();
		console.log(event);
	}
});