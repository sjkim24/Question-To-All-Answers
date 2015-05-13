Genius.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl
    this.lyrics = new Genius.Collections.Lyrics ();
    this.artists = new Genius.Collections.Artists ();

  },

  routes: {
    '': 'lyricsIndex',
    'lyrics/:id': 'lyricShow',
    'artists/:id': 'artistShow'
  },

  lyricsIndex: function () {
    this.lyrics.fetch();
    // it knows where to fetch by the url in collection
    var lyricsIndex = new Genius.Views.LyricsIndex ({ collection: this.lyrics })
    this._swapView(lyricsIndex);
  },

  lyricShow: function (id) {
    var lyric = this.lyrics.getOrFetch(id);
    var lyricShow = new Genius.Views.LyricShow ({ model: lyric });
    this._swapView(lyricShow);
  },

  artistIndex: function (id) {
    this.artists.fetch();
    var artistsIndex = new Genius.Views.ArtistsIndex ({ collection: this.artists })
    this._swapView(artistsIndex)
  },

  artistShow: function (id) {
    this.artists.fetch();
    var artist = this.artists.getOrFetch(id);
    var artistShow = new Genius.Views.ArtistShow ( { model: artist });
    this._swapView(artistShow)
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }

})
