class Tweet
  def self.exec(user_id, token, token_secret, date, count)
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV['TWITTER_CK']
      config.consumer_secret     = ENV['TWITTER_CS']
      config.access_token        = token
      config.access_token_secret = token_secret
    end

    client.update("[b] " + user_id + "さんの" + date + "のContribution数は " + count + "でした。\n#contributter")
  end
end
