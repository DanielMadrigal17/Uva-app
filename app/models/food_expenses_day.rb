class FoodExpensesDay < ApplicationRecord
    validates :day, :year, :week, presence: true
    validates :year, numericality: { greater_than_or_equal_to: 0 }
    validates :week, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 52 }
end
