class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :username, null: false
      t.string :password_digest, null: false
      t.integer :session_token_id, null: false
      t.text :about_me
    end

    add_index :users, :email, unique: true
    add_index :users, :username, unique: true
    add_index :users, :session_token_id, unique: true
  end
end
