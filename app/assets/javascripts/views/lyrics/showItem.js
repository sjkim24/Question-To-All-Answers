Genius.Views.LyricShowItem = Backbone.CompositeView.extend({

  tagName: 'li',

  template: JST['lyrics/showItem'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template( { lyric: this.model });
    this.$el.html(content);
    return this;
  }

})
