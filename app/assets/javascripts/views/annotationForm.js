Genius.Views.AnnoForm = Backbone.CompositeView.extend ({

  tagName: 'form',

  className: 'annotation-form',

  template: JST['annotations/new'],

  events: {
    'click .submit-annotation': 'submitAnnotation'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ annotation: this.model });
    this.$el.html(content);
    return this;
  },

  submitAnnotation: function (event) {
    event.preventDefault();
    var attrs = this.$el.serializeJSON();
    var that = this;
    this.model.set(attrs);
    this.model.save({}, {
      success: function () {
        that.collection.add(that.model, { merge: true });
        // i need to set data-if of the lyric id in the lyric show view
        Backbone.history.navigate('lyrics/' +  $('select').data('id'), { trigger: true });
      }
    })
  }



})
