json.extract! @lyric, :id, :user_id, :artist_id, :track_title, :lyric
json.artist do
  json.id @lyric.artist.id
  json.name @lyric.artist.name
end
