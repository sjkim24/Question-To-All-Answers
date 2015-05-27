Genius.Models.Annotation = Backbone.Model.extend ({

  urlRoot: 'api/annotations',

  parse: function (response) {
    var annotation = this;
    if (response.upvotes) {
      annotation.upvotes().set(response.upvotes);
      delete response.upvotes;
    }

    if (response.lyric) {
      annotation.lyric().set(response.lyric);
      delete response.lyric;
    }

    return response;
  },

  lyric: function () {
    if (!this._lyric) {
      this._lyric = new Genius.Models.Lyric( {}, { annotation: this })
    }

    return this._lyric;
  },

  upvotes: function () {
    if (!this._upvotes) {
      this._upvotes = new Genius.Collections.Upvotes( [], { annotation: this });
    }

    return this._upvotes;
  },

  toJSON: function () {
    return { annotation: _.clone(this.attributes) }
  }


})
