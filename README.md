#Question To All Answers
[Live Version](http://www.questiontoallanswers.com)

## Description
This is a lyrics & annotations sharing app inspired by Genius. Question
To All Answers is built on a Ruby on Rails RESTful JSON API in the back
end with Backbone serving as the responsive front end. The key feature
of this app is the annotation; by highlighting a portion of a lyric and
annotating it, the app allows users a more social way to discuss specific
sections of an artist's lyrics.

![screenshot](assets/screenshot.png)

## Implmentation

### Gems
- [Paperclip](https://github.com/thoughtbot/paperclip), - [Figaro](https://github.com/laserlemon/figaro), [AWS](https://github.com/aws/aws-sdk-ruby) for file uploads
- [pg_search](https://github.com/Casecommons/pg_search) for search bar

### Javascript Libraries
- [SerializeJSON](https://github.com/marioizquierdo/jquery.serializeJSON)
- [jQuery](https://api.jquery.com/)
- [rangy](https://github.com/timdown/rangy)
- [jQuery-elastic](https://github.com/janjarfalk/jquery-elastic)

## Annotation
Annotation is the main feature of this app and was definitely the hardest to build. The app listens for a mouse click to be lifted; this usually happens when you are highlighting a text. If the portion of the lyric is highlighted, the app renders an annotation form. It also attains where the highlight starts and ends by storing them under "start position" and "end position". When a user submits the form, an annotation object is saved along with its starting and end position. The app adds annotations when backbone renders the lyric. I created a "lyric has many annotations" association by overriding the parse function for lyric model. Before it renders the lyric, it checks for all annotations for that lyric and adds anchor tags with a data-id of the annotation id and href pointing to a show view for that annotation.

## Future Features
- Comments
- Multi-search search bar
- Follow lyrics/users
