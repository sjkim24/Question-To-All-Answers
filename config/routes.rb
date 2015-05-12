Rails.application.routes.draw do
  resources :users, except: [:index, :destroy]
  resource :session, only: [:create, :destroy]
end
