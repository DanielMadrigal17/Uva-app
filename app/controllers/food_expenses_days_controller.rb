class FoodExpensesDaysController < ApplicationController
  before_action :set_food_expenses_day, only: [:show, :edit, :update, :destroy]

  # GET /food_expenses_days
  def index
    @food_expenses_days = FoodExpensesDay.all
    render json: @food_expenses_days
  end

  # GET /food_expenses_days/1
  def show
    render json: @food_expenses_day
  end

  # GET /food_expenses_days/new
  def new
    @food_expenses_day = FoodExpensesDay.new
  end

  # POST /food_expenses_days
  def create
    @food_expenses_day = FoodExpensesDay.new(food_expenses_day_params)

    if @food_expenses_day.save
      render json: @food_expenses_day, status: :created, location: @food_expenses_day
    else
      render json: @food_expenses_day.errors, status: :unprocessable_entity
    end
  end

  # GET /food_expenses_days/1/edit
  def edit
  end

  # PATCH/PUT /food_expenses_days/1
  def update
    if @food_expenses_day.update(food_expenses_day_params)
      render json: @food_expenses_day
    else
      render json: @food_expenses_day.errors, status: :unprocessable_entity
    end
  end

  # DELETE /food_expenses_days/1
  def destroy
    @food_expenses_day.destroy
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_food_expenses_day
      @food_expenses_day = FoodExpensesDay.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def food_expenses_day_params
      params.require(:food_expenses_day).permit(:day, :year, :week)
    end
end
