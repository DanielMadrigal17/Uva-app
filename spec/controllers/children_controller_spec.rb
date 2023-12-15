# spec/controllers/children_controller_spec.rb

require 'rails_helper'

RSpec.describe ChildrenController, type: :controller do
    describe "GET #index" do
        it "returns a successful response" do
        get :index
        expect(response).to have_http_status(:success)
        end

        it "returns JSON with all children" do
        child = Child.create(name: 'Test Child', last_name: 'Test Last Name', birthdate: '2023-01-01', address: 'Test Address')
        get :index
        expect(response.body).to include(child.to_json)
        end
    end

    describe "GET #show" do
        let(:child) { Child.create(name: 'Test Child', last_name: 'Test Last Name', birthdate: '2023-01-01', address: 'Test Address') }

        it "returns a successful response" do
        get :show, params: { id: child.id }
        expect(response).to have_http_status(:success)
        end
        it "returns JSON with the specified child" do
        get :show, params: { id: child.id }
        expect(response.body).to include(child.to_json)
        end
    end

    describe "POST #create" do
        it "creates a new child" do
        child_params = { child: { name: 'New Child', last_name: 'New Last Name', birthdate: '2023-01-01', address: 'New Address' } }
        expect {
            post :create, params: child_params
        }.to change(Child, :count).by(1)
        expect(response).to have_http_status(:created)
        end
    end

    describe "PATCH #update" do
        let(:child) { Child.create(name: 'Test Child', last_name: 'Test Last Name', birthdate: '2023-01-01', address: 'Test Address') }

        it "updates an existing child" do
        updated_name = 'Updated Child'
        patch :update, params: { id: child.id, child: { name: updated_name } }
        expect(response).to have_http_status(:success)
        expect(child.reload.name).to eq(updated_name)
        end
    end

    describe "DELETE #destroy" do
        let!(:child) { Child.create(name: 'Test Child', last_name: 'Test Last Name', birthdate: '2023-01-01', address: 'Test Address') }

        it "deletes an existing child" do
        expect {
            delete :destroy, params: { id: child.id }
        }.to change(Child, :count).by(-1)
        expect(response).to have_http_status(:no_content)
        end
    end
end
