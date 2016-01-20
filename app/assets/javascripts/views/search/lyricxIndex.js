Genius.Views.SearchLyricsIndex = Backbone.CompositeView.extend ({

  className: "search-results",

  template: JST['lyrics/searchIndex'],

  initialize: function (options) {
    this.searchInput = options.searchInput;
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addLyricView);
    this.collection.each(this.addLyricView.bind(this));
  },

  addLyricView: function (lyric) {
    if (lyric instanceof Genius.Models.Lyric) {
      var subview = new Genius.Views.SearchLyricItem({ model: lyric });
      this.addSubview('.searched-lyrics', subview);
    }
  },

  render: function () {
    var content = this.template({ searchInput: this.searchInput });
    this.$el.html(content);
    this.attachSubviews();

    return this;
  }

});
