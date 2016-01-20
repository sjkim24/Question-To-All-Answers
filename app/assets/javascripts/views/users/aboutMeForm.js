Genius.Views.UserAboutMeForm = Backbone.View.extend ({

  tagName: 'form',

  className: 'user-about-me group',

  template: JST['users/aboutMeForm'],

  events: {
    'click #save-about-me': 'saveAboutMe'
  },

  render: function () {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    return this;
  },

  saveAboutMe: function (event) {
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

});
