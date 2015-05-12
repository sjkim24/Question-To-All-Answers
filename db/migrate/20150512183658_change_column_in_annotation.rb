class ChangeColumnInAnnotation < ActiveRecord::Migration
  def change
    add_index :annotations, :user_id
  end
end
