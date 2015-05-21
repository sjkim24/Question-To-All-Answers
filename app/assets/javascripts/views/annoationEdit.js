Genius.Views.AnnotationEdit = Backbone.View.extend ({

  tagName: 'form',

  className: 'anno-edit',

  template: JST['annotations/edit'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ annotation: this.model })
  }

})
