Rails.application.routes.draw do
  devise_for :users, controllers: {sessions: "users/sessions"}

  namespace :api, defaults: {format: 'json'} do
    scope :v1,module: 'v1' do
      scope :users do
        post 'sign_in', to: "users#log_in"
        post 'sign_up', to: "users#sign_up"
        post 'reset_rongyun_token', to: "users#reset_rongyun_token"
        get 'info', to: "users#info"
      end
    end

  end

end
