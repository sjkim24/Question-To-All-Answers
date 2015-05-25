json.array! @upvotes do |upvote|
  json.id upvote.id
  json.anno_id upvote.anno_id
  json.user_id upvote.user_id
  json.upvoted upvote.upvoted
end
