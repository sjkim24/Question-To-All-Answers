class AddIndexToUpvotes < ActiveRecord::Migration
  def change
    add_index :upvotes, :anno_id
    add_index :upvotes, :user_id
  end
end
