class IngredientsController < ApplicationController

    def index
        ingredients = Ingredient.all
        render json: ingredients
    end

    def create
        ingredient = Ingredient.new(ingredient_params)
        if ingredient.save
            render json: { success: true, ingredient: ingredient, status: "Ingredient created"}
        else
            render json: { success: false, errors: ingredient.errors.full_messages }
        end
    end

    def update
        ingredient = Ingredient.find_by_id(params[:id])
        if ingredient.update(ingredient_params)
            render json: { sucess: true, message: "#{ingredient.name} updated", ingredient: ingredient }
        else
            render json: { succes: false, errors: ingredient.errors.full_messages}
        end
    end

    def destroy
        ingredient = Ingredient.find_by_id(params[:id])
        if (!ingredient)
            render json: { success: false, errors: ingredient.errors.full_messages }
        else
            ingredient.destroy
            render json: { success: true, message: "Ingredient deleted"}
        end
    end

    private

    def ingredient_params
        params.require(:ingredient).permit(:recipe_id, :name, :measurement)
    end


end
