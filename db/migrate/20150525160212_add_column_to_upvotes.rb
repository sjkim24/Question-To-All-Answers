class AddColumnToUpvotes < ActiveRecord::Migration
  def change
    add_column :upvotes, :upvoted, :boolean
    change_column :upvotes, :upvoted, :boolean, null: false
  end
end
