class AddNullFalseToUserId < ActiveRecord::Migration
  def change
    remove_column :session_tokens, :user_id, :integer

  end
end
