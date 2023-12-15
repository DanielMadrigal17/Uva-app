# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2023_12_14_171917) do
  create_table "aliment_categories", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "children", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.string "last_name"
    t.date "birthdate"
    t.string "address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "expense_records", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "responsible_name"
    t.string "article"
    t.string "category"
    t.string "unit_of_measurement"
    t.integer "previous_inventory"
    t.integer "entry"
    t.string "date"
    t.integer "quantity"
    t.string "foods_used"
    t.integer "quantitive_total"
    t.integer "final_inventory"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "food_expenses", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "article"
    t.string "unit_of_measurement"
    t.string "previous_inventory"
    t.string "entry"
    t.string "foods_used"
    t.string "quantitive_total"
    t.string "final_inventory"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "aliment_category_id"
    t.index ["aliment_category_id"], name: "index_food_expenses_on_aliment_category_id"
  end

  create_table "food_expenses_days", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "day"
    t.string "year"
    t.string "week"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "food_expenses_id"
    t.index ["food_expenses_id"], name: "index_food_expenses_days_on_food_expenses_id"
  end

  create_table "food_orders", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "article"
    t.string "category"
    t.string "unit_of_measurement"
    t.integer "requested_amount"
    t.integer "received_amount"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "aliment_category_id"
    t.date "date"
    t.index ["aliment_category_id"], name: "index_food_orders_on_aliment_category_id"
  end

  create_table "inventories", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "item"
    t.string "unit_of_measure"
    t.string "category"
    t.integer "quantity"
    t.date "date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "jwt_denylist", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "jti", null: false
    t.datetime "exp", null: false
    t.index ["jti"], name: "index_jwt_denylist_on_jti"
  end

  create_table "range_registers", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "amount"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "range_type_id"
    t.index ["range_type_id"], name: "index_range_registers_on_range_type_id"
  end

  create_table "range_types", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "registers_id"
    t.index ["registers_id"], name: "index_range_types_on_registers_id"
  end

  create_table "register_estudents", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name"
    t.string "entry_hour_date"
    t.string "departure_hour_date"
    t.date "date"
    t.string "present"
    t.string "absent"
    t.string "carrier_name"
    t.string "official_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "children_id"
    t.index ["children_id"], name: "index_register_estudents_on_children_id"
  end

  create_table "registers", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "estableshiment"
    t.string "code"
    t.string "month"
    t.string "year"
    t.string "personal"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "service_id"
    t.index ["service_id"], name: "index_registers_on_service_id"
  end

  create_table "services", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name_service"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.string "last_name"
    t.string "jti", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "food_expenses", "aliment_categories"
  add_foreign_key "food_expenses_days", "food_expenses", column: "food_expenses_id"
  add_foreign_key "food_orders", "aliment_categories"
  add_foreign_key "range_registers", "range_types"
  add_foreign_key "range_types", "registers", column: "registers_id"
  add_foreign_key "register_estudents", "children", column: "children_id"
  add_foreign_key "registers", "services"
end
