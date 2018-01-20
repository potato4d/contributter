class DashboardController < ApplicationController
  def index
    @user = current_user
  end

  private
  def current_user
    User.find(session[:user_id]) if session[:user_id]
  end
end
