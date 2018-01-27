# Original: https://github.com/rails/rails/blob/85783534fcf1baefa5b502a2bfee235ae6d612d7/railties/lib/rails/generators/rails/app/templates/config/initializers/request_forgery_protection.rb

# Disable origin-checking CSRF mitigation.
Rails.application.config.action_controller.forgery_protection_origin_check = false
