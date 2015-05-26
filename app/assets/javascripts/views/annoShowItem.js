Genius.Views.AnnoShowItem = Backbone.CompositeView.extend ({

  tagName: 'li',

  template: JST['annotations/showItem'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ anno: this.model });
    this.$el.html(content);
    return this;
  }

})
