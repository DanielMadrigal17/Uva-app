require 'rails_helper'

RSpec.describe RangeType, type: :model do
  it 'is valid with valid attributes' do
    range_type = RangeType.new(description: 'Valid Description')
    expect(range_type).to be_valid
  end

  it 'is not valid without a description' do
    range_type = RangeType.new(description: nil)
    expect(range_type).to_not be_valid
    expect(range_type.errors[:description]).to include("can't be blank")
  end

  it 'is not valid with a description longer than 255 characters' do
    range_type = RangeType.new(description: 'a' * 256)
    expect(range_type).to_not be_valid
    expect(range_type.errors[:description]).to include('is too long (maximum is 255 characters)')
  end

  it 'is not valid with a duplicate description' do
    existing_range_type = RangeType.create(description: 'Duplicate Description')
    new_range_type = RangeType.new(description: 'Duplicate Description')
    expect(new_range_type).to_not be_valid
    expect(new_range_type.errors[:description]).to include('has already been taken')
  end


end
