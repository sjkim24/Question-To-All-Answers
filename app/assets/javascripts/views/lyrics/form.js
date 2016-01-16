Genius.Views.LyricForm = Backbone.View.extend ({

  tagName: "form",

  className: "lyric-form group",

  template: JST["lyrics/form"],

  events: {
    "click #lyric-submit": "submitLyric"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  currentUserChecker: function () {
    var currentUser = Genius.CurrentUser.get("loggedin");
    if (currentUser) {
      return currentUser;
    } else {
      window.location = "/session/redirect";
    }
  },

  render: function () {
    var content = this.template({ lyric: this.model });
    this.$el.html(content);

    return this;
  },

  clearFormErrors: function () {
    $(".lyric-error").empty();
    $(".artist-error").empty();
    $(".title-error").empty();
  },

  submitLyric: function (event) {
    event.preventDefault();
    var attrs = this.$el.serializeJSON().lyric;
    var that = this;
    this.model.set(attrs);
    var lyric = this.model.get("lyric").replace(/\n\s*\n/g, '\n\n');
    this.model.set({ lyric: lyric })
    this.model.save({}, {
      success: function () {
        that.collection.add(that.model, { merge: true });
        Backbone.history.navigate('lyrics/' + that.model.id, { trigger: true });
      },
      error: function (model, response) {
        that.clearFormErrors();
        response.responseJSON.forEach(function (el) {
          if (el === "Lyric can't be blank") {
            $(".lyric-error").html("*" + el);
          } else if (el === "Artist can't be blank") {
            $(".artist-error").html("*" + el);
          } else if (el === "Track title can't be blank") {
            $(".title-error").html("*" + el);
          }
        });
      }
    })
  }

});
