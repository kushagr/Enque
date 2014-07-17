Enque.Views.ResultsView = Backbone.View.extend({
	tagName : 'div',
	className : 'results top20 col-sm-12',
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