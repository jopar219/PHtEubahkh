class Question < ApplicationRecord
  belongs_to :book
  has_neighbors :embedding
end
