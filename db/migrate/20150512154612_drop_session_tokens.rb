class DropSessionTokens < ActiveRecord::Migration
  def change
    drop_table :session_tokens
  end
end
