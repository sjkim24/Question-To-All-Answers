class AddUserIdToSessionToken < ActiveRecord::Migration
  def change
    add_column :session_tokens, :user_id, :integer
    change_column :session_tokens, :user_id, :integer, null: false
    add_index :session_tokens, :user_id
  end
end
