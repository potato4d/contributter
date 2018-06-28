require 'faraday'
require 'date'
require 'json'

class AdminController < ApplicationController

  before_action :admin_auth

  # Daily batch
  def crawl_and_tweet
    begin
      users = User.all

      total_count = users.length
      success_count = 0
      fail_count = 0
      skip_count = 0

      threads = []

      users.each do |user|
        unless user.github_id
          skip_count += 1
          next
        end
        sleep(0.25)
        threads << Thread.new do
          ActiveRecord::Base.connection_pool.with_connection do
            c = Contribution.crawl_and_save(user)
            c ? success_count += 1 : fail_count += 1
          end
        end
      end

      threads.each { |t| t.join }

      Slack::post(success_count, fail_count, skip_count, total_count)
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
