class CreateRegisters < ActiveRecord::Migration[7.1]
  def change
    create_table :registers do |t|
      t.string :estableshiment
      t.string :code
      t.string :month
      t.string :year
      t.string :personal

      t.timestamps
    end
  end
end
