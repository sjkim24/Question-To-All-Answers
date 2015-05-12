class AddColumnToAnnotation < ActiveRecord::Migration
  def change
    add_column :annotations, :user_id, :integer
    change_column :annotations, :user_id, :integer, null: false
  end
end
