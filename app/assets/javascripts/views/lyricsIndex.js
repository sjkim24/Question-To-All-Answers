Genius.Views.LyricsIndex = Backbone.CompositeView.extend ({

  template: JST['lyrics/index'],

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render)
    this.collection.each(this.addLyricView.bind(this));
  },

  addLyricView: function (lyric) {
    var subview = new Genius.Views.LyricShow({ model: lyric });
    this.addSubview('.lyrics', subview);
  },

  render: function () {
    console.log(this.collection)
    var content = this.template({ lyrics: this.collection });
    this.$el.html(content);
    this.attachSubviews();
    return this
  }

})
