class FoodOrdersController < ApplicationController
    before_action :set_food_order, only: [:show, :update, :destroy]

  # GET /food_orders
  def index
    @food_orders = FoodOrder.all
    render json: @food_orders
  end

  # GET /food_orders/1
  def show
    render json: @food_order
  end

  # POST /food_orders
  def create
    @food_order = FoodOrder.new(food_order_params)

    if @food_order.save
      render json: @food_order, status: :created, location: @food_order
    else
      render json: @food_order.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /food_orders/1
  def update
    if @food_order.update(food_order_params)
      render json: @food_order
    else
      render json: @food_order.errors, status: :unprocessable_entity
    end
  end

  # DELETE /food_orders/1
  def destroy
    @food_order.destroy
    head :no_content
  end

  private

  def set_food_order
    @food_order = FoodOrder.find(params[:id])
  end

  def food_order_params
    params.require(:food_order).permit(:article,:unit_of_measurement, :requested_amount, :received_amount, :week, :month, :year, :category)
  end
end
