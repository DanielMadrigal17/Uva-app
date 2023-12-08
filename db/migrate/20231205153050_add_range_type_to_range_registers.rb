class AddRangeTypeToRangeRegisters < ActiveRecord::Migration[7.1]
  def change
    add_reference :range_registers, :range_type, foreign_key: true
  end
end
