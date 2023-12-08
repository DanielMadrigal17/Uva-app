class CreateFoodOrders < ActiveRecord::Migration[7.1]
  def change
    create_table :food_orders do |t|
      t.string :article
      t.string :unit_of_measurement
      t.integer :requested_amount
      t.integer :received_amount
      t.integer :week
      t.string :month
      t.integer :year

      t.timestamps
    end
  end
end
