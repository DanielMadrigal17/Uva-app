require 'rails_helper'

RSpec.describe RangeRegister, type: :model do
  it 'is valid with valid attributes' do
    range_register = RangeRegister.new(amount: 50)
    expect(range_register).to be_valid
  end
  it 'is not valid without an amount' do
    range_register = RangeRegister.new(amount: nil)
    expect(range_register).to_not be_valid
    expect(range_register.errors[:amount]).to include("can't be blank")
  end

  it 'is not valid with a negative amount' do
    range_register = RangeRegister.new(amount: -10)
    expect(range_register).to_not be_valid
    expect(range_register.errors[:amount]).to include('must be greater than or equal to 0')
  end
end
