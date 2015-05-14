Genius.Collections.Annotations = Backbone.Collection.extend ({

  url: 'api/annotations',

  model: Genius.Models.Annotation,

  getOrFetch: function (id) {
    var annotation = this.get(id);
    var annotations = this
    if (annotation) {
      annotation.fetch();
    } else {
      annotation = new Genius.Models.Annotation ({ id: id });
      annotation.fetch({
        success: function () {
          annotations.add(annotation);
        }
      });
    }

    return annotation;
  }


})
