json.extract! @lyric, :id, :user_id, :artist_id, :track_title, :lyric
json.artist @lyric.artist.name
