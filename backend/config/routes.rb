Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    resources :posts, only: [ :index, :show, :create, :update, :destroy ]
    resources :categories, only: [ :index, :show, :create, :update, :destroy ]
    resources :users, only: [ :index, :show, :create ]

    post "login", to: "auth#login"
    delete "logout", to: "auth#logout"
  end
end
