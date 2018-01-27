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

    if user.save
      redirect_to 'https://contributter.potato4d.me/dashboard/settings', :flash => { :success => '更新が完了しました。' }
    else
      redirect_to 'https://contributter.potato4d.me/dashboard/settings', :flash => { :danger => '問題が発生しました。' }
    end
  end

  def logout
    session[:user_id] = nil
    redirect_to 'https://contributter.potato4d.me/'
  end

  private
  def current_user
    begin
      User.find(session[:user_id]) if session[:user_id]
    rescue
      false
    end
  end

  def auth_guard
    redirect_to 'https://contributter.potato4d.me/auth/twitter' unless current_user
  end
end
