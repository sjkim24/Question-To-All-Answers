Genius.Collections.SearchResults = Backbone.Collection.extend ({

  url: '/api/search',

  initialize: function () {
    this.searchInfo = {};
  },

  parse: function (response) {
    this.searchInfo.totalPages = response.total_pages;

    return response.search_results;
  },

  model: function (attrs) {
    var type = attrs._type;
    delete attrs._type;
    var newModel = new Genius.Models[type](attrs);

    return newModel;
  }



})
