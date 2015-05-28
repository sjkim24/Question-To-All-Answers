Genius.Views.UserProfPicForm = Backbone.View.extend ({

  template: JST['users/profpicform'],

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    return this;
  }

})
