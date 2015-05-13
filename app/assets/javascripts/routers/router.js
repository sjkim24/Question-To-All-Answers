Genius.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl
    this.lyrics = new Genius.Collections.Lyrics ();
    
  },

  routes: {
    '': 'lyricsIndex',
    'lyrics/:id': 'lyricShow'
  },

  lyricsIndex: function () {
    this.lyrics.fetch();
    // it knows where to fetch by the url in collection
    var indexView = new Genius.Views.LyricsIndex ({ collection: this.lyrics})
    this._swapView(indexView);
  },

  lyricShow: function (id) {
    var lyric = this.lyrics.getOrFetch(id);
    var showView = new Genius.Views.LyricShow ({ model: lyric });
    this._swapView(showView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }

})
