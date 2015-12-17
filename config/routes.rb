Rails.application.routes.draw do
  devise_for :users, controllers: {sessions: "users/sessions"}

  namespace :api, defaults: {format: 'json'} do
    scope :v1 do
      post 'user/sign_in', to: "v1/users#log_in"
      post 'user/sign_up', to: "v1/users#sign_up"
      post 'user/reset_rongyun_token', to: "v1/users#reset_rongyun_token"
      get 'user/info', to: "v1/users#info"
    end

  end

end
