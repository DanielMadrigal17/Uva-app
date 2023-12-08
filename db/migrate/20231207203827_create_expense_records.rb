class CreateExpenseRecords < ActiveRecord::Migration[7.1]
  def change
    create_table :expense_records do |t|
      t.string :responsible_name
      t.string :article
      t.string :unit_of_measurement
      t.integer :previous_inventory
      t.integer :entry
      t.string :foods_used
      t.integer :quantitive_total
      t.integer :final_inventory

      t.timestamps
    end
  end
end
