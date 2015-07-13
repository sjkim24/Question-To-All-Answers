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
    this.upvotes = options.upvotes;
  },

  render: function () {
    var that = this;
    var userId = this.model.get("user_id");
    var user = new Genius.Models.User({ id: userId });
    user.fetch({
      success: function () {
        var username = user.get("username");
        var content = that.template({
          lyric: that.model,
          username: username,
          userId: userId
        });
        that.$el.html(content);
      }
    })

    return this;
  },

  clearPage: function () {
    $('.anno-form').remove();
    $('.anno-show').remove();
    $('.anno-exists').remove();
  },

  getRange: function (event) {
    event.preventDefault();
    var lyric = document.getElementById("lyric");
    var sel = rangy.getSelection();
    var annotated = sel.toString().trim()
    var selLength = sel.toString().length;
    var selRange = sel.getRangeAt(0);
    var charRange = selRange.toCharacterRange(lyric);
    var startPos = charRange.start;
    var endPos = charRange.end;
    var that = this;
    var exists = false;
    this.model.annotations().each(function(annotation) {

      var existingStart = annotation.get("start_pos")
      var existingEnd = annotation.get("end_pos")
      if ((startPos >= existingStart && startPos <= existingEnd) || (endPos >= existingStart && endPos <= existingEnd)) {
        exists = true;
        that.renderAnnoExists();
        return false;
      }
    })

    if (!exists && (annotated && charRange.start >= 0)) {
      var selString = sel.toString().trim()
      var selSpaced = this.insertSpace(selString);
      this.renderAnnoForm(startPos, endPos, selSpaced);
    }

  },

  insertSpace: function (sel) {
    var selSplit = sel.split("");
    var i = 0;
    var selLength = selSplit.length;
    while (i < selLength - 1) {
      var first = selSplit[i].charCodeAt();
      var second = selSplit[i + 1].charCodeAt();
      if ((first >= 97 && first <= 122) && (second >= 65 && second <= 90)) {
        selSplit.splice(i + 1, 0, " ");
        selLength += 1;
      }
      i += 1;
    }
    return selSplit.join("");

  },

  renderAnnoForm: function (startPos, endPos, sel) {
    this.clearPage();
    var lyricId = this.model.id;
    var anno = new Genius.Models.Annotation ();
    var annoForm = new Genius.Views.AnnotationForm ({
      model: anno,
      lyricId: lyricId,
      startPos: startPos,
      endPos: endPos,
      sel: sel
    });

    this.$rootEl.append(annoForm.render().$el)
  },

  renderAnnoExists: function () {
    this.clearPage();
    var annoExists = new Genius.Views.AnnotationExists ();

    this.$rootEl.append(annoExists.render().$el);
  },

  renderAnno: function (event) {
    this.clearPage();
    event.preventDefault();
    var id = $(event.currentTarget).attr("data-id");
    var annotation = this.annotations.getOrFetch(id);
    var annoShow = new Genius.Views.AnnotationShow ({
      model: annotation,
      upvotes: this.upvotes
    });
    this.$rootEl.append(annoShow.render().$el);
  }

});
