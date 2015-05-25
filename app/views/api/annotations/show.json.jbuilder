json.extract! @annotation, :id, :lyric_id, :user_id, :annotation, :start_pos, :end_pos, :lyric_text

json.upvotes @annotation.upvotes do |upvote|
  json.id upvote.id
  json.anno_id upvote.anno_id
  json.user_id upvote.user_id
  json.upvoted upvote.upvoted
end
