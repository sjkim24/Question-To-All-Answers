Genius.Views.AnnotationShow = Backbone.View.extend ({

  className: 'anno-show',

  template: JST['annotations/show'],

  events: {
    'click #edit-anno': 'editAnno',
    'click #upvote': 'upvoteChecker'
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.listenTo(this.model, 'sync', this.render);
    this.upvotes = options.upvotes;
    this.topMargin = options.topMargin;
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
    var upvote = this.model.upvotes().findWhere({
      anno_id: this.model.get("id"),
      user_id: Genius.CurrentUser.get("id")
    });
    if (upvote) {
      var upvoted = upvote.get("upvoted")
      if (upvoted === "upvoted") {
        upvoted = "Downvote"
      } else {
        upvoted = "Upvote"
      }
    } else if (upvote === undefined) {
      upvoted = "Upvote"
    }

    var that = this;
    var userId = this.model.get("user_id");
    var user = new Genius.Models.User({ id: userId });
    user.fetch({
      success: function () {
        var username = user.get("username");
        var content = that.template({
          annotation: that.model,
          username: username,
          upvoted: upvoted
        });
        that.$el.html(content);
      }
    });

    return this;
  },

  editAnno: function (event) {
    event.preventDefault();
    $(".anno-show").remove();
    var annoEdit = new Genius.Views.AnnotationEdit ({
      $rootEl: this.$rootEl,
      model: this.model
    });
    if (this.currentUserChecker()){
      var view = annoEdit.render().$el;
      view.css("margin-top", this.topMargin);
      $("#main").append(view);
      // $(".anno-textarea").elastic();
    }
  },

  upvoteChecker: function (event) {
    event.preventDefault();
    this.currentUserChecker();
    var that = this;
    var userId = this.model.get("user_id");
    var currentUserId = Genius.CurrentUser.get("id");
    this.upvotes.fetch({
      success: function () {
        var upvote = that.upvotes.findWhere({
          anno_id: that.model.get("id"),
          user_id: currentUserId,
        })
        if (upvote === undefined) {
          upvote = new Genius.Models.Upvote ({
            anno_id: that.model.get("id"),
            user_id: currentUserId,
            upvoted: "neutral"
          })

        }
        var upvoted = upvote.get("upvoted");
        if (upvoted === "upvoted") {
          that.subtractGeniusIq(userId, currentUserId, upvote);
        } else {
          that.addLyricsIq(userId, currentUserId, upvote);
        }
      }
    });

    this.render();
  },

  addLyricsIq: function (userId, currentUserId, upvote) {
    var that = this;
    if (userId === currentUserId) {
      alert("You can't upvote your own annotation!");
    } else {
      var user = new Genius.Models.User ({ id: userId });
      user.fetch({
        success: function () {
          var newGeniusIq  = parseInt(user.get("genius_iq")) + 1;
          upvote.set({ upvoted: "upvoted" });
          user.set({ genius_iq: newGeniusIq });
          user.save();
          upvote.save();
          $('#upvote').html("Downvote");
        }
      });
    }
  },

  subtractGeniusIq: function (userId, currentUserId, upvote) {
    var that = this;
    var user = new Genius.Models.User ({ id: userId });
    user.fetch({
      success: function () {
        var newGeniusIq  = parseInt(user.get("genius_iq")) - 1;
        upvote.set({ upvoted: "downvoted" });
        user.set({ genius_iq: newGeniusIq });
        user.save();
        upvote.save();
        $("#upvote").html("Upvote");
      }
    });
  }

})
