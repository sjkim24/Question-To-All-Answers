class EditUpvotedDefault < ActiveRecord::Migration
  def change
    change_column :upvotes, :upvoted, :string, default: "netural", null: false
  end
end
