class IndexController < ApplicationController
  def index
    @user = current_user

    @contribution = Contribution.where( 'id >= ?', rand(Contribution.first.id..Contribution.last.id) ).first
    @random_user = User.find(@contribution.user_id)
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
