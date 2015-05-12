class AddDefaultToLyrics < ActiveRecord::Migration
  def change
    change_column :lyrics, :user_id, :integer, null: false
  end
end
