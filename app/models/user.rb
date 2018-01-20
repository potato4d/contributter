class User < ApplicationRecord
  def self.create_auth_user (provider_data)
    uid = provider_data[:uid]
    screen_name = provider_data[:info][:nickname]
    icon_url = provider_data[:info][:image]
    access_token = provider_data[:credentials][:token]
    access_secret = provider_data[:credentials][:secret]

    User.find_or_create_by(uid: uid) do |user|
      user.screen_name = screen_name
      user.icon_url = icon_url
      user.access_token = access_token
      user.access_secret = access_secret
    end
  end
end
