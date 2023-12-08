class CreateRegisterEstudents < ActiveRecord::Migration[7.1]
  def change
    create_table :register_estudents do |t|
      t.string :entry_hour_date
      t.string :departure_hour_date
      t.date :date
      t.string :present
      t.string :absent
      t.string :carrier_name
      t.string :official_name

      t.timestamps
    end
  end
end
