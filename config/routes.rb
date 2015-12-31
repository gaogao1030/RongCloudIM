Rails.application.routes.draw do
  devise_for :users,:skip => [:sessions,:registrations,:passwords]

  namespace :api, defaults: {format: 'json'} do
    scope :v1,module: 'v1' do
      scope :users do
        post 'sign_in', to: "users#log_in"
        post 'sign_up', to: "users#sign_up"
        post 'sign_out', to: "users#log_out"
        post 'reset_rongyun_token', to: "users#reset_rongyun_token"
        get 'info', to: "users#info"
      end
      scope :groups do
        post 'create', to: 'groups#create'
      end
    end

  end

  resources :home, only: [:index]
  resources :chat, only: [:index]

  root :to => "home#index"

end
