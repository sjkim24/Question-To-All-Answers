Genius.Models.Aritst = Backbone.Model.extend ({

  url: '/api/artists',

  parse: function (response) {
    var artist = this;
    if (response.lyrics) {
      atist.lyrics().set(response.lyrics);
      delete response.lyrics;
    }
  },

  lyrics: function () {
    if (!this._lyrics) {
      this._lyrics = new Genius.Collections.Lyrics([], { artist: this });
    }

    return this._lyrics;
  }

})
