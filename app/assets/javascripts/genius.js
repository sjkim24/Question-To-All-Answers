window.Genius = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Genius.CurrentUser = new Genius.Models.CurrentUser ();
    Genius.CurrentUser.fetch({
      success: function () {
        new Genius.Routers.Router ({
          $rootEl: $('#main')
        });
        Backbone.history.start();
      }
    });
  }
};

$(document).ready(function(){
  Genius.initialize();
});
