Genius.Views.LyricShow = Backbone.CompositeView.extend ({

  tagName: 'article',

  template: JST['lyrics/show'],

  events: {
    'mouseup #lyric': 'getRange',
    'click .annotation': 'renderAnno'
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.annotations = options.annotations;
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {

    var content = this.template({ lyric: this.model });
    this.$el.html(content);
    return this
  },

  getRange: function (event) {
    event.preventDefault();
    var lyric = document.getElementById("lyric")
    var sel = rangy.getSelection();
    var selLength = sel.toString().length
    if (sel.toString()[0] === " " || sel.toString()[selLength - 1] === " ") {
      sel = sel.trim();
    }
    var selRange = sel.getRangeAt(0);
    var charRange = selRange.toCharacterRange(lyric);
    // string indices to add my anchor tags
    var startPos = charRange.start
    var endPos = charRange.end
    if (sel.toString() && charRange.start >= 0) {
      this.renderAnnoForm(startPos, endPos);
    }
  },

  renderAnnoForm: function (startPos, endPos) {
    $('.anno-form').remove();
    var lyricId = this.model.id;
    var anno = new Genius.Models.Annotation ();
    var annoForm = new Genius.Views.AnnoForm ({
      model: anno,
      lyricId: lyricId,
      startPos: startPos,
      endPos: endPos
    })
    this.$rootEl.append(annoForm.render().$el);
  },

  renderAnno: function (event) {
    $('.anno-show').remove();
    event.preventDefault();
    var id = $(event.currentTarget).attr("data-id");
    var annotation = this.annotations.getOrFetch(id);
    var annoShow = new Genius.Views.AnnotationShow ({
      model: annotation
    });
    this.$rootEl.append(annoShow.render().$el);
  }

})
