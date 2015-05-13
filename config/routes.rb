Rails.application.routes.draw do

  root 'lyrics#index'
  resources :users, except: [:index, :destroy]
  resource :session, only: [:create, :new, :destroy]
  resources :lyrics
  resources :artists, only: [:show]
end
