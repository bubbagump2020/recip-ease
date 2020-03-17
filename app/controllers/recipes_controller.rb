class RecipesController < ApplicationController
    
    def index
        recipes = Recipe.all
        render json: { recipes: recipes, current_user: @current_user}
    end

    def show
        recipe = Recipe.find_by(params[:id])
        if (!recipe)
            render json: "Unable to find recipe"
        else
            render json: recipe
        end
    end

    def create
        recipe = Recipe.new(recipe_params)
        if recipe.save
            render json: { recipe: recipe, success: true}
        else
            render json: { success: false, errors: recipe.errors.full_messages }
        end
    end

    def update
        recipe = Recipe.find_by_id(params[:id])
        if recipe.update(recipe_params)
            render json: { success: true, message: "#{recipe.name} updated", recipe: recipe }
        else
            render json: { success: false, erros: recipe.errors.full_messages }
        end
    end

    def destroy
        recipe = Recipe.find_by_id(params[:id])
        if (!recipe)
            render json: { success: false, message: "Operation Failed" }
        else
            recipe.destroy
            render json: { success: true, message: "Recipe Deleted" }
        end
    end

    private

    def recipe_params
        params.require(:recipe).permit(:user_id, :name, :description, :instruction, :category)
    end

end
