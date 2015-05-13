Genius.Views.ArtistShow = Backbone.CompositeView.extend ({

  template: JST['artists/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {

    var content = this.template({ artist: this.model });
    this.$el.html(content);
    return this
  }



})
