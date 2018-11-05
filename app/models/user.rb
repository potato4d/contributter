class User < ApplicationRecord
  has_many :contributions

  attr_writer :decrypted_token, :decrypted_secret

  def self.create_auth_user (provider_data)
    uid = provider_data[:uid]
    screen_name = provider_data[:info][:nickname]
    icon_url = provider_data[:info][:image].gsub(/http:\/\//, 'https://')
    access_token = provider_data[:credentials][:token]
    access_secret = provider_data[:credentials][:secret]
    user = User.find_or_create_by(uid: uid)
    user.screen_name = screen_name
    user.icon_url = icon_url
    user.access_token = self.encryptor.encrypt_and_sign(access_token)
    user.access_secret = self.encryptor.encrypt_and_sign(access_secret)
    user.save!
    user
  end

  def decrypted_token
    self.encryptor.decrypt_and_verify(self.access_token)
  end

  def decrypted_secret
    self.encryptor.decrypt_and_verify(self.access_secret)
  end

  def self.encryptor
    ActiveSupport::MessageEncryptor.new(
      ENV['SECURITY_SALT'],
      cipher: 'aes-256-cbc'
    )
  end

  def encryptor
    ActiveSupport::MessageEncryptor.new(
      ENV['SECURITY_SALT'],
      cipher: 'aes-256-cbc'
    )
  end
end
