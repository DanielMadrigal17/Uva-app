require 'rails_helper'

RSpec.describe FoodExpensesController, type: :controller do
  describe 'GET #index' do
    it 'returns a success response' do
      get :index
      expect(response).to be_successful
    end

    it 'assigns all food expenses as @food_expenses' do
      food_expense = FoodExpense.create(valid_attributes)
      get :index
      expect(assigns(:food_expenses)).to eq([food_expense])
    end
  end

  describe 'GET #show' do
    it 'returns a success response' do
      food_expense = FoodExpense.create(valid_attributes)
      get :show, params: { id: food_expense.to_param }
      expect(response).to be_successful
    end
  end

  describe 'POST #create' do
    context 'with valid params' do
      it 'creates a new FoodExpense' do
        expect {
          post :create, params: { food_expense: valid_attributes }
        }.to change(FoodExpense, :count).by(1)
      end

      it 'renders a JSON response with the new food_expense' do
        post :create, params: { food_expense: valid_attributes }
        expect(response).to have_http_status(:created)
        expect(response.content_type).to include('application/json')
        expect(response.body).to include('"article":"Test Article"') # Verifica el contenido JSON
      end
    end
  end

  # Other test scenarios for update and destroy actions go here...

  # Helper method to generate valid attributes
  def valid_attributes
    {
      article: 'Test Article',
      unit_of_measurement: 'Units',
      previous_inventory: 10,
      entry: 5,
      foods_used: 4,
      quantitive_total: 11,
      final_inventory: 12
    }
  end

  # Helper method to generate invalid attributes
  def invalid_attributes
    { article: nil } # For example, invalid when the article is nil
  end
end
