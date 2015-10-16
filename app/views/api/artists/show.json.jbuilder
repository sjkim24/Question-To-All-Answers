json.extract! @artist, :id, :name

json.lyrics @artist.lyrics do |lyric|
  json.id lyric.id
  json.track_title lyric.track_title
  json.user_id lyric.user_id
end
