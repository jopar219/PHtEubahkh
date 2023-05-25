class RemoveCoverFromBooks < ActiveRecord::Migration[7.0]
  def change
    remove_column :books, :cover, :string
    add_column :books, :default_question, :string
  end
end
