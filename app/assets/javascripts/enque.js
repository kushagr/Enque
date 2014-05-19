window.Enque = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new SongsRouter();
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Enque.initialize();
});
