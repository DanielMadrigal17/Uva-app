class AddChildrenReferenceToRegisterEstudents < ActiveRecord::Migration[7.1]
  def change
    add_reference :register_estudents, :children, foreign_key: true
  end
end
