# require 'rails_helper'

# RSpec.describe FoodExpense, type: :model do
#   it 'is valid with valid attributes' do
#     food_expense = FoodExpense.new(
#       article: 'Article',
#       unit_of_measurement: 'Unit',
#       previous_inventory: 100,
#       entry: 20,
#       foods_used: 10,
#       quantitive_total: 30,
#       final_inventory: 90
#     )
#     expect(food_expense).to be_valid
#   end
  
#   it 'is not valid without an article' do
#     food_expense = FoodExpense.new(article: nil)
#     expect(food_expense).to_not be_valid
#     expect(food_expense.errors[:article]).to include("can't be blank")
#   end

#   it 'has a maximum article length of 100 characters' do
#     food_expense = FoodExpense.new(article: 'A' * 101)
#     expect(food_expense).to_not be_valid
#     expect(food_expense.errors[:article]).to include('is too long (maximum is 100 characters)')
#   end

#   it 'rejects non-numeric values for numerical fields' do
#     food_expense = FoodExpense.new(previous_inventory: 'abc', entry: 'xyz')
#     expect(food_expense).to_not be_valid
#     expect(food_expense.errors[:previous_inventory]).to include('is not a number')
#     expect(food_expense.errors[:entry]).to include('is not a number')
#   end

#   it 'allows only alphabetic characters for unit_of_measurement' do
#     food_expense = FoodExpense.new(unit_of_measurement: '123')
#     expect(food_expense).to_not be_valid
#     expect(food_expense.errors[:unit_of_measurement]).to include('solo permite letras')
#   end
# end

