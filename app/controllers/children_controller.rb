class ChildrenController < ApplicationController
    before_action :set_child, only: [:show, :update, :destroy]
  
    # GET /children
    def index
      @children = Child.all
      render json: @children
    end
  
    # GET /children/1
    def show
      render json: @child
    end
  
    # POST /children
    def create
      @child = Child.new(child_params)
  
      if @child.save
        render json: @child, status: :created, location: @child
      else
        render json: @child.errors, status: :unprocessable_entity
      end
    end
  
    # PATCH/PUT /children/1

    def update
      if @child.update(child_params)
        render json: @child
      else
        render json: @child.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /children/1
    def destroy
      @child.destroy
    end
  
    private
  
    # Use callbacks to share common setup or constraints between actions.
    def set_child
      @child = Child.find(params[:id])
    end
  
    # Only allow a trusted parameter "white list" through.
    def child_params
      params.require(:child).permit(:name, :last_name, :birthdate, :address ) # Ajusta los parámetros según tus necesidades
    end
  end
  