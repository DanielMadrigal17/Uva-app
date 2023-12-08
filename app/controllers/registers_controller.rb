class RegistersController < ApplicationController
  before_action :set_register, only: [ :edit, :update, :destroy]

  # GET /registers
  def index
    @registers = Register.all
    render json: @registers
  end

  # GET /registers/new
  def new
    @register = Register.new
  end

  # POST /registers
  def create
    @register = Register.new(register_params)

    if @register.save
      render json: @register, status: :created, location: @register
    else
      render json: @register.errors, status: :unprocessable_entity
    end
  end

  # GET /registers/:id/edit
  def edit
  end

  # PATCH/PUT /registers/:id
  def update
    if @register.update(register_params)
      render json: @register
    else
      render json: @register.errors, status: :unprocessable_entity
    end
  end

  # DELETE /registers/:id
  def destroy
    @register.destroy
    head :no_content
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_register
    @register = Register.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def register_params
    params.require(:register).permit(:estableshiment, :code, :month, :year, :personal, :service_id)
  end
end
