Enque.Views.PlayerView = Backbone.View.extend({
	tagName : 'div',
	id : 'player',

	initialize : function(){
		this.$el.html('');
	},

	render : function() {
	    var player;
    	this.player = new YT.Player('player', {
       		height: '500',
	        width: '1000',
	        playerVars : {
	       		autoplay : 1,
	       		allowfullscreen : 1,
	       		enablejsapi : 1
	        },
	        events: {
	         	'onReady': this.onPlayerReady,
	         	'onStateChange': this.onPlayerStateChange
	       	}
     	});             
		return this;
	},

	onPlayerReady : function(event) {
		event.target.playVideo();		
	},

	onPlayerStateChange : function(event) {
		if (event.data == YT.PlayerState.ENDED){
			var playlist_id = $('#playlist').attr('data-id');
			var playlist = new Playlist([],{playlist_id : playlist_id});
			var video = event.target.getVideoData();
			playlist.fetch({
				success :  function(collection,response){
					var song = collection.findWhere({video_id : video.video_id});
					var index = collection.indexOf(song) + 1;
					var song = collection.at(index);
					if (song !== undefined) {
						event.target.loadVideoById({videoId : song.get('video_id')});
					}else{
						var song = collection.at(0);
						event.target.loadVideoById({videoId : song.get('video_id')});
					}
				}
			});
		}
	},


});