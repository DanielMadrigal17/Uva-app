class AddNameToRegisterStudents < ActiveRecord::Migration[7.1]
  def change
    add_column :register_estudents, :name, :string
  end
end
