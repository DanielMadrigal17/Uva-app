

require 'rails_helper'

RSpec.describe Register, type: :model do
    it 'is valid with valid attributes' do
        register = Register.new(
        estableshiment: 'Example',
        code: 'ABCD1234',
        month: 5,
        year: 2023,
        personal: 'John Doe'
        )
        expect(register).to be_valid
    end
    it 'is not valid without an estableshiment' do
        register = Register.new(estableshiment: nil)
        expect(register).to_not be_valid
        expect(register.errors[:estableshiment]).to include("can't be blank")
    end

    it 'is not valid without a code' do
        register = Register.new(code: nil)
        expect(register).to_not be_valid
        expect(register.errors[:code]).to include("can't be blank")
    end

    it 'is not valid with a code longer than 10 characters' do
        register = Register.new(code: 'A' * 11)
        expect(register).to_not be_valid
        expect(register.errors[:code]).to include('is too long (maximum is 10 characters)')
    end

    it 'is not valid without a year' do
        register = Register.new(year: nil)
        expect(register).to_not be_valid
        expect(register.errors[:year]).to include("can't be blank")
    end

    it 'is not valid with a year outside the range (2000 - 2100)' do
        register = Register.new(year: 1900)
        expect(register).to_not be_valid
        expect(register.errors[:year]).to include('must be greater than or equal to 2000')
    end

    it 'is not valid without personal information' do
        register = Register.new(personal: nil)
        expect(register).to_not be_valid
        expect(register.errors[:personal]).to include("can't be blank")
    end
end


