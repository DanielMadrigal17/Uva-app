class Users::RegistrationsController < Devise::RegistrationsController
  include RackSessionsFix
  respond_to :json
  def def new
    @users = User.new
  end
  
  def create
    # super
    @users=User.new(sign_up_params)
    if @users.save
      # sign_in(resource_name, resource)
      render json: { message: 'User created successfully', user: resource }, status: :created
    else 
      render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation, :name, :last_name)
  end
  def respond_with(current_user, _opts = {})
    if resource.persisted?
      render json: {
        status: {code: 200, message: 'Signed up successfully.'},
        data: UserSerializer.new(current_user).serializable_hash[:data][:attributes]
      }
    else
      render json: {
        status: {message: "User couldn't be created successfully. #{current_user.errors.full_messages.to_sentence}"}
      }, status: :unprocessable_entity
    end
  end
end
