Genius.Views.LyricsIndex = Backbone.CompositeView.extend ({

  template: JST['lyrics/index'],

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render)
    this.listenTo(this.collection, 'add', this.addLyricView)
    this.collection.each(this.addLyricView.bind(this));
  },

  addLyricView: function (lyric) {
    var subview = new Genius.Views.LyricShow({ model: lyric });
    this.addSubview('.lyrics', subview);
  },

  render: function () {
    var content = this.template({ lyrics: this.collection });
    this.$el.html(content);
    this.attachSubviews();
    return this
  }

})
