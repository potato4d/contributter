class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :uid
      t.string :screen_name
      t.string :github_id
      t.string :icon_url
      t.string :access_token
      t.string :access_secret

      t.timestamps
    end
  end
end
