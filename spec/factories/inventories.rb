FactoryBot.define do
  factory :inventory do
    item { "MyString" }
    unit_of_measure { "MyString" }
    category { "MyString" }
    quantity { 1 }
    date { "2023-12-05" }
  end
end
