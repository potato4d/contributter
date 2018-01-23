class AdminController < ApplicationController

  before_action :admin_auth

  # Daily batch
  def crawl_and_tweet
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
