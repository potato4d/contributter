Rails.application.config.middleware.use OmniAuth::Builder do
  provider :twitter,
    ENV['TWITTER_CK'],
    ENV['TWITTER_CS']
end
