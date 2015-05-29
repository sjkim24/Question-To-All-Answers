Genius.Views.Search = Backbone.View.extend({

	initialize: function () {
		this.collection = new Genius.Collections.SearchResults();
		this.listenTo(this.collection, "sync", this.renderResults);
	},

	events: {
		"click button": "search",
		"click .next-page": "nextPage"
	},

	template: JST["search"],

	render: function () {
		var content = this.template();
		this.$el.html(content);

		return this;
	},

	search: function (event) {
    debugger
		event.preventDefault();
		var $input = this.$("#query");
		this.collection.searchInfo.query = $input.val();
		this.collection.searchInfo.page = 1;

		var that = this;
		this.collection.fetch({
			data: this.collection.searchInfo,
			success: function () {
				console.log(that.collection.length);
			}
		});
	},

	renderResults: function () {
		this.renderSearchInfo();
		var $container = this.$("#search-results");
		$container.empty();

		var view;
		this.collection.each(function (result) {
			if (result instanceof Genius.Models.Lyric) {
				view = new Genius.Views.LyricShowItem({ model: result });
			// } else if (result instanceof Genius.Models.Artist) {
			// 	view = new Genius.Views.A({ model: result });
			// }
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

});
