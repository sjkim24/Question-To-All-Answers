class CreateAnnotations < ActiveRecord::Migration
  def change
    create_table :annotations do |t|
      t.text :annotation, null: false
      t.integer :lyric_id, null: false
      t.text :lyric_text, null: false

      t.timestamps
    end

    add_index :annotations, :lyric_id
  end
end
