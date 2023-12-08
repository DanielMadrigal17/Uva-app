class FoodOrder < ApplicationRecord
    validates :article, :unit_of_measurement, :requested_amount, :category, presence: true
    validates :article, length: { maximum: 100 } # Ejemplo de máximo de caracteres para :article
    validates :requested_amount, numericality: { greater_than_or_equal_to: 0 } # Ejemplo de valor mínimo para :requested_amount
    validates :unit_of_measurement, format: { with: /\A[A-Za-z]+\z/, message: "solo permite letras" } # Ejemplo de formato para :unit_of_measurement (solo letras)
    validates :article, uniqueness: true # Ejemplo de que :article debe ser único
end
