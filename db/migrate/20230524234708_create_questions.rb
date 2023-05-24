class CreateQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :questions do |t|
      t.references :book, null: false, foreign_key: true
      t.string :question
      t.string :answer
      t.vector :embedding, limit: 4096

      t.timestamps
    end
  end
end
