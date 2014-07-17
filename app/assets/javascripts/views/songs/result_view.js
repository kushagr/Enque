Enque.Views.ResultView = Backbone.View.extend({
	className : "song col-sm-4",
	template : HandlebarsTemplates["songs/result"],

	events : {
		'click #song' : 'addToPlaylist',
		'click #add-icon' : 'addToPlaylist',
		'click #image' : 'addToPlaylist',
		'mouseenter #add-icon' : 'changeIcon',
		'mouseleave #add-icon' : 'revertIcon',
		'mouseenter #image' : 'addIcon',
		'mouseleave #image' : 'removeIcon'
	},

	render : function() {
		console.log("Hello there");
		console.log(this.model.get('thumbnails')[1].url);
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

	addToPlaylist : function(event) {
		event.preventDefault();
		$(event.currentTarget).parent().slideUp('fast');
		var playlist_id = $('#playlist').attr('data-id');
		var song = new Song({name : this.model.get('title'),url : this.model.get('player_url'),	playlist_id : playlist_id, video_id : this.model.get('unique_id'),image_url : this.model.get('thumbnails')[1].url});
		var playlist = new Playlist([],{playlist_id : playlist_id});
		playlist.set('id',playlist_id);
		playlist.create(song);
		playlist.fetch({success : this.renderPlaylist});
	},

	renderPlaylist : function(playlist,response){
		var playlistView = new Enque.Views.PlaylistView({collection : playlist});
		playlistView.render();
		$('#playlist').html(playlistView.el);
	},

	changeIcon : function(event){
		$(event.currentTarget).addClass('icon-hover');
	},


	revertIcon : function(event){
		$(event.currentTarget).removeClass('icon-hover');
	},

	addIcon : function(event){
		$(event.currentTarget).closest("p").addClass('hide-icon');	
	},

	removeIcon : function(event){
		$(event.currentTarget).closest('p').removeClass('hide-icon');	
	}


});