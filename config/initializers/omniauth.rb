Rails.application.config.middleware.use OmniAuth::Builder do

  configure do |config|
    config.full_host = ENV['ROOT_DOMAIN']
  end

  provider :twitter,
    ENV['TWITTER_CK'],
    ENV['TWITTER_CS'],
    {
      :image_size => 'original'
    }
end
