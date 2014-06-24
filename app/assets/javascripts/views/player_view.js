Enque.Views.PlayerView = Backbone.View.extend({
	tagName : 'div',
	template : HandlebarsTemplates["songs/player"],

	initialize : function(){
		this.model.fetch();
	},

	render : function() {
		this.$el.html(this.template(this.model.toJSON()));

		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		var self = this;
		window.onYouTubeIframeAPIReady = function() {
		self.player = new YT.Player('player', {
	      events: {
	      	'onReady': this.onPlayerReady,
	      	'onStateChange': this.onPlayerStateChange
	      }
	      });
		}
		return this;
	},


	onPlayerReady : function(event) {
		alert(event);
		console.log("hey Im ready");
		this.player.playVideo();
	},

	onPlayerStateChange : function(event) {
		alert(event);
		if (event.data == YT.PlayerState.ENDED){
			this.playNextVideo();	
		}
	},

	playNextVideo : function() {
		this.fetchPlaylist();
	},

	fetchPlaylist : function(){
		console.log("fetching playlist");
		var playlist_id = $('#playlist').attr('data-id');
		var playlist = new Playlist([],{playlist_id : playlist_id});
		playlist.fetch({success :  this.getNextVideo});
	},

	getNextVideo : function(collection,response){
		console.log("fetching next video");
		var nextIndex = this.getVideoIndex(collection) + 1;
		var song = collection.at(nextIndex);
		this.player.loadVideoById({videoId : song.get('video_id')});
	},

	getVideoIndex : function(collection){
		console.log("fetching pindx");
		var index = collection.indexOf(this.model);
		return index;
	}




});