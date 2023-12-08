FactoryBot.define do
  factory :food_order do
    article { "MyString" }
    unit_of_measurement { "MyString" }
    requested_amount { 1 }
    received_amount { 1 }
    week { 1 }
    month { "MyString" }
    year { 1 }
  end
end
