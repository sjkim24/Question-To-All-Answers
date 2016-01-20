Genius.Views.Index = Backbone.CompositeView.extend ({

  className: 'index group',

  template: JST['index/index'],

  initialize: function (options) {
    this.lyrics = options.lyrics;
    this.users = options.users
    this.listenTo(this.lyrics, 'sync', this.render);
    this.listenTo(this.lyrics, 'add', this.addLyricView);
    this.listenTo(this.users, 'sync', this.render);
    this.listenTo(this.users, 'add', this.addUserView);
    this.lyrics.each(this.addLyricView.bind(this));
    this.users.each(this.addUserView.bind(this));
  },

  addLyricView: function (lyric) {
    var subview = new Genius.Views.LyricIndexItem({ model: lyric });
    this.addSubview('.lyrics', subview);
  },

  addUserView: function (user) {
    var subview = new Genius.Views.UserIndexItem({ model: user });
    this.addSubview('.users', subview);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.attachSubviews();

    return this;
  }

});
