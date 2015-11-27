Genius.Views.CommentForm = Backbone.View.extend ({

  tagName: 'form',

  className: 'comment-form',

  template: JST['comments/form'],

  events: {
    'click .submit-comment': 'submitComment'
  },

  

})
