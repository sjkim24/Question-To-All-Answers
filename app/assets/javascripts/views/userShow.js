Genius.Views.UserShow = Backbone.CompositeView.extend ({

  template: JST["users/show"],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.lyrics(), 'add', this.addLyricView);
    this.listenTo(this.model.annotations(), 'add', this.addAnnoView);
    this.model.lyrics().each(this.addLyricView.bind(this));
    this.model.annotations().each(this.addAnnoView.bind(this));
  },

  currentUser: function () {
    var loggedin = Genius.CurrentUser.get("loggedin")
    return loggedin;
  },

  addLyricView: function (lyric) {
    var subview = new Genius.Views.LyricShowItem({ model: lyric });
    this.addSubview('.user-lyrics', subview);
  },

  addAnnoView: function (anno) {
    var subview = new Genius.Views.AnnoShowItem({ model: anno });
    this.addSubview('.user-annos', subview);
  },

  render: function () {
    var content = this.template({
      user: this.model,
      currentUserId: Genius.CurrentUser.get("id")
    });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

})
