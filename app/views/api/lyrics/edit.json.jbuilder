json.extract! @lyric, :id, :user_id, :artist_id, :track_title
json.lyric @lyric.lyric

json.artist do
  json.name @lyric.artist.name
end
