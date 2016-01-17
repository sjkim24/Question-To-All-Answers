Genius.Views.AnnotationEdit = Backbone.View.extend ({

  className: "anno-edit",

  tagName: "form",

  template: JST["annotations/edit"],

  events: {
    "click #edit-save": "saveEdit",
    "click #edit-cancel": "cancelEdit"
  },

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var content = this.template({ annotation: this.model });
    this.$el.html(content);

    return this;
  },

  saveEdit: function (event) {
    event.preventDefault();
    var attrs = this.$el.serializeJSON().annotation;
    var that = this;
    this.model.set(attrs);
    this.model.save( {}, {
      success: function () {
        var newView = new Genius.Views.AnnotationShow ({
          model: that.model
        })
        $(".anno-edit").remove();
        $("#main").append(newView.render().$el);
      }
    })
  },

  cancelEdit: function (event) {
    event.preventDefault();
    $(".anno-edit").remove();
  }

});
