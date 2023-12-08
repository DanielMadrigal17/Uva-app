Rails.application.routes.draw do

  get 'private/test'
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
