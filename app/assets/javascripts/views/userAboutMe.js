Genius.Views.UserAboutMe = Backbone.View.extend ({

  template: JST['users/aboutMe'],

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    return this;
  }


})
