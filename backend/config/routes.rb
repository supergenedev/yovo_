Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  # Admin panel
  namespace :admin do
    get  "login",  to: "sessions#new",     as: :login
    post "login",  to: "sessions#create"
    delete "logout", to: "sessions#destroy", as: :logout
    root to: "dashboard#index"
    resources :users, only: %i[index show destroy] do
      member do
        patch :suspend
        patch :unsuspend
      end
    end
    resources :creators, only: %i[index show] do
      member do
        patch :approve
        patch :reject
      end
    end
    resources :posts,         only: %i[index show destroy]
    resources :post_comments, only: %i[index destroy]
    resources :issues, only: [ :index ] do
      member do
        patch :resolve
      end
    end
    # 코인: index=내역 조회, create=수동 지급/차감
    resources :coins, only: %i[index create]
  end

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
      resources :creator_tags, only: %i[index create destroy]
    end

    namespace :v do
      resources :feeds, only: [:index] do
        collection do
          get :discover
          get :creators
          get :videos
        end
      end
      resources :follows, only: %i[create destroy] do
        collection do
          get :recommend
          get :following
        end
      end
      resources :posts, only: %i[show] do
        resource :post_likes, only: %i[create destroy], on: :member
        resource :bookmarks, only: %i[create destroy], on: :member
        resources :post_comments, only: %i[index create update]
        resources :post_tips, only: [:create]
        collection do
          post :batch_seen
          post :batch_get
        end
        member do
          post :purchase
          get :similar
        end
      end
      resources :post_comments, only: [:destroy] do
        resource :post_comment_likes, only: %i[create destroy], on: :member
      end
      resources :issues, only: [:create]
      resource :me, only: %i[show update destroy], controller: :me do
        get :posts, on: :collection
        get :confirm_username, on: :collection
        get :coin, on: :collection
        post :apply_creator, on: :collection
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
          get :tags
        end
      end
      resources :notifications, only: %i[index update] do
        collection do
          get :unread_count
          get :tab_counts
          post :read_all
        end
      end
      resources :enums, only: [:index]
    end
  end
end
