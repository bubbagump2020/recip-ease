import * as actions from '../constants/index'

export const recipeName = (payload) => {
    return { type: actions.reciActions.RECIPE_NAME, payload }
}

export const recipeDesc = (payload) => {
    return { type: actions.reciActions.RECIPE_DESC, payload }
}

export const recipeInst = (payload) => {
    return { type: actions.reciActions.RECIPE_INST, payload }
}

export const reciValue = (payload) => {
    return { type: actions.reciActions.RECIPE_VALUE, payload }
}

export const allRecipes = (payload) => {
    return { type: actions.reciActions.RECIPES, payload }
}

export const currentUserRecipes = (payload) => {
    return { type: actions.reciActions.CURRENT_USER_RECIPES, payload }
}

export const deleteRecipe = (payload) => {
    return { type: actions.reciActions.DELETE_RECIPE, payload }
}