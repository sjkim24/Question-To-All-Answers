Genius.Views.LyricShow = Backbone.View.extend ({

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
    var lyric = document.getElementById("lyric");
    var sel = rangy.getSelection();
    var selLength = sel.toString().length;
    if (sel.toString()[0] === " " || sel.toString()[selLength - 1] === " ") {
      sel.trim();
    }
    var selRange = sel.getRangeAt(0);
    var charRange = selRange.toCharacterRange(lyric);
    var startPos = charRange.start;
    var endPos = charRange.end;
    if (sel.toString() && charRange.start >= 0) {
      // var selSplit = sel.toString().split("")
      // var selSpaced = selSplit.each(function(char) {
      //
      // })
      this.renderAnnoForm(startPos, endPos, sel.toString());
    }
  },

  renderAnnoForm: function (startPos, endPos, sel) {
    $('.anno-form').remove();
    $('.anno-show').remove();
    var lyricId = this.model.id;
    var anno = new Genius.Models.Annotation ();
    var annoForm = new Genius.Views.AnnotationForm ({
      model: anno,
      lyricId: lyricId,
      startPos: startPos,
      endPos: endPos,
      sel: sel
    })

    if (annoForm.currentUserChecker()){
      this.$rootEl.append(annoForm.render().$el);
    }
  },

  renderAnno: function (event) {
    $('.anno-show').remove();
    $('.anno-form').remove();
    event.preventDefault();
    var id = $(event.currentTarget).attr("data-id");
    var annotation = this.annotations.getOrFetch(id);
    var annoShow = new Genius.Views.AnnotationShow ({
      model: annotation
    });
    this.$rootEl.append(annoShow.render().$el);
  }

})
