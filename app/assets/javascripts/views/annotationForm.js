Genius.Views.AnnoForm = Backbone.CompositeView.extend ({

  tagName: 'form',

  className: 'annotation-form',

  template: JST['annotations/form'],

  events: {
    'click .submit-annotation': 'submitAnnotation'
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ annotation: this.model });
    this.$rootEl.append(content);
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
        // i need to remove the form after successful add
      }
    })
  }



})
