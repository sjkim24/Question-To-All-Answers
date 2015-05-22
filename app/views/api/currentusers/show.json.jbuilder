if logged_in?
  json.loggedin logged_in?
  json.extract! current_user, :id
else
  json.loggedin logged_in?
end
