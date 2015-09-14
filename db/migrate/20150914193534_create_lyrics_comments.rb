class CreateLyricsComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.text :comment, null: false
      t.integer :user_id, null: false
      t.integer :lyric_id, null: false
    end
  end
end
