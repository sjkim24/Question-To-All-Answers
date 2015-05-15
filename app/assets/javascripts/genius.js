window.Genius = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    rangy.init();
    new Genius.Routers.Router ({
      $rootEl: $('#main')
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Genius.initialize();
});
