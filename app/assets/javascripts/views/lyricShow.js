Genius.Views.LyricShow = Backbone.CompositeView.extend ({

  tagName: 'article',

  template: JST['lyrics/show'],

  events: {
    'mouseup #lyric': 'renderAnnoForm'
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ lyric: this.model });
    this.$el.html(content);
    return this
  },

  renderAnnoForm: function (event) {
    $('.anno-form').remove();
    event.preventDefault();
    // this.getMyRange("lyric")

    var sel = rangy.getSelection().toString()

    var selLength = sel.length
    console.log(selLength)
    if (sel) {
      var anno = new Genius.Models.Annotation ()
      var annoForm = new Genius.Views.AnnoForm ({
        model: anno,
        $rootEl: this.$rootEl
      })
      annoForm.render()
    }

  }

})
