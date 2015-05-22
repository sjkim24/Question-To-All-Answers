Genius.Views.AnnotationShow = Backbone.View.extend ({

  tagName: 'section',

  className: 'anno-show',

  template: JST['annotations/show'],

  events: {
    'click .edit-anno': 'editAnno'
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
    var content = this.template({ annotation: this.model })
    this.$el.html(content);
    return this
  },

  editAnno: function () {
    var annoEdit = new Genius.Views.AnnotationEdit ({
      model: this.model
    });

    if (this.currentUserChecker()){
      this.$el.html(annoEdit.render().$el);
    }
  }

})
