require 'faraday'
require 'date'
require 'json'

class AdminController < ApplicationController

  before_action :admin_auth

  # Daily batch
  def crawl_and_tweet
    users = User.all

    count = 0

    users.each do |user|
      next unless user.github_id
      RegisterWorker.perform_async(user.id)
      count += 1
    end

    render json: {
      result: true,
      register_count: count
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
