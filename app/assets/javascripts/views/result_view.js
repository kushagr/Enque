Enque.Views.ResultView = Backbone.View.extend({
	tagName : "li",
	template : HandlebarsTemplates["songs/result"],

	events : {
		'click #song' : 'addToPlaylist',
		'click #add-icon' : 'addToPlaylist',
		'mouseenter #add-icon' : 'changeIcon',
		'mouseleave #add-icon' : 'revertIcon'
	},

	render : function() {
		console.log("Hello there");
		console.log(this.model);
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

	addToPlaylist : function(event) {
		event.preventDefault();
		$(event.currentTarget).parent().slideUp('fast');
		var playlist_id = $('#playlist').attr('data-id');
		var song = new Song({name : this.model.get('title'),url : this.model.get('player_url'),	playlist_id : playlist_id, video_id : this.model.get('unique_id')});
		song.save();
		var playlist = new Playlist([],{playlist_id : playlist_id});
		playlist.set('id',playlist_id);
		playlist.push(song);
		playlist.fetch({success : this.renderPlaylist});
	},

	renderPlaylist : function(playlist,response){
		var playlistView = new Enque.Views.PlaylistView({collection : playlist});
		playlistView.render();
		$('#playlist').html(playlistView.el);
	},

	changeIcon : function(event){
		$(event.currentTarget).toggleClass('icon-hover');
	},


	revertIcon : function(event){
		$(event.currentTarget).removeClass('icon-hover');
	}


});