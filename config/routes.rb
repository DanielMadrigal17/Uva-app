Rails.application.routes.draw do

  get 'private/test'
  get '/expense_records/calculate_foods_used', to: 'expense_records#calculate_foods_used'

  resources :aliments_categories
  resources :children
  resources :food_expenses
  resources :food_expenses_days
  resources :food_orders
  resources :range_types  
  resources :registers
  resources :register_estudents
  resources :services
  resources :range_registers
  resources :inventories
  resources :expense_records


  devise_for :users, 
    path: '', 
    path_names: {
      sign_in: 'login',
      sign_out: 'logout',
      registration: 'signup'
    },
    controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations'
    }
end
