json.array! @lyrics do |lyric|
  json.id lyric.id
  json.track_title lyric.track_title
  json.lyric lyric.lyric
  json.artist lyric.artist
end
