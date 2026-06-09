Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  # Legacy health check
  namespace :api do
    namespace :v1 do
      get "health", to: "health#show"
    end
  end

  devise_for :users,
             path: "api/v",
             path_names: {
               sign_in: "users/sign_in",
               sign_out: "users/sign_out",
               registration: "users/sign_up"
             },
             controllers: {
               sessions: "api/users/sessions",
               registrations: "api/users/registrations"
             }

  namespace :api do
    namespace :studio do
      resource :me, only: %i[show update], controller: :me do
        get :confirm_username, on: :collection
      end
      resources :posts do
        resources :post_comments, only: %i[index create]
      end
      resources :chat_rooms, only: %i[index show] do
        resources :chats, only: %i[index create]
        member do
          post :seen
        end
      end
    end

    namespace :v do
      resources :follows, only: %i[create destroy] do
        collection do
          get :recommend
        end
      end
      resources :posts, only: %i[show] do
        resource :post_likes, only: %i[create destroy], on: :member
        resource :bookmarks, only: %i[create destroy], on: :member
        resources :post_comments, only: %i[index create update]
      end
      resources :post_comments, only: [:destroy]
      resource :me, only: %i[show update destroy], controller: :me do
        get :posts, on: :collection
        get :confirm_username, on: :collection
        get :coin, on: :collection
      end
      resources :chat_rooms, only: %i[index show create] do
        resources :chats, only: %i[index create]
        member do
          post :seen
        end
      end
      resources :creator_users, only: %i[show] do
        collection do
          get :recommend
          get :discover
          get :search
        end
        member do
          get :posts
        end
      end
    end
  end
end
