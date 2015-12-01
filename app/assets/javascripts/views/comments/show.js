Genius.Views.CommentShow = Backbone.View.extend ({

  className: 'comment-show',

  template: JST['comments/show'],

  initialize: function (options) {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function () {
    var content = this.template({
      comments: this.collection
    });
    this.$el.html(content);
    return this;
  }

});
