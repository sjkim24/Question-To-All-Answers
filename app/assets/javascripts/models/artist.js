Genius.Models.Artist = Backbone.Model.extend ({

  urlRoot: '/api/artists',

  parse: function (response) {
    var artist = this;
    if (response.lyrics) {
      artist.lyrics().set(response.lyrics);
      delete response.lyrics;
    }

    return response;
  },

  lyrics: function () {
    if (!this._lyrics) {
      this._lyrics = new Genius.Collections.Lyrics( [], { artist: this });
    }

    return this._lyrics;
  }

})
