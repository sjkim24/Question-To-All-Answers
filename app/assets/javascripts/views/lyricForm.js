Genius.Views.LyricForm = Backbone.View.extend ({

  tagName: 'form',

  className: 'lyric-form',

  template: JST['lyrics/form'],

  events: {
    'click .submit-lyric': 'submitLyric'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  currentUserChecker: function () {
    var currentUser = Genius.CurrentUser.get("loggedin");
    if (currentUser) {
      return currentUser;
    } else {
      alert("You must login first!")
      window.location = "/session/new"
    }
  },

  render: function () {
    var content = this.template({ lyric: this.model });
    this.$el.html(content);
    return this;
  },

  submitLyric: function (event) {
    event.preventDefault();
    var attrs = this.$el.serializeJSON().lyric;
    var that = this;
    this.model.set(attrs);
    this.model.save({}, {
      success: function () {
        that.collection.add(that.model, { merge: true });
        Backbone.history.navigate('lyrics/' + that.model.id, { trigger: true });
      },

      error: function (model, response) {
        $('.errors').empty();
        response.responseJSON.forEach(function(el) {
          var li = $('<li></li>');
          li.html(el);
          $('.errors').append(li);
        }.bind(this));
      }
    })
  }

})
