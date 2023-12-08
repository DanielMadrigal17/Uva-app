class AddCategoryToFoodOrders < ActiveRecord::Migration[7.1]
  def change
    add_column :food_orders, :category, :string
  end
end
