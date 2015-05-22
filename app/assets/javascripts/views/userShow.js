Genius.Views.UserShow = Backbone.View.extend ({

  template: JST["users/show"],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  currentUser: function () {
    debugger
    var loggedin = Genius.CurrentUser.get("loggedin")
    return loggedin;
  },

  render: function () {
    debugger
    var content = this.template({
      user: this.model,
      currentUserId: Genius.CurrentUser.get("id")
    });
    this.$el.html(content);
    return this;
  }

})
