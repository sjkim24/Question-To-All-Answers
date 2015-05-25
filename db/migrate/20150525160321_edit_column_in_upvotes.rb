class EditColumnInUpvotes < ActiveRecord::Migration
  def change
    change_column :upvotes, :upvoted, :boolean, default: :false, null: false
  end
end
