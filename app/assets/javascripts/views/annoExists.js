Genius.Views.AnnotationExists = Backbone.View.extend ({

  className: 'anno-exists',

  template: JST['annotations/exists'],

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  }

});
