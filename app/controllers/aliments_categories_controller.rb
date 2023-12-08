class AlimentsCategoriesController < ApplicationController
    before_action :set_aliments_category, only: [:show, :edit, :update, :destroy]

    def index
        @aliments_categories = AlimentCategory.all
        render json: @aliments_categories
    end

    def show
        render json: @aliments_category
    end

    def new
        @aliments_category = AlimentCategory.new
    end

    def create
        @aliments_category = AlimentCategory.new(aliments_category_params)

        if @aliments_category.save
        render json: @aliments_category, status: :created, location: aliments_category_url(@aliments_category)
        else
        render json: @aliments_category.errors, status: :unprocessable_entity
        end
    end

    def edit
    end

    def update
        if @aliments_category.update(aliments_category_params)
        render json: @aliments_category
        else
        render json: @aliments_category.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @aliments_category.destroy
        head :no_content
    end

    private

    def set_aliments_category
        @aliments_category = AlimentsCategory.find(params[:id])
    end

    def aliments_category_params
        params.require(:aliments_category).permit(:name)
    end
end
