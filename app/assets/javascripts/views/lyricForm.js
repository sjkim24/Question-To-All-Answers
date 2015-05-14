Genius.Views.LyricForm = Backbone.CompositeView.extend ({

  tagName: 'form',

  className: 'lyric-form',

  template: JST['lyrics/form'],

  events: {
    'click .create-lyric': 'createLyric'
  },

  render: function () {
    var content = this.template({ lyric: this.model });
    this.$el.html(content);
    return this;
  },

  createLyric: function (event) {
    event.preventDefault();
    var attrs = this.$el.serializeJSON().lyric;
    var that = this;
    this.model.set(attrs);
    this.model.save({}, {
      success: function () {
        that.collection.add(that.model, { merge: true });
        Backbone.history.navigate('lyrics/' + that.model.id, { trigger: true });
      }
    })
  }

})
