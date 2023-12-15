# spec/controllers/food_orders_controller_spec.rb

require 'rails_helper'

RSpec.describe FoodOrdersController, type: :controller do
    describe "GET #index" do
        it "returns a successful response" do
        get :index
        expect(response).to have_http_status(:success)
        end
    end
end
