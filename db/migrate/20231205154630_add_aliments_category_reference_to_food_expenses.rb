class AddAlimentsCategoryReferenceToFoodExpenses < ActiveRecord::Migration[7.1]
  def change
    add_reference :food_expenses, :aliment_category, foreign_key: true
  end
end
