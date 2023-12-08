class FoodExpense < ApplicationRecord
    # belongs_to :aliment_category
    
    validates :article, :unit_of_measurement, :entry, :foods_used, :quantitive_total, :final_inventory, presence: true
    validates :article, length: { maximum: 100 }
    validates :previous_inventory, :entry, :foods_used, :quantitive_total, :final_inventory, numericality: { greater_than_or_equal_to: 0 }
    validates :article, uniqueness: true
    validates :category, presence: true
    validates :requested_amount, numericality: { greater_than_or_equal_to: 0 }
end
