class ChangeColumnIoLyrics < ActiveRecord::Migration
  def change
    change_column :lyrics, :track_title, :string, null: false
  end
end
