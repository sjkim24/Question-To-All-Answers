class CreatePgSearchDocuments < ActiveRecord::Migration
  def change
    create_table :pg_search_documents do |t|
      t.text :content
      t.integer :searchable_id
      t.string :searchable_type

      t.timestamps
    end
  end
end
