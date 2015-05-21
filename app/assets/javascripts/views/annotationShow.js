Genius.Views.AnnotationShow = Backbone.CompositeView.extend ({

  tagName: 'section',

  className: 'anno-show',

  template: JST['annotations/show'],

  events: {
    'click .edit-anno': 'editAnno'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ annotation: this.model })
    this.$el.html(content);
    return this
  },

  editAnno: function () {

  }

})
