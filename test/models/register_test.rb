# test/models/register_test.rb
require 'test_helper'

class RegisterTest < ActiveSupport::TestCase
  test 'should belong to a service' do
    # Suponiendo que tienes un modelo Service existente y válido en tu aplicación
    service = Service.create(name: 'Some Service') # Crear un servicio

    register = Register.new(service_id: service.id) # Asignar el servicio a la instancia de Register
    assert register.valid? # Verificar que la instancia sea válida
  end

  # Otras pruebas para el modelo Register
end
