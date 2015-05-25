Genius.Collections.Upvotes = Backbone.Collection.extend ({

  url: "api/upvotes",

  model: Genius.Models.Upvote,

  getOrFetch: function(id) {
    var upvote = this.get(id);
    var upvotes = this;
    if (upvote) {
      upvote.fetch();
    } else {
      upvote = new Genius.Models.Upvote ({ id: id });
      upvote.fetch({
        success: function () {
          upvotes.add(upvote);
        }
      })
    }

    return upvote;
  }


})
