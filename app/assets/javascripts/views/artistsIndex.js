Genius.Views.ArtistsIndex = Backbone.CompositeView.extend ({

  template: JST['artists/index'],

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render)
  },

  render: function () {
    var content = this.template({ lyric: this.collection });
    this.$el.html(content);
    return this
  }

})
