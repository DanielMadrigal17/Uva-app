class CreateRangeTypes < ActiveRecord::Migration[7.1]
  def change
    create_table :range_types do |t|
      t.string :description

      t.timestamps
    end
  end
end
