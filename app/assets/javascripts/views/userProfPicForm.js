Genius.Views.UserProfPicForm = Backbone.View.extend ({

  tagName: 'form',

  className: 'prof-pic-form',

  template: JST['users/profpicform'],

  events: {
    'click .cancel': 'removeForm'
  },

  render: function () {
    debugger
    var content = this.template({ user: this.model });
    this.$el.html(content);
    return this;
  },

  removeForm: function () {
    this.$el.remove();
  }
})
