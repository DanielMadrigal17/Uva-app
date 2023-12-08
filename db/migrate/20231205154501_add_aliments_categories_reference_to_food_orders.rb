class AddAlimentsCategoriesReferenceToFoodOrders < ActiveRecord::Migration[7.1]
  def change
    add_reference :food_orders, :aliment_category, foreign_key: true
  end
end
