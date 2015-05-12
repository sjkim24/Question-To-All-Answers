class AddDefaultToABoutMe < ActiveRecord::Migration
  def change
    change_column :users, :about_me, :string, default: "Tell us about yourself!"
  end
end
