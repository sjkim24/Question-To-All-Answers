class AddUserIdToLyrics < ActiveRecord::Migration
  def change
    add_column :lyrics, :user_id, :integer
  end
end
