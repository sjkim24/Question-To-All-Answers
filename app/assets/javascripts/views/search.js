Genius.Views.Search = Backbone.View.extend ({

  template: JST['search'],

  events: {
    'click .search': 'search',
    'click .next-page': 'nextPage'
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl
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
			success: function () {
				// console.log(that.collection.length);
			}
		});
	},

  renderResults: function () {
		this.renderSearchInfo();
		var $container = this.$("#search-results");
		$container.empty();
    var that = this;
    var $rootEl = this.$rootEl
    if (this.collection.length === 0) {
      $rootEl.html("No Lyrics Were Found")
    }
		this.collection.each(function (result) {
			if (result instanceof Genius.Models.Lyric) {
				var view = new Genius.Views.SearchLyricItem({
          model: result,
          $rootEl: this.$rootEl,
          searchView: this
        });
			}
			$rootEl.html(view.render().$el);
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
