class Inventory < ApplicationRecord
    validates :item, :unit_of_measure, :category, :quantity, :date, presence: true
    validates :item, length: { maximum: 100 }
    validates :unit_of_measure, format: { with: /\A[a-zA-Z]+\z/, message: "only allows letters" }
    validates :quantity, numericality: { greater_than_or_equal_to: 0 }
    # Agrega más validaciones según tus necesidades

    validate :date_in_past

    def date_in_past
        errors.add(:date, "can't be in the future") if date.present? && date > Date.today
    end
end
