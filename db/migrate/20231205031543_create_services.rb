class CreateServices < ActiveRecord::Migration[7.1]
  def change
    create_table :services do |t|
      t.string :name_service
      t.string :description

      t.timestamps
    end
  end
end
