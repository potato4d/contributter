class SessionsController < ApplicationController
  def create
    user = User.create_auth_user(request.env['omniauth.auth'])
    session[:user_id] = user.id
    redirect_to '/'
  end
end
