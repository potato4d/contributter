class DashboardController < ApplicationController
  before_action :auth_guard

  def index
    @user = current_user
  end

  private
  def current_user
    User.find(session[:user_id]) if session[:user_id]
  end

  def auth_guard
    redirect_to '/auth/twitter' unless current_user
  end
end
