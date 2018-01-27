require 'faraday'
require 'date'

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

      users.each do |user|
        unless user.github_id
          skip_count += 1
          next
        end

        user_contribution = Contribution.crawl_and_save(user)

        if user_contribution
          success_count += 1
        else
          fail_count += 1
        end
      end

      # Post slack
      # TODO: Modulize

      text = "<@" + ENV['OWNER_NAME'] + ">\n" +
        "[Contributter] " + Date.today.strftime("%Y/%m/%d") + "のバッチ実行結果\n\n" +
        "```\n" +
        "SUCCESS: " + success_count.to_s + "\n" +
        "SKIP:    " + skip_count.to_s + "\n" +
        "FAIL:    " + fail_count.to_s + "\n" +
        "TOTAL:   " + total_count.to_s + "" +
        "```"

      conn = Faraday.new(:url => ENV['SLACK_API_ROOT'])
      conn.post do |req|
        req.url ENV["SLACK_API_ENDPOINT"]
        req.headers['Content-Type'] = 'application/json'
        req.body = '{"text": "' + text + '", "channel": "' + ENV['SLACK_CHANNEL'] + '"}'
      end

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
