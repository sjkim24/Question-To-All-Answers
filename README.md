# SJ Genius

[Heroku link][heroku]

[heroku]:

## Minimum Viable Product
Question To All Answers is a clone of Genius built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [x] Create accounts
- [x] Create sessions (log in)
- [x] Create lyrics
- [x] Create artists
- [ ] Create lyrics annotations
- [x] View lyric
- [x] View artist
- [ ] View annotation

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

## Phase 1: User Authentication, Lyric, Artist Creation (~2 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, users will be able to
  - sign up with email address and password
  - log in with username and password
  - change their username and "About Me" informations
  - create lyrics, artists, annotations and comments
  - edit or delete their lyrics, annotations and comments
through a simple text form in a Rails view. The most important part of this phase will
be pushing the app to Heroku and ensuring that everything works. Once everything works in rails, I'll shift the lyrics and artists to Backbone (Collections, Models, Views)

## Phase 2: Annotations (~2-3 days)
In the lyrics show page, users will be able to highlight a portion of the text. Users can click "Annotate" button after highlighting a portion of the text. When the button is clicked, annotation form will render and users will be able to submit annotations. Once the annotation is submitted, the highlighted text will become a clickable link to annotation show page

## Phase 3: CSS (~1-2 days)
Style it up

## Phase 4: Search Bar (~1-2 days)
A search bar will always show under the navigation bar. When a user submits a text in the search bar, it will render a list of lyrics containing the search input Each item in the list will be a clickable link to the lyrics show page.

## Phase 5: Comments/replies (~1 day)
Users will be able to create comments/replies on lyrics and annotations (polymorphic associations)

## Phase 6: Following Users & Lyrics & CSS (~2 days)
I will add follow buttons on the users profile and lyrics page. This will add following users and lyrics under the "users following" and "lyrics following" tabs in each user's profile page. When each tab is clicked, it will list clickable links of all other users and lyrics that the current user is following. Also finish styling other views on annotations, search bar and any other elements in the clone.


### Bonus Features (TBD)
- [ ] View comments/replies on a lyric page
- [ ] Search for lyrics by title
- [ ] Up/down vote annotations or comments/replies
- [ ] Add albums
- [ ] Users profile pictures
- [ ] Notification
- [ ] Drop down for search
- [ ] Email validation
- [ ] Password validation (minimum length of 8 with at least 1 alphabet & 1 number)

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
