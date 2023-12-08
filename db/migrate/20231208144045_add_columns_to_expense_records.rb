class AddColumnsToExpenseRecords < ActiveRecord::Migration[7.1]
  def change
    add_column :expense_records, :category, :string
    add_column :expense_records, :date, :string
    add_column :expense_records, :quantity, :integer
  end
end


