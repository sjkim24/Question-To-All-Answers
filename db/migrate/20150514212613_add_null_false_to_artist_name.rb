class AddNullFalseToArtistName < ActiveRecord::Migration
  def change
    change_column :artists, :name, :string, null: false
  end
end
