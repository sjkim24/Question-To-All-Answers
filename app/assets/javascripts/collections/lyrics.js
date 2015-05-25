Genius.Collections.Lyrics = Backbone.Collection.extend ({

  url: '/api/lyrics',

  model: Genius.Models.Lyric,

  getOrFetch: function (id) {
    var lyric = this.get(id);
    var lyrics = this;
    if (lyric) {
      lyric.fetch();
    } else {
      lyric = new Genius.Models.Lyric ({ id: id });
      lyric.fetch({
        success: function () {
          lyrics.add(lyric);
        }
      })
    }

    return lyric;
  }
})
