class AddLyrictextToAnnotations < ActiveRecord::Migration
  def change
    add_column :annotations, :lyric_text, :text
    change_column :annotations, :lyric_text, :text, null: false
  end
end
