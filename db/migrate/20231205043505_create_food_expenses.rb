class CreateFoodExpenses < ActiveRecord::Migration[7.1]
  def change
    create_table :food_expenses do |t|
      t.string :article
      t.string :unit_of_measurement
      t.string :previous_inventory
      t.string :entry
      t.string :foods_used
      t.string :quantitive_total
      t.string :final_inventory

      t.timestamps
    end
  end
end
