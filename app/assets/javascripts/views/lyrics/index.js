Genius.Views.LyricsIndex = Backbone.CompositeView.extend ({

  tagName: 'div',

  className: 'index',

  template: JST['lyrics/index'],

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addLyricView);
    this.collection.each(this.addLyricView.bind(this));
  },

  addLyricView: function (lyric) {
    var subview = new Genius.Views.LyricIndexItem({ model: lyric });
    this.addSubview('.lyrics', subview);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  }

});
