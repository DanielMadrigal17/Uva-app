class AddFoodExpensesReferenceToFoodExpensesDays < ActiveRecord::Migration[7.1]
  def change
    add_reference :food_expenses_days, :food_expenses, foreign_key: true
  end
end
