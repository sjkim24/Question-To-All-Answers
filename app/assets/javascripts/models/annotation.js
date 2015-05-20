Genius.Models.Annotation = Backbone.Model.extend ({

  urlRoot: 'api/annotations',

  toJSON: function () {
    return { annotation: _.clone(this.attributes) }
  }


})
