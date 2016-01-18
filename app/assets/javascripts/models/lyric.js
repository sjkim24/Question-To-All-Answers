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

    if (response.comments) {
      lyric.comments().set(response.comments);
      delete response.comments;
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

  comments: function () {
    if (!this._comments) {
      this._comments = new Genius.Collections.Comments ( [], {
        lyric: this
      })
    }

    return this._comments;
  },

  formatLyric: function () {
    var annotations = this.annotations();
    var that = this;
    if (this.get("lyric")) {
      var annoLyric = _.clone(this.get("lyric"));
      annotations.each(function(annotation) {
        var lyric = that.get("lyric");
        var annoId = annotation.get("id");
        var startPos = annotation.get("start_pos");
        var endPos = annotation.get("end_pos");
        var annotated = '<a class="annotation" data-id="'
          + annoId + '" href="#/annotations/' + annoId + '">'
          + (lyric.slice(startPos, endPos)) + "</a>";
        annoLyric = annoLyric.replace(
          lyric.slice(startPos, endPos), annotated);
      })

      return annoLyric.replace(/(?:\r\n|\r|\n)/g, '<br />');
    }

  },

  toJSON: function () {
    return { lyric: _.clone(this.attributes) };
  }

});
