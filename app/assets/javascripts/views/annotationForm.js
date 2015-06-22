Genius.Views.AnnotationForm = Backbone.View.extend ({

  tagName: 'form',

  className: 'anno-form',

  template: JST['annotations/form'],

  events: {
    'click .submit-anno': 'submitAnnotation'
  },

  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render);
    this.lyricId = options.lyricId;
    this.startPos = options.startPos;
    this.endPos = options.endPos;
    this.sel = options.sel;
  },

  currentUserChecker: function () {
    var currentUser = Genius.CurrentUser.get("loggedin");
    if (currentUser) {
      return currentUser;
    } else {
      window.location = "/session/redirect"
    }
  },

  render: function () {this
    var content = this.template({
      annotation: this.model,
      sel: this.sel
    });
    this.$el.html(content);
    return this;
  },

  submitAnnotation: function (event) {
    event.preventDefault();
    if (this.currentUserChecker()){
      var attrs = this.$el.serializeJSON().annotation;
      var that = this;
      this.model.set(attrs);
      debugger
      this.model.set({
        lyric_id: this.lyricId,
        start_pos: this.startPos,
        end_pos: this.endPos,
        lyric_text: this.sel
      })
      this.model.save({}, {
        success: function () {
          $('.anno-form').remove();
          Backbone.history.navigate("#/lyrics/" + that.lyricId, { trigger: true });
        }
      })
    }
  }

});
