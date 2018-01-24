class IndexController < ApplicationController
  def index
    @user = current_user
  end

  private
  def current_user
    begin
      User.find(session[:user_id]) if session[:user_id]
    rescue
      false
    end
  end
end
