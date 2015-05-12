class AddColumnToLyrics < ActiveRecord::Migration
  def change
    add_column :lyrics, :track_title, :string
  end
end
