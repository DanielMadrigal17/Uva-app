class CreateRangeRegisters < ActiveRecord::Migration[7.1]
  def change
    create_table :range_registers do |t|
      t.integer :amount

      t.timestamps
    end
  end
end
