# spec/controllers/services_controller_spec.rb

require 'rails_helper'

RSpec.describe ServicesController, type: :controller do
  describe "GET #index" do
    it "returns a successful response" do
      get :index
      expect(response).to have_http_status(:success)
    end

    it "returns JSON with all services" do
      service = Service.create(name_service: 'Test Service', description: 'Test Description')
      get :index
      expect(response.body).to include(service.to_json)
    end
  end

  describe "POST #create" do
  it "creates a new service" do
    service_params = { service: { name_service: 'New Service', description: 'New Description' } }
    expect {
      post :create, params: service_params
    }.to change(Service, :count).by(1)
    expect(response).to have_http_status(:created)
  end
end



  describe "DELETE #destroy" do
    let!(:service) { Service.create(name_service: 'Test Service', description: 'Test Description') }

    it "deletes an existing service" do
      expect {
        delete :destroy, params: { id: service.id }
      }.to change(Service, :count).by(-1)
      expect(response).to have_http_status(:no_content)
    end
  end
end
