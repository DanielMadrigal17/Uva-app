class AddRegistersToRangeTypes < ActiveRecord::Migration[7.1]
  def change
    add_reference :range_types, :registers, foreign_key: true
  end
end
