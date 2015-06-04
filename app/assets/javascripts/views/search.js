Genius.Views.Search = Backbone.View.extend ({

  template: JST['search'],

  events: {
    'click .search': 'search',
    'click .next-page': 'nextPage'
  },

  initialize: function () {
    this.collection = new Genius.Collections.SearchResults();
    this.listenTo(this.collection, 'sync', this.renderResults);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  },

  search: function (event) {
		event.preventDefault();
		var $input = this.$("#query");
		this.collection.searchInfo.query = $input.val();
		this.collection.searchInfo.page = 1;

		var that = this;
		this.collection.fetch({
			data: this.collection.searchInfo,
			// {
	// 			query: this.collection.searchInfo.query,
	// 			page: this.collection.searchInfo.pageNum
	// 		},
			success: function () {
				console.log(that.collection.length);
			}
		});
	},

  renderResults: function () {
		this.renderSearchInfo();
		var $container = this.$("#search-results");
		$container.empty();
		this.collection.each(function (result) {
			if (result instanceof Genius.Models.Lyric) {
				var view = new Genius.Views.SearchLyricItem({ model: result });
			}

			$container.append(view.render().$el);
		});
	},

  nextPage: function () {
		this.collection.searchInfo.page++
		this.collection.fetch({
			data: this.collection.searchInfo
		});
	},

	renderSearchInfo: function () {
		this.$("#pages").html(this.collection.searchInfo.totalPages);
	}

})
