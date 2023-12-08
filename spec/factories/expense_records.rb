FactoryBot.define do
  factory :expense_record do
    responsible_name { "MyString" }
    article { "MyString" }
    unit_of_measurement { "MyString" }
    previous_inventory { 1 }
    entry { 1 }
    foods_used { "MyString" }
    quantitive_total { 1 }
    final_inventory { 1 }
  end
end
