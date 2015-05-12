class AddColumnToUsers < ActiveRecord::Migration
  def change
    add_column :users, :genius_iq, :integer, default: 0
  end
end
