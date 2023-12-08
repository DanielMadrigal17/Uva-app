class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :email, :name, :last_name, :encrypted_password, :created_at, :updated_at
end
