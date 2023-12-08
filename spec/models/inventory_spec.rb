require 'rails_helper'

RSpec.describe Inventory, type: :model do
  it 'is valid with valid attributes' do
    inventory = Inventory.new(
      item: 'Item',
      unit_of_measure: 'Unit',
      category: 'Category',
      quantity: 10,
      date: Date.today - 1
    )
    expect(inventory).to be_valid
  end
  it 'is not valid without an item' do
    inventory = Inventory.new(item: nil)
    expect(inventory).to_not be_valid
    expect(inventory.errors[:item]).to include("can't be blank")
  end

  it 'is not valid with too long item' do
    inventory = Inventory.new(item: 'a' * 101)
    expect(inventory).to_not be_valid
    expect(inventory.errors[:item]).to include('is too long (maximum is 100 characters)')
  end

  it 'is not valid without a category' do
    inventory = Inventory.new(category: nil)
    expect(inventory).to_not be_valid
    expect(inventory.errors[:category]).to include("can't be blank")
  end

  it 'is not valid with a negative quantity' do
    inventory = Inventory.new(quantity: -5)
    expect(inventory).to_not be_valid
    expect(inventory.errors[:quantity]).to include('must be greater than or equal to 0')
  end

  it 'is not valid with a future date' do
    inventory = Inventory.new(date: Date.today + 1)
    expect(inventory).to_not be_valid
    expect(inventory.errors[:date]).to include("can't be in the future")
  end
end
