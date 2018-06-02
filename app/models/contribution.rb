require 'nokogiri'
require 'open-uri'

class Contribution < ApplicationRecord
  belongs_to :user

  def self.crawl_and_save(user)
    begin
      data = Crawler::get(user.github_id)
      tweet = Tweet::exec(user.github_id, user.decrypted_token, user.decrypted_secret, data[:date], data[:count].to_s)

      # Create DataModel
      contribution = Contribution.new
      contribution.user_id = user.id
      contribution.count = data[:count]
      contribution.target_date = data[:date]
      contribution.tweet_url = 'https://twitter.com/' + user.screen_name + '/status/' + tweet.id.to_s
      contribution.save
    rescue => e
      logger.debug(e)
      # for fail_count increment
      false
    end
  end
end
