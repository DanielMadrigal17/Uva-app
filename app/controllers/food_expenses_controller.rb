class FoodExpensesController < ApplicationController
    before_action :set_food_expense, only: [:show, :update, :destroy]

  # GET /food_expenses
  def index
    @food_expenses = FoodExpense.all
    render json: @food_expenses
  end

  # GET /food_expenses/:id
  def show
    render json: @food_expense
  end

  # POST /food_expenses
  def create
    @food_expense = FoodExpense.new(food_expense_params)

    if @food_expense.save
      render json: @food_expense, status: :created
    else
      render json: @food_expense.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /food_expenses/:id
  def update
    if @food_expense.update(food_expense_params)
      render json: @food_expense
    else
      render json: @food_expense.errors, status: :unprocessable_entity
    end
  end

  # DELETE /food_expenses/:id
  def destroy
    @food_expense.destroy
    head :no_content
  end

  private

  def set_food_expense
    @food_expense = FoodExpense.find(params[:id])
  end

  def food_expense_params
    params.require(:food_expense).permit(:article, :unit_of_measurement, :previous_inventory, :entry, :foods_used, :quantitive_total, :final_inventory)
  end
end
