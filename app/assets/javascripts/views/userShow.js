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

  render: function () {
    var content = this.template({
      user: this.model,
      currentUserId: Genius.CurrentUser.get("id")
    });
    this.$el.html(content);
    return this;
  },

  clearUserLinks: function (){
    $('.user-lyrics').remove();
    $('.user-annos').remove();
    $('.user-about-me').remove();
    $('.user-link-header').remove();
  },

  renderUserLyrics: function (event) {
    event.preventDefault();
    this.clearUserLinks();
    var lyrics = new Genius.Views.UserLyrics ({ collection: this.model.lyrics() });
    this.$el.append(lyrics.render().$el);
  },

  renderUserAnnotations: function (event) {
    event.preventDefault();
    this.clearUserLinks();
    var annos = new Genius.Views.UserAnnotations ({ collection: this.model.annotations() });
    this.$el.append(annos.render().$el);
  },

  renderUserAboutMe: function (event) {
    event.preventDefault();
    this.clearUserLinks();

  }

})
