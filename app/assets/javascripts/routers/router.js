Genius.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl
    this.lyrics = new Genius.Collections.Lyrics ();
    this.artists = new Genius.Collections.Artists ();

  },

  routes: {
    '': 'lyricsIndex',
    'lyrics/:id': 'lyricShow',
    'artists': 'artistsIndex',
    'artists/:id': 'artistShow'
  },

  lyricsIndex: function () {
    this.lyrics.fetch();
    // it knows where to fetch by the url in collection
    var indexView = new Genius.Views.LyricsIndex ({ collection: this.lyrics })
    this._swapView(indexView);
  },

  lyricShow: function (id) {
    var lyric = this.lyrics.getOrFetch(id);
    var showView = new Genius.Views.LyricShow ({ model: lyric });
    this._swapView(showView);
  },

  artistsIndex: function () {
    this.artists.fetch();
    var indexView = new Genius.Views.ArtistsIndex ({ collection: this.artists })
    this._swapView(indexView)
  },

  artistShow: function (id) {
    
    var artist = this.artists.getOrFetch(id);
    var showView = new Genius.Views.ArtistShow ({ model: artist });
    this._swapView(showView)
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }

})
