class RemoveColumnFromAnnotations < ActiveRecord::Migration
  def change
    remove_column :annotations, :lyric_text, :string
  end
end
