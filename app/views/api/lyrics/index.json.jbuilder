json.lyrics @lyrics.each do |lyric|
  json.id lyric.id
  json.track_title lyric.track_title
  json.lyric lyric.lyric
end
