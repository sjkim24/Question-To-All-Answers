Genius.Collections.Users = Backbone.Collection.extend ({

  url: '/api/users',

  model: Genius.Models.User,

  getOrFetch: function (id) {
    var user = this.get(id);
    var users = this;
    if (user) {
      user.fetch();
    } else {
      user = new Genius.Models.User ( {id: id });
      user.fetch({
        success: function () {
          users.add(user)
        }
      });
    }

    return user;
  }

})
