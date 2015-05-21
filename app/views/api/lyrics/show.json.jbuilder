json.extract! @lyric, :id, :user_id, :artist_id, :track_title
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

json.current_user do
  if current_user.nil?
    json.null!
  else
    json.id
  end
end
