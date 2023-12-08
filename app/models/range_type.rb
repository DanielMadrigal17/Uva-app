# app/models/range_type.rb
class RangeType < ApplicationRecord
    validates :description, presence: true, length: { maximum: 255 }
    validates :description, uniqueness: true
end
