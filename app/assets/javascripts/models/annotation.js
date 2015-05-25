Genius.Models.Annotation = Backbone.Model.extend ({

  urlRoot: 'api/annotations',

  parse: function (response) {
    var annotation = this;
    if (response.upvotes) {
      annotation.upvotes().set(response.upvotes);
      delete response.upvotes;
    }

    return response;
  },

  upvotes: function () {
    if (!this._upvotes) {
      this._upvotes = new Genius.Collections.Upvotes( [], { annotation: this });
    }

    return this._upvotes;
  },

  toJSON: function () {
    return { annotation: _.clone(this.attributes) }
  }


})
