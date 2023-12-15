require 'rails_helper'

RSpec.describe InventoriesController, type: :controller do
  describe "GET #index" do
    it "returns http success" do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  describe "POST #create" do
    context "with valid params" do
      let(:valid_attributes) { { item: "Item 1", unit_of_measure: "uom", category: "category 1", quantity: 10, date: Date.today } }

      it "creates a new Inventory" do
        expect {
          post :create, params: { inventory: valid_attributes }
        }.to change(Inventory, :count).by(1)

        expect(response).to have_http_status(:created) # Verifica el código de estado correcto
        new_inventory = Inventory.last
        expect(new_inventory.item).to eq('Item 1') # Verifica que el nuevo inventario tenga los atributos correctos, puedes agregar más expectativas según necesites
      end
    end
  end
end

