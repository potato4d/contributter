class ChangeColumntoContribution < ActiveRecord::Migration[5.1]
  def change
    add_column :contributions, :target_date, :date, :after => :count
  end
end
