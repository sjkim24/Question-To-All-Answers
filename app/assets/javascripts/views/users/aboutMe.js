Genius.Views.UserAboutMe = Backbone.View.extend ({

  template: JST['users/aboutMe'],

  render: function () {
    var content = this.template({
      user: this.model,
      currentUserId: Genius.CurrentUser.get("id")
    });
    this.$el.html(content);
    return this;
  }


})
