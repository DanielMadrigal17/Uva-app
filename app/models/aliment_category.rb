class AlimentCategory < ApplicationRecord
    validates :name, presence: true, uniqueness: true
    validates :name, length: { maximum: 50 }
    validates :name, allow_blank: true, format: { with: /\A[a-zA-Z]*\z/, message: 'only allows letters' }
end
    