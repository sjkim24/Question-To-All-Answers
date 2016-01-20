Genius.Views.Index = Backbone.CompositeView.extend ({

  className: 'index',

  template: JST['lyrics/index'],

  initialize: function (options) {
    this.lyrics = options.lyrics;
    this.users = options.users
    this.listenTo(this.lyrics, 'sync', this.render);
    this.listenTo(this.lyrics, 'add', this.addLyricView);
    this.lyrics.each(this.addLyricView.bind(this));
  },

  addLyricView: function (lyric) {
    var subview = new Genius.Views.LyricIndexItem({ model: lyric });
    this.addSubview('.lyrics', subview);
  },

  render: function () {
    debugger
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  }

});
