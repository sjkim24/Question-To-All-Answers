Genius.Views.UserAboutMeForm = Backbone.View.extend ({

  tagName: 'form',

  className: 'user-about-me',

  template: JST['users/aboutMeForm'],

  events: {
    'click .submit-about-me': 'submitAboutMe'
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    return this;
  },

  submitAboutMe: function (event) {
    event.preventDefault();
    var attrs = this.$el.serializeJSON().user;
    var that = this;
    this.model.set(attrs);
    this.model.save({}, {
      success: function () {
        that.render();
      }
    })
  }

})
