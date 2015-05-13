Genius.Views.ArtistShow = Backbone.CompositeView.extend ({

  template: JST['artist/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    debugger
    var content = this.template({ artists: this.model });
    this.$el.html(content);
    return this
  }



})
