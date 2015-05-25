class CreateUpvotes < ActiveRecord::Migration
  def change
    create_table :upvotes do |t|
      t.integer :anno_id, null: false
      t.integer :user_id, null: false
    end
  end
end
