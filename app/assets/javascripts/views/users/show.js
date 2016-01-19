Genius.Views.UserShow = Backbone.CompositeView.extend ({

  className: "user-show",

  template: JST["users/show"],

  events: {
    'click #lyrics': 'renderUserLyrics',
    'click #annotations': 'renderUserAnnotations',
    'click #edit-prof-pic': 'renderProfPicForm',
    'click #edit-about-me': 'renderEditAboutMe',
    'click #submit-pic': 'submitProfPic',
    'change #input-user-image': 'fileInputChange'
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
    $('.user-about-me').remove();
    $('.prof-pic-form').remove();
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

  renderEditAboutMe: function (event) {
    event.preventDefault();
    this.clearUserLinks();
    var view = new Genius.Views.UserAboutMeForm ({ model: this.model });
    $("#about-me .box").html(view.render().$el);

  },

  renderProfPicForm: function (event) {
    event.preventDefault();
    this.clearUserLinks();
    var profPicForm = new Genius.Views.UserProfPicForm ({ model: this.model });
    this.$el.append(profPicForm.render().$el);
  },

  fileInputChange: function(event){
    var that = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();
    reader.onloadend = function(){
      that._updatePreview(reader.result);
      that.model._image = reader.result;
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      that._updatePreview("");
      delete that.model._image;
    }
  },

  _updatePreview: function(src){
    this.$el.find("#preview-user-image").attr("src", src);
  },

  submitProfPic: function (event) {
    event.preventDefault();
    var that = this;
    var profPic = $(event.currentTarget).serializeJSON().user;
    var userId = this.model.get('id')
    this.model.save(profPic, {
      success: function () {
        Backbone.history.navigate('#/users/' + userId, { trigger: true });
      }
    })

  }

})
