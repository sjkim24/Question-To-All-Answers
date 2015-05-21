Genius.Views.AnnotationShow = Backbone.CompositeView.extend ({

  template: JST['annotations/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ annotation: this.model })
    this.$el.append(content);
    return this
  }

})
