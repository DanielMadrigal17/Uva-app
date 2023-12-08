class RangeTypesController < ApplicationController
    before_action :set_range_type, only: [:edit, :update, :destroy]
  
    # GET /range_types
    def index
      @range_types = RangeType.all
      render json: @range_types
    end
  
  
    # GET /range_types/new
    def new
      @range_type = RangeType.new
    end
  
    # POST /range_types
    def create
      @range_type = RangeType.new(range_type_params)
  
      if @range_type.save
        render json: @range_type, status: :created, location: @range_type
      else
        render json: @range_type.errors, status: :unprocessable_entity
      end
    end
  
    # GET /range_types/1/edit
    def edit
    end
  
    # PATCH/PUT /range_types/1
    def update
      if @range_type.update(range_type_params)
        render json: @range_type
      else
        render json: @range_type.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /range_types/1
    def destroy
      @range_type.destroy
      head :no_content
    end
  
    private
      # Use callbacks to share common setup or constraints between actions.
      def set_range_type
        @range_type = RangeType.find(params[:id])
      end
  
      # Only allow a trusted parameter "white list" through.
      def range_type_params
        params.require(:range_type).permit(:name, :description)
      end
  end
  