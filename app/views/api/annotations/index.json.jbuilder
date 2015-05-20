json.array! @annotations do |annotation|
  json.id annotation.id
  json.lyric_id annotation.lyric_id
  json.user_id annotation.user_id
  json.start_pos annotation.start_pos
  json.end_pos annotation.end_pos
end
