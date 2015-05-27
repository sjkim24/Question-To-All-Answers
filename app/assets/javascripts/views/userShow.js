Genius.Views.UserShow = Backbone.CompositeView.extend ({

  template: JST["users/show"],

  events: {
    'click .lyrics': 'renderUserLyrics',
    'click .annotations': 'renderUserAnnotations',
    'click .about-me': 'renderUserAboutMe'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  currentUser: function () {
    var loggedin = Genius.CurrentUser.get("loggedin");
    return loggedin;
  },

  addLyricView: function (lyric) {
    var subview = new Genius.Views.UserLyricItem({ model: lyric });
    this.addSubview('.user-lyrics', subview);
  },

  render: function () {
    var content = this.template({
      user: this.model,
      currentUserId: Genius.CurrentUser.get("id")
    });
    this.$el.html(content);
    return this;
  },

  renderUserLyrics: function (event) {
    event.preventDefault();
    var lyrics = new Genius.Views.UserLyrics ({ collection: this.model.lyrics() });
    this.$('.user-lyrics').html(lyrics.render().$el);
  },

  renderUserAnnotations: function (event) {
    event.preventDefault();
    var annos = new Genius.Views.UserAnnotations ({ collection: this.model.annotations() });
    this.$('.user-annos').html(annos.render().$el);
  },

  renderUserAboutMe: function (event) {
    event.preventDefault();

  }

})
