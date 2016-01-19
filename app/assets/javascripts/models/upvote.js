Genius.Models.Upvote = Backbone.Model.extend ({

  urlRoot: "api/upvotes",

  fetchByAnnoUserIds: function (annoId, userId) {
    var upvote = that.upvotes.findWhere({
      anno_id: that.model.get("id"),
      user_id: currentUserId,
      upvoted: that.model.get("upvoted")
    })

    if (upvote === undefined) {
      upvote = new Genius.Models.Upvote ({
        anno_id: that.model.get("id"),
        user_id: currentUserId,
        upvoted: "neutral"
      })
    }

    return upvote
  },

  toJSON: function () {
    return { upvote: _.clone(this.attributes) };
  }
})
