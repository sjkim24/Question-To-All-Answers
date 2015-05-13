Genius.Routers.Router = Backbone.Router.extend({

  initialize: function () {
    this.$rootEl = $('#main');
  },

  routes: {
    '': 'index'
  },

  lyricsIndex: function () {
    var lyrics = new Genius.Collections.Lyrics ();
    lyrics.fetch();
    var indexView = new G

  }

})
