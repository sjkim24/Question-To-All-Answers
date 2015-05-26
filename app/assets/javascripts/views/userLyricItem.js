Genius.Views.UserLyricItem = Backbone.View.extend ({

  tagName: 'li',

  template: JST['users/lyric'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    console.log(this.model.get("artist_name"))
    var content = this.template( {lyric: this.model });
    this.$el.html(content);
    return this;
  }

})
