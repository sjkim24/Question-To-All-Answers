json.extract! @user, :id, :email, :username, :genius_iq, :about_me
json.image_url asset_path(@user.image.url(:original))

json.lyrics @user.lyrics do |lyric|
  json.id lyric.id
  json.artist_id lyric.artist_id
  json.track_title lyric.track_title
  json.user_id lyric.user_id
end

json.annotations @user.annotations do |annotation|
  json.id annotation.id
  json.lyric_id annotation.lyric_id
  json.user_id annotation.user_id
  json.start_pos annotation.start_pos
  json.end_pos annotation.end_pos
end
