json.signedin logged_in?
json.id do
  if logged_in?
    json.id current_user.id
  end
end
