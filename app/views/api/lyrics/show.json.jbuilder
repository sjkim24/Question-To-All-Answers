json.id @lyric.id
json.user_id @lyric.user_id
json.artist_id @lyric.artist_id
json.track_title @lyric.track_title
json.lyric @lyric.lyric


json.artist do
  json.id @lyric.artist.id
  json.name @lyric.artist.name
end

json.annotations @lyric.annotations do |annotation|
  json.id annotation.id
  json.lyric_id annotation.lyric_id
  json.user_id annotation.user_id
  json.start_pos annotation.start_pos
  json.end_pos annotation.end_pos
end
