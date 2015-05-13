class AddNullToNameInArtists < ActiveRecord::Migration
  def change
    remove_index :artists, :name
    add_index :artists, :name, unique: true
  end
end
