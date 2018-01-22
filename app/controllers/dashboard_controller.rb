require 'pry'
class DashboardController < ApplicationController
  before_action :auth_guard

  def index
    @user = current_user
    @contributions = Contribution.where(user_id: @user.id).order('id DESC').all
  end

  def settings
    @user = current_user
  end

  def update_settings
    user = User.find_or_create_by(uid: current_user.uid)
    user.github_id = params['github_id']
    user.save

    redirect_to '/dashboard/settings'
  end

  def logout
    session[:user_id] = nil
    redirect_to '/'
  end

  private
  def current_user
    User.find(session[:user_id]) if session[:user_id]
  end

  def auth_guard
    redirect_to '/auth/twitter' unless current_user
  end
end
