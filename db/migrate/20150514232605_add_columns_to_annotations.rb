class AddColumnsToAnnotations < ActiveRecord::Migration
  def change
    add_column :annotations, :start_pos, :integer
    add_column :annotations, :end_pos, :integer
    change_column :annotations, :start_pos, :integer, null: false
    change_column :annotations, :end_pos, :integer, null: false
  end
end
