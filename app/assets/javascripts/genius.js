window.Genius = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Genius.Routers.Router ({
      $rootEl: $('#main')
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Genius.initialize();
});
