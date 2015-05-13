Rails.application.routes.draw do

  root 'lyrics#index'
  resources :users, except: [:index, :destroy]
  resource :session, only: [:create, :new, :destroy]
  resources :lyrics
  resources :artists, only: [:show]

  namespace :api do
    resources :lyrics
    resources :artist, only: [:show]
  end
end
