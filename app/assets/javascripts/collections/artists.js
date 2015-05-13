Genius.Artists.Collections = Backbone.Collection.extend ({

  url: '/api/artist',

  model: Genius.Models.Artist,

  getOrFetch: function (id) {
    var artist = this.get(id);
    var artists = this
    if (artist) {
      artist.fetch();
    } else {
      artist = new Genius.Models.Aritst ({ id: id });
      artist.fetch({
        success: function () {
          artists.add(artist)
        }
      });
    }

    return artist
  }

})
