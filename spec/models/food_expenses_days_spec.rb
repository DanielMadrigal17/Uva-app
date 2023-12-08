require 'rails_helper'

RSpec.describe FoodExpensesDay, type: :model do
    it 'is valid with valid attributes' do
        food_expenses_day = FoodExpensesDay.new(day: 1, year: 2023, week: 10)
        expect(food_expenses_day).to be_valid
    end
    it 'is not valid without a day' do
        food_expenses_day = FoodExpensesDay.new(day: nil, year: 2023, week: 10)
        expect(food_expenses_day).to_not be_valid
        expect(food_expenses_day.errors[:day]).to include("can't be blank")
    end

    it 'is not valid without a year' do
        food_expenses_day = FoodExpensesDay.new(day: 1, year: nil, week: 10)
        expect(food_expenses_day).to_not be_valid
        expect(food_expenses_day.errors[:year]).to include("can't be blank")
    end

    it 'is not valid without a week' do
        food_expenses_day = FoodExpensesDay.new(day: 1, year: 2023, week: nil)
        expect(food_expenses_day).to_not be_valid
        expect(food_expenses_day.errors[:week]).to include("can't be blank")
    end

    it 'is not valid with a negative year' do
        food_expenses_day = FoodExpensesDay.new(day: 1, year: -2023, week: 10)
        expect(food_expenses_day).to_not be_valid
        expect(food_expenses_day.errors[:year]).to include('must be greater than or equal to 0')
    end

    it 'is not valid with a week greater than 52' do
        food_expenses_day = FoodExpensesDay.new(day: 1, year: 2023, week: 53)
        expect(food_expenses_day).to_not be_valid
        expect(food_expenses_day.errors[:week]).to include('must be less than or equal to 52')
    end
end

