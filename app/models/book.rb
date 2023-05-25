class Book < ApplicationRecord
    has_one_attached :cover # The cover image
end
