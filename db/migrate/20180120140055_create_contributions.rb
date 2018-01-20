class CreateContributions < ActiveRecord::Migration[5.1]
  def change
    create_table :contributions do |t|
      t.references :user, foreign_key: true
      t.integer :count
      t.string :tweet_url

      t.timestamps
    end
  end
end
