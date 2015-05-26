Genius.Views.UserLyrics = Backbone.CompositeView.extend ({

  template: JST["users/lyrics"],

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addLyricView);
    this.collection.each(this.addLyricView.bind(this));
  },

  addLyricView: function (lyric) {
    var subview = new Genius.Views.LyricIndexItem({ model: lyric });
    this.addSubview('.user-lyrics', subview)
  },

  render: function () {
    debugger
    var content = this.template({ lyrics: this.collection });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }



})
