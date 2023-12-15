class RegisterEstudentsController < ApplicationController
  before_action :set_register_estudent, only: [:show, :edit, :update, :destroy]
  
  def index
    @register_estudents = RegisterEstudent.all
    render json: @register_estudents
  end

  def new
    @register_estudent = RegisterEstudent.new
  end
  
  def edit
  end

  def show 
  end
  
  def create
    @register_estudent = RegisterEstudent.new(register_estudent_params)
  
    if @register_estudent.save
      render :new
    else
      render :new
    end
  end
  
  def update
    if @register_estudent.update(register_estudent_params)
      
      redirect_to @register_estudent, notice: 'Student information was successfully updated.'
    else
      render :edit
    end
  end
  
  def destroy
    @register_estudent.destroy
    redirect_to register_estudents_url, notice: 'Student was successfully removed.'
  end
  
  private
    def set_register_estudent
      @register_estudent = RegisterEstudent.find(params[:id])
    end
  
    def register_estudent_params
      params.require(:register_estudent).permit(:name, :entry_hour_date, :departure_hour_date, :date, :absent, :present, :carrier_name, :official_name) 
    end
end
