class Register < ApplicationRecord
    validates :estableshiment, :code, :month, :year, :personal, presence: true
    validates :code, uniqueness: true
    validates :code, length: { maximum: 10 }
    validates :year, numericality: { greater_than_or_equal_to: 2000, less_than_or_equal_to: 2100 }
end  