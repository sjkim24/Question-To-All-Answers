Genius.Views.UserIndexItem = Backbone.View.extend ({

  className: "user-index-item",

  template: JST['users/indexItem'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);

    return this;
  }
});
