class AddColumnToSessionToken < ActiveRecord::Migration
  def change
    add_column :session_tokens, :user_id, :integer
    add_index :session_tokens, :user_id
  end
end
