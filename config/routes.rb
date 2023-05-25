Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root "index#index"
  get "/book/:id", to: "index#index"
  get "/book/new", to: "index#index"

  namespace :api do
    resources :books do
      resources :questions, except: [:show]
      get "/questions/similar", to: "questions#similar"
      get "/questions/random", to: "questions#random"
    end
  end
end
