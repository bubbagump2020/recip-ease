import { reciActions } from '../../redux/constants/index'

const initialState = {
    recipe: {
        name: null,
        description: null,
        instructions: null,
        value: 'beef'
    },
    deletedRecipe: {

    },
    currentUserRecipes: [],
}

export function recipe(state = initialState, action){
    switch(action.type){
        case reciActions.RECIPE_NAME:
            return{
                ...state,
                recipe: {
                    ...state.recipe,
                    name: action.payload
                }
            }
        case reciActions.RECIPE_DESC:
            return{
                ...state,
                recipe: {
                    ...state.recipe,
                    description: action.payload
                }
            }
        case reciActions.RECIPE_INST: {
            return{
                ...state,
                recipe: {
                    ...state.recipe,
                    instructions: action.payload
                }
            }
        }
        case reciActions.RECIPE_VALUE: {
            return{
                ...state,
                recipe: {
                    ...state.recipe,
                    value: action.payload
                }
            }
        }
        case reciActions.CURRENT_USER_RECIPES: {
            return {
                ...state,
                currentUserRecipes: action.payload
            }
        }
        case reciActions.DELETE_RECIPE:{
            return {
                ...state,
                deletedRecipe: action.payload
            }
        }
        default:
            return state
    }
}