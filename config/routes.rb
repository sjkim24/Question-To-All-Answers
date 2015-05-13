Rails.application.routes.draw do

  root to: 'static_pages#root'
  resources :users, except: [:index, :destroy]
  resource :session, only: [:create, :new, :destroy]
  # resources :lyrics
  # resources :artists, only: [:show]

  namespace :api, defaults: { format: :json } do
    resources :lyrics
    resources :artists, only: [:index, :show]
  end
end
