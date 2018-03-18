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
      body = {
        text: "<@" + ENV['OWNER_NAME'] + ">\n" + "[Contributter] " + Date.today.strftime("%Y/%m/%d") + "のバッチ実行結果\n\n",
        channel: ENV['SLACK_CHANNEL']
        attachments: [
          {
            color: '#F3E2C8',
            text: 'Summary',
            fields: [
              {
                title: '成功数',
                value: success_count.to_s,
                short: true
              },
              {
                title: '失敗数',
                value: fail_count.to_s,
                short: true
              },
              {
                title: 'スキップ数',
                value: skip_count.to_s,
                short: true
              },
              {
                title: '合計ユーザー数',
                value: total_count.to_s,
                short: true
              }
            ]
          }
        ]
      }

      conn = Faraday.new(:url => ENV['SLACK_API_ROOT'])
      conn.post do |req|
        req.url ENV["SLACK_API_ENDPOINT"]
        req.headers['Content-Type'] = 'application/json'
        req.body = body.to_json
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
