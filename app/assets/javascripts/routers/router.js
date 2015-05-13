Genius.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl
  },

  routes: {
    '': 'index'
  },

  index: function () {
    var lyrics = new Genius.Collections.Lyrics ();
    lyrics.fetch();
    var indexView = new Genius.Views.LyricsIndex ({ collection: lyrics})
    this._swapView(indexView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }

})
