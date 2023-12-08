require 'rails_helper'

RSpec.describe AlimentCategory, type: :model do

  it 'is valid with valid attributes' do
    aliment_category = AlimentCategory.new(name: 'Category')
    expect(aliment_category).to be_valid
  end

  it 'is not valid without a name' do
    aliment_category = AlimentCategory.new(name: nil)
    expect(aliment_category).to_not be_valid
    expect(aliment_category.errors[:name]).to include("can't be blank")
  end

  it 'is not valid with too long name' do
    aliment_category = AlimentCategory.new(name: 'a' * 51)
    expect(aliment_category).to_not be_valid
    expect(aliment_category.errors[:name]).to include('is too long (maximum is 50 characters)')
  end

  it 'is not valid with a non-alphabetic name' do
    aliment_category = AlimentCategory.new(name: '123')
    expect(aliment_category).to_not be_valid
    expect(aliment_category.errors[:name]).to include('only allows letters')
  end

  it 'is not valid with a duplicate name' do
    existing_category = AlimentCategory.create(name: 'Duplicate')
    new_category = AlimentCategory.new(name: 'Duplicate')
    expect(new_category).to_not be_valid
    expect(new_category.errors[:name]).to include('has already been taken')
  end
end
