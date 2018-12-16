class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :basic if ENV['HEROKU_ENV']

  private
  def basic
    authenticate_or_request_with_http_basic do |user, pass|
      user == ENV['HEROKU_BASIC_USER'] && pass == ENV['HEROKU_BASIC_PASS']
    end
  end
end
