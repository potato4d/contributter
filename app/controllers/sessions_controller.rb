class SessionsController < ApplicationController
  def create
    user = User.create_auth_user(request.env['omniauth.auth'])
    session[:user_id] = user.id
    if user.github_id
      redirect_to 'https://contributter.potato4d.me/dashboard'
    else
      redirect_to 'https://contributter.potato4d.me/dashboard/settings'
    end
  end
end
