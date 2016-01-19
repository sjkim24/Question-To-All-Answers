Genius.Views.LyricShow = Backbone.View.extend ({

  className: "lyric-show",

  template: JST["lyrics/show"],

  events: {
    "mouseup #lyric": "getRange",
    "click .annotation": "renderAnno"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.annotations = options.annotations;
    this.listenTo(this.model, "sync", this.render);
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
    // this.renderCommentForm();
    // this.renderComments();
    return this;
  },

  clearPage: function () {
    $(".anno-form").remove();
    $(".anno-show").remove();
    $(".anno-exists").remove();
    $(".anno-edit").remove();
  },

  getSelectedText: function () {
    t = (document.all) ? document.selection.createRange().text : document.getSelection();

    return t;
  },

  getSelectionHtml: function () {
    var html = "";
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.innerHTML;
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
            html = document.selection.createRange().htmlText;
        }
    }
    return html;
  },

  addSpanTag: function () {
    var selection = this.getSelectedText();
    var selection_text = this.getSelectionHtml();
    var span = $("<span></span>")[0]
    span.textContent = selection_text
    var range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(span);
    debugger
  },

  removeSpanTag: function () {
    var element = $("#lyric");
    element.find("span").each(function(index) {
      var text = $(this).text();
      $(this).replaceWith(text);
    });
    var newString = element.html();
  },

  getRange: function (event) {
    event.preventDefault();
    var lyric = $("#lyric")[0];
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
    });

    if (!exists && (annotated && charRange.start >= 0)) {
      var selString = sel.toString().trim()
      var selSpaced = this.insertSpace(selString);
      this.addSpanTag();
      var coords = this.getOffsetRect($("span")[0]);
      this.removeSpanTag();
      this.renderAnnoForm(startPos, endPos, selSpaced, coords);
      $(".anno-textarea").elastic();
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

  getOffsetRect: function (el) {
    var box = el.getBoundingClientRect();
    var body = document.body;
    var docElem = document.documentElement;

    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

    var clientTop = docElem.clientTop || body.clientTop || 0;
    var clientLeft = docElem.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
  },

  renderAnnoForm: function (startPos, endPos, sel, coords) {
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
    var view = annoForm.render().$el
    view.css("margin-top", coords.top - 338);
    $("#main").append(view);
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
    var top = $('[data-id=' + id + ']').offset().top - 338;
    var annotation = this.annotations.getOrFetch(id);
    var annoShow = new Genius.Views.AnnotationShow ({
      $rootEl: this.$rootEl,
      model: annotation,
      upvotes: this.upvotes,
      topMargin: top
    });
    var view = annoShow.render().$el;
    view.css("margin-top", top);

    this.$rootEl.append(view);
  },

  checkForAnno: function () {

  }

  // renderCommentForm: function () {
  //   var commentForm = new Genius.Views.CommentForm ({
  //
  //   });
  //
  //   this.$rootEl.append(commentForm.render().$el);
  // },
  //
  // renderComments: function () {
  //   var comments = this.model.comments();
  //   var commentShow = new Genius.Views.CommentShow ({
  //     collection: comments
  //   });
  //
  //   this.$rootEl.append(commentShow.render().$el);
  // }

});
