Genius.Views.UserAnnoItem = Backbone.View.extend ({

  tagName: 'li',

  template: JST['users/anno'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ anno: this.model });
    this.$el.html(content);
    return this;
  }
})
