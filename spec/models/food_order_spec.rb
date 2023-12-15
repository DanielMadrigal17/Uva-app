require 'rails_helper'

# Especificación de prueba para el modelo FoodOrder
RSpec.describe FoodOrder, type: :model do
  it 'is valid with valid attributes' do
    food_order = FoodOrder.new(
      article: 'Article',
      unit_of_measurement: 'Unit',
      requested_amount: 10,
      received_amount: 5,
      category: 'Category'
    )
    expect(food_order).to be_valid
  end

  it 'is not valid without an article' do
    food_order = FoodOrder.new(article: nil)
    expect(food_order).to_not be_valid
    expect(food_order.errors[:article]).to include("can't be blank")
  end

  it 'is not valid with too long article' do
    food_order = FoodOrder.new(article: 'a' * 101)
    expect(food_order).to_not be_valid
    expect(food_order.errors[:article]).to include('is too long (maximum is 100 characters)')
  end

  it 'is not valid without a category' do
    food_order = FoodOrder.new(category: nil)
    expect(food_order).to_not be_valid
    expect(food_order.errors[:category]).to include("can't be blank")
  end

  it 'is not valid with a negative requested_amount' do
    food_order = FoodOrder.new(requested_amount: -5)
    expect(food_order).to_not be_valid
    expect(food_order.errors[:requested_amount]).to include('must be greater than or equal to 0')
  end

end


