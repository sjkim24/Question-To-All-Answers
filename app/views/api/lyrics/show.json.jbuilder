json.extract! @lyric, :id, :user_id, :artist_id, :track_title
json.lyric simple_format(h(@lyric.lyric))

json.artist do
  json.id @lyric.artist.id
  json.name @lyric.artist.name
end
