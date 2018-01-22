Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/auth/:provider/callback' => 'sessions#create'

  get '/dashboard' => 'dashboard#index'

  get '/dashboard/settings' => 'dashboard#settings'
  post '/dashboard/settings' => 'dashboard#update_settings'

  get '/dashboard/logout' => 'dashboard#logout'

  # Admin routes
  get '/admin/crawl_and_tweet' => 'admin#crawl_and_tweet'
end
