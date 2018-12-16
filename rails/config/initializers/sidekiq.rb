Sidekiq.configure_server do |config|
  if ENV['REDIS_URL']
    config.redis = {
      url: ENV['REDIS_URL']
    }
  else
    config.redis = {
      url: 'redis://redis:6379'
    }
  end
end

Sidekiq.configure_client do |config|
  if ENV['REDIS_URL']
    config.redis = {
      url: ENV['REDIS_URL']
    }
  else
    config.redis = {
      url: 'redis://redis:6379'
    }
  end
end
