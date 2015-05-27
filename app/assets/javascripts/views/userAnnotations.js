Genius.Views.UserAnnotations = Backbone.CompositeView.extend ({

  template: JST['users/links'],

  initialize: function () {
    this.listenTo(this.collection, 'add', this.addAnnoView);
    this.collection.each(this.addAnnoView.bind(this));
  },

  addAnnoView: function (anno) {
    var subview = new Genius.Views.UserAnnoItem({ model: anno });
    this.addSubview('.user-links', subview);
  },

  render: function () {
    var content = this.template({ annos: this.collection });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }

})
