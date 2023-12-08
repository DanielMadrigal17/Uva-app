class CreateFoodExpensesDays < ActiveRecord::Migration[7.1]
  def change
    create_table :food_expenses_days do |t|
      t.string :day
      t.string :year
      t.string :week

      t.timestamps
    end
  end
end
