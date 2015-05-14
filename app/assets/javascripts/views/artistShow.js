Genius.Views.ArtistShow = Backbone.CompositeView.extend ({

  template: JST['artists/show'],

  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.lyrics(), 'add', this.addLyricView)
    this.model.lyrics().each(this.addLyricView.bind(this));
  },

  addLyricView: function (lyric) {
    var subview = new Genius.Views.LyricShow({ model: lyric });
    this.addSubview('.artist-lyrics', subview)
  },

  render: function () {
    var content = this.template({ artist: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this
  }

})
