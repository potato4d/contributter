require 'nokogiri'
require 'open-uri'

class Contribution < ApplicationRecord
  belongs_to :user

  def self.crawl_and_save(user)
    # Scraping
    html = Nokogiri::HTML(open('https://github.com/users/' + user.github_id + '/contributions'))
    date = html.css('rect')[-2].attributes['data-date'].value
    count = html.css('rect')[-2].attributes['data-count'].value.to_i

    # Tweet
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV['TWITTER_CK']
      config.consumer_secret     = ENV['TWITTER_CS']
      config.access_token        = user.access_token
      config.access_token_secret = user.access_secret
    end

    tweet = client.update("[Contributter] " + user.github_id + "さんの" + date + "のContribution数は " + count.to_s + "でした。")

    # Create DataModel
    contribution = Contribution.new
    contribution.user_id = user.id
    contribution.count = count
    contribution.tweet_url = 'https://twitter.com/' + user.screen_name + '/status/' + tweet.id.to_s
    contribution.save
  end
end
