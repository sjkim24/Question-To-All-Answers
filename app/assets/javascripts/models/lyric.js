Genius.Models.Lyric = Backbone.Model.extend ({

  urlRoot: '/api/lyrics',

  parse: function (response) {
    var lyric = this;
    if (response.artist) {
      lyric.artist().set(response.artist);
      delete response.artist;
    }

    if (response.annotations) {
      lyric.annotations().set(response.annotations);
      delete response.annotations;
    }

    return response;
  },

  artist: function () {
    if (!this._artist) {
      this._artist = new Genius.Models.Artist ( {}, { lyric: this });
    }

    return this._artist;
  },

  annotations: function () {
    if (!this._annotations) {
      this._annotations = new Genius.Collections.Annotations ( [], {
        lyric: this
      })
    }

    return this._annotations;
  },

  formatLyric: function () {
    var re = /\n/g
    if (this.get("lyric")) {
      // cloning lyric because i don't want to modify the original attribute
      return _.clone(this.get("lyric")).replace(re, '<br>')
    }
  },

  // when you set attrs on a model, it calls toJSON
  // in order to build the lyric params, i need to override toJSON
  // and nest my attributes in lyric hash
  toJSON: function () {
    return { lyric: _.clone(this.attributes) }
  }

})
