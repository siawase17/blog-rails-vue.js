module Api
  class CategoriesController < ApplicationController
    before_action :authenticate_user, only: [:create, :update, :destroy]
    before_action :set_category, only: [ :show, :update, :destroy ]

    def index
      categories = Category.all
      render json: categories
    end

    def show
      render json: @category
    end

    def create
      category = Category.new(category_params)
      if category.save
        render json: category, status: :created
      else
        render json: { errors: category.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def update
      if @category.update(category_params)
        render json: @category
      else
        render json: { errors: @category.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      @category.destroy
      head :no_content
    end

    private

    def set_category
      @category = Category.find_by(id: params[:id])
      render json: { error: "카테고리를 찾을 수 없습니다." }, status: :not_found unless @category
    end

    def category_params
      params.require(:category).permit(:name)
    end
  end
end
