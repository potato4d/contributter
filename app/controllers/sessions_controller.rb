class SessionsController < ApplicationController
  def create
    user = User.create_auth_user(request.env['omniauth.auth'])
    session[:user_id] = user.id
    if user.github_id
      redirect_to ENV['ROOT_DOMAIN'] + ''
    else
      redirect_to ENV['ROOT_DOMAIN'] + '/dashboard/settings'
    end
  end
end
