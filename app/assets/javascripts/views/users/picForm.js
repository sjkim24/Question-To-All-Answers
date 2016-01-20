Genius.Views.UserProfPicForm = Backbone.View.extend ({

  tagName: 'form',

  className: 'prof-pic-form',

  template: JST['users/profpicform'],

  events: {
    'click #pic-cancel': 'removeForm'
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);

    return this;
  },

  removeForm: function () {
    debugger
    this.$el.remove();
  }
})
