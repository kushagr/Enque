Enque.Views.ResultsView = Backbone.View.extend({
	tagName : 'ul',
	className : 'results top20',
	// template : HandlebarsTemplates["songs/results"],

	render : function() {	
		this.collection.each(function(model) {
			console.log(model);
			var resultView = new Enque.Views.ResultView({model : model});
			resultView.render();
			this.$el.append(resultView.el);
		}, this);
		return this;
	}
});