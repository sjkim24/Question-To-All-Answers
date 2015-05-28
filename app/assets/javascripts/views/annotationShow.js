Genius.Views.AnnotationShow = Backbone.View.extend ({

  tagName: 'section',

  className: 'anno-show',

  template: JST['annotations/show'],

  events: {
    'click .edit-anno': 'editAnno',
    'click .upvote': 'upvoteChecker'
  },

  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render);
    this.upvotes = options.upvotes
  },

  currentUserChecker: function () {
    var currentUser = Genius.CurrentUser.get("loggedin");
    if (currentUser) {
      return currentUser;
    } else {
      alert("You must login first!")
      window.location = "/session/new";
      return false;
    }
  },

  render: function () {
    var upvote = this.model.upvotes().findWhere({
      anno_id: this.model.get("id"),
      user_id: Genius.CurrentUser.get("id")
    })

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

    })

    return this;
  },

  editAnno: function (event) {
    event.preventDefault();
    var annoEdit = new Genius.Views.AnnotationEdit ({
      model: this.model
    });

    if (this.currentUserChecker()){
      this.$el.html(annoEdit.render().$el);
    }
  },

  upvoteChecker: function (event) {
    event.preventDefault();
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
          that.addGeniusIq(userId, currentUserId, upvote);
        }
      }
    })
    this.render();
  },

  addGeniusIq: function (userId, currentUserId, upvote) {
    if (userId === currentUserId) {
      alert("You can't upvote your own annotation!")
    } else {
      var user = new Genius.Models.User ({ id: userId });
      user.fetch({
        success: function () {
          var newGeniusIq  = parseInt(user.get("genius_iq")) + 5;
          upvote.set({ upvoted: "upvoted" });
          user.set({ genius_iq: newGeniusIq });
          user.save();
          upvote.save();
          alert("Upvoted!")
        }
      })
    }
    this.render();

  },

  subtractGeniusIq: function (userId, currentUserId, upvote) {
    var user = new Genius.Models.User ({ id: userId });
    user.fetch({
      success: function () {
        var newGeniusIq  = parseInt(user.get("genius_iq")) - 5;
        upvote.set({ upvoted: "downvoted" });
        user.set({ genius_iq: newGeniusIq });
        user.save();
        upvote.save();
        alert("Downvoted!")
      }
    })
    this.render();
  }

})
