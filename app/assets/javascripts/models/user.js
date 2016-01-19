Genius.Models.User = Backbone.Model.extend ({

  urlRoot: '/api/users',

  parse: function (response) {
    var user = this;
    if (response.lyrics) {
      user.lyrics().set(response.lyrics);
      delete response.lyrics;
    }

    if (response.annotations) {
      user.annotations().set(response.annotations);
      delete response.annotations;
    }

    return response;
  },

  lyrics: function () {
    if (!this._lyrics) {
      this._lyrics = new Genius.Collections.Lyrics( [], { user: this });
    }

    return this._lyrics;
  },

  annotations: function () {
    if (!this._annotations) {
      this._annotations = new Genius.Collections.Annotations( [], { user: this });
    }

    return this._annotations;
  },

  toJSON: function () {
    var json = { user: _.clone(this.attributes) };

    if (this._image) {
      json.user.image = this._image;
    }

    return json;
  }
  
});
