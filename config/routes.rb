Rails.application.routes.draw do
  devise_for :users,:skip => [:sessions,:registrations,:passwords]

  namespace :api, defaults: {format: "json"} do
    scope :v1,module: "v1" do
      scope :users do
        post "sign_in", to: "users#log_in"
        post "sign_up", to: "users#sign_up"
        post "sign_out", to: "users#log_out"
        post "reset_rongyun_token", to: "users#reset_rongyun_token"
        post "update", to: "users#update"
        get "info", to: "users#info"
      end
      scope :groups do
        get "member_list", to: "groups#member_list"
        get "info", to: "groups#info"
        get "list", to: "groups#list"
        get "find_list", to: "groups#find_list"
        get "my_list", to: "groups#my_list"
        get "user/gag_list", to: "groups#user_gag_list"
        post "create", to: "groups#create"
        post "join",  to: "groups#join"
        post "sync", to: "groups#sync"
        post "quit", to: "groups#quit"
        post "dismiss", to: "groups#dismiss"
        post "user/gag_add",to: "groups#user_gag_add"
        post "user/gag_rollback",to: "groups#user_gag_rollback"
      end
    end

  end

  resources :home, only: [:index]

  #---chat
    resources :chat, only: [:index]
    get 'chat/:id', to: "chat#index"
  #chat---

  root :to => "home#index"

end
