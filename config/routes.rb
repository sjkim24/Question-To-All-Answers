Rails.application.routes.draw do

  root to: 'static_pages#root'
  resources :users, except: [:index, :show, :destroy]
  resource :session, only: [:create, :new, :destroy]
  get "session/redirect", to: "sessions#redirect"

  namespace :api, defaults: { format: :json } do
    resources :lyrics, except:[:destroy]
    resources :users, only: [:index, :show, :update]
    resources :artists, only: [:index, :show]
    resources :annotations, except: [:new]
    resource :currentuser, only: [:create, :new, :show, :update]
    resources :upvotes, only: [:index, :create, :show, :update]
    resources :comments, only: [:create,]
    get "search", to: "static_pages#search"
  end
end
