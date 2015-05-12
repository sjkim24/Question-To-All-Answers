class AddColumnsToUsers < ActiveRecord::Migration
  def change
    remove_column :users, :session_token_id, :integer
    add_column :users, :session_token, :string
    change_column :users, :session_token, :string, null: false
  end
end
