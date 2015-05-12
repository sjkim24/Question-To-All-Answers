class CreateLyrics < ActiveRecord::Migration
  def change
    create_table :lyrics do |t|
      t.text :lyric, null: false
      t.integer :artist_id, null: false

      t.timestamps
    end

    add_index :lyrics, :artist_id
  end
end
