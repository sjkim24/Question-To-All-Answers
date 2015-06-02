json.lyric do
   json.id @lyric.id
   json.user_id @lyric.user_id
   json.artist_id @lyric.artist_id
   json.track_title @lyric.track_title
   json.lyric @lyric.lyric
 end

 json.artist do
   json.id @lyric.artist.id
   json.name @lyric.artist.name
 end
