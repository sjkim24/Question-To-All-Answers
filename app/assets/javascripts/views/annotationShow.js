Genius.Views.AnnotationShow = Backbone.View.extend ({

  tagName: 'section',

  className: 'anno-show',

  template: JST['annotations/show'],

  events: {
    'click .edit-anno': 'editAnno',
    'click .upvote': 'addGeniusIq'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  currentUserChecker: function () {
    var currentUser = Genius.CurrentUser.get("loggedin");
    if (currentUser) {
      return currentUser;
    } else {
      window.location = "/session/new";
    }
  },

  render: function () {
    var that = this;
    var userId = this.model.get("user_id");
    var user = new Genius.Models.User({ id: userId });
    user.fetch({
      success: function () {
        var username = user.get("username");
        var content = that.template({
          annotation: that.model,
          username: username
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

  addGeniusIq: function (event) {
    event.preventDefault();
    var userId = this.model.get("user_id");
    var currentUserId = Genius.CurrentUser.get("id");
    if (userId === currentUserId) {
      alert("You can't upvote your own annotation!")
    } else {
      var user = new Genius.Models.User ({ id: userId });
      user.fetch({
        success: function () {
          var newGeniusIq  = parseInt(user.get("genius_iq")) + 5;
          user.set({ genius_iq: newGeniusIq });
          user.save();
          alert("Upvoted!")
        }
      })
    }

  }

})
