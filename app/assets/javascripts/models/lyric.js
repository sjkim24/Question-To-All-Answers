Genius.Models.Lyric = Backbone.Model.extend ({

  urlRoot: '/api/lyrics',

  parse: function (response) {
    var lyric = this;
    if (response.artist) {
      lyric.artist().set(response.artist);
      delete response.artist;
    }

    return response;
  },

  artist: function () {
    if (!this._artist) {
      this._artist = new Genius.Models.Artist( {}, { lyric: this });
    }

    return this._artist;
  }

})
