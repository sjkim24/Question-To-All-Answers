Genius.Views.Search = Backbone.View.extend ({

  template: JST['search'],

  events: {
    'keyup .search-bar': 'processKey'
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.collection = new Genius.Collections.SearchResults();
    this.listenTo(this.collection, 'sync', this.renderResults);
  },

  processKey: function (event) {
    event.preventDefault();
    if (event.which === 13) {
      this.search();
    }
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  },

  search: function () {
		var $input = this.$("#query");
    var inputVal = $input.val();
		this.collection.searchInfo.query = inputVal;
		this.collection.searchInfo.page = 1;

		var that = this;
		this.collection.fetch({
			data: this.collection.searchInfo,
			success: function () {
			}
		});
	},

  renderResults: function () {
    var searchInput = $("#query").val();
		this.renderSearchInfo();
    var view = new Genius.Views.SearchLyricsIndex ({
      collection: this.collection,
      searchInput: searchInput
    })

    this.$rootEl.html(view.render().$el);

    if (this.collection.length === 0) {
      $('.searched-lyrics').html("No Lyrics Were Found")
    }
	},

	renderSearchInfo: function () {
		this.$("#pages").html(this.collection.searchInfo.totalPages);
	}

});
