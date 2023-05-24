class CreatePages < ActiveRecord::Migration[7.0]
  def change
    create_table :pages do |t|
      t.references :book, null: false, foreign_key: true
      t.integer :page_number
      t.text :content
      t.vector :embedding, limit: 4096

      t.timestamps
    end
  end
end
