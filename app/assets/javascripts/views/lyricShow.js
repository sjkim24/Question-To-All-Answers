Genius.Views.LyricShow = Backbone.CompositeView.extend ({

  tagName: 'article',

  template: JST['lyrics/show'],

  events: {
    'mouseup #lyric': 'getRange'
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

  getRange: function (event) {
    var lyric = document.getElementById("lyric")
    event.preventDefault();
    var sel = rangy.getSelection();
    var selRange = sel.getRangeAt(0);
    var charRange = selRange.toCharacterRange(lyric);
    // string indices to add my anchor tags
    var startPos = charRange.start
    var endPos = charRange.end
    console.log(charRange)
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
    this.$rootEl.append(annoForm.render().$el)
  }

})
