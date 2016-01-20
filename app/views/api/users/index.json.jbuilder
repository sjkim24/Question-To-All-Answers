json.array! @users do |user|
  json.id user.id
  json.username user.username
  json.genius_iq user.genius_iq
end
