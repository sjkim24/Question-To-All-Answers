class EditUpvotedDefault2 < ActiveRecord::Migration
  def change
    change_column :upvotes, :upvoted, :string, default: "neutral", null: false
  end
end
