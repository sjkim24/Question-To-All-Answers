Genius.Collections.Comments = Backbone.Collection.extend ({

  url: '/api/comments',

  model: Genius.Models.Comment,

  getOrFetch: function (id) {
    var comment = this.get(id);
    var comments = this;
    if (comment) {
      comment.fetch();
    } else {
      comment = new Genius.Models.Comment ({ id: id });
      comment.fetch({
        success: function () {
          comments.add(comment)
        }
      });
    }

    return comments;
  }

})
