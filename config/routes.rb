Rails.application.routes.draw do

  root to: 'static_pages#root'
  resources :users, except: [:index, :show, :destroy]
  resource :session, only: [:create, :new, :destroy]
  get "session/redirect", to: "sessions#redirect"

  namespace :api, defaults: { format: :json } do
    resources :lyrics
    resources :users, only: [:index, :show, :update]
    resources :artists, only: [:index, :show]
    resources :annotations, except:[:new]
    resource :currentuser, only: [:show]
    resources :upvotes, only: [:index, :create, :show, :update]
  end
end
