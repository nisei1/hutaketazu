Rails.application.routes.draw do
  devise_for :users
  root to: "home#index"
  post 'like', to: 'home#like'
  resources :users
  resources :posts do
    resource :likes, only: [:create, :destroy]
  end
  resources :youtube
  get 'youtube/search' => 'youtube#search'
end
