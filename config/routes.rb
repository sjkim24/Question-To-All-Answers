Rails.application.routes.draw do
  resources :users, except: [:index, :destroy]
  resource :session, only: [:create, :new, :destroy]
  rescoures :lyrics
  resources :artists
end
