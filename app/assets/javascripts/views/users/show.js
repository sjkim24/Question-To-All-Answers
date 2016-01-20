Genius.Views.UserShow = Backbone.CompositeView.extend ({

  className: "user-show",

  template: JST["users/show"],

  events: {
    'click #tab-lyrics': 'renderUserLyrics',
    'click #tab-annotations': 'renderUserAnnotations',
    'click #edit-prof-pic': 'renderProfPicForm',
    'click #edit-about-me': 'renderEditAboutMe',
    'click #cancel-about-me': 'cancelEditAboutMe',
    'click #pic-save': 'submitProfPic',
    'change #input-user-image': 'fileInputChange'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.visited = false;
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
    this.renderUserLyrics(event);
    this.visited = true;

    return this;
  },

  toggleTabs: function (tab) {
    if (this.visited && tab === "annos") {
      $("#annos-border").addClass("clicked");
      $("#lyrics-border").removeClass("clicked");
    } else if (this.visited && tab === "lyrics") {
      $("#lyrics-border").addClass("clicked");
      $("#annos-border").removeClass("clicked");
    } else if (this.visited && tab === "other") {
      $("#lyrics-border").removeClass("clicked");
      $("#annos-border").removeClass("clicked");
    }
  },

  renderUserLyrics: function (event) {
    event.preventDefault();
    var view = new Genius.Views.UserLyrics ({ collection: this.model.lyrics() });
    this.toggleTabs("lyrics");
    $("#under-tabs").html(view.render().$el);
  },

  renderUserAnnotations: function (event) {
    event.preventDefault();
    var view = new Genius.Views.UserAnnotations ({ collection: this.model.annotations() });
    this.toggleTabs("annos");
    $("#under-tabs").html(view.render().$el);
  },

  renderEditAboutMe: function (event) {
    event.preventDefault();
    var view = new Genius.Views.UserAboutMeForm ({ model: this.model });
    $("#about-me .box").html(view.render().$el);
  },

  cancelEditAboutMe: function (event) {
    event.preventDefault();
    $(".user-about-me").remove();
    var aboutMe = $('<div id="desc">' + this.model.escape("about_me") + '</div>');
    var button = $('<button class="buttons" id="edit-about-me">Edit About Me</button>');
    $(".box").empty();
    $(".box").append(aboutMe, button);
  },

  renderProfPicForm: function (event) {
    event.preventDefault();
    var profPicForm = new Genius.Views.UserProfPicForm ({ model: this.model });
    this.toggleTabs("other");
    $("#under-tabs").html(profPicForm.render().$el);
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
