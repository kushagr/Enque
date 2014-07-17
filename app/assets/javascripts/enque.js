window.Enque = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new SongsRouter();
    new PlaylistRouter();
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Enque.initialize();
});
