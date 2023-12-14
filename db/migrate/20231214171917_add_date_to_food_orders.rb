class AddDateToFoodOrders < ActiveRecord::Migration[7.1]
  def change
    add_column :food_orders, :date, :date
  end
end
