Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # would like to do custom routes, would need more work on the frontend with react-router-dom

  # get '/:username', to 'users#show'

  resources :users, only: [:create], param: :username

  resources :recipes, only: [:index, :create, :delete, :update ]
  resources :ingredients, only: [ :create, :delete, :update ]
  
  post '/login', to: ("sessions#login")
  delete '/logout', to: ("sessions#logout")
  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

end
