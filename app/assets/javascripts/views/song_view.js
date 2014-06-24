Enque.Views.SongView = Backbone.View.extend({
	tagName : "li",
	template : HandlebarsTemplates["songs/song"],

	events : {
		'click #song' : 'addToPlaylist',
		'mouseenter #cross-icon' : 'changeIcon',
		'mouseleave #cross-icon' : 'revertIcon',
		'click #cross-icon' : 'remove',
		'click #play-icon' : 'playVideo'
	},

	// initialize : function() {
	// 	this.listenTo(this.model, "remove", this.remove);
	// },

	render : function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

	// addToPlaylist : function(event) {
	// 	event.preventDefault();
	// 	var song = new Song({
	// 		name : this.model.get('title'),
	// 		url : this.model.get('player_url'),
	// 		//ugly selector needs to be removed
	// 		playlist_id : $('#playlist').attr('data-id')
	// 	});
	// 	song.save();
	// }

	changeIcon : function(event){
		$(event.currentTarget).toggleClass('playlist-icon-hover');
	},


	revertIcon : function(event){
		$(event.currentTarget).removeClass('playlist-icon-hover');
	},

	remove : function(event){
		$(event.currentTarget).parent().remove();
		var playlist_id = $('#playlist').attr('data-id');	
		var playlist = new Playlist([],{playlist_id : playlist_id});
		playlist.set('id',playlist_id);
		playlist.remove(this.model);
		this.model.destroy();
		playlist.fetch({success : this.renderPlaylist});
	},

	renderPlaylist : function(playlist,response){
		console.log(playlist);
		var playlistView = new Enque.Views.PlaylistView({collection : playlist});
		playlistView.render();
		$('#playlist').html(playlistView.el);
	},

	playVideo : function(event) {
		event.preventDefault();
		console.log('in playVideo');
		var playerView = new Enque.Views.PlayerView({model : this.model});
		playerView.render();
		console.log(playerView.el);
		$('#player_view').html(playerView.el);
	}

});