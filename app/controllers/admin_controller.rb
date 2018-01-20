class AdminController < ApplicationController

  before_action :admin_auth

  def crawl_and_tweet
    render json: {
      result: true
    }
  end

  private

  def admin_auth
    unless (params[:admin_token] === ENV['ADMIN_TOKEN'] and ENV['ADMIN_TOKEN'])
      authenticate_error
    end
  end

  def authenticate_error
    render json: { result: false, error: 'Unauthorized.' }, status: 401
  end
end
