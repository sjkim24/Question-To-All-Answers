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

  getRange: function (event) {
    // alert user if selection already has annotation
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
    var selString = sel.toString();
    if (sel.toString() && charRange.start >= 0) {
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
    });

    this.$rootEl.append(annoForm.render().$el)
  },

  renderAnno: function (event) {
    $('.anno-show').remove();
    $('.anno-form').remove();
    event.preventDefault();
    var id = $(event.currentTarget).attr("data-id");
    var annotation = this.annotations.getOrFetch(id);
    var annoShow = new Genius.Views.AnnotationShow ({
      model: annotation,
      upvotes: this.upvotes
    });
    this.$rootEl.append(annoShow.render().$el);
  }

})
