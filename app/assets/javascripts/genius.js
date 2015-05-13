window.Genius = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Genius.Routers.Router;
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Genius.initialize();
});
