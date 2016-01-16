Genius.Views.Search = Backbone.View.extend ({

  template: JST['search'],

  events: {
    'keyup .search-bar': 'processKey'
    // 'click .next-page': 'nextPage'
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
		this.collection.searchInfo.query = $input.val();
		this.collection.searchInfo.page = 1;

		var that = this;
		this.collection.fetch({
			data: this.collection.searchInfo,
			success: function () {
			}
		});
	},

  renderResults: function () {
		this.renderSearchInfo();
    var view = new Genius.Views.SearchLyricsIndex ({
      collection: this.collection
    })

    this.$rootEl.html(view.render().$el);

    if (this.collection.length === 0) {
      $('.searched-lyrics').html("No Lyrics Were Found")
    }
	},

  // nextPage: function () {
	// 	this.collection.searchInfo.page++;
	// 	this.collection.fetch({
	// 		data: this.collection.searchInfo
	// 	});
	// },

	renderSearchInfo: function () {
		this.$("#pages").html(this.collection.searchInfo.totalPages);
	}

});
