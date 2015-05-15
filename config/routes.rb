Rails.application.routes.draw do

  root to: 'static_pages#root'
  resources :users, except: [:index, :destroy]
  resource :session, only: [:create, :new, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :lyrics
    resources :users, only: [:index, :show]
    resources :artists, only: [:index, :show]
    resources :annotations, except:[:index]
  end
end
