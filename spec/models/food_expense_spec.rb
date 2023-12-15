require 'rails_helper'

RSpec.describe FoodExpense, type: :model do
  it 'is valid with valid attributes' do
    food_expense = FoodExpense.new(
      article: 'Article',
      unit_of_measurement: 'Unit',
      previous_inventory: 100,
      entry: 20,
      foods_used: 10,
      quantitive_total: 30,
      final_inventory: 90
    )
    expect(food_expense).to be_valid
  end
  

 
end

