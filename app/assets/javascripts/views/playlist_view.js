Enque.Views.PlaylistView = Backbone.View.extend({
	tagName : 'ul',
	// template : HandlebarsTemplates["songs/results"],

	initialize : function(){
		this.listenTo(this.collection, "add", this.render);
	},

	render : function() {	
		this.collection.each(function(model) {
			console.log(model);
			var songView = new Enque.Views.SongView({model : model});
			songView.render();
			this.$el.append(songView.el);
		}, this);
		return this;
	}
});