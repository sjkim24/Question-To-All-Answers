Genius.Views.LyricShow = Backbone.CompositeView.extend ({

  tagName: 'article',

  template: JST['lyrics/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    rangy.addInitListener(this.yoyo)
  },

  render: function () {
    var content = this.template({ lyric: this.model });
    this.$el.html(content);
    return this
  },

  yoyo: function () {
    console.log("hello")
  }



})
