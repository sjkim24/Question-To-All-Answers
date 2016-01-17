Genius.Views.LyricIndexItem = Backbone.View.extend ({

  className: "lyrics-index-lyric",

  template: JST['lyrics/indexItem'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template( {lyric: this.model });
    this.$el.html(content);

    return this;
  }

})
