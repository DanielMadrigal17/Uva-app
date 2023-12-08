class CreateInventories < ActiveRecord::Migration[7.1]
  def change
    create_table :inventories do |t|
      t.string :item
      t.string :unit_of_measure
      t.string :category
      t.integer :quantity
      t.date :date

      t.timestamps
    end
  end
end
