Genius.Views.SearchLyricItem = Backbone.View.extend ({

  className: 'search-item',

  template: JST['lyrics/searchItem'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template( {lyric: this.model });
    this.$el.html(content);

    return this;
  }

});
