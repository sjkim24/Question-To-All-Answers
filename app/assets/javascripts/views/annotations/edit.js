Genius.Views.AnnotationEdit = Backbone.View.extend ({

  tagName: 'form',

  template: JST['annotations/edit'],

  events: {
    'click .submit-edit-anno': 'updateAnno'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ annotation: this.model });
    this.$el.html(content);

    return this;
  },

  updateAnno: function (event) {
    event.preventDefault();
    var attrs = this.$el.serializeJSON().annotation;
    var that = this;
    this.model.set(attrs);
    this.model.save({}, {
      success: function () {
        var newView = new Genius.Views.AnnotationShow ({
          model: that.model
        })
        newView.render();
      }
    })
  }

});
