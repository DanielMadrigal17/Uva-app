class RangeRegistersController < ApplicationController
    before_action :set_range_register, only: [:show, :edit, :update, :destroy]

    # GET /range_registers
    def index
        @range_registers = RangeRegister.all
        render json: @range_registers
    end

    # GET /range_registers/:id
    def show
        render json: @range_register
    end

    # GET /range_registers/new
    def new
        @range_register = RangeRegister.new
    end

    # POST /range_registers
    def create
        @range_register = RangeRegister.new(range_register_params)

        if @range_register.save
        render json: @range_register, status: :created, location: @range_register
        else
        render json: @range_register.errors, status: :unprocessable_entity
        end
    end

    # GET /range_registers/:id/edit
    def edit
    end

    # PATCH/PUT /range_registers/:id
    def update
        if @range_register.update(range_register_params)
        render json: @range_register
        else
        render json: @range_register.errors, status: :unprocessable_entity
        end
    end

    # DELETE /range_registers/:id
    def destroy
        @range_register.destroy
        head :no_content
    end

    private

    # Use callbacks to share common setup or constraints between actions.
    def set_range_register
        @range_register = RangeRegister.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def range_register_params
        params.require(:range_register).permit(:amount)
    end
end
