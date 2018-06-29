require 'faraday'
require 'date'
require 'json'

class AdminController < ApplicationController

  before_action :admin_auth

  # Daily batch
  def crawl_and_tweet
    begin
      users = User.all

      counts = {
        total: users.length,
        success: 0,
        fail: 0,
        skip: 0
      }

      users.each do |user|
        unless user.github_id
          counts[:skip] += 1
          next
        end
        begin
          c = Contribution.crawl_and_save(user)
          if c
            counts[:success] += 1
          else
            counts[:skip] += 1
          end
        rescue => e
          counts[:fail] += 1
        end
      end

      Slack::post(counts)
      render json: {
        result: true
      }
    rescue => e
      render json: {
        result: e
      }
    end
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
